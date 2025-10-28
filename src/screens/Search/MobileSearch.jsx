import {
    ArrowLeftIcon,
    ClockIcon,
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
    SlidersHorizontalIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { AppNavbar } from "../../components/Navbar"

const suggestionItems = [
    { id: 1, text: "غرف معيشة" },
    { id: 2, text: "كرسي" },
    { id: 3, text: "غرف نوم" },
    { id: 4, text: "غرف أطفال" },
];

export const MobileSearch = () => {
    return (
        <div className="bg-[#fefefe] w-full min-w-[375px] min-h-[812px] relative"
            style={{
                backgroundImage: "url('/Rectangle 67.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
            <AppNavbar />



            <main className="flex flex-col w-[343px] items-start gap-4 absolute top-32 left-4">
                <div className="flex w-[195px] items-center justify-between relative flex-[0_0_auto]">


                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative w-12 h-12 rotate-180 h-auto p-0"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeftIcon className="w-6 h-6 -rotate-180" />
                    </Button>
                    <h1 className="w-fit font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] text-center leading-[var(--h4-medium-line-height)] whitespace-nowrap relative font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [direction:rtl] [font-style:var(--h4-medium-font-style)]">
                        البحث
                    </h1>
                </div>

                <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">

                    <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">

                        <div className="flex w-[279px] h-12 items-center justify-start gap-2 p-4 relative rounded-[10px] border border-solid border-[#aaaaaa]">
                            <div className="inline-flex items-center justify-start gap-2 relative flex-[0_0_auto] mt-[-4.00px] mb-[-4.00px]">
                                <SearchIcon className="w-6 h-6" />
                                <span className="w-fit font-[number:var(--placeholder-font-weight)] text-[#545454] text-[length:var(--placeholder-font-size)] leading-[var(--placeholder-line-height)] whitespace-nowrap relative font-placeholder tracking-[var(--placeholder-letter-spacing)] [direction:rtl] [font-style:var(--placeholder-font-style)]">
                                    ما الذي تبحث عنه ؟
                                </span>

                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="flex w-12 h-12 items-center justify-center gap-2 px-2 py-3 relative rounded-[10px] border border-solid border-[#aaaaaa] h-auto"
                        >
                            <img src="/mage_filter.svg" alt="" />
                        </Button>

                    </div>

                    <section className="flex flex-col w-[304px] items-start gap-4 relative flex-[0_0_auto]">
                        <h2 className="self-stretch mt-[-1.00px] font-[number:var(--h-5-font-weight)] text-[#1a1713] text-[length:var(--h-5-font-size)] leading-[var(--h-5-line-height)] relative font-h-5 tracking-[var(--h-5-letter-spacing)] [direction:rtl] [font-style:var(--h-5-font-style)]">
                            اقتراحات شائعة
                        </h2>

                        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                                {suggestionItems.slice(0, 3).map((item) => (
                                    <Badge
                                        key={item.id}
                                        variant="secondary"
                                        className="inline-flex h-10 items-center justify-start gap-2 p-2 relative flex-[0_0_auto] bg-[#f2f2f2] rounded-[10px] hover:bg-[#e8e8e8] cursor-pointer"
                                    >
                                        <span className="relative w-fit font-placeholder font-[number:var(--placeholder-font-weight)] text-[#1a1713] text-[length:var(--placeholder-font-size)] tracking-[var(--placeholder-letter-spacing)] leading-[var(--placeholder-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--placeholder-font-style)]">
                                            {item.text}
                                        </span>
                                        <ClockIcon className="w-4 h-4" />
                                    </Badge>
                                ))}
                            </div>

                            {suggestionItems.slice(3).map((item) => (
                                <Badge
                                    key={item.id}
                                    variant="secondary"
                                    className="inline-flex h-10 items-center justify-start gap-2 p-2 relative bg-[#f2f2f2] rounded-[10px] hover:bg-[#e8e8e8] cursor-pointer"
                                >
                                    <span className="relative w-fit font-placeholder font-[number:var(--placeholder-font-weight)] text-[#1a1713] text-[length:var(--placeholder-font-size)] tracking-[var(--placeholder-letter-spacing)] leading-[var(--placeholder-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--placeholder-font-style)]">
                                        {item.text}
                                    </span>
                                    <ClockIcon className="w-4 h-4" />
                                </Badge>
                            ))}
                        </div>
                    </section>
                </div>
            </main>



        </div>
    );
};
