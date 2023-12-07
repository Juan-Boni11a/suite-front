import { Button, Radio, DatePicker, Form, Input, InputNumber, Modal, Select, Typography } from "antd";
import { useState } from "react";
import FuncionariosSelector from "../FuncionariosSelector";
import TextArea from "antd/es/input/TextArea";


const users = [
    { label: 'Admin', key: 1, value: 1 },
    { label: 'Juan Pérez', key: 1, value: 2 }
]

const activities = [
    { label: 'Solicitar transporte', key: 1, value: 1 },
    { label: 'Cancelar transporte', key: 2, value: 2 }
]




const actions = [
    {  label: 'Cerrar', value: 1},
    {  label: 'Guardar y Cerrar', value: 2},
    {  label: 'Guardar y Actualizar', value: 3},
    {  label: 'Guardar y Procesar', value: 4},
    {  label: 'Imprimir', value: 5},
]


function SolicitudTransportForm() {
    const [form] = Form.useForm()

    const [showFuncionariosModal, setshowFuncionariosModal] = useState(false)

    const [showCarsModal, setShowCarsModal] = useState(false)


    function handleFuncionariosModal() {
        setshowFuncionariosModal(!showFuncionariosModal)
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

            <Form.Item label="Fecha de salida" name="exitDate">
                <DatePicker />
            </Form.Item>
            
            <Form.Item label="Hora de salida" name="exitHour">
                <DatePicker picker="time" />
            </Form.Item>

            <Form.Item label="Fecha de retorno" name="returnDate">
                <DatePicker />
            </Form.Item>
            
            <Form.Item label="Hora de retorno" name="returnHour">
                <DatePicker picker="time" />
            </Form.Item>

            <Form.Item label="Funcionario" name="funcionarios">
                <Input onClick={handleFuncionariosModal} />
            </Form.Item>
            <Form.Item label="Departamento" name="departamento">
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Numero de acompañantes" name="numAcompañantes">
                <InputNumber min={1}  defaultValue={1}/>
            </Form.Item>

            <Form.Item label="Destino" name="destino">
                <Input />
            </Form.Item>

            <Form.Item label="Duracion aproximada" name="duracion aproximada">
                <DatePicker picker="time" />
            </Form.Item>
            
            <Form.Item label="Actividad" name="duracion aproximada">
                <TextArea />
            </Form.Item>

            <Form.Item label="Actividad" name="duracion aproximada">
                <Radio.Group >
                    <Radio value={1}>Si</Radio>
                    <Radio value={2}>No</Radio>
                </Radio.Group>
            </Form.Item>
            
            <Form.Item label="Acciones a tomar">
                <Select options={activities} />
            </Form.Item>

            <Form.Item label="Acciones disponibles">
                <Select options={actions} />
            </Form.Item>

            <Modal open={showFuncionariosModal} footer={null} title="Funcionarios" onCancel={handleFuncionariosModal}>
                <FuncionariosSelector setSomeValues={setSomeValues} handleFuncionariosModal={handleFuncionariosModal} />
            </Modal>

            
        </Form>
    )
}

export default SolicitudTransportForm;