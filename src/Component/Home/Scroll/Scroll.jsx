import { BiPlay } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import tmdb from "../../../services/tmdb";
import './Scroll.css';
import GoToNextSection from "../../GoToNextSection/GoToNextSection";

function Scroll() {
    // Initialized as null to handle the loading state properly
    const [movieData, setMovieData] = useState(null);
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const [trending, topRated, action, horror] = await Promise.all([
                    tmdb.get('/trending/all/day'),
                    tmdb.get('/movie/top_rated'),
                    tmdb.get('/discover/movie', { params: { with_genres: 28 } }), // Action
                    tmdb.get('/discover/movie', { params: { with_genres: 27 } })  // Horror
                ]);

                const filterData = (arr) => arr.filter(item => 
                    !item.adult && !item.genre_ids?.includes(16)
                );

                setMovieData({
                    trending: filterData(trending.data.results),
                    topRated: filterData(topRated.data.results),
                    action: filterData(action.data.results),
                    horror: filterData(horror.data.results)
                });
            } catch (error) {
                console.error("API ERROR: ", error);
            }
        };
        fetchSections();
    }, []);

    // We assign a 'key' to each row that matches the keys in our movieData object
    const rows = [
        { id: 1, category: "trending", animate: ["0%", "-100%"] },
        { id: 2, category: "topRated", animate: ["-100%", "0%"] },
        { id: 3, category: "action", animate: ["0%", "-100%"] },
        { id: 4, category: "horror", animate: ["-100%", "0%"] },
    ];
    
    if (!movieData) return (
        <div className="h-screen w-full bg-black flex items-center justify-center text-white text-2xl font-bold">
            LOADING...
        </div>
    );
    
    return (
        <div id="Hot" className="scroll relative  h-screen w-full overflow-hidden flex flex-col bg-black">
            <GoToNextSection direction="z-30 bottom-6 left-6" scrollTo="Contact"/>
            {rows.map((row) => {
                // Get the specific movie list for this row
                const currentMovies = movieData[row.category] || [];

                return (
                    <div key={row.id} className="w-full flex h-[25%] overflow-hidden border-b border-white/5">
                        <motion.div 
                            className="flex flex-nowrap h-full"
                            animate={{ x: row.animate }}
                            transition={{
                                ease: "linear",
                                duration: 80, // 300 was very slow; 80 is a smooth cinematic crawl
                                repeat: Infinity,
                            }}
                        >
                            {/* Double the specific row array for the infinite circle */}
                            {[...currentMovies, ...currentMovies].map((item, idx) => {
                                const imagePath = item.poster_path || item.backdrop_path;
                                const fullImageUrl = `${IMG_PATH}${imagePath}`;
                                const displayName = item.title || item.name;

                                return (
                                    <div 
                                        key={`${row.id}-${idx}`}
                                        className="card min-w-[25vw] h-full relative group cursor-pointer bg-neutral-900 border-r border-white/5" 
                                        style={{
                                            backgroundImage: imagePath ? `url(${fullImageUrl})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out px-4">
                                            <BiPlay className="h-[60px] w-[60px] bg-white/10 border border-white/20 text-white rounded-full p-2 mb-3 scale-50 group-hover:scale-100 transition-transform duration-500" />
                                            <h3 className="text-white text-center font-bold text-xl uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500 line-clamp-2">
                                                {displayName}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}

export default Scroll;