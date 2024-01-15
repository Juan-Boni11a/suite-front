import Map from "./../../Map"
import { useContext, useState } from "react";
import { Form, Select, Button, Input, DatePicker,  message  } from 'antd';
import { transformTime } from "../../../../utils/general";
import { postData } from "../../../../services/common/postData";
import { AuthContext } from "../../../../context/AuthContext";

const tipoCombus = [
  { label: "Super", value: "Super" },
  { label: "Extra", value: "Extra" },
];

const RequestMantClientForm = ({handleModal, handleRefresh}: any) => {
  const {user}: any = useContext(AuthContext)

  const [coordinates, setCoordinates] = useState({ lng: -78.55499458658646, lat: -0.29547810042325295 });
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm();
  const handleCoordinatesChange = (newCoordinates:any) => {
    setCoordinates(newCoordinates);
  };

  const onFinish = async (values:any) => {
    console.log('Form values:', values);
    setSubmitting(true)
    const {id} = values;
    const cleanValues = {
        id,
        lat: coordinates.lat,
        lon: coordinates.lng,
        tipoCombustible: values.tipoCombus,
        horaRequest: transformTime(values.requestMantClienteHora),
        requester: { id: user.id }
    }

    console.log('clean values', cleanValues)

    const request = await postData('api/maintenanceRequests', cleanValues)
    if ('lat' in request) {
        message.success("Solicitud creada exitosamente")
        handleModal()
        handleRefresh()
        setSubmitting(false)
        return
    }

    message.error("Ha ocurrido un error :(")
    setSubmitting(false)
};
  return (
    <>
        <div style={{textAlign: "left"}}>
        <p>Elija el lugar</p>
        
          <Map onCoordinatesChange={handleCoordinatesChange} />
          <p>Coordenadas: {`Longitud: ${coordinates.lng}, Latitud: ${coordinates.lat}`}</p>
        

        <Form form={form} onFinish={onFinish} style={{ marginTop: '16px' }}>
          <Form.Item label="Tipo de combustible" name="tipoCombus">
              <Select options={tipoCombus} />
          </Form.Item>
          <Form.Item label="Hora" name="requestMantClienteHora">
              <DatePicker picker='time'/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
                Guardar
            </Button>
          </Form.Item>
        </Form>
        </div>
    </>
  )
}

export default RequestMantClientForm