import { BiPlay } from "react-icons/bi";
import { Link } from 'react-router'
import './Hero.css'
import { useState } from "react";
import { useEffect } from "react";
import tmdb from "../../../services/tmdb";

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    // Use TMDB IDs directly (more reliable)
    const itemsToFetch = [
        { id: 603692, type: 'movie', title: 'John Wick 4' },           // John Wick: Chapter 4
        { id: 119051, type: 'tv', title: 'Wednesday' },                 // Wednesday
        { id: 1399, type: 'tv', title: 'Game of Thrones' },             // Game of Thrones (if Squad Game was a typo)
        { id: 671, type: 'movie', title: 'Harry Potter' },              // Harry Potter and the Philosopher's Stone
        { id: 1610413, type: 'tv', title: 'Stranger Things 5' },            // Stranger Things
        { id: 1003596, type: 'movie', title: 'The Beekeeper' },         // The Beekeeper
        { id: 9737, type: 'movie', title: 'Bad Boys' },                 // Bad Boys
        { id: 541671, type: 'movie', title: 'Ballerina' },                 // Ballerina
        { id: 603, type: 'movie', title: 'The Matrix (1999)' },                 // The Matrix (1999)
        { id: 1396, type: 'tv', title: 'Breaking Bad' },                 // Breaking Bad
        { id: 2109, type: 'movie', title: 'Rush Hour' }                 // Rush Hour
    ]

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const results = await Promise.all(
                    itemsToFetch.map(async (item) => {
                        let response;
                        if (item.type === 'movie') {
                            response = await tmdb.get(`/movie/${item.id}`);
                            return {
                                id: response.data.id,
                                title: response.data.title,
                                overview: response.data.overview,
                                backdrop_path: response.data.backdrop_path,
                                poster_path: response.data.poster_path,
                                media_type: 'movie'
                            }
                        } else {
                            response = await tmdb.get(`/tv/${item.id}`);
                            return {
                                id: response.data.id,
                                title: response.data.name,
                                overview: response.data.overview,
                                backdrop_path: response.data.backdrop_path,
                                poster_path: response.data.poster_path,
                                media_type: 'tv'
                            }
                        }
                    })
                )
                setItems(results);
                setLoading(false);
                const validResults = results.filter(result => result !== null);
                setItems(validResults);
                setLoading(false);
            }
            catch (err) {
                console.error(`Error fetching ${items.title}:`, err);
                // Continue with other items even if one fails
            }
        }

        fetchItems();
    }, [])

    useEffect(() => {
        if (items.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length)
        }, 8000)
        return () => clearInterval(interval)
    }, [items.length])

    if (loading || items.length === 0) {
        return (
            <div className="hero ">
                <div className="shadow-(--shadow-main) ">
                    <div className="aaa cont m-auto bg-gray-500 w-full h-70 md:h-screen lg:h-screen  flex items-center justify-center">
                        <div className="text-white">Loading...</div>
                    </div>
                </div>
            </div>
        )
    }
    // if (loading || items.length === 0) {
    //     return (
    //         <div className="hero p-4 md:p-8 lg:p-10 mt-20">
    //             <div className="shadow-(--shadow-main) rounded-2xl">
    //                 <div className="aaa cont m-auto bg-gray-500 w-full h-70 md:h-140 lg:h-160 rounded-3xl flex items-center justify-center">
    //                     <div className="text-white">Loading...</div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    const currentItem = items[currentIndex];
    const backdropUrl = currentItem.backdrop_path
        ? `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`
        : 'https://via.placeholder.com/1920x1080?text=No+Image';

    return (
        <div className="hero mt-20">
            <div className="shadow-(--shadow-main)">
                <div
                    className="aaa cont m-auto w-full h-70 md:h-140 lg:h-160 flex relative shadow-(--shadow-inset)"
                    style={{
                        backgroundImage: `url(${backdropUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent " />
                    <div className="flex flex-col h-[100px] w-[250px] md:h-[200px] md:w-[500px] lg:h-[200px] lg:w-[500px] absolute bottom-20 left-3 md:bottom-20 md:left-10 lg:bottom-20 lg:left-10 text-left gap-1 z-10">
                        <h1 className="text-xl md:text-3xl lg:text-3xl font-black text-(--text-primary) mb-1">{currentItem.title}</h1>
                        <p className="text-(--text-secondary) text-[14px] md:text-[16px] lg:text-[16px] max-h-[110px] h-[110px] overflow-hidden">{currentItem.overview || 'No description available.'}</p>
                        <Link
                            to={`/${currentItem.media_type}/${currentItem.id}`}
                            className="text-[12px] md:text-[14px] lg:text-[14px] flex items-center bg-(--accent-red) text-(--text-primary) transition-all ease-in-out duration-500 hover:bg-(--accent-red-hover) gap-1 w-[190px] rounded-4xl text-center justify-center py-3 md:py-4 lg:py-4"
                        >
                            <BiPlay className="text-xl" />Watch the trailer
                        </Link>
                    </div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-red-600 w-6' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
//     return (
//         <div className="hero p-4 md:p-8 lg:p-10 mt-20">
//             <div className="shadow-(--shadow-main) rounded-4xl">
//                 <div 
//                     className="aaa cont m-auto w-full h-70 md:h-140 lg:h-160 rounded-4xl flex relative shadow-(--shadow-inset)" 
//                     style={{
//                         backgroundImage: `url(${backdropUrl})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         backgroundRepeat: 'no-repeat'
//                     }}
//                 >
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent rounded-3xl" />
//                     <div className="flex flex-col h-[100px] w-[250px] md:h-[200px] md:w-[500px] lg:h-[200px] lg:w-[500px] absolute bottom-20 left-3 md:bottom-20 md:left-10 lg:bottom-20 lg:left-10 text-left gap-1 z-10">
//                         <h1 className="text-xl md:text-3xl lg:text-3xl font-black text-(--text-primary) mb-1">{currentItem.title}</h1>
//                         <p className="text-(--text-secondary) text-[14px] md:text-[16px] lg:text-[16px] max-h-[110px] h-[110px] overflow-hidden">{currentItem.overview || 'No description available.'}</p>
//                         <Link 
//                             to={`/${currentItem.media_type}/${currentItem.id}`}
//                             className="text-[12px] md:text-[14px] lg:text-[14px] flex items-center bg-(--accent-red) text-(--text-primary) transition-all ease-in-out duration-500 hover:bg-(--accent-red-hover) gap-1 w-[190px] rounded-4xl text-center justify-center py-3 md:py-4 lg:py-4"
//                         >
//                             <BiPlay className="text-xl" />Watch the trailer
//                         </Link>
//                     </div>
//                     <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
//                         {items.map((_, idx) => (
//                             <button
//                                 key={idx}
//                                 onClick={() => setCurrentIndex(idx)}
//                                 className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-red-600 w-6' : 'bg-white/50'
//                                     }`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default Hero