import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check, Ruler, Ban } from 'lucide-react';

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted
}) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Default', hex: '#171717' });
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryStatus(`Express delivery available to ${pincode} in 2-3 business days!`);
    } else {
      setDeliveryStatus('Please enter a valid 6-digit Indian Pincode.');
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="bg-cream-50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-charcoal-900/15 shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-cream-100 hover:bg-cream-200 text-charcoal-900 p-2 rounded-full shadow transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images Gallery */}
        <div className="md:w-1/2 p-6 bg-cream-100/50 flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-cream-200 border border-charcoal-900/10 mb-4">
            <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
            {product.discount && (
              <span className="absolute top-3 left-3 bg-maroon-700 text-white text-xs font-bold px-2.5 py-1 rounded">
                {product.discount}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img ? 'border-maroon-700 ring-2 ring-maroon-700/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-charcoal-900/60 mb-2">
              <span className="uppercase font-bold tracking-widest text-maroon-700">{product.categoryName || product.category}</span>
              <div className="flex items-center gap-1 font-bold text-charcoal-900">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating || 5.0}</span>
                <span className="text-charcoal-900/50 font-normal">({product.reviewsCount || 0} reviews)</span>
              </div>
            </div>

            <h2 className="font-display font-bold text-2xl text-charcoal-900 leading-tight">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="font-display font-extrabold text-3xl text-maroon-700">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-charcoal-900/50 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-charcoal-900/80 leading-relaxed border-b border-charcoal-900/10 pb-4">
              {product.description}
            </p>

            {/* Fabric Info */}
            <div className="my-3 text-xs bg-cream-100 p-2.5 rounded-lg">
              <strong className="text-charcoal-900">Fabric Composition:</strong> {product.fabric}
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5 my-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Color: <strong className="text-maroon-700">{selectedColor.name}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        selectedColor.name === c.name
                          ? 'border-maroon-700 bg-maroon-700 text-white font-bold'
                          : 'bg-cream-100 text-charcoal-900 border-charcoal-900/20'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5 my-3">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>Select Size:</span>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-maroon-700 hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Chart Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      disabled={product.isOutOfStock}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        product.isOutOfStock 
                          ? 'bg-charcoal-900/10 text-charcoal-900/40 cursor-not-allowed line-through'
                          : selectedSize === size
                            ? 'bg-charcoal-900 text-cream-50 ring-2 ring-maroon-700'
                            : 'bg-cream-200 text-charcoal-900 hover:bg-cream-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size Chart Dropdown Popup */}
                {showSizeChart && (
                  <div className="bg-cream-100 p-3 rounded-lg text-[11px] space-y-1 border border-charcoal-900/10 mt-2">
                    <span className="font-bold text-charcoal-900 block">Dinesh Readymade Size Guide (Inches):</span>
                    <p>Small (S): Chest 38" | Medium (M): Chest 40" | Large (L): Chest 42"</p>
                    <p>XL: Chest 44" | XXL: Chest 46" | Free tailoring alterations in store!</p>
                  </div>
                )}
              </div>
            )}

            {/* Pincode Delivery Checker */}
            <form onSubmit={handleCheckPincode} className="mt-4 pt-3 border-t border-charcoal-900/10">
              <span className="text-xs font-semibold block mb-1">Check Pincode Delivery:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="bg-cream-100 text-xs px-3 py-1.5 rounded-lg border border-charcoal-900/20 focus:outline-none focus:border-maroon-700 flex-grow"
                />
                <button
                  type="submit"
                  className="bg-charcoal-900 text-cream-50 text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-charcoal-800"
                >
                  Check
                </button>
              </div>
              {deliveryStatus && (
                <p className="text-[11px] font-semibold text-emerald-700 mt-1">{deliveryStatus}</p>
              )}
            </form>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-charcoal-900/10">
            <div className="flex gap-3">
              {/* Quantity selector */}
              <div className="flex items-center bg-cream-200 rounded-lg p-1 font-bold text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-charcoal-900 hover:bg-cream-300 rounded"
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-charcoal-900 hover:bg-cream-300 rounded"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAdd}
                disabled={product.isOutOfStock}
                className={`flex-grow py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  product.isOutOfStock
                    ? 'bg-charcoal-900/50 text-white cursor-not-allowed'
                    : isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-charcoal-900 hover:bg-maroon-700 text-cream-100'
                }`}
              >
                {product.isOutOfStock ? <Ban className="w-4 h-4" /> : isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                {product.isOutOfStock ? 'Out of Stock' : isAdded ? 'Added to Bag!' : 'Add to Bag'}
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-lg border transition-colors ${
                  isWishlisted ? 'bg-maroon-700 text-white border-maroon-700' : 'bg-cream-100 text-charcoal-900 border-charcoal-900/20 hover:bg-cream-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              disabled={product.isOutOfStock}
              onClick={() => {
                onAddToCart(product, selectedSize, selectedColor, quantity);
                onClose();
                onBuyNow();
              }}
              className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-transform ${
                product.isOutOfStock
                  ? 'bg-maroon-700/50 text-white cursor-not-allowed'
                  : 'bg-maroon-700 hover:bg-maroon-800 text-white hover:scale-[1.01]'
              }`}
            >
              {product.isOutOfStock ? 'Currently Unavailable' : 'Instant Express Checkout'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
