import { Button, DatePicker, Form, List, Input, InputNumber, Radio, Modal, Row, Select, Table, Typography, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { postData } from "../../../services/common/postData";
import { transformDate, transformTime } from "../../../utils/general";
import { UploadOutlined } from '@ant-design/icons';

const users = [
    {label: 'Eduardo', value: 'Eduardo'},
    {label: 'Sarai', value: 'Sarai'}
]
const subsectores = [
    { label: 'Empresarial', value: "Empresarial" },
    { label: 'Industrial', value: "Industrial" }
]
const tipoInformacion = [
    { label: 'Local', value: "Local" },
    { label: 'Actual', value: "Actual" }
]
const medioComunicacion = [
    { label: 'Digital', value: "Digital" },
    { label: 'Fisico', value: "Fisico" }
]

const RegisterNoticiasForm = () => {
    const [form] = Form.useForm()
    const [submitting, setSubmitting] = useState(false)
    const [opinions, setOpinions] = useState([]);

    const handleSubmit = async (values: any) => {
        // setSubmitting(true)
        console.log('values', values)
        const { id } = values;

        const cleanValues = {
            id,
            dateRegister: transformDate(values.dateRegister),
            nameResp: values.nameResp,
            emitNoticia: transformDate(values.emitNoticia),
            seccion: values.seccion,
            numPage: values.numPage,
            sectorNoti: values.sectorNoti,
            subsector: values.subsector,
            tipoInfo: values.tipoInfo,
            medioComunicacion: values.medioComunicacion,
            fuente: values.fuente,
            tendencia: values.tendencia,
            resumen: values.resumen,
            comentario: values.comentario,
            opinions: opinions
        }

        console.log('clean values', cleanValues)

        const request = await postData('api/news', cleanValues)
        if ('comentario' in request) {
            message.success("Solicitud creada exitosamente")
            setSubmitting(false)
            return
        }

        message.error("Ha ocurrido un error :(")
        setSubmitting(false)

    }

    const handleAddOpinion = () => {
        const name = form.getFieldValue('name');
        const opinion = form.getFieldValue('opinion');
        const tendencia = form.getFieldValue('tendencia');
      
        if (name && opinion && tendencia) {
          const newOpinion = { 
            name, 
            opinion, 
            tendencia };
          setOpinions([...opinions, newOpinion]);
          form.resetFields(['name', 'opinion', 'tendencia']);
        }
      };

    const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Opinión',
        dataIndex: 'opinion',
        key: 'opinion',
    },
    {
        title: 'Tendencia',
        dataIndex: 'tendencia',
        key: 'tendencia',
    },
    ];
    

    return (
        <Form form={form} onFinish={handleSubmit} >
            <Form.Item label="Fecha del registro" name="dateRegister">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Nombre Usuario" name="nameResp">
                <Select options={users} />
            </Form.Item>

            <Form.Item label="Fecha de la noticia" name="emitNoticia">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Seccion" name="seccion">
                <InputNumber />
            </Form.Item>

            <Form.Item label="No. Pagina" name="numPage">
                <InputNumber />
            </Form.Item>

            <Form.Item label="Sector referente de la noticia" name="sectorNoti">
                <Radio.Group name="sectorNoti">
                    <Radio value="Hidrocarburos">Hidrocarburos</Radio>
                    <Radio value="Minas">Minas</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Subsector" name="subsector" >
                <Select options={subsectores} />
            </Form.Item>

            <Form.Item label="Tipo de informacion" name="tipoInfo" >
                <Select options={tipoInformacion} />
            </Form.Item>

            <Form.Item label="Medio comunicacion" name="medioComunicacion" >
                <Select options={medioComunicacion} />
            </Form.Item>

            <Form.Item label="Fuente / Articulista" name="fuente" >
                <Input></Input>
            </Form.Item>

            <Form.Item label="Tendencia de la noticia" name="tendencia">
                <Radio.Group name="tendencia">
                    <Radio value="Positiva">Positiva</Radio>
                    <Radio value="Negativa">Negativa</Radio>
                    <Radio value="Neutra">Neutra</Radio>
                </Radio.Group>
            </Form.Item>
            
            <Form.Item label="Resumen" name="resumen">
                <Input.TextArea rows={6} />
            </Form.Item>

            <Form.Item label="Imagen de la noticia" name="imagen">
                <Upload >
                    <Button icon={<UploadOutlined />}>Subir imagen</Button>
                </Upload>
            </Form.Item>

            <Form.Item label="Generadores de opinion">
                <Form.Item label="Nombre" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Opinión" name="opinion">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Tendencia" name="tendencia">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleAddOpinion}>
                    Añadir opinión
                    </Button>
                </Form.Item>
            </Form.Item>

            <Table
            dataSource={opinions}
            columns={columns}
            pagination={false}
            bordered
            rowKey={(record:any) => record.name}
            />

            <Form.Item label="Comentarios" name="comentario" style={{marginTop:"30px"}}>
                <Input.TextArea rows={6} />
            </Form.Item>



            <Row justify="end">
                <Button htmlType="submit" type="primary" loading={submitting}>Guardar</Button>
            </Row>
        </Form>
    )
}

export default RegisterNoticiasForm;