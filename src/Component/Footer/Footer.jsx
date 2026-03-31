import { RxDotFilled } from "react-icons/rx"; 
import './Footer.css'

function Footer() {
  return (
    <div className="footer px-4 md:px-8 lg:px-8  translate-y-[100%]">
      <div className="cont border-t-3 border-(--color-textlight) pb-4 pt-6 text-(--text-secondary) w-full ">
        <RxDotFilled className="text-3xl absolute -translate-x-[17px] -translate-y-[40px] text-(--color-textlight)  flex-row"/>
        <div className="flex text-(--color-text)">Created with <span className="text-red-800">❤</span> By <a href="#">ALI AL-HAMAWY</a></div>
      </div>
    </div>
  )
}

export default Footer