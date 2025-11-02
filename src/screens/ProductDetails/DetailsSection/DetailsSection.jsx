import React from "react";
import { HeartIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { RatePopupButton } from "../../../components/ui/RatePopupButton";

const breadcrumbItems = [
  { label: "المتاجر", isActive: false },
  { label: "اسم المتجر", isActive: false },
  { label: "غرف المعيشة", isActive: false },
  { label: "تفاصيل المنتج", isActive: true },
];

const specifications = [
  {
    icon: "/fabric.svg",
    label: "الخامة :",
    value: "خشب طبيعي مع أرجل معدنية",
  },
  {
    icon: "/sizes.svg",
    label: "الابعاد :",
    value: "الطول 180 سم * العرض 90 سم * الارتفاع 75 سم",
  },
  {
    icon: "/capacity.svg",
    label: "السعة :",
    value: "4 أفراد",
  },
];

const colorOptions = [
  { color: "bg-[#ef4444]" },
  { color: "bg-[#1a1713]" },
  { color: "bg-[#835f40]" },
  { color: "bg-[#4b5563]" },
  { color: "bg-[#1e3a8a]" },
];

export const DetailsSection = () => {
  return (
    <div className="flex flex-col w-full max-w-[1200px] h-[636px] items-end mx-auto gap-6">
      {/* Breadcrumb */}
      <nav className="inline-flex items-center gap-2" aria-label="Breadcrumb">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="inline-flex items-center gap-2">
            <div
              className={`font-h5-regular text-[length:var(--h5-regular-font-size)] leading-[var(--h5-regular-line-height)] [direction:rtl] ${
                item.isActive ? "text-[#4f4f4f]" : "text-[#835f40]"
              }`}
            >
              {item.label}
            </div>
            {index < breadcrumbItems.length - 1 && (
              <img
                className="w-6 h-6"
                alt="Arrow right"
                src="/arrow-right.svg"
              />
            )}
          </div>
        ))}
      </nav>

      {/* Main Product Section */}
      <div className="flex items-start justify-end gap-6 w-full h-[588px]">
        {/* Product Details */}
        <section className="flex flex-col w-full max-w-[588px] items-start gap-6">
          <div className="flex flex-col items-end gap-6 w-full">
            {/* Title and Description */}
            <div className="flex flex-col items-end gap-4 w-full relative">
              <div className="flex flex-col w-[141px] items-end gap-[9px]">
                <h2 className="font-h-3 text-[#1a1713] [direction:rtl]">
                  غرف المعيشة
                </h2>
                <p className="font-h5-regular text-[#4f4f4f] [direction:rtl]">
                  إيكيا
                </p>
              </div>

              <h1 className="font-h2-semiboald text-[#1a1713] [direction:rtl]">
                أريكة - بتصميم عملي و عصري
              </h1>

              <p className="font-paragraph text-[#4f4f4f] [direction:rtl]">
                أريكة زاوية بتصميم عملي وعصري توفر أقصى درجات الراحة وتستغل
                المساحات بشكل مثالي. مثالية للعائلات أو الضيوف، وتأتي بمساحة
                واسعة للتمدد أو الجلوس الجماعي. مصنوعة من خامات عالية الجودة
                وقماش سهل التنظيف، وتناسب المساحات الكبيرة والمتوسطة.
              </p>

              <RatePopupButton
                variant="ghost"
                size="icon"
                className="absolute top-0 left-0 w-10 h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d]"
              >
                <HeartIcon className="w-6 h-6" />
              </RatePopupButton>
            </div>

            {/* Specifications */}
            <div className="flex flex-col items-end gap-4 w-full">
              <div className="inline-flex items-center gap-2">
                <h3 className="font-h4-medium text-[#1a1713] [direction:rtl]">
                  المواصفات
                </h3>
                <img
                  className="w-4 h-4"
                  alt="Project plan"
                  src="/specification.svg"
                />
              </div>

              <div className="flex flex-col items-end gap-4 w-full">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-end gap-1 w-full"
                  >
                    <p className="font-h5-regular text-[#1a1713] [direction:rtl]">
                      {spec.value}
                    </p>
                    <div className="inline-flex items-center gap-2">
                      <p className="font-h5-regular text-[#1a1713] [direction:rtl]">
                        {spec.label}
                      </p>
                      <img
                        className={`object-cover ${
                          index === 1 ? "w-6 h-6" : "w-4 h-4"
                        }`}
                        alt={spec.label}
                        src={spec.icon}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability + Colors */}
            <div className="flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-2">
                <p className="font-h5 text-[#1a1713] [direction:rtl]">
                  متوفر : 5 قطع
                </p>
                <img className="w-6 h-6" alt="Check box" src="/check box.png" />
              </div>

              <div className="flex items-center gap-2">
                {colorOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full ${option.color} border-2 border-transparent hover:border-[#835f40] transition-colors`}
                    aria-label={`Color option ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Price and Discount */}
            <div className="inline-flex items-center justify-center gap-6">
              <Badge
                variant="outline"
                className="h-6 px-2 py-2 rounded-[10px] border-[#008318] bg-transparent"
              >
                <span className="text-[#003f0b] text-xs">خصم 10%</span>
              </Badge>

              <p className="text-[#4f4f4f] text-base line-through">3000 ر.س</p>

              <p className="text-2xl">
                <span className="font-semibold text-[#835f40]">3000 </span>
                <span className="text-[#835f40] text-[length:var(--18-med-font-size)]">
                  ر.س
                </span>
              </p>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-end gap-3 w-full">
              <label
                htmlFor="quantity"
                className="font-h4-medium text-[#1a1713] [direction:rtl]"
              >
                العدد
              </label>

              <div className="flex h-12 items-center justify-center gap-2 p-2 w-full rounded-[10px] border border-[#c3c3c3]">
                <div className="flex items-center justify-center gap-10 w-full">
                  <RatePopupButton
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 p-0 hover:bg-transparent"
                  >
                    <MinusIcon className="w-6 h-6" />
                  </RatePopupButton>

                  <span
                    id="quantity"
                    className="text-[#835f40] text-[length:var(--18-med-font-size)]"
                  >
                    1
                  </span>

                  <RatePopupButton
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 p-0 hover:bg-transparent"
                  >
                    <PlusIcon className="w-6 h-6" />
                  </RatePopupButton>
                </div>
              </div>
            </div>

            <RatePopupButton className="w-full h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
              <span className="text-[#fefefe]">اضف إلى السلة</span>
            </RatePopupButton>
          </div>
        </section>

        {/* Product Image */}
        <div className="flex flex-row-reverse gap-6 flex-shrink-0">
          <img
            className="w-[384px] h-[513px] object-cover rounded-3xl"
            alt="Main product"
            src="/product-details-main-img.png"
          />
          <div className="flex flex-col gap-3">
            <img
              className="w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              alt="Product thumbnail 1"
              src="/product-details1.png"
            />
            <img
              className="w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              alt="Product thumbnail 2"
              src="/product-details2.png"
            />
            <img
              className="w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              alt="Product thumbnail 3"
              src="/product-details3.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
