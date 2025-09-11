"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchInput, Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Header = () => {
  return (
    <Container>
      <header className="flex items-center justify-between gap-6">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.svg" width={35} height={35} alt="Logo" />
            <div className="sm:flex-col sm:gap-1 sm:flex hidden">
              <h1 className="text-2xl uppercase font-black">Vincento Pizza</h1>
              <p className="text-sm text-gray-400 leading-3 pl-1">
                найсмачніша піца у місті
              </p>
            </div>
          </div>
        </Link>
        <div className="flex-1 md:block hidden">
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="link">Увійти</Button>
          <ModeToggle />
        </div>
      </header>
    </Container>
  );
};
