'use client'

import { useEffect, useState } from 'react'
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../../lib/crud'

interface User {
  id: string
  name: string
  email: string
}

export default function CrudExamplePage() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const fetchUsers = async () => {
    const data = await getUsers()
    setUsers(data as User[])
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreate = async () => {
    await createUser({ name, email })
    fetchUsers()
    setName('')
    setEmail('')
  }

  const handleUpdate = async (id: string) => {
    await updateUser(id, { name: 'Updated Name' })
    fetchUsers()
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id)
    fetchUsers()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Firestore CRUD</h2>
      <div className="mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 mr-2"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name} - {user.email}
            <button
              onClick={() => handleUpdate(user.id)}
              className="ml-4 text-yellow-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="ml-2 text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
