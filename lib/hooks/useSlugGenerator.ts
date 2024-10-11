// lib/hooks/useSlugGenerator.ts

import { useState } from 'react'
import { slugify } from '@/lib/utils/slugify'

const useSlugGenerator = (initialTitle: string) => {
  const [title, setTitle] = useState(initialTitle)
  const [slug, setSlug] = useState(slugify(initialTitle))

  const generateSlug = () => {
    setSlug(slugify(title))
  }

  const onTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    setSlug(slugify(newTitle))
  }

  return { title, slug, onTitleChange, generateSlug }
}

export default useSlugGenerator
