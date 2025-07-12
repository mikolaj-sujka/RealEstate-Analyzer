"use client"

import type React from "react"
import { Settings, HelpCircle } from "lucide-react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BarChart3, TrendingUp, PieChart, Map, BarChartHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const navSections = [
  {
    title: "Overview",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Analysis",
    items: [
      { href: "/trends", label: "Trend Comparison", icon: TrendingUp },
      { href: "/distribution", label: "Distribution", icon: PieChart },
      { href: "/map", label: "Property Map", icon: Map },
      { href: "/cities", label: "City Comparison", icon: BarChartHorizontal },
    ],
  },
]

const bottomNav = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  const NavLink = ({ item }: { item: { href: string; label: string; icon: React.ElementType } }) => (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        pathname === item.href && "bg-secondary text-foreground",
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  )

  return (
    <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
      <div className="flex h-16 items-center justify-center border-b px-6">
        <Link href="/">
          <Image src="/images/logo_realestate.png" alt="Logo" width={48} height={48} />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                {section.title}
              </h2>
              {section.items.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="space-y-1">
          {bottomNav.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </div>
      </div>
    </aside>
  )
}
