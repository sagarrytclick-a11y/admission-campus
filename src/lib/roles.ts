import { PERMISSIONS } from "./permissions";

export const ROLE_PERMISSIONS = {
  ADMIN: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.CREATE_BLOG,
    PERMISSIONS.EDIT_BLOG,
    PERMISSIONS.DELETE_BLOG,
  ],

  PUBLISHER: [
    PERMISSIONS.CREATE_BLOG,
    PERMISSIONS.EDIT_BLOG,
  ],

  USER: [],
} as const;

// 🔥 Auto-derived role type
export type Role = keyof typeof ROLE_PERMISSIONS;

// 🔥 Permission union type
export type RolePermission =
  (typeof ROLE_PERMISSIONS)[Role][number];
