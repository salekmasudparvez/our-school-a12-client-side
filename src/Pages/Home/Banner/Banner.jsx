import { ParallaxBanner } from 'react-scroll-parallax';
const Banner = () => {
    const background = {
        image:
            'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        translateY: [0, 50],
        opacity: [1, 0.3],
        scale: [1.05, 1, 'easeOutCubic'],
        shouldAlwaysCompleteAnimation: true,
        
    };

    const headline = {
        translateY: [0, 30],
        scale: [1, 1.05, 'easeOutCubic'],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className={`absolute  inset-0 flex items-center justify-start md:px-16 object-cover px-3`}>
                <div className="md:text-5xl text-3xl  text-white font-bold">Welcome to <br />
                    <div className=' flex'>
                        <h1 className='uppercase  font-bold font-sans '><span className='text-first'>Our</span> <span className='text-second'>School</span></h1>
                    </div>
                </div>
            </div>
        ),
    };

    const foreground = {
        image:
            'https://i.ibb.co/2PHwPRT/banner-1.png',
        translateY: [0, 15],
        scale: [1, 1.1, 'easeOutCubic'],
        shouldAlwaysCompleteAnimation: true,
    };

    const gradientOverlay = {
        opacity: [0, 0.9],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
        ),
    };

    return (
        <div className='h-[400px] md:h-full object-cover'>
            <ParallaxBanner
                layers={[background, headline, foreground, gradientOverlay]}
                className="aspect-[2/1] py-32 bg-gray-900 h-full"
            />
        </div>
    );
};

export default Banner;