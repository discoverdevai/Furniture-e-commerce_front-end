import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./screens/SignIn/SignIn";
import { Register } from "./screens/Register/Register";
import { ForgotPassword } from "./screens/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./screens/ResetPassword/ResetPassword";
import { HeroUIProvider } from "@heroui/react";
import { Home} from "./screens/Home/Home";
import "./i18n";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HeroUIProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </HeroUIProvider>
  </StrictMode>
);
