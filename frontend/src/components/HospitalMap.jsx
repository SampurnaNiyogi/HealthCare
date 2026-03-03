import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import UseGeoLocation from "./UseGeoLocation";

// Custom hospital icon
const hospitalIcon = new L.DivIcon({
    html: `<div style="
      width: 24px;
      height: 24px;
      background: red;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
      font-weight: bold;
    ">+</div>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
});

// Custom user icon
const userIcon = new L.DivIcon({
    html: `<div style="
      width: 18px;
      height: 18px;
      background: blue;
      border-radius: 50%;
      border: 2px solid white;
    "></div>`,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

export default function HospitalMap({ onHospitalsFetched }) {
    const { location, error } = UseGeoLocation();
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        async function fetchHospitals(lat, lon) {
            const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:2000,${lat},${lon});
          way["amenity"="hospital"](around:2000,${lat},${lon});
          relation["amenity"="hospital"](around:2000,${lat},${lon});
        );
        out center;
      `;
            const res = await fetch(
                "https://overpass-api.de/api/interpreter?data=" +
                encodeURIComponent(query)
            );
            const data = await res.json();
            setHospitals(data.elements);
            onHospitalsFetched?.(data.elements);
        }

        if (location) {
            fetchHospitals(location.latitude, location.longitude);
        }
    }, [location]);

    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!location) return <p>Fetching your location...</p>;

    return (
        <div>
            <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={14}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* User location */}
                <Marker position={[location.latitude, location.longitude]} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>

                {/* Hospitals */}
                {hospitals.map((h, i) => {
                    const lat = h.lat || h.center?.lat;
                    const lon = h.lon || h.center?.lon;
                    if (!lat || !lon) return null;

                    return (
                        <Marker key={i} position={[lat, lon]} icon={hospitalIcon}>
                            <Popup>{h.tags?.name || "Unnamed Hospital"}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border border-white"></div>
                    You
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                        +
                    </div>
                    Hospital
                </div>
            </div>
        </div>
    );
}
