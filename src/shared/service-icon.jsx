import "./styles/service-icon.scss";

const ServiceIcon = ({
  iconClass,
  bgColor = "#fff",
  iconColor = "#ff6b61",
}) => {
  return (
    <div className="icon-wrapper">
      <div className="icon-bg" style={{ backgroundColor: bgColor }}>
        <i className={iconClass} style={{ color: iconColor }}></i>
      </div>
    </div>
  );
};

export default ServiceIcon;
