# Retail Inventory Manager

A full-stack inventory and billing management application built using React, Node.js, Express, and Supabase.

This project was developed to simplify product inventory management and invoice generation for small businesses and retail stores. Users can maintain their own inventory, generate GST invoices, track stock levels, and export professional PDF bills.

## Features

* User Authentication using Supabase
* Separate inventory for each user
* Add, delete and manage products
* Product Code, Manufacturing Date and Expiry Date support
* Low stock alerts
* GST invoice generation
* PDF bill export
* Dashboard with inventory statistics
* Dark/Light mode
* Responsive UI

## Tech Stack

### Frontend

* React.js
* Vite
* Framer Motion
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database & Authentication

* Supabase

### PDF Generation

* jsPDF
* jspdf-autotable



## Installation

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
SUPABASE_URL=https://muvxafwfxstdvhxavgdl.supabase.com
SUPABASE_KEY="sb_publishable_oKpQG_OmM0HfusYoGF_Y7g_6PRJLEIE";
PORT=5000
```

## Future Improvements

* Google Login
* Invoice History
* Sales Reports
* Barcode Scanner
* Email Invoice Sharing

## Author

Animesh Mishra

MCA Student | React Developer | Full Stack Enthusiast

GitHub: https://github.com/anni9901mish
