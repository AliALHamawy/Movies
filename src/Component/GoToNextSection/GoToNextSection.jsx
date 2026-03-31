import { AiOutlineArrowDown } from "react-icons/ai"; 
import './GoToNextSection.css'
import { motion } from "framer-motion";

function GoToNextSection({direction,scrollTo}) {

    const handleScroll = () => {
        const targetElement = document.getElementById(scrollTo)
        if(targetElement) {
            targetElement.scrollIntoView({behavior: 'smooth'})
        }
    }

    return (
        <motion.button
        onClick={handleScroll}
                        whileHover={{ scale: 1.1, backgroundColor: "#f59e0b" }}
                        whileTap={{ scale: 0.9 }}
                        className={`z-30 bg-(--color-border) absolute backdrop-blur-md transition-all duration-200 w-[45px] h-[45px] ${direction} rounded-full border border-white/20 flex justify-center items-center`}
                    >
                        <AiOutlineArrowDown className="text-2xl text-white hover:text-black" />
                    </motion.button>
    )
}

export default GoToNextSection