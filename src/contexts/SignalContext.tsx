// contexts/SignalContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/config"; // Import your auth instance
import { ref, set, onValue, onDisconnect } from "firebase/database";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "./AuthContext";

// Define the shape of our authentication context
interface SignalContextType {
  onlineUsers: string[];
}

// Create the context
const SignalContext = createContext<SignalContextType | null>(null);

export function SignalProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // setting the current user online or offline.
  useEffect(() => {
    if (auth) {
      console.log("current user: ", auth.user?.uid);

      const userStatusRef = ref(realtimeDB, `/status/${auth.user?.uid}`); // Creates a reference in your Firebase Realtime Database at the path /status/{uid}, where uid is the currently logged-in user's unique ID.
      const connectedRef = ref(realtimeDB, ".info/connected");
      /*
            This creates a reference to a special, hidden path in Firebase called: .info/connected
            This path is:
                -> Read-only
                -> Special — not part of your app’s normal data
                -> Used to track whether the client is currently connected to Firebase’s servers
                -> Firebase automatically keeps this path updated.
                -> When the app is disconnected (e.g., network failure, tab close, offline), it becomes false.
                -> When your app is connected to Firebase, .info/connected becomes true.
      */

      // setUserReference(usersRef)

      const handleConnection = (snap: any) => {
        // This callback runs every time the connection status changes.
        if (snap.val() === true) {
          // snap.val() --> returns the value stored at the Firebase location you're listening to.
          /*
        snap is short for snapshot, and it refers to a DataSnapshot object in Firebase Realtime Database. This object represents the data at a specific location in your database at the time of the event.

        In your code, snap is passed automatically by Firebase when the value at .info/connected changes.
        */

          // Setup disconnect
          onDisconnect(userStatusRef).set({
            // onDisconnect() tells Firebase: "When this user unexpectedly closes the app (or loses internet), automatically mark them offline."
            // onDisconnect(...) is "scheduled" during the connection phase. When the client disconnects, Firebase itself executes the onDisconnect(...) action — your code doesn’t need to run anymore.
            state: "offline",
            last_changed: new Date().toLocaleString(),
          });

          // Set to online
          set(userStatusRef, {
            state: "online",
            last_changed: new Date().toLocaleString(),
          });
        }
        setLoading(false);
      };

      onValue(connectedRef, handleConnection); // We start listening to changes in .info/connected. Every time the user's connection changes, handleConnection runs and it passes in a DataSnapshot object (snap)

      return () => {
        // Clean up if needed
        set(userStatusRef, {
          state: "offline",
          last_changed: new Date().toLocaleString(),
        });
        setLoading(false);
      };
    }
  }, []);

  // getting online users
  useEffect(() => {
    const statusRef = ref(realtimeDB, "/status");

    onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      const online = [];

      for (const uid in data) {
        if (data[uid].state === "online" && uid != auth.user?.uid) {
          online.push(uid);
        }
      }

      setOnlineUsers(online);
    });
  }, []);

  // Create the value for our context
  const value = {};

  return (
    <SignalContext.Provider value={{ onlineUsers: onlineUsers }}>
      {loading ? <LoadingScreen /> : children}
    </SignalContext.Provider>
  );
}

// Custom hook to use the signal context
export function useSignal() {
  const context = useContext(SignalContext);
  if (!context) {
    throw new Error("useAuth must be used within an SignalProvider");
  }
  return context;
}
