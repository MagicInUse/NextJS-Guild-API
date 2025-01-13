import './globals.css'

import { Metamorphous } from 'next/font/google'

const metamorphous = Metamorphous({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={metamorphous.className}>
      <body>{children}</body>
    </html>
  )
}