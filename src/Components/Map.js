import { marker } from "leaflet";
import moment from "moment";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  Tooltip,
} from "react-leaflet";
import { fireIcon, volcano } from "../icons";
import uniqid from "uniqid";
const Map = ({ eventData, centre, zoom, type }) => {
  const locations = eventData.map((ev) => {
    if (ev.categories[0].id === 8 && type.toLowerCase() === "wildfires") {
      return (
        <Marker
          position={[
            ev.geometries[0].coordinates[1],
            ev.geometries[0].coordinates[0],
          ]}
          icon={fireIcon}
          key={uniqid()}
        >
          <Popup>
            <p>id: {ev.id ? ev.id : "N/A"}</p>
            <p>title: {ev.title ? ev.title : "N/A"}</p>
            <p>
              type : {ev.categories[0].title ? ev.categories[0].title : "N/A"}
            </p>
            <p>
              Coordinates : [{ev.geometries[0].coordinates[1]},
              {ev.geometries[0].coordinates[0]}]
            </p>
            <p>
              Date:{" "}
              {moment(ev.geometries[0].date).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </Popup>
        </Marker>
      );
    } else if (
      ev.categories[0].id === 12 &&
      type.toLowerCase() === "volcanoes"
    ) {
      if (ev.geometries[0].type === "Polygon") {
        console.log(ev.geometries[0].coordinates[0]);
        return (
          <Polygon
            positions={ev.geometries[0].coordinates[0].map((coor) => [
              coor[1],
              coor[0],
            ])}
            color="red"
            key={uniqid()}
          >
            <Tooltip keepview={true} permanent color="red">
              Volcano Chain
            </Tooltip>
          </Polygon>
        );
      } else if (
        parseInt(ev.geometries[0].coordinates[1]) &&
        parseInt(ev.geometries[0].coordinates[0])
      ) {
        return (
          <Marker
            position={[
              parseInt(ev.geometries[0].coordinates[1]),
              parseInt(ev.geometries[0].coordinates[0]),
            ]}
            icon={volcano}
            key={uniqid()}
          >
            <Popup>
              <p>id: {ev.id ? ev.id : "N/A"}</p>
              <p>title: {ev.title ? ev.title : "N/A"}</p>
              <p>
                type : {ev.categories[0].title ? ev.categories[0].title : "N/A"}
              </p>
              <p>
                Coordinates : [{ev.geometries[0].coordinates[1]},
                {ev.geometries[0].coordinates[0]}]
              </p>
              <p>
                Date:{" "}
                {moment(ev.geometries[0].date).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </Popup>
          </Marker>
        );
      }
    } else if (
      ev.categories[0].id === 10 &&
      type.toLowerCase() === "severe storms"
    ) {
      return (
        <Polyline
          key={uniqid()}
          color="blue"
          positions={ev.geometries.map((geo) => {
            return [geo.coordinates[1], geo.coordinates[0]];
          })}
        />
      );
    }
    return null;
  });
  return (
    <MapContainer
      center={centre}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations}
    </MapContainer>
  );
};
Map.defaultProps = {
  centre: [32.732998, 74.864273],
  zoom: 6,
};
export default Map;
