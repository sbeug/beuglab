export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Example: Log to console (replace with email sending, DB save, etc.)
    console.log('New contact form submission:', { name, email, message })

    // Example response (customize this)
    return res.status(200).json({ success: true, message: 'Form submitted successfully' })
  } catch (error) {
    console.error('Error processing form submission:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
