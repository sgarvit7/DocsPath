// lib/crud.ts
import { db } from "../../firebase/config";
import {
  collection, // Access a specific collection i.e it gets the reference a specific collection.
  addDoc, //  Add a new document.
  getDocs, //  Get all documents from a collection.
  updateDoc, // Update a specific document.
  deleteDoc, // Delete a document.
  doc, // Get a reference to a specific document (by ID).
} from "firebase/firestore";

const usersRef = collection(db, "users"); // This line creates a reference to the users collection inside your Firestore database. You'll use this reference in your CRUD operations.

export const createUser = async (user: { name: string; email: string }) => {
  const docRef = await addDoc(usersRef, user);
  return docRef.id;
};

export const getUsers = async () => {
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateUser = async (
  id: string,
  newData: { name?: string; email?: string }
) => {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, newData);
};

export const deleteUser = async (id: string) => {
  //   const docRef = doc(db, 'users', id)
  //   OR
  const docRef = doc(usersRef, id);
  await deleteDoc(docRef);
};
