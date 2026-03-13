import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { featuredProducts, formatPrice, getMonthlyInstallment } from "@/data/products";
import { CreditCard, ArrowLeft } from "lucide-react";

const VendorProductDetail = () => {
  const { id } = useParams();
  const product = featuredProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-4">😕</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Product not found</h2>
            <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="max-w-[1240px] mx-auto px-5 py-10 flex-1 w-full">
        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to product
        </Link>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-80 shrink-0 border rounded-xl overflow-hidden bg-gray-50 p-6">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-3xl font-black text-blue-600 mb-2">{formatPrice(product.price)}</p>
            <p className="text-sm text-gray-500 mb-6">{product.description}</p>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-600">Installment Plans</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[3, 6, 12, 24].map((months) => (
                  <div key={months} className="bg-white rounded-lg p-3 text-center border border-blue-100">
                    <p className="text-xs text-gray-400 mb-1">{months} Months</p>
                    <p className="text-base font-black text-blue-600">{getMonthlyInstallment(product.price, months)}</p>
                    <p className="text-[10px] text-gray-400">per month</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to={`/product/${product.id}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              <CreditCard className="w-4 h-4" /> Buy on Installment
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorProductDetail;
