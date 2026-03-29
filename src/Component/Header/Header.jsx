import { BiSearchAlt2 } from "react-icons/bi"; 

import './Header.css'
function Header() {
  return (
    <>
    <nav className="header text-(--text-secondary) fixed top-0 left-0 w-full z-50">
      <div className="cont h-[70px] flex justify-between w-full gap-2 px-2 md:p-10 lg:p-10 bg-transperant items-center m-auto">
        <div className="logo">
          <img src="/assets/Gemini_Generated_Image_n29w6en29w6en29w-removebg-preview.png" alt="" className='h-[10px]'/>
        </div>
        <div className="links">
          <ul className='flex gap-5 '>
            <li className="transition-all duration-300 border border-transparent hover:text-(--accent-red-hover) hover:border-b-(--accent-red-hover) h-full py-[7px] font-bold">Home</li>
            <li className="transition-all duration-300 border border-transparent hover:text-(--accent-red-hover) hover:border-b-(--accent-red-hover) h-full py-[7px] font-bold">Movies</li>
            <li className="transition-all duration-300 border border-transparent hover:text-(--accent-red-hover) hover:border-b-(--accent-red-hover) h-full py-[7px] font-bold">Series</li>
          </ul>
        </div>
        <div className="search text-xl transition-all duration-300 hover:text-(--accent-red-hover) font-black"><BiSearchAlt2 /></div>
      </div>
    </nav>
    </>
  )
// function Header() {
//   return (
//     <>
//     <nav className="header text-(--text-secondary) fixed top-0 left-0 w-full z-50">
//       <div className="cont h-[70px] flex justify-between w-full gap-2 px-2 md:p-10 lg:p-10 bg-(--bg-nav) shadow-(--shadow-main) items-center m-auto">
//         <div className="logo">
//           <img src="/assets/Gemini_Generated_Image_n29w6en29w6en29w-removebg-preview.png" alt="" className='h-[10px]'/>
//         </div>
//         <div className="links">
//           <ul className='flex gap-5 '>
//             <li className="transition-all duration-300 border border-transparent hover:text-(--accent-red-hover) hover:border-b-(--accent-red-hover) h-full py-[27px] font-bold">Home</li>
//             <li className="transition-all duration-300 border border-transparent hover:text-(--accent-red-hover) hover:border-b-(--accent-red-hover) h-full py-[27px] font-bold">Movies</li>
//             <li className="transition-all duration-300 border border-transparent hover:text-(--accent-red-hover) hover:border-b-(--accent-red-hover) h-full py-[27px] font-bold">Series</li>
//           </ul>
//         </div>
//         <div className="search text-xl transition-all duration-300 hover:text-(--accent-red-hover) font-black"><BiSearchAlt2 /></div>
//       </div>
//     </nav>
//     </>
//   )
}

export default Header