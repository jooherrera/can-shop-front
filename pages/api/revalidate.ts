import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  try {
    await res.unstable_revalidate('/')
    return res.status(200).json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
