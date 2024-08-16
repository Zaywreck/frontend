import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useContext, useState } from 'react';
import styles from '@/styles/componentStyles/MapComponent.module.css';
import L from 'leaflet';
import { coordinates } from '@/context/constants';
import AppContext from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import WarehousePopup from '../warehouseViewComps/WarehousePopup';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const coords = coordinates.map((coord) => ({
  cityId: coord.ID,
  city: coord.City,
  latitude: parseFloat(coord.Latitude),
  longitude: parseFloat(coord.Longitude),
}));

const MapComponent = () => {
  const router = useRouter();
  const { warehouses } = useContext(AppContext);
  const [warehousesIn, setWarehousesIn] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const handleMarkerClick = async (cityId) => {
    const filteredWarehouses = warehouses.filter((warehouse) => warehouse.city_code === cityId);
    setWarehousesIn(filteredWarehouses);
    setSelectedWarehouse(null);
  };

  const handleWarehouseClick = (warehouse_code) => {
    setSelectedWarehouse(warehouse_code);
    router.push(`/services/displayFromMap/${warehouse_code}`);
  };

  const selectedCity = warehousesIn.length > 0 
    ? coords.find(coord => coord.cityId === warehousesIn[0]?.city_code)
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <MapContainer
          center={[39.9334, 32.8597]}
          zoom={6}
          minZoom={6}
          maxZoom={10} // Allows users to zoom in closer
          className={styles.map}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {coords.map((coord) => (
            <Marker
              key={coord.cityId}
              position={[coord.latitude, coord.longitude]}
              icon={defaultIcon}
              eventHandlers={{
                click: () => handleMarkerClick(coord.cityId),
              }}
            >
              <Popup>{coord.city}</Popup>
            </Marker>
          ))}
          {selectedWarehouse && selectedCity && (
            <Marker
              position={[selectedCity.latitude, selectedCity.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <div>Warehouse Data:</div>
                <WarehousePopup warehouseCode={selectedWarehouse} />
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className={styles.listContainer}>
        <h2>Warehouses</h2>
        <ul>
          {warehousesIn.map((warehouse) => (
            <li
              key={warehouse.warehouse_code}
              className={styles.warehouseItem}
              onClick={() => handleWarehouseClick(warehouse.warehouse_code)}
            >
              {warehouse.warehouse_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
