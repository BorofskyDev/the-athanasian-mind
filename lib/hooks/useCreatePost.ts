// lib/hooks/useCreatePost.ts

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '@/lib/utils/api'

interface IFormInput {
  title: string
  slug: string
  image: FileList
  seoDescription: string
  content: string
  tag: string
}

const schema: yup.ObjectSchema<IFormInput> = yup.object({
  title: yup.string().required('Title is required'),
  slug: yup.string().required('Slug is required'),
  image: yup
    .mixed<FileList>()
    .required('Image is required')
    // Adjust the test functions to return false instead of null
    .test('fileSize', 'The file is too large', (value: FileList | null) => {
      if (value && value[0]) {
        return value[0].size <= 5 * 1024 * 1024 // 5MB
      }
      return false // Return false if value is null or undefined
    })
    .test('fileType', 'Unsupported File Format', (value: FileList | null) => {
      if (value && value[0]) {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type)
      }
      return false // Return false if value is null or undefined
    }),

  seoDescription: yup
    .string()
    .required('SEO description is required')
    .max(500, 'SEO description cannot exceed 500 characters'),
  content: yup.string().required('Content is required'),
  tag: yup.string().required('Tag is required'),
})

const useCreatePost = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const createPost = async (data: IFormInput) => {
    setError(null)
    setSuccess(null)

    try {
      // Upload image to Firebase Storage
      const formData = new FormData()
      formData.append('file', data.image[0])

      const uploadResponse = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed.')
      }

      const uploadData = await uploadResponse.json()
      const imageUrl = uploadData.url

      // Save post to Firestore
      const postData = {
        title: data.title,
        slug: data.slug,
        imageUrl,
        seoDescription: data.seoDescription,
        content: data.content,
        tag: data.tag,
        createdAt: new Date().toISOString(),
      }

      const response = await api.post('/posts', postData)

      if (response.status === 201) {
        setSuccess('Post created successfully!')
        reset()
      } else {
        throw new Error('Failed to create post.')
      }
    } catch (err: unknown) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  return {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    error,
    success,
    setValue,
    createPost,
  }
}

export default useCreatePost
