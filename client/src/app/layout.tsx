// Import global CSS styles
import '@/app/globals.css'

// Import the Metamorphous font from Google Fonts
import { Metamorphous } from 'next/font/google'

// Configure the Metamorphous font with specific options
const metamorphous = Metamorphous({
  subsets: ['latin'], // Specify the character subsets to include
  weight: '400', // Set the font weight
  display: 'swap', // Use the 'swap' display strategy for better performance
})

// Define the RootLayout component which will wrap the entire application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode // Define the type for children prop
}) {
  return (
    // Set the language of the document to English and apply the Metamorphous font class and render the children components
    <html lang="en" className={metamorphous.className}>
      <body>{children}</body>
    </html>
  )
}