import { Button, DatePicker, InputNumber, Form, Input, Modal, Select, Typography, Radio } from "antd";
import DriversSelector from "../DriversSelector";
import { useState } from "react";
import CarsSelector from "../CarsSelector";
import AbasSelector from "../AbasSelector";


const users = [
    { label: 'Admin', key: 1, value: 1 },
    { label: 'Juan Pérez', key: 1, value: 2 }
]

const activities = [
    { label: 'Registro y validacion de datos', key: 1, value: 1 }
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

const tipoCombus = [
    { label: "Super", value:1},
    { label: "Extra", value:2},
]


function AbasCombustibleForm() {
    const [form] = Form.useForm()

    const [showDriversModal, setShowDriversModal] = useState(false)

    const [showCarsModal, setShowCarsModal] = useState(false)

    const [showAbasModal, setShowAbasModal] = useState(false)


    function handleDriversModal() {
        setShowDriversModal(!showDriversModal)
    }

    function handleCarsModal() {
        setShowCarsModal(!showCarsModal)
    }

    function handleAbasModal() {
        setShowAbasModal(!showAbasModal)
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

            <Form.Item label="Fecha de abastecimiento" name="fechaAbas">
                <DatePicker />
            </Form.Item>
            
            <Form.Item label="Hora de abastecimiento" name="abasHour">
                <DatePicker picker="time" />
            </Form.Item>

            <Typography.Text>Conductor</Typography.Text>
            <Form.Item label="Nombre Completo" name="driver">
                <Input onClick={handleDriversModal} />
            </Form.Item>

            <Form.Item label="Cédula" name="ci">
                <Input disabled/>
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

            <Form.Item label="Kilometraje Anterior" name="kmAnt">
                <InputNumber min={1}  defaultValue={107001}/>
            </Form.Item>

            <Form.Item label="Kilometraje Actual" name="kmAct">
                <InputNumber min={1}/>
            </Form.Item>

            <Button type="primary">Verificar Datos de Movilización</Button>

            <br />
            <br />
            <Typography.Text>Detalles del abastecimiento</Typography.Text>
            <Form.Item label="Estación de Servicio" name="nameAbas">
                <Input onClick={handleAbasModal} />
            </Form.Item>

            <Form.Item label="Combustible" name="combus">
                <Radio>Gasolina</Radio>
            </Form.Item>

            <Form.Item label="Tipo de combustible" name="tipoCombus">
                <Select options={tipoCombus}>
                </Select>
            </Form.Item>

            <Form.Item label="Precio" name="precioCombus">
                <InputNumber 
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                min={1} defaultValue={2.34}/>
            </Form.Item>

            <Form.Item label="Galones" name="galones">
                <InputNumber min={1} defaultValue={0}/>
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                min={1} defaultValue={10.34}/>
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

            <Modal open={showAbasModal} footer={null} title="Master de Estación de Servicio" onCancel={handleAbasModal}>
                <AbasSelector setSomeValues={setSomeValues} handleAbasModal={handleAbasModal} />
            </Modal>
        </Form>
    )
}

export default AbasCombustibleForm;