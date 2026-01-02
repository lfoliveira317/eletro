import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";
import { CheckCircle2, CreditCard, Truck } from "lucide-react";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartTotal, cartCount, clearCart } = useCart();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartCount === 0) {
      setLocation("/cart");
    }
  }, [cartCount, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart(); // Clear cart on successful order
      setLocation("/order-success");
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 max-w-4xl">
        <h1 className="text-3xl font-oswald font-bold mb-6 text-slate-900">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Shipping Address */}
              <Card className="rounded-sm shadow-sm border-gray-200 mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Truck className="w-5 h-5 text-secondary" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" required placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" required placeholder="Rua Principal, 123" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" required placeholder="São Paulo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">CEP</Label>
                      <Input id="zip" required placeholder="01000-000" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="rounded-sm shadow-sm border-gray-200 mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-secondary" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input id="cardNumber" required placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" required placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" required placeholder="123" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6 text-lg rounded-sm shadow-md"
                disabled={isProcessing}
              >
                {isProcessing ? "Processando..." : "Finalizar Pedido"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card className="rounded-sm shadow-sm border-gray-200 sticky top-24">
              <CardHeader className="pb-3 bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-lg font-bold">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Itens ({cartCount}):</span>
                  <span className="font-medium">R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Frete:</span>
                  <span className="font-medium text-green-600">GRÁTIS</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Impostos (8%):</span>
                  <span className="font-medium">R$ {(cartTotal * 0.08).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-red-700">
                  <span>Total do Pedido:</span>
                  <span>R$ {(cartTotal * 1.08).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                
                <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Seu pedido se qualifica para frete grátis. Entrega prevista para <strong>Amanhã</strong>.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
