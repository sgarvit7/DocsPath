"use client";

import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  ref,
  set,
  onValue,
  push,
  onDisconnect,
  serverTimestamp,
  DataSnapshot
} from "firebase/database";
import { realtimeDB } from "../../../../../../firebase/config";

const RoomPage = () => {
  const { roomName } = useParams();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef(new MediaStream());
  const isInitiator = useRef(false);

  useEffect(() => {
    const roomRef = ref(realtimeDB, `rooms/${roomName}`);
    // const offerRef = ref(realtimeDB, `rooms/${roomName}/offer`);
    const answerRef = ref(realtimeDB, `rooms/${roomName}/answer`);
    const callerCandidatesRef = ref(realtimeDB, `rooms/${roomName}/callerCandidates`);
    const calleeCandidatesRef = ref(realtimeDB, `rooms/${roomName}/calleeCandidates`);

    const setupConnection = async () => {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          const candidatesRef = isInitiator.current ? callerCandidatesRef : calleeCandidatesRef;
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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, stream);
      });
    };

    const start = async () => {
      const snapshot: DataSnapshot = await new Promise((resolve) => onValue(roomRef, resolve, { onlyOnce: true }));

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
          if (answerSnap.exists() && peerConnection.current?.signalingState !== "closed") {
            const answer = new RTCSessionDescription(answerSnap.val());
            await peerConnection.current?.setRemoteDescription(answer);
          }
        });
      } else {
        await setupConnection();
        await openUserMedia();
        const roomData = snapshot.val();
        const offer = roomData.offer;
        await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(offer));
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
    };

    start();

    return () => {
      peerConnection.current?.close();
      peerConnection.current = null;
      localStream.current?.getTracks().forEach((track) => track.stop());
    };
  }, [roomName]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Room: {roomName}</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full rounded shadow scale-x-[-1]" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full rounded shadow" />
      </div>
    </div>
  );
};

export default RoomPage;
