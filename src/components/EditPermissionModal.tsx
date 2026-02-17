"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface Props {
  role: string
  isOpen: boolean
  onClose: () => void
}

export default function EditPermissionModal({
  role,
  isOpen,
  onClose,
}: Props) {
  const [permissions, setPermissions] = useState<string[]>([
    "Manage Users",
    "Manage Roles",
    "View Reports",
  ])

  const allPermissions = [
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
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter((p) => p !== perm))
    } else {
      setPermissions([...permissions, perm])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Edit Permissions - {role}
        </h2>

        <div className="space-y-3 max-h-72 overflow-y-auto">
          {allPermissions.map((perm) => (
            <label
              key={perm}
              className="flex items-center gap-3 text-sm"
            >
              <input
                type="checkbox"
                checked={permissions.includes(perm)}
                onChange={() => togglePermission(perm)}
                className="h-4 w-4"
              />
              {perm}
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-black text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
