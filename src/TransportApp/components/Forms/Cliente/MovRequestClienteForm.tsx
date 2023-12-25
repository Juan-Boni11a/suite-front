import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Typography } from "antd";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MovRequestClienteForm = () => {
  const [form] = Form.useForm();
  const [departureLocation, setDepartureLocation] = useState(null);
  const [arrivalLocation, setArrivalLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Simular una recarga del mapa cuando el componente se monta
    setMapReady(false);
    setTimeout(() => {
      setMapReady(true);
    }, 100);
  }, []);

  const handleMapClick = (e, locationType) => {
    const clickedLocation = e.latlng;

    if (locationType === "departure") {
      setDepartureLocation(clickedLocation);
      form.setFieldsValue({ departureLocation: `${clickedLocation.lat}, ${clickedLocation.lng}` });
    } else if (locationType === "arrival") {
      setArrivalLocation(clickedLocation);
      form.setFieldsValue({ arrivalLocation: `${clickedLocation.lat}, ${clickedLocation.lng}` });
    }
  };

  const LocationMarker = ({ position, label }) => {
    const map = useMapEvents({
      click: (e) => handleMapClick(e, label),
    });

    return position ? (
      <Marker position={position}>
        <Popup>{label} Location: {`${position.lat}, ${position.lng}`}</Popup>
      </Marker>
    ) : null;
  };

  const onFinish = (values: Array<string>) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <p>Seleccione el lugar de partida: </p>
      <div style={{ height: "300px", width: "700px", margin: "1px", maxWidth: "100%" }}>
        {mapReady && (
          <MapContainer
            center={[-0.25442278218700787, -78.52226257367874]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={departureLocation} label="departure" />
          </MapContainer>
        )}
      </div>

      <p>Seleccione el lugar de llegada: </p>
      <div style={{ height: "300px", width: "700px" }}>
        {mapReady && (
          <MapContainer
            center={[-0.2980171115013572, -78.55026483579424]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={arrivalLocation} label="arrival" />
          </MapContainer>
        )}
      </div>

      <Form form={form} onFinish={onFinish} style={{ marginTop: "16px" }}>
        <Form.Item label="Lugar de partida" name="departureLocation">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Lugar de llegada" name="arrivalLocation">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Fecha de partida" name="dateArrival">
          <DatePicker picker="time" />
        </Form.Item>
        <Form.Item label="Hora de partida" name="hourArrival">
          <DatePicker picker="date" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default MovRequestClienteForm;
