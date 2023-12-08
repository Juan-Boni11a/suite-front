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


function MovilizationToForm({handleModal, handleRefresh}: any){

    const handleFinish = async (values: any) => {
        const request = await postData('movilizationTo', values)
        if('name' in request){
            message.success("Agregado exitosamente")
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




function MovilizationTosPage(){

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [refresh, setRefresh] = useState(false)


    const initialRequest = async () => {
        setLoading(true)
        const request = await getData('movilizationTo')
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
        <Card title="Valores de para" extra={<Button onClick={handleModal} type="primary">Nuevo {"para"}</Button> } >
            <Table  loading={loading} dataSource={data} columns={columns} />

            <Modal title="Para" open={openModal} onCancel={handleModal} footer={null}>
                <MovilizationToForm handleModal={handleModal} handleRefresh={handleRefresh} />
            </Modal>

        </Card>
    )
}

export default MovilizationTosPage