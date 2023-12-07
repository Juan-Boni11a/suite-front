import { Button, DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import DriversSelector from "../DriversSelector";
import { useState } from "react";
import CarsSelector from "../CarsSelector";


const users = [
    { label: 'Admin', key: 1, value: 1 },
    { label: 'Juan Pérez', key: 1, value: 2 }
]

const activities = [
    { label: 'Ingreso de datos', key: 1, value: 1 }
]


const movilizationTypes = [
    { label: 'Autoridad', key: 1, value: 1 },
    { label: 'De patio', key: 1, value: 2 }
]

const userTypes = [
    { label: 'Conductor', key: 1, value: 1 },
    { label: 'Funcionario', key: 1, value: 2 },
    { label: 'Funcionario y conductor', key: 1, value: 3 }
]

const vigenceTypes = [
    { label: 'Lunes a Viernes', key: 1, value: 1 },
    { label: 'Lunes a Domingo', key: 1, value: 2 }
]

const places = [
    { label: 'Quito', key: 1, value: 1 },
    { label: 'Guayaquil', key: 1, value: 2 },
    { label: 'Cuenca', key: 1, value: 3 }
]


const actions = [
    {  label: 'Cerrar', value: 1},
    {  label: 'Guardar y Cerrar', value: 2},
    {  label: 'Guardar y Actualizar', value: 3},
    {  label: 'Guardar y Procesar', value: 4},
    {  label: 'Imprimir', value: 5},
]


function SolicitudMantenimientoForm() {
    const [form] = Form.useForm()

    const [showDriversModal, setShowDriversModal] = useState(false)

    const [showCarsModal, setShowCarsModal] = useState(false)


    function handleDriversModal() {
        setShowDriversModal(!showDriversModal)
    }

    function handleCarsModal() {
        setShowCarsModal(!showCarsModal)
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

            <Form.Item label="Tipo de movilización">
                <Select options={movilizationTypes} />
            </Form.Item>


            <Form.Item label="Para">
                <Select options={userTypes} />
            </Form.Item>


            <Form.Item label="Vigente de">
                <Select options={vigenceTypes} />
            </Form.Item>

            <Form.Item label="Conductor" name="driver">
                <Input onClick={handleDriversModal} />
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
            <Form.Item label="No. Matrícula" name="enrollment">
                <Input disabled />
            </Form.Item>


            <Typography.Text>Datos de Emisión</Typography.Text>

            <Form.Item label="Lugar" name="emitPlace">
                <Select options={places} />
            </Form.Item>

            <Form.Item label="Fecha" name="emitDate">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Hora" name="emitHour">
                <DatePicker picker="time" />
            </Form.Item>


            <Typography.Text>Datos de Caducidad</Typography.Text>

            <Form.Item label="Lugar" name="expiryPlace">
                <Select options={places} />
            </Form.Item>

            <Form.Item label="Fecha" name="expiryDate">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Hora" name="expiryHour">
                <DatePicker picker="time" />
            </Form.Item>


            <Form.Item label="Comentarios" name="comments">
                <Input.TextArea rows={6} />
            </Form.Item>


            <Form.Item label="Persona autorizada" name="autorizedPerson">
                <Select options={users} />
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
        </Form>
    )
}

export default SolicitudMantenimientoForm;