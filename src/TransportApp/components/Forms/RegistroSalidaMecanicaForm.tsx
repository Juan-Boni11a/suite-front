import { Button, Radio, DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import DriversSelector from "../DriversSelector";
import { useState } from "react";
import CarsSelector from "../CarsSelector";
import MantenimientoSelector from "../MantenimientoSelector";
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // o la configuración regional que necesites

dayjs.locale('es'); // o la configuración regional que necesites


const users = [
    { label: 'Admin', key: 1, value: 1 },
    { label: 'Juan Pérez', key: 1, value: 2 }
]

const activities = [
    { label: 'Aprobar', key: 1, value: 1 },
    { label: 'Aprobar y Enviar a Taller', key: 2, value: 2 },
    { label: 'Rechazar', key: 3, value: 3 }
]


const actions = [
    {  label: 'Cerrar', value: 1},
    {  label: 'Guardar y Cerrar', value: 2},
    {  label: 'Guardar y Actualizar', value: 3},
    {  label: 'Guardar y Procesar', value: 4},
    {  label: 'Imprimir', value: 5},
]


function RegistroSalidaMecanicaForm() {
    const [form] = Form.useForm()

    const [showDriversModal, setShowDriversModal] = useState(false)

    const [showCarsModal, setShowCarsModal] = useState(false)

    const [showMantenimientoModal, setShowMantenimientoModal] = useState(false)


    function handleDriversModal() {
        setShowDriversModal(!showDriversModal)
    }

    function handleCarsModal() {
        setShowCarsModal(!showCarsModal)
    }

    function handleMantenimientoModal() {
        setShowMantenimientoModal(!showMantenimientoModal)
    }



    function setSomeValues(key: string, value: any) {
        form.setFieldsValue({ [key]: value });
    }

    return (
        <Form form={form}>
            <Form.Item label="Iniciador">
                <Select options={users} />
            </Form.Item>

            <Form.Item label="Actividad actual">
                <Select options={activities} />
            </Form.Item>

            <Form.Item label="Responsable actual">
                <Select options={users} />
            </Form.Item>

            <Form.Item label="Fecha de mantenimiento" name="">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Hora de mantenimiento" name="">
                <DatePicker picker="time" />
            </Form.Item>

            <Typography.Text>Vehículo</Typography.Text>
            <Form.Item label="No. Placa" name="plate">
                <Input onClick={handleCarsModal} />
            </Form.Item>
            <Form.Item label="Marca" name="brand">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Modelo" name="model">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Color" name="color">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Motor" name="engine">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Kilometraje" name="enrollment">
                <Input disabled />
            </Form.Item>


            <Typography.Text>Conductor</Typography.Text>
            <Form.Item label="Nombre completo" name="driver">
                <Input onClick={handleDriversModal} />
            </Form.Item>

            <Form.Item label="Cedula" name="ci">
                <Input disabled/>
            </Form.Item>
            
            <Form.Item label="Estacion de servicio" name="nombreMantenimiento">
                <Input onClick={handleMantenimientoModal} />
            </Form.Item>

            <Form.Item label="Tipo de trabajo" name="">
                <Radio.Group >
                    <Radio value={1}>Preventivo</Radio>
                    <Radio value={2}>Correctivo</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Actividades" name="">
                <Radio.Group >
                    <Radio value={1}>Pulido</Radio>
                    <Radio value={2}>Cambio de llantas</Radio>
                    <Radio value={3}>Recarga de baterías</Radio>
                </Radio.Group>
            </Form.Item>

            <Typography.Text>Código de barra</Typography.Text>
            <br />
            <Button type="primary">Generar código</Button>
            <br />
            <br />
            <Form.Item label="Acciones a tomar">
                <Select options={activities} />
            </Form.Item>

            <Form.Item label="Acciones disponibles">
                <Select options={actions} />
            </Form.Item>

            <Modal open={showDriversModal} footer={null} title="Máster de Conductores" onCancel={handleDriversModal}>
                <DriversSelector setSomeValues={setSomeValues} handleDriversModal={handleDriversModal} />
            </Modal>

            <Modal open={showCarsModal} footer={null} title="Vehículos" onCancel={handleCarsModal}>
                <CarsSelector setSomeValues={setSomeValues} handleCarsModal={handleCarsModal} />
            </Modal>

            <Modal open={showMantenimientoModal} footer={null} title="Estacion de servicio de Mantenimiento" onCancel={handleMantenimientoModal}>
                <MantenimientoSelector setSomeValues={setSomeValues} handleMantenimientoModal={handleMantenimientoModal} />
            </Modal>
        </Form>
    )
}

export default RegistroSalidaMecanicaForm;