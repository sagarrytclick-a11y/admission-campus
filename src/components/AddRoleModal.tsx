"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function AddRoleModal({ isOpen, onClose }: Props) {
  const [roleName, setRoleName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const permissions = [
    "Manage Users",
    "Manage Roles",
    "System Settings",
    "Create Content",
    "Edit Content",
    "Publish Content",
    "View Courses",
    "Access Dashboard",
    "Update Profile",
  ]

  const togglePermission = (perm: string) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== perm))
    } else {
      setSelectedPermissions([...selectedPermissions, perm])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Add New Role
        </h2>

        {/* Role Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Role Name
          </label>
          <input
            type="text"
            placeholder="Enter role name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Permissions */}
        <div>
          <h3 className="text-sm font-medium mb-3">
            Assign Permissions
          </h3>

          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {permissions.map((perm) => (
              <label key={perm} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                  className="h-4 w-4"
                />
                {perm}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Create Role
          </button>
        </div>
      </div>
    </div>
  )
}
