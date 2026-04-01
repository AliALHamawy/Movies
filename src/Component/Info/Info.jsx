import { AiOutlineAmazon } from "react-icons/ai";
import { TbBrandDisney, TbBrandNetflix } from "react-icons/tb";
import { SiAppletv } from "react-icons/si";
import './Info.css'
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import tmdb from "../../services/tmdb";

function Info() {
    const { type, id } = useParams()
    const [item, setItem] = useState(null)
    const [media, setMedia] = useState({ trailers: [], backdrops: [] })
    const [activeMedia, setActiveMedia] = useState({ type: 'image', url: '' })
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const endPoint = type === 'movie' ? `/movie/${id}` : `/tv/${id}`
                const mediaEndPoint = type === 'movie' ? `/movie/${id}/images` : `/tv/${id}/images`
                const videoEndPoint = type === 'movie' ? `/movie/${id}/videos` : `/tv/${id}/videos`
                const [detailsRes, imagesRes, videosRes] = await Promise.all([
                    tmdb.get(endPoint),
                    tmdb.get(mediaEndPoint),
                    tmdb.get(videoEndPoint)
                ])
                setItem(detailsRes.data)

                const trailers = videosRes.data.results.filter(v => v.type === "Trailer" && v.site === "YouTube")

                setMedia({
                    trailers: trailers,
                    backdrops: imagesRes.data.backdrops.slice(0, 10)
                })

                setActiveMedia({
                    type: 'image',
                    url: detailsRes.data.backdrop_path ? `${IMG_PATH}${detailsRes.data.backdrop_path}` : ''
                });

            } catch (error) {
                console.error("Error fetching details:", error);
            }
        }
        fetchDetails();
        window.scrollTo(0, 0);
    }, [id, type]);
    if (!item) return <div className="text-white text-center py-20">Loading...</div>;
  return (
        <div className='info flex flex-col p-4 min-h-screen py-20'>
            <div className="abc flex flex-col md:flex-row gap-20 justify-between">
                <img src={item.poster_path ? `${IMG_PATH}${item.poster_path}` : '/assets/placeholder.jpg'} alt={item.title || item.name} className="max-w-[300px] md:max-w-[300px] rounded-lg shadow-2xl" />
                
                <div className="flex flex-col md:flex-row gap-20">
                    <div className="flex flex-row text-center md:text-start">
                        <div className="flex flex-col py-10 gap-5">
                            <h1 className="text-3xl md:text-5xl font-black text-(--color-text)">{item.title || item.name}</h1>
                            <p className="text-xl md:text-2xl max-w-[800px] text-(--color-textlight)">{item.overview || "No description available."}</p>
                            <p className="text-white m-auto lg:m-0 text-[14px] flex flex-row gap-2 shadow-lg bg-(--color-nav) px-4 py-1 rounded-full items-center border border-white/20 font-bold w-[100px]">
                                Rate: <span className="text-amber-500">{item.vote_average?.toFixed(1)}</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="icons mx-10 flex flex-row md:flex-col justify-center text-(--color-text) gap-10">
                    <TbBrandNetflix className="cba w-[200px] h-[50px] bg-(--color-border) border-2 transition-all duration-300 hover:bg-[#e50914] border-white/20 rounded-3xl" />
                    <SiAppletv className="cba w-[200px] h-[50px] bg-(--color-border) border-2 transition-all duration-300 hover:bg-[#000] border-white/20 rounded-3xl" />
                    <AiOutlineAmazon className="cba w-[200px] h-[50px] bg-(--color-border) border-2 transition-all duration-300 hover:bg-[#146eb4] border-white/20 rounded-3xl" />
                    <TbBrandDisney className="cba w-[200px] h-[50px] bg-(--color-border) border-2 transition-all duration-300 hover:bg-[#0d0735] border-white/20 rounded-3xl" />
                </div>
            </div>

            <div className="max-w-screen-lg mt-20 mx-auto w-full">
                <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    {activeMedia.type === 'video' ? (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${activeMedia.url}?autoplay=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img className="w-full h-full object-cover" src={activeMedia.url} alt="Featured" />
                    )}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
                    {media.trailers.length > 0 && (
                        <div 
                            className={`aspect-video cursor-pointer rounded-md overflow-hidden border-2 transition-all ${activeMedia.type === 'video' ? 'border-amber-500 scale-105' : 'border-transparent'}`}
                            onClick={() => setActiveMedia({ type: 'video', url: media.trailers[0].key })}
                        >
                            <div className="relative w-full h-full">
                                <img className="w-full h-full object-cover" src={`https://img.youtube.com/vi/${media.trailers[0].key}/mqdefault.jpg`} alt="Trailer Thumbnail" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center pl-1">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {media.backdrops.map((img, index) => (
                        <div 
                            key={index}
                            className={`aspect-video cursor-pointer rounded-md overflow-hidden border-2 transition-all ${activeMedia.url.includes(img.file_path) ? 'border-amber-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                            onClick={() => setActiveMedia({ type: 'image', url: `${IMG_PATH}${img.file_path}` })}
                        >
                            <img className="w-full h-full object-cover" src={`${IMG_PATH}${img.file_path}`} alt={`gallery-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Info