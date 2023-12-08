import { useEffect, useState } from "react"
import { getData } from "../../../../services/common/getData"
import { Button, Card, Form, Input, Modal, Row, Select, Table, message } from "antd"
import { postData } from "../../../../services/common/postData"






function VehicleForm({handleModal, handleRefresh}: any){

    const handleFinish = async (values: any) => {
        const request = await postData('vehicles', values)
        if('plate' in request){
            message.success("Vehículo agregado exitosamente")
            handleModal()
            handleRefresh()
        }
    }

    return(
        <Form onFinish={handleFinish}>
            <Form.Item label="Placa" name="plate" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>
            <Form.Item label="Marca" name="brand" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>
            <Form.Item label="Modelo" name="model" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>
            <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>
            <Form.Item label="Motor" name="engine" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>

            <Form.Item label="No. Matrícula" name="enrollment" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>

            <Form.Item label="Estado" name="status" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Select options={ [ { label: 'En uso', value: 'USO' } ] } />
            </Form.Item>

            <Row justify="end" >
                <Button htmlType="submit" type="primary">Guardar</Button>
            </Row>
        </Form>
    )
}




const columns = [
    {
        title: "Placa",
        dataIndex: "plate",
        key: "plate",
    },
    {
        title: "Marca",
        dataIndex: "brand",
        key: "brand",
    },
    {
        title: "Modelo",
        dataIndex: "model",
        key: "model",
    },
    {
        title: "Color",
        dataIndex: "color",
        key: "color",
    },

    {
        title: "Motor",
        dataIndex: "engine",
        key: "engine",
    },

    {
        title: "No. matrícula",
        dataIndex: "enrollment",
        key: "enrollment",
    },
    {
        title: "Estado",
        key: "status",
        render: (record:any) => (
            <>
            EN USO
            </>
        ),
    },
];



function VehiclesPage(){

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [refresh, setRefresh] = useState(false)


    const initialRequest = async () => {
        setLoading(true)
        const request = await getData('vehicles')
        if(Array.isArray(request)){
            setData(request)
            setLoading(false)
        }
    }


    useEffect(() => {
        initialRequest()
    }, [refresh])

    const handleModal = () => setOpenModal(!openModal)

    const handleRefresh = () => setRefresh(!refresh)

    
    return(
        <Card title="Máster de Vehículos" extra={<Button type="primary" onClick={handleModal}>Nuevo vehículo</Button> } >
            <Table  loading={loading} dataSource={data} columns={columns} />

            <Modal title="Vehículo" open={openModal} footer={null} onCancel={handleModal}>
                <VehicleForm handleModal={handleModal} handleRefresh={handleRefresh} />
            </Modal>

        </Card>
    )
}

export default VehiclesPage