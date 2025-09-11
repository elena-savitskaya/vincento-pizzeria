# 🌐 Vincento Pizza

Vincento Pizza - Full-stack pizza ordering app built with Next.js 15, MongoDB/Prisma, and PostgreSQL (Neon). Implements product browsing, ingredient selection, and a dynamic cart system. Built responsive UI with Tailwind CSS, using Radix UI components and Zustand for local state management.

## 📋 Project Overview

Vincento Pizza allows users to:
- Browse pizza products with ingredients and prices.
- Add products to cart and manage quantities.
- Search for products by name or ingredients.
- View product details.
- Manage cart via API endpoints.

## 🧠 Key Features
- 🛒 Dynamic shopping cart with add, update, delete functionality
- 🔍 Product search and filtering
- 🍕 Product detail pages with ingredient info
- 💾 Local state management via Zustand
- 🔑 Secure backend interactions with REST API routes
- 🌙 Dark mode support with next-themes
- 💬 Toast notifications using react-toastify

## 🛠️ Tech Stack
### Frontend:
- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS (+ tailwind-merge, clsx)**
- **Radix UI components (Checkbox, Dialog, Popover, Dropdown Menu)**
- **Lucide Icons**
- **react-toastify for notifications**
- **React Use utilities**

### Backend:
- **PostgreSQL (Neon) with Prisma ORM**
- **REST API routes in Next.js App Router**

## Installation & Setup

Follow the steps below to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/elena-savitskaya/vincento-pizza.git
```

cd vincento-pizza

### 2. Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

### 3. Setup Environment Variables
Create a .env.local file with:

- DATABASE_URL=your_database_url
- NEXT_PUBLIC_API_URL=your_public_api_url

### 4. Run the app

To start the development server with Hot Module Replacement (HMR), run:

```bash
npm run dev
```
