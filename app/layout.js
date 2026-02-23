import './globals.css'

export const metadata = {
  title: 'Sotto',
  description:
    'A quiet, attentive AI that lives on your Android phone. It reads your notifications, learns about your life, and speaks up when it matters.',
  keywords: ['AI', 'Android', 'notifications', 'assistant', 'ambient intelligence'],
  openGraph: {
    title: 'Sotto',
    description: 'Your phone, paying attention.',
    type: 'website',
    siteName: 'Sotto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sotto',
    description: 'Your phone, paying attention.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
