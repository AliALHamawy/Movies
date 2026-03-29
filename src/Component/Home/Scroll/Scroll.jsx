import { AiFillPlayCircle } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { useState } from 'react'
import './Scroll.css'
import { Link } from "react-router";
export const abc = [
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
  { n: "ali" },
]

function Scroll() {
  const [card, setCard] = useState(abc)
  return (
    <div className="scroll relative mt-8">
      <div className="cont  overflow-hidden flex flex-col gap-1 m-auto">
        <div className="flex flex-col m-auto text-center my-10 gap-4 p-2">
          <h1 className="text-3xl md:text-4xl lg:text-4xl uppercase italic text-(--text-primary)">Movies&Sires</h1>
          <p className="text-[14px] md:text-xl lg:text-xl text-(--text-secondary)">Watch the Top Rate Movies and Sires Here </p>
        </div>
        <div className="top flex  flex-col">
          {/* <Link className="flex gap-2 text-2xl pl-4 items-center text-(--text-secondary)">Seris<BiChevronRight className="translate-y-0.5" /></Link> */}
          <div className="flex">

            {card.map((item) => (
              <Link className='card h-30 min-w-40 md:h-80 md:min-w-100 lg:h-80 lg:min-w-100 bg-amber-300 shadow-(--shadow-main) bg-cover flex flex-col text-(--text-primary) text-center relative transition-all duration-300 hover:z-30 hover:scale-3d hover:min-w-70 md:hover:min-w-125 lg:hover:min-w-125 focus:min-w-50 md:focus:min-w-125 lg:focus:min-w-125'>
                <AiFillPlayCircle className="play text-(--text-primary-trans) text-4xl md:text-5xl lg:text-5xl absolute top-[50%] left-[50%] -translate-[50%] opacity-0 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
        <div className="bottom flex  flex-col gap-4">
          {/* <Link className="flex gap-2 text-2xl pl-4 items-center text-(--text-secondary)">Movies<BiChevronRight className="translate-y-0.5" /></Link> */}
          <div className="flex ">

            {card.map((item) => (
              <Link className='card h-30 min-w-40 md:h-80 md:min-w-100 lg:h-80 lg:min-w-100 bg-amber-300 shadow-(--shadow-main) bg-cover flex flex-col text-(--text-primary) text-center relative transition-all duration-300 hover:z-30 hover:scale-3d hover:min-w-70 md:hover:min-w-125 lg:hover:min-w-125 focus:min-w-50 md:focus:min-w-125 lg:focus:min-w-125'>
                <AiFillPlayCircle className="play text-(--text-primary-trans) text-4xl md:text-5xl lg:text-5xl absolute top-[50%] left-[50%] -translate-[50%] opacity-0 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
// function Scroll() {
//   const [card, setCard] = useState(abc)
//   return (
//     <div className="scroll relative mt-8">
//       <div className="cont p-4 overflow-hidden max-w-[96%] m-auto">
//         <div className="top flex  flex-col gap-4">
//           <Link className="flex gap-2 text-2xl pl-4 items-center text-(--text-secondary)">Seris<BiChevronRight className="translate-y-0.5" /></Link>
//           <div className="flex gap-6">

//             {card.map((item) => (
//               <Link className='card h-30 min-w-40 md:h-55 md:min-w-70 lg:h-55 lg:min-w-70 bg-amber-300 shadow-(--shadow-main) rounded-2xl flex flex-col text-(--text-primary) text-center relative'>
//                 <AiFillPlayCircle className="play text-(--text-primary-trans) text-4xl md:text-5xl lg:text-5xl absolute top-[50%] left-[50%] -translate-[50%] opacity-0 transition-all duration-300"/>
//               </Link>
//             ))}
//           </div>
//         </div>
//         <div className="bottom mt-10 flex  flex-col gap-4">
//           <Link className="flex gap-2 text-2xl pl-4 items-center text-(--text-secondary)">Movies<BiChevronRight className="translate-y-0.5" /></Link>
//           <div className="flex gap-6">

//             {card.map((item) => (
//               <Link className='card h-30 min-w-40 md:h-55 md:min-w-70 lg:h-55 lg:min-w-70 bg-amber-300 shadow-(--shadow-main) rounded-2xl flex flex-col text-(--text-primary) text-center relative'>
//                 <AiFillPlayCircle className="play text-(--text-primary-trans) text-4xl md:text-5xl lg:text-5xl absolute top-[50%] left-[50%] -translate-[50%] opacity-0 transition-all duration-300"/>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default Scroll