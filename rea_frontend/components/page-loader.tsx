"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  useEffect(() => {
    const texts = [
      "Initializing...",
      "Loading market data...",
      "Analyzing trends...",
      "Preparing dashboard...",
      "Almost ready...",
    ]

    let textIndex = 0
    const textTimer = setInterval(() => {
      setLoadingText(texts[textIndex])
      textIndex = (textIndex + 1) % texts.length
    }, 400)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          clearInterval(textTimer)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 120)

    return () => {
      clearInterval(progressTimer)
      clearInterval(textTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo with animated rings */}
        <div className="relative">
          <div className="absolute -inset-4 animate-ping rounded-full bg-blue-400 opacity-20"></div>
          <div className="absolute -inset-2 animate-pulse rounded-full bg-blue-300 opacity-30"></div>
          <div className="relative z-10 rounded-full bg-white p-4 shadow-2xl">
            <Image src="/images/logo_realestate.png" alt="Logo" width={64} height={64} className="animate-pulse" />
          </div>
          <div className="absolute -inset-6">
            <div className="h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
          </div>
        </div>

        {/* Progress section */}
        <div className="w-80 space-y-4">
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-gray-800">Real Estate Analyzer</p>
            <p className="text-sm text-gray-600 animate-pulse">{loadingText}</p>
            <p className="text-xs text-gray-500">{Math.round(progress)}% Complete</p>
          </div>
        </div>

        {/* Floating dots animation */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
