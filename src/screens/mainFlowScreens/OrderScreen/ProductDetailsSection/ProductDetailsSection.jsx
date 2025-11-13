import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const ProductDetailsSection = () => {
  const [cart, setCart] = useState(null);
  const [summaryItems, setSummaryItems] = useState([]);

  useEffect(() => {
    // Retrieve cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("orderData")) || null;
    if (storedCart) {
      const items = storedCart.items || [];
      setCart(storedCart);

      const totalProducts = items?.reduce(
  (sum, item) => sum + (item.quantity || 1),
  0
);
      const subtotal = items.reduce(
        (sum, p) => sum + p.price * (p.quantity || 1),
        0
      );

      const discount = storedCart.totals?.discount || 0;
      const tax = storedCart.totals?.tax || 0;
      const shipping = storedCart.totals?.shipping || 0;

      const summary = [
        { label: "عدد المنتجات :", value: totalProducts, currency: "" },
        { label: "السعر :", value: subtotal, currency: "ر.س" },
        { label: "الخصم :", value: discount, currency: "ر.س" },
        { label: "الضريبة :", value: tax, currency: "ر.س" },
        { label: "رسوم الشحن :", value: shipping, currency: "ر.س" },
      ];
      setSummaryItems(summary);
    }
  }, []);

  const total =
    summaryItems.reduce(
      (sum, item) =>
        sum + (item.label !== "عدد المنتجات :" ? Number(item.value) : 0),
      0
    ) || 0;

  // Only display the first product in this card (like your design)
  const firstProduct = cart?.items?.[0] || {};

  return (
    <section className="flex flex-col w-full max-w-sm items-start gap-6 mx-auto">
    <div className="flex flex-col w-full gap-4">
  {cart?.items?.map((item) => (
    <Card
      key={item.id}
      className="w-full rounded-[10px] border-[#c3c3c3]"
    >
      <CardContent className="flex items-start gap-3 p-3">
        <article className="flex w-full items-center gap-3">
          <img
            className="w-[122px] h-[124px] rounded-[10px] object-cover"
            alt={item.name || "منتج"}
            src={item.image || "/image 4.png"}
          />
          <div className="flex flex-col flex-1 items-start gap-3">
            <h2 className="self-stretch [font-family:'Cairo',Helvetica] font-medium text-[#1a1713] text-lg tracking-[0] leading-[27px]">
              {item.name || "منتج غير معروف"}
            </h2>

            <div className="inline-flex items-center justify-center gap-2">
              <div
                className="w-[22px] h-[22px] rounded-[11px] border border-solid border-[#1a1713]"
                style={{
                  backgroundColor: item.color || "#d9d9d9",
                }}
              />
              <div className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] whitespace-nowrap [font-style:var(--h-5-font-style)]">
                اللون :
              </div>
            </div>

            <div className="text-[#835f40] font-semibold">
              {item.quantity} × {item.price.toFixed(2)} ر.س
            </div>
          </div>
        </article>
      </CardContent>
    </Card>
  ))}
</div>

      <Card className="w-full bg-[#f2f2f2] rounded-[10px] border-0">
        <CardContent className="flex flex-col items-center justify-center gap-6 p-4">
          <div className="flex flex-col items-start gap-4 w-full">
            {summaryItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between w-full"
              >
                <div className="font-[number:var(--placeholder-font-weight)] text-[#1a1713] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] whitespace-nowrap font-placeholder tracking-[var(--placeholder-letter-spacing)] [font-style:var(--placeholder-font-style)]">
                  {item.label}
                </div>
                <div className="[font-family:'Cairo',Helvetica] font-normal text-[#1a1713] text-base text-left tracking-[0] leading-4 whitespace-nowrap">
                  <span className="font-semibold">{item.value} </span>
                  {item.currency && (
                    <span className="text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder [font-style:var(--placeholder-font-style)] font-[number:var(--placeholder-font-weight)] tracking-[var(--placeholder-letter-spacing)]">
                      {item.currency}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Separator className="w-full bg-[#1a1713] opacity-20" />

          <div className="flex items-center justify-between w-full">
            <div className="font-[number:var(--h4-medium-font-weight)] text-[#835f40] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] whitespace-nowrap font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [font-style:var(--h4-medium-font-style)]">
              الإجمالي :
            </div>
            <div className="font-normal text-[#835f40] text-xl text-left leading-5 whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-[0]">
              <span className="font-[number:var(--h4-medium-font-weight)] font-h4-medium [font-style:var(--h4-medium-font-style)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] text-[length:var(--h4-medium-font-size)]">
                {total}{" "}
              </span>
              <span className="text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder [font-style:var(--placeholder-font-style)] font-[number:var(--placeholder-font-weight)] tracking-[var(--placeholder-letter-spacing)]">
                ر.س
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
