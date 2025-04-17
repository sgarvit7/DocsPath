"use client"

import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from '../../firebase/config'

export default function Home() {

  const [user] = useAuthState(auth)
  console.log(user)

  return (
    <div className="dark:text-red-500 text-blue-500">
      hello
    </div>
  );
}
