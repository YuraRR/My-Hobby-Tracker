// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import L from "leaflet";
// import "leaflet-draw";

// // Обязательно добавьте эту строку для установки значков Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.prototype._getIconUrl = function (name) {
//   const icons = {
//     marker: require("leaflet/dist/images/marker-icon.png").default,
//     "marker-shadow": require("leaflet/dist/images/marker-shadow.png").default,
//   };
//   return icons[name];
// };

// const App: React.FC = () => {
//   const [map, setMap] = useState<L.Map | null>(null);

//   useEffect(() => {
//     if (!map) return;

//     const drawnItems = new L.FeatureGroup();
//     map.addLayer(drawnItems);

//     // Создание контрола для рисования
//     const drawControl = new L.Control.Draw({
//       edit: {
//         featureGroup: drawnItems,
//       },
//       draw: {
//         polygon: {
//           allowIntersection: false, // Запретить пересечение
//         },
//         rectangle: false,
//         polyline: false,
//         circle: false,
//         marker: false,
//       },
//     });

//     // Добавление контрола на карту
//     map.addControl(drawControl);

//     // Обработка события создания нового полигона
//     map.on(L.Draw.Event.CREATED, (event: L.DrawEvent) => {
//       const layer = event.layer;
//       drawnItems.addLayer(layer);
//     });

//     return () => {
//       map.off(L.Draw.Event.CREATED);
//       map.removeControl(drawControl);
//       map.removeLayer(drawnItems);
//     };
//   }, [map]);

//   return (
//     <MapContainer
//       center={[51.505, -0.09]}
//       zoom={13}
//       whenCreated={setMap}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//     </MapContainer>
//   );
// };

// export default App;
