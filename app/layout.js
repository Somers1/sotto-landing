import './globals.css'

export const metadata = {
  title: 'Sotto — The quiet voice',
  description: 'A quiet, attentive AI that lives on your phone. It reads your notifications, learns about your life, and speaks up when it matters.',
  openGraph: {
    title: 'Sotto — The quiet voice',
    description: 'Your phone, paying attention.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
