import { BiSearchAlt2 } from "react-icons/bi"; 

import './Header.css'
import { Link } from "react-router";
function Header() {
  return (
    <>
    <nav className="flex py-5 px-3 bg-transparent absolute top-0 left-0 w-[100%] z-50 justify-between border-b-1 border-b-(--color-border)">
      <div className="left flex w-[700px] justify-between">
        <img src="/assets/Gemini_Generated_Image_n29w6en29w6en29w-removebg-preview.png" alt="" className="w-32.5"/>
        <ul className="flex gap-20 text-xl text-(--color-main)">
          <Link className="text-(--color-text)">Home</Link>
          <Link className="text-(--color-text)">Movies</Link>
          <Link className="text-(--color-text)">Series</Link>
          <Link className="text-(--color-text)">Category</Link>
        </ul>
      </div>
      <div className="right flex items-center">
        <input type="text" id="aaa" className="bg-gray-300 p-1 text-(--color-text) px-2 outline-0" placeholder="John Wick 4"/>
        <label htmlFor="aaa" className=" bg-(--color-main) h-[32px] w-[36px] text-(--color-text) flex justify-center text-xl items-center"><BiSearchAlt2 /></label>
      </div>
    </nav>
    </>
  )

}

export default Header