# 🏨 EasyRest
**A seamless, full-stack lodging and hospitality management platform.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📖 Overview
**EasyRest** is a robust web application designed to simplify the process of discovering and booking accommodations. Built with a focus on responsiveness and user experience, it allows users to browse listings, manage bookings, and navigate through various categories with ease.

## 🚀 Features
* **Dynamic UI:** Fully responsive design across mobile, tablet, and desktop views.
* **CRUD Operations:** Create, Read, Update, and Delete listings with ease.
* **Authentication & Authorization:** Secure user access and permission-based routing.
* **MVC Architecture:** Clean and scalable folder structure for maintainable code.
* **Advanced Filtering:** Interactive horizontal filter scroll and off-canvas navigation for a modern feel.
* **Cloud Integration:** Optimized configuration for cloud-based storage and deployment.

---

## 🛠️ Tech Stack
* **Frontend:** EJS (Embedded JavaScript Templates), CSS3, JavaScript (ES6+).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose (ODM).
* **Security:** Middleware-driven validation and authentication.

---

## 📁 Project Structure
*Organized according to repository architecture as seen in c8ec6edb-3112-4093-a3a6-61924e37455c and 945d651c-aad3-427c-b289-12e9c9b6e809:*
```text
EasyRest/
├── controllers/    # Business logic for routes
├── init/           # Data initialization scripts
├── models/         # Mongoose schemas & data models
├── public/         # Static assets (CSS, JS, Images)
├── routes/         # Express route definitions
├── utils/          # Helper functions & utilities
├── views/          # EJS templates
├── app.js          # Main entry point
├── cloudConfig.js  # Cloud service configuration
├── middleware.js   # Custom authentication & validation logic
└── schema.js       # Data validation schemas
