// lib/crud.ts
import { realtimeDB } from "../../firebase/config";
import {
  ref,
  set,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";

// ✅ CREATE
export const createUser = async (user: { name: string; age: number }) => {
  const usersRef = ref(realtimeDB, "users");// this means Point to the users path in the database.
  /*
  ref() creates a reference (or pointer) to a specific location (or path) in your Firebase Realtime Database.
  Think of it like saying: "I want to read from or write to this folder or file in my database."
  */

  /*
  ref() by itself does not create anything.
  The path (like users/abc123) is created automatically when you use a write operation like: set(), update(), push()
  */
  const newUserRef = push(usersRef); // generates a new unique key i.e push(usersRef) creates a new, unique child inside the users path in the Firebase Realtime Database. It also Returns a reference to the new path.
  await set(newUserRef, user);// set() is used to save or replace data at a specific path in the database.
  return newUserRef.key;
};

// ✅ READ
export const readUsers = (callback: (data: any) => void) => {
  const usersRef = ref(realtimeDB, "users"); // Creates a reference to the /users path in your Realtime Database.

  /*
    onValue-->  Listens to changes at /users.
                This means: whenever data is added, changed, or removed in /users, this function runs.
  */
  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();// Gets the actual data stored at /users.
    callback(data); // This calls the function you passed in with the latest data from the database. You can then use it to update UI, store in state, log, etc.
  });
};

// ✅ UPDATE
export const updateUser = async (userId: string, newData: Partial<{ name: string; age: number }>) => {
    /*
    This is a TypeScript utility type. It means: “Make all properties of the object optional.”
        name is optional ✅
        age is optional ✅
    You can provide either, both, or none.
    */
  const userRef = ref(realtimeDB, `users/${userId}`);
  await update(userRef, newData);
};

// ✅ DELETE
export const deleteUser = async (userId: string) => {
  const userRef = ref(realtimeDB, `users/${userId}`);
  await remove(userRef);
};
