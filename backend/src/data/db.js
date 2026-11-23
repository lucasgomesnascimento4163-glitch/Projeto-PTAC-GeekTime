import dns from 'node:dns'
import { MongoClient } from 'mongodb'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const client = new MongoClient(process.env.MONGODB_URI)

export async function conectar() {
  await client.connect()
  const db = client.db('ptas3')
  await db.command({ ping: 1 })
  return db
}
