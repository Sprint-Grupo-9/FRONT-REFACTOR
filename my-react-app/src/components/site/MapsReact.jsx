// src/components/Map.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige os ícones padrão do Leaflet (não aparecem corretamente no React por padrão)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const position = [-23.6341714, -46.520872]; // Rua Colúmbia, 971

export default function MapsReact() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg w-8/12  h-4/5 mx-auto">
      <MapContainer center={position} zoom={16} scrollWheelZoom={false} className="w-full h-full rounded-lg">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Rua Colúmbia, 971<br />Parque das Nações, Santo André - SP
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
