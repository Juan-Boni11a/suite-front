import { useEffect, useState } from "react"
import { getData } from "../../../../services/common/getData"
import { Button, Card, Form, Input, Modal, Row, Table, message } from "antd"
import { postData } from "../../../../services/common/postData"


const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name'
    }
]


function MovilizationTypeForm({handleModal, handleRefresh}: any){

    const handleFinish = async (values: any) => {
        const request = await postData('movilizationTypes', values)
        if('name' in request){
            message.success("Tipo de movilización agregado exitosamente")
            handleModal()
            handleRefresh()
            return
        }

        message.error("Ya existe un registro con ese nombre!")
    }

    return(
        <Form onFinish={handleFinish}>
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>
            <Row justify="end" >
                <Button htmlType="submit" type="primary">Guardar</Button>
            </Row>
        </Form>
    )
}




function MovilizationTypesPage(){

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [refresh, setRefresh] = useState(false)


    const initialRequest = async () => {
        setLoading(true)
        const request = await getData('movilizationTypes')
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
        <Card title="Tipos de movilización" extra={<Button onClick={handleModal} type="primary">Nuevo tipo de movilización</Button> } >
            <Table  loading={loading} dataSource={data} columns={columns} />
            <Modal title="Tipo de movilización" open={openModal} onCancel={handleModal} footer={null}>
                <MovilizationTypeForm handleModal={handleModal} handleRefresh={handleRefresh} />
            </Modal>

        </Card>
    )
}

export default MovilizationTypesPage