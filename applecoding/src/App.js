import "./App.css";
import { Navbar, Container, Nav, Col, Row, Tab } from "react-bootstrap";
import { ShoesContainer } from "./components/ShoesContainer";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Detail } from "./components/Detail";
import { TabUI } from "./components/TabUI";

function App() {
  const navigate = useNavigate();

  const shoes = [
    {
      id: 1,
      title: "White and Black",
      content: "Born in France",
      price: 120000,
    },

    {
      id: 2,
      title: "Red Knit",
      content: "Born in Seoul",
      price: 110000,
    },

    {
      id: 3,
      title: "Grey Yordan",
      content: "Born in the States",
      price: 130000,
    },
  ];

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#feature">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg"></div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate("/detail");
        }}
      >
        Detail
      </button>
      <button
        onClick={() => {
          navigate("/about");
        }}
      >
        About
      </button>

      <Routes>
        <Route
          path="/"
          element={<ShoesContainer shoes={shoes}></ShoesContainer>}
        />
        <Route
          path="/detail"
          element={
            <div>
              <Detail></Detail>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path="cond" element={<TabUI></TabUI>}></Route>
        </Route>
        <Route
          path="/about"
          element={
            <div>
              <h4>about page</h4>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path="member" element={<div>멤버들</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>
        <Route path="*" element={<div>404 Error</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
