// pages/api/upload-image.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { Fields, Files, File as FormidableFile } from 'formidable'
import fs from 'fs'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
}

// Initialize Firebase Storage
const storage = getStorage()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      multiples: false, // Only allow single file uploads
      maxFileSize: 5 * 1024 * 1024, // 5MB (optional)
    })

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.error('Error parsing form:', err)
        return res.status(500).json({ error: 'Error parsing form data.' })
      }

      const file = files.file as FormidableFile | undefined

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' })
      }

      // Read the file
      const data = fs.readFileSync(file.filepath)

      // Create a unique file name, ensuring originalFilename is present
      const originalFilename = file.originalFilename || 'unknown'
      const sanitizedFilename = originalFilename.replace(
        /[^a-zA-Z0-9.\-_]/g,
        ''
      )
      const fileName = `${Date.now()}-${sanitizedFilename}`

      // Create a reference to Firebase Storage
      const storageRef = ref(storage, `blog-images/${fileName}`)

      try {
        // Upload the file
        await uploadBytes(storageRef, data, {
          contentType: file.mimetype || 'image/jpeg',
        })

        // Get the download URL
        const url = await getDownloadURL(storageRef)

        // Respond with the URL
        return res.status(200).json({ url })
      } catch (uploadError) {
        console.error('Error uploading to Firebase Storage:', uploadError)
        return res.status(500).json({ error: 'Error uploading image.' })
      }
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
