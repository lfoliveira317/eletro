import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

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
            
            {items.length === 0 ? (
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
            ) : (
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0">
                    <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded p-2">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.id}`}>
                          <a className="text-lg font-medium text-slate-900 hover:text-secondary hover:underline line-clamp-2">
                            {item.name}
                          </a>
                        </Link>
                        <div className="text-lg font-bold text-slate-900">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="text-sm text-green-700 font-medium">In Stock</div>
                      <div className="text-xs text-slate-500">Eligible for FREE Shipping</div>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <label htmlFor={`qty-${item.id}`} className="text-sm text-slate-600">Qty:</label>
                          <select 
                            id={`qty-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="p-1 bg-gray-50 border border-gray-300 rounded-sm text-sm focus:ring-secondary focus:border-secondary"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-blue-600 hover:underline hover:text-secondary flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end pt-2">
                  <div className="text-lg">
                    Subtotal ({cartCount} items): <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Subtotal / Checkout Section */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 sticky top-24">
              {cartTotal >= 35 && (
                <div className="flex items-center gap-2 text-green-700 text-sm mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Your order qualifies for FREE Shipping.</span>
                </div>
              )}
              
              <div className="text-lg font-medium mb-4">
                Subtotal ({cartCount} items): <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="gift" className="rounded-sm border-gray-300 text-secondary focus:ring-secondary" />
                <label htmlFor="gift" className="text-sm text-slate-700">This order contains a gift</label>
              </div>
              
              <Link href="/checkout">
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-sm shadow-sm mb-4"
                  disabled={items.length === 0}
                >
                  Proceed to checkout
                </Button>
              </Link>
              
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
