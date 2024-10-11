// lib/hooks/useTagManager.ts

import { useState, useEffect } from 'react'
import api from '@/lib/utils/api'

interface Tag {
  id: string
  name: string
}

const useTagManager = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch existing tags
  const fetchTags = async () => {
    try {
      const response = await api.get('/tags') // Ensure you have this API route
      setTags(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch tags.')
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  // Create a new tag
  const createTag = async () => {
    if (!newTag.trim()) return
    setLoading(true)
    try {
      const response = await api.post('/tags', { name: newTag.trim() })
      setTags((prev) => [...prev, response.data])
      setNewTag('')
    } catch (err) {
      console.error(err)
      setError('Failed to create tag.')
    } finally {
      setLoading(false)
    }
  }

  return { tags, newTag, setNewTag, createTag, loading, error }
}

export default useTagManager
