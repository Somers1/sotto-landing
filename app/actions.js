'use server'

const API_URL = process.env.SOTTO_API_URL || 'https://sotto.somerson.co'
const API_KEY = process.env.SOTTO_BETA_API_KEY || ''

export async function submitBetaSignup(email) {
  const trimmed = email?.trim().toLowerCase()
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
    return { error: 'Invalid email address' }

  try {
    const res = await fetch(`${API_URL}/api/beta-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY },
      body: JSON.stringify({ email: trimmed }),
    })
    if (!res.ok) return { error: 'Something went wrong. Please try again.' }
    return { success: true }
  } catch (e) {
    console.error('Beta signup error:', e)
    return { error: 'Something went wrong. Please try again.' }
  }
}
