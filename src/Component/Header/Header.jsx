import { BiSearchAlt2 } from "react-icons/bi"; 
import { motion } from "framer-motion"; // 1. استيراد المكتبة
import './Header.css'
import { useState } from "react";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  }

  return (
    <>
      {/* 2. تحويل الـ header إلى motion.header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }} // يبدأ خارج الشاشة من الأعلى مع شفافية 0
        animate={{ y: 0, opacity: 1 }}    // يتحرك لمكانه الطبيعي مع شفافية 1
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.2 // تأخير بسيط ليعطي شعوراً احترافياً عند التحميل
        }}
        className="top-0 inset-x-0 flex z-50 w-full text-sm fixed px-4"
      >
        <nav className="mt-4 bg-(--color-nav) relative text-(--color-text) max-w-2xl w-full border border-(--color-border) rounded-[24px] mx-2 flex flex-wrap md:flex-nowrap items-center justify-between mx-auto px-4 py-1">
          <div className="flex">
            <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="index.html" aria-label="Preline">
              <img src="/assets/Gemini_Generated_Image_h25dx9h25dx9h25d-removebg-preview.png" alt="Logo" className="w-20 h-auto"/>
            </a>
          </div>

          <div className="overflow-hidden transition-all duration-300 flex justify-between items-center w-[170px] md:w-[200px] m-auto">
            <a href="#">Home</a>
            <a href="#">Movies</a>
            <a href="#">Series</a>
          </div>

          <div className="flex items-center relative gap-1 md:order-4 md:ms-4">
            <input 
              type="text" 
              id="aaa" 
              className={`bg-(--search-bg) absolute right-7 transition-all duration-300 text-(--color-text) overflow-hidden ${
                isSearchOpen 
                ? 'w-[150px] border p-1 border-(--color-border) px-2 outline-0 rounded-2xl opacity-100' 
                : 'w-0 border-none p-0 opacity-0 pointer-events-none'
              }`} 
              placeholder="search..."
            />
            <BiSearchAlt2 
              className="text-xl cursor-pointer hover:scale-110 transition-transform" 
              onClick={toggleSearch} 
            />
          </div>
        </nav>
      </motion.header>
    </>
  )
}

export default Header;