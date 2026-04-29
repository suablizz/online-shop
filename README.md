# 🛒 Kigali Tech Store

![Kigali Tech Store](https://via.placeholder.com/1200x600/00A1DE/FAD201?text=Kigali+Tech+Store)

Full-featured **e-commerce SPA** for Rwanda's tech enthusiasts. Built with **Vue 3**, **Pinia**, **Vue Router**, **Tailwind CSS**, and **FakeStore API**.

## ✨ Features

✅ **Product Catalog** - Browse/filter by category, price, rating  
✅ **Shopping Cart** - Add/remove/update quantities, localStorage sync  
✅ **Wishlist** - Save/remove items, move to cart  
✅ **Authentication** - Login/Register (mock JWT), profile management  
✅ **Checkout** - Address forms, order summary, mock payments  
✅ **Order History** - Track past orders (localStorage)  
✅ **Responsive Design** - Mobile-first, Rwanda flag colors  
✅ **Performance** - Lazy loading, optimized images  
✅ **Accessibility** - ARIA labels, keyboard navigation  

## 🚀 Quick Start

```bash
cd l3sod
npm install
npm run dev
```

**Live Preview**: [http://localhost:5173](http://localhost:5173)

## 📱 Demo Features

| Feature | Route | Status |
|---------|-------|--------|
| Home | `/` | ✅ Featured products + categories |
| Products | `/products` | ✅ Filters, search, pagination ready |
| Product Detail | `/products/:id` | ✅ Gallery, cart/wishlist actions |
| Cart | `/cart` | ✅ Quantity controls, order summary |
| Wishlist | `/wishlist` | ✅ Move to cart, remove |
| Checkout | `/checkout` | ✅ Form + mock payment |
| Profile | `/profile` | ✅ Edit info, order history |
| Auth | `/login`, `/register` | ✅ Mock JWT auth |

## 🏗️ Tech Stack

```
Frontend: Vue 3 (Composition API) + Vite + Pinia + Vue Router
Styling: Tailwind CSS 4 + Custom Rwanda theme
API: FakeStore API (https://fakestoreapi.com)
Persistence: localStorage (cart/wishlist/orders/auth)
Payments: Stripe Elements ready (mock mode)
```

## 🎨 Design System

**Rwanda Flag Colors**:
```css
--rwanda-blue: #00A1DE    /* Primary */
--rwanda-yellow: #FAD201  /* Accent */
--rwanda-green: #20603D   /* Success */
```

## 🧪 Testing

App fully functional. Test these flows:

1. **Browse → Add to cart → Checkout** (guest)
2. **Register → Login → Profile → Orders**
3. **Products → Wishlist → Move to cart**
4. **Filters/Search** on products page
5. **Responsive** on mobile

## 📁 Project Structure

```
l3sod/
├── src/
│   ├── components/     # Reusable UI (ProductCard, Toast...)
│   ├── composables/    # Logic (useToast)
│   ├── stores/         # Pinia (cart, auth, products...)
│   ├── views/          # Pages (HomeView, CartView...)
│   ├── router/         # Vue Router config
│   └── services/       # API client
├── public/             # Static assets
└── README.md          # You're reading it!
```

## 🔧 Development

```bash
# Install & run
npm i
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Next Steps (Bonuses)

- [ ] Stripe live integration
- [ ] Admin dashboard (`/admin`)
- [ ] Real-time cart (Pinia + BroadcastChannel)
- [ ] PWA support
- [ ] Kinyarwanda i18n
- [ ] Image optimization + CDN

## 📊 Screenshots

**Home** | **Products** | **Cart**
---|---|---
![Home](https://via.placeholder.com/400x300/00A1DE/FFFFFF?text=Home) | ![Products](https://via.placeholder.com/400x300/FAD201/000000?text=Products) | ![Cart](https://via.placeholder.com/400x300/20603D/FFFFFF?text=Cart)

---

**Made with ❤️ in Kigali, Rwanda** 🇷🇼  
**Tech Stack**: Vue 3 ecosystem | Tailwind CSS | FakeStore API  
**Author**: BLACKBOXAI Assisted Development

⭐ **Star on GitHub** | 🚀 **Deploy to Vercel/Netlify**

