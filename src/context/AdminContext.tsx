'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Base interfaces
export interface BaseEntity {
  _id: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Generic Admin State
export interface AdminState<T> {
  // Modal states
  isModalOpen: boolean
  editingItem: T | null
  deleteModalOpen: boolean
  itemToDelete: T | null

  // Search and filter states
  searchTerm: string
  selectedFilters: Record<string, string>

  // Pagination states
  currentPage: number
  itemsPerPage: number

  // Form data
  formData: Record<string, any>

  // UI states
  loading: boolean
  selectedItems: string[]
}

// Actions
export type AdminAction<T> =
  | { type: 'SET_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_EDITING_ITEM'; payload: T | null }
  | { type: 'SET_DELETE_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_ITEM_TO_DELETE'; payload: T | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTER'; payload: { key: string; value: string } }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'SET_FORM_DATA'; payload: Record<string, any> }
  | { type: 'UPDATE_FORM_FIELD'; payload: { field: string; value: any } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_ITEMS'; payload: string[] }
  | { type: 'RESET_STATE'; payload: { formData: Record<string, any> } }

// Reducer function
function createAdminReducer<T>() {
  return (state: AdminState<T>, action: AdminAction<T>): AdminState<T> => {
    switch (action.type) {
      case 'SET_MODAL_OPEN':
        return { ...state, isModalOpen: action.payload }

      case 'SET_EDITING_ITEM':
        return { ...state, editingItem: action.payload }

      case 'SET_DELETE_MODAL_OPEN':
        return { ...state, deleteModalOpen: action.payload }

      case 'SET_ITEM_TO_DELETE':
        return { ...state, itemToDelete: action.payload }

      case 'SET_SEARCH_TERM':
        return { ...state, searchTerm: action.payload, currentPage: 1 }

      case 'SET_FILTER':
        return {
          ...state,
          selectedFilters: {
            ...state.selectedFilters,
            [action.payload.key]: action.payload.value
          },
          currentPage: 1
        }

      case 'SET_CURRENT_PAGE':
        return { ...state, currentPage: action.payload }

      case 'SET_ITEMS_PER_PAGE':
        return { ...state, itemsPerPage: action.payload, currentPage: 1 }

      case 'SET_FORM_DATA':
        return { ...state, formData: action.payload }

      case 'UPDATE_FORM_FIELD':
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.payload.field]: action.payload.value
          }
        }

      case 'SET_LOADING':
        return { ...state, loading: action.payload }

      case 'SET_SELECTED_ITEMS':
        return { ...state, selectedItems: action.payload }

      case 'RESET_STATE':
        return {
          ...state,
          isModalOpen: false,
          editingItem: null,
          deleteModalOpen: false,
          itemToDelete: null,
          searchTerm: '',
          selectedFilters: {},
          currentPage: 1,
          formData: action.payload.formData,
          selectedItems: []
        }

      default:
        return state
    }
  }
}

// Context creation function
export function createAdminContext<T>(defaultFormData: Record<string, any>) {
  const AdminContext = createContext<{
    state: AdminState<T>
    dispatch: React.Dispatch<AdminAction<T>>
  } | null>(null)

  // Provider component
  const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(createAdminReducer<T>(), {
      isModalOpen: false,
      editingItem: null,
      deleteModalOpen: false,
      itemToDelete: null,
      searchTerm: '',
      selectedFilters: {},
      currentPage: 1,
      itemsPerPage: 10,
      formData: defaultFormData,
      loading: false,
      selectedItems: []
    })

    return (
      <AdminContext.Provider value={{ state, dispatch }}>
        {children}
      </AdminContext.Provider>
    )
  }

  // Hook to use the context
  const useAdminContext = () => {
    const context = useContext(AdminContext)
    if (!context) {
      throw new Error('useAdminContext must be used within AdminProvider')
    }
    return context
  }

  return {
    AdminProvider,
    useAdminContext,
    AdminContext
  }
}

// Helper hooks for common actions
export function useAdminActions<T>(context: React.Context<{ state: AdminState<T>; dispatch: React.Dispatch<AdminAction<T>> } | null>) {
  const contextValue = useContext(context!)
  if (!contextValue) {
    throw new Error('useAdminActions must be used within AdminProvider')
  }
  const { dispatch } = contextValue

  return {
    openCreateModal: () => dispatch({ type: 'SET_MODAL_OPEN', payload: true }),
    closeModal: () => dispatch({ type: 'SET_MODAL_OPEN', payload: false }),
    setEditingItem: (item: T | null) => dispatch({ type: 'SET_EDITING_ITEM', payload: item }),
    openDeleteModal: (item: T) => {
      dispatch({ type: 'SET_ITEM_TO_DELETE', payload: item })
      dispatch({ type: 'SET_DELETE_MODAL_OPEN', payload: true })
    },
    closeDeleteModal: () => dispatch({ type: 'SET_DELETE_MODAL_OPEN', payload: false }),
    setSearchTerm: (term: string) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setFilter: (key: string, value: string) => dispatch({ type: 'SET_FILTER', payload: { key, value } }),
    setCurrentPage: (page: number) => dispatch({ type: 'SET_CURRENT_PAGE', payload: page }),
    setItemsPerPage: (count: number) => dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: count }),
    updateFormField: (field: string, value: any) => dispatch({ type: 'UPDATE_FORM_FIELD', payload: { field, value } }),
    setFormData: (data: Record<string, any>) => dispatch({ type: 'SET_FORM_DATA', payload: data }),
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setSelectedItems: (items: string[]) => dispatch({ type: 'SET_SELECTED_ITEMS', payload: items }),
    resetState: (formData: Record<string, any>) => dispatch({ type: 'RESET_STATE', payload: { formData } })
  }
}
