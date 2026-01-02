import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Truck, ShieldCheck, RotateCcw, MapPin } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/components/ProductCard";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (match && params?.id) {
      const found = productsData.find(p => p.id === params.id);
      if (found) setProduct(found);
    }
  }, [match, params]);

  if (!product) return <Layout><div className="p-10 text-center">Loading...</div></Layout>;

  const stars = Array(5).fill(0).map((_, i) => i < Math.floor(product.rating));

  return (
    <Layout>
      <div className="container mx-auto py-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-4 flex items-center gap-1">
          <span className="hover:underline cursor-pointer">Home</span> &gt; 
          <span className="hover:underline cursor-pointer">{product.category}</span> &gt; 
          <span className="font-bold text-slate-700">{product.name}</span>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Image Section */}
            <div className="md:col-span-5 flex justify-center items-start sticky top-24">
              <div className="w-full aspect-square relative flex items-center justify-center border border-gray-100 rounded p-4">
                {product.isBestSeller && (
                  <Badge className="absolute top-2 left-2 bg-secondary hover:bg-secondary text-white font-bold text-xs uppercase tracking-wider z-10 rounded-sm">
                    Best Seller
                  </Badge>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="md:col-span-4 space-y-4">
              <h1 className="text-2xl md:text-3xl font-medium text-slate-900 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 text-sm">
                <a href="#" className="text-blue-600 hover:underline hover:text-secondary font-medium">Visit the {product.brand} Store</a>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500 text-sm">
                  {stars.map((filled, i) => (
                    <Star key={i} className={`w-4 h-4 ${filled ? "fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-blue-600 hover:underline text-sm cursor-pointer">{product.reviews.toLocaleString()} ratings</span>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm align-top mt-1.5 text-slate-600 font-medium">Price:</span>
                  <span className="text-sm align-top mt-1.5 text-secondary font-bold">$</span>
                  <span className="text-3xl font-bold text-secondary">{Math.floor(product.price)}</span>
                  <span className="text-sm align-top mt-1.5 text-secondary font-bold">{(product.price % 1).toFixed(2).substring(1)}</span>
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-bold text-slate-800">Free Returns</span>
                </div>
                <div className="text-sm text-slate-600">
                  Join <span className="font-bold text-blue-600">Prime</span> to save $15.00 on this item.
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-bold text-sm">About this item</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                  <li>{product.description}</li>
                  <li>Professional grade durability and performance.</li>
                  <li>Designed for efficiency and precision in every task.</li>
                  <li>Backed by {product.brand}'s standard warranty.</li>
                </ul>
              </div>
            </div>

            {/* Buy Box Section */}
            <div className="md:col-span-3">
              <div className="border border-gray-300 rounded-sm p-4 space-y-4 shadow-sm bg-white">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs align-top mt-1">$</span>
                  <span className="text-2xl font-bold text-slate-900">{Math.floor(product.price)}</span>
                  <span className="text-xs align-top mt-1">{(product.price % 1).toFixed(2).substring(1)}</span>
                </div>

                <div className="text-sm">
                  <div className="text-slate-600 mb-1">
                    Delivery <span className="font-bold text-slate-800">Tomorrow, Jan 2</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span className="text-blue-600 hover:underline cursor-pointer">Deliver to New York 10001</span>
                  </div>
                </div>

                <div className="text-lg font-medium text-green-700">In Stock</div>

                <div className="space-y-2">
                  <label className="text-xs font-bold">Qty:</label>
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 pt-2">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full shadow-sm">
                    Add to Cart
                  </Button>
                  <Button className="w-full bg-orange-400 hover:bg-orange-500 text-slate-900 font-bold rounded-full shadow-sm">
                    Buy Now
                  </Button>
                </div>

                <div className="text-xs text-slate-500 space-y-1 pt-2">
                  <div className="grid grid-cols-2">
                    <span className="text-slate-400">Ships from</span>
                    <span>Eletro.com</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-slate-400">Sold by</span>
                    <span>Eletro.com</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-slate-400">Returns</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Returnable until Jan 31</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Additional Info / Specs Mockup */}
        <div className="mt-8 bg-white p-6 rounded-sm shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold font-oswald mb-4 text-slate-800">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Brand</span>
              <span>{product.brand}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Item Weight</span>
              <span>4.5 Pounds</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Product Dimensions</span>
              <span>10 x 5 x 8 inches</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Color</span>
              <span>Multi</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Material</span>
              <span>Plastic, Metal</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Power Source</span>
              <span>Battery Powered / Corded</span>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
