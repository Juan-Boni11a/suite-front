import { Button, Radio, DatePicker, Form, Input, Modal, Select, Typography } from "antd";

const users = [
    { label: 'Jefe de Transporte', key: 1, value: 1 },
    { label: 'Asistente', key: 2, value: 2 },
    { label: 'Responsable de estacion de Servicio', key: 2, value: 2 },
]

const actions = [
    {  label: 'Cerrar', value: 1},
    {  label: 'Guardar y Cerrar', value: 2},
    {  label: 'Guardar y Actualizar', value: 3},
    {  label: 'Chequea S/R', value: 4},
    {  label: 'Guardar y Procesar', value: 5},
    {  label: 'Imprimir', value: 6},
    {  label: 'Reasignar actividad', value: 7},
]

function RegistroSalidaMecanicaForm() {
    const [form] = Form.useForm()

    return (
        <Form form={form}>
            <Form.Item label="Responsable">
                <Select options={users} />
            </Form.Item>

            <Form.Item label="Fecha de salida mecánica" name="">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Acciones disponibles">
                <Select options={actions} />
            </Form.Item>
            
        </Form>
    )
}

export default RegistroSalidaMecanicaForm;