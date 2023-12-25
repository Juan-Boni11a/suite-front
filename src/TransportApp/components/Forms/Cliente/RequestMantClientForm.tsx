import { useState } from 'react';
import { Form, Select, Button, Input, DatePicker,    } from 'antd';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup,  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const tipoCombus = [
    { label: "Super", value: 1 },
    { label: "Extra", value: 2 },
];

const LocationSelectorMap = () => {
    const [form] = Form.useForm();
    const [selectedLocation, setSelectedLocation] = useState(null);

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

    const onFinish = (values:any) => {
        // Handle form submission, including the selectedLocation coordinates
        console.log('Form values:', values);
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
                <Form.Item label="Hora" name="tipoCombus">
                    <DatePicker picker='time'/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LocationSelectorMap;
