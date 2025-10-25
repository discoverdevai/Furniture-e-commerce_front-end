import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ar: {
    translation: {
      welcome: "مرحبا بك في (اسم الويب سايت)",
      signIn: "تسجيل الدخول",
      phoneNumber: "رقم الجوال",
      password: "كلمة المرور",
      passwordPlaceholder: "ادخل كلمة المرور",
      signInButton: "تسجيل دخول",
      forgotPassword: "نسيت كلمة المرور؟",
      noAccount: "ليس لديك حساب ؟",
      createAccount: "إنشاء حساب الآن",
      createAccountButton: "إنشاء حساب",
      haveAccount: "لديك حساب بالفعل ؟",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      firstNamePlaceholder: "ادخل الاسم الأول",
      lastNamePlaceholder: "ادخل الاسم الأخير",
      email: "البريد الإلكتروني",
      emailPlaceholder: "ادخل البريد الإلكتروني",
      region: "المنطقة",
      city: "المدينة",
      selectRegion: "اختر المنطقة",
      selectCity: "اختر المدينة",
      riyadh: "الرياض",
      makkah: "مكة المكرمة",
      eastern: "المنطقة الشرقية",
      riyadhCity: "الرياض",
      jeddah: "جدة",
      dammam: "الدمام",
      termsAndConditions:
        'أوافق على شروط الاستخدام وسياسة الخصوصية الخاصة بـ "اسم الويب سايت"',
      testimonial:
        "تصاميم فخمة وتفاصيل مرتبة، حسيت البيت تغير 180 درجة التسوق في الموقع سهل وواضح، ما ضيعت وقت في البحث.",
      userName: "تركي القحطاني",
      date: "12 يوليو 2025",
      // Validation messages
      firstNameRequired: "الاسم الأول مطلوب",
      lastNameRequired: "الاسم الأخير مطلوب",
      phoneRequired: "رقم الجوال مطلوب",
      phoneInvalid: "رقم الجوال يجب أن يكون 10 أرقام",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "البريد الإلكتروني غير صحيح (مثال: user@domain.com)",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordInvalid:
        "كلمة المرور يجب أن تحتوي على حرف صغير وكبير ورموز و12 حرف على الأقل",
      regionRequired: "المنطقة مطلوبة",
      cityRequired: "المدينة مطلوبة",
      termsRequired: "يجب الموافقة على الشروط والأحكام",
      // Verification modal
      verificationCode: "رمز التحقق",
      verificationDescription:
        "يرجى إدخال رمز التحقق المكون من 4 أرقام، الذي تم إرساله إلى بريدك الإلكتروني",
      resendTimer: "يمكنك إعادة إرسال الرمز خلال",
      seconds: "ثانية",
      resendCode: "إعادة إرسال الرمز",
      didntReceiveCode: "لم يصلك الرمز؟",
      verify: "تحقق",
      accountCreatedTitle: "تم إنشاء الحساب بنجاح!",
      accountCreatedText:
        "مرحباً بك! تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.",
      errorTitle: "خطأ",
      ok: "حسناً",
      invalidOtpError: "رمز التحقق غير صحيح. حاول مرة أخرى.",
      otpResentTitle: "تم إرسال الرمز!",
      otpResentMessage: "تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.",
      otpResendError: "فشل في إعادة إرسال رمز التحقق. يرجى المحاولة لاحقًا.",
      loginSuccessTitle: "تم تسجيل الدخول!",
      loginSuccessText: "تم تسجيل دخولك بنجاح. مرحباً بك في منصتنا الإلكترونية",
      verificationSuccessTitle: "تم التحقق بنجاح!",
      verificationSuccessText:
        "تم التحقق من رمز OTP بنجاح. يمكنك الآن إعادة تعيين كلمة المرور.",
      invalidCredentials:
        "اسم المستخدم أو كلمة المرور غير صحيحة. حاول مرة أخرى.",
      userNotFound:
        "المستخدم غير موجود. يرجى التحقق من اسم المستخدم والمحاولة مرة أخرى.",

      // Forgot Password
      forgotPasswordTitle: "نسيت كلمة المرور ؟",
      forgotPasswordDescription:
        "يرجى اختيار إحدى الوسيلتين لاستلام رمز التحقق الخاص باستعادة كلمة المرور",
      sendButton: "إرسال",
      backToSignIn: "العودة إلى ",
      viaSMS: "عبر الرسائل",
      viaEmail: "عبر البريد الإلكتروني",
      // Reset Password
      resetPasswordTitle: "إعادة تعيين كلمة المرور",
      resetPasswordDescription:
        "يرجي إدخال كلمة مرور جديد لحسابكم , والتأكد من مطابقتها في الحقلين أدناه",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      newPasswordPlaceholder: "ادخل كلمة المرور الجديدة",
      confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
      confirmPasswordRequired: "تأكيد كلمة المرور مطلوب",
      passwordsDoNotMatch: "كلمات المرور غير متطابقة",
      savePasswordButton: "حفظ كلمة المرور",
      passwordResetSuccessTitle: "تم تغيير كلمة المرور بنجاح!",
      passwordResetSuccessText:
        "تم تحديث كلمة المرور الخاصة بك. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
      //Navbar
      home: "الرئيسية",
      stores: "المتاجر",
      best_selling: "الأكثر مبيعاً",
      try_at_home: "جرّب في منزلك",
      blogs: "المدونات",
      about_us: "من نحن",
      contact_us: "تواصل معنا",
      profile: "الملف الشخصي",
      // Footer
      footer_newsletter_title: "تابع أخبارنا عبر البريد الإلكتروني",
      footer_newsletter_placeholder: "ادخل بريدك الإلكتروني",
      footer_newsletter_button: "إرسال",
      footer_important_links: "أهم الروابط",
      footer_main: "الرئيسية",
      footer_stores: "المتاجر",
      footer_best_selling: "الأكثر مبيعاً",
      footer_try_at_home: "جرّب في منزلك",
      footer_blogs: "المدونات",
      footer_about: "عنا",
      footer_who_we_are: "من نحن",
      footer_contact: "تواصل معنا",
      footer_contact_us: "تواصل معنا",
      footer_phone: "+966 55 123 4567",
      footer_email: "furniture@gmail.com",
      footer_follow: "تابعنا",
      footer_follow_description:
        "تابعنا على مواقع التواصل الاجتماعي للحصول على أحدث العروض وأخبار عالم الأثاث",
      footer_logo_text: "اللوجو",
      footer_description:
        "نحول كل زاوية في منزلك إلى مساحة مليئة بالأناقة والراحة، مع أثاث مصمم بعناية لكل تفاصيل حياتك.",
      footer_copyright: "جميع الحقوق محفوظة",
      //hero section
      hero: {
        title: "أكبر تجربة تسوّق أثاث في السعودية",
        description:
          "منصة متكاملة تجمع أبرز متاجر الأثاث والعلامات الموثوقة في المملكة، حيث تجد كل ما تحتاجه لتأثيث منزلك في مكان واحد. استمتع بآلاف الخيارات التي تناسب مختلف الأذواق والميزانيات، مع تجربة تسوّق سهلة، وخدمات توصيل مريحة تصل إلى باب منزلك في جميع أنحاء المملكة.",
        searchPlaceholder: "ابحث عن ما تريد",
        searchButton: "بحث",
        happyClients: "عميل سعيد بخدمتنا",
        mobileTitle: "اختر أثاثك... وجربه في منزلك قبل الشراء",
        mobileDescription:
          "اكتشف مجموعتنا الواسعة من الأثاث الفاخر، وجرّب كل قطعة في مساحتك الخاصة بتقنية الواقع المعزز AR. تجربة تسوّق ذكية وسهلة من أي مكان.",
        ctaBrowse: "استعرض المنتجات",
        ctaBestSellers: "الأكثر مبيعًا",
        happyClientsShort: "عميل سعيد",
      },
      //blogs hero section
      latestArticles: "أحدث المقالات",
      hero_title: "إلهام بيتك يبدأ من هنا",
      hero_subtitle:
        "غُص في عالم الأثاث والديكور، حيث تجد أفكارًا مبتكرة ونصائح عملية تساعدك على ابتكار مساحة تعكس ذوقك وتمنحك شعورًا بالراحة والدفء.",
      //blogs main section
      popularArticles: "مقالات شائعة",
    },
  },
  en: {
    translation: {
      welcome: "Welcome to (Website Name)",
      signIn: "Sign In",
      phoneNumber: "Phone Number",
      password: "Password",
      passwordPlaceholder: "Enter password",
      signInButton: "Sign In",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      createAccount: "Create Account Now",
      createAccountButton: "Create Account",
      haveAccount: "Already have an account?",
      firstName: "First Name",
      lastName: "Last Name",
      firstNamePlaceholder: "Enter first name",
      lastNamePlaceholder: "Enter last name",
      email: "Email",
      emailPlaceholder: "Enter email address",
      region: "Region",
      city: "City",
      selectRegion: "Select Region",
      selectCity: "Select City",
      riyadh: "Riyadh",
      makkah: "Makkah",
      eastern: "Eastern Province",
      riyadhCity: "Riyadh",
      jeddah: "Jeddah",
      dammam: "Dammam",
      termsAndConditions:
        'I agree to the Terms of Use and Privacy Policy of "Website Name"',
      testimonial:
        "Luxurious designs and organized details, I felt the house changed 180 degrees. Shopping on the site is easy and clear, I didn't waste time searching.",
      userName: "Turki Al-Qahtani",
      date: "July 12, 2025",
      // Validation messages
      firstNameRequired: "First name is required",
      lastNameRequired: "Last name is required",
      phoneRequired: "Phone number is required",
      phoneInvalid: "Phone number must be exactly 10 digits",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email format (example: user@domain.com)",
      passwordRequired: "Password is required",
      passwordInvalid:
        "Password must contain lowercase, uppercase, symbols and be at least 12 characters",
      regionRequired: "Region is required",
      cityRequired: "City is required",
      termsRequired: "Terms and Conditions must be accepted.",
      // Verification modal
      verificationCode: "Verification Code",
      verificationDescription:
        "Please enter the 4-digit verification code that was sent to your email",
      resendTimer: "You can resend the code in",
      seconds: "seconds",
      resendCode: "Resend Code",
      didntReceiveCode: "Didn't receive the code?",
      verify: "Verify",
      accountCreatedTitle: "Account Created Successfully!",
      accountCreatedText:
        "Welcome! Your account has been created successfully. You can now sign in.",
      ok: "OK",
      errorTitle: "Error",
      invalidOtpError: "Invalid OTP. Please try again.",
      otpExpiredError: "Your OTP code has expired. Please request a new one.",
      otpResentTitle: "OTP Sent!",
      otpResentMessage: "A new verification code has been sent to your email.",
      otpResendError: "Failed to resend the OTP. Please try again later.",
      loginSuccessTitle: "Login Successful!",
      loginSuccessText:
        "You have been successfully logged in. welcome at our e-commerce platform",
      verificationSuccessTitle: "Verification Successful!",
      verificationSuccessText:
        "OTP verified successfully. You can now reset your password.",
      invalidCredentials: "Invalid username or password. Please try again.",
      userNotFound: "User not found. Please check your username and try again.",
      // Forgot Password
      forgotPasswordTitle: "Forgot Password?",
      forgotPasswordDescription:
        "Please choose one of the two methods to receive the verification code for password recovery",
      sendButton: "Send",
      backToSignIn: "Back to",
      viaSMS: "Via SMS",
      viaEmail: "Via Email",
      // Reset Password
      resetPasswordTitle: "Reset Password",
      resetPasswordDescription:
        "Please enter a new password for your account, and make sure it matches the two fields below.",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      newPasswordPlaceholder: "Enter new password",
      confirmPasswordPlaceholder: "Re-enter password",
      confirmPasswordRequired: "Password confirmation is required",
      passwordsDoNotMatch: "Passwords do not match",
      savePasswordButton: "Save Password",
      passwordResetSuccessTitle: "Password Reset Successfully!",
      passwordResetSuccessText:
        "Your password has been updated. You can now sign in with your new password.",
      //Navbar
      home: "Home",
      stores: "stores",
      best_selling: "Best Selling",
      try_at_home: "Try At Home",
      blogs: "Blogs",
      about_us: "About Us",
      contact_us: "Contact Us",
      profile: "Profile",
      // Footer
      footer_newsletter_title: "Follow our news via email",
      footer_newsletter_placeholder: "Enter your email",
      footer_newsletter_button: "Send",
      footer_important_links: "Important Links",
      footer_main: "Home",
      footer_stores: "Stores",
      footer_best_selling: "Best Selling",
      footer_try_at_home: "Try At Home",
      footer_blogs: "Blogs",
      footer_about: "About",
      footer_who_we_are: "Who We Are",
      footer_contact: "Contact Us",
      footer_contact_us: "Contact Us",
      footer_phone: "+966 55 123 4567",
      footer_email: "furniture@gmail.com",
      footer_follow: "Follow Us",
      footer_follow_description:
        "Follow us on social media to get the latest offers and news from the world of furniture",
      footer_logo_text: "Logo",
      footer_description:
        "We transform every corner of your home into a space filled with elegance and comfort, with furniture carefully designed for every detail of your life.",
      footer_copyright: "All Rights Reserved",
      //hero section
      hero: {
        title: "The Largest Furniture Shopping Experience in Saudi Arabia",
        description:
          "An all-in-one platform bringing together the top furniture stores and trusted brands in the Kingdom. Find everything you need to furnish your home in one place. Enjoy thousands of options to suit all tastes and budgets, with an easy shopping experience and convenient delivery to your doorstep across Saudi Arabia.",
        searchPlaceholder: "Search for what you need",
        searchButton: "Search",
        happyClients: "Happy customers with our service",
        mobileTitle:
          "Choose your furniture... and try it in your home before buying",
        mobileDescription:
          "Discover our wide range of luxury furniture, and experience each piece in your space with AR technology. A smart and easy shopping experience from anywhere.",
        ctaBrowse: "Browse Products",
        ctaBestSellers: "Best Sellers",
        happyClientsShort: "Happy Clients",
      },
      //blogs hero section
      latestArticles: "Latest Articles",
      hero_title: "Home Inspiration Starts Here",
      hero_subtitle:
        "Dive into the world of furniture and decor, where you'll find innovative ideas and practical tips to help you create a space that reflects your taste and gives you a feeling of comfort and warmth.",
      //blogs main section
      popularArticles: "Popular Articles",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: sessionStorage.getItem("language") || "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

// Save language changes to sessionStorage
i18n.on("languageChanged", (lng) => {
  sessionStorage.setItem("language", lng);
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

// Set initial direction and language on load
const currentLang = i18n.language;
document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = currentLang;

export default i18n;
