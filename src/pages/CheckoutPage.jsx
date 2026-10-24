import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  PackageCheck
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ImageFallback from '../components/common/ImageFallback';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export const CheckoutPage = () => {
  const {
    cartItems,
    subtotal,
    shippingFee,
    totalSavings,
    grandTotal,
    totalCount,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    deliveryNotes: '',
    paymentMethod: 'cod' // 'cod' | 'upi' | 'card'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemoConfirmation, setShowDemoConfirmation] = useState(false);
  const [demoOrderDetails, setDemoOrderDetails] = useState(null);

  // Validation
  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim()) {
      errs.pincode = 'Postal PIN code is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Please enter a valid 6-digit Indian PIN code';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      navigate('/shop');
      return;
    }

    if (!validateForm()) {
      const firstError = document.querySelector('.border-errorred');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    // Simulate pleasant frontend checkout confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      const randomOrderNo = `RS-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
      setDemoOrderDetails({
        orderNumber: randomOrderNo,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod === 'upi' ? 'UPI / QR Payment' : 'Credit / Debit Card',
        total: grandTotal,
        itemsCount: totalCount,
        deliveryEstimate: '3 to 5 business days'
      });
      setShowDemoConfirmation(true);
      clearCart();
    }, 800);
  };

  if (cartItems.length === 0 && !showDemoConfirmation) {
    return (
      <div className="py-24 text-center page-container min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-display font-bold text-3xl text-darktext mb-3">Your Basket is Empty</h2>
        <p className="text-mutedtext text-sm mb-6 max-w-md">
          Please add snacks to your cart before proceeding to the checkout interface.
        </p>
        <Link to="/shop">
          <Button variant="primary">Browse Fresh Snacks</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Cart', href: '/cart' },
            { label: 'Checkout' }
          ]}
        />

        {/* Page Title */}
        <div className="mt-4 mb-8 pb-4 border-b border-bordercream/70">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Checkout Demonstration
          </h1>
          <p className="text-xs sm:text-sm text-mutedtext mt-1">
            *Frontend-only interface demo. No live payment gateway connected.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Shipping & Payment Form (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section 1: Contact Information */}
              <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-darktext pb-3 border-b border-bordercream/60 flex items-center justify-between">
                  <span>1. Contact Information</span>
                  <span className="text-xs font-normal text-mutedtext">* Required fields</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sundararajan K."
                      className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                        errors.fullName ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                      }`}
                    />
                    {errors.fullName && <p className="text-xs text-errorred mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                        errors.email ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-errorred mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                        errors.phone ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-errorred mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-darktext pb-3 border-b border-bordercream/60">
                  2. Delivery Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                      Street Address & Landmark *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Flat / House No., Street, Area"
                      className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                        errors.address ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                      }`}
                    />
                    {errors.address && <p className="text-xs text-errorred mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Chennai"
                        className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                          errors.city ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                        }`}
                      />
                      {errors.city && <p className="text-xs text-errorred mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-cream/30 border border-bordercream rounded-brand px-3 py-2.5 text-sm text-darktext focus:outline-none focus:border-maroon"
                      >
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Other States">Other Indian States</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        maxLength="6"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="600001"
                        className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                          errors.pincode ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                        }`}
                      />
                      {errors.pincode && <p className="text-xs text-errorred mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="deliveryNotes"
                      rows="2"
                      value={formData.deliveryNotes}
                      onChange={handleChange}
                      placeholder="e.g. Ring doorbell, leave with security, or preferred delivery timing."
                      className="w-full bg-cream/30 border border-bordercream rounded-brand px-3.5 py-2 text-sm text-darktext focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method UI */}
              <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-darktext pb-3 border-b border-bordercream/60">
                  3. Payment Method (Demonstration UI)
                </h3>

                <div className="space-y-3">
                  {/* Option 1: Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3.5 p-3.5 rounded-brand border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-maroon bg-maroon/5 shadow-xs'
                        : 'border-bordercream hover:bg-cream/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mt-1 accent-maroon"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-maroon" />
                        <span className="font-bold text-sm text-darktext">Cash on Delivery (COD)</span>
                        <span className="text-[10px] bg-forest-50 text-forest font-bold px-1.5 py-0.2 rounded border border-forest/30">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-mutedtext mt-0.5">
                        Pay by cash or scan QR upon physical package delivery.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: UPI / QR Payment */}
                  <label
                    className={`flex items-start gap-3.5 p-3.5 rounded-brand border cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-maroon bg-maroon/5 shadow-xs'
                        : 'border-bordercream hover:bg-cream/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="mt-1 accent-maroon"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-maroon" />
                        <span className="font-bold text-sm text-darktext">UPI / QR (GPay, PhonePe, Paytm)</span>
                      </div>
                      <p className="text-xs text-mutedtext mt-0.5">
                        Instant payment via any UPI application (Demonstration UI).
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Card */}
                  <label
                    className={`flex items-start gap-3.5 p-3.5 rounded-brand border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-maroon bg-maroon/5 shadow-xs'
                        : 'border-bordercream hover:bg-cream/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="mt-1 accent-maroon"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-maroon" />
                        <span className="font-bold text-sm text-darktext">Credit / Debit Card / NetBanking</span>
                      </div>
                      <p className="text-xs text-mutedtext mt-0.5">
                        Visa, Mastercard, RuPay & all major banks (Demonstration UI).
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft-md p-6 space-y-4">
                <h3 className="font-display font-bold text-xl text-darktext pb-3 border-b border-bordercream/60 flex items-center justify-between">
                  <span>Your Order</span>
                  <span className="text-xs font-normal text-mutedtext">{totalCount} items</span>
                </h3>

                {/* Items Mini List */}
                <div className="max-h-60 overflow-y-auto divide-y divide-bordercream/40 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center gap-3 text-xs">
                      <div className="w-12 h-12 rounded-brand overflow-hidden border border-bordercream flex-shrink-0 bg-cream">
                        <ImageFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-darktext truncate">{item.name}</p>
                        <p className="text-mutedtext text-[11px]">{item.size} × {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-darktext">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals Breakdown */}
                <div className="pt-3 border-t border-bordercream/60 space-y-2 text-xs sm:text-sm text-mutedtext">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-darktext">{formatCurrency(subtotal)}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-forest font-semibold">
                      <span>Total Savings</span>
                      <span>- {formatCurrency(totalSavings)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="font-semibold text-darktext">
                      {shippingFee === 0 ? <strong className="text-forest">FREE</strong> : formatCurrency(shippingFee)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-bordercream flex justify-between items-baseline text-lg font-bold text-darktext">
                    <span>Total Amount</span>
                    <span className="font-display font-extrabold text-2xl text-maroon">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full shadow-md"
                    loading={isSubmitting}
                  >
                    <span>Place Demonstration Order</span>
                  </Button>
                </div>

                {/* Demo Notice */}
                <div className="p-3 rounded-brand bg-cream/60 border border-bordercream/70 text-[11px] text-mutedtext leading-relaxed">
                  <strong>Notice:</strong> This is a frontend demonstration store. No payment is charged and no physical shipment will occur.
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Demo Confirmation Dialog */}
        {showDemoConfirmation && demoOrderDetails && (
          <Modal
            isOpen={showDemoConfirmation}
            onClose={() => navigate('/shop')}
            title="Demonstration Order Confirmed!"
            maxWidth="max-w-xl"
          >
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center border border-forest/30 animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block mb-1">
                  Reference: {demoOrderDetails.orderNumber}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-darktext">
                  Thank You, {demoOrderDetails.customerName}!
                </h3>
                <p className="text-xs sm:text-sm text-mutedtext mt-1 max-w-md mx-auto">
                  Your demonstration order for {demoOrderDetails.itemsCount} traditional snack items has been successfully simulated.
                </p>
              </div>

              {/* Order Info Breakdown */}
              <div className="bg-cream/40 rounded-brand p-4 text-left text-xs space-y-2 border border-bordercream">
                <div className="flex justify-between">
                  <span className="text-mutedtext">Total Amount:</span>
                  <strong className="text-maroon text-sm">{formatCurrency(demoOrderDetails.total)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedtext">Payment Preference:</span>
                  <span className="font-semibold text-darktext">{demoOrderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedtext">Simulated Delivery Window:</span>
                  <span className="font-semibold text-forest">{demoOrderDetails.deliveryEstimate}</span>
                </div>
                <div className="pt-2 border-t border-bordercream/60">
                  <span className="text-mutedtext block mb-0.5">Shipping Address:</span>
                  <p className="font-medium text-darktext">{demoOrderDetails.address}</p>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate('/shop')}
                >
                  Return to Snack Collection
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
