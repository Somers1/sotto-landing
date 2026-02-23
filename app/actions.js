'use server'

import { sql } from '@vercel/postgres'

export async function submitBetaSignup(email) {
  const trimmed = email?.trim().toLowerCase()
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
    return { error: 'Invalid email address' }

  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS beta_signups (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        notes TEXT
      )
    `
    await sql`INSERT INTO beta_signups (email) VALUES (${trimmed}) ON CONFLICT (email) DO NOTHING`
    return { success: true }
  } catch (e) {
    console.error('Beta signup error:', e)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function getBetaSignups(password) {
  if (password !== process.env.ADMIN_PASSWORD) return { error: 'Unauthorized' }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS beta_signups (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        notes TEXT
      )
    `
    const { rows } = await sql`SELECT * FROM beta_signups ORDER BY created_at DESC`
    return { signups: rows }
  } catch (e) {
    console.error('Fetch signups error:', e)
    return { error: 'Failed to load signups' }
  }
}
