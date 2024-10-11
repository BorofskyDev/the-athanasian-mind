// components/pages/AdminPageComponent.tsx

'use client'

import React, { useState } from 'react'
import CreatePostModal from '@/components/admin/CreatePostModal' // Ensure correct path

const AdminPageComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle opening and closing the modal
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h1 className='text-3xl font-semibold mb-4'>Admin Dashboard</h1>
      <button
        onClick={openModal}
        className='mb-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition'
      >
        Create New Blog Post
      </button>

      {/* Other admin functionalities can be added here */}

      {/* Create Post Modal */}
      {isModalOpen && <CreatePostModal onClose={closeModal} />}
    </div>
  )
}

export default AdminPageComponent
