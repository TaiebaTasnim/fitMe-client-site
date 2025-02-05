# FitMe - Your Personal Fitness Companion 💪

FitMe is a web platform for tracking workouts, booking trainers, and managing fitness goals. It features a user dashboard, trainer management, role-based access, secure authentication, online payments, and a responsive design.<br>

---

## 🚀 Features

- **User Authentication:** Secure login and signup via Firebase.
- **Fitness Tracking:** Log workouts and track progress.
- **Payment Integration:** Secure payments using Stripe.
- **Responsive UI:** Beautifully designed with TailwindCSS.
- **Interactive Charts:** Visual data representation with Recharts.
- **Real-time Updates:** Data synchronization via React Query.
- **Enhanced UX:** Modals, tooltips, and toast notifications.

## 🛠️ Technologies Used

- **Frontend:** React, React Router, Tailwind CSS
- **State Management:** React Query
- **Backend & Authentication:** Firebase
- **Payment Processing:** Stripe
- **UI Enhancements:** Headless UI, Heroicons, Animate.css, SweetAlert2
- **Charts & Visualization:** Recharts
- **Development Tools:** Vite, ESLint, PostCSS

## 📦 Dependencies

### Core Dependencies
```json
{
  "@headlessui/react": "^2.2.0",
  "@heroicons/react": "^2.2.0",
  "@material-tailwind/react": "^2.1.10",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.5"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.17.0",
  "postcss": "^8.5.1"
}
```

## 📌 Environment Variables

Create a `.env` file in the root directory and add:

```plaintext
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_AUTH_DOMAIN
VITE_projectId=YOUR_PROJECT_ID
VITE_storageBucket=YOUR_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_SENDER_ID
VITE_appId=YOUR_APP_ID
VITE_IMGBB_API_KEY=YOUR_IMGBB_KEY
VITE_Payment_Gateway_PK=YOUR_STRIPE_PUBLIC_KEY
```

> **⚠️ Note:** Never expose sensitive keys in public repositories.

## 🏗️ Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/TaiebaTasnim/fit-me.git
   cd fit-me
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file as mentioned above.

4. **Start the development server:**
   ```sh
   npm run dev
   ```

5. **Build for production (optional):**
   ```sh
   npm run build
   ```

## 🌍 Live Demo

Check out the live version: [Fit-Me Live](https://fit-me-b5e4a.web.app) 

**Admin Credentials:**  
- **Username:** admin@gmail.com  
- **Password:** Aa12345 




---


