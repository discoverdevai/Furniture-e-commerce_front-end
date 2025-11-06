import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store";
import { PageTitleHandler } from "./Utils/PageTitleHandler";
import { SignIn } from "./screens/SignIn/SignIn";
import { Register } from "./screens/Register/Register";
import { ForgotPassword } from "./screens/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./screens/ResetPassword/ResetPassword";
import { HeroUIProvider } from "@heroui/react";
import { Home } from "./screens/Home/Home";
import { Blogs } from "./screens/Blogs/Blogs";
import { Stores } from "./screens/Stores/Stores";
import { TryAtHome } from "./screens/TryAtHome/TryAtHome";
import { BestSellingScreen } from "./screens/BestSellingScreen/BestSellingScreen";
import { AboutUs } from "./screens/AboutUs/AboutUs";
import { ContactUs } from "./screens/ContactUs/ContactUs";
import { BlogDetails } from "./screens/BlogDetails/BlogDetails";
import { OffersScreen } from "./screens/Offers/AllOffers";
import { SearchDropdown } from "./screens/Search/Search";
import { MobileSearch } from "./screens/Search/MobileSearch";
import { RecentlyArrived } from "./screens/RecentlyArrived/RecentlyArrived";
import "./i18n";
import { ProductDetails } from "./screens/mainFlowScreens/ProductDetails/ProductDetails";
import { BuyerProfile } from "./screens/BuyerProfile/BuyerProfile/BuyerProfile";
import {BrandProdutsScreen} from "./screens/mainFlowScreens/BrandProductsScreen/BrandProdutsScreen"
import {CartScreen} from "./screens/mainFlowScreens/CartScreen/CartScreen"
import {OrderScreen} from  "./screens/mainFlowScreens/OrderScreen/OrderScreen"
import {OrderTrackingScreen} from  "./screens/mainFlowScreens/OrderTrackingScreen/OrderTrackingScreen"
import {PreviousOrdersScreen} from "./screens/mainFlowScreens/PreviousOrdersScreen/PreviousOrdersScreen"

import { BuyerOrders } from "./screens/BuyerProfile/BuyerOrders/BuyerOrders";
import { BuyerChangePassword } from "./screens/BuyerProfile/BuyerChangePassword/BuyerChangePassword";
import { BuyerWishList } from "./screens/BuyerProfile/BuyerWishList/BuyerWishList";
import { BuyerAddress } from "./screens/BuyerProfile/BuyerAddress/BuyerAddress";
import { Cart } from "./screens/Cart/Cart";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <Router>
          <PageTitleHandler />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/offers" element={<OffersScreen />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="*" element={<Home />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/try-at-home" element={<TryAtHome />} />
            <Route path="/best-selling" element={<BestSellingScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/search" element={<SearchDropdown />} />
            <Route path="/search2" element={<MobileSearch />} />
            <Route path="/recently-arrived" element={<RecentlyArrived />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/profile" element={<BuyerProfile />} />
            <Route path="/brand-product" element={<BrandProdutsScreen />} />
            <Route path="/cart-screen" element={<CartScreen />} />
            <Route path="/order-screen" element={<OrderScreen />} />
            <Route path="/order-tracking" element={<OrderTrackingScreen />} />
            <Route path="/previous-orders" element={<PreviousOrdersScreen />} />    


            <Route
              path="/profile/change-password"
              element={<BuyerChangePassword />}
            />
            <Route path="/profile/orders" element={<BuyerOrders />} />
            <Route path="/profile/saved-addresses" element={<BuyerAddress />} />
            <Route path="/profile/orders" element={<BuyerOrders />} />
            <Route path="/profile/favorites" element={<BuyerWishList />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
        </Router>
      </HeroUIProvider>
    </Provider>
  </StrictMode>
);
