import { Navbar, Container, Nav, Col, Row } from "react-bootstrap";
export function ShoesContainer({ shoes }) {
  return (
    <Container>
      <Row>
        {shoes.map((shoe) => {
          const imageLink = `https://codingapple1.github.io/shop/shoes${shoe.id}.jpg`;
          return (
            <Col xs={6} md={4}>
              <img src={imageLink} width="80%"></img>
              <h4>{shoe.title}</h4>
              <p>{shoe.price}</p>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
