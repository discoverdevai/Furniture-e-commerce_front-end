import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/CartCard";
import { Input } from "../../../../components/ui/CartInput";
import { Separator } from "../../../../components/ui/CartSeparator";

const orderSummaryItems = [
  { label: "عدد المنتجات :", value: "1" },
  { label: "السعر :", value: "3000", currency: "ر.س" },
  { label: "الخصم :", value: "1000", currency: "ر.س" },
  { label: "الضريبة :", value: "1000", currency: "ر.س" },
  { label: "رسوم الشحن :", value: "100", currency: "ر.س" },
];

export const CartSection = () => {
  return (
    <div className="mx-auto flex flex-col w-full max-w-[1200px] items-start gap-8">
      <h1 className="self-stretch font-[number:var(--h2-semiboald-font-weight)] text-black text-[length:var(--h2-semiboald-font-size)] leading-[var(--h2-semiboald-line-height)] font-h2-semiboald tracking-[var(--h2-semiboald-letter-spacing)]  [font-style:var(--h2-semiboald-font-style)]">
        السلة
      </h1>

      <div className="flex items-start justify-start gap-6 w-full flex-wrap lg:flex-nowrap">
     
        <Card className="flex-1 min-w-0 rounded-[10px] border border-solid border-[#c3c3c3]">
          <CardContent className="flex items-center justify-start gap-6 p-4">
            <div className="flex w-full items-start justify-between gap-6 flex-wrap md:flex-nowrap">
                <img
                className="w-[214px] h-[206px] rounded-[10px] object-cover flex-shrink-0"
                alt="اريكة - بتصميم عملي وعصري"
                src="/image 4.png"
              />
              <div className="flex flex-col items-start gap-4 flex-1 min-w-0">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-4 w-full">
                    <div className="flex flex-col items-start justify-center gap-4 w-full">
                      <h2 className="w-full font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] leading-[var(--h-3-line-height)] font-h-3 tracking-[var(--h-3-letter-spacing)]  [font-style:var(--h-3-font-style)]">
                        اريكة -&nbsp;&nbsp;بتصميم عملي وعصري
                      </h2>

                      <div className="w-full font-normal text-transparent text-2xl leading-6 [font-family:'Cairo',Helvetica] tracking-[0] ">
                        <span className="font-semibold text-[#835f40] leading-[0.1px]">
                          3000{" "}
                        </span>
                        <span className="font-[number:var(--18-med-font-weight)] text-[#835f40] text-[length:var(--18-med-font-size)] leading-[var(--18-med-line-height)] font-18-med [font-style:var(--18-med-font-style)] tracking-[var(--18-med-letter-spacing)]">
                          ر.س
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center justify-center gap-2">
                        <div className="font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] whitespace-nowrap font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                        اللون :
                      </div>
                      <div className="w-[22px] h-[22px] bg-[#b3afad] rounded-[11px] border border-solid border-[#1a1713]" />
                      
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="w-full font-[number:var(--h4-medium-font-weight)] text-black text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                      العدد
                    </div>

                    <div className="flex items-center justify-center gap-10 w-full h-12 p-2 rounded-[10px] border border-solid border-[#c3c3c3]">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 hover:bg-transparent"
                      >
                        <MinusIcon className="w-6 h-6 text-[#4f4f4f]" />
                      </Button>

                      <div className="font-18-med font-[number:var(--18-med-font-weight)] text-[#4f4f4f] text-[length:var(--18-med-font-size)] text-center tracking-[var(--18-med-letter-spacing)] leading-[var(--18-med-line-height)] [font-style:var(--18-med-font-style)]">
                        1
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 hover:bg-transparent"
                      >
                        <PlusIcon className="w-6 h-6 text-[#4f4f4f]" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="inline-flex items-center justify-center gap-2 h-auto p-0 hover:bg-transparent"
                >
                    <Trash2Icon className="w-6 h-6 text-[#1a1713]" />
                  <div className="font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] whitespace-nowrap font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                    حذف
                  </div>
                  
                </Button>
              </div>

              
            </div>
          </CardContent>
        </Card>
           <Card className="w-full lg:w-96 bg-[#f2f2f2] rounded-[10px] border-0">
          <CardContent className="flex flex-col items-center justify-center gap-6 p-4">
            <div className="flex items-center justify-between gap-4 w-full rounded-[10px] border border-solid border-transparent bg-gradient-to-l from-[#805b3c] to-[#d3baa4] p-[1px]">
              <div className="flex-1 bg-[#f2f2f2] rounded-[10px_0px_0px_10px] p-2 flex items-center justify-center">
                <Input
                  defaultValue=""
                  placeholder="ادخل كود الخصم"
                  className="border-0 bg-transparent text-right font-[number:var(--placeholder-font-weight)] text-[#757474] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder tracking-[var(--placeholder-letter-spacing)]  [font-style:var(--placeholder-font-style)] h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button className="h-auto w-[151px] rounded-[10px_0px_0px_10px] bg-gradient-to-l from-[#805b3c] to-[#d3baa4] hover:opacity-90 p-2">
                <span className="font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] leading-[var(--button-text-line-height)] font-button-text tracking-[var(--button-text-letter-spacing)]  [font-style:var(--button-text-font-style)]">
                  تفعيل
                </span>
              </Button>
            </div>

            <div className="flex flex-col items-start gap-4 w-full">
              {orderSummaryItems.map((item, index) => (
                <div key={index} className="flex items-start justify-between w-full">
                 
                  <div className="font-[number:var(--placeholder-font-weight)] text-[#1a1713] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] whitespace-nowrap font-placeholder tracking-[var(--placeholder-letter-spacing)]  [font-style:var(--placeholder-font-style)]">
                    {item.label}
                  </div>
                   <div className="[font-family:'Cairo',Helvetica] font-normal text-[#1a1713] text-base text-left tracking-[0] leading-4 whitespace-nowrap ">
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

            <Separator className="w-full h-px bg-[#c3c3c3]" />

            <div className="flex items-center justify-between w-full">
             
              <div className="font-[number:var(--h4-medium-font-weight)] text-[#835f40] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] whitespace-nowrap font-h4-medium tracking-[var(--h4-medium-letter-spacing)]  [font-style:var(--h4-medium-font-style)]">
                الإجمالي :
              </div>
               <div className="font-normal text-[#835f40] text-xl text-left leading-5 whitespace-nowrap [font-family:'Cairo',Helvetica] tracking-[0] ">
                <span className="font-[number:var(--h4-medium-font-weight)] font-h4-medium [font-style:var(--h4-medium-font-style)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] text-[length:var(--h4-medium-font-size)]">
                  4100{" "}
                </span>
                <span className="text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder [font-style:var(--placeholder-font-style)] font-[number:var(--placeholder-font-weight)] tracking-[var(--placeholder-letter-spacing)]">
                  ر.س
                </span>
              </div>
            </div>

            <Button className="h-14 w-full rounded-[10px] bg-gradient-to-l from-[#805b3c] to-[#d3baa4] hover:opacity-90 p-2">
              <span className="font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)]  [font-style:var(--button-text-font-style)]">
                الدفع الآن
              </span>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
