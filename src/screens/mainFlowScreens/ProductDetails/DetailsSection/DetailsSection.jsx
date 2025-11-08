import React ,{ useEffect, useState } from "react";
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



const specificationsMap = (product) => [
  { icon: "/fabric.svg", label: "الخامة :", value: product.material || "-" },
  { icon: "/sizes.svg", label: "الأبعاد :", value: product.dimensions || "-" },
  { icon: "/capacity.svg", label: "الوزن :", value: product.weight ? `${product.weight} كغ` : "-" },
];

const colorOptionsMap = (product) => [
  { color: product.color ? `bg-[${product.color.toLowerCase()}]` : "bg-gray-400" },
  // add more colors if needed
];

export const DetailsSection = ({ productId , storeName }) => {
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
        if (res.data.success) {
          setProduct(res.data.data);
        }
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
    <div
      className="flex flex-col w-full max-w-[1200px] h-[636px] items-start mx-auto gap-6"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      {/* Breadcrumb */}
      <nav className="inline-flex items-center gap-2" aria-label="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-2">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.isActive ? (
                    <BreadcrumbPage className={`font-h5-regular ${item.color}`}>
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} className={`font-h5-regular ${item.color}`}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator>
                    {isArabic ? (
                      <ChevronLeftIcon className="w-6 h-6" />
                    ) : (
                      <ChevronRightIcon className="w-6 h-6" />
                    )}
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      {/* Main Product Section */}
      <div className="flex items-start justify-start gap-6 w-full h-[588px]">
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

        {/* Product Details */}
        <section className="flex flex-col w-full max-w-[588px] items-start gap-6">
          <div className="flex flex-col items-start gap-6 w-full">
            {/* Title and Description */}
            <div className="flex flex-col items-start gap-4 w-full relative">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[32px] font-[600] text-[#1a1713]">
                  {product.name}
                </h1>
                <RatePopupButton
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d]"
                >
                  <HeartIcon className="w-6 h-6" />
                </RatePopupButton>
              </div>
              <p className="font-paragraph text-[#4f4f4f]">{product.description}</p>
            </div>

            {/* Specifications */}
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="inline-flex items-center gap-2">
                <h3 className="font-h4-medium text-[#1a1713]">المواصفات</h3>
                <img className="w-4 h-4" alt="Project plan" src="/specification.svg" />
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-center justify-start gap-1 w-full">
                    <p className="font-h5-regular text-[#1a1713]">{spec.value}</p>
                    <div className="inline-flex items-center gap-2">
                      <p className="font-h5-regular text-[#1a1713]">{spec.label}</p>
                      <img
                        className={`object-cover ${index === 1 ? "w-6 h-6" : "w-4 h-4"}`}
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
                <p className="font-h5 text-[#1a1713]">متوفر : {product.stockQuantity} قطع</p>
                <img className="w-6 h-6" alt="Check box" src="/check box.png" />
              </div>
              <div className="flex items-center gap-2">
                {colorOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full ${option.color} border-2 border-transparent hover:border-[#835f40] transition-colors`}
                  />
                ))}
              </div>
            </div>

            {/* Price and Discount */}
            <div className="inline-flex items-center justify-center gap-6">
              {product.isOnSale && (
                <Badge
                  variant="outline"
                  className="h-6 px-2 py-2 rounded-[10px] border-[#008318] bg-transparent"
                >
                  <span className="text-[#003f0b] text-xs">خصم 10%</span>
                </Badge>
              )}
              <p className="text-[#4f4f4f] text-base line-through">
                {product.originalPrice} ر.س
              </p>
              <p className="text-2xl">
                <span className="font-semibold text-[#835f40]">
                  {product.salePrice || product.price}{" "}
                </span>
                <span className="text-[#835f40] text-[length:var(--18-med-font-size)]">ر.س</span>
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-3 w-full">
                <label htmlFor="quantity" className="font-h4-medium text-[#1a1713]">
                  العدد
                </label>
                <div className="flex h-12 items-center justify-center gap-2 p-2 w-full rounded-[10px] border border-[#c3c3c3]">
                  <div className="flex items-center justify-center gap-10 w-full">
                    <RatePopupButton variant="ghost" size="icon" className="w-6 h-6 p-0 hover:bg-transparent">
                      <MinusIcon className="w-6 h-6" />
                    </RatePopupButton>
                    <span
                      id="quantity"
                      className="text-[#835f40] text-[length:var(--18-med-font-size)]"
                    >
                      1
                    </span>
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
          </div>
        </section>
      </div>
    </div>
  );
};
