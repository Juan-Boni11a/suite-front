import { Button, Form, Input, Row, message } from "antd";
import { postData } from "../../../services/common/postData";


const defaultRules = [{ required: true, message: 'Información requerida' }]


function UserForm({ handleModal, handleRefresh }: any) {

    const handleFinish = async (values: any) => {
        const fullData = {
            ...values,
            role: { id: 2 },
        }
        const request = await postData('api/users', fullData)

        if ('name' in request) {
            message.success("Usuario creado exitosamente")
            handleModal()
            handleRefresh()
            return;
        }

        message.error("Algo salió mal")

    }



    return (
        <Form onFinish={handleFinish} >
            <Form.Item label="Nombre" name="name" rules={defaultRules}>
                <Input />
            </Form.Item>
            <Form.Item label="Apellido" name="lastname" rules={defaultRules} >
                <Input />
            </Form.Item>
            <Form.Item label="Cédula" name="ci" rules={defaultRules}>
                <Input />
            </Form.Item>

            <Form.Item label="No. Teléfono" name="phone_number" rules={defaultRules}>
                <Input />
            </Form.Item>


            <Form.Item label="Correo electrónica" name="email" rules={defaultRules}>
                <Input />
            </Form.Item>


            <Form.Item label="Contraseña" name="password" rules={defaultRules}>
                <Input />
            </Form.Item>

            <Row justify="end" >
                <Button htmlType="submit" type="primary">Guardar</Button>
            </Row>

        </Form>
    )
}

export default UserForm