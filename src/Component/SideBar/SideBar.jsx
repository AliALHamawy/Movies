import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SideBar() {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0); 
    
    const navLinks = [
        { id: 1, label: 'Home', target: 'Home' },
        { id: 2, label: 'Hot', target: 'Hot' },
        { id: 3, label: 'Contact', target: 'Contact' }
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            threshold: 0.5, // Trigger when 50% of the section is visible
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = navLinks.findIndex(link => link.target === entry.target.id);
                    if (index !== -1) setActiveIndex(index);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navLinks.forEach((link) => {
            const section = document.getElementById(link.target);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

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
                            onClick={() => scrollToSection(link.target)}
                            // DOT LOGIC: Amber if hovered OR if it's the current section
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                (hoverIndex === index || activeIndex === index) 
                                ? 'bg-amber-500 w-8 scale-110' 
                                : 'bg-(--color-text) w-6 opacity-40'
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
                                {/* LABEL LOGIC: ONLY show if physically hovering */}
                                {hoverIndex === index && (
                                    <motion.a
                                        href={`#${link.target}`}
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