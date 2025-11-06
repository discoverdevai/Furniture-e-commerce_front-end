import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const OrderSummarySection = () => {
  return (
    <Card className="w-96 rounded-[10px] border border-[#c3c3c3]">
      <CardContent className="flex items-start gap-3 p-3">
        <div className="flex w-full items-center gap-3">
          <div className="flex flex-col flex-1 items-start gap-3">
            <h2 className="self-stretch [font-family:'Cairo',Helvetica] font-medium text-[#1a1713] text-lg tracking-[0] leading-[27px] ">
              أريكة - بتصميم عملي و عصري
            </h2>

            <div className="inline-flex items-center justify-center gap-2">
              <div className="w-[22px] h-[22px] bg-[#d9d9d9] rounded-[11px] border border-solid border-[#1a1713]" />

              <div className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] whitespace-nowrap  [font-style:var(--h-5-font-style)]">
                اللون :
              </div>
            </div>
          </div>

          <img
            className="w-[122px] h-[124px] rounded-[10px] object-cover"
            alt="Element"
            src="/image 4.png"
          />
        </div>
      </CardContent>
    </Card>
  );
};
