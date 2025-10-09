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
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import { Search } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const NAV_ITEMS = [
  "home",
  "products",
  "best_selling",
  "try_at_home",
  "blogs",
  "about_us",
  "contact_us",
];

export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");

  const toggleDrawer = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(16px)",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        borderRadius: isMobile ? "0px 0px 0px 0px" : "50px 50px 50px 50px",
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
          mx: 0,
          px: { xs: 2, sm: 3, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: isArabic ? "row" : "row-reverse",
        }}
      >
        {/* Logo + Hamburger Section */}
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
            sx={{
              color: "black",
              fontWeight: "bold",
            }}
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
          {NAV_ITEMS.map((key) => (
            <Button
              key={key}
              sx={{
                color: "black",
                fontWeight: 600,
                fontFamily: "Cairo",
                fontSize: "13px",
              }}
            >
              {t(key)}
            </Button>
          ))}
        </Box>
        {/* Icons Section */}
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            order: isArabic ? 3 : 1,
            flexDirection: "row-reverse",
            "& > :nth-of-type(1) ,& > :nth-of-type(2), & > :nth-of-type(3)": {
              display: { xs: "none", md: "inline-flex" },
            },

            "& .MuiIconButton-root": {
              p: 1, // smaller padding around icons
            },
          }}
        >
          {/* Language toggle icon */}
          <IconButton onClick={toggleLanguage} color="inherit">
            <LanguageIcon sx={{ color: "black", fontSize: 18 }} />
          </IconButton>
          <IconButton color="inherit">
            <PersonOutlineIcon sx={{ color: "black", fontSize: 18 }} />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteBorderOutlinedIcon sx={{ color: "black", fontSize: 18 }} />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingBagOutlinedIcon sx={{ color: "black", fontSize: 18 }} />
          </IconButton>
          <IconButton color="inherit">
            <Search size={18} color="black" />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer (side menu) */}
      <Drawer
        anchor={isArabic ? "right" : "left"}
        open={isOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: 250, bgcolor: "white" },
        }}
      >
        <List>
          {NAV_ITEMS.map((key) => (
            <ListItemButton key={key} onClick={toggleDrawer}>
              <ListItemText
                primary={t(key)}
                sx={{ textAlign: isArabic ? "right" : "left" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};
