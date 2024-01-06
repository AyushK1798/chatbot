import { Container } from "react-bootstrap";
import ChatApp from "./components/ChatApp";

const App = () => {
  return (
    <Container className="app d-flex flex-column align-items-center justify-content-center">
      <p className="title">Chat-App</p>
     <ChatApp/>
    </Container>
  );
};

export default App;
