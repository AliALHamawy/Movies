import React from 'react'
import { Link } from 'react-router'

function SideBar() {
    return (
        <>
            <div className="sideBar fixed right-0  bottom-0  h-[92.6%] bg-transparent border-l border-(--color-border) flex  text-center justify-center flex-col text-xl items-center text-(--color-main) z-50">
                <ul className='flex flex-col justify-between min-h-40'>
                    <Link className='rotate-90 text-(--color-text) bg-transparent transition-all text-center py-1 justify-center items-center rounded-md duration-300 w-20 hover:bg-(--color-border)'>Favorite</Link>
                    <Link className='rotate-90 text-(--color-text) bg-transparent transition-all text-center py-1 justify-center items-center rounded-md duration-300 w-20 hover:bg-(--color-border)'>Contact</Link>
                </ul>
            </div>
        </>
    )
}

export default SideBar