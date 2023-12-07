import { Button, Col, Form, Input, List, Row, Select, Typography } from 'antd'
import { useState } from 'react'




const funcionarios = [
    { fullName: 'Juan Pérez', departamento: 'Logística' },
    { fullName: 'Luis Roa', departamento: 'Contabilidad' },
    { fullName: 'María García', departamento: 'Ventas' },
    { fullName: 'Ana Martínez', departamento: 'Recursos Humanos' },
    { fullName: 'Carlos Sánchez', departamento: 'Logística' },
    { fullName: 'Sofía Rodríguez', departamento: 'Ventas' },
    { fullName: 'Javier Torres', departamento: 'Contabilidad' },
    { fullName: 'Laura Gómez', departamento: 'Recursos Humanos' },
    // Puedes agregar más funcionarios según sea necesario
];


function FuncionariosSelector({ setSomeValues, handleFuncionariosModal }: any) {

    const [searchResults, setSearchResults] = useState<any>([])

    const [selectedFuncionario, setselectedFuncionario] = useState<any>(null)



    function handleFinish(values: any) {
        const filteredFuncionarios = funcionarios.filter((funcionario: any) => funcionario.fullName.includes(values.searchParam))
        setSearchResults(filteredFuncionarios)
    }



    function handleSelectedFuncionario(funcionarios: any) {
        setselectedFuncionario(funcionarios)
    }

    function confirmSelect() {
        setSomeValues('funcionarios', selectedFuncionario.fullName)
        setSomeValues('departamento', selectedFuncionario.departamento)
        handleFuncionariosModal()
    }


    return (
        <div>
            <Form onFinish={handleFinish}>
               
                <Row>
                    <Col span={20}>
                        <Form.Item name="searchParam" label="Buscar nombres que empiecen con:">
                            <Select 
                                showSearch placeholder="Seleccione un funcionario"
                                filterOption={(input, option) =>
                                    (option?.label?.toString()?.toLowerCase() ?? '').includes(input.toLowerCase())
                                }
                                >
                                    {funcionarios.map((funcionario) => (
                                    <Select.Option key={funcionario.fullName} value={funcionario.fullName} label={funcionario.fullName}>
                                        {funcionario.fullName}
                                    </Select.Option>
                                
                                    ))}
                            </Select>
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
                                <List.Item onClick={() => handleSelectedFuncionario(item)} style={{cursor:"pointer"}}>
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
                    {selectedFuncionario && (
                        <div>
                            <Typography.Paragraph>Nombre Completo: {selectedFuncionario.fullName}</Typography.Paragraph>
                            <Typography.Paragraph>Departamento: {selectedFuncionario.departamento}</Typography.Paragraph>
                            
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

export default FuncionariosSelector