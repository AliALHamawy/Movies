import React from 'react'
import { Link } from 'react-router'

function SideBar() {
    return (
        <>
            <div className="sideBar fixed right-0  bottom-0  h-[92.6%] bg-transparent border-l border-(--color-border) flex  text-center justify-center flex-col text-2xl items-center text-(--color-main) z-50">
                <ul className='flex flex-col justify-between min-h-40'>
                    <Link className='rotate-90 text-(--color-text)'>Favorite</Link>
                    <Link className='rotate-90 text-(--color-text)'>Contact</Link>
                </ul>
            </div>
        </>
    )
}

export default SideBar