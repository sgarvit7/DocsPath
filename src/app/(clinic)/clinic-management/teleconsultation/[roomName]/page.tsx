"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ref,
  set,
  onValue,
  push,
  onDisconnect,
  serverTimestamp,
  DataSnapshot,
  remove,
  DatabaseReference,
} from "firebase/database";
import { realtimeDB } from "../../../../../../firebase/config";
import { useSignal } from "@/contexts/SignalContext";

const RoomPage = () => {
  const { roomName } = useParams();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef(new MediaStream());
  const isInitiator = useRef(false);
  const [roomRef, setRoomRef] = useState<DatabaseReference | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const { callResponse, updateCallStatus } = useSignal();
  const router = useRouter();

  useEffect(() => {
    if (
      callResponse === "rejected" ||
      callResponse === "disconnected" ||
      callResponse === null
    ) {
      console.log(callResponse ? callResponse : "No connection established");
      router.push(`/clinic-management/teleconsultation`);
    } else {
      console.log(callResponse);
      const roomRef = ref(realtimeDB, `rooms/${roomName}`);
      setRoomRef(roomRef);
      // const offerRef = ref(realtimeDB, `rooms/${roomName}/offer`);
      const answerRef = ref(realtimeDB, `rooms/${roomName}/answer`);
      const callerCandidatesRef = ref(
        realtimeDB,
        `rooms/${roomName}/callerCandidates`
      );
      const calleeCandidatesRef = ref(
        realtimeDB,
        `rooms/${roomName}/calleeCandidates`
      );

      const setupConnection = async () => {
        peerConnection.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            const candidatesRef = isInitiator.current
              ? callerCandidatesRef
              : calleeCandidatesRef;
            push(candidatesRef, event.candidate.toJSON());
          }
        };

        peerConnection.current.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.current.addTrack(track);
          });
        };

        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream.current;
        }
      };

      const openUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStream.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, stream);
        });
      };

      const start = async () => {
        const snapshot: DataSnapshot = await new Promise((resolve) =>
          onValue(roomRef, resolve, { onlyOnce: true })
        );

        if (!snapshot.exists()) {
          isInitiator.current = true;

          await setupConnection();
          await openUserMedia();

          const offer = await peerConnection.current!.createOffer();
          await peerConnection.current!.setLocalDescription(offer);
          await set(roomRef, {
            offer,
            createdAt: serverTimestamp(),
          });

          onValue(answerRef, async (answerSnap) => {
            if (
              answerSnap.exists() &&
              peerConnection.current?.signalingState !== "closed"
            ) {
              const answer = new RTCSessionDescription(answerSnap.val());
              await peerConnection.current?.setRemoteDescription(answer);
            }
          });
        } else {
          await setupConnection();
          await openUserMedia();
          const roomData = snapshot.val();
          const offer = roomData.offer;
          await peerConnection.current!.setRemoteDescription(
            new RTCSessionDescription(offer)
          );
          const answer = await peerConnection.current!.createAnswer();
          await peerConnection.current!.setLocalDescription(answer);
          await set(answerRef, answer);
        }

        onValue(callerCandidatesRef, (snapshot) => {
          snapshot.forEach((child) => {
            const candidate = new RTCIceCandidate(child.val());
            peerConnection.current?.addIceCandidate(candidate);
          });
        });

        onValue(calleeCandidatesRef, (snapshot) => {
          snapshot.forEach((child) => {
            const candidate = new RTCIceCandidate(child.val());
            peerConnection.current?.addIceCandidate(candidate);
          });
        });

        onDisconnect(roomRef).remove();

        onValue(roomRef, (snapshot) => {
          if (!snapshot.exists()) {
            console.log("Room was removed (disconnected).");
            updateCallStatus("disconnected");
            // router.push(`/clinic-management/teleconsultation`);
          }
        });
      };

      start();
    }

    return () => {
      peerConnection.current?.close();
      peerConnection.current = null;
      localStream.current?.getTracks().forEach((track) => track.stop());
    };
  }, [roomName]);

  const handleEndCall = () => {
    console.log("Room was removed (disconnected).");
    updateCallStatus("disconnected");
    if (roomRef) {
      remove(roomRef);
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      const audioTracks = localStream.current.getAudioTracks();
      
      // Get the new state (opposite of current state)
      const newMuteState = !isAudioMuted;
      
      // Enable/disable the tracks based on mute state
      audioTracks.forEach(track => {
        track.enabled = !newMuteState; // enabled = true when not muted
      });
      
      // Update the state
      setIsAudioMuted(newMuteState);
      
      // Find the sender in the peer connection that corresponds to the audio track
      if (peerConnection.current) {
        const senders = peerConnection.current.getSenders();
        senders.forEach(sender => {
          if (sender.track && sender.track.kind === 'audio') {
            sender.track.enabled = !newMuteState; // enabled = true when not muted
          }
        });
      }
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTracks = localStream.current.getVideoTracks();
      
      // Get the new state (opposite of current state)
      const newVideoOffState = !isVideoOff;
      
      // Enable/disable the tracks based on video off state
      videoTracks.forEach(track => {
        track.enabled = !newVideoOffState; // enabled = true when video is on
      });
      
      // Update the state
      setIsVideoOff(newVideoOffState);
      
      // Find the sender in the peer connection that corresponds to the video track
      if (peerConnection.current) {
        const senders = peerConnection.current.getSenders();
        senders.forEach(sender => {
          if (sender.track && sender.track.kind === 'video') {
            sender.track.enabled = !newVideoOffState; // enabled = true when video is on
          }
        });
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Room: {roomName}</h1>
      <h1>call response: {callResponse}</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full rounded shadow scale-x-[-1]"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full rounded shadow"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={toggleAudio}
          className={`focus:outline-none text-white ${
            isAudioMuted ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"
          } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
        >
          {isAudioMuted ? "Unmute Audio" : "Mute Audio"}
        </button>
        <button
          type="button"
          onClick={toggleVideo}
          className={`focus:outline-none text-white ${
            isVideoOff ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"
          } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
        >
          {isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
        </button>
        <button
          type="button"
          onClick={handleEndCall}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          End call
        </button>
      </div>
    </div>
  );
};

export default RoomPage;