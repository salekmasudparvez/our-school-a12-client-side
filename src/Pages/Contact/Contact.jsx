

const Contact = () => {
    return (
        <div className="grid max-w-screen-xl pt-[107px] grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 text-gray-800">
            <div className="flex flex-col justify-between items-center">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let&apos;s talk!</h2>
                    <div className="text-gray-400">For contacting us, please fill out this form</div>
                </div>
                <img src="https://i.ibb.co/3RbDbdG/undraw-Reminder-re-fe15.png" alt="" className="p-6 object-contain" />
            </div>
            <form noValidate="" className="space-y-6">
                <div>
                    <label htmlFor="name" className="text-sm">Full name</label>
                    <input id="name" type="text" placeholder="" className="w-full p-3 rounded bg-gray-100" />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <input id="email" type="email" className="w-full p-3 rounded bg-gray-100" />
                </div>
                <div>
                    <label htmlFor="message" className="text-sm">Message</label>
                    <textarea id="message" rows="3" className="w-full p-3 rounded bg-gray-100"></textarea>
                </div>
                <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-first text-gray-100">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;