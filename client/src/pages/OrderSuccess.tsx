import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package } from "lucide-react";
import { Link } from "wouter";

export default function OrderSuccess() {
  const orderNumber = Math.floor(100000000 + Math.random() * 900000000);

  return (
    <Layout>
      <div className="container mx-auto py-12 max-w-2xl text-center">
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-oswald font-bold mb-2 text-slate-900">Order Placed Successfully!</h1>
          <p className="text-slate-600 mb-6">Thank you for shopping with Eletro.</p>
          
          <div className="bg-gray-50 p-4 rounded-sm border border-gray-100 mb-8 inline-block text-left w-full">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-secondary" />
              <span className="font-bold text-slate-800">Order #{orderNumber}</span>
            </div>
            <p className="text-sm text-slate-600 ml-8">
              A confirmation email has been sent to your email address.
              We will notify you when your items have shipped.
            </p>
          </div>
          
          <Link href="/">
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-2 rounded-sm">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
