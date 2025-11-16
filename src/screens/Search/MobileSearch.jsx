import { ArrowLeftIcon, ClockIcon, SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { AppNavbar } from "../../components/Layout/Navbar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "../../Api/Axios";

export const MobileSearch = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [commonSearch, setCommonSearch] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // ✅ Handle clicking on a suggestion or recommendation
  const handleSearchClick = (clickedText) => {
    navigate(`/search-result?q=${encodeURIComponent(clickedText)}`);
  };

  // ✅ Fetch recommendations on mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get("/api/search/recommendations");
        if (response.data?.success && response.data?.data) {
          const { searchTerms = [], popularCategories = [] } =
            response.data.data;
          const combined = [
            ...searchTerms.map((term, index) => ({
              id: `term-${index}`,
              text: term,
            })),
            ...popularCategories.map((cat) => ({
              id: `cat-${cat.id}`,
              text: cat.name,
            })),
          ];
          setCommonSearch(combined);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, []);

  // ✅ Fetch live suggestions while typing
  useEffect(() => {
    setLoadingSuggestions(true);
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await api.get(
          `/api/search/suggestions?q=${encodeURIComponent(
            searchQuery
          )}&limit=10`
        );
        if (response.data?.success && Array.isArray(response.data?.data)) {
          const names = response.data.data.map((item) => item.name);
          setSuggestions(names);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const delay = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  // ✅ Highlight matched part
  const highlightMatch = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span
          key={i}
          className="bg-[#d9d9d9] text-[#1a1713] font-bold px-1 rounded"
        >
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div
      className="bg-[#fefefe] min-h-screen w-full"
      style={{
        backgroundImage: "url('/Rectangle 67.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppNavbar />

      <main className="mx-auto mt-12 w-full max-w-[750px] px-6 flex flex-col gap-4">
        {/* Top bar */}
        <div className="relative w-full max-w-[750px] mx-auto flex items-center px-6 h-12">
          <Button
            variant="ghost"
            size="icon"
            className={`relative w-12 ${
              isArabic ? "" : "rotate-180"
            }  h-auto p-0`}
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="w-6 h-6 -rotate-180" />
          </Button>
          <h1
            className="
      absolute
      left-1/2
      transform -translate-x-1/2
      text-[#1a1713]
      text-[length:var(--h4-medium-font-size)]
      font-h4-medium
    "
          >
            {isArabic ? "البحث" : "Search"}
          </h1>
        </div>

        {/* Search input */}
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex w-full max-w-[750px] h-12 items-center gap-2 px-4 border border-[#aaaaaa] rounded-[10px]">
            <SearchIcon className="w-6 h-6" />
            <input
              type="text"
              placeholder={
                isArabic ? "ما الذي تبحث عنه ؟" : "What are you looking for?"
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              className="flex-1 bg-transparent outline-none text-[#1a1713] placeholder:text-[#545454]"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 p-0 border border-[#aaaaaa] rounded-[10px]"
          >
            <img src="/mage_filter.svg" alt="" />
          </Button>
        </div>

        {/* Suggestions Section */}
        {showSuggestions && (
          <section className="flex flex-col w-full max-w-[750px] items-start gap-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-[#1a1713] font-h-5">
                {searchQuery.trim().length > 0
                  ? isArabic
                    ? "الكلمات المطابقة"
                    : "Matching Words"
                  : isArabic
                  ? "اقتراحات شائعة"
                  : "Common Suggestions"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={() => setShowSuggestions(false)}
              >
                <XIcon className="w-6 h-6" />
              </Button>
            </div>

            {/* Suggestion List */}
            {searchQuery.trim().length > 0 ? (
              loadingSuggestions ? (
                <span className="text-[#888]">جاري التحميل...</span>
              ) : suggestions.length > 0 && searchQuery.length > 0 ? (
                <div className="flex flex-col gap-2 w-full">
                  {suggestions.map((name, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      onClick={() => handleSearchClick(name)}
                      className="flex items-center justify-start gap-2 h-10 p-2 bg-[#f2f2f2] rounded-[10px] hover:bg-[#e8e8e8] cursor-pointer"
                    >
                      <span className="font-placeholder text-[#1a1713]">
                        {highlightMatch(name)}
                      </span>
                      <ClockIcon className="w-4 h-4" />
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-[#888]">
                  {isArabic ? "لا توجد نتائج مطابقة" : "No matching results"}
                </span>
              )
            ) : (
              <div className="flex flex-row flex-wrap gap-2 w-fit">
                {commonSearch.length > 0 ? (
                  commonSearch.map((item) => (
                    <Badge
                      key={item.id}
                      variant="secondary"
                      onClick={() => handleSearchClick(item.text)}
                      className="flex items-center justify-start gap-2 h-10 p-2 bg-[#f2f2f2] rounded-[10px] hover:bg-[#e8e8e8] cursor-pointer"
                    >
                      <span className="font-placeholder text-[#1a1713]">
                        {item.text}
                      </span>
                      <ClockIcon className="w-4 h-4" />
                    </Badge>
                  ))
                ) : (
                  <span className="text-[#888] font-[cairo]">
                    {isArabic ? "جاري التحميل..." : "Loading..."}
                  </span>
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};
