import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "wouter";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  isBestSeller: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  // Generate stars array
  const stars = Array(5).fill(0).map((_, i) => i < Math.floor(product.rating));

  return (
    <Card className="h-full flex flex-col rounded-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white">
      <div className="relative pt-4 px-4 flex justify-center items-center h-48 bg-white group">
        {product.isBestSeller && (
          <Badge className="absolute top-0 left-0 rounded-none rounded-br-sm bg-secondary hover:bg-secondary text-white font-bold text-[10px] uppercase tracking-wider z-10">
            Best Seller
          </Badge>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col gap-1">
        <Link href={`/product/${product.id}`}>
          <a className="text-sm font-medium text-slate-900 hover:text-secondary hover:underline line-clamp-2 leading-tight mb-1">
            {product.name}
          </a>
        </Link>
        
        <div className="flex items-center gap-1 mb-1">
          <div className="flex text-yellow-500">
            {stars.map((filled, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${filled ? "fill-current" : "text-gray-300"}`} 
              />
            ))}
          </div>
          <span className="text-xs text-blue-600 hover:underline cursor-pointer hover:text-secondary">
            {product.reviews.toLocaleString()}
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-xs align-top mt-1">$</span>
            <span className="text-2xl font-bold text-slate-900">{Math.floor(product.price)}</span>
            <span className="text-xs align-top mt-1">{(product.price % 1).toFixed(2).substring(1)}</span>
          </div>
          
          <div className="text-xs text-slate-500 mt-1">
            Delivery <span className="font-bold text-slate-700">Tomorrow, Jan 2</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-sm h-8 text-xs shadow-sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
