import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Top Navigation Bar - Industrial Dark Blue */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        {/* Main Header Row */}
        <div className="container mx-auto py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/">
            <a className="text-2xl font-bold tracking-tighter flex items-center gap-1 hover:opacity-90 transition-opacity">
              <span className="text-secondary text-3xl">⚡</span>
              <span className="font-oswald uppercase">Eletro</span>
            </a>
          </Link>

          {/* Location (Amazon style) */}
          <div className="hidden md:flex flex-col text-xs leading-tight hover:outline outline-1 outline-white p-1 rounded cursor-pointer">
            <span className="text-muted-foreground text-[10px]">Deliver to</span>
            <div className="flex items-center font-bold">
              <MapPin className="w-3 h-3 mr-1" />
              <span>New York 10001</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex max-w-3xl mx-4">
            <div className="flex w-full">
              <div className="relative w-full flex items-center">
                <select className="h-10 px-2 text-xs bg-muted text-foreground border-r border-input rounded-l-sm focus:outline-none cursor-pointer hidden sm:block">
                  <option>All Departments</option>
                  <option>Tools</option>
                  <option>Appliances</option>
                  <option>Cleaning</option>
                </select>
                <Input 
                  type="search" 
                  placeholder="Search tools, appliances..." 
                  className="h-10 w-full rounded-none sm:rounded-l-none rounded-r-none bg-white text-black border-none focus-visible:ring-2 focus-visible:ring-secondary"
                />
                <Button 
                  size="icon" 
                  className="h-10 w-12 rounded-l-none rounded-r-sm bg-secondary hover:bg-secondary/90 text-white border-none"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 text-sm">
            <div className="hidden md:flex flex-col hover:outline outline-1 outline-white p-1 rounded cursor-pointer">
              <span className="text-[10px]">Hello, Sign in</span>
              <span className="font-bold">Account & Lists</span>
            </div>

            <div className="hidden md:flex flex-col hover:outline outline-1 outline-white p-1 rounded cursor-pointer">
              <span className="text-[10px]">Returns</span>
              <span className="font-bold">& Orders</span>
            </div>

            <Link href="/cart">
              <a className="flex items-end hover:outline outline-1 outline-white p-2 rounded relative">
                <div className="relative">
                  <ShoppingCart className="h-7 w-7" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-white border-none rounded-full">
                    0
                  </Badge>
                </div>
                <span className="font-bold ml-1 hidden sm:inline">Cart</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Secondary Navigation Row */}
        <div className="bg-slate-800 text-white text-sm py-2 border-t border-slate-700">
          <div className="container mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-1 font-bold hover:text-secondary transition-colors whitespace-nowrap">
              <Menu className="h-5 w-5" />
              All
            </button>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Today's Deals</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Customer Service</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Registry</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Gift Cards</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Sell</a></Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-10">
        <div className="bg-slate-700 py-4 text-center hover:bg-slate-600 transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-sm font-medium">Back to top</span>
        </div>
        
        <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4 text-base">Get to Know Us</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">About Eletro</a></li>
              <li><a href="#" className="hover:underline">Investor Relations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Make Money with Us</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Sell products on Eletro</a></li>
              <li><a href="#" className="hover:underline">Sell on Eletro Business</a></li>
              <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Eletro Payment Products</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Eletro Business Card</a></li>
              <li><a href="#" className="hover:underline">Shop with Points</a></li>
              <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Let Us Help You</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><a href="#" className="hover:underline">Your Orders</a></li>
              <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
              <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 py-8 text-center text-slate-400 text-xs">
          <div className="mb-2">
            <span className="text-2xl font-bold text-white font-oswald tracking-tighter mr-1">Eletro</span>
          </div>
          <p>&copy; 2024-2025, Eletro.com, Inc. or its affiliates</p>
        </div>
      </footer>
    </div>
  );
}
