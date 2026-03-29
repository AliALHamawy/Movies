import { AiFillPlayCircle } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { useState } from 'react'
import './Scroll.css'
import { Link } from "react-router";
import { useRef } from "react";
import { useEffect } from "react";
import tmdb from "../../../services/tmdb";
function Scroll() {
  const [topSeries, setTopSeries] = useState([])
  const [bottomMovies, setBottomMovies] = useState([])
  const [loading, setLoading] = useState([])
  const topScrollRef = useRef(null)
  const bottomScrollRef = useRef(null)
  const [isTopHovered, setIsTopHovered] = useState(false)
  const [isBottomHovered, setIsBottomHovered] = useState(false)
  const topAnimationRef = useRef(null)
  const bottomAnimationRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serisResponse = await tmdb.get('/tv/popular', {
          params: { page: 1 }
        })

        const moviesResponse = await tmdb.get('/movie/popular', {
          params: { page: 1 }
        })
        setTopSeries(serisResponse.data.results.slice(0, 50))
        setBottomMovies(moviesResponse.data.results.slice(0, 50))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const duplicatedSeries = [...topSeries, ...topSeries, ...topSeries]
  const duplicatedMovies = [...bottomMovies, ...bottomMovies, ...bottomMovies]

  const scrollTop = () => {
    if (topScrollRef.current && !isTopHovered) {
      const { scrollLeft, scrollWidth, clientWidth } = topScrollRef.current

      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        topScrollRef.current.scrollLeft = 1
      } else {
        topScrollRef.current.scrollLeft += 1
      }
    }
  }

  const scrollBottom = () => {
    if (bottomScrollRef.current && !isBottomHovered) {
      const { scrollLeft } = bottomScrollRef.current
      if (scrollLeft <= 1) {
        bottomScrollRef.current.scrollLeft = bottomScrollRef.current.scrollWidth - bottomScrollRef.current.clientWidth - 1
      } else {
        bottomScrollRef.current.scrollLeft -= 1
      }
    }
  }

  useEffect(() => {
    topAnimationRef.current = setInterval(scrollTop, 20)
    bottomAnimationRef.current = setInterval(scrollBottom, 20)

    return () => {
      if (topAnimationRef.current) clearInterval(topAnimationRef.current)
      if (bottomAnimationRef.current) clearInterval(bottomAnimationRef.current)
    }

  }, [isTopHovered, isBottomHovered])

  if (loading) {
    return (
      <div className="scroll relative mt-8">
        <div className="cont overflow-hidden flex flex-col gap-1 m-auto">
          <div className="flex flex-col m-auto text-center my-10 gap-4 p-2">
            <h1 className="text-3xl md:text-4xl lg:text-4xl uppercase italic text-(--text-primary)">Most Populare</h1>
            <p className="text-[14px] md:text-xl lg:text-xl text-(--text-secondary)">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="scroll relative mt-8">
      <div className="cont  overflow-hidden flex flex-col gap-1 m-auto">
        <div className="flex flex-col m-auto text-center my-10 gap-4 p-2">
          <h1 className="text-3xl md:text-4xl lg:text-4xl uppercase italic text-(--text-primary)">Most Populare</h1>
          <p className="text-[14px] md:text-xl lg:text-xl text-(--text-secondary)">Watch the Top Rate Movies and Sires Here </p>
        </div>



        <div className="top flex  flex-col">
          {/* <Link className="flex gap-2 text-2xl pl-4 items-center text-(--text-secondary)">Seris<BiChevronRight className="translate-y-0.5" /></Link> */}
          <div ref={topScrollRef}
            className="flex overflow-x-auto scrollbar-hide  "
            style={{ scrollBehavior: 'auto', cursor: 'grab' }}
            onMouseEnter={() => setIsTopHovered(true)}
            onMouseLeave={() => setIsTopHovered(false)}>

            {duplicatedSeries.map((item, index) => (
              <Link
                key={`top-${item.id}-${index}`}
                to={`/tv/${item.id}`}
                className='card h-30 min-w-40 md:h-80 md:min-w-100 lg:h-80 lg:min-w-100 bg-amber-300 shadow-(--shadow-main) bg-cover flex flex-col text-(--text-primary) text-center relative transition-all duration-300 hover:z-30 hover:scale-3d hover:min-w-70 md:hover:min-w-125 lg:hover:min-w-125 focus:min-w-50 md:focus:min-w-125 lg:focus:min-w-125 grayscale-100 hover:grayscale-0'
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path || item.poster_path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                <AiFillPlayCircle className="play text-(--text-primary-trans) text-4xl md:text-5xl lg:text-5xl absolute top-[50%] left-[50%] -translate-[50%] opacity-0 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>


        <div className="bottom flex  flex-col">
          {/* <Link className="flex gap-2 text-2xl pl-4 items-center text-(--text-secondary)">Seris<BiChevronRight className="translate-y-0.5" /></Link> */}
          <div ref={bottomScrollRef}
            className="flex overflow-x-auto scrollbar-hide  "
            style={{ scrollBehavior: 'auto', cursor: 'grab' }}
            onMouseEnter={() => setIsBottomHovered(true)}
            onMouseLeave={() => setIsBottomHovered(false)}>

            {duplicatedMovies.map((item, index) => (
              <Link
                key={`bottom-${item.id}-${index}`}
                to={`/movie/${item.id}`}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path || item.poster_path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className='card h-30 min-w-40 md:h-80 md:min-w-100 lg:h-80 lg:min-w-100 bg-amber-300 shadow-(--shadow-main) bg-cover flex flex-col text-(--text-primary) text-center relative transition-all duration-300 hover:z-30 hover:scale-3d hover:min-w-70 md:hover:min-w-125 lg:hover:min-w-125 focus:min-w-50 md:focus:min-w-125 lg:focus:min-w-125 grayscale-100 hover:grayscale-0'>
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