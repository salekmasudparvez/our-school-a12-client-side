

import logo from '../../../assets/logo/logo.svg'
import { PropTypes } from 'prop-types';

const Logo = ({css}) => {
    return (
        <div className={`inline-flex ${css}`}>
            <div className=' my-auto'>
                <img className='md:h-12 md:w-12 w-10 h-10' src={logo} alt="O.S." />
            </div>
            <div className='w-40 my-auto'>
                <h1 className='uppercase  text-lg font-bold font-sans '><span className='text-first'>Our</span> <span className='text-second'>School</span></h1>
            </div>
        </div>
    );
};
Logo.propTypes={
    css:PropTypes.string,
}
export default Logo;