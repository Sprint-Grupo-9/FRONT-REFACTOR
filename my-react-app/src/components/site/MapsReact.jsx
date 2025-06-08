import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const position = [-23.6341714, -46.520872]; // Rua Colúmbia, 971

export default function MapsReact() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg w-8/12  h-4/5">
      <MapContainer center={position} zoom={20} scrollWheelZoom={false} className="w-full h-full rounded-lg" style={{ zIndex: 0, position: 'relative' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>
            Rua Colúmbia, 971<br />Parque das Nações, Santo André - SP
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
