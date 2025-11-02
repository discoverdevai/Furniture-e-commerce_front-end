import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../Api/Axios";

export const BlogDetailsSection = () => {
  const { id } = useParams(); // ✅ get blog id from URL
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        console.log("ID" + id);
        
        const res = await api.get(`/api/blogs/${id}`, {
          params: { lang: i18n.language },
        });
        if (res.data.success) {
          setBlog(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id, i18n.language]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        {isArabic ? "جاري تحميل المقال..." : "Loading blog..."}
      </p>
    );
  }

  if (!blog) {
    return (
      <p className="text-center mt-10 text-gray-500">
        {isArabic ? "لم يتم العثور على المقال" : "Blog not found"}
      </p>
    );
  }

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex flex-col w-full max-w-[1200px] items-start gap-6 lg:gap-[24px] mt-10 lg:mt-[50px] mx-auto px-6 sm:px-10 md:px-4`}
    >
      {/* ===== Blog Header ===== */}
      <h1
        className={`text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#1A1713] ${
          isArabic ? "text-right" : "text-left"
        }`}
        style={{ fontFamily: "Cairo" }}
      >
        {blog.subject}
      </h1>

      <p
        className={`font-medium text-[#555] ${
          isArabic ? "text-right" : "text-left"
        } text-[14px] sm:text-[16px] md:text-[18px]`}
      >
        {blog.intro}
      </p>

      {/* ===== Questions and Answers ===== */}
      <section className="flex flex-col items-start gap-6 sm:gap-8 w-full">
        {blog.questions?.map((q) => (
          <div
            key={q.order}
            className={`w-full font-['Cairo',Helvetica] ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <h3 className="font-semibold text-[#a16a35] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[32px] sm:leading-[36px] md:leading-[38px] lg:leading-[150%] mb-2">
              {`${q.order}- ${q.question}`}
            </h3>
            <p className="font-medium text-[#1a1713] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[30px] sm:leading-[34px] md:leading-[38px] lg:leading-[150%]">
              {q.answer}
            </p>
          </div>
        ))}
      </section>
    </article>
  );
};
