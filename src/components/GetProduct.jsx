import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Chat.css"
import "./Carousel.css"
import "./Dark.css"

// ── CHAT ANSWERS ──
const chatAnswers = [
{
keywords: [
"hello",
"hi",
"hey",
"good morning",
"good afternoon",
"good evening",
"hii",
"hallo",
],
answer:
"Hello! 👋 Welcome to Urban Loom Fashion! I'm here to help you find the perfect clothes and accessories. What are you looking for today?",
},

{
keywords: ["how are you", "how r you", "how are u"],
answer:
"I'm doing great, thank you! 😊 Ready to help you find stylish clothes and accessories. What can I help you with?",
},

// CLOTHING
{
keywords: [
"shirt",
"shirts",
"tshirt",
"t-shirt",
"t-shirts",
"tee",
],
answer:
"👕 We have a variety of shirts and T-shirts in different colors, sizes, and styles. Search 'shirt' above to see what's available!",
filter: "shirt",
},

{
keywords: [
"dress",
"dresses",
"gown",
"gowns",
],
answer:
"👗 We have stylish dresses and gowns for different occasions. Search 'dress' above to browse our collection!",
filter: "dress",
},

{
keywords: [
"trouser",
"trousers",
"pants",
"pant",
"jeans",
"jean",
],
answer:
"👖 We stock trousers, pants, and jeans in different sizes and styles. Search 'trousers' or 'jeans' above!",
filter: "trousers",
},

{
keywords: [
"short",
"shorts",
],
answer:
"🩳 We have shorts in different styles and sizes for casual and everyday wear. Search 'shorts' to see available options!",
filter: "shorts",
},

{
keywords: [
"skirt",
"skirts",
],
answer:
"💃 We have skirts in different styles, colors, and sizes. Search 'skirt' above to browse our collection!",
filter: "skirt",
},

{
keywords: [
"jacket",
"jackets",
"coat",
"coats",
],
answer:
"🧥 We stock jackets and coats suitable for casual and smart looks. Search 'jacket' or 'coat' above!",
filter: "jacket",
},

{
keywords: [
"hoodie",
"hoodies",
"sweater",
"sweaters",
"jumper",
],
answer:
"🧥 Looking for something comfortable? We have hoodies and sweaters in different styles and sizes. Search 'hoodie' above!",
filter: "hoodie",
},

{
keywords: [
"top",
"tops",
"blouse",
"blouses",
],
answer:
"👚 We have a selection of tops and blouses for different occasions. Search 'top' or 'blouse' above!",
filter: "top",
},

{
keywords: [
"suit",
"suits",
"formal",
"office wear",
"official",
],
answer:
"🤵 We have smart and formal wear suitable for work, meetings, events, and special occasions. Search 'suit' above!",
filter: "suit",
},

{
keywords: [
"sportswear",
"sports wear",
"gym",
"workout",
"activewear",
"active wear",
],
answer:
"🏃 We have comfortable sportswear and activewear for workouts, gym sessions, and everyday activities. Search 'sportswear' above!",
filter: "sportswear",
},

// SHOES
{
keywords: [
"shoe",
"shoes",
"sneaker",
"sneakers",
"trainers",
],
answer:
"👟 We have sneakers and shoes in different styles, sizes, and colors. Search 'shoes' above to see what's available!",
filter: "shoes",
},

{
keywords: [
"boots",
"boot",
],
answer:
"🥾 We have boots suitable for casual, outdoor, and everyday wear. Search 'boots' above!",
filter: "boots",
},

{
keywords: [
"sandal",
"sandals",
"slipper",
"slippers",
],
answer:
"🩴 We stock sandals and slippers in different styles and sizes. Search 'sandals' above!",
filter: "sandals",
},

// ACCESSORIES
{
keywords: [
"bag",
"bags",
"handbag",
"handbags",
"purse",
"purses",
],
answer:
"👜 We have handbags, purses, and stylish bags in different colors and designs. Search 'bag' above!",
filter: "bag",
},

{
keywords: [
"backpack",
"backpacks",
"school bag",
"school bags",
],
answer:
"🎒 We have backpacks suitable for school, work, travel, and everyday use. Search 'backpack' above!",
filter: "backpack",
},

{
keywords: [
"watch",
"watches",
"wristwatch",
],
answer:
"⌚ We have stylish watches that can complement both casual and formal outfits. Search 'watch' above!",
filter: "watch",
},

{
keywords: [
"jewelry",
"jewellery",
"necklace",
"necklaces",
"bracelet",
"bracelets",
"earring",
"earrings",
"ring",
"rings",
],
answer:
"💎 We have beautiful jewelry including necklaces, bracelets, earrings, and rings. Search 'jewelry' above!",
filter: "jewelry",
},

{
keywords: [
"belt",
"belts",
],
answer:
"👔 We have belts in different colors and styles to complete your outfit. Search 'belt' above!",
filter: "belt",
},

{
keywords: [
"hat",
"hats",
"cap",
"caps",
],
answer:
"🧢 We have caps and hats in different styles and colors. Search 'cap' above!",
filter: "cap",
},

{
keywords: [
"scarf",
"scarves",
],
answer:
"🧣 We have stylish scarves in different colors and designs. Search 'scarf' above!",
filter: "scarf",
},

{
keywords: [
"sunglasses",
"sunglass",
"glasses",
],
answer:
"🕶️ We have fashionable sunglasses and eyewear to complete your look. Search 'sunglasses' above!",
filter: "sunglasses",
},

// MEN / WOMEN / KIDS
{
keywords: [
"men",
"mens",
"men's",
"male",
"gentlemen",
],
answer:
"👔 We have clothing and accessories for men, including shirts, trousers, jackets, shoes, watches, and more. Search for the specific item you need!",
filter: "men",
},

{
keywords: [
"women",
"womens",
"women's",
"ladies",
"lady",
"female",
],
answer:
"👗 We have fashionable clothing and accessories for women, including dresses, tops, skirts, bags, shoes, jewelry, and more. Search for what you need!",
filter: "women",
},

{
keywords: [
"kids",
"children",
"child",
"boys",
"girls",
"baby",
],
answer:
"👶 We have clothing and accessories for kids, boys, girls, and babies. Search for a specific item to see what's available!",
filter: "kids",
},

// SIZE
{
keywords: [
"size",
"sizes",
"small",
"medium",
"large",
"xl",
"xxl",
"xxxl",
],
answer:
"📏 We have different sizes depending on the product. Check the product details for available sizes, or contact us if you need help choosing the right size!",
},

// COLORS
{
keywords: [
"black",
"white",
"red",
"blue",
"green",
"yellow",
"pink",
"brown",
"grey",
"gray",
],
answer:
"🎨 We have products in different colors and styles. Search for the item together with the color you want, for example 'black shirt'!",
},

// PRICE
{
keywords: [
"price",
"cost",
"how much",
"expensive",
"cheap",
"affordable",
"bei",
],
answer:
"💰 Product prices are displayed on each product card. Search for the item you're interested in to see its current price!",
},

// DISCOUNTS
{
keywords: [
"discount",
"offer",
"sale",
"deal",
"promo",
"coupon",
"promotion",
],
answer:
"🔥 We have great fashion deals and offers from time to time. Check our product listings for discounted items and special offers!",
},

// PAYMENT
{
keywords: [
"payment",
"pay",
"mpesa",
"m-pesa",
"cash",
"card",
"lipa",
"checkout",
],
answer:
"💳 We accept M-Pesa, cash, and card payments. Click 'Buy Now' on a product to proceed to checkout!",
},

{
keywords: [
"paybill",
"till",
"number",
"send money",
],
answer:
"📱 Our M-Pesa payment details are shown during checkout. Click 'Buy Now' on any product to proceed!",
},

{
keywords: [
"invoice",
"receipt",
"proof of payment",
],
answer:
"🧾 We provide receipts for purchases. Contact us if you need an invoice or proof of payment!",
},

// DELIVERY
{
keywords: [
"delivery",
"shipping",
"deliver",
"send",
"courier",
"dispatch",
],
answer:
"🚚 Yes! We deliver across Kenya. Delivery time and cost depend on your location. Contact us for details!",
},

{
keywords: [
"nairobi",
"nakuru",
"mombasa",
"kisumu",
"eldoret",
"thika",
"nyeri",
],
answer:
"🚚 We deliver to different locations across Kenya. Contact us with your location to confirm delivery time and charges!",
},

{
keywords: [
"free delivery",
"free shipping",
"delivery fee",
"shipping cost",
],
answer:
"🚚 Delivery charges depend on your location and order. Contact us to get the exact delivery cost!",
},

{
keywords: [
"how long",
"when will",
"duration",
"days to deliver",
"waiting",
],
answer:
"⏰ Delivery time depends on your location. We'll keep you updated once your order has been dispatched!",
},

{
keywords: [
"track",
"tracking",
"order status",
"where is my order",
],
answer:
"📦 To track your order, contact us with your order details and we'll help you check its status!",
},

// RETURNS
{
keywords: [
"return",
"refund",
"exchange",
"wrong item",
"damaged",
],
answer:
"🔄 If you receive a wrong or damaged item, contact us as soon as possible so we can help with the return or exchange process!",
},

// QUALITY
{
keywords: [
"quality",
"brand",
"trusted",
"reliable",
"best",
],
answer:
"⭐ We aim to provide quality clothing and accessories at affordable prices. Check the product description for details about each item!",
},

// CONTACT
{
keywords: [
"contact",
"call",
"phone",
"number",
"reach",
"whatsapp",
],
answer:
"📞 You can contact us by phone or WhatsApp for product questions, orders, delivery information, or general assistance!",
},

{
keywords: [
"email",
"mail",
"write to",
],
answer:
"📧 You can contact us by email for inquiries, orders, or support. We'll be happy to assist you!",
},

// LOCATION
{
keywords: [
"location",
"address",
"where",
"shop",
"find you",
"directions",
"map",
],
answer:
"📍 You can find our shop location on the Location page of our website. Check the map for directions!",
},

// HOURS
{
keywords: [
"open",
"working hours",
"hours",
"when open",
"close",
"closed",
"sunday",
],
answer:
"🕗 Please check our website or contact us directly for our current opening hours!",
},

// ACCOUNT
{
keywords: [
"sign up",
"signup",
"register",
"create account",
"new account",
],
answer:
"📝 Creating an account is easy! Click 'Sign Up' in the navigation bar, enter your details, and you're ready to shop!",
},

{
keywords: [
"sign in",
"signin",
"login",
"log in",
"password",
"forgot password",
],
answer:
"🔐 Click 'Sign In' in the navigation bar to access your account. If you've forgotten your password, use the password reset option!",
},

// SELLING
{
keywords: [
"sell",
"add product",
"list product",
"upload product",
"vendor",
"supplier",
"i want to sell",
],
answer:
"🛍️ Want to sell your clothes or accessories? Click 'Add Product' in the navigation bar to list your products!",
},

// GREETINGS / GOODBYE
{
keywords: [
"thank",
"thanks",
"asante",
"sawa",
"okay",
"ok",
"great",
"good",
"perfect",
"awesome",
],
answer:
"😊 You're welcome! Feel free to ask if you need help finding clothes or accessories. Happy shopping at Urban Loom! 🛍️",
},

{
keywords: [
"bye",
"goodbye",
"see you",
"later",
"kwaheri",
"ciao",
],
answer:
"👋 Goodbye! Thanks for visiting Urban Loom Fashion. Come back anytime — we're always happy to help! 🛍️",
},

// HELP
{
keywords: [
"help",
"assist",
"support",
"problem",
"issue",
"not working",
],
answer:
"🙋 I'm here to help! Ask me about clothes, shoes, bags, jewelry, sizes, prices, payments, delivery, or anything else!",
},

// ABOUT
{
keywords: [
"about",
"who are you",
"Urban Loom",
"company",
"business",
"about us",
],
answer:
"🏪 Urban Loom Fashion is an online fashion store offering clothing, shoes, bags, jewelry, and accessories. Our goal is to make stylish and affordable fashion easy to find and buy!",
},
];



// ── Fashion Vrands ──
const fashionBrands = [
  { name: "Nike", flag: "🇺🇸" },
  { name: "Adidas", flag: "🇩🇪" },
  { name: "Puma", flag: "🇩🇪" },

  { name: "Zara", flag: "🇪🇸" },
  { name: "H&M", flag: "🇸🇪" },
  { name: "Uniqlo", flag: "🇯🇵" },

  { name: "Levi’s", flag: "🇺🇸" },
  { name: "Calvin Klein", flag: "🇺🇸" },
  { name: "Tommy Hilfiger", flag: "🇺🇸" },

  { name: "Ralph Lauren", flag: "🇺🇸" },
  { name: "Guess", flag: "🇺🇸" },
  { name: "Gap", flag: "🇺🇸" },

  { name: "Under Armour", flag: "🇺🇸" },
  { name: "New Balance", flag: "🇺🇸" },
  { name: "Converse", flag: "🇺🇸" },

  { name: "Vans", flag: "🇺🇸" },
  { name: "Timberland", flag: "🇺🇸" },
  { name: "Burberry", flag: "🇬🇧" },

  { name: "Dr. Martens", flag: "🇬🇧" },
  { name: "Topshop", flag: "🇬🇧" },
  { name: "River Island", flag: "🇬🇧" },

  { name: "Lacoste", flag: "🇫🇷" },
  { name: "Chanel", flag: "🇫🇷" },
  { name: "Louis Vuitton", flag: "🇫🇷" },

  { name: "Gucci", flag: "🇮🇹" },
  { name: "Prada", flag: "🇮🇹" },
  { name: "Armani", flag: "🇮🇹" },

  { name: "Versace", flag: "🇮🇹" },
  { name: "Fendi", flag: "🇮🇹" },
  { name: "Bershka", flag: "🇪🇸" },
];


const INITIAL_CHAT = [
  {
    role: "assistant",
    text: "Hi! 👋 Welcome to Urban Loom! Ask me about fashion and accessories, prices, delivery, payment, or anything else. I'm here to help!",
  },
];

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerComment, setFooterComment] = useState("");
  const [footerSent, setFooterSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const chatBottomRef = useRef(null);
  const navigate = useNavigate();
  const IMG_URL = "https://benedict.alwaysdata.net/static/images/";

   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // ── AUTH ──
  const requireAuth = (callback) => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signup");
      return false;
    }
    if (callback) callback();
    return true;
  };

  const handleNav = (path, state = {}) => {
    const user = localStorage.getItem("user");
    const publicPaths = ["/", "/signup", "/signin", "/aboutus", "/location"];
    if (!user && !publicPaths.includes(path)) {
      navigate("/signup");
      return;
    }
    navigate(path, state);
  };

  // Handling logging out
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // ── DATA ──
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading("Loading products, please wait...");
      setError("");
      try {
        const { data } = await axios.get(
          "https://benedict.alwaysdata.net/api/getproducts",
        );
        setProducts(data);
      } catch (err) {
        setError("Failed to load products: " + err.message);
      } finally {
        setLoading("");
      }
    };
    fetchProducts();
  }, []);

  // ── SCROLL CHAT TO BOTTOM ──
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // ── FIX 1: IMPROVED FILTER — trims whitespace, guards empty query ──
  const filteredProducts = products.filter((p) => {
    const q = search.trim().toLowerCase();
    const selectedCat = selectedCategory.trim().toLowerCase();
    const dbCat = (p.product_cartegory || p.product_cartegory || "")
      .toString()
      .toLowerCase()
      .trim();

    const matchesSearch =
      !q ||
      p.product_name?.toLowerCase().includes(q) ||
      p.product_description?.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === "All" || dbCat === selectedCat;

    return matchesSearch && matchesCategory;
  });

  const highlight = (text) => {
    if (!search || !text) return text;
    const regex = new RegExp(
      `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    return String(text)
      .split(regex)
      .map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part,
      );
  };

  // ── CART ──
  const addToCart = (product) => {
    if (!requireAuth()) return;
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      return exists
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
    showToast(`🛒 "${product.product_name}" added to cart!`);
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );

  const cartTotal = cart.reduce((sum, i) => sum + i.product_cost * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // ── TOAST ──
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── CHAT ──
  const getReply = (text) => {
    const lower = text.toLowerCase();
    const match = chatAnswers.find((item) =>
      item.keywords.some((kw) => lower.includes(kw)),
    );
    return (
      match?.answer ??
      "I'm not sure about that 🤔 Please call us on 📞 0705387545 or WhatsApp for more help. We're happy to assist!"
    );
  };

  const dispatchChat = (userText) => {
    if (!requireAuth()) return;

    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setChatLoading(true);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: getReply(userText) },
      ]);
      setChatLoading(false);
    }, 800);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim() || chatLoading) return;
    dispatchChat(chatInput);
    setChatInput("");
  };

  // ── FIX 2: TAG CLICK HANDLER — uses short query keyword + delayed scroll ──
  const handleTagClick = (query) => {
    if (!requireAuth()) return;
    setSearch(query);
    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ── FOOTER FORM ──
  const handleFooterSubmit = () => {
    if (!footerEmail || !footerComment) return;
    setFooterSent(true);
    setTimeout(() => {
      setFooterSent(false);
      setFooterEmail("");
      setFooterComment("");
    }, 3500);
  };

  const marqueeItems = [...fashionBrands, ...fashionBrands];

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* TOAST */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            background: "#1a1a2e",
            color: "#fff",
            padding: "14px 22px",
            borderRadius: 12,
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            fontWeight: 600,
            fontSize: "0.95rem",
            animation: "slideInRight 0.4s ease",
            borderLeft: "4px solid #ff7e5f",
          }}
        >
          {toast}
        </div>
      )}
      {/* CART DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: cartOpen ? 0 : "-420px",
          width: 400,
          height: "100vh",
          background: "#fff",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.25)",
          zIndex: 9000,
          transition: "right 0.4s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg,#ff7e5f,#feb47b)",
            padding: "18px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ margin: 0, color: "#fff", fontWeight: 700 }}>
            🛒 Your Cart ({cartCount})
          </h5>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 24,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 60, color: "#999" }}>
              <div style={{ fontSize: 60 }}>🛒</div>
              <p style={{ marginTop: 12, fontWeight: 600 }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: "0.85rem" }}>
                Add some products to get started!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 16,
                  padding: 12,
                  borderRadius: 12,
                  background: "#fff8f6",
                  border: "1px solid #ffe0d6",
                }}
              >
                <img
                  src={IMG_URL + item.product_photo}
                  alt={item.product_name}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem" }}>
                    {item.product_name}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 8px",
                      color: "#ff4500",
                      fontWeight: 700,
                    }}
                  >
                    Ksh {item.product_cost}
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1.5px solid #ff7e5f",
                        background: "#fff",
                        color: "#ff7e5f",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontWeight: 700 }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "none",
                        background: "#ff7e5f",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 700, color: "#333" }}>
                    Ksh {(item.product_cost * item.qty).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ccc",
                      cursor: "pointer",
                      fontSize: 18,
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f0e0dd" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                fontSize: "1.1rem",
                marginBottom: 14,
              }}
            >
              <span>Total</span>
              <span style={{ color: "#ff4500" }}>
                Ksh {cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                setCartOpen(false);
                handleNav("/makepayment", { state: { cart } });
              }}
              style={{
                width: "100%",
                padding: 14,
                background: "linear-gradient(90deg,#ff7e5f,#feb47b)",
                border: "none",
                borderRadius: 12,
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout →
            </button>
            <button
              onClick={() => setCart([])}
              style={{
                width: "100%",
                marginTop: 8,
                padding: 10,
                background: "none",
                border: "1.5px solid #ddd",
                borderRadius: 12,
                color: "#999",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 8999,
          }}
        />
      )}
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md offer-navbar sticky-top">
        <div className="container">
          <img
            src="/images2/shoppingbag.jpeg"
            alt="Shopper Logo"
            className="navbar-logo me-2"
          />
          <Link to="/" className="navbar-brand fw-bold ">
            Urban Loom
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto align-items-center">
              <Link to="/" className="nav-link active">
                Home
              </Link>
              <Link to="/addproduct" className="nav-link">
                Add Product
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
              <Link to="/aboutus" className="nav-link offer-link">
                About Us
              </Link>
              <Link to="/location" className="nav-link offer-link">
                Location
              </Link>
              <button
                onClick={() => {
                  if (requireAuth()) setCartOpen(true);
                }}
                style={{
                  marginLeft: 12,
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  borderRadius: 30,
                  color: "#fff",
                  padding: "6px 16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  backdropFilter: "blur(6px)",
                }}
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span
                    style={{
                      background: "#ff4500",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
              <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="theme-button"
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
        
            </div>
          </div>
        </div>
      </nav>
      {/* OFFER BANNER */}
      <div className="offer-words d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="fade-text-wrapper">
            <span className="fade-text">
              🔥 Best Deals on Clothes And Accesories! 🔥
            </span>
            <span className="fade-text">
              💥 Flash Sale — Don't Miss Out! 💥
            </span>

            <span className="fade-text">
              ⚡ Fast Delivery & Trusted Quality! ⚡
            </span>
          </div>
        </div>
      </div>
      <style>{`
        .offer-navbar { background: linear-gradient(90deg,#ff7e5f,#feb47b); box-shadow: 0 4px 15px rgba(0,0,0,0.25); padding: 0.8rem 1rem; }
        .offer-navbar .navbar-brand { font-size: 1.5rem; letter-spacing: 1px; transition: transform 0.3s; }
        .offer-navbar .navbar-brand:hover { transform: scale(1.1); color: #fff8dc; }
        .offer-navbar .nav-link { color: white; margin-left: 0.5rem; font-weight: 500; position: relative; transition: all 0.3s; }
        .offer-navbar .nav-link::after { content: ''; position: absolute; width: 0%; height: 2px; bottom: -3px; left: 0; background-color: #fff; transition: width 0.3s; }
        .offer-navbar .nav-link:hover::after { width: 100%; }
        .offer-navbar .nav-link.active { font-weight: 700; color: #ffe066; }
        .navbar-logo { height: 45px; width: 45px; border-radius: 50%; border: 2px solid #fff; transition: transform 0.3s ease; }
        .navbar-logo:hover { transform: rotate(15deg) scale(1.1); }

        .offer-words { background: linear-gradient(135deg,#1a1a2e,#16213e); height: 80px; overflow: hidden; }
        .fade-text-wrapper { position: relative; width: 100%; text-align: center; display: flex; justify-content: center; align-items: center; height: 100%; }
        .fade-text { position: absolute; opacity: 0; font-size: 1.4rem; font-weight: 800; color: #feb47b; text-shadow: 0 0 20px rgba(255,180,123,0.5); animation: fadeInOut 8s infinite; letter-spacing: 1px; }
        .fade-text:nth-child(1) { animation-delay: 0s; }
        .fade-text:nth-child(2) { animation-delay: 2s; }
        .fade-text:nth-child(3) { animation-delay: 4s; }
        .fade-text:nth-child(4) { animation-delay: 6s; }
        @keyframes fadeInOut { 0%,20%{opacity:0;transform:translateY(20px)} 25%,50%{opacity:1;transform:translateY(0)} 55%,100%{opacity:0;transform:translateY(-20px)} }
        @keyframes slideInRight { from{transform:translateX(80px);opacity:0} to{transform:translateX(0);opacity:1} }

        .carousel-img { height: 520px; object-fit: cover; }
        .colourful-caption { background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); border-radius: 16px; padding: 20px 28px; }
        .colourful-caption h1 { font-weight: 800; letter-spacing: 0.5px; }
        .features { font-size: 0.95rem; color: #ffe066; letter-spacing: 0.5px; }
        .carousel-btn-group { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
        .carousel-btn-group .btn { min-width: 120px; }

        .search-section { background: linear-gradient(135deg,#fff8f5,#fff3e0); padding: 28px 20px; border-bottom: 1px solid #ffe0d6; }
        .search-wrap { max-width: 640px; margin: 0 auto; display: flex; align-items: center; background: #fff; border-radius: 50px; box-shadow: 0 6px 30px rgba(255,126,95,0.18); border: 2px solid #ffe0d6; overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s; }
        .search-wrap:focus-within { border-color: #ff7e5f; box-shadow: 0 8px 36px rgba(255,126,95,0.28); }
        .search-icon { padding: 0 16px; font-size: 1.2rem; color: #ff7e5f; flex-shrink: 0; }
        .search-input { flex: 1; border: none; outline: none; padding: 14px 4px; font-size: 1rem; font-weight: 500; color: #1a1a2e; background: transparent; }
        .search-input::placeholder { color: #bbb; font-weight: 400; }
        .search-clear { background: none; border: none; color: #ccc; font-size: 1.1rem; cursor: pointer; padding: 0 10px; transition: color 0.2s; flex-shrink: 0; }
        .search-clear:hover { color: #ff4500; }
        .search-btn { background: linear-gradient(90deg,#ff7e5f,#feb47b); border: none; color: #fff; font-weight: 800; padding: 14px 28px; font-size: 0.95rem; cursor: pointer; flex-shrink: 0; transition: opacity 0.2s; }
        .search-btn:hover { opacity: 0.88; }
        .search-meta { text-align: center; margin-top: 12px; font-size: 0.85rem; color: #aaa; font-weight: 500; }
        .search-meta b { color: #ff7e5f; }
        .tag-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .tag { background: #fff; border: 1.5px solid #ffe0d6; border-radius: 30px; padding: 5px 14px; font-size: 0.8rem; font-weight: 600; color: #ff7e5f; cursor: pointer; transition: all 0.2s; }
        .tag:hover { background: #ff7e5f; color: #fff; border-color: #ff7e5f; }
        .tag.active { background: #ff7e5f; color: #fff; border-color: #ff7e5f; }

        .no-results { text-align: center; padding: 60px 20px; }
        .no-results-icon { font-size: 64px; }
        .no-results h4 { color: #1a1a2e; font-weight: 800; margin: 16px 0 8px; }
        .no-results p { color: #999; font-size: 0.9rem; }
        .no-results-btn { margin-top: 16px; background: linear-gradient(90deg,#ff7e5f,#feb47b); border: none; border-radius: 30px; color: #fff; font-weight: 700; padding: 11px 28px; cursor: pointer; font-size: 0.95rem; }

        .product-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(270px,1fr)); gap: 28px; padding: 0 20px 40px; }
        .product-card { background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transition: transform 0.35s ease, box-shadow 0.35s ease; display: flex; flex-direction: column; animation: fadeInUp 0.7s both; }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(255,126,95,0.2); }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        .img-wrap { position: relative; overflow: hidden; height: 210px; background: #f7f7f7; }
        .img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .product-card:hover .img-wrap img { transform: scale(1.07); }
        .img-overlay { position: absolute; inset: 0; background: rgba(26,26,46,0.55); display: flex; justify-content: center; align-items: center; gap: 10px; opacity: 0; transition: opacity 0.35s ease; }
        .product-card:hover .img-overlay { opacity: 1; }
        .overlay-btn { padding: 9px 18px; border-radius: 30px; font-weight: 700; font-size: 0.85rem; cursor: pointer; border: none; transition: transform 0.2s, box-shadow 0.2s; }
        .overlay-btn:hover { transform: scale(1.08); box-shadow: 0 6px 18px rgba(0,0,0,0.3); }
        .badge-hot { position: absolute; top: 12px; left: 12px; background: linear-gradient(135deg,#ff4500,#ff7e5f); color: #fff; padding: 5px 11px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; z-index: 2; box-shadow: 0 4px 12px rgba(255,69,0,0.4); }
        .card-body-inner { padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1; }
        .product-name { font-weight: 800; font-size: 1rem; color: #1a1a2e; margin-bottom: 4px; line-height: 1.3; }
        .product-desc { font-size: 0.82rem; color: #888; margin-bottom: 10px; line-height: 1.5; flex: 1; }
        .price-row { display: flex; align-items: baseline; gap: 8px; margin: 10px 0 14px; flex-wrap: wrap; }
        .price { font-size: 1.3rem; font-weight: 800; color: #ff4500; }
        .btn-buy { flex: 1; padding: 11px; border-radius: 12px; border: none; background: linear-gradient(90deg,#ff7e5f,#feb47b); color: #fff; font-weight: 800; font-size: 0.9rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .btn-buy:hover { transform: scale(1.04); box-shadow: 0 8px 24px rgba(255,126,95,0.4); }
        .btn-cart { padding: 11px 14px; border-radius: 12px; border: 2px solid #ff7e5f; background: transparent; color: #ff7e5f; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; }
        .btn-cart:hover { background: #ff7e5f; color: #fff; transform: scale(1.04); }
        .section-title { font-size: 1.9rem; font-weight: 900; color: #1a1a2e; letter-spacing: -0.5px; }
        .section-sub { color: #888; font-size: 0.95rem; margin-bottom: 30px; }
        .trust-bar { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; padding: 18px 20px; background: #fff8f5; border-top: 1px solid #ffe0d6; border-bottom: 1px solid #ffe0d6; }
        .trust-item { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 600; color: #555; }
        .trust-icon { font-size: 1.3rem; }
        mark { background: #fff3cd; border-radius: 3px; padding: 0 2px; font-weight: 700; color: #b35c00; }

        .chat-bubble-bot { background: #fff; border: 1px solid #ffe0d6; border-radius: 14px 14px 14px 4px; padding: 10px 14px; max-width: 78%; font-size: 0.85rem; color: #1a1a2e; line-height: 1.5; }
        .chat-bubble-user { background: #ff7e5f; border-radius: 14px 14px 4px 14px; padding: 10px 14px; max-width: 78%; font-size: 0.85rem; color: #fff; line-height: 1.5; }
        .chat-chip { background: #fff; border: 1.5px solid #ffe0d6; border-radius: 20px; padding: 5px 12px; font-size: 0.78rem; font-weight: 600; color: #ff7e5f; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .chat-chip:hover { background: #ff7e5f; color: #fff; border-color: #ff7e5f; }
        @keyframes chatBounce { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(-5px);opacity:1} }
        @keyframes chatSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .brands-marquee-section { background: linear-gradient(135deg,#0f0f1e 0%,#1a1a2e 60%,#16213e 100%); padding: 22px 0; overflow: hidden; border-top: 3px solid #ff7e5f; border-bottom: 3px solid #feb47b; position: relative; }
        .brands-marquee-section::before { content: '🚗 WE SUPPORT'; position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 0.7rem; font-weight: 900; letter-spacing: 2.5px; color: #ff7e5f; z-index: 10; background: #1a1a2e; padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,126,95,0.35); white-space: nowrap; }
        .brands-marquee-section::after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 160px; background: linear-gradient(90deg,#1a1a2e 40%,transparent); z-index: 5; pointer-events: none; }
        .brands-marquee-fade-right { position: absolute; right: 0; top: 0; bottom: 0; width: 120px; background: linear-gradient(270deg,#1a1a2e 40%,transparent); z-index: 5; pointer-events: none; }
        .brands-marquee-track { display: flex; align-items: center; animation: marquee-scroll 45s linear infinite; width: max-content; padding-left: 180px; }
        .brands-marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .brand-pill { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,126,95,0.28); border-radius: 50px; padding: 10px 26px; margin: 0 12px; white-space: nowrap; font-size: 1.15rem; font-weight: 800; color: #e8e8f0; letter-spacing: 0.8px; transition: all 0.25s ease; cursor: default; user-select: none; }
        .brand-pill:hover { background: rgba(255,126,95,0.18); border-color: #ff7e5f; color: #feb47b; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(255,126,95,0.25); }
        .brand-pill .brand-flag { font-size: 1.35rem; line-height: 1; }
        .brand-pill .brand-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,126,95,0.4); margin-left: 6px; }

        .fitspare-footer { background: linear-gradient(160deg,#0f0f1e 0%,#1a1a2e 50%,#16213e 100%); color: #e0e0e0; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden; }
        .fitspare-footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg,#ff7e5f,#feb47b,#ff7e5f); background-size: 200% 100%; animation: shimmer 3s linear infinite; }
        @keyframes shimmer { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 28px; padding: 36px 60px 24px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        @media (max-width: 992px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 24px; padding: 32px 32px 24px; } }
        @media (max-width: 600px) { .footer-top { grid-template-columns: 1fr; gap: 20px; padding: 28px 24px 20px; } .footer-bottom-inner { flex-direction: column; gap: 16px; text-align: center; } }
        .footer-brand-logo { width: 44px; height: 44px; border-radius: 50%; border: 3px solid #ff7e5f; object-fit: cover; margin-bottom: 10px; box-shadow: 0 0 20px rgba(255,126,95,0.4); }
        .footer-brand-name { font-size: 1.3rem; font-weight: 900; background: linear-gradient(90deg,#ff7e5f,#feb47b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; letter-spacing: 0.5px; }
        .footer-brand-desc { font-size: 0.83rem; color: #8899aa; line-height: 1.6; margin-bottom: 16px; }
        .footer-col-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #ff7e5f; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .footer-col-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg,#ff7e5f22,transparent); }
        .footer-link { display: flex; align-items: center; gap: 8px; color: #8899aa; text-decoration: none; font-size: 0.85rem; padding: 4px 0; transition: color 0.2s, transform 0.2s; }
        .footer-link:hover { color: #feb47b; transform: translateX(4px); }
        .footer-link-arrow { font-size: 0.65rem; color: #ff7e5f; opacity: 0; transition: opacity 0.2s; }
        .footer-link:hover .footer-link-arrow { opacity: 1; }
        .footer-contact-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
        .footer-contact-icon { width: 32px; height: 32px; flex-shrink: 0; background: rgba(255,126,95,0.12); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 1px solid rgba(255,126,95,0.2); }
        .footer-contact-text { font-size: 0.83rem; color: #8899aa; line-height: 1.4; }
        .footer-contact-text strong { color: #ccd; display: block; font-size: 0.75rem; margin-bottom: 1px; }
        .footer-hours { display: flex; flex-direction: column; gap: 4px; }
        .footer-hour-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #8899aa; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .footer-hour-row:last-child { border-bottom: none; }
        .hour-badge { font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: rgba(29,185,84,0.15); color: #1db954; border: 1px solid rgba(29,185,84,0.25); }
        .hour-badge.closed { background: rgba(255,100,100,0.12); color: #ff6464; border-color: rgba(255,100,100,0.2); }
        .footer-form-group { margin-bottom: 10px; }
        .footer-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 8px 12px; color: #e0e0e0; font-size: 0.83rem; outline: none; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; resize: none; box-sizing: border-box; }
        .footer-input::placeholder { color: #556; }
        .footer-input:focus { border-color: #ff7e5f; box-shadow: 0 0 0 3px rgba(255,126,95,0.12); }
        .footer-submit-btn { width: 100%; padding: 9px; background: linear-gradient(90deg,#ff7e5f,#feb47b); border: none; border-radius: 10px; color: #fff; font-weight: 700; font-size: 0.88rem; cursor: pointer; letter-spacing: 0.3px; transition: transform 0.2s, box-shadow 0.2s; font-family: inherit; }
        .footer-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,126,95,0.4); }
        .footer-sent-msg { text-align: center; color: #1db954; font-weight: 700; font-size: 0.88rem; padding: 10px; background: rgba(29,185,84,0.1); border-radius: 10px; border: 1px solid rgba(29,185,84,0.2); }
        .footer-middle { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 16px 60px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        @media (max-width: 768px) { .footer-middle { padding: 14px 28px; } }
        .footer-trust-pill { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 30px; padding: 6px 14px; font-size: 0.78rem; color: #8899aa; font-weight: 600; }
        .footer-trust-pill span:first-child { font-size: 0.95rem; }
        .footer-bottom { padding: 12px 60px; background: rgba(0,0,0,0.25); }
        @media (max-width: 768px) { .footer-bottom { padding: 12px 28px; } }
        .footer-bottom-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-copyright { font-size: 0.8rem; color: #556; }
        .footer-copyright strong { color: #feb47b; }
        .footer-legal-links { display: flex; gap: 20px; }
        .footer-legal-link { font-size: 0.76rem; color: #556; text-decoration: none; transition: color 0.2s; }
        .footer-legal-link:hover { color: #feb47b; }
        .footer-glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; opacity: 0.07; }
        .orb-1 { width: 400px; height: 400px; background: #ff7e5f; top: -100px; right: -50px; }
        .orb-2 { width: 300px; height: 300px; background: #feb47b; bottom: -80px; left: 10%; }
      `}</style>
      {/* CAROUSEL */}
      <section className="row">
        <div className="col-12">
          <div
            id="mycarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-indicators">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#mycarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                />
              ))}
            </div>
            <div className="carousel-inner">
              <div
                className="carousel-item active"
                onClick={() =>
                  products.length > 0 &&
                  handleNav("/makepayment", { state: { product: products[0] } })
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/images2/firstcar.png"
                  className="carousel-slide img"
                  alt="slide1"
                />
                <div className="carousel-caption colourful-caption">
                  <span className="badge bg-warning text-dark mb-2">
                    🔥 Special Offer Available
                  </span>
                  <h1>WELCOME TO Urban Loom</h1>
                  <p>
                    Your trusted destination for affordable and classic clothes.
                  </p>
                  <p className="features">
                    ✔ | ✔ Affordable Prices | ✔ Trusted Quality
                  </p>
                  <div className="carousel-btn-group">
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        products.length > 0 && addToCart(products[0]);
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        products.length === 0 && handleNav("/addproduct")
                        products.length > 0 &&
                          handleNav("/makepayment", {
                            state: { product: products[0] },
                          });
                      }}
                      
                      
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="carousel-item"
                onClick={() => handleNav("/addproduct")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/images2/seccar.png"
                  className="d-block w-100 carousel-img"
                  alt="slide2"
                />
                <div className="carousel-caption colourful-caption">
                  <h1>Want to sell clothes?</h1>
                  <p>Add your product quickly and reach thousands of buyers.</p>
                  <p className="features">
                    ➕ Add Product | ⚙ Easy Upload | 🛠 Secure Listing
                  </p>
                  <div className="carousel-btn-group">
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNav("/addproduct");
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="carousel-item"
                onClick={() =>
                  document
                    .getElementById("products-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/images2/thirdcar.png"
                  className="carousel-slide img"
                  alt="slide3"
                />
                <div className="carousel-caption colourful-caption">
                  <h1>Secure & Easy Payment</h1>
                  <p>Pay quickly and safely for the parts you need.</p>
                  <p className="features">
                    💳 Multiple Payment Options | 🔒 Safe & Reliable
                  </p>
                  <div className="carousel-btn-group">
                    <button
                      className="btn btn-outline-light"
                      onClick={(e) => {
                        e.stopPropagation();
                        document
                          .getElementById("products-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      View Catalog
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="carousel-item"
                onClick={() => handleNav("/signin")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/images2/lastcar.png"
                  className="d-block w-100 carousel-img"
                  alt="slide4"
                />
                <div className="carousel-caption colourful-caption">
                  <h1>Join Urban Loom</h1>
                  <p>Sign in or sign up to start buying or selling today.</p>
                  <p className="features">
                    🔐 Sign In | 📝 Sign Up | ⭐ Trusted Community
                  </p>
                  <div className="carousel-btn-group">
                    <button
                      className="btn btn-outline-light"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNav("/signin");
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNav("/signup");
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </div>
      </section>
      {/* TRUST BAR */}
      <div className="">
        <div className="trust-bar">
          {[
            { icon: "🔒", label: "Secure Payments" },
            { icon: "🚚", label: "Fast Delivery Nationwide" },
            { icon: "✅", label: "100% Genuine" },
            { icon: "🔄", label: "Easy Returns" },
            { icon: "📞", label: "24/7 Support" },
          ].map(({ icon, label }) => (
            <div key={label} className="trust-item">
              <span className="trust-icon">{icon}</span> {label}
            </div>
          ))}
        </div>
      </div>
      {/* SEARCH BAR */}
      <div className="search-section">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by clothe name or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            on
            onKeyDown={(e) => e.key === "Escape" && setSearch("")}
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
              title="Clear"
            >
              ✕
            </button>
          )}
          <button className="search-btn">Search</button>
        </div>
        <p className="search-meta">
          {search ? (
            <>
              <b>{filteredProducts.length}</b> result
              {filteredProducts.length !== 1 ? "s" : ""} for "<b>{search}</b>"
            </>
          ) : (
            <>
              <b>{products.length}</b> products available — search to find what
              you need
            </>
          )}
        </p>

        {/* FIX 3: TAGS use { label, query } — short keyword for matching, label for display */}
        <div className="tag-row">
          <button
            className={`tag ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          <button
            className={`tag ${selectedCategory === "Ladies Wear" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Ladies Wear")}
          >
            Ladies Wear
          </button>

          <button
            className={`tag ${selectedCategory === "Mens Wear" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Mens Wear")}
          >
            Mens Wear
          </button>

          <button
            className={`tag ${selectedCategory === "Kids Wear" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Kids Wear")}
          >
            Kids Wear
          </button>

          <button
            className={`tag ${selectedCategory === "Accessories" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Accessories")}
          >
            Accessories
          </button>
          <button
            className={`tag ${selectedCategory === "Shoes" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Shoes")}
          >
            Shoes
          </button>
        </div>
      </div>
      {/* PRODUCTS SECTION */}
      <div id="products-section" style={{ padding: "40px 30px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h3 className="section-title">
            {search
              ? `Results for "${search}"`
              : "🔥 Available Clothes — Best Prices"}
          </h3>
          <p className="section-sub">
            {search
              ? `Showing ${filteredProducts.length} matching product${filteredProducts.length !== 1 ? "s" : ""}`
              : "Genuine clothes and accessories at affordable prices. Contact us for more information on any product."}
          </p>
        </div>

        {loading && <h4 className="text-info text-center mb-3">{loading}</h4>}
        {error && <h4 className="text-danger text-center mb-3">{error}</h4>}

        {!loading && search && filteredProducts.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h4>No results for "{search}"</h4>
            <p>Try a different keyword </p>
            <button className="no-results-btn" onClick={() => setSearch("")}>
              ← Browse All Products
            </button>
          </div>
        )}

        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div
              className="product-card"
              key={product.id || index}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="product_img">
                <span className="badge-hot">✅ In Stock</span>
                <img
                  src={IMG_URL + product.product_photo}
                  alt={product.product_name}
                  className="product-card img"
                />
                <div className="img-overlay">
                  <button
                    className="overlay-btn"
                    style={{ background: "#fff", color: "#ff4500" }}
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    className="overlay-btn"
                    style={{
                      background: "linear-gradient(90deg,#ff7e5f,#feb47b)",
                      color: "#fff",
                    }}
                    onClick={() =>
                      handleNav("/makepayment", { state: { product } })
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
              <div className="card-body-inner">
                <p className="product-name">
                  {highlight(product.product_name)}
                </p>
                <p className="product-desc">
                  {highlight(product.product_description)}
                </p>
                <div className="price-row">
                  <span className="price">
                    Ksh {Number(product.product_cost).toLocaleString()}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    className="btn-buy"
                    onClick={() =>
                      handleNav("/makepayment", { state: { product } })
                    }
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn-cart"
                    onClick={() => addToCart(product)}
                    title="Add to Cart"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FLOATING CART BUTTON */}
      {cartCount > 0 && (
        <button
          onClick={() => {
            setCartOpen(true);
          }}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 7000,
            background: "linear-gradient(135deg,#ff7e5f,#feb47b)",
            border: "none",
            borderRadius: 50,
            color: "#fff",
            padding: "14px 22px",
            fontWeight: 800,
            fontSize: "1rem",
            boxShadow: "0 8px 30px rgba(255,126,95,0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            animation: "slideInRight 0.4s ease",
          }}
        >
          🛒 Cart
          <span
            style={{
              background: "#fff",
              color: "#ff4500",
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.85rem",
              fontWeight: 900,
            }}
          >
            {cartCount}
          </span>
        </button>
      )}
      {/* CHAT TOGGLE BUTTON */}
      <button
        onClick={() => setChatOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 28,
          left: 28,
          zIndex: 7000,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#ff7e5f,#feb47b)",
          border: "none",
          color: "#fff",
          fontSize: 26,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(255,126,95,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
        title="Chat with us"
      >
        {chatOpen ? "✕" : "💬"}
      </button>
      {/* CHAT BOX */}
      
      {chatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>

            <div className="chat-header-info">
              <p className="chat-title">FitSpare Assistant</p>
              <p className="chat-status">● Online — Replies instantly</p>
            </div>

            <button
              onClick={() => setChatMessages(INITIAL_CHAT)}
              className="chat-clear-btn"
            >
              Clear
            </button>
          </div>

          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.role === "user"
                    ? "chat-message-user"
                    : "chat-message-assistant"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="chat-message-avatar">🤖</div>
                )}

                <div
                  className={
                    msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-message-avatar">🤖</div>

                <div className="chat-bubble-bot chat-typing">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      className="chat-dot"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          <div className="chat-quick-questions">
            <button
              className={`chat-chip ${
                selectedCategory === "All" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("All")}
            >
              All Products
            </button>

            <button
              className={`chat-chip ${
                selectedCategory === "Shoes" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Shoes")}
            >
              👟 Shoes
            </button>

            <button
              className={`chat-chip ${
                selectedCategory === "Mens Wear" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Mens wear")}
            >
              👕 Mens Wear
            </button>

            <button
              className={`chat-chip ${
                selectedCategory === "Accessories" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Accessories")}
            >
              👜 Accessories
            </button>

            <button
              className={`chat-chip ${
                selectedCategory === "Ladies Wear" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Ladies Wear")}
            >
              👚Ladies Wear
            </button>
             <button
              className={`chat-chip ${
                selectedCategory === "Kids Wear" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Kids Wear")}
            >
             🧒Kids Wear
            </button>
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
              placeholder="Type your message…"
              className="chat-input"
            />

            <button
              onClick={sendChatMessage}
              disabled={chatLoading}
              className={`chat-send-btn ${chatLoading ? "loading" : ""}`}
            >
              ➤
            </button>
          </div>
        </div>
      )}
      
      {/* Fashion Brands MARQUEE */}
      <div className="brands-marquee-section">
        <div className="brands-marquee-fade-right" />
        <div className="brands-marquee-track">
          {marqueeItems.map((brand, i) => (
            <span key={i} className="brand-pill">
              <span className="brand-flag">{brand.flag}</span>
              {brand.name}
              <span className="brand-dot" />
            </span>
          ))}
        </div>
      </div>
      {/* FOOTER */}
      <footer className="fitspare-footer mt-auto">
        <div className="footer-glow-orb orb-1" />
        <div className="footer-glow-orb orb-2" />

        <div className="footer-top">
          <div>
            <img
              src="/images2/shoppingbag.jpeg"
              alt="Urban Loom Logo"
              className="footer-brand-logo"
            />
            <div className="footer-brand-name">Urban Loom</div>
            <p className="footer-brand-desc">
              Kenya's most trusted destination for genuine and affordable
              clothes and accessories.
            </p>
            <div className="col-md-3 text-center mb-4">
              <h4>Stay Connected</h4>
              <p style={{ textAlign: "center" }}>
                Follow us on social media for updates, offers, and tips!
              </p>
              <div className="d-flex justify-content-center gap-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/images2/faba.jpeg"
                    alt="Facebook"
                    width="40"
                    height="40"
                  />
                </a>
                <a href="https://wa.me/" target="_blank" rel="noreferrer">
                  <img
                    src="/images2/wats.jpg"
                    alt="WhatsApp"
                    width="40"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/images2/insta.jpeg"
                    alt="Instagram"
                    width="40"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/images2/linked.jpeg"
                    alt="LinkedIn"
                    width="40"
                    height="40"
                  />
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "Home", path: "/" },
                { label: "Add Product", path: "/addproduct" },
                { label: "Sign Up", path: "/signup" },
                { label: "Sign In", path: "/signin" },
                { label: "About Us", path: "/aboutus" },
                { label: "Location", path: "/location" },
              ].map(({ label, path }) => (
                <Link key={label} to={path} className="footer-link">
                  <span className="footer-link-arrow">▶</span>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Contact Us</div>
            {[
              { icon: "📞", label: "Phone / WhatsApp", value: "0746 953592" },
              {
                icon: "📧",
                label: "Email",
                value: "kyalobenedict960@gmail.com",
              },
              { icon: "📍", label: "Location", value: "Nakuru, Kenya" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="footer-contact-item">
                <div className="footer-contact-icon">{icon}</div>
                <div className="footer-contact-text">
                  <strong>{label}</strong>
                  {value}
                </div>
              </div>
            ))}

            <div className="footer-col-title" style={{ marginTop: 14 }}>
              Business Hours
            </div>
            <div className="footer-hours">
              <div className="footer-hour-row">
                <span>Mon – Sat</span>
                <span className="hour-badge">8:00am – 6:00pm</span>
              </div>
              <div className="footer-hour-row">
                <span>Sunday</span>
                <span className="hour-badge">10:00am – 4:00pm</span>
              </div>
              <div className="footer-hour-row">
                <span>Public Holidays</span>
                <span className="hour-badge closed">May vary</span>
              </div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Send a Message</div>
            {footerSent ? (
              <div className="footer-sent-msg">
                ✅ Message sent! We'll get back to you shortly.
              </div>
            ) : (
              <div>
                <div className="footer-form-group">
                  <input
                    type="email"
                    className="footer-input"
                    placeholder="Your email address"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                  />
                </div>
                <div className="footer-form-group">
                  <textarea
                    className="footer-input"
                    rows="3"
                    placeholder="Your message or inquiry…"
                    value={footerComment}
                    onChange={(e) => setFooterComment(e.target.value)}
                  />
                </div>
                <button
                  className="footer-submit-btn"
                  onClick={handleFooterSubmit}
                  type="button"
                >
                  Send Message ✉️
                </button>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <div className="footer-col-title">Trusted Brands</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  "Hillcrest clothing limited",
                  "Budgetwear",
                  "Palm Angels",
                  "Max Fashion",
                  "Woolworth",
                  "African Inspired",
                ].map((b) => (
                  <span
                    key={b}
                    style={{
                      background: "rgba(255,126,95,0.1)",
                      border: "1px solid rgba(255,126,95,0.2)",
                      borderRadius: 20,
                      padding: "3px 10px",
                      fontSize: "0.72rem",
                      color: "#feb47b",
                      fontWeight: 600,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          {[
            { icon: "🔒", text: "Secure Payments" },
            { icon: "✅", text: "100% Genuine" },
            { icon: "🚚", text: "Nationwide Delivery" },
            { icon: "🔄", text: "7-Day Easy Returns" },
            { icon: "⭐", text: "Trusted by Thousands" },
          ].map(({ icon, text }) => (
            <div key={text} className="footer-trust-pill">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="footer-copyright" style={{ margin: 0 }}>
              © 2026 <strong>Urban Loom</strong>. All rights reserved. Developed
              by <strong>Ben </strong>.
            </p>
            <div className="footer-legal-links">
              <a href="/" className="footer-legal-link">
                Privacy Policy
              </a>
              <a href="/" className="footer-legal-link">
                Terms of Service
              </a>
              <a href="/" className="footer-legal-link">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GetProducts;
