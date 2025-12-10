import { geistMono, geistSans } from "@fet/theme"
import "./globals.css"


export default function RootLayout({ children }:Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-gray-50 bg-gray-900`}
      >
        {children}
      </body>
    </html>
  )
}
