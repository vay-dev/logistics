import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for marker icons in React (this is a common issue with Webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ContactMap = () => {
  const mapRef = useRef(null);

  // Your office locations with coordinates
  const offices = [
    {
      city: "Lagos",
      position: [6.5244, 3.3792], // Victoria Island coordinates
      address: "123 Victoria Island, Lagos State",
      phone: "+234 803 123 4567",
      email: "lagos@shipup.ng",
    },
    {
      city: "Abuja",
      position: [9.072264, 7.491302], // Abuja coordinates
      address: "456 Central Business District, Abuja",
      phone: "+234 809 987 6543",
      email: "abuja@shipup.ng",
    },
    {
      city: "Port Harcourt",
      position: [4.8156, 7.0498], // Port Harcourt coordinates
      address: "789 GRA Phase 2, Rivers State",
      phone: "+234 807 555 1234",
      email: "portharcourt@shipup.ng",
    },
  ];

  // Force map to resize after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        // Force the container to have explicit dimensions
        minHeight: "500px",
        position: "relative",
      }}
    >
      <MapContainer
        ref={mapRef}
        center={[7.5, 5.5]} // Center of Nigeria to show all offices
        zoom={10} // Zoom level to see multiple cities
        style={{
          height: "100%",
          width: "100%",
          // Ensure the map takes full container size
          position: "absolute",
          top: 0,
          left: 0,
        }}
        scrollWheelZoom={true} // Allow zoom with mouse wheel
        whenReady={(map) => {
          // Force resize when map is ready
          setTimeout(() => {
            map.target.invalidateSize();
          }, 100);
        }}
      >
        {/* TileLayer provides the map tiles (the actual map visual) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Loop through offices and create a marker for each */}
        {offices.map((office, index) => (
          <Marker key={index} position={office.position}>
            <Popup>
              <div
                style={{
                  minWidth: "200px",
                  fontFamily: "inherit",
                  lineHeight: "1.4",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 15px 0",
                    color: "#2c5aa0",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  🏢 {office.city} Office
                </h3>

                <div style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#333" }}>📍 Address:</strong>
                  <br />
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    {office.address}
                  </span>
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#333" }}>📞 Phone:</strong>
                  <br />
                  <a
                    href={`tel:${office.phone}`}
                    style={{
                      color: "#2c5aa0",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    {office.phone}
                  </a>
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#333" }}>✉️ Email:</strong>
                  <br />
                  <a
                    href={`mailto:${office.email}`}
                    style={{
                      color: "#2c5aa0",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    {office.email}
                  </a>
                </div>

                <button
                  onClick={() => {
                    // Open Google Maps directions
                    const [lat, lng] = office.position;
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                      "_blank"
                    );
                  }}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  🗺️ Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ContactMap;
