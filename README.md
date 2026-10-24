# RAJI SNACKS — Premium Traditional E-Commerce & Admin Control Centre

A modern, responsive e-commerce web platform and operational admin control centre for **RAJI SNACKS**, an authentic South Indian traditional savoury brand.

---

## 🌟 Key Features

### 🛍️ Customer Storefront
- **Visual Brand Identity**: "Golden Harvest" theme featuring Deep Maroon (`#6D281B`), Harvest Gold (`#E9A52B`), and Warm Cream tones.
- **Snack Catalogue**: Filterable categories including *Murukku*, *Mixture*, and *Kara Sevu*.
- **Pack Size Selectors**: Dynamic pricing calculation across 200g, 400g, and 1kg packaging options.
- **Shopping Cart & Checkout**: Slide-out cart drawer, persistent local state, and complete checkout experience.
- **Product Highlights**: High-resolution authentic snack photography with ingredient and shelf-life information.

### ⚙️ Admin Operational Control Centre (`/admin`)
- **Dashboard Overview**: Summary KPI cards (Total Sales, Total Orders, Active Catalogue, Low-Stock alerts), Sales velocity charts, and Recent order queues.
- **Product Management**: Complete catalogue CRUD, image preview, pricing rules, pack sizes, threshold limits, and publication toggles.
- **Category Management**: Category hierarchy with dynamic product count badges and deletion safety protection.
- **Inventory & Stock Control**: Real-time warehouse tracking, adjustment modals (positive restock, negative write-offs, exact counts), reason logging, and stock movement audit trails.
- **Order Processing**: End-to-end fulfillment pipeline tracking (`Pending` → `Confirmed` → `Processing` → `Packed` → `Shipped` → `Delivered`), customer details, delivery addresses, and internal staff dispatch notes.
- **Customer Directory**: Buyer profiles, order purchase histories, lifetime spend (LTV), and average order values.
- **Performance & Sales Analytics**: Category sales share, top seller comparisons, revenue by payment channel, and basket sizes.
- **Reporting & CSV Export**: One-click formatted CSV downloads for orders, warehouse inventory, and customer lifetime ledgers.
- **Command Palette (`Ctrl+K`)**: Global search for products, orders, and customer accounts.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **Data Visualizations**: Recharts
- **State Management**: React Context with LocalStorage persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/MAHESHK-1634/raji-snacks.git

# Navigate to project folder
cd raji-snacks

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 📂 Project Architecture

```
src/
├── admin/                     # Admin Management Subsystem
│   ├── components/            # Layout, charts, modals, command palette
│   ├── context/               # AdminContext & synchronized state
│   ├── data/                  # Initial baseline mock dataset
│   ├── pages/                 # Dashboard, Products, Inventory, Orders, etc.
│   └── utils/                 # Formatters, calculations, CSV exporters
├── components/                # Storefront components (Navbar, Footer, Cart)
├── context/                   # Storefront Cart, Wishlist, Toast contexts
├── data/                      # Storefront catalogue data
├── pages/                     # Storefront pages (Home, Shop, Detail, Checkout)
├── App.jsx                    # Root routing configuration
└── main.jsx                   # React entry point
```

---

## 📄 License

Proprietary © RAJI SNACKS. All rights reserved.
