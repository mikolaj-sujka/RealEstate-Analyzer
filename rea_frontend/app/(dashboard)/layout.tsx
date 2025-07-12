"use client"

import { useState, useEffect, type ReactNode } from "react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import PageLoader from "@/components/page-loader"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-secondary/50">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
