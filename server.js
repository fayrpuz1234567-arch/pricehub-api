const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ─── CSP Headers ────────────────────────────────────────────────
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https:; " +
        "font-src 'self' data:;"
    );
    next();
});

// ─── Serve static files ────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ─── Serve admin.html as default ──────────────────────────────
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// ─────────────────────────────────────────────
// Fake Database
// ─────────────────────────────────────────────

const products = [
  // ─── Electronics ──────────────────────────────────────────────
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description: "Apple flagship smartphone with A17 Pro chip",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
    price: 59999,
    oldPrice: 64999,
    discountPercentage: 7.7,
    category: "Electronics",
    subCategory: "Smartphones",
    storeName: "Apple Store",
    rating: 4.8,
    reviewCount: 1250,
    stock: 45,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01012345678",
    facebook_page: "https://facebook.com/apple",
    contact_email: "apple@store.com",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung flagship phone with AI features",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
    price: 54999,
    oldPrice: 59999,
    discountPercentage: 8.3,
    category: "Electronics",
    subCategory: "Smartphones",
    storeName: "Samsung Store",
    rating: 4.7,
    reviewCount: 890,
    stock: 32,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01087654321",
    facebook_page: "https://facebook.com/samsung",
    contact_email: "samsung@store.com",
  },
  {
    id: 3,
    name: "MacBook Pro M3 Max",
    description: "Apple laptop with M3 Max chip",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    price: 129999,
    oldPrice: 139999,
    discountPercentage: 7.1,
    category: "Electronics",
    subCategory: "Laptops",
    storeName: "Apple Store",
    rating: 4.9,
    reviewCount: 567,
    stock: 12,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01012345678",
    facebook_page: "https://facebook.com/apple",
    contact_email: "apple@store.com",
  },
  {
    id: 4,
    name: "Dell XPS 15",
    description: "Dell premium laptop with Intel i9",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    price: 89999,
    oldPrice: 99999,
    discountPercentage: 10,
    category: "Electronics",
    subCategory: "Laptops",
    storeName: "Dell Store",
    rating: 4.8,
    reviewCount: 345,
    stock: 8,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01111111111",
    facebook_page: "https://facebook.com/dell",
    contact_email: "dell@store.com",
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    description: "Apple wireless earbuds with noise cancellation",
    image: "https://images.unsplash.com/photo-1605784596343-76fce1ad1b6e?w=500",
    price: 8999,
    oldPrice: 10999,
    discountPercentage: 18.2,
    category: "Electronics",
    subCategory: "Audio",
    storeName: "Apple Store",
    rating: 4.7,
    reviewCount: 2345,
    stock: 120,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01012345678",
    facebook_page: "https://facebook.com/apple",
    contact_email: "apple@store.com",
  },

  // ─── Fashion ──────────────────────────────────────────────────
  {
    id: 6,
    name: "Nike Air Max 270",
    description: "Sports shoes with Air Max technology",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    price: 4299,
    oldPrice: 5999,
    discountPercentage: 28,
    category: "Fashion",
    subCategory: "Sports Shoes",
    storeName: "Nike Store",
    rating: 4.8,
    reviewCount: 3400,
    stock: 200,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01222222222",
    facebook_page: "https://facebook.com/nike",
    contact_email: "nike@store.com",
  },
  {
    id: 7,
    name: "Adidas Ultraboost",
    description: "Running shoes with Boost foam technology",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
    price: 4999,
    oldPrice: 6999,
    discountPercentage: 28.6,
    category: "Fashion",
    subCategory: "Sports Shoes",
    storeName: "Adidas Store",
    rating: 4.7,
    reviewCount: 2800,
    stock: 150,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01333333333",
    facebook_page: "https://facebook.com/adidas",
    contact_email: "adidas@store.com",
  },
  {
    id: 8,
    name: "Levi's 501 Jeans",
    description: "Classic denim jeans for men",
    image: "https://images.unsplash.com/photo-1584370848010-d7db6bc1b9a5?w=500",
    price: 1299,
    oldPrice: 1699,
    discountPercentage: 23.5,
    category: "Fashion",
    subCategory: "Clothing",
    storeName: "Levi's Store",
    rating: 4.6,
    reviewCount: 890,
    stock: 300,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01444444444",
    facebook_page: "https://facebook.com/levis",
    contact_email: "levis@store.com",
  },

  // ─── Home & Living ────────────────────────────────────────────
  {
    id: 9,
    name: "IKEA Malm Desk",
    description: "Modern desk with storage",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500",
    price: 3499,
    oldPrice: 4999,
    discountPercentage: 30,
    category: "Home & Living",
    subCategory: "Furniture",
    storeName: "IKEA",
    rating: 4.6,
    reviewCount: 456,
    stock: 25,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01555555555",
    facebook_page: "https://facebook.com/ikea",
    contact_email: "ikea@store.com",
  },
  {
    id: 10,
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with USB charging",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    price: 499,
    oldPrice: 799,
    discountPercentage: 37.5,
    category: "Home & Living",
    subCategory: "Lighting",
    storeName: "Home Depot",
    rating: 4.4,
    reviewCount: 234,
    stock: 80,
    currency: "EGP",
    isTrending: true,
    isBestSeller: false,
    isOffer: true,
    whatsapp_number: "01666666666",
    facebook_page: "https://facebook.com/homedepot",
    contact_email: "homedepot@store.com",
  },

  // ─── Health & Beauty ──────────────────────────────────────────
  {
    id: 11,
    name: "Vitamin C Serum",
    description: "Brightening serum with Vitamin C",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
    price: 299,
    oldPrice: 499,
    discountPercentage: 40,
    category: "Health & Beauty",
    subCategory: "Skincare",
    storeName: "Sephora",
    rating: 4.9,
    reviewCount: 1200,
    stock: 500,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01777777777",
    facebook_page: "https://facebook.com/sephora",
    contact_email: "sephora@store.com",
  },
  {
    id: 12,
    name: "Moisturizing Cream",
    description: "Hydrating face cream for all skin types",
    image: "https://images.unsplash.com/photo-1571553099115-2d35525d9d5b?w=500",
    price: 199,
    oldPrice: 349,
    discountPercentage: 43,
    category: "Health & Beauty",
    subCategory: "Skincare",
    storeName: "Sephora",
    rating: 4.8,
    reviewCount: 980,
    stock: 600,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01777777777",
    facebook_page: "https://facebook.com/sephora",
    contact_email: "sephora@store.com",
  },
  {
    id: 13,
    name: "Hair Dryer Professional",
    description: "Professional hair dryer with ionic technology",
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500",
    price: 899,
    oldPrice: 1299,
    discountPercentage: 30.8,
    category: "Health & Beauty",
    subCategory: "Haircare",
    storeName: "Sephora",
    rating: 4.7,
    reviewCount: 345,
    stock: 120,
    currency: "EGP",
    isTrending: true,
    isBestSeller: false,
    isOffer: true,
    whatsapp_number: "01777777777",
    facebook_page: "https://facebook.com/sephora",
    contact_email: "sephora@store.com",
  },

  // ─── Supermarket ──────────────────────────────────────────────
  {
    id: 14,
    name: "Organic Apples 1kg",
    description: "Fresh organic apples",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
    price: 45,
    oldPrice: null,
    discountPercentage: 0,
    category: "Supermarket",
    subCategory: "Fruits",
    storeName: "Carrefour",
    rating: 4.5,
    reviewCount: 230,
    stock: 200,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: false,
    whatsapp_number: "01888888888",
    facebook_page: "https://facebook.com/carrefour",
    contact_email: "carrefour@store.com",
  },
  {
    id: 15,
    name: "Organic Bananas 1kg",
    description: "Fresh organic bananas",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500",
    price: 35,
    oldPrice: null,
    discountPercentage: 0,
    category: "Supermarket",
    subCategory: "Fruits",
    storeName: "Carrefour",
    rating: 4.4,
    reviewCount: 189,
    stock: 300,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: false,
    whatsapp_number: "01888888888",
    facebook_page: "https://facebook.com/carrefour",
    contact_email: "carrefour@store.com",
  },

  // ─── Sports ───────────────────────────────────────────────────
  {
    id: 16,
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed8e1db9?w=500",
    price: 399,
    oldPrice: 599,
    discountPercentage: 33,
    category: "Sports",
    subCategory: "Fitness",
    storeName: "Decathlon",
    rating: 4.7,
    reviewCount: 340,
    stock: 80,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01999999999",
    facebook_page: "https://facebook.com/decathlon",
    contact_email: "decathlon@store.com",
  },
  {
    id: 17,
    name: "Dumbbell Set 20kg",
    description: "Adjustable dumbbell set with case",
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=500",
    price: 1499,
    oldPrice: 1999,
    discountPercentage: 25,
    category: "Sports",
    subCategory: "Fitness",
    storeName: "Decathlon",
    rating: 4.8,
    reviewCount: 567,
    stock: 45,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01999999999",
    facebook_page: "https://facebook.com/decathlon",
    contact_email: "decathlon@store.com",
  },

  // ─── Books ────────────────────────────────────────────────────
  {
    id: 18,
    name: "Atomic Habits",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    price: 250,
    oldPrice: 350,
    discountPercentage: 28.6,
    category: "Books",
    subCategory: "Self Development",
    storeName: "Amazon Books",
    rating: 4.9,
    reviewCount: 4500,
    stock: 300,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01011111111",
    facebook_page: "https://facebook.com/amazonbooks",
    contact_email: "books@amazon.com",
  },
  {
    id: 19,
    name: "The Psychology of Money",
    description: "Timeless lessons on wealth, greed, and happiness",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500",
    price: 220,
    oldPrice: 320,
    discountPercentage: 31.3,
    category: "Books",
    subCategory: "Finance",
    storeName: "Amazon Books",
    rating: 4.8,
    reviewCount: 3200,
    stock: 250,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01011111111",
    facebook_page: "https://facebook.com/amazonbooks",
    contact_email: "books@amazon.com",
  },

  // ─── Toys ─────────────────────────────────────────────────────
  {
    id: 20,
    name: "LEGO City Fire Station",
    description: "Build your own fire station with 432 pieces",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d9cb0?w=500",
    price: 899,
    oldPrice: 1199,
    discountPercentage: 25,
    category: "Toys",
    subCategory: "Building Sets",
    storeName: "LEGO Store",
    rating: 4.8,
    reviewCount: 567,
    stock: 45,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01022222222",
    facebook_page: "https://facebook.com/lego",
    contact_email: "lego@store.com",
  },
  {
    id: 21,
    name: "Barbie Dreamhouse",
    description: "Barbie dreamhouse with 3 stories",
    image: "https://images.unsplash.com/photo-1558060370-d6441d13258a?w=500",
    price: 1499,
    oldPrice: 1999,
    discountPercentage: 25,
    category: "Toys",
    subCategory: "Dolls",
    storeName: "Mattel Store",
    rating: 4.7,
    reviewCount: 345,
    stock: 30,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01033333333",
    facebook_page: "https://facebook.com/mattel",
    contact_email: "mattel@store.com",
  },

  // ─── Pet Supplies ─────────────────────────────────────────────
  {
    id: 22,
    name: "Premium Dog Food 5kg",
    description: "High protein dog food with real chicken",
    image: "https://images.unsplash.com/photo-1581288402470-3db69a72f2eb?w=500",
    price: 450,
    oldPrice: 600,
    discountPercentage: 25,
    category: "Pet Supplies",
    subCategory: "Dog Food",
    storeName: "PetSmart",
    rating: 4.6,
    reviewCount: 789,
    stock: 120,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01044444444",
    facebook_page: "https://facebook.com/petsmart",
    contact_email: "petsmart@store.com",
  },
  {
    id: 23,
    name: "Cat Tree Tower",
    description: "Multi-level cat tree with scratching posts",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500",
    price: 799,
    oldPrice: 1099,
    discountPercentage: 27.3,
    category: "Pet Supplies",
    subCategory: "Cat Furniture",
    storeName: "PetSmart",
    rating: 4.5,
    reviewCount: 234,
    stock: 40,
    currency: "EGP",
    isTrending: true,
    isBestSeller: false,
    isOffer: true,
    whatsapp_number: "01044444444",
    facebook_page: "https://facebook.com/petsmart",
    contact_email: "petsmart@store.com",
  },

  // ─── Automotive ───────────────────────────────────────────────
  {
    id: 24,
    name: "Car Phone Holder",
    description: "Universal car phone holder with wireless charging",
    image: "https://images.unsplash.com/photo-1585448393928-d0f9a82c2b98?w=500",
    price: 299,
    oldPrice: 499,
    discountPercentage: 40,
    category: "Automotive",
    subCategory: "Car Accessories",
    storeName: "AutoZone",
    rating: 4.4,
    reviewCount: 456,
    stock: 200,
    currency: "EGP",
    isTrending: true,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01055555555",
    facebook_page: "https://facebook.com/autozone",
    contact_email: "autozone@store.com",
  },
  {
    id: 25,
    name: "Car Vacuum Cleaner",
    description: "Portable car vacuum with 12V adapter",
    image: "https://images.unsplash.com/photo-1523987355528-1f0bfb1d357c?w=500",
    price: 399,
    oldPrice: 599,
    discountPercentage: 33.4,
    category: "Automotive",
    subCategory: "Car Accessories",
    storeName: "AutoZone",
    rating: 4.3,
    reviewCount: 234,
    stock: 100,
    currency: "EGP",
    isTrending: false,
    isBestSeller: true,
    isOffer: true,
    whatsapp_number: "01055555555",
    facebook_page: "https://facebook.com/autozone",
    contact_email: "autozone@store.com",
  },
];

const stores = [
  { id: 1, name: "Apple Store", rating: 4.9 },
  { id: 2, name: "Samsung Store", rating: 4.8 },
  { id: 3, name: "Dell Store", rating: 4.7 },
  { id: 4, name: "Nike Store", rating: 4.8 },
  { id: 5, name: "Adidas Store", rating: 4.7 },
  { id: 6, name: "Sephora", rating: 4.9 },
  { id: 7, name: "IKEA", rating: 4.6 },
  { id: 8, name: "Carrefour", rating: 4.5 },
  { id: 9, name: "Decathlon", rating: 4.7 },
  { id: 10, name: "Amazon Books", rating: 4.8 },
  { id: 11, name: "LEGO Store", rating: 4.8 },
  { id: 12, name: "PetSmart", rating: 4.6 },
  { id: 13, name: "AutoZone", rating: 4.4 },
  { id: 14, name: "Levi's Store", rating: 4.6 },
  { id: 15, name: "Home Depot", rating: 4.4 },
  { id: 16, name: "Mattel Store", rating: 4.7 },
];

const categories = [
  { id: "electronics", name: "Electronics", icon: "📱", subCategories: [] },
  { id: "fashion", name: "Fashion", icon: "👗", subCategories: [] },
  { id: "supermarket", name: "Supermarket", icon: "🛒", subCategories: [] },
  { id: "home_living", name: "Home & Living", icon: "🏠", subCategories: [] },
  { id: "health_beauty", name: "Health & Beauty", icon: "💄", subCategories: [] },
  { id: "sports", name: "Sports", icon: "⚽", subCategories: [] },
  { id: "books", name: "Books", icon: "📚", subCategories: [] },
  { id: "toys", name: "Toys", icon: "🧸", subCategories: [] },
  { id: "pets", name: "Pet Supplies", icon: "🐾", subCategories: [] },
  { id: "automotive", name: "Automotive", icon: "🚗", subCategories: [] },
  { id: "stores", name: "Stores", icon: "🏪", subCategories: [] },
];

// ─── Products Endpoints ──────────────────────────────────────────

app.get("/products", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;
  res.json({ data: products.slice(start, end), total: products.length, page, limit });
});

app.get("/products/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const result = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
  res.json({ data: result, total: result.length });
});

app.get("/products/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const result = products.filter((p) => p.category.toLowerCase() === category);
  res.json({ data: result, total: result.length });
});

app.get("/products/trending", (req, res) => {
  res.json({ data: products.filter((p) => p.isTrending) });
});

app.get("/products/best-sellers", (req, res) => {
  res.json({ data: products.filter((p) => p.isBestSeller) });
});

app.get("/products/offers", (req, res) => {
  res.json({ data: products.filter((p) => p.isOffer) });
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json({ data: product });
});

// ─── Categories ──────────────────────────────────────────────────

app.get("/categories", (req, res) => {
  res.json({ data: categories, total: categories.length });
});

// ─── Stores ──────────────────────────────────────────────────────

app.get("/stores", (req, res) => {
  res.json({ data: stores, total: stores.length });
});

// ─── CRUD Operations ─────────────────────────────────────────────

// POST: Add new product
app.post("/products", (req, res) => {
    const newProduct = {
        id: Date.now(),
        ...req.body,
        rating: req.body.rating || 0,
        reviewCount: req.body.reviewCount || 0,
        isTrending: req.body.isTrending || false,
        isBestSeller: req.body.isBestSeller || false,
        isOffer: req.body.isOffer || false,
        currency: req.body.currency || 'EGP',
    };
    products.push(newProduct);
    res.json({ message: "Product added successfully", data: newProduct });
});

// PUT: Update product
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
    }
    products[index] = { ...products[index], ...req.body };
    res.json({ message: "Product updated successfully", data: products[index] });
});

// DELETE: Delete product
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
    }
    products.splice(index, 1);
    res.json({ message: "Product deleted successfully" });
});

// ─── Start Server ────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});