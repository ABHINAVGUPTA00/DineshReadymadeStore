import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Package, ShoppingBag, Check, Lock, Image as ImageIcon, Ruler, Printer, Download, Trash2, Ban, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import html2pdf from 'html2pdf.js';
import { getOrders, deleteOrder, saveCustomProduct, getCustomProducts, getUsers, deleteCustomProduct, toggleCustomProductStock } from '../utils/db';
import { CATEGORIES } from '../data/products';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function AdminPanel({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products'
  const [orders, setOrders] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'mens',
    price: '',
    fabric: '',
    description: '',
    colorNames: '',
    imagesBase64: [],
    sizes: ['M', 'L']
  });
  const [successMsg, setSuccessMsg] = useState('');
  
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setOrders(getOrders());
      setCustomProducts(getCustomProducts());
      setUsers(getUsers());
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.id === 'owner' && loginForm.password === '1234') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid ID or Password');
    }
  };

  const handleSizeToggle = (size) => {
    setProductForm(prev => {
      const sizes = prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    ).then(base64Images => {
      setProductForm(prev => ({
        ...prev,
        imagesBase64: base64Images
      }));
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productForm.name,
      category: productForm.category,
      price: productForm.price,
      fabric: productForm.fabric,
      images: productForm.imagesBase64.length > 0 ? productForm.imagesBase64 : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'],
      sizes: productForm.sizes.length > 0 ? productForm.sizes : ['Free Size'],
      description: productForm.description,
      colorNames: productForm.colorNames,
    };
    saveCustomProduct(newProduct);
    setCustomProducts(getCustomProducts());
    setSuccessMsg('Product Published Successfully!');
    setProductForm({ name: '', category: 'mens', price: '', fabric: '', description: '', colorNames: '', imagesBase64: [], sizes: ['M', 'L'] });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const exportToCSV = () => {
    if (users.length === 0 && orders.length === 0) return;
    
    // Create a basic CSV of users and their orders
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Type,ID,Name/Email,Date,Total/Status\n";
    
    users.forEach(u => {
      csvContent += `USER,-,${u.name} (${u.email}),${new Date(u.joined).toLocaleDateString()},-\n`;
    });
    
    orders.forEach(o => {
      csvContent += `ORDER,${o.id},${o.shippingDetails?.fullName},${new Date(o.date).toLocaleDateString()},₹${o.total} (${o.status})\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DRS_Data_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('receipt-content');
    if (element) {
      const opt = {
        margin:       0.5,
        filename:     `DRS_Receipt_${selectedOrder.id}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[999999] bg-[#ede4dd] flex flex-col overflow-hidden admin-panel-container"
      >
        {/* Style to handle printing the receipt */}
        <style>{`
          @media print {
            body * { visibility: hidden; }
            .print-receipt-section, .print-receipt-section * { visibility: visible; }
            .print-receipt-section { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
            .no-print { display: none !important; }
          }
        `}</style>

        {/* Header */}
        <div className="p-6 bg-black text-[#ede4dd] flex justify-between items-center shadow-xl z-20 no-print">
          <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#ff0001]" /> DRS Admin
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#ff0001] rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="flex-1 flex items-center justify-center p-6 relative no-print">
            <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
              <h1 className="text-[30vw] font-black leading-none text-black uppercase tracking-tighter whitespace-nowrap">ADMIN</h1>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-black w-full max-w-md relative z-10"
            >
              <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-2">Restricted Access</h3>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-8">Please identify yourself</p>

              {loginError && (
                <div className="bg-[#ff0001] text-white p-3 rounded-xl mb-6 font-bold text-center animate-shake">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-black/70 mb-1 uppercase tracking-wider">Admin ID</label>
                  <input type="text" required value={loginForm.id} onChange={e => setLoginForm({...loginForm, id: e.target.value})} className="w-full border-4 border-black/10 rounded-2xl p-4 font-bold focus:outline-none focus:border-[#ff0001] transition-colors bg-[#ede4dd]" />
                </div>
                <div>
                  <label className="block text-xs font-black text-black/70 mb-1 uppercase tracking-wider">Password</label>
                  <input type="password" required value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full border-4 border-black/10 rounded-2xl p-4 font-bold focus:outline-none focus:border-[#ff0001] transition-colors bg-[#ede4dd]" />
                </div>
                <button type="submit" className="w-full bg-[#ff0001] text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-black transition-colors mt-4 text-lg">
                  Access Portal
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* Dashboard */
          <>
            {/* Tabs */}
            <div className="flex border-b border-black/10 bg-[#d2cac3] shadow-md z-10 relative no-print">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-5 font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-[#ff0001] text-white shadow-inner' : 'text-black hover:bg-black/5'}`}
              >
                Customer Orders
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-5 font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-[#ff0001] text-white shadow-inner' : 'text-black hover:bg-black/5'}`}
              >
                Manage Products
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 relative z-0">
              <AnimatePresence mode="wait">
                {activeTab === 'orders' && !selectedOrder && (
                  <motion.div 
                    key="orders"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-5xl mx-auto space-y-6 no-print"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-4xl font-black text-[#ff0001] uppercase tracking-tighter">Recent Orders</h3>
                      <button 
                        onClick={exportToCSV}
                        className="bg-black text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-charcoal-800 transition-colors"
                      >
                        <Download className="w-4 h-4" /> Export CSV
                      </button>
                    </div>

                    {/* Dashboard Summary Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-8 no-print">
                      <div className="bg-white border-4 border-black/10 p-6 rounded-3xl shadow-lg">
                        <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-1">Total Orders</p>
                        <p className="text-4xl font-black text-black">{orders.length}</p>
                      </div>
                      <div className="bg-white border-4 border-black/10 p-6 rounded-3xl shadow-lg">
                        <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-1">Total Revenue</p>
                        <p className="text-4xl font-black text-[#ff0001]">₹{orders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {orders.length === 0 ? (
                      <div className="text-center py-32 text-black/40 border-4 border-dashed border-black/10 rounded-3xl">
                        <ShoppingBag className="w-20 h-20 mx-auto mb-6 opacity-50" />
                        <p className="text-2xl font-black uppercase tracking-tighter">No orders yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {orders.map((order, i) => (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            key={i} 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white border-4 border-black/10 p-6 rounded-3xl shadow-xl hover:border-[#ff0001] transition-colors cursor-pointer"
                          >
                            <div className="flex justify-between border-b-2 border-black/10 pb-4 mb-4">
                              <div>
                                <span className="text-xs font-bold font-mono bg-black text-white px-3 py-1 rounded-full uppercase tracking-wider">#{order.id}</span>
                                <h4 className="text-2xl font-black mt-3 uppercase tracking-tight">{order.shippingDetails?.fullName || 'Customer'}</h4>
                                <p className="text-xs font-bold text-black/60 uppercase tracking-widest mt-1">{order.shippingDetails?.city} &bull; {order.shippingDetails?.phone}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-3xl font-black text-[#ff0001]">₹{(order.total || 0).toLocaleString('en-IN')}</p>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-2 inline-block ${
                                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                  'bg-amber-100 text-amber-800'
                                }`}>
                                  {order.status || 'Processing'}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm font-bold bg-[#ede4dd] p-3 rounded-xl">
                                  <span>{item.quantity}x {item.name} <span className="text-[#ff0001] ml-2">({item.selectedSize})</span></span>
                                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Selected Order Detail View */}
                {activeTab === 'orders' && selectedOrder && (
                  <motion.div 
                    key="order-detail"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto bg-white border-4 border-black/10 rounded-3xl overflow-hidden shadow-2xl relative"
                  >
                    {/* Toolbar */}
                    <div className="p-4 bg-[#ede4dd] border-b-4 border-black/10 flex justify-between items-center no-print">
                      <button onClick={() => setSelectedOrder(null)} className="font-bold text-black/60 hover:text-black">
                        &larr; Back to Orders
                      </button>
                      <div className="flex gap-2">
                        <button onClick={handleDownloadPDF} className="bg-white border-2 border-black/10 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:border-[#ff0001] transition-colors">
                          <FileDown className="w-4 h-4" /> Save PDF
                        </button>
                        <button onClick={handlePrint} className="bg-black text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#ff0001] transition-colors">
                          <Printer className="w-4 h-4" /> Print Receipt
                        </button>
                      </div>
                    </div>

                    {/* Printable Receipt Section */}
                    <div className="p-8 md:p-12 bg-white print-receipt-section" id="receipt-content">
                      
                      <div className="flex justify-between items-start border-b-4 border-black pb-8 mb-8">
                        <div>
                          <h1 className="text-4xl font-black text-black uppercase tracking-tighter">Dinesh Readymade Store</h1>
                          <p className="text-sm font-bold text-black/60 uppercase tracking-widest mt-2">Official Purchase Receipt</p>
                          <div className="mt-6 space-y-1">
                            <p className="font-bold uppercase tracking-wider text-black text-sm">Customer Details:</p>
                            <p className="text-lg font-black uppercase">{selectedOrder.shippingDetails?.fullName || 'Guest Customer'}</p>
                            <p className="text-sm font-bold text-black/70">{selectedOrder.userEmail || 'No Email Provided'}</p>
                            <p className="text-sm font-bold text-black/70">{selectedOrder.shippingDetails?.phone || 'No Phone'}</p>
                            <p className="text-sm font-bold text-black/70">{selectedOrder.shippingDetails?.address || 'No Address'}, {selectedOrder.shippingDetails?.city || ''}, {selectedOrder.shippingDetails?.state || ''} - {selectedOrder.shippingDetails?.pincode || ''}</p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <QRCodeSVG value={selectedOrder.id} size={100} level="H" includeMargin={true} />
                          <p className="text-xs font-mono font-bold mt-2 uppercase tracking-widest text-black/60">{selectedOrder.id}</p>
                          <p className="text-xs font-bold text-black/60 mt-1 uppercase tracking-widest">{new Date(selectedOrder.date).toLocaleString()}</p>
                          
                          {/* Order Status Updater for Admin */}
                          <div className="mt-4 no-print flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-black/50">Status:</span>
                            <select 
                              className="text-sm font-bold bg-[#ede4dd] border-2 border-black/10 rounded-lg px-2 py-1 focus:outline-none focus:border-[#ff0001]"
                              value={selectedOrder.status || 'Processing'}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                const updatedOrder = { ...selectedOrder, status: newStatus };
                                setSelectedOrder(updatedOrder);
                                // Update in main orders list and localstorage
                                const allOrders = getOrders();
                                const idx = allOrders.findIndex(o => o.id === updatedOrder.id);
                                if(idx > -1) {
                                  allOrders[idx] = updatedOrder;
                                  localStorage.setItem('drs_orders', JSON.stringify(allOrders));
                                  setOrders(allOrders);
                                }
                              }}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                            <button 
                              onClick={() => {
                                if(window.confirm('Are you sure you want to delete this order?')) {
                                  deleteOrder(selectedOrder.id);
                                  setOrders(getOrders());
                                  setSelectedOrder(null);
                                }
                              }}
                              className="ml-4 p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      <table className="w-full text-left border-collapse mb-8">
                        <thead>
                          <tr className="border-b-4 border-black text-sm font-black uppercase tracking-widest">
                            <th className="py-4">Item Description</th>
                            <th className="py-4 text-center">Size</th>
                            <th className="py-4 text-center">Qty</th>
                            <th className="py-4 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="font-bold text-black/80">
                          {(selectedOrder.items || []).map((item, idx) => (
                            <tr key={idx} className="border-b border-black/10">
                              <td className="py-4 flex items-center gap-4">
                                {item.images && item.images[0] && (
                                  <div className="w-12 h-16 bg-[#ede4dd] rounded-lg overflow-hidden flex-shrink-0 border border-black/10">
                                    <img src={item.images[0]} alt={item.name || 'Product'} className="w-full h-full object-cover mix-blend-multiply" />
                                  </div>
                                )}
                                <span className="font-bold">{item.name || 'Product'}</span>
                              </td>
                              <td className="py-4 text-center">{item.selectedSize || 'N/A'}</td>
                              <td className="py-4 text-center">{item.quantity || 1}</td>
                              <td className="py-4 text-right">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="flex justify-end">
                        <div className="w-64 space-y-3 font-bold text-sm">
                          <div className="flex justify-between">
                            <span className="uppercase text-black/60 tracking-wider">Subtotal</span>
                            <span>₹{(selectedOrder.subtotal || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="uppercase text-black/60 tracking-wider">Discount</span>
                            <span className="text-[#ff0001]">- ₹{(selectedOrder.promoDiscount || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between border-b-2 border-black/20 pb-3">
                            <span className="uppercase text-black/60 tracking-wider">Shipping</span>
                            <span>₹{(selectedOrder.shippingFee || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-2xl font-black pt-2">
                            <span className="uppercase tracking-tighter">Total</span>
                            <span>₹{(selectedOrder.total || 0).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-16 text-center border-t-2 border-black/10 pt-8">
                        <p className="font-black text-black/40 uppercase tracking-widest text-xs">Thank you for shopping with Dinesh Readymade Store</p>
                        <p className="font-bold text-black/30 text-[10px] mt-1">Please retain this receipt for exchanges within 7 days.</p>
                      </div>

                    </div>
                  </motion.div>
                )}

                {activeTab === 'products' && (
                  <motion.div 
                    key="products"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 no-print"
                  >
                    {/* Add Product Form */}
                    <div className="bg-white border-4 border-black/10 p-8 rounded-3xl shadow-xl">
                      <h3 className="text-3xl font-black text-[#ff0001] uppercase tracking-tighter mb-8 flex items-center gap-3">
                        <Plus className="w-8 h-8 p-1 bg-black text-white rounded-full" /> Publish Catalog
                      </h3>
                      
                      <AnimatePresence>
                        {successMsg && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-black text-[#00ff00] p-4 rounded-xl mb-6 font-black uppercase tracking-widest flex items-center gap-3 text-sm"
                          >
                            <Check className="w-6 h-6" /> {successMsg}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <form onSubmit={handleAddProduct} className="space-y-5">
                        <div>
                          <label className="block text-xs font-black text-black/70 mb-2 uppercase tracking-wider">Product Name</label>
                          <input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full border-4 border-black/10 rounded-2xl p-3 font-bold focus:outline-none focus:border-[#ff0001] bg-[#ede4dd]" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-black text-black/70 mb-2 uppercase tracking-wider">Price (₹)</label>
                            <input type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full border-4 border-black/10 rounded-2xl p-3 font-bold focus:outline-none focus:border-[#ff0001] bg-[#ede4dd]" />
                          </div>
                          <div>
                            <label className="block text-xs font-black text-black/70 mb-2 uppercase tracking-wider">Category</label>
                            <select required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full border-4 border-black/10 rounded-2xl p-3 font-bold focus:outline-none focus:border-[#ff0001] bg-[#ede4dd]">
                              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black text-black/70 mb-2 uppercase tracking-wider">Material Used</label>
                          <input type="text" required value={productForm.fabric} onChange={e => setProductForm({...productForm, fabric: e.target.value})} placeholder="e.g. 100% Pure Cotton" className="w-full border-4 border-black/10 rounded-2xl p-3 font-bold focus:outline-none focus:border-[#ff0001] bg-[#ede4dd]" />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-black/70 mb-2 uppercase tracking-wider">Product Description</label>
                          <textarea rows="3" required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} placeholder="Write a multi-line description..." className="w-full border-4 border-black/10 rounded-2xl p-3 font-bold focus:outline-none focus:border-[#ff0001] bg-[#ede4dd]" />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-black/70 mb-2 uppercase tracking-wider">Color Options (Comma Separated)</label>
                          <input type="text" value={productForm.colorNames} onChange={e => setProductForm({...productForm, colorNames: e.target.value})} placeholder="e.g. Red, Blue, Black" className="w-full border-4 border-black/10 rounded-2xl p-3 font-bold focus:outline-none focus:border-[#ff0001] bg-[#ede4dd]" />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-xs font-black text-black/70 mb-2 uppercase tracking-wider">
                            <Ruler className="w-4 h-4" /> Size Options
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {AVAILABLE_SIZES.map(size => (
                              <label key={size} className="cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="hidden"
                                  checked={productForm.sizes.includes(size)}
                                  onChange={() => handleSizeToggle(size)}
                                />
                                <div className={`px-4 py-2 rounded-xl border-2 font-black transition-colors ${
                                  productForm.sizes.includes(size) ? 'bg-[#ff0001] border-[#ff0001] text-white' : 'bg-white border-black/20 text-black hover:border-black'
                                }`}>
                                  {size}
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-xs font-black text-black/70 mb-2 uppercase tracking-wider">
                            <ImageIcon className="w-4 h-4" /> Upload Product Photos
                          </label>
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={handleImageUpload} 
                            className="w-full border-4 border-black/10 rounded-2xl p-3 font-bold focus:outline-none focus:border-[#ff0001] bg-[#ede4dd]" 
                          />
                          {productForm.imagesBase64.length > 0 && (
                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                              {productForm.imagesBase64.map((img, i) => (
                                <div key={i} className="w-20 h-24 flex-shrink-0 bg-white rounded-xl overflow-hidden border-2 border-black/10">
                                  <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <button type="submit" className="w-full bg-[#ff0001] text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-black transition-colors mt-6 text-lg shadow-xl shadow-[#ff0001]/20">
                          Publish Product
                        </button>
                      </form>
                    </div>

                    {/* Published Products List by Category */}
                    <div>
                      <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                        <Package className="w-8 h-8" /> Catalog Management
                      </h3>
                      <div className="space-y-12 pr-2">
                        {customProducts.length === 0 ? (
                          <div className="text-center py-20 text-black/40 border-4 border-dashed border-black/10 rounded-3xl">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-xl font-black uppercase tracking-widest">No Products Found</p>
                          </div>
                        ) : (
                          CATEGORIES.filter(c => c.id !== 'all').map(category => {
                            const catProducts = customProducts.filter(p => p.category === category.id);
                            if (catProducts.length === 0) return null;
                            
                            return (
                              <div key={category.id} className="space-y-4">
                                <h4 className="text-xl font-black text-[#ff0001] uppercase tracking-widest border-b-4 border-black/10 pb-2 mb-4">
                                  {category.name}
                                </h4>
                                {catProducts.map((p, i) => (
                                  <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i} 
                                    className="flex gap-6 bg-white p-4 rounded-3xl border-4 border-black/10 items-center shadow-lg hover:border-[#ff0001] transition-colors"
                                  >
                                    <div className="w-24 h-32 bg-[#ede4dd] rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                                      <img src={p.images[0]} alt={p.name} crossOrigin="anonymous" className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-black text-xl uppercase tracking-tighter leading-tight">{p.name} {p.isOutOfStock && <span className="ml-2 text-[10px] bg-[#ff0001] text-white px-2 py-1 rounded font-bold">OUT OF STOCK</span>}</h4>
                                      <div className="flex justify-between items-end mt-4">
                                        <div>
                                          <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-1">{p.category}</p>
                                          <div className="flex gap-1 flex-wrap">
                                            {p.sizes.map(s => (
                                              <span key={s} className="text-[10px] bg-black text-white px-2 py-0.5 rounded font-bold uppercase">{s}</span>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-2xl font-black text-[#ff0001] mb-2">₹{p.price}</p>
                                          <div className="flex gap-2 justify-end">
                                            <button 
                                              onClick={() => {
                                                toggleCustomProductStock(p.id);
                                                setCustomProducts(getCustomProducts());
                                              }}
                                              className={`p-2 rounded-lg transition-colors ${p.isOutOfStock ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                                              title="Toggle Out of Stock"
                                            >
                                              <Ban className="w-4 h-4" />
                                            </button>
                                            <button 
                                              onClick={() => {
                                                if(window.confirm('Are you sure you want to delete this product?')) {
                                                  deleteCustomProduct(p.id);
                                                  setCustomProducts(getCustomProducts());
                                                }
                                              }}
                                              className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                                              title="Delete Product"
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
