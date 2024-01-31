import { Collapse, CollapseProps, Descriptions } from "antd"


function MovilizationDetails({ movilization }: any) {

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Detalles de solicitud',
            children: <>
                <Descriptions title="Datos Generales">
                    <Descriptions.Item label="Identificador">{movilization.code}</Descriptions.Item>
                    <Descriptions.Item label="Nombre">{movilization.requester.name} {movilization.requester.lastname}</Descriptions.Item>
                </Descriptions>

                <Descriptions title="Datos de emisión">
                    <Descriptions.Item label="Lugar">{movilization.emitPlace}</Descriptions.Item>
                    <Descriptions.Item label="Fecha">{movilization.emitDate}</Descriptions.Item>
                    <Descriptions.Item label="Hora">{movilization.emitHour}</Descriptions.Item>
                </Descriptions>


                <Descriptions title="Datos de caducidad">
                    <Descriptions.Item label="Lugar">{movilization.expiryPlace}</Descriptions.Item>
                    <Descriptions.Item label="Fecha">{movilization.expiryDate}</Descriptions.Item>
                    <Descriptions.Item label="Hora">{movilization.expiryHour}</Descriptions.Item>
                </Descriptions>
            </>,
        },
    ];

    return (
        <Collapse items={items} defaultActiveKey={['1']} />
    )

}

export default MovilizationDetails