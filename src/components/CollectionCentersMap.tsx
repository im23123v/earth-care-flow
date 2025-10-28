import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Phone } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons - must be inside component
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface CollectionCenter {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  district: string;
  hours?: string;
}

interface CollectionCentersMapProps {
  centers: CollectionCenter[];
  center?: [number, number];
  zoom?: number;
}

const CollectionCentersMap = ({ 
  centers, 
  center = [17.385044, 78.486671], 
  zoom = 7 
}: CollectionCentersMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full flex items-center justify-center">Loading map...</div>;
  }

  return (
    <MapContainer 
      key={`collection-map-${centers.length}`}
      center={center} 
      zoom={zoom} 
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {centers.map((centerItem) => (
        <Marker key={centerItem.id} position={[centerItem.lat, centerItem.lng]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-sm mb-1">{centerItem.name}</h3>
              <p className="text-xs text-muted-foreground mb-1">{centerItem.address}</p>
              <p className="text-xs flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {centerItem.phone}
              </p>
              {centerItem.hours && (
                <p className="text-xs mt-1 text-muted-foreground">{centerItem.hours}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CollectionCentersMap;
