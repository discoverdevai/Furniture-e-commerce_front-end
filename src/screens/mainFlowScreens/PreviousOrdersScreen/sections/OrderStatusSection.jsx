import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const orderData = [
  {
    id: "1234",
    status: "تم الإستلام",
    statusBg: "bg-[#f6f0ea]",
    statusColor: "text-[#5a2c00]",
    title: "أريكة -  بتصميم عملي وعصري",
    quantity: 1,
    price: 3000,
    deliveryDate: "30 يوليو 2025",
    image: "/image 4.png",
    showCancel: true,
  },
  {
    id: "1234",
    status: "جاري التجهيز",
    statusBg: "bg-[#ebf0fb]",
    statusColor: "text-[#00154c]",
    title: "أريكة -  بتصميم عملي وعصري",
    quantity: 1,
    price: 3000,
    deliveryDate: "30 يوليو 2025",
    image: "/image 4.png",
    showCancel: true,
  },
  {
    id: "1234",
    status: "تم الشحن",
    statusBg: "bg-[#fbfce2]",
    statusColor: "text-[#414706]",
    title: "أريكة -  بتصميم عملي وعصري",
    quantity: 1,
    price: 3000,
    deliveryDate: "30 يوليو 2025",
    image: "/image 4.png",
    showCancel: false,
  },
];

export const OrderStatusSection = () => {
  return (
    <section className="flex flex-col items-start gap-6 w-full">
      {orderData.map((order, index) => (
        <div
          key={`order-${index}`}
          className="flex flex-col items-start gap-[15px] w-full"
        >
          <Card className="w-full border border-solid border-[#c3c3c3] rounded-[10px]">
            <CardContent className="flex items-start justify-start gap-6 p-4">
              <div className="flex w-full items-start justify-between">
              

                <div className="inline-flex items-start gap-6">
                 <img
  className="
    w-[56px] h-[54px] rounded-[8px] opacity-100 
    -rotate-[180deg] 
    sm:w-[222px] sm:h-[213px] sm:rounded-[10px] sm:rotate-0
    object-cover
  "
  alt="Element"
  src={order.image}
/>

                  <div className="flex flex-col items-start gap-6">
                 <div className="flex flex-col items-start gap-4">
  <div className="flex flex-col items-start justify-center gap-4">
    {/* Order ID */}
    <div className="text-[14px] lg:text-[length:var(--h-5-font-size)] font-[number:var(--h-5-font-weight)] text-[#4f4f4f] text-start leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)] [font-style:var(--h-5-font-style)]">
      #{order.id}
    </div>

    {/* Title */}
    <div className="text-[14px] lg:text-[length:var(--h-3-font-size)] font-[number:var(--h-3-font-weight)] text-[#1a1713] leading-[var(--h-3-line-height)] font-h-3 tracking-[var(--h-3-letter-spacing)] [font-style:var(--h-3-font-style)]">
      {order.title}
    </div>

    {/* Quantity */}
    <div className="text-[14px] lg:text-base font-normal text-[#1a1713] leading-4 [font-family:'Cairo',Helvetica] tracking-[0]">
      <span className="text-[14px] lg:text-[length:var(--h-5-font-size)] font-[number:var(--h-5-font-weight)] font-h-5 [font-style:var(--h-5-font-style)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)]">
        العدد
      </span>
      <span className="text-[14px] lg:text-2xl font-semibold leading-6">
        {" "} : {order.quantity}
      </span>
    </div>

    {/* Price */}
    <div className="text-[14px] lg:text-base font-normal text-[#1a1713] leading-4 [font-family:'Cairo',Helvetica] tracking-[0]">
      <span className="text-[14px] lg:text-[length:var(--h-5-font-size)] font-[number:var(--h-5-font-weight)] font-h-5 [font-style:var(--h-5-font-style)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)]">
        السعر
      </span>
      <span className="text-[14px] lg:text-2xl font-semibold text-[#1a1713] leading-6"> : </span>
      <span className="text-[14px] lg:text-2xl font-semibold text-[#835f40] leading-[0.1px]">
        {order.price}
      </span>
      <span className="text-[14px] lg:text-2xl font-semibold text-[#1a1713] leading-6">&nbsp;</span>
      <span className="text-[14px] lg:text-lg font-medium text-[#835f40] leading-[18px]">
        ر.س
      </span>
    </div>
  </div>

  {/* Delivery Date */}
  <div className="text-[14px] lg:text-base font-normal text-[#1a1713] leading-4 [font-family:'Cairo',Helvetica] tracking-[0]">
    <span className="text-[14px] lg:text-[length:var(--h-5-font-size)] font-[number:var(--h-5-font-weight)] font-h-5 [font-style:var(--h-5-font-style)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)]">
      تاريخ الاستلام المتوقع
    </span>
    <span className="text-[14px] lg:text-2xl font-semibold leading-6"> : {order.deliveryDate}</span>
  </div>

  {/* Color */}
  <div className="inline-flex items-center justify-center gap-2 text-[14px] lg:text-[length:var(--h4-medium-font-size)]">
    <div className="font-[number:var(--h4-medium-font-weight)] text-[#1a1713] leading-[var(--h4-medium-line-height)] whitespace-nowrap font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [font-style:var(--h4-medium-font-style)]">
      اللون :
    </div>
    <div className="w-[22px] h-[22px] bg-[#bbb7b6] rounded-[11px] border border-solid border-[#1a1713]" />
  </div>
</div>

                  </div>

                  
                </div>
                  <Badge
                  className={`${order.statusBg} ${order.statusColor} inline-flex  items-center  justify-center gap-2 p-1 rounded-[10px] h-auto font-h5-regular font-[number:var(--h5-regular-font-weight)] text-[length:var(--h5-regular-font-size)] tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)] hover:${order.statusBg}`}
                >
                  <span className="text-[12px] lg:text-[length:var(--h-3-font-size)]">{order.status}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {order.showCancel && (
            <Button
              variant="ghost"
              className="inline-flex items-center gap-3 h-auto p-0 hover:bg-transparent"
            >
              <img
                className="w-6 h-6"
                alt="Close circle"
                src="./close-circle.svg"
              />
              <div className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#4f4f4f] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] whitespace-nowrap  [font-style:var(--h-5-font-style)]">
                إلغاء الطلب
              </div>
              
            </Button>
          )}
        </div>
      ))}
    </section>
  );
};
