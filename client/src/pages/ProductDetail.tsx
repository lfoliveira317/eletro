import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Truck, ShieldCheck, RotateCcw, MapPin } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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
          <span className="hover:underline cursor-pointer">Início</span> &gt; 
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
                    Mais Vendido
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
                  <a href="#" className="text-blue-600 hover:underline hover:text-secondary font-medium">Visite a Loja {product.brand}</a>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500 text-sm">
                  {stars.map((filled, i) => (
                    <Star key={i} className={`w-4 h-4 ${filled ? "fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-blue-600 hover:underline text-sm cursor-pointer">{product.reviews.toLocaleString()} avaliações</span>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm align-top mt-1.5 text-slate-600 font-medium">Preço:</span>
                  <span className="text-sm align-top mt-1.5 text-secondary font-bold mr-0.5">R$</span>
                  <span className="text-3xl font-bold text-secondary">{Math.floor(product.price)}</span>
                  <span className="text-sm align-top mt-1.5 text-secondary font-bold">,{(product.price % 1).toFixed(2).substring(2)}</span>
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-bold text-slate-800">Devoluções Grátis</span>
                </div>
                <div className="text-sm text-slate-600">
                  Junte-se ao <span className="font-bold text-blue-600">Prime</span> para economizar R$ 15,00 neste item.
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-bold text-sm">Sobre este item</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                  <li>{product.description}</li>
                  <li>Durabilidade e desempenho de nível profissional.</li>
                  <li>Projetado para eficiência e precisão em cada tarefa.</li>
                  <li>Garantido pela garantia padrão da {product.brand}.</li>
                </ul>
              </div>
            </div>

            {/* Buy Box Section */}
            <div className="md:col-span-3">
              <div className="border border-gray-300 rounded-sm p-4 space-y-4 shadow-sm bg-white">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs align-top mt-1 mr-0.5">R$</span>
                  <span className="text-2xl font-bold text-slate-900">{Math.floor(product.price)}</span>
                  <span className="text-xs align-top mt-1">,{(product.price % 1).toFixed(2).substring(2)}</span>
                </div>

                <div className="text-sm">
                  <div className="text-slate-600 mb-1">
                    Entrega <span className="font-bold text-slate-800">Amanhã, 2 de Jan</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span className="text-blue-600 hover:underline cursor-pointer">Enviar para New York 10001</span>
                  </div>
                </div>

                <div className="text-lg font-medium text-green-700">Em Estoque</div>

                <div className="space-y-2">
                  <label className="text-xs font-bold">Qtd:</label>
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
                  <Button 
                    onClick={() => product && addToCart(product, quantity)}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full shadow-sm"
                  >
                    Adicionar ao Carrinho
                  </Button>
                  <Button className="w-full bg-orange-400 hover:bg-orange-500 text-slate-900 font-bold rounded-full shadow-sm">
                    Comprar Agora
                  </Button>
                </div>

                <div className="text-xs text-slate-500 space-y-1 pt-2">
                  <div className="grid grid-cols-2">
                    <span className="text-slate-400">Enviado por</span>
                    <span>Eletro.com</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-slate-400">Vendido por</span>
                    <span>Eletro.com</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-slate-400">Devoluções</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Devolvível até 31 de Jan</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Additional Info / Specs Mockup */}
        <div className="mt-8 bg-white p-6 rounded-sm shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold font-oswald mb-4 text-slate-800">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Marca</span>
              <span>{product.brand}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Peso do Item</span>
              <span>4.5 Libras</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Dimensões do Produto</span>
              <span>10 x 5 x 8 polegadas</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Cor</span>
              <span>Multi</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Material</span>
              <span>Plástico, Metal</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-gray-100">
              <span className="text-slate-500 font-medium">Fonte de Energia</span>
              <span>Bateria / Com Fio</span>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
