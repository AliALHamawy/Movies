import { BiSearchAlt2 } from "react-icons/bi";
import { motion } from "framer-motion";
import './Header.css'
import { useState } from "react";
import { Link } from "react-router";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2
        }}
        className="top-0 inset-x-0 flex z-50 w-full text-sm fixed px-4"
      >
        <nav className="mt-4 bg-(--color-nav) relative text-(--color-text) max-w-2xl w-full border-transparent border-(--color-border) rounded-[24px] mx-2 flex flex-wrap md:flex-nowrap items-center justify-between mx-auto px-4 py-1">
          <div className="flex">
            <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="index.html" aria-label="Preline">
              <img src="/assets/Gemini_Generated_Image_h25dx9h25dx9h25d-removebg-preview.png" alt="Logo" className="w-20 h-auto" />
            </a>
          </div>

          <div className="transition-all text-[16px] md:text-[18.5px] lg:text-[18.5px] gap-4 duration-300 flex justify-between items-center w-[170px] md:w-[200px] m-auto">
            <Link className="transition-all duration-300 hover:scale-110 z-50 m-auto hover:text-yellow-500" to="/">Home</Link>
            <Link className="transition-all duration-300 hover:scale-110 z-50 m-auto hover:text-yellow-500" to="/movies">Movies</Link>
            <Link className="transition-all duration-300 hover:scale-110 z-50 m-auto hover:text-yellow-500" to="/series">Series</Link>
          </div>

          <div className="flex items-center relative gap-1 md:order-4 md:ms-4">
            <input
              type="text"
              id="aaa"
              className={`bg-(--search-bg-mobile) z-100 md:bg-(--search-bg) lg:bg-(--search-bg) absolute right-7 transition-all duration-300 text-(--color-text) overflow-hidden border focus:border-amber-500 ${isSearchOpen
                  ? 'w-[150px] border p-1 border-(--color-border) px-2 outline-0 z-30 rounded-2xl opacity-100'
                  : 'w-0 border-none p-0 opacity-0 pointer-events-none'
                }`}
              placeholder="search..."
            />
            <BiSearchAlt2
              className={`text-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:text-amber-500 ${isSearchOpen ? 'text-amber-500' : ''} transition-transform`}
              onClick={toggleSearch}
            />
          </div>
        </nav>
      </motion.header>
    </>
  )
}

export default Header;