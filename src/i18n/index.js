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
      ok: "موافق",
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
      products: "المتاجر",
      best_selling: "الأكثر مبيعاً",
      try_at_home: "جرّب في منزلك",
      blogs: "المدونات",
      about_us: "من نحن",
      contact_us: "تواصل معنا",
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
      products: "Products",
      best_selling: "Best Selling",
      try_at_home: "Try At Home",
      blogs: "Blogs",
      about_us: "About Us",
      contact_us: "Contact Us",
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
