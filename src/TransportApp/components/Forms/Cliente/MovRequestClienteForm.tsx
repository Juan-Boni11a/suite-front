import { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Typography, message } from "antd";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { transformDate, transformTime } from "../../../../utils/general";
import { postData } from "../../../../services/common/postData";
import Map from "./../../Map"
import { AuthContext } from "../../../../context/AuthContext";

const MovRequestClienteForm = ({ handleModal, handleRefresh }: any) => {
  const {user}: any = useContext(AuthContext)
  console.log('user', user)

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false)
  const [coordinates, setCoordinates] = useState({ lng: -78.55499458658646, lat: -0.29547810042325295 }); 
  const [coordinatesDeparture, setCoordinatesDeparture] = useState({ lng: -78.55499458658646, lat: -0.29547810042325295 }); 

  const handleCoordinatesChange = (newCoordinates:any) => {
    setCoordinates(newCoordinates);
  };
  const handleCoordinatesChangeDeparture = (coorDeparture:any) => {
    setCoordinatesDeparture(coorDeparture);
  };
  

  const onFinish = async (values: any) => {
    console.log("Form values:", values);
    // setSubmitting(true)
        const {id} = values;
        const cleanValues = {
          id,
          dateArrival: transformDate(values.dateArrival),
          hourArrival: transformTime(values.hourArrival),
          latDeparture: coordinates.lat,
          longDeparture: coordinates.lng,
          latArrival: coordinatesDeparture.lat,
          longArrival: coordinatesDeparture.lng,
          requester: { id: user.id }
        }

        console.log('clean values', cleanValues)

        const request = await postData('api/movilizationRequests', cleanValues)
        if ('latArrival' in request) {
            message.success("Solicitud creada exitosamente")
            setSubmitting(false)
            handleModal()
            handleRefresh()
            return
        }

        message.error("Ha ocurrido un error :(")
        setSubmitting(false)


  };

  return (
    <>
      <p>Seleccione el lugar de partida: </p>
      <div style={{ height: "300px", width: "700px", margin: "1px", maxWidth: "100%" }}>
        <Map onCoordinatesChange={handleCoordinatesChange} />
          <p>Coordenadas: {`Longitud: ${coordinates.lng}, Latitud: ${coordinates.lat}`}</p>
      </div>

      <p style={{marginTop: "30px"}}>Seleccione el lugar de llegada: </p>
      <div style={{ height: "300px", width: "700px" }}>
      <Map onCoordinatesChange={handleCoordinatesChangeDeparture} />
          <p>Coordenadas: {`Longitud: ${coordinatesDeparture.lng}, Latitud: ${coordinatesDeparture.lat}`}</p>
      </div>

      <Form form={form} onFinish={onFinish} style={{ marginTop: "50px" }}>
        <Form.Item label="Fecha de partida" name="dateArrival">
          <DatePicker picker="date" />
        </Form.Item>
        <Form.Item label="Hora de partida" name="hourArrival">
          <DatePicker picker="time" />
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
