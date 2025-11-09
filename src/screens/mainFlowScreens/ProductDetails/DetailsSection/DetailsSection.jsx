import React, { useEffect, useState } from "react";
import { HeartIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { RatePopupButton } from "../../../../components/ui/RatePopupButton";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/BreadCrumbs";
import { useTranslation } from "react-i18next";
import api from "../../../../Api/Axios";
import { MobileCategorySection } from "../MobileCategorySection/MobileCategorySection";

const specificationsMap = (product) => [
  { icon: "/fabric.svg", label: "الخامة :", value: product.material || "-" },
  { icon: "/sizes.svg", label: "الأبعاد :", value: product.dimensions || "-" },
  { icon: "/capacity.svg", label: "الوزن :", value: product.weight ? `${product.weight} كغ` : "-" },
];

const colorOptionsMap = (product) => [
  { color: product.color ? `bg-[${product.color.toLowerCase()}]` : "bg-gray-400" },
];

export const DetailsSection = ({ productId, storeName }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: "المتاجر", href: "/stores", isActive: false, color: "text-[#a16a35]" },
    { label: storeName, href: `/store/${storeName}`, isActive: false, color: "text-[#a16a35]" },
    { label: "تفاصيل المنتج", href: "#", isActive: true, color: "text-[#4f4f4f]" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${productId}`);
        if (res.data.success) setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center py-20">جاري التحميل...</p>;
  if (!product) return <p className="text-center py-20">المنتج غير موجود</p>;

  const specifications = specificationsMap(product);
  const colorOptions = colorOptionsMap(product);

  return (
    <>
    <div className="block md:hidden mx-auto">
                <MobileCategorySection />
              </div>
               <div className="flex flex-col w-full max-w-[1200px] mx-auto gap-6" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Breadcrumb */}
      
      <nav className="inline-flex items-center gap-2 mb-4" aria-label="Breadcrumb">
        
        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-2">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.isActive ? (
                    <BreadcrumbPage className={`font-h5-regular ${item.color}`}>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} className={`font-h5-regular ${item.color}`}>{item.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator>
                    {isArabic ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-start justify-start gap-6 w-full">
        {/* Images */}
        <div className="flex flex-col md:flex-row-reverse gap-6 w-full md:w-auto items-center md:items-start">
          <img
            className="w-[304px] h-[210] md:w-[384px]  md:h-[513px] object-cover rounded-3xl"
            alt="Main product"
            src="/product-details-main-img.png"
          />

          <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 w-full md:w-auto justify-center">
            <img
              className="w-1/3 md:w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              alt="Product thumbnail 1"
              src="/product-details1.png"
            />
            <img
              className="w-1/3 md:w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              alt="Product thumbnail 2"
              src="/product-details2.png"
            />
            <img
              className="w-1/3 md:w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              alt="Product thumbnail 3"
              src="/product-details3.png"
            />
          </div>
        </div>

        {/* Product Details */}
        <section className="flex flex-col w-full md:max-w-[588px] items-start gap-6">
          {/* Title & Description */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-start md:items-center w-full flex-wrap">
              <h1 className="text-[32px] font-[600] text-[#1a1713] w-full md:w-auto">{product.name}</h1>
              <RatePopupButton
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d] mt-2 md:mt-0"
              >
                <HeartIcon className="w-6 h-6" />
              </RatePopupButton>
            </div>
            <p className="font-paragraph text-[#4f4f4f]">{product.description}</p>
          </div>

          {/* Specs & Price */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
            {/* Specifications */}
            <div className="flex flex-col gap-4 w-full sm:w-1/2">
              <h3 className="font-h4-medium text-[#1a1713] inline-flex items-center gap-2">
                <img className="w-4 h-4" alt="Project plan" src="/specification.svg" />
                المواصفات 
              </h3>
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-center gap-2"><div className="inline-flex items-center gap-2">
                     <img
                      className={`object-cover ${index === 1 ? "w-6 h-6" : "w-4 h-4"}`}
                      alt={spec.label}
                      src={spec.icon}
                    />
                    <p className="font-h5-regular text-[#1a1713]">{spec.label}</p>
                  
                  </div>
                  <p className="font-h5-regular text-[#1a1713]">{spec.value}</p>
                  
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2 w-full sm:w-1/2">
              <div className="inline-flex items-center gap-4">
                {product.isOnSale && (
                  <Badge variant="outline" className="h-6 px-2 py-2 rounded-[10px] border-[#008318] bg-transparent">
                    <span className="text-[#003f0b] text-xs">خصم 10%</span>
                  </Badge>
                )}
                <p className="text-[#4f4f4f] text-base line-through">{product.originalPrice} ر.س</p>
                <p className="text-2xl font-semibold text-[#835f40]">{product.salePrice || product.price} ر.س</p>
              </div>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-3 w-full">
              <label htmlFor="quantity" className="font-h4-medium text-[#1a1713]">العدد</label>
              <div className="flex h-12 items-center justify-center gap-2 p-2 w-full rounded-[10px] border border-[#c3c3c3]">
                <div className="flex items-center justify-center gap-10 w-full">
                  <RatePopupButton variant="ghost" size="icon" className="w-6 h-6 p-0 hover:bg-transparent">
                    <MinusIcon className="w-6 h-6" />
                  </RatePopupButton>
                  <span id="quantity" className="text-[#835f40] text-[length:var(--18-med-font-size)]">1</span>
                  <RatePopupButton variant="ghost" size="icon" className="w-6 h-6 p-0 hover:bg-transparent">
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
      </div>
    </div>
    </>
   
  );
};
