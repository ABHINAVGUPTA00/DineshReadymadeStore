import { db } from '../utils/firebase';
import { collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';


// In-memory cache for seamless synchronous reads across the React App
let cache = {
  orders: [],
  products: [], // Empty catalog
  users: [],
  ratings: [],
  currentUser: null
};

// Initialize cache from LocalStorage first to prevent immediate blank screens on load
const loadCacheLocally = () => {
  const localProducts = localStorage.getItem('drs_products');
  if (localProducts) cache.products = JSON.parse(localProducts);
  
  const localOrders = localStorage.getItem('drs_orders');
  if (localOrders) cache.orders = JSON.parse(localOrders);

  const localUsers = localStorage.getItem('drs_users');
  if (localUsers) cache.users = JSON.parse(localUsers);

  const localCurrentUser = localStorage.getItem('drs_current_user');
  if (localCurrentUser) cache.currentUser = JSON.parse(localCurrentUser);
};
loadCacheLocally();

// Background Sync from Firebase Firestore
export const syncFromFirebase = async () => {
  try {
    const productsSnap = await getDocs(collection(db, 'products'));
    if (!productsSnap.empty) {
      cache.products = productsSnap.docs.map(d => d.data());
      localStorage.setItem('drs_products', JSON.stringify(cache.products));
    }

    const ordersSnap = await getDocs(collection(db, 'orders'));
    if (!ordersSnap.empty) {
      cache.orders = ordersSnap.docs.map(d => d.data());
      localStorage.setItem('drs_orders', JSON.stringify(cache.orders));
    }

    const usersSnap = await getDocs(collection(db, 'users'));
    if (!usersSnap.empty) {
      cache.users = usersSnap.docs.map(d => d.data());
      localStorage.setItem('drs_users', JSON.stringify(cache.users));
    }
  } catch (error) {
    console.error("Firebase sync failed:", error);
  }
};
// Kick off sync automatically when app loads
syncFromFirebase();

// Synchronous getters (reads from fast local cache)
export const getOrders = () => cache.orders;
export const getCustomProducts = () => cache.products;
export const getUsers = () => cache.users;
export const getRatings = () => cache.ratings;
export const getCurrentUser = () => cache.currentUser;
export const getUserOrders = (email) => cache.orders.filter(o => o.userEmail === email);

// Fire & Forget Setters (updates cache immediately, pushes to Firebase in background)
export const saveOrder = (order) => {
  const currentUser = getCurrentUser();
  const newOrder = { 
    ...order, 
    id: 'ORD-' + Date.now(), 
    date: new Date().toISOString(),
    userEmail: currentUser ? currentUser.email : null,
    status: 'Processing'
  };
  cache.orders.unshift(newOrder);
  localStorage.setItem('drs_orders', JSON.stringify(cache.orders));
  
  // Async write to Firebase
  setDoc(doc(db, 'orders', newOrder.id), newOrder).catch(console.error);
  
  return newOrder;
};

export const deleteOrder = (id) => {
  cache.orders = cache.orders.filter(o => o.id !== id);
  localStorage.setItem('drs_orders', JSON.stringify(cache.orders));
  deleteDoc(doc(db, 'orders', id)).catch(console.error);
};

export const saveCustomProduct = (product) => {
  const newProduct = { 
    ...product, 
    id: 'drs-custom-' + Date.now(), 
    images: product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'],
    price: Number(product.price),
    colors: product.colors && product.colors.length > 0 ? product.colors : [{ name: 'Default', hex: '#000' }],
    description: product.description || `Premium ${product.fabric} material. Designed for absolute comfort and style.`,
    sizes: product.sizes && product.sizes.length > 0 ? product.sizes : ['Free Size'],
    isOutOfStock: false
  };
  cache.products.unshift(newProduct);
  localStorage.setItem('drs_products', JSON.stringify(cache.products));
  
  setDoc(doc(db, 'products', newProduct.id), newProduct).catch(console.error);
  return newProduct;
};

export const deleteCustomProduct = (id) => {
  cache.products = cache.products.filter(p => p.id !== id);
  localStorage.setItem('drs_products', JSON.stringify(cache.products));
  deleteDoc(doc(db, 'products', id)).catch(console.error);
};

export const toggleCustomProductStock = (id) => {
  const idx = cache.products.findIndex(p => p.id === id);
  if (idx > -1) {
    cache.products[idx].isOutOfStock = !cache.products[idx].isOutOfStock;
    localStorage.setItem('drs_products', JSON.stringify(cache.products));
    setDoc(doc(db, 'products', id), cache.products[idx]).catch(console.error);
  }
};

export const saveUser = (user) => {
  // Use email or phone as the unique identifier
  const userIdentifier = user.email || user.phone;
  if (!userIdentifier) return;

  const existingIndex = cache.users.findIndex(u => u.email === user.email || (u.phone && u.phone === user.phone));
  let updatedUser;
  if (existingIndex > -1) {
    updatedUser = { ...cache.users[existingIndex], ...user, lastLogin: new Date().toISOString() };
    cache.users[existingIndex] = updatedUser;
  } else {
    updatedUser = { ...user, joined: new Date().toISOString(), lastLogin: new Date().toISOString() };
    cache.users.push(updatedUser);
  }
  localStorage.setItem('drs_users', JSON.stringify(cache.users));
  
  // Use identifier as document ID in firestore
  setDoc(doc(db, 'users', userIdentifier), updatedUser).catch(console.error);
};

export const setCurrentUser = (user) => {
  saveUser(user);
  cache.currentUser = user;
  localStorage.setItem('drs_current_user', JSON.stringify(user));
};

export const logoutUser = () => {
  cache.currentUser = null;
  localStorage.removeItem('drs_current_user');
};

export const saveRating = (orderId, rating, comment) => {
  const newRating = { orderId, rating, comment, date: new Date().toISOString() };
  cache.ratings.push(newRating);
  localStorage.setItem('drs_ratings', JSON.stringify(cache.ratings));
  setDoc(doc(db, 'ratings', orderId + Date.now()), newRating).catch(console.error);
};
