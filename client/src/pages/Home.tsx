import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProductCard, { Product } from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import productsData from "@/data/products.json";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);

  useEffect(() => {
    // Load products from JSON
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    // Filter logic
    let result = products;

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(result);
  }, [selectedBrands, selectedCategories, priceRange, products]);

  const brands = Array.from(new Set(products.map(p => p.brand)));
  const categories = Array.from(new Set(products.map(p => p.category)));

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="w-full bg-slate-900 relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent z-10 pointer-events-none"></div>
        <img 
          src="/images/hero-banner.jpg" 
          alt="Eletro Workshop" 
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2 z-20 max-w-lg text-white">
          <h1 className="text-4xl md:text-6xl font-oswald font-bold mb-4 tracking-tight drop-shadow-lg">
            BUILT FOR <span className="text-secondary">PROS</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-slate-200 drop-shadow-md font-light">
            Industrial grade tools and premium home appliances for the modern maker.
          </p>
          <button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-sm shadow-lg transition-transform hover:scale-105">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Category Cards (Negative Margin overlap) */}
      <div className="container mx-auto -mt-16 relative z-30 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Power Tools", img: "/images/category-tools.jpg", link: "#" },
            { name: "Home Appliances", img: "/images/category-appliances.jpg", link: "#" },
            { name: "Cleaning Solutions", img: "/images/category-cleaning.jpg", link: "#" }
          ].map((cat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-sm shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center group">
              <h3 className="text-xl font-bold font-oswald mb-2 text-slate-800 group-hover:text-secondary transition-colors">{cat.name}</h3>
              <div className="w-full aspect-square overflow-hidden mb-3">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-sm text-blue-600 hover:underline hover:text-secondary">See more</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto pb-12 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6 bg-white p-4 rounded-sm shadow-sm h-fit">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">Filters</h3>
            {(selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 300) && (
              <button 
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPriceRange([0, 300]);
                }}
                className="text-xs text-blue-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <Separator />

          <div>
            <h3 className="font-bold text-sm mb-2">Department</h3>
            <div className="space-y-1.5">
              {categories.map(cat => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cat-${cat}`} 
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                    className="rounded-[2px] data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer hover:text-secondary">{cat}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-bold text-sm mb-2">Featured Brands</h3>
            <div className="space-y-1.5">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                    className="rounded-[2px] data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer hover:text-secondary">{brand}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-bold text-sm mb-4">Price</h3>
            <Slider 
              defaultValue={[0, 300]} 
              max={300} 
              step={10} 
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="border px-2 py-1 rounded-sm bg-slate-50">${priceRange[0]}</span>
              <span className="text-slate-400">-</span>
              <span className="border px-2 py-1 rounded-sm bg-slate-50">${priceRange[1]}+</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-bold text-sm mb-2">Avg. Customer Review</h3>
            <div className="space-y-1 cursor-pointer">
              {[4, 3, 2, 1].map(stars => (
                <div key={stars} className="flex items-center gap-1 hover:bg-slate-50 p-1 -ml-1 rounded">
                  <div className="flex text-yellow-500">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={i < stars ? "fill-current" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">& Up</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between bg-white p-2 px-4 rounded-sm shadow-sm border border-gray-200">
            <span className="text-sm font-bold">{filteredProducts.length} results</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select className="text-sm border-none bg-transparent font-medium focus:outline-none cursor-pointer hover:text-secondary">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Avg. Customer Review</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-sm shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
