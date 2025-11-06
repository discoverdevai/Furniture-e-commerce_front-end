import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { useTranslation } from "react-i18next";


const formFields = [
    {
        id: "name",
        label: "الاسم",
        placeholder: "ادخل الاسم",
        type: "text",
    },
    {
        id: "street",
        label: "اسم الشارع",
        placeholder: "ادخل اسم الشارع",
        type: "text",
    },
    {
        id: "building",
        label: "رقم المبنى",
        placeholder: "ادخل رقم المبنى",
        type: "text",
    },
];

const paymentMethods = [
    { id: "cash", label: "الدفع عند الاستلام" },
    { id: "mada", label: "Mada" },
    { id: "paypal", label: "Pay Pal" },
    { id: "applepay", label: "Apple Pay" },
];

export const PaymentInformationSection = () => {
    const [selectedPayment, setSelectedPayment] = useState("cash");
      const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

    return (
        <section className="flex flex-col w-full items-start gap-6 relative">
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
                    <h2 className="self-stretch mt-[-1.00px] font-[number:var(--h2-semiboald-font-weight)] text-[#1a1713] text-[length:var(--h2-semiboald-font-size)] leading-[var(--h2-semiboald-line-height)]  relative font-h2-semiboald tracking-[var(--h2-semiboald-letter-spacing)] [font-style:var(--h2-semiboald-font-style)]">
                        بيانات الشراء
                    </h2>

                    <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                        {formFields.map((field) => (
                            <div
                                key={field.id}
                                className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]"
                            >
                                <Label
                                    htmlFor={field.id}
                                    className="self-stretch mt-[-1.00px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)]  relative font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [font-style:var(--h4-medium-font-style)]"
                                >
                                    {field.label}
                                </Label>

                                <Input
                                    id={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="flex h-14 items-center justify-start gap-2 px-4 py-2 relative self-stretch w-full rounded-[10px] border border-solid border-[#c3c3c3] font-[number:var(--placeholder-font-weight)] text-[#4f4f4f] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)]  font-placeholder tracking-[var(--placeholder-letter-spacing)] [font-style:var(--placeholder-font-style)] text-right"
                                />
                            </div>
                        ))}

                        <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <Label
                                htmlFor="phone"
                                className="self-stretch mt-[-1.00px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)]  relative font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [font-style:var(--h4-medium-font-style)]"
                            >
                                رقم الجوال
                            </Label>

                            <div className="flex h-14 items-center gap-2 px-4 py-2 relative self-stretch w-full rounded-[10px] border border-solid border-[#c3c3c3]">
                                <div className="flex w-14 items-center justify-between relative">
                                    <div className="w-fit font-[number:var(--placeholder-font-weight)] text-[#4f4f4f] text-[length:var(--placeholder-font-size)] text-right leading-[var(--placeholder-line-height)] whitespace-nowrap relative font-placeholder tracking-[var(--placeholder-letter-spacing)] [font-style:var(--placeholder-font-style)]">
                                        +966
                                    </div>

                                    <img
                                        className="w-px h-10 mr-[-1.00px] relative object-cover"
                                        alt="Line"
                                        src="/line-1.svg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                            <Label
                                htmlFor="region"
                                className="self-stretch mt-[-1.00px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)]  relative font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [font-style:var(--h4-medium-font-style)]"
                            >
                                المنطقة
                            </Label>

                            <Select>
                                <SelectTrigger
                                    id="region"
                                    className="flex h-14 items-center justify-end gap-2 px-4 py-2 relative self-stretch w-full rounded-[10px] border border-solid border-[#c3c3c3] "
                                >
                                    <SelectValue
                                        placeholder="اختر المدينة"
                                        className="font-[number:var(--placeholder-font-weight)] text-[#4f4f4f] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] font-placeholder tracking-[var(--placeholder-letter-spacing)] [font-style:var(--placeholder-font-style)]"
                                    />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value="riyadh">الرياض</SelectItem>
                                    <SelectItem value="jeddah">جدة</SelectItem>
                                    <SelectItem value="dammam">الدمام</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col  gap-6 w-full">
                    <h2 className="font-[number:var(--h2-semiboald-font-weight)] text-[#1a1713] text-[length:var(--h2-semiboald-font-size)] leading-[var(--h2-semiboald-line-height)] font-h2-semiboald tracking-[var(--h2-semiboald-letter-spacing)] [font-style:var(--h2-semiboald-font-style)]">
                        طرق الدفع
                    </h2>

                    <RadioGroup
                        value={selectedPayment}
                        onValueChange={setSelectedPayment}
                        className="flex flex-col w-full gap-4"
                    >
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className="flex items-center justify-start gap-2 w-full"
                            >
                                <RadioGroupItem
                                    value={method.id}
                                    id={method.id}
                                    className="w-6 h-6 shrink-0"
                                />
                                <Label
                                    htmlFor={method.id}
                                    className="font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] font-h-5 tracking-[var(--h-5-letter-spacing)] [font-style:var(--h-5-font-style)] cursor-pointer"
                                >
                                    {method.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

            </div>

            <Button className="flex h-14 items-center justify-center gap-2 p-2 relative self-stretch w-full rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
                <span className="relative w-fit font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap  [font-style:var(--button-text-font-style)]">
                    تأكيد الطلب
                </span>
            </Button>
        </section>
    );
};
