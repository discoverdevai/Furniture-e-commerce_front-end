import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { StarIcon } from "lucide-react";

export const GlobalProductCard = ({
  id,
  title,
  description,
  shop,
  price,
  oldPrice,
  image,
  rating,
  saleImage,
  isOnSale,
  isInWishlist = false,
  onToggleWishlist,
  onAddToCart,
  disabled = false,
  stock = 0, // ✅ stock prop
  isRTL = false, // for text alignment
}) => {
  const [wish, setWish] = useState(isInWishlist);

  useEffect(() => {
    setWish(isInWishlist);
  }, [isInWishlist]);

  const handleWishlistClick = () => {
    const newValue = !wish;
    setWish(newValue);
    onToggleWishlist(id, newValue);
  };

  const handleAddToCartClick = () => {
    if (!disabled && onAddToCart) {
      onAddToCart(id);
    }
  };

  const isOutOfStock = stock === 0;

  return (
    <div
      key={id}
      className="relative flex flex-col justify-between w-[240px] sm:w-[282px] flex-shrink-0 rounded-[16px] border border-solid border-[#c3c3c3] sm:rounded-3xl overflow-hidden bg-white snap-center"
    >
      {/* Out of stock overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.3px] z-10 flex items-center justify-center text-center p-4">
          <span className="text-[#683800] font-bold text-sm sm:text-xl [font-family:'Cairo',Helvetica]">
            {isRTL ? "نفذت الكمية" : "Out of Stock"}
          </span>
        </div>
      )}

      {/* Image */}
      <div
        className={`relative w-full h-[160px] sm:h-[271px] rounded-t-[16px] overflow-hidden ${
          isOutOfStock ? "blur-[0.3px]" : ""
        }`}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt={title}
          src={image}
        />

        {/* Wishlist */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-3 flex justify-end z-20">
          <Button
            onClick={handleWishlistClick}
            variant="ghost"
            size="icon"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d]"
          >
            <img
              src={wish ? "/heart-red.svg" : "/heart-empty.svg"}
              alt="wishlist"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </Button>
        </div>

        {isOnSale && (
          <img
            className="absolute top-[90px] sm:top-[127px] left-1/2 -translate-x-1/2 w-[120px] sm:w-[194px] h-24 sm:h-36 object-cover"
            alt="Sale animation"
            src={saleImage}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col items-start gap-1 sm:gap-2 p-2 sm:p-4 flex-grow ${
          isOutOfStock ? "blur-[0.3px]" : ""
        }`}
      >
        <div className="w-full flex flex-col gap-1 sm:gap-3">
          <div className="flex">
            <div className="font-medium text-[#292929] text-xs sm:text-sm [font-family:'Cairo',Helvetica]">
              {shop}
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="font-bold text-[#1a1713] text-xs sm:text-base [font-family:'Cairo',Helvetica]">
              {title}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <StarIcon className="w-4 h-4 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
              <div className="font-bold text-[#1a1713] text-xs sm:text-base leading-4">
                {rating}
              </div>
            </div>
          </div>

          <div className="text-[#292929] text-xs sm:text-base leading-5 [font-family:'Cairo',Helvetica]">
            {description}
          </div>
        </div>
      </div>

      {/* Price & Cart */}
      <div className={`mt-auto w-full ${isOutOfStock ? "blur-[0.3px]" : ""}`}>
        <div className="w-full h-10 sm:h-14 bg-[#ffffff80] flex items-center justify-between px-2 sm:px-3 rounded-b-[16px] sm:rounded-b-[24px]">
          <div className="flex flex-col items-end gap-0 sm:gap-1">
            <div className="font-bold text-[#835f40] text-sm sm:text-lg">
              {price} <span className="font-medium">ر.س</span>
            </div>
            {isOnSale && (
              <div className="text-[#1a1713] text-[10px] sm:text-xs line-through">
                {oldPrice} ر.س
              </div>
            )}
          </div>

          <Button
            onClick={handleAddToCartClick}
            disabled={disabled || isOutOfStock} // disable if out of stock
            className={`group relative flex items-center justify-center rounded-[50px] overflow-hidden transition-all duration-500 ease-in-out p-2 
             ${
               disabled || isOutOfStock
                 ? "bg-[#ffffff60] cursor-not-allowed opacity-60"
                 : "bg-[#ffffff80] hover:bg-[#ffffffa0]"
             }`}
            style={{ width: "fit-content" }}
          >
            <div className="flex items-center justify-center transition-all duration-500 ease-in-out">
              <img
                src="/cart.svg"
                alt="cart"
                className={`w-4 h-4 sm:w-6 sm:h-6 text-[#835f40] transition-transform duration-500 
               ${
                 disabled || isOutOfStock
                   ? "grayscale opacity-50"
                   : "group-hover:translate-x-[-4px]"
               } `}
              />
              <span
                className={`max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out text-[#835f40] font-bold text-xs sm:text-base whitespace-nowrap [font-family:'Cairo',Helvetica] ml-0 group-hover:ml-2
               ${
                 disabled || isOutOfStock
                   ? "opacity-50 group-hover:opacity-50"
                   : ""
               }`}
              >
                {isOutOfStock
                  ? isRTL
                    ? "نفدت الكمية"
                    : "Out of Stock"
                  : "اشتري الآن"}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
