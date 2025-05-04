"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { NavigationProps } from "@/models/navigation";
import * as S from "./Navigation.styled";
import LanguageToggle from "./LanguageToggle/LanguageToggle";

export const NAV_ITEMS = [
  { label: "Start", href: "/" },
  { label: "Czym jest Real Estate Analyzer", href: "/about" },
  { label: "Moduły", href: "/modules" },
];

const Navigation: FC<NavigationProps> = ({ }) => {
  const pathname = usePathname();

  return (
    <S.Header>
      <S.Container>
        <S.LogoLink href="/">
          <Image src="/logo.png" alt="REAL ESTATE" width={60} height={60} />
          <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            REAL ESTATE
          </span>
        </S.LogoLink>

        <S.Nav>
          {NAV_ITEMS.map((item) => (
            <S.NavLink
              key={item.href}
              href={item.href}
              $active={pathname === item.href}
            >
              {item.label}
            </S.NavLink>
          ))}
        </S.Nav>

        <S.RightActions>
          <S.ButtonLink href="/app">
            Przejdź do Real Estate Analyzer
          </S.ButtonLink>
          <LanguageToggle />
        </S.RightActions>
      </S.Container>
    </S.Header>
  );
};

export default Navigation;
