import { Metadata } from 'next'

// Parcel selection page - DO NOT index (booking process)
export const metadata: Metadata = {
  title: "Select Parcel",
  description: "Choose your parcel to book",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function ParcelBookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
