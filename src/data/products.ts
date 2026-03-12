import { Smartphone, Laptop, Bike, Wind, Sun, Sofa, Car, Package, Boxes, ShoppingBag } from "lucide-react";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  themeColor: string;
  themeBg: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  shopId: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  installmentOptions: (6 | 12)[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  rating: number;
  productCount: number;
  isActive: boolean;
}

export const categories: ProductCategory[] = [
  { id: "phones", name: "Smartphones", slug: "smartphones", icon: Smartphone, description: "Latest iPhones & Android", themeColor: "text-coral", themeBg: "bg-coral/10" },
  { id: "laptops", name: "Laptops", slug: "laptops", icon: Laptop, description: "MacBooks, Gaming & More", themeColor: "text-teal", themeBg: "bg-teal/10" },
  { id: "bikes", name: "Scotty & Bikes", slug: "bikes", icon: Bike, description: "Motor Cycles & Scotties", themeColor: "text-amber", themeBg: "bg-amber/10" },
  { id: "appliances", name: "Appliances", slug: "appliances", icon: Wind, description: "AC, LED, Fridge & More", themeColor: "text-coral-dark", themeBg: "bg-coral-dark/10" },
  { id: "solar", name: "Solar Systems", slug: "solar", icon: Sun, description: "Complete Solar Solutions", themeColor: "text-amber", themeBg: "bg-amber/10" },
  { id: "furniture", name: "Furniture", slug: "furniture", icon: Sofa, description: "Home & Office Furniture", themeColor: "text-navy", themeBg: "bg-navy/10" },
  { id: "jahez", name: "Jahez Packages", slug: "jahez", icon: Package, description: "Bundle 4-5 Item Packages", themeColor: "text-coral", themeBg: "bg-coral/10" },
  { id: "cars", name: "Car Financing", slug: "cars", icon: Car, description: "Easy Car Installments", themeColor: "text-teal", themeBg: "bg-teal/10" },
  { id: "raw-materials", name: "Business Stock", slug: "raw-materials", icon: Boxes, description: "Raw Materials & Stock", themeColor: "text-navy-light", themeBg: "bg-navy-light/10" },
  { id: "general", name: "General Store", slug: "general", icon: ShoppingBag, description: "Everything Else", themeColor: "text-coral-light", themeBg: "bg-coral-light/10" },
];

export const featuredProducts: Product[] = [
  { id: "1", name: "iPhone 15 Pro Max 256GB", categoryId: "phones", shopId: "s1", price: 549999, originalPrice: 599999, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", description: "Latest Apple flagship", installmentOptions: [6, 12], rating: 4.8, reviews: 234, inStock: true },
  { id: "2", name: "MacBook Air M3 15\"", categoryId: "laptops", shopId: "s1", price: 429999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", description: "Powerful and lightweight", installmentOptions: [6, 12], rating: 4.9, reviews: 156, inStock: true },
  { id: "3", name: "Honda CD 70 2026", categoryId: "bikes", shopId: "s2", price: 155000, originalPrice: 165000, image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop", description: "Most reliable motorcycle", installmentOptions: [6, 12], rating: 4.5, reviews: 89, inStock: true },
  { id: "7", name: "Complete Jahez Package Gold", categoryId: "jahez", shopId: "s2", price: 850000, originalPrice: 950000, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", description: "Fridge + Furniture + Appliances", installmentOptions: [12], rating: 4.3, reviews: 28, inStock: true },
   { id: "5", name: "5KW Solar Panel System", categoryId: "solar", shopId: "s3", price: 650000, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop", description: "Complete solar solution", installmentOptions: [12], rating: 4.7, reviews: 45, inStock: true },
  { id: "4", name: "Gree 1.5 Ton Inverter AC", categoryId: "appliances", shopId: "s2", price: 155000, originalPrice: 180000, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop", description: "Energy efficient cooling", installmentOptions: [6, 12], rating: 4.7, reviews: 289, inStock: true },
  { id: "6", name: "Royal Bedroom Set", categoryId: "furniture", shopId: "s3", price: 285000, originalPrice: 320000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", description: "Complete bedroom furniture", installmentOptions: [6, 12], rating: 4.4, reviews: 67, inStock: true },
  { id: "8", name: "Samsung Galaxy S24 Ultra", categoryId: "phones", shopId: "s1", price: 449999, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop", description: "AI-powered smartphone", installmentOptions: [6, 12], rating: 4.7, reviews: 198, inStock: true },
  { id: "9", name: "55\" Smart LED TV 4K", categoryId: "appliances", shopId: "s2", price: 95000, originalPrice: 110000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", description: "Ultra HD Smart TV", installmentOptions: [6, 12], rating: 4.5, reviews: 421, inStock: true },
  { id: "10", name: "Toyota Corolla 2024", categoryId: "cars", shopId: "s3", price: 5950000, image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=400&fit=crop", description: "Brand new sedan", installmentOptions: [12], rating: 4.9, reviews: 12, inStock: true },
];

export const shops: Shop[] = [
  { id: "s1", name: "TechZone Electronics", description: "Premium electronics & gadgets", category: "Electronics", logo: "🔌", rating: 4.8, productCount: 156, isActive: true },
  { id: "s2", name: "HomeKart Pakistan", description: "Appliances, furniture & packages", category: "Home & Living", logo: "🏠", rating: 4.6, productCount: 243, isActive: true },
  { id: "s3", name: "MegaDeal Motors", description: "Vehicles, solar & heavy items", category: "Motors & Energy", logo: "🚗", rating: 4.7, productCount: 89, isActive: true },
];

export const formatPrice = (price: number): string => {
  return `PKR ${price.toLocaleString()}`;
};

export const getMonthlyInstallment = (price: number, months: 6 | 12): string => {
  return formatPrice(Math.ceil(price / months));
};
