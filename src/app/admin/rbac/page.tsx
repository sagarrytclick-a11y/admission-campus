"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import EditPermissionModal from "@/components/EditPermissionModal"
import AddRoleModal from "@/components/AddRoleModal"
import AddUserModal from "@/components/AddUserModal"

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)
const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Administrators
            </h1>
            <p className="text-gray-500 mt-2">
              Manage administrator roles and accounts with defined permissions.
            </p>
          </div>

          {/* Roles Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Administrator Roles
              </h2>

                         <button
  onClick={() => setIsAddRoleOpen(true)}
  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
>Add New Role
</button>
            </div>


            <div className="grid md:grid-cols-3 gap-6">
              <RoleCard
                title="Admin"
                accounts="5 Accounts"
                description="Full system control with access to manage users and settings."
                onEdit={(role) => {
                  setSelectedRole(role)
                  setIsOpen(true)
                }}
              />

              <RoleCard
                title="Publisher"
                accounts="3 Accounts"
                description="Manage and publish content without system-level access."
                onEdit={(role) => {
                  setSelectedRole(role)
                  setIsOpen(true)
                }}
              />

              <RoleCard
                title="Student"
                accounts="120 Accounts"
                description="Access courses, dashboard and personal learning content."
                onEdit={(role) => {
                  setSelectedRole(role)
                  setIsOpen(true)
                }}
              />
            </div>
          </div>

          {/* Accounts Section */}
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

  {/* Header Row */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg font-semibold text-gray-800">
      Administrator Accounts
    </h2>

 <button
  onClick={() => setIsAddUserOpen(true)}
  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
>
  + Add New User
</button>

  </div>

  <AdminTable />
</div>

        </div>
      </div>

      {/* ✅ Modal YAHAN HOGA */}
      <EditPermissionModal
        role={selectedRole}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <AddRoleModal
  isOpen={isAddRoleOpen}
  onClose={() => setIsAddRoleOpen(false)}
/>
<AddUserModal
  isOpen={isAddUserOpen}
  onClose={() => setIsAddUserOpen(false)}
/>

    </>
    
  )
}

/* ================= ROLE CARD ================= */

function RoleCard({
  title,
  accounts,
  description,
  onEdit,
}: {
  title: string
  accounts: string
  description: string
  onEdit: (role: string) => void
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
      <div className="text-sm text-gray-500 mb-2">{accounts}</div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm mb-4">
        {description}
      </p>

      <button
        onClick={() => onEdit(title)}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Edit Permissions
      </button>
    </div>
  )
}

/* ================= ADMIN TABLE ================= */

function AdminTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="py-3">Account</th>
            <th>Email</th>
            <th>Role</th>
            <th>Access</th>
            <th>Last Activity</th>
            <th></th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          <TableRow
            name="John Carter"
            email="john@example.com"
            role="Admin"
            access="Full"
            activity="2 Days ago"
          />

          <TableRow
            name="Emily Watson"
            email="emily@example.com"
            role="Publisher"
            access="Limited"
            activity="5 Days ago"
          />

          <TableRow
            name="Alex Brown"
            email="alex@example.com"
            role="Student"
            access="Basic"
            activity="1 Day ago"
          />
        </tbody>
      </table>
    </div>
  )
}

/* ================= TABLE ROW ================= */

function TableRow({
  name,
  email,
  role,
  access,
  activity,
}: {
  name: string
  email: string
  role: string
  access: string
  activity: string
}) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="py-4 font-medium">{name}</td>
      <td className="text-gray-600">{email}</td>

      <td>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            role === "Admin"
              ? "bg-red-100 text-red-600"
              : role === "Publisher"
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {role}
        </span>
      </td>

      <td>{access}</td>
      <td>{activity}</td>

      <td className="text-right space-x-3">
        <button className="text-blue-600 hover:underline">
          Edit
        </button>
        <button className="text-red-600 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  )
}
