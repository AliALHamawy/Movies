import { BsFillPlayFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import tmdb from "../../../services/tmdb";
import './Hero.css';

function Hero() {
    const [movie, setMovie] = useState(null);
    const [index, setIndex] = useState(0);

    // قائمة البيانات الدقيقة التي زودتني بها
    const itemsToFetch = [
        { id: 603692, type: 'movie', title: 'John Wick 4' },
        { id: 119051, type: 'tv', title: 'Wednesday' },
        { id: 1399, type: 'tv', title: 'Game of Thrones' },
        { id: 671, type: 'movie', title: 'Harry Potter' },
        { id: 1610413, type: 'tv', title: 'Stranger Things 5' },
        { id: 866398, type: 'movie', title: 'The Beekeeper' },
        { id: 9737, type: 'movie', title: 'Bad Boys' },
        { id: 541671, type: 'movie', title: 'Ballerina' },
        { id: 603, type: 'movie', title: 'The Matrix (1999)' },
        { id: 238, type: 'movie', title: 'The Godfather (1972)' },
        { id: 1396, type: 'tv', title: 'Breaking Bad' },
        { id: 2109, type: 'movie', title: 'Rush Hour' }
    ];

    useEffect(() => {
        const fetchMovieData = async () => {
            // نأخذ الـ id والـ type من العنصر الحالي في القائمة بناءً على الـ index
            const { id, type } = itemsToFetch[index];

            try {
                // جلب البيانات مباشرة باستخدام النوع والآيدي
                const response = await tmdb.get(`/${type}/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie by ID:", error);
            }
        };

        fetchMovieData();

        // تغيير الفيلم تلقائياً كل 8 ثوانٍ
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % itemsToFetch.length);
        }, 8000);

        return () => clearInterval(timer);
    }, [index]);

    if (!movie) return <div className="h-screen bg-black"></div>;

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, scale: 1.1 }} // تأثير زووم بسيط عند البداية
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), transparent), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    }}
                />
            </AnimatePresence>

            <motion.div
                key={movie.id}
                className="cont flex flex-col max-w-[450px] p-4 text-(--color-text) gap-4 absolute bottom-[2%] left-[2%] md:bottom-[27%] lg:bottom-[27%] md:left-[10%] lg:left-[10%] z-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    {movie.title || movie.name}
                </h1>

                <p className="text-md md:text-lg min-h-[120px] max-h-[120px] overflow-hidden opacity-90 line-clamp-4 text-gray-300">
                    {movie.overview}
                </p>

                <div className="flex items-center gap-4">
                    <div className="text-white text-[14px] flex gap-2 shadow-lg bg-(--color-nav) px-4 py-1 rounded-full items-center border border-white/20 font-bold">
                        Rate: <span className="text-amber-500">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-400 font-semibold">
                        {(movie.release_date || movie.first_air_date)?.split('-')[0]}
                    </span>
                </div>

                <div className="flex gap-4 mt-2">
                    <motion.button
                        whileHover={{ scale: 1.1}}
                        whileTap={{ scale: 0.9 }}
                        className="bg-(--color-border) shadow-xl transition-all duration-200 hover:bg-(--hov-bg) w-[160px] h-[45px] rounded-full border border-(--btn-border) flex gap-2 justify-center items-center font-bold">
                        Show Details
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#f59e0b" }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-(--color-border) backdrop-blur-md transition-all duration-200 w-[45px] h-[45px] rounded-full border border-white/20 flex justify-center items-center"
                    >
                        <BsFillPlayFill className="text-2xl text-white hover:text-black" />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

export default Hero;