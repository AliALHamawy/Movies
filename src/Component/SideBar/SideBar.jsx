import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SideBar() {
    const [hoverIndex, setHoverIndex] = useState(null);
    
    const navLinks = [
        { id: 1, label: 'Home', target: 'Home' },
        { id: 2, label: 'Hot', target: 'Hot' },
        { id: 3, label: 'Contact', target: 'Contact' }
    ];

    // Function to handle smooth scroll manually if needed
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="sideBar fixed -right-7 bottom-[50%] translate-y-[50%] z-30 rotate-90 flex flex-col">
            {/* Dot Container */}
            <div className="cont flex bg-(--color-nav) items-center justify-center px-1 h-[40px] w-[150px] rounded-4xl border border-white/10 shadow-2xl">
                <ul className="flex gap-4">
                    {navLinks.map((link, index) => (
                        <li 
                            key={link.id} 
                            onClick={() => scrollToSection(link.target)} // Click the dot to scroll
                            className={`h-2 w-6 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                                hoverIndex === index ? 'bg-amber-500' : 'bg-(--color-text)'
                            }`} 
                            onMouseEnter={() => setHoverIndex(index)} 
                            onMouseLeave={() => setHoverIndex(null)}
                        />
                    ))}
                </ul>
            </div>

            {/* Labels Container */}
            <div className="absolute -rotate-90 translate-x-[27px] translate-y-[23px] pointer-events-none">
                <ul className='flex flex-col gap-3'>
                    {navLinks.map((link, index) => (
                        <li key={link.id} className="h-8 w-24 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {hoverIndex === index && (
                                    <motion.a
                                        href={`#${link.target}`} // Native anchor link
                                        initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className="bg-amber-500 text-white px-4 py-1 rounded-3xl whitespace-nowrap shadow-lg cursor-pointer pointer-events-auto"
                                    >
                                        {link.label}
                                    </motion.a>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;