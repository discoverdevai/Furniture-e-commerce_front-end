import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store";

import { SignIn } from "./screens/SignIn/SignIn";
import { Register } from "./screens/Register/Register";
import { ForgotPassword } from "./screens/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./screens/ResetPassword/ResetPassword";
import { HeroUIProvider } from "@heroui/react";
import { Home } from "./screens/Home/Home";
import { Blogs } from "./screens/Blogs/Blogs";
import { Stores } from "./screens/Stores/Stores";
import { TryAtHome } from "./screens/TryAtHome/TryAtHome";
import { BestSelling } from "./screens/BestSelling/BestSelling";
import { AboutUs } from "./screens/AboutUs/AboutUs";
import { ContactUs } from "./screens/ContactUs/ContactUs";
import { BlogDetails } from "./screens/BlogDetails/BlogDetails";
import { OffersScreen } from "./screens/Offers/AllOffers";
import "./i18n";
import { ProductDetails } from "./screens/ProductDetails/ProductDetails";
import { BuyerProfile } from "./screens/BuyerProfile/BuyerProfile/BuyerProfile";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/offers" element={<OffersScreen />} />
            <Route path="/blog" element={<BlogDetails />} />
            <Route path="*" element={<Home />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/try-at-home" element={<TryAtHome />} />
            <Route path="/best-selling" element={<BestSelling />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/profile" element={<BuyerProfile />} />
          </Routes>
        </Router>
      </HeroUIProvider>
    </Provider>
  </StrictMode>
);
