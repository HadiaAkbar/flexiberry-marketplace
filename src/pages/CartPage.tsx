import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trash2, Plus, Minus, ArrowLeft, Gift, Truck, Shield, Clock } from "lucide-react";
import { formatPrice, getMonthlyInstallment } from "@/data/products";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(20);
    } else if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shippingCost = subtotal > 0 ? (subtotal > 500000 ? 0 : 2000) : 0;
  const total = subtotal - discountAmount + shippingCost;

  const groupedByShop = cartItems.reduce(
    (acc, item) => {
      const shop = acc.find((s) => s.shopId === item.shopId);
      if (shop) {
        shop.items.push(item);
      } else {
        acc.push({ shopId: item.shopId, shopName: item.shopName, items: [item] });
      }
      return acc;
    },
    [] as Array<{ shopId: string; shopName: string; items: typeof cartItems }>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-semibold"
          >
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to your cart to get started!</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {groupedByShop.map((shop) => (
                <div key={shop.shopId} className="mb-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Shop header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">{shop.shopName}</h3>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-100">
                    {shop.items.map((item) => {
                      const itemDiscount = item.originalPrice
                        ? Math.round(
                            ((item.originalPrice - item.price) / item.originalPrice) * 100
                          )
                        : 0;

                      return (
                        <div key={item.id} className="p-6 flex gap-6 hover:bg-gray-50 transition">
                          {/* Image */}
                          <Link
                            to={`/product/${item.id}`}
                            className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </Link>

                          {/* Details */}
                          <div className="flex-1">
                            <Link
                              to={`/product/${item.id}`}
                              className="block font-semibold text-gray-900 hover:text-blue-600 mb-2 transition"
                            >
                              {item.name}
                            </Link>

                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-lg font-bold text-blue-600">
                                {formatPrice(item.price)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                              {itemDiscount > 0 && (
                                <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded">
                                  -{itemDiscount}%
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-gray-500 mb-3">
                              💳 {getMonthlyInstallment(item.price, 12)}/mo × 12 months
                            </div>

                            {/* Quantity controls */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-100 transition"
                                >
                                  <Minus size={16} className="text-gray-600" />
                                </button>
                                <span className="px-4 font-semibold text-gray-900 min-w-12 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-100 transition"
                                >
                                  <Plus size={16} className="text-gray-600" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          {/* Item total */}
                          <div className="flex-shrink-0 text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {item.quantity} × {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Try: SAVE10 or SAVE20
                  </p>
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Discount ({discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-blue-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Checkout button */}
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all mb-3">
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block w-full py-3 border-2 border-gray-300 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition text-center"
                >
                  Continue Shopping
                </Link>

                {/* Benefits */}
                <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <Truck className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Free Delivery</p>
                      <p className="text-xs text-gray-500">On orders over PKR 500,000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                      <p className="text-xs text-gray-500">100% safe transactions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-orange-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
                      <p className="text-xs text-gray-500">30-day return policy</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Gift className="text-purple-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Installments</p>
                      <p className="text-xs text-gray-500">6 & 12 month options</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
