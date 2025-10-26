import React from "react";
import { useTranslation } from "react-i18next";

const contentSections = [
  {
    id: 1,
    title: {
      ar: "1- حدد الجو العام الذي تريده",
      en: "1- Define the overall atmosphere you want",
    },
    content: {
      ar: [
        "قبل اختيار الألوان، اسأل نفسك:",
        "هل أريد غرفة مريحة وهادئة؟ إذن الألوان الفاتحة والحيادية مثل البيج، الرمادي الفاتح، أو الأبيض المائل للكريمي ستكون مثالية.",
        "هل أريد غرفة مليئة بالطاقة والحيوية؟ إذن الألوان الجريئة مثل الأزرق الداكن، الأخضر الزمردي، أو الأصفر الدافئ ستكون خيارا رائعا.",
      ],
      en: [
        "Before choosing colors, ask yourself:",
        "Do I want a calm and cozy room? Then light and neutral colors like beige, light gray, or off-white will be perfect.",
        "Do I want a vibrant and energetic room? Then bold colors like navy blue, emerald green, or warm yellow will be a great choice.",
      ],
    },
  },
  {
    id: 2,
    title: {
      ar: "2- استخدم قاعدة الألوان الثلاثية (60-30-10)",
      en: "2- Use the 60-30-10 color rule",
    },
    content: {
      ar: [
        "واحدة من القواعد الذهبية في التصميم الداخلي هي تقسيم الألوان على النحو التالي:",
        "60%: اللون الأساسي (عادة للجدران أو القطع الكبيرة مثل الأريكة).",
        "30%: لون ثانوي يكسر رتابة اللون الأساسي (مثل السجاد أو الستائر).",
        "10%: لون مميز لإضافة لمسة جمالية (الوسائد الصغيرة أو الإكسسوارات).",
      ],
      en: [
        "One of the golden rules of interior design is dividing colors as follows:",
        "60%: The main color (usually for walls or large pieces like the sofa).",
        "30%: A secondary color to break monotony (like rugs or curtains).",
        "10%: An accent color for decorative touches (pillows or accessories).",
      ],
    },
  },
  {
    id: 3,
    title: {
      ar: "3- الاستفادة من الإضاءة الطبيعية",
      en: "3- Take advantage of natural lighting",
    },
    content: {
      ar: [
        "الإضاءة تلعب دورا مهما في إبراز جمال الألوان. إذا كانت غرفة المعيشة مضيئة بنور الشمس، يمكنك استخدام ألوان داكنة لإضافة عمق. أما إذا كانت الغرفة قليلة الإضاءة، فالأفضل استخدام ألوان فاتحة تعكس الضوء وتمنح إحساسا بالاتساع.",
      ],
      en: [
        "Lighting plays an important role in highlighting colors. If your living room has good natural light, you can use darker tones for depth. If it’s dim, opt for lighter shades that reflect light and make the room feel spacious.",
      ],
    },
  },
  {
    id: 4,
    title: {
      ar: "4- التوازن بين الدفء والبرودة",
      en: "4- Balance warmth and coolness",
    },
    content: {
      ar: [
        "الألوان الدافئة مثل الأحمر، البرتقالي، والأصفر تمنح إحساسا بالدفء والحميمية.",
        "الألوان الباردة مثل الأزرق، الأخضر، والبنفسجي تضيف هدوءا وانتعاشا، والمزج بينهما يخلق توازنا بصريا مريحا.",
      ],
      en: [
        "Warm colors like red, orange, and yellow bring coziness and warmth.",
        "Cool colors like blue, green, and purple add calmness and freshness. Mixing them creates visual balance.",
      ],
    },
  },
  {
    id: 5,
    title: {
      ar: "5- استلهم من الطبيعة",
      en: "5- Get inspired by nature",
    },
    content: {
      ar: [
        "الطبيعة مصدر غني للإلهام: لون السماء الأزرق مع الأخضر النباتي والبني الخشبي يعطي انسجاما رائعا. يمكنك أن تستلهم من هذه الألوان لتجعل غرفة المعيشة أكثر راحة وارتباطا بالطبيعة.",
      ],
      en: [
        "Nature is a great source of inspiration: blue skies, green plants, and wooden browns create harmony. Use these tones to make your living room cozy and connected to nature.",
      ],
    },
  },
  {
    id: 6,
    title: {
      ar: "6- جرب قبل أن تقرر",
      en: "6- Try before you decide",
    },
    content: {
      ar: [
        "لا تتعجل! جرب عينات صغيرة من الطلاء على الجدران، أو ضع قماشا ملونا على الأريكة لترى كيف يندمج اللون مع الغرفة قبل أن تعتمد القرار النهائي.",
      ],
      en: [
        "Don’t rush! Test small paint samples on the walls or place fabric swatches on your sofa to see how colors blend before making the final decision.",
      ],
    },
  },
];

export const BlogDetailsSection = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex flex-col w-full max-w-[1200px] items-${
        isArabic ? "end" : "start"
      } gap-6 lg:gap-[24px] mt-10 lg:mt-[50px] mx-auto px-6 sm:px-10 md:px-4`}
    >
      {/* Intro paragraph */}
      <p
        className={`font-['Cairo',Helvetica] font-medium text-[#1a1713] ${
          isArabic ? "text-right" : "text-left"
        } text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[30px] sm:leading-[34px] md:leading-[38px] lg:leading-[150%]`}
      >
        {isArabic
          ? "تعتبر غرفة المعيشة قلب المنزل، فهي المكان الذي يجتمع فيه أفراد العائلة لقضاء أجمل الأوقات، وأيضا المساحة التي تستقبل فيها ضيوفك. لذلك فإن اختيار الألوان المناسبة لها يعد خطوة أساسية لخلق أجواء مريحة وجذابة تعكس ذوقك وشخصيتك ,."
          : "The living room is the heart of the home — a space where family gathers and guests are welcomed. Choosing the right colors is essential to create a cozy and inviting atmosphere that reflects your taste and personality."}
        <br />
        <br />
        {isArabic
          ? "فيما يلي بعض النقاط الأساسية التي تساعدك على اختيار الألوان المثالية لغرفة المعيشة:"
          : "Here are some key tips to help you choose the perfect colors for your living room:"}
      </p>

      {/* Main sections */}
      <section className="flex flex-col items-start gap-6 sm:gap-8 w-full">
        {contentSections.map((section) => (
          <div
            key={section.id}
            className={`w-full font-['Cairo',Helvetica] ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <h3 className="font-semibold text-[#a16a35] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[32px] sm:leading-[36px] md:leading-[38px] lg:leading-[150%] mb-2">
              {isArabic ? section.title.ar : section.title.en}
            </h3>
            <div className="font-medium text-[#1a1713] text-[12px] sm:text-[14px] md:text-[16px]  lg:text-[20px] leading-[30px] sm:leading-[34px] md:leading-[38px] lg:leading-[150%] space-y-2">
              {(isArabic ? section.content.ar : section.content.en).map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};
