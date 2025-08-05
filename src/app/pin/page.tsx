"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function PinPage() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)

  const handleComplete = (value: string) => {
    const correctPin = "051224"

    if (value === correctPin) {
      sessionStorage.setItem("unlocked", "true")
      router.replace("/")
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError(`PIN salah. Percobaan ke-${newAttempts} dari 3`)
      setPin("")
      if (newAttempts >= 3) {
        alert("Terlalu banyak percobaan. Halaman terkunci.")
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Masukkan PIN untuk masuk</h1>

      <InputOTP
        maxLength={6}
        value={pin}
        onChange={setPin}
        onComplete={handleComplete}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
