import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface DistrictData {
  name: string;
  lat: number;
  lng: number;
  recycled: number;
  generated: number;
  rate: number;
}

interface TelanganaImpactMapProps {
  districtData: DistrictData[];
}

const TelanganaImpactMap = ({ districtData }: TelanganaImpactMapProps) => {
  return (
    <MapContainer 
      center={[17.7, 79.0]} 
      zoom={7} 
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {districtData.map((district) => (
        <Circle
          key={district.name}
          center={[district.lat, district.lng]}
          radius={district.recycled * 5}
          pathOptions={{
            fillColor: district.rate >= 70 ? "hsl(142, 76%, 36%)" : district.rate >= 60 ? "hsl(45, 90%, 60%)" : "hsl(0, 84%, 60%)",
            fillOpacity: 0.5,
            color: district.rate >= 70 ? "hsl(142, 76%, 36%)" : district.rate >= 60 ? "hsl(45, 90%, 60%)" : "hsl(0, 84%, 60%)",
            weight: 2,
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-base mb-2">{district.name} District</h3>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Generated:</span>
                  <span className="font-medium">{district.generated.toLocaleString()} MT</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Recycled:</span>
                  <span className="font-medium text-primary">{district.recycled.toLocaleString()} MT</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-semibold text-primary">{district.rate}%</span>
                </p>
              </div>
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default TelanganaImpactMap;
