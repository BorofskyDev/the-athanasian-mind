// components/admin/CreatePostModal.tsx

'use client'

import React from 'react'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import useCreatePost from '@/lib/hooks/useCreatePost'
import useSlugGenerator from '@/lib/hooks/useSlugGenerator'
import useTagManager from '@/lib/hooks/useTagManager'
import dynamic from 'next/dynamic'
import { Controller, SubmitHandler } from 'react-hook-form'

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// Define the form input interface
interface IFormInput {
  title: string
  slug: string
  image: FileList
  seoDescription: string
  content: string
  tag: string
}

interface CreatePostModalProps {
  onClose: () => void
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    error,
    success,
    setValue,
    createPost
  } = useCreatePost()

  const { title, slug, onTitleChange, generateSlug } = useSlugGenerator('')

  const {
    tags,
    newTag,
    setNewTag,
    createTag,
    loading: tagLoading,
    error: tagError,
  } = useTagManager()

  // Define the submit handler
  const submitHandler: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createPost(data) // Replace with your actual submission function from useCreatePost
    } catch (submissionError: unknown) {
      console.error('Submission Error:', submissionError)
      // Handle submission errors here if necessary
    }
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className='fixed inset-0 z-50 overflow-y-auto'
    >
      <div className='min-h-screen px-4 text-center'>
        {/* Overlay */}
        <div className='fixed inset-0 bg-black opacity-30' aria-hidden='true' />

        {/* Centering trick */}
        <span className='inline-block h-screen align-middle' aria-hidden='true'>
          &#8203;
        </span>

        {/* Modal Content */}
        <motion.div
          className='inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Modal Header */}
          <div className='flex justify-between items-center mb-4'>
            <Dialog.Title
              as='h3'
              className='text-2xl font-medium leading-6 text-gray-900'
            >
              Create New Blog Post
            </Dialog.Title>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700 focus:outline-none'
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Title */}
            <div className='mb-4'>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Title
              </label>
              <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => {
                  onTitleChange(e.target.value)
                  setValue('title', e.target.value)
                }}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder='Enter post title'
              />

              {errors.title && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div className='mb-4 flex items-center'>
              <div className='w-full'>
                <label
                  htmlFor='slug'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Slug
                </label>
                <input
                  id='slug'
                  type='text'
                  value={slug}
                  onChange={(e) => setValue('slug', e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.slug ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary`}
                  placeholder='auto-generated slug'
                />
                {errors.slug && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.slug.message}
                  </p>
                )}
              </div>
              <button
                type='button'
                onClick={generateSlug}
                className='ml-2 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:outline-none'
              >
                Regenerate
              </button>
            </div>

            {/* Image Upload */}
            <div className='mb-4'>
              <label
                htmlFor='image'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Image
              </label>
              <input
                id='image'
                type='file'
                accept='image/*'
                {...register('image')}
                className={`mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary-dark
                `}
              />
              {errors.image && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* SEO Description */}
            <div className='mb-4'>
              <label
                htmlFor='seoDescription'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                SEO Description
              </label>
              <textarea
                id='seoDescription'
                {...register('seoDescription')}
                maxLength={500}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.seoDescription ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder='Enter SEO description (max 500 characters)'
              />
              {errors.seoDescription && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.seoDescription.message}
                </p>
              )}
            </div>

            {/* Content (Rich Text Editor) */}
            <div className='mb-4'>
              <label
                htmlFor='content'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Content
              </label>
              <Controller
                control={control}
                name='content'
                render={({ field: { onChange, value } }) => (
                  <ReactQuill
                    theme='snow'
                    value={value || ''}
                    onChange={onChange}
                    className={`h-60 ${
                      errors.content ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm`}
                    placeholder='Write your blog post here...'
                  />
                )}
              />
              {errors.content && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Tag Selection */}
            <div className='mb-4'>
              <label
                htmlFor='tag'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Tag
              </label>
              <div className='flex items-center'>
                <select
                  id='tag'
                  {...register('tag')}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.tag ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                >
                  <option value=''>Select a tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <div className='flex flex-col ml-2'>
                  <input
                    type='text'
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className='px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary'
                    placeholder='New tag'
                  />
                  <button
                    type='button'
                    onClick={createTag}
                    disabled={tagLoading || !newTag.trim()}
                    className={`mt-1 px-3 py-1 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:outline-none ${
                      (tagLoading || !newTag.trim()) &&
                      'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {tagLoading ? 'Creating...' : 'Add Tag'}
                  </button>
                </div>
              </div>
              {errors.tag && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.tag.message}
                </p>
              )}
              {tagError && (
                <p className='text-red-500 text-sm mt-1'>{tagError}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className='mt-6'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50'
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </button>
            </div>

            {/* Success and Error Messages */}
            {success && (
              <p className='text-green-500 text-sm mt-2'>{success}</p>
            )}
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          </form>
        </motion.div>
      </div>
    </Dialog>
  )
}

export default CreatePostModal
