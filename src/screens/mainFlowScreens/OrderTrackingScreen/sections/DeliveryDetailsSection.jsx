import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import dayjs from "dayjs";
import api from "../../../../Api/Axios";
// import { Card, CardContent } from "../../../../components/ui/card";


const allStages = [
  { key: "PENDING", title: "تم إستلام الطلب", icon: "/orderRecieved.svg", textColor: "text-[#4f4f4f]", lineHeight: "h-[39px]" },
  { key: "PROCESSING", title: "جاري تجهيز الطلب", icon: "/inProccessing.svg", textColor: "text-[#4f4f4f]", lineHeight: "h-9" },
  { key: "SHIPPED", title: "تم شحن الطلب", icon: "/Shipped.svg", textColor: "text-[#4f4f4f]", lineHeight: "h-10" },
  { key: "DELIVERING", title: "جاري توصيل الطلب", icon: "/Delivering.svg", textColor: "text-[#4f4f4f]", lineHeight: "h-10" },
  { key: "DELIVERED", title: "تم توصيل الطلب", icon: "/Delivered.svg", textColor: "text-[#4f4f4f]", lineHeight: "" },
];

export const DeliveryDetailsSection = ({ orderNumber: propOrderNumber }) => {
  const [order, setOrder] = useState(null);
  const orderNumber = propOrderNumber || localStorage.getItem("orderNumber");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/api/buyer/orders/track/${orderNumber}`);
        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          console.error("Failed to fetch order tracking:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching order tracking:", error);
      }
    };
    fetchOrder();
  }, [orderNumber]);

  if (!order) return <div>Loading order details...</div>;

  const stageKeys = ["RECEIVED", "PROCESSING", "SHIPPED", "DELIVERING", "DELIVERED"];
  const currentStageIndex = stageKeys.indexOf(order.status) !== -1 ? stageKeys.indexOf(order.status) : 0;

  const deliveryStages = allStages.map((stage, index) => ({
  ...stage,
  hasLine: index < allStages.length - 1,
  date: index === 0
    ? dayjs(order.createdAt).format("dddd - D MMMM YYYY")
    : dayjs(order.expectedDeliveryDate).format("dddd - D MMMM YYYY"),
  isCurrent: stage.key === order.status, // mark the current stage
}));

  return (
    <>
    <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
      <section className = "w-full lg:w-2/3">
          <section className="flex flex-col w-full items-start gap-6">

      {/* Delivery Stages */}
      <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
        <CardContent className="flex items-start justify-start gap-3 p-4">
          <div className="flex flex-col w-[159px] items-start gap-6">
          {deliveryStages.map((stage, index) => (
  <div key={index} className="flex flex-col items-start relative w-full">
    <div className="flex items-start gap-3 w-full">
      <img className="w-6 h-6" alt={stage.title} src={stage.icon} />
      <div className="flex flex-col w-[123px] items-start gap-3">
        <div
          className={`mt-[-1px] font-h-5 font-[number:var(--h-5-font-weight)] 
            ${stage.isCurrent ? 'text-[#9f4d00]' : stage.textColor} 
            text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] [font-style:var(--h-5-font-style)]`}
        >
          {stage.title}
        </div>
        <div
          className={`font-medium ${stage.isCurrent ? 'text-[#9f4d00]' : stage.textColor} 
            text-sm leading-[14px] [font-family:'Cairo',Helvetica] tracking-[0]`}
        >
          {stage.date}
        </div>
      </div>
    </div>
    {stage.hasLine && (
      <img
        className={`${stage.lineHeight} absolute top-7 left-[147px] w-px object-cover`}
        alt="Line"
        src={stage.lineHeight === "h-[39px]" ? "/line-52-1.svg" : "/line-52.svg"}
      />
    )}
  </div>
))}
          </div>
        </CardContent>
      </Card>

      {/* Expected Delivery Date */}
      <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
        <CardContent className="flex items-start justify-start gap-3 p-4">
          <img className="w-6 h-6" alt="Calendar" src="/calendar.svg" />
          <div className="flex flex-col items-start gap-3">
            <div className="mt-[-1px] font-h4-medium text-[#1a1713]">
              تاريخ الاستلام المتوقع
            </div>
            <div className="font-h-5 text-[#1a1713]">
              {dayjs(order.expectedDeliveryDate).format("D MMMM YYYY")}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
        <CardContent className="flex items-start justify-start gap-3 p-4">
          <img className="w-6 h-6" alt="Location" src="/location.svg" />
          <div className="flex flex-col items-start gap-3">
            <div className="mt-[-1px] font-h4-medium text-[#1a1713]">
              عنوان الإستلام
            </div>
            <div className="font-h-5 text-[#1a1713]">
              {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="w-full h-56 bg-[#f2f2f2] border-0 rounded-[10px]">
        <CardContent className="flex items-start justify-start gap-3 p-4 h-full">
          <img className="w-6 h-6" alt="Order summary" src="/Summary.svg" />
          <div className="flex flex-col items-start gap-4 flex-1">
            <div className="font-h4-medium text-[#1a1713]">ملخص الطلب</div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between w-full">
                <span>السعر :</span>
                <span>{order.totalAmount} ر.س</span>
              </div>
              <div className="flex justify-between w-full">
                <span>رسوم الشحن :</span>
                <span>{order.shippingAmount} ر.س</span>
              </div>
              <div className="flex justify-between w-full">
                <span>الضريبة :</span>
                <span>{order.taxAmount} ر.س</span>
              </div>
              <div className="flex justify-between w-full font-h4-medium text-[#835f40] text-xl">
                <span>الإجمالي :</span>
                <span>{order.totalAmount + order.shippingAmount + order.taxAmount} ر.س</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method (Static) */}
      <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
        <CardContent className="flex items-start justify-start gap-3 p-4">
          <img className="w-6 h-6" alt="Wallet" src="/wallet.svg" />
          <div className="flex flex-col items-start gap-3">
            <div className="mt-[-1px] font-h4-medium text-[#1a1713]">طريقة الدفع</div>
            <div className="font-h-5 text-[#1a1713]">الدفع عند الإستلام</div>
          </div>
        </CardContent>
      </Card>
    </section>

      </section>
      
  <section className="w-full lg:w-1/3 space-y-4">
  {order.orderItems.map((item) => (
    <Card key={item.id} className="w-full rounded-[10px] border border-[#c3c3c3]">
      <CardContent className="flex items-start gap-3 p-3">
        <div className="flex w-full items-center gap-3">
          <div className="flex flex-col flex-1 items-start gap-3">
            <h2 className="self-stretch [font-family:'Cairo',Helvetica] font-medium text-[#1a1713] text-lg tracking-[0] leading-[27px]">
              {item.productName}
            </h2>

            <div className="inline-flex items-center justify-center gap-2">
              <div className="w-[22px] h-[22px] bg-[#d9d9d9] rounded-[11px] border border-solid border-[#1a1713]" />
              <div className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] whitespace-nowrap [font-style:var(--h-5-font-style)]">
                اللون :
              </div>
            </div>
          </div>

          <img
            className="w-[122px] h-[124px] rounded-[10px] object-cover"
            alt={item.productName}
            src={item.productImage || "/image 4.png"} // fallback to static if null
          />
        </div>
      </CardContent>
    </Card>
  ))}
</section>


    </div>
   
    </>
   
  );
};
