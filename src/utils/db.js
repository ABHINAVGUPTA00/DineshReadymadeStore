import { PRODUCTS } from '../data/products';

// Mock database using localStorage
const KEYS = {
  ORDERS: 'drs_orders',
  PRODUCTS: 'drs_products',
  RATINGS: 'drs_ratings',
  USERS: 'drs_users',
  CURRENT_USER: 'drs_current_user'
};

export const getOrders = () => {
  const data = localStorage.getItem(KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  const currentUser = getCurrentUser();
  const newOrder = { 
    ...order, 
    id: 'ORD-' + Date.now(), 
    date: new Date().toISOString(),
    userEmail: currentUser ? currentUser.email : null,
    status: 'Processing'
  };
  orders.unshift(newOrder);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
};

export const deleteOrder = (id) => {
  const orders = getOrders();
  const updatedOrders = orders.filter(o => o.id !== id);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(updatedOrders));
};

export const getCustomProducts = () => {
  const data = localStorage.getItem(KEYS.PRODUCTS);
  if (!data) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(PRODUCTS));
    return PRODUCTS;
  }
  return JSON.parse(data);
};

export const saveCustomProduct = (product) => {
  const products = getCustomProducts();

  let parsedColors = [{ name: 'Default', hex: '#000' }];
  if (product.colorNames && product.colorNames.trim() !== '') {
    parsedColors = product.colorNames.split(',').map(c => ({
      name: c.trim(),
      hex: '#333' // Default hex for dynamically added colors
    })).filter(c => c.name !== '');
  }

  const newProduct = { 
    ...product, 
    id: 'drs-custom-' + Date.now(), 
    images: product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'],
    price: Number(product.price),
    colors: parsedColors,
    description: product.description || `Premium ${product.fabric} material. Designed for absolute comfort and style.`,
    sizes: product.sizes && product.sizes.length > 0 ? product.sizes : ['Free Size'],
    isOutOfStock: false
  };
  products.unshift(newProduct);
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  return newProduct;
};

export const deleteCustomProduct = (id) => {
  const products = getCustomProducts();
  const updatedProducts = products.filter(p => p.id !== id);
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(updatedProducts));
};

export const toggleCustomProductStock = (id) => {
  const products = getCustomProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx > -1) {
    products[idx].isOutOfStock = !products[idx].isOutOfStock;
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  }
};


export const saveRating = (orderId, rating, comment) => {
  const ratings = getRatings();
  ratings.push({ orderId, rating, comment, date: new Date().toISOString() });
  localStorage.setItem(KEYS.RATINGS, JSON.stringify(ratings));
};

export const getRatings = () => {
  const data = localStorage.getItem(KEYS.RATINGS);
  return data ? JSON.parse(data) : [];
};

// USER AUTHENTICATION
export const getUsers = () => {
  const data = localStorage.getItem(KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  if (existingIndex > -1) {
    users[existingIndex] = { ...users[existingIndex], ...user, lastLogin: new Date().toISOString() };
  } else {
    users.push({ ...user, joined: new Date().toISOString(), lastLogin: new Date().toISOString() });
  }
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
};

export const getCurrentUser = () => {
  const data = localStorage.getItem(KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user) => {
  saveUser(user);
  localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem(KEYS.CURRENT_USER);
};

export const getUserOrders = (email) => {
  const orders = getOrders();
  return orders.filter(o => o.userEmail === email);
};
