import { Card, Col, Row, Typography } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


function SelectionPage() {

  const navigate = useNavigate();

  const {user}:any = useContext(AuthContext)

  const isAdmin = user.roles[0].name !== "CLIENTE" ? true : false


  return (
    <Row style={{ marginTop: 100, paddingLeft: 24, paddingRight: 24 }} >
      <Col span={12} style={{ paddingBottom: 36, paddingRight: 12, cursor: 'pointer' }} >
        <Card onClick={() => {
          if (isAdmin) {
            navigate("/transports")
          } else {
            navigate("/transports/movilizationOrders")
          }
        }}>
          <Row style={{ display: 'flex', alignItems: 'center' }} >
            <Col span={8}>
              <img src="./trLogin.png" alt="" style={{ height: 260, width: '100%' }} />

            </Col>
            <Col span={16}>
              <Typography.Title>Gestion de transporte</Typography.Title>

            </Col>

          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card onClick={() => {
          if(isAdmin){
            navigate("/hemerotec")
          }else{
            navigate("/hemerotec/noticias")
          }
        }} >
          <Row style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
            <Col span={8}>
              <img src="./hmLogin.png" alt="" style={{ height: 260, width: '100%' }} />
            </Col>
            <Col span={16}>
              <Typography.Title>Hemeroteca</Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card onClick={() => navigate("/usersManagement")} >
          <Row style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
            <Col span={8}>
              <img src="./hmLogin.png" alt="" style={{ height: 260, width: '100%' }} />
            </Col>
            <Col span={16}>
              <Typography.Title>Administración de Usuarios</Typography.Title>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default SelectionPage;