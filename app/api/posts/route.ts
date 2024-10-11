// pages/api/posts.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  )

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials in environment variables.'
    )
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

const db = admin.firestore()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, slug, imageUrl, seoDescription, content, tag, createdAt } =
      req.body

    if (
      !title ||
      !slug ||
      !imageUrl ||
      !seoDescription ||
      !content ||
      !tag ||
      !createdAt
    ) {
      return res.status(400).json({ error: 'Missing required fields.' })
    }

    try {
      // Check for slug uniqueness
      const slugQuery = await db
        .collection('posts')
        .where('slug', '==', slug)
        .get()

      if (!slugQuery.empty) {
        return res.status(400).json({ error: 'Slug already exists.' })
      }

      // Add the new post
      const newPost = {
        title,
        slug,
        imageUrl,
        seoDescription,
        content,
        tag,
        createdAt,
      }

      await db.collection('posts').add(newPost)

      return res.status(201).json({ message: 'Post created successfully.' })
    } catch (error) {
      console.error('Error creating post:', error)
      return res.status(500).json({ error: 'Error creating post.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
