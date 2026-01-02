import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { Search, ShoppingCart, Menu, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Top Navigation Bar - Industrial Dark Blue */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        {/* Main Header Row */}
        <div className="container mx-auto py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center hover:opacity-90 transition-opacity">
              <img src="/images/logo.png" alt="Facilitate Comercial" className="h-12 w-auto object-contain bg-white/90 rounded px-2 py-1" />
            </a>
          </Link>

          {/* Location (Amazon style) */}
          <div className="hidden md:flex flex-col text-xs leading-tight hover:outline outline-1 outline-white p-1 rounded cursor-pointer">
            <span className="text-muted-foreground text-[10px]">Enviar para</span>
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
                  <option>Todos os Departamentos</option>
                  <option>Ferramentas</option>
                  <option>Eletrodomésticos</option>
                  <option>Limpeza</option>
                </select>
                <Input 
                  type="search" 
                  placeholder="Buscar ferramentas, eletrodomésticos..." 
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
              <span className="text-[10px]">Olá, Visitante</span>
              <span className="font-bold">Comece a Comprar</span>
            </div>

            <Link href="/cart">
              <a className="flex items-end hover:outline outline-1 outline-white p-2 rounded relative">
                <div className="relative">
                  <ShoppingCart className="h-7 w-7" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-white border-none rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                </div>
                <span className="font-bold ml-1 hidden sm:inline">Carrinho</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Secondary Navigation Row */}
        <div className="bg-[#1e293b] text-white text-sm py-2 border-t border-slate-700">
          <div className="container mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-1 font-bold hover:text-secondary transition-colors whitespace-nowrap">
              <Menu className="h-5 w-5" />
              Todos
            </button>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Ofertas do Dia</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Atendimento ao Cliente</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Listas</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Cartões Presente</a></Link>
            <Link href="/"><a className="hover:text-secondary transition-colors whitespace-nowrap">Vender</a></Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e293b] text-white pt-10">
        <div className="bg-slate-700 py-4 text-center hover:bg-slate-600 transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-sm font-medium">Voltar ao topo</span>
        </div>
        
        <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4 text-base">Conheça-nos</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Carreiras</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Sobre a Eletro</a></li>
              <li><a href="#" className="hover:underline">Relações com Investidores</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Ganhe Dinheiro Conosco</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Venda na Eletro</a></li>
              <li><a href="#" className="hover:underline">Venda na Eletro Empresas</a></li>
              <li><a href="#" className="hover:underline">Seja um Afiliado</a></li>
              <li><a href="#" className="hover:underline">Anuncie Seus Produtos</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Pagamentos Eletro</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Cartão Eletro</a></li>
              <li><a href="#" className="hover:underline">Compre com Pontos</a></li>
              <li><a href="#" className="hover:underline">Recarregue seu Saldo</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Deixe-nos Ajudar</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:underline">Sua Conta</a></li>
              <li><a href="#" className="hover:underline">Seus Pedidos</a></li>
              <li><a href="#" className="hover:underline">Frete e Prazos</a></li>
              <li><a href="#" className="hover:underline">Devoluções e Reembolsos</a></li>
              <li><a href="#" className="hover:underline">Ajuda</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 py-8 text-center text-slate-400 text-xs">
          <div className="mb-4 flex justify-center">
            <img src="/images/logo.png" alt="Facilitate Comercial" className="h-8 w-auto object-contain bg-white/90 rounded px-2 py-1" />
          </div>
          <p>&copy; 2024-2025, Facilitate Comercial, Inc. ou suas afiliadas</p>
        </div>
      </footer>
    </div>
  );
}
