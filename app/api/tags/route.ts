// pages/api/tags.ts

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

interface Tag {
  id: string
  name: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const tagsSnapshot = await db.collection('tags').get()
      const tags: Tag[] = tagsSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }))
      res.status(200).json(tags)
    } catch (error) {
      console.error('Error fetching tags:', error)
      res.status(500).json({ error: 'Error fetching tags.' })
    }
  } else if (req.method === 'POST') {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Tag name is required.' })
    }

    try {
      // Check if tag already exists
      const tagQuery = await db
        .collection('tags')
        .where('name', '==', name)
        .get()
      if (!tagQuery.empty) {
        return res.status(400).json({ error: 'Tag already exists.' })
      }

      // Create new tag
      const newTagRef = await db.collection('tags').add({ name })
      const newTag = {
        id: newTagRef.id,
        name,
      }
      res.status(201).json(newTag)
    } catch (error) {
      console.error('Error creating tag:', error)
      res.status(500).json({ error: 'Error creating tag.' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
