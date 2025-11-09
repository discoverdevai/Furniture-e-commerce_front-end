import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchModal } from "../ui/SearchModal"; // adjust path if needed

// ===== Constants =====
const NAV_ITEMS = [
  "home",
  "stores",
  "best_selling",
  "try_at_home",
  "blogs",
  "about_us",
  "contact_us",
];
const DRAWER_EXTRA_ITEMS = [
  { key: "Drawer_profile", path: "/ProfileSettings" },
];
const PATHS = {
  home: "/home",
  stores: "/stores",
  best_selling: "/best-selling",
  try_at_home: "/try-at-home",
  blogs: "/blogs",
  about_us: "/about-us",
  contact_us: "/contact-us",
  profile: "/profile",
  search: "/search2", // 👈 mobile search page
};

export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setIsOpen(!isOpen);
  const toggleSearchModal = () => setIsSearchOpen(!isSearchOpen);

  const handleNavClick = (key) => {
    const to = PATHS[key] || "/";
    navigate(to);
  };
  const NavIconButton = ({ to, icon, activeIcon, alt }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if current path belongs to this section
    const isActive = location.pathname.startsWith(to);

    return (
      <IconButton onClick={() => navigate(to)} color="inherit">
        <img
          src={isActive ? activeIcon : icon}
          alt={alt}
          width={24}
          height={24}
        />
      </IconButton>
    );
  };

  const toggleLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  const handleSearchClick = () => {
    if (isMobile) {
      // 👇 navigate to dedicated mobile search page
      navigate(PATHS.search);
    } else {
      // 👇 open modal on desktop
      toggleSearchModal();
    }
  };

  return (
    <>
      {/* ===== Navbar ===== */}
      <AppBar
        position="static"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: isMobile ? "0px" : "50px",
          mt: 3,
          mx: "auto",
          width: isMobile ? "100%" : "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            px: { xs: 2, sm: 3, md: 5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: isArabic ? "row" : "row-reverse",
          }}
        >
          {/* ===== Logo + Hamburger ===== */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              order: isArabic ? 1 : 3,
            }}
          >
            <Typography
              variant="h6"
              onClick={() => navigate("/home")}
              sx={{ color: "black", fontWeight: "bold", cursor: "pointer" }}
            >
              Logo
            </Typography>

            {/* Hamburger (mobile only) */}
            <IconButton
              edge="end"
              onClick={toggleDrawer}
              sx={{
                display: { xs: "block", md: "none" },
                color: "black",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {/* Center section (Nav items) */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              justifyContent: "center",
              flexGrow: 1,
              order: 2,
              blur: 16,
              zindex: 1,
            }}
          >
            {NAV_ITEMS.map((key) => {
              const to = PATHS[key];
              const isActive = location.pathname === to;
              return (
                <Button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  sx={{
                    color: isActive ? "#835F40" : "black",
                    fontWeight: 600,
                    fontFamily: "Cairo",
                    fontSize: "13px",
                    position: "relative",
                    pb: "8px",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "0px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: isActive ? "12px" : "0px",
                      height: "4px",
                      borderRadius: "50px",
                      backgroundColor: "#835F40",
                      transition: "width 0.3s ease",
                    }, // give space for the underline
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  {t(key)}
                </Button>
              );
            })}
          </Box>
          {/* Icons Section */}
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              order: isArabic ? 3 : 1,
              flexDirection: "row-reverse",
              "& > :nth-of-type(1) ,& > :nth-of-type(2)": {
                display: { xs: "none", md: "inline-flex" },
              },

              "& .MuiIconButton-root": {
                p: 0.5, // smaller padding around icons
              },
            }}
          >
            {/* Language toggle icon */}
            <IconButton onClick={toggleLanguage} color="inherit">
              <img
                src="/global.svg"
                alt="language icon"
                width={24}
                height={24}
              />
            </IconButton>

            <NavIconButton
              to="/profile"
              icon="/profile.svg"
              activeIcon="/active-profile.svg"
              alt="Profile"
            />

            <NavIconButton
              to="/cart"
              icon="/bag-2.svg"
              activeIcon="/cart-active.svg"
              alt="cart"
            />

            {/* 👇 Search opens modal or full screen depending on size */}
            <IconButton onClick={handleSearchClick}>
              <img
                src="/search-normal.svg"
                alt="search"
                width={24}
                height={24}
              />
            </IconButton>
          </Box>
        </Toolbar>

        {/* ===== Drawer ===== */}
        <Drawer
          anchor={isArabic ? "right" : "left"}
          open={isOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: 250, bgcolor: "white" },
          }}
        >
          {/* Language button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 1,
              borderBottom: "1px solid #eee",
            }}
          >
            <Button
              variant="outlined"
              onClick={toggleLanguage}
              sx={{
                textTransform: "none",
                fontFamily: "Cairo",
                fontSize: "14px",
                fontWeight: 600,
                color: "black",
                borderColor: "black",
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              {isArabic ? "English" : "العربية"}
            </Button>
          </Box>

          {/* Drawer Nav Items */}
          <List>
            {NAV_ITEMS.map((key) => (
              <ListItemButton
                key={key}
                onClick={() => {
                  toggleDrawer();
                  handleNavClick(key);
                }}
              >
                <ListItemText
                  primary={t(key)}
                  sx={{ textAlign: isArabic ? "right" : "left" }}
                />
              </ListItemButton>
            ))}
            {DRAWER_EXTRA_ITEMS.map(({ key, path }) => (
              <ListItemButton
                key={key}
                onClick={() => {
                  navigate(path);
                  toggleDrawer();
                }}
              >
                <ListItemText
                  primary={t(key)}
                  sx={{
                    textAlign: isArabic ? "right" : "left",
                    fontFamily: "Cairo",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </AppBar>

      {/* ===== Search Modal (Desktop only) ===== */}
      <SearchModal open={isSearchOpen} onClose={toggleSearchModal} />
    </>
  );
};
