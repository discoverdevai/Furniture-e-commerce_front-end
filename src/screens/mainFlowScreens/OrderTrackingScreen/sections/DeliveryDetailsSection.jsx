import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const deliveryStages = [
  {
    title: "تم إستلام الطلب",
    date: "الاحد - 27 يوليو 2025",
    icon: "/orderRecieved.svg",
    textColor: "text-[#002e08]",
    hasLine: true,
    lineHeight: "h-[39px]",
  },
  {
    title: "جاري تجهيز الطلب",
    date: "الاحد - 27 يوليو 2025",
    icon: "/inProccessing.svg",
    textColor: "text-[#9f4d00]",
    hasLine: true,
    lineHeight: "h-9",
  },
  {
    title: "تم شحن الطلب",
    date: "الاحد - 27 يوليو 2025",
    icon: "/Shipped.svg",
    textColor: "text-[#4f4f4f]",
    hasLine: true,
    lineHeight: "h-10",
  },
  {
    title: "جاري توصيل الطلب",
    date: "الاحد - 27 يوليو 2025",
    icon: "/Delivering.svg",
    textColor: "text-[#4f4f4f]",
    hasLine: true,
    lineHeight: "h-10",
  },
  {
    title: "تم توصيل الطلب",
    date: "الاحد - 27 يوليو 2025",
    icon: "/Delivered.svg",
    textColor: "text-[#4f4f4f]",
    hasLine: false,
    lineHeight: "",
  },
];

const orderSummaryItems = [
  { label: "السعر :", value: "3000", currency: "ر.س" },
  { label: "الخصم :", value: "1000", currency: "ر.س" },
  { label: "الضريبة :", value: "1000", currency: "ر.س" },
  { label: "رسوم الشحن :", value: "100", currency: "ر.س" },
];

export const DeliveryDetailsSection = () => {
  return (
    <section className="flex flex-col w-full items-start gap-6">
      <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
        <CardContent className="flex items-start justify-start gap-3 p-4">
          <div className="flex flex-col w-[159px] items-start gap-6">
            {deliveryStages.map((stage, index) => (
              <div key={index} className="flex flex-col items-start relative w-full">
                <div className="flex items-start gap-3 w-full">
                    <img className="w-6 h-6" alt={stage.title} src={stage.icon} />
                  <div className="flex flex-col w-[123px] items-start gap-3">
                    <div
                      className={`mt-[-1px] font-h-5 font-[number:var(--h-5-font-weight)] ${stage.textColor} text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)]  [font-style:var(--h-5-font-style)]`}
                    >
                      {stage.title}
                    </div>
                    <div
                      className={`font-medium ${stage.textColor} text-sm leading-[14px] [font-family:'Cairo',Helvetica] tracking-[0] `}
                    >
                      {stage.date}
                    </div>
                  </div>
                
                </div>
                {stage.hasLine && (
                  <img
                    className={`${stage.lineHeight} absolute top-7 left-[147px] w-px object-cover`}
                    alt="Line"
                    src={
                      stage.lineHeight === "h-[39px]"
                        ? "/line-52-1.svg"
                        : "/line-52.svg"
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expected Delivery Date */}
      <div className="flex flex-col items-start gap-6 w-full">
        <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
          <CardContent className="flex items-start justify-start gap-3 p-4">
            <div className="flex items-start gap-3">
               <img className="w-6 h-6" alt="Calstartar" src="/calendar.svg" />
              <div className="flex flex-col w-[181px] items-start gap-3">
                <div className="mt-[-1px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                  تاريخ الاستلام المتوقع
                </div>
                <div className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)]  [font-style:var(--h-5-font-style)]">
                  30 يوليو 2025
                </div>
              </div>
             
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
          <CardContent className="flex items-start justify-start gap-3 p-4">
            <div className="flex items-start justify-start gap-3 flex-1">
              <img className="w-6 h-6" alt="Location" src="./location.svg" />
              <div className="flex flex-col items-start gap-3 flex-1">
                <div className="mt-[-1px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                  عنوان الإستلام
                </div>
                <div className="font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)]  [font-style:var(--h-5-font-style)]">
                  شارع الامير سلطان مبني رقم 500, جده
                </div>
              </div>
              
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="w-full h-56 bg-[#f2f2f2] border-0 rounded-[10px]">
          <CardContent className="flex items-start justify-start gap-3 p-4 h-full">
              <img className="w-6 h-6" alt="Order summary" src="/Summary.svg" />
            <div className="flex items-start gap-3 flex-1">
              <div className="flex flex-col items-start gap-3 flex-1">
                <div className="mt-[-1px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                  ملخص الطلب
                </div>
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="flex flex-col items-start gap-4 w-full">
                      {orderSummaryItems.map((item, index) => (
                        <div key={index} className="flex items-start justify-between w-full">
                           <div className="w-fit mt-[-1px] font-[number:var(--placeholder-font-weight)] text-[#1a1713] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] whitespace-nowrap font-placeholder tracking-[var(--placeholder-letter-spacing)]  [font-style:var(--placeholder-font-style)]">
                            {item.label}
                          </div>
                          <div className="w-fit mt-[-1px] font-normal text-[#1a1713] text-base text-left leading-4 whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-[0] ">
                            <span className="font-semibold">{item.value} </span>
                            <span className="text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder [font-style:var(--placeholder-font-style)] font-[number:var(--placeholder-font-weight)] tracking-[var(--placeholder-letter-spacing)]">
                              {item.currency}
                            </span>
                          </div>
                         
                        </div>
                      ))}
                    </div>
                    
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="w-fit mt-[-1px] font-normal text-[#835f40] text-xl text-left leading-5 whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-[0] ">
                      <span className="font-[number:var(--h4-medium-font-weight)] font-h4-medium [font-style:var(--h4-medium-font-style)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] text-[length:var(--h4-medium-font-size)]">
                        4100{" "}
                      </span>
                      <span className="text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder [font-style:var(--placeholder-font-style)] font-[number:var(--placeholder-font-weight)] tracking-[var(--placeholder-letter-spacing)]">
                        ر.س
                      </span>
                    </div>
                    <div className="w-fit mt-[-1px] font-[number:var(--h4-medium-font-weight)] text-[#835f40] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] whitespace-nowrap font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                      الإجمالي :
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="w-full bg-[#f2f2f2] border-0 rounded-[10px]">
          <CardContent className="flex items-start justify-start gap-3 p-4">
            <div className="flex items-start justify-start gap-3 flex-1">
               <img className="w-6 h-6" alt="Wallet" src="/wallet.svg" />
              <div className="flex flex-col items-start gap-3 flex-1">
                <div className="mt-[-1px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                  طريقة الدفع
                </div>
                <div className="font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)]  [font-style:var(--h-5-font-style)]">
                  الدفع عند الإستلام
                </div>
              </div>
             
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
