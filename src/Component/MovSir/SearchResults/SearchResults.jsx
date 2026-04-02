import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from 'react-router-dom';
import tmdb from '../../../services/tmdb';
import './MovSir.css'; // Reuse your existing styles

function SearchResults() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const query = searchParams.get('q') || "";
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

    // Same filters from your MovSir component
    const forbiddenIds = [879945, 1646787, 45933, 1650558, 1266990, 1489, 95897, 67136, 203737, 1301994, 687259, 79871, 1064028, 860410, 398818, 1015998, 519465, 1847, 1297842, 1652947, 346698, 228091];
    const forbiddenKeywords = ['lgbt', 'gay', 'lesbian', 'queer', 'bisexual', 'sex', 'erotic', 'porn', 'nudity', 'sensual', 'lust', 'prostitute', 'stripper', 'sexual', "The Unknown Man", "SunDutan"];

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const response = await tmdb.get('/search/multi', {
                    params: {
                        query: query,
                        page: page,
                        include_adult: false,
                    }
                });

                const filteredResults = response.data.results.filter(item => {
                    // Filter out people and Japanese content
                    if (item.media_type === 'person') return false; 
                    if (item.adult || item.original_language === 'ja') return false;
                    
                    const isForbiddenId = forbiddenIds.includes(item.id);
                    const title = (item.title || item.name || '').toLowerCase();
                    const overview = (item.overview || '').toLowerCase();

                    const hasForbiddenKeyword = forbiddenKeywords.some(keyword =>
                        title.includes(keyword) || overview.includes(keyword)
                    );

                    return !isForbiddenId && !hasForbiddenKeyword;
                });

                setData(filteredResults);
            } catch (error) {
                console.error("Search Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
        window.scrollTo(0, 0);
    }, [query, page]);

    if (loading) return <div className="h-screen flex items-center justify-center text-white text-2xl">Searching...</div>;

    return (
        <div className="movSir mt-25 flex flex-col text-left min-h-[76vh]">
            <h1 className='my-15 text-(--color-text) text-4xl font-black m-auto '>
                Results for: <span className="text-amber-500">{query}</span>
            </h1>

            {data.length === 0 ? (
                <div className="text-white text-center text-xl mt-10">No results found for "{query}"</div>
            ) : (
                <div className='flex gap-6 px-4 justify-center flex-wrap m-8 mb-10'>
                    {data.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-(--search-bg) max-h-[690px] pb-6 rounded-lg shadow-2xl w-full sm:w-[350px] border border-(--btn-border) overflow-hidden flex flex-col justify-between"
                        >
                            <img
                                src={item.poster_path ? `${IMG_PATH}${item.poster_path}` : '/assets/placeholder.jpg'}
                                alt={item.title || item.name}
                                className='w-full h-[450px] object-cover'
                            />
                            <div className="flex flex-col p-4 gap-3">
                                <h1 className='text-xl font-bold text-(--color-text) truncate'>{item.title || item.name}</h1>
                                <p className='text-sm text-gray-400 line-clamp-3 text-left h-[90px]'>
                                    {item.overview || "No description available."}
                                </p>

                                <div className="flex justify-between items-center mt-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-(--color-border) shadow-xl transition-all duration-200 hover:bg-amber-500 px-6 py-2 rounded-full border border-(--btn-border) font-bold text-(--color-text)"
                                        onClick={() => navigate(`/details/${item.media_type}/${item.id}`)}
                                    >
                                        Show Details
                                    </motion.button>
                                    <span className="text-amber-500 font-bold">
                                        ★ {item.vote_average?.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Pagination UI - Same as MovSir */}
            {data.length > 0 && (
                <ul className="flex space-x-5 justify-center mb-10 items-center">
                    <li onClick={() => setPage(p => Math.max(1, p - 1))} className={`flex items-center justify-center shrink-0 bg-(--color-border) w-10 h-10 rounded-md cursor-pointer ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-300" viewBox="0 0 55.753 55.753">
                            <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                        </svg>
                    </li>
                    {/* ... (Keep your 1 to 5 array mapping logic here) ... */}
                    <li onClick={() => setPage(p => p + 1)} className="flex items-center justify-center shrink-0 cursor-pointer bg-(--color-border) w-10 h-10 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-300 rotate-180" viewBox="0 0 55.753 55.753">
                            <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                        </svg>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default SearchResults;