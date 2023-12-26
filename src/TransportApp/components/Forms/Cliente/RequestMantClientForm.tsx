import { useState } from 'react';
import { Form, Select, Button, Input, DatePicker,  message  } from 'antd';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup,  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { transformDate, transformTime } from "../../../../utils/general";
import { postData } from "../../../../services/common/postData";



const tipoCombus = [
    { label: "Super", value: "Super" },
    { label: "Extra", value: "Extra" },
];

const LocationSelectorMap = () => {
    const [form] = Form.useForm();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [submitting, setSubmitting] = useState(false)

    function handleMapClick(e:any) {
        setSelectedLocation(e.latlng);
        form.setFieldsValue({ 'selectedLocation': e.latlng });
    }

    function LocationMarker() {
        const map = useMapEvents({
            click: handleMapClick,
        });

        return selectedLocation ? (
            <Marker position={selectedLocation}>
                <Popup>Selected Location: {`${selectedLocation.lat}, ${selectedLocation.lng}`}</Popup>
            </Marker>
        ) : null;
    }

    const onFinish = async (values:any) => {
        
        console.log('Form values:', values);

        setSubmitting(true)
        const {id} = values;



        const cleanValues = {
            id,
            lat: values.selectedLocation.lat,
            lon: values.selectedLocation.lng,
            tipoCombustible: values.tipoCombus,
            horaRequest: transformTime(values.requestMantClienteHora),
        }

        console.log('clean values', cleanValues)

        const request = await postData('api/maintenanceRequests', cleanValues)
        if ('lat' in request) {
            message.success("Solicitud creada exitosamente")
            setSubmitting(false)
            return
        }

        message.error("Ha ocurrido un error :(")
        setSubmitting(false)
    };

    return (
        <div>
            <p>Seleccione el lugar: </p>
            <div style={{ height: '300px', width: '300px', margin: '1px', maxWidth: '100%' }}>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>


            <Form form={form} onFinish={onFinish} style={{ marginTop: '16px' }}>
                <Form.Item label="Lugar" name="selectedLocation">
                    <Input readOnly />
                </Form.Item>
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
    );
}

export default LocationSelectorMap;
