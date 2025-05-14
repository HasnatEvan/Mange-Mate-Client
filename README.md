# 🏢 Asset Management System - XYZ Company

Welcome to **Asset Management System**, a MERN stack-based web application developed for the XYZ company to help businesses manage their assets and products efficiently. This software is designed especially for **HR Managers** and **Employees** to handle asset requests, approvals, and tracking with ease.

## 🔗 Live Website
👉 [Visit Live Site](https://mange-mate-8df61.web.app)

## 📁 GitHub Repositories
- **Client Side**: [GitHub Repo (Client)](https://github.com/HasnatEvan/Mange-Mate-Client)
- **Server Side**: [GitHub Repo (Server)](https://github.com/HasnatEvan/Mange-Mate-Server)

## 🛂 Admin Login Info
- **HR Email**: hrmanager@xyz.com
- **HR Password**: Hr@12345

## 🚀 Technologies Used
- React + Vite
- Tailwind CSS
- Node.js & Express.js
- MongoDB (with Mongoose)
- Firebase Authentication
- TanStack Query
- React Router DOM
- React Hook Form
- JWT (JSON Web Token)
- React PDF
- React Helmet
- SweetAlert2 / React Hot Toast

---

## ✅ Key Features

1. **Two User Roles**: HR Managers and Normal Employees with different dashboards and permissions.
2. **Subscription System**: HRs must purchase packages (5, 10, or 20 employees) to manage team members.
3. **Dynamic Navbar**: Based on user role and authentication status.
4. **Fully Responsive UI**: Optimized for desktop, tablet, and mobile devices.
5. **Employee Asset Request System**: Request, cancel, return, and print approval details.
6. **Asset Management for HR**: Add, update, delete, filter, search and sort assets.
7. **Team Management**: HR can view, add, and remove employees from the team. Bulk member addition supported.
8. **Protected Routes with JWT**: User stays logged in even after page reload.
9. **TanStack Query Integration**: Used in all GET data fetching for performance and caching.
10. **Print Functionality with React-PDF**: HR & Employee can print approved asset info with company branding.
11. **Social Login Support**: Login/signup using Google and/or GitHub.
12. **Environment Variables Used**: Firebase and MongoDB credentials hidden via `.env` file.
13. **Server-side Search and Filters**: Implemented for better performance and scalability.
14. **Custom Alerts & Toasts**: No browser alerts used — all notifications via SweetAlert or React Hot Toast.

---

## 📃 Pages Overview

### 🔐 Authentication Pages
- **Join as Employee**
- **Join as HR Manager** (with payment after signup)
- **Login Page** (with social login)

### 🏠 Home Page
- Public: Banner, About, Package cards
- Logged-in Employee: My Requests, Monthly Requests, Extra Sections
- Logged-in HR: Pending Requests, Top Assets, Limited Stock Chart, Pie Chart, Extra Sections

### 👩‍💼 HR Manager Pages
- Add Asset
- Asset List (Filter, Sort, Search)
- All Requests (Approve/Reject)
- My Employee List (Remove)
- Add Employee (Bulk Add, Payment if limit reached)
- Profile

### 👨‍💻 Employee Pages
- My Assets (Search, Filter, Return, Print)
- Request an Asset (Modal with note, search/filter)
- My Team
- Profile

---

## 💳 Subscription Packages
- 🧑 5 Members — $5
- 👨‍👩‍👧‍👦 10 Members — $8
- 🧑‍🤝‍🧑 20 Members — $15

Users are redirected to payment page after selecting package.

---

## 📝 Notes
- JWT tokens stored in localStorage for secure persistent login.
- All data fetch via **TanStack Query** (GET only).
- Pagination implemented in all tables (10 items per page).
- Asset Return system increases quantity and disables the button.
- Helmet used for dynamic page titles.
- Used **React Select** for dropdowns.

---

## 🧪 Bonus Implementations
- Axios Interceptors
- TanStack Pagination
- React Helmet SEO Integration
- Modular & Clean Code Structure

---



## 📞 Contact
For any issues or suggestions, feel free to raise an issue on the repository or contact the developer at: **hasnatevan59@gmail.com**

---

🎉 **Thank you for visiting Asset Management System!**
