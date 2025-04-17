// lib/crud.ts
import { db } from '../../firebase/config'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const usersRef = collection(db, 'users')

export const createUser = async (user: { name: string; email: string }) => {
  const docRef = await addDoc(usersRef, user)
  return docRef.id
}

export const getUsers = async () => {
  const snapshot = await getDocs(usersRef)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const updateUser = async (
  id: string,
  newData: { name?: string; email?: string }
) => {
  const docRef = doc(db, 'users', id)
  await updateDoc(docRef, newData)
}

export const deleteUser = async (id: string) => {
  const docRef = doc(db, 'users', id)
  await deleteDoc(docRef)
}
