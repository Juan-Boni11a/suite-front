import { Button, Col, Form, Input, List, Row, Select, Typography } from 'antd'
import { useState } from 'react'


const searchTypes = [
    { label: 'Nombre', value: 1 },
    { label: 'Ciudad', value: 2 },

]


function MantenimientoSelector({ setSomeValues, handleMantenimientoModal, stations }: any) {

    const [searchResults, setSearchResults] = useState<any>(stations)

    const [selectedMantenimiento, setselectedMantenimiento] = useState<any>(null)



    function handleFinish(values: any) {
        const { searchParam, searchType } = values;
    
        const filteredMantenimiento = stations.filter((estacion: any) => {
            if (searchType === 1) {
                return estacion.name.includes(searchParam);
            } else if (searchType === 2) {
                return estacion.city.name.includes(searchParam);
            }
            return true; 
        });
    
        setSearchResults(filteredMantenimiento);
    }
    


    function handleSelectMantenmiento(mantenimiento: any) {
        setselectedMantenimiento(mantenimiento)
    }

    function confirmSelect() {
        setSomeValues('serviceStation', selectedMantenimiento.name)
        handleMantenimientoModal()
    }


    return (
        <div>
            <Form onFinish={handleFinish}>
                <Form.Item name="searchType" label="Búsqueda por"  >
                    <Select options={searchTypes} />
                </Form.Item>
                <Row>
                    <Col span={17}>
                        <Form.Item name="searchParam" >
                            <Input placeholder="Buscar.." />
                        </Form.Item>
                    </Col>
                    <Col span={2} offset={1} >
                        <Button htmlType='submit' type='primary'>Consultar taller</Button>
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
                                <List.Item onClick={() => handleSelectMantenmiento(item)} >
                                    <List.Item.Meta
                                        title={<label >{item.name}</label>}
                                    />
                                </List.Item>
                            )}
                        />
                    )
                    }
                </Col>
                <Col span={9} offset={1}>
                    {selectedMantenimiento && (
                        <div>
                            <Typography> Detalles de la estacion de mantenimiento</Typography>
                            <Typography.Paragraph>Nombre: {selectedMantenimiento.name}</Typography.Paragraph>
                            <Typography.Paragraph>Ciudad: {selectedMantenimiento.city.name}</Typography.Paragraph>
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

export default MantenimientoSelector