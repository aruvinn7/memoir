"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PinGuard({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isUnlocked = sessionStorage.getItem("unlocked") === "true"
    if (!isUnlocked) {
      router.replace("/pin")
    } else {
      setUnlocked(true)
    }
  }, [router])

  if (unlocked === null) {
    // Jangan tampilkan apapun sebelum pengecekan selesai
    return <div className="min-h-screen w-full bg-white" />
  }

  return <>{children}</>
}
