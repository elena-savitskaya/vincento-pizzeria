"use client";

import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "@/services/api-client";
import { Product } from "@/prisma/generated/prisma";
import Link from "next/link";
import Image from "next/image";
import { Title } from "./title";

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      if (searchQuery.trim().length === 0) {
        setProducts([]);
        setHasSearched(false);
        return;
      }

      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
        setHasSearched(true);
      } catch (error) {
        console.log(error);
      }
    },
    50,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/80 z-40" />
      )}
      <div
        ref={ref}
        className="flex rounded-2xl flex-1 justify-between relative z-50"
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          onFocus={() => setFocused(true)}
          className="pl-11"
          type="text"
          placeholder="Знайти пицу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {hasSearched && products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <Image
                  className="rounded-sm"
                  src={product.imageUrl}
                  alt={product.name}
                  width={100}
                  height={100}
                />
                <Title
                  size="sm"
                  className="font-bold text-black"
                  text={product.name}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
