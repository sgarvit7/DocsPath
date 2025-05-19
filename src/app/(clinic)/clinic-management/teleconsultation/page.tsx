"use client"
import { useSignal } from "@/contexts/SignalContext";
import React from "react";

export default function page() {
  const onlineUsers = useSignal().onlineUsers
  console.log(onlineUsers);
  return (
    <>
      <div>online users</div>
      {onlineUsers.map((item)=><div key={item}>{item} <br /></div>)}
    </>
  );
}
