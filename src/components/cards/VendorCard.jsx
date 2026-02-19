import "./VendorCard.css";
import BlueBadge from "../badges/BlueBadge";
import GreenBadge from "../badges/GreenBadge";

const VendorCard = ({ vendor }) => {
  return (
    <div className="vendor-card">
      <div className="vendor-header">
        <h3 className="vendor-name">{vendor.name}</h3>
        {vendor.communityVerified && <BlueBadge />}
        {vendor.platformVerified && <GreenBadge />}
      </div>

      <p className="vendor-handle">@{vendor.handle}</p>

      <p className="vendor-rating">
        {vendor.rating} ({vendor.reviews} reviews)
      </p>

      <button className="vendor-button">
        View Profile
      </button>
    </div>
  );
};

export default VendorCard;