"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { NavigationProps } from "@/models/navigation";

export const NAV_ITEMS = [
  { label: "Start", href: "/" },
  { label: "Czym jest Real Estate Analyzer", href: "/about" },
  { label: "Moduły", href: "/modules" },
];

const Navigation: FC<NavigationProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <header className="bg-[#040813] text-white">
      <div className="mx-10 px-4 flex items-center justify-around h-16">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="REAL ESTATE" width={60} height={60} />
          <span className="text-xl font-semibold">REAL ESTATE</span>
        </Link>

        {/* To fix ml-30 */}
        <nav className="hidden md:flex space-x-6 ml-30">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-gray-300 transition-colors ${
                pathname === item.href ? "text-white" : "text-gray-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/app"
            className="bg-[var(--secondary)] shadow-md border border-white/20
            hover:bg-[var(--navbar-button-hover)] text-white px-4 py-2 rounded-md transition-colors"
          >
            Przejdź do Real Estate Analyzer
          </Link>
          {children}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
