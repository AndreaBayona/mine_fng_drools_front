import PropTypes from 'prop-types';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export const Logo = () => {
    return (
     <VerifiedUserIcon></VerifiedUserIcon>
    );
};

Logo.propTypes = {
    color: PropTypes.oneOf(['black', 'primary', 'white'])
};