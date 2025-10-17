import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/TestimonialAvatar";
import { TestimonialsCard,TestimonialsCardContent} from  "../../../../components/ui/TestimonialsCard";
import { useTranslation } from "react-i18next";

 

const testimonials = [
  {
    name: "نورة العتيبي",
    text: "الطقم وصل مغلف بشكل ممتاز، والمقاسات كانت مناسبة تماما. شكرا على الاحترافية",
    image: "/Ellipse 36.png",
  },
  {
    name: "عبدالله المطيري",
    text: "الخدمة ممتازة والتوصيل كان سريع، والكنبة طلعت أجمل من الصور. شكرا على التعامل الراقي، أكيد ما راح تكون آخر مرة أطلب منكم!",
    image: "/Ellipse 36.png",
  },
  {
    name: "تركي القحطاني",
    text: "الخدمة ممتازة والتوصيل كان سريع، والكنبة طلعت أجمل من الصور. شكرا على التعامل الراقي، أكيد ما راح تكون آخر مرة أطلب منكم!",
    image: "/Ellipse 36.png",
  },
  {
    name: "عهود بن ناصر",
    text: "الخدمة ممتازة والتوصيل كان سريع، والكنبة طلعت أجمل من الصور. شكرا على التعامل الراقي، أكيد ما راح تكون آخر مرة أطلب منكم!",
    image: "/Ellipse 36.png",
  },
];

export const TestimonialSection = () => {
  const { t, i18n } = useTranslation();
 const isArabic = i18n.language === "ar";
  return (
    <section className="relative w-full bg-[#fefefe] py-20 text-right">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background pattern"
        src="/image 37.png"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 flex flex-col gap-14">
       <h2
  className="
    font-[number:var(--h2-semiboald-font-weight)]
    text-[20px]
    sm:text-[length:var(--h2-semiboald-font-size)]
    leading-[var(--h2-semiboald-line-height)]
    font-h2-semiboald
    text-[#1a1713]
    tracking-[var(--h2-semiboald-letter-spacing)]
    [font-style:var(--h2-semiboald-font-style)]
    text-right
  "
>
  أراء العملاء
</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <Avatar className="absolute -top-8 left-1/2 transform translate-x-1/2 w-[85px] h-[85px] z-10">
                <AvatarImage
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="object-cover"
                />
              </Avatar>

              <TestimonialsCard className="w-[282px] border-0 shadow-none bg-transparent text-right">
                <TestimonialsCardContent className="relative p-0">
                  <img
                    className="absolute top-0 left-0 w-full h-full"
                    alt="Card background"
                    src="/Union.svg"
                  />

                  <div className="relative flex flex-col items-center gap-2 px-3 py-[61px] min-h-[247px]">
                    <div className="flex flex-col w-full items-center gap-11">
                    <p className="font-normal text-sm leading-[21px] [font-family:'Cairo',Helvetica] text-[#1a1713] tracking-[0] ">
  {testimonial.text}
</p>

                      <div className="flex items-center justify-between w-full">
                       

                        <div className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#3b3b3b] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] whitespace-nowrap  [font-style:var(--h-5-font-style)]">
                          {testimonial.name}
                        </div>
                         <img
                          className="w-[95px]"
                          alt="5 star rating"
                          src="/Frame 1984081465.svg"
                        />
                      </div>
                    </div>
                  </div>
                </TestimonialsCardContent>
              </TestimonialsCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
