import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items Section */}
          <div className="lg:col-span-9 bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <div className="flex justify-between items-end mb-2">
              <h1 className="text-2xl font-medium text-slate-900">Shopping Cart</h1>
              <span className="text-sm text-slate-500">Price</span>
            </div>
            <Separator className="mb-6" />
            
            <div className="text-center py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="bg-slate-100 p-6 rounded-full">
                  <span className="text-4xl">🛒</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Your Eletro Cart is empty</h2>
                <p className="text-slate-600">Check out our latest tools and appliances to find what you need.</p>
                <Link href="/">
                  <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold mt-4">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Mock Saved for later */}
            <div className="mt-12">
              <h2 className="text-xl font-medium text-slate-900 mb-4">Your Items</h2>
              <div className="flex gap-4 text-sm text-blue-600">
                <span className="border-b-2 border-secondary pb-1 text-black font-bold cursor-pointer">Saved for later (0)</span>
                <span className="hover:underline hover:text-secondary cursor-pointer">Buy it again</span>
              </div>
              <Separator className="mt-0" />
              <div className="py-8 text-sm text-slate-500">
                No items saved for later.
              </div>
            </div>
          </div>

          {/* Subtotal / Checkout Section */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 sticky top-24">
              <div className="flex items-center gap-2 text-green-700 text-sm mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span>Your order qualifies for FREE Shipping.</span>
              </div>
              
              <div className="text-lg font-medium mb-4">
                Subtotal (0 items): <span className="font-bold">$0.00</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="gift" className="rounded-sm border-gray-300 text-secondary focus:ring-secondary" />
                <label htmlFor="gift" className="text-sm text-slate-700">This order contains a gift</label>
              </div>
              
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-sm shadow-sm mb-4">
                Proceed to checkout
              </Button>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="font-bold text-sm">Recent views</h3>
                {/* Mock recent items */}
                <div className="flex gap-2 overflow-hidden">
                  <div className="w-16 h-16 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-400">Item</div>
                  <div className="w-16 h-16 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-400">Item</div>
                  <div className="w-16 h-16 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-400">Item</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
