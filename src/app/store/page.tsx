"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Wallet, Tag } from "lucide-react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "clothing" | "accessories" | "collectibles";
  inStock: boolean;
};

const products: Product[] = [
  {
    id: "tshirt-black",
    name: "CharityChain T-Shirt",
    description: "Premium cotton t-shirt with embroidered logo",
    price: 500, // 500 tokens
    image: "/images/store/tshirt.png",
    category: "clothing",
    inStock: true,
  },
  {
    id: "hoodie-gray",
    name: "Developer Hoodie",
    description: "Comfortable hoodie with blockchain design",
    price: 1000,
    image: "/images/store/hoodie.png",
    category: "clothing",
    inStock: true,
  },
  {
    id: "cap-navy",
    name: "Classic Cap",
    description: "Adjustable cap with embroidered logo",
    price: 300,
    image: "/images/store/cap.png",
    category: "accessories",
    inStock: true,
  },
  {
    id: "bottle-steel",
    name: "Water Bottle",
    description: "Stainless steel bottle with logo",
    price: 400,
    image: "/images/store/bottle.png",
    category: "accessories",
    inStock: true,
  },
  {
    id: "sticker-pack",
    name: "Sticker Pack",
    description: "Set of 5 vinyl stickers",
    price: 100,
    image: "/images/store/stickers.png",
    category: "collectibles",
    inStock: true,
  },
  {
    id: "nft-badge",
    name: "Limited NFT Badge",
    description: "Exclusive NFT badge for token holders",
    price: 2000,
    image: "/images/store/nft-badge.png",
    category: "collectibles",
    inStock: true,
  },
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const userTokens = 1000; // This should come from your wallet/backend

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "clothing", name: "Clothing" },
    { id: "accessories", name: "Accessories" },
    { id: "collectibles", name: "Collectibles" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto mt-16">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-red-950 dark:text-rose-50">
                CharityChain Store
              </h1>
              <p className="text-lg text-red-800/60 dark:text-rose-100/60">
                Redeem your tokens for exclusive merchandise
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-950 dark:text-rose-50">
                  {userTokens} Tokens
                </span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2">Cart (0)</span>
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id 
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-red-200 dark:border-red-800"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id}
                className="overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-sm"
              >
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-red-950 dark:text-rose-50">
                    {product.name}
                  </h3>
                  <p className="text-red-800/60 dark:text-rose-100/60 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-950 dark:text-rose-50">
                        {product.price} Tokens
                      </span>
                    </div>
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!product.inStock || userTokens < product.price}
                    >
                      {product.inStock ? (
                        userTokens >= product.price ? "Add to Cart" : "Insufficient Tokens"
                      ) : (
                        "Out of Stock"
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 