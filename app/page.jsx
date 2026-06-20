import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Bell, LogIn, Mail, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function Home() {
 
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  const products = user? await getProducts() : [];

   const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
   <main className="min-h-screen flex flex-col bg-linear-to-br from-orange-50 via-white to-orange-50">
    <header className="bg-white/80 backdrop-blue-sm border-b border-gray-200 sticky top-0 z-10 ">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex item-center gap-3">
         <Image src={'/deal-drop-logo.png'} alt="deal drop logo"
         width={600}
         height={200}
         className="h-10 w-auto"
         />

        </div>
        {/* AuthButton */}
        <AuthButton user={user}/>
      </div>
    </header>

    {/* Hero Section */}
    <section className="py-20 px-4">
      <div  className="max-w-7xl mx-auto text-center">
        <button  className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium mb-6" >
             <Link href="https://digitalheroesco.com" className="text-red-700">Built For Digital Heroes</Link>
        </button>

          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Never Miss a Price Drop
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </p>
        
        {/* Add Product Form  */}
       <AddProductForm user={user} />

        {/* Features */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}

      </div>
    </section>

    {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Tracked Products
            </h3>
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
   
         {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-150 bg-white/60 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <span>Name -</span>
          
            <span className="font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-200">
              Muzahir Ali
            </span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="mailto:muzahirraza509@gmail.com"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-100 hover:border-orange-200 text-sm text-gray-600 hover:text-orange-700 transition-all duration-300 shadow-xs"
            >
              <Mail className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">muzahirraza509@gmail.com</span>
            </a>
          </div>
        </div>
      </footer>
   </main>
  );
}
