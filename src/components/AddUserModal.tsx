"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function AddUserModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("Admin")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Add New User
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          >
            <option>Admin</option>
            <option>Publisher</option>
            <option>Student</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  )
}
