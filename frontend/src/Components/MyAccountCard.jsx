import PropTypes from 'prop-types';

const MyAccountCard = ({ number, title, description, bgColor, textColor }) => {
  return (
    <div className={`shadow-lg  p-6 max-w-sm w-full ${bgColor}`}>
      {/* Number */}
      <div className={`text-4xl font-bold mb-2 ${textColor ? textColor : 'text-white'}`}>
        {number}
      </div>

      {/* Title */}
      <h2 className={`text-xl font-semibold mb-2 ${textColor ? textColor : 'text-white'}`}>
        {title}
      </h2>

      {/* Description (conditionally render if available) */}
      {description && (
        <p className={`${textColor ? textColor : 'text-white'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

// Add prop types validation
MyAccountCard.propTypes = {
  number: PropTypes.string.isRequired, // Validate 'number' prop
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default MyAccountCard;
