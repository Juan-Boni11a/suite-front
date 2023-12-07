import { Button, Col, Form, Input, List, Row, Select, Typography } from 'antd'
import { useState } from 'react'


const searchTypes = [
    { label: 'Nombre', value: 1 },
    { label: 'Cédula', value: 2 },

]

/*
const drivers = [
    { fullName: 'Juan Pérez', status: 'Disponible', ci: '1727215822', ciExpiry: '15/02/2024' },
    { fullName: 'Luis Roa', status: 'No Disponible', ci: '1025215822', ciExpiry: '20/12/2024' }
]
*/
function DriversSelector({ setSomeValues, handleDriversModal, drivers }: any) {

    const [searchResults, setSearchResults] = useState<any>(drivers)

    const [selectedDriver, setSelectedDriver] = useState<any>(null)



    function handleFinish(values: any) {
        
        let filteredDrivers = drivers;
        
        if(values.searchType===1){
            filteredDrivers = drivers.filter((driver: any) => driver.fullName.includes(values.searchParam))
        }

        if(values.searchType===2){
            filteredDrivers = drivers.filter((driver: any) => driver.ci.includes(values.searchParam))
        }
        
        setSearchResults(filteredDrivers)
    }



    function handleSelectDriver(driver: any) {
        setSelectedDriver(driver)
    }

    function confirmSelect() {
        setSomeValues('driver', selectedDriver.fullName)
        setSomeValues('ci', selectedDriver.ci)
        handleDriversModal()
    }


    return (
        <div>
            <Form onFinish={handleFinish}>
                <Form.Item name="searchType" label="Búsqueda por"  >
                    <Select options={searchTypes} />
                </Form.Item>
                <Row>
                    <Col span={20}>
                        <Form.Item name="searchParam" >
                            <Input placeholder="Buscar.." />
                        </Form.Item>
                    </Col>
                    <Col span={3} offset={1} >
                        <Button htmlType='submit' type='primary'>Buscar</Button>
                    </Col>
                </Row>
            </Form>

            <Row>
                <Col span={14} >
                    {searchResults && searchResults.length > 0 && (
                        <List
                            pagination={false}
                            dataSource={searchResults}
                            renderItem={(item: any, index) => (
                                <List.Item onClick={() => handleSelectDriver(item)} >
                                    <List.Item.Meta
                                        title={<label >{item.fullName}</label>}
                                    />
                                </List.Item>
                            )}
                        />
                    )
                    }
                </Col>
                <Col span={9} offset={1}>
                    {selectedDriver && (
                        <div>
                            <Typography.Paragraph>Estado: {selectedDriver.status}</Typography.Paragraph>
                            <Typography.Paragraph>Cédula: {selectedDriver.ci}</Typography.Paragraph>
                            <Typography.Paragraph>Expiración: {selectedDriver.ciExpiry}</Typography.Paragraph>
                        </div>
                    )}
                </Col>
            </Row>

            <Row justify="center" >
                <Button onClick={confirmSelect} type="primary">Confirmar</Button>
            </Row>
        </div>
    )
}

export default DriversSelector