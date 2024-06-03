
import { PropTypes } from 'prop-types';

const HeaderTitle = ({ heading, title }) => {
    return (
        <div className="text-center space-y-4 py-6">
            <h1 className="md:text-5xl text-3xl font-bold uppercase font-sans">{heading}</h1>
            <p className="text-second">{title}</p>
        </div>
    );
};

HeaderTitle.propTypes = {
    heading: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default HeaderTitle;