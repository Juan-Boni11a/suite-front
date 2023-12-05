import { Button, Col, Form, Input, List, Row, Select, Typography } from 'antd'
import { useState } from 'react'


const searchTypes = [
    { label: 'Plca', value: 1 },
    { label: 'Marca', value: 2 },

]



const cars = [
    { plate: 'PBX-123', brand: 'Chevrolet', model: 'New mountain', color: 'Verde', engine: 'QWE-123', enrollment: '34454' },
    { plate: 'PQT-123', brand: 'Nissan', model: 'Sentra', color: 'Amarillo', engine: 'ABC-111', enrollment: '34455' }
]

function CarsSelector({ setSomeValues, handleCarsModal }: any) {

    const [searchResults, setSearchResults] = useState<any>([])

    const [selectedCar, setSelectedCar] = useState<any>(null)



    function handleFinish(values: any) {
        const filteredDrivers = cars.filter((driver: any) => driver.plate.includes(values.searchParam))
        setSearchResults(filteredDrivers)
    }



    function handleSelectCar(driver: any) {
        setSelectedCar(driver)
    }

    function confirmSelect() {
        setSomeValues( 'plate',  selectedCar.plate)
        setSomeValues( 'brand',  selectedCar.brand)
        setSomeValues( 'model',  selectedCar.model)
        setSomeValues( 'color',  selectedCar.color)
        setSomeValues( 'engine',  selectedCar.engine)
        setSomeValues( 'enrollment',  selectedCar.enrollment)
        handleCarsModal()
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
                                <List.Item onClick={() => handleSelectCar(item)} >
                                    <List.Item.Meta
                                        title={<label >{item.plate}</label>}
                                    />
                                </List.Item>
                            )}
                        />
                    )
                    }
                </Col>
                <Col span={9} offset={1}>
                    {selectedCar && (
                        <div>
                            <Typography.Paragraph>Marca: {selectedCar.brand}</Typography.Paragraph>
                            <Typography.Paragraph>Modelo: {selectedCar.model}</Typography.Paragraph>
                            <Typography.Paragraph>Color: {selectedCar.color}</Typography.Paragraph>
                            <Typography.Paragraph>Motor: {selectedCar.motor}</Typography.Paragraph>
                            <Typography.Paragraph>No. Matrícula: {selectedCar.enrollment}</Typography.Paragraph>
                            <Typography.Paragraph>Estado: En uso</Typography.Paragraph>
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

export default CarsSelector