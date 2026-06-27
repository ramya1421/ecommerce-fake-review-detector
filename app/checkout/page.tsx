"use client";
import { API_BASE } from "@/lib/api";
import React from "react";
import { useProductStore } from "../_zustand/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  isValidCardNumber,
  isValidCreditCardCVVOrCVC,
  isValidCreditCardExpirationDate,
  isValidEmailAddressFormat,
  isValidNameOrLastname,
} from "@/lib/utils";
import {
  FiUser,
  FiCreditCard,
  FiMapPin,
  FiCheck,
  FiLock,
  FiLoader,
  FiShield,
} from "react-icons/fi";

const STEPS = [
  { id: 0, label: "Contact", icon: FiUser },
  { id: 1, label: "Payment", icon: FiCreditCard },
  { id: 2, label: "Shipping", icon: FiMapPin },
];

const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-premium"
    />
  </div>
);

const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    company: "",
    adress: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    orderNotice: "",
  });

  const { products, total, clearCart } = useProductStore();
  const router = useRouter();

  const upd = (key: keyof typeof checkoutForm) => (val: string) =>
    setCheckoutForm((f) => ({ ...f, [key]: val }));

  const shipping = 5;
  const tax = +(total / 5).toFixed(2);
  const orderTotal = total === 0 ? 0 : Math.round(total + tax + shipping);

  const validate = (): boolean => {
    const f = checkoutForm;
    if (!f.name || !f.lastname || !f.phone || !f.email || !f.cardName || !f.cardNumber || !f.expirationDate || !f.cvc || !f.company || !f.adress || !f.apartment || !f.city || !f.country || !f.postalCode) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!isValidNameOrLastname(f.name)) { toast.error("Invalid name format"); return false; }
    if (!isValidNameOrLastname(f.lastname)) { toast.error("Invalid last name format"); return false; }
    if (!isValidEmailAddressFormat(f.email)) { toast.error("Invalid email address"); return false; }
    if (!isValidNameOrLastname(f.cardName)) { toast.error("Invalid card name format"); return false; }
    if (!isValidCardNumber(f.cardNumber)) { toast.error("Invalid card number"); return false; }
    if (!isValidCreditCardExpirationDate(f.expirationDate)) { toast.error("Invalid expiry date (MM/YY)"); return false; }
    if (!isValidCreditCardCVVOrCVC(f.cvc)) { toast.error("Invalid CVC/CVV"); return false; }
    return true;
  };

  const makePurchase = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: checkoutForm.name,
          lastname: checkoutForm.lastname,
          phone: checkoutForm.phone,
          email: checkoutForm.email,
          company: checkoutForm.company,
          adress: checkoutForm.adress,
          apartment: checkoutForm.apartment,
          postalCode: checkoutForm.postalCode,
          status: "processing",
          total,
          city: checkoutForm.city,
          country: checkoutForm.country,
          orderNotice: checkoutForm.orderNotice,
        }),
      });
      const data = await res.json();
      const orderId: string = data.id;

      await Promise.all(
        products.map((p) =>
          fetch(`${API_BASE}/api/order-product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerOrderId: orderId, productId: p.id, quantity: p.amount }),
          })
        )
      );

      clearCart();
      toast.success("Order placed successfully!");
      setTimeout(() => router.push("/"), 1200);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      toast.error("Your cart is empty");
      router.push("/cart");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="section-container py-10">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2">
          <FiLock className="text-blue-600" /> Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left — form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step indicator */}
            <div className="card-premium p-4">
              <div className="flex items-center">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <button
                      onClick={() => setStep(s.id)}
                      className={`flex items-center gap-2 text-sm font-semibold transition-colors ${step === s.id ? "text-blue-600" : step > s.id ? "text-green-600" : "text-slate-400"
                        }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step === s.id ? "bg-blue-600 text-white" : step > s.id ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                        {step > s.id ? <FiCheck className="text-xs" /> : s.id + 1}
                      </div>
                      <span className="hidden sm:block">{s.label}</span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-px mx-3 ${step > i ? "bg-green-500" : "bg-slate-200"}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step 0 — Contact */}
            {step === 0 && (
              <div className="card-premium p-6 space-y-4 animate-fade-in">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <FiUser className="text-blue-600" /> Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="First Name" id="name" placeholder="John" value={checkoutForm.name} onChange={upd("name")} />
                  <InputField label="Last Name" id="lastname" placeholder="Doe" value={checkoutForm.lastname} onChange={upd("lastname")} />
                </div>
                <InputField label="Phone Number" id="phone" type="tel" placeholder="+1 555 000 0000" value={checkoutForm.phone} onChange={upd("phone")} autoComplete="tel" />
                <InputField label="Email Address" id="email" type="email" placeholder="you@example.com" value={checkoutForm.email} onChange={upd("email")} autoComplete="email" />
                <button onClick={() => setStep(1)} className="btn-primary-custom w-full flex items-center justify-center gap-2">
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 1 — Payment */}
            {step === 1 && (
              <div className="card-premium p-6 space-y-4 animate-fade-in">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <FiCreditCard className="text-blue-600" /> Payment Details
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                  <FiShield className="text-green-600 flex-shrink-0" />
                  Your payment information is encrypted and secure. This is a demo.
                </div>
                <InputField label="Name on Card" id="cardname" autoComplete="cc-name" value={checkoutForm.cardName} onChange={upd("cardName")} placeholder="John Doe" />
                <InputField label="Card Number" id="cardnum" autoComplete="cc-number" value={checkoutForm.cardNumber} onChange={upd("cardNumber")} placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Expiry (MM/YY)" id="expiry" autoComplete="cc-exp" value={checkoutForm.expirationDate} onChange={upd("expirationDate")} placeholder="08/27" />
                  <InputField label="CVC / CVV" id="cvc" autoComplete="cc-csc" value={checkoutForm.cvc} onChange={upd("cvc")} placeholder="123" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="btn-secondary-custom flex-1">Back</button>
                  <button onClick={() => setStep(2)} className="btn-primary-custom flex-1">Continue to Shipping</button>
                </div>
              </div>
            )}

            {/* Step 2 — Shipping */}
            {step === 2 && (
              <div className="card-premium p-6 space-y-4 animate-fade-in">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <FiMapPin className="text-blue-600" /> Shipping Address
                </h2>
                <InputField label="Company (optional)" id="company" value={checkoutForm.company} onChange={upd("company")} />
                <InputField label="Street Address" id="address" autoComplete="street-address" value={checkoutForm.adress} onChange={upd("adress")} />
                <InputField label="Apartment, suite, etc." id="apt" value={checkoutForm.apartment} onChange={upd("apartment")} />
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="City" id="city" autoComplete="address-level2" value={checkoutForm.city} onChange={upd("city")} />
                  <InputField label="Country" id="country" autoComplete="country" value={checkoutForm.country} onChange={upd("country")} />
                  <InputField label="Postal Code" id="postal" autoComplete="postal-code" value={checkoutForm.postalCode} onChange={upd("postalCode")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="notice">
                    Order Note (optional)
                  </label>
                  <textarea
                    id="notice"
                    rows={3}
                    value={checkoutForm.orderNotice}
                    onChange={(e) => upd("orderNotice")(e.target.value)}
                    placeholder="Any special instructions..."
                    className="input-premium resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary-custom flex-1">Back</button>
                  <button
                    onClick={makePurchase}
                    disabled={loading}
                    className="btn-primary-custom flex-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><FiLoader className="animate-spin-ring text-sm" /> Processing...</>
                    ) : (
                      <><FiLock className="text-sm" /> Place Order — ${orderTotal}</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right — Order summary */}
          <div className="card-premium p-5 sticky top-24">
            <h2 className="font-bold text-slate-900 mb-4">Order Summary</h2>

            <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
              {products.map((product) => (
                <li key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={product?.image ? `/${product.image}` : "/product_placeholder.jpg"}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 line-clamp-1">{product.title}</p>
                    <p className="text-xs text-slate-400">×{product.amount}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900 flex-shrink-0">
                    ${(product.price * product.amount).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (20%)</span>
                <span className="font-medium text-slate-900">${tax}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base border-t border-slate-100 pt-2 mt-2">
                <span>Total</span>
                <span className="text-blue-600">${orderTotal}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2">
              <FiLock className="text-green-500 flex-shrink-0" />
              Secure 256-bit SSL encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
