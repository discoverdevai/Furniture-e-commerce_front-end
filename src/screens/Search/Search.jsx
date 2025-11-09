import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Checkbox from "../../components/ui/CheckBox";
import { useTranslation } from "react-i18next";
import api from "../../Api/Axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

export const SearchDropdown = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // ✅ initialize navigate
  const isArabic = i18n.language === "ar";

  const [commonSearch, setCommonSearch] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // ✅ Handle click on any suggestion or recommendation
  const handleSearchClick = (clickedText) => {
    const checkedCategories = filterCategories
      .filter((cat) => cat.checked)
      .map((cat) => cat.label);

    const cParam = checkedCategories.join(","); // join multiple selected
    navigate(`/search-result?q=${encodeURIComponent(clickedText)}&c=${encodeURIComponent(cParam)}`);
    console.log(`/search-result?q=${encodeURIComponent(clickedText)}&c=${encodeURIComponent(cParam)}`);
    
  };

  // ✅ Update category checked state
  // const toggleCategory = (id) => {
  //   setFilterCategories((prev) =>
  //     prev.map((cat) =>
  //       cat.id === id ? { ...cat, checked: !cat.checked } : cat
  //     )
  //   );
  // };
const toggleCategory = (id, checked) => {
  setFilterCategories((prev) =>
    prev.map((cat) =>
      cat.id === id ? { ...cat, checked } : cat
    )
  );
};

  // ✅ Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get("/api/search/recommendations");
        if (response.data?.success && response.data?.data) {
          const { searchTerms = [], popularCategories = [] } = response.data.data;
          const combined = [
            ...searchTerms.map((term, index) => ({ id: `term-${index}`, text: term })),
            ...popularCategories.map((cat) => ({ id: `cat-${cat.id}`, text: cat.name })),
          ];
          setCommonSearch(combined);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories");
        if (response.data?.success && Array.isArray(response.data?.data)) {
          const mapped = response.data.data.map((cat) => ({
            id: cat.id,
            label: cat.name,
            checked: false,
          }));
          setFilterCategories(mapped);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Live suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        // setLoadingSuggestions(false);
        return;
      }
      
      try {
        const response = await api.get(
          `/api/search/suggestions?q=${encodeURIComponent(searchQuery)}&limit=10`
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
    const delay = setTimeout(fetchSuggestions, 600);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  // ✅ Highlight matched part
  const highlightMatch = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span
          key={index}
          className="bg-[#d9d9d9] text-[#1a1713] font-bold px-1 rounded"
        >
          {part}
        </span>
      ) : (
        <span key={index} className="text-[#1a1713] bg-white px-1 rounded">
          {part}
        </span>
      )
    );
  };

  return (
    <div className="w-[1150px] h-[735px] flex bg-[#fefefe] rounded-3xl overflow-hidden">
      <div className="flex mt-8 w-[1086px] h-[476px] ml-8 gap-6 items-start">
        {/* Main Content */}
        <main className="flex flex-col w-[808px] items-start gap-6">
          {/* Search Input */}
          <div className="flex items-center justify-start gap-2 p-4 w-full rounded-[10px] border border-solid border-[#aaaaaa]">
            <SearchIcon className="w-6 h-6" />
            <input
              type="text"
              placeholder="ما الذي تبحث عنه ؟"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              className="flex-1 bg-transparent outline-none text-[#1a1713] placeholder:text-[#545454]"
            />
          </div>

          {/* Suggestions or Common Search */}
          {showSuggestions && (
            <div className="flex h-[136px] items-start justify-between w-full">
              <div className="flex flex-col items-start gap-4 w-full">
                <h3 className="font-h-5 text-[#1a1713]">
                  {searchQuery.trim().length > 0
                    ? "الكلمات المطابقة"
                    : "اقتراحات شائعة"}
                </h3>

                {searchQuery.trim().length > 0 ? (
                  <div className="flex flex-col w-full items-start gap-2">
                    {loadingSuggestions ? (
                      <span className="text-[#888]">جاري التحميل...</span>
                    ) : suggestions.length > 0 && searchQuery.length >0?  (
                      suggestions.map((name, index) => (
                        <Button
                          key={index}
                          variant=""
                          onClick={() => handleSearchClick(name)} // ✅ click event
                          className="flex w-fit h-12 px-4 items-center justify-start gap-2 bg-[white] rounded-[10px] hover:bg-[white]"
                        >
                          <span className="font-placeholder  text-[#1a1713]">
                            {highlightMatch(name)}
                          </span>
                        </Button>
                      ))
                    ) : (
                      <span className="text-[#888]">لا توجد نتائج مطابقة</span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-row flex-wrap items-start gap-4">
                    {commonSearch.length > 0 ? (
                      commonSearch.map((item) => (
                        <Button
                          key={item.id}
                          variant="secondary"
                          onClick={() => handleSearchClick(item.text)} // ✅ click event
                          className="flex w-auto px-4 h-12 items-center justify-start gap-2 bg-[#f2f2f2] rounded-[10px] hover:bg-[#e5e5e5]"
                        >
                          <ClockIcon className="w-6 h-6" />
                          <span className="font-placeholder text-[#1a1713] whitespace-nowrap">
                            {highlightMatch(item.text)}
                          </span>
                        </Button>
                      ))
                    ) : (
                      <span className="text-[#888]">جاري التحميل...</span>
                    )}
                  </div>
                )}
              </div>

              {/* ❌ Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={() => setShowSuggestions(false)}
              >
                <XIcon className="w-6 h-6" />
              </Button>
            </div>
          )}
        </main>

        {/* Sidebar Filters */}
        <aside
          className={`flex flex-col w-[254px] p-4 rounded-[10px] border border-solid border-[#aaaaaa] transition-all duration-300 ${
            isFilterOpen ? "h-[476px]" : "h-[60px]"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <div className="inline-flex items-center justify-center gap-3">
              <img src="/mage_filter.svg" alt="" />
              <div className="font-placeholder text-[#545454]">تصفية</div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              {isFilterOpen ? (
                <ChevronDownIcon className="w-6 h-6 transition-transform duration-300 rotate-180" />
              ) : (
                <ChevronRightIcon className="w-6 h-6 transition-transform duration-300" />
              )}
            </Button>
          </div>

          <div
            className={`flex flex-col items-start gap-4 overflow-hidden transition-all duration-300 ${
              isFilterOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {filterCategories.map((category) => (
  <div key={category.id} className="flex items-center gap-2 w-full">
    <Checkbox
      id={category.id.toString()}
      defaultChecked={category.checked}
      onCheckedChange={(checked) =>
        setFilterCategories((prev) =>
          prev.map((cat) =>
            cat.id === category.id ? { ...cat, checked } : cat
          )
        )
      }
    />
    <label
      htmlFor={category.id.toString()}
      className="font-h-5 text-[#1a1713] cursor-pointer"
    >
      {category.label}
    </label>
  </div>
))}

          </div>
        </aside>
      </div>
    </div>
  );
};
