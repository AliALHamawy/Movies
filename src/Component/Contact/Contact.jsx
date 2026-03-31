import { motion } from 'framer-motion'
import './Contact.css'

function Contact() {
    return (
        <>
            <div id='Contact' className="contact bg-cover px-4 bg-center bg-no-repeat pb-10 bg-cover mt-30" style={{ backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
                <div className=" py-4  max-w-[800px] h-182 rounded-2xl m-auto bg-transparent backdrop-blur-2xl border border-[rgba(255,255,255,.5)]">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

                        <div className="mb-10 md:mb-16 flex flex-col gap-4 text-left items-start">
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-(--color-text)">Get in touch</h2>

                            <p className="mx-auto text-gray-500 md:text-lg max-w-[500px] ml-0 text-left ">I will recive your message</p>
                        </div>



                        <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="mb-2 inline-block text-sm text-(--color-text) sm:text-base">Name*</label>
                                <input name="first-name" className="w-full rounded border transition-all duration-300 outline-none focus:border-amber-500  search-bg px-3 py-2 text-(--color-text) " />
                            </div>



                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="mb-2 inline-block text-sm text-(--color-text) sm:text-base">Email*</label>
                                <input name="email" className="w-full rounded border  transition-all duration-300 outline-none focus:border-amber-500 search-bg px-3 py-2 text-(--color-text)  " />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="subject" className="mb-2 inline-block text-sm text-(--color-text) sm:text-base">Subject*</label>
                                <input name="subject" className="w-full rounded border transition-all duration-300 outline-none focus:border-amber-500  search-bg px-3 py-2 text-(--color-text) " />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="mb-2 inline-block text-sm text-(--color-text) sm:text-base">Message*</label>
                                <textarea name="message" className="h-40 w-full resize-none rounded border search-bg px-3 py-2 text-(--color-text) outline-none transition-all duration-300 focus:border-amber-500 ring-indigo-300 "></textarea>
                            </div>

                            <div className="flex items-center justify-between sm:col-span-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-(--color-border) shadow-xl transition-all text-(--color-text) duration-200 hover:bg-amber-500 w-[100px] h-[34px] rounded-full border border-(--btn-border) flex gap-2 justify-center items-center font-bold">
                                    Send
                                </motion.button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact