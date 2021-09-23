import { FormEvent, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import {v4 as uuidV4} from "uuid";

interface LoginProps {
  onIdSubmit: React.Dispatch<any>;
}

function Login(props: LoginProps) {
  const idRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.onIdSubmit(idRef.current?.value);
  }

  function createNewId() {
    let randomUUID: String = uuidV4();

    props.onIdSubmit(randomUUID);
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required></Form.Control>
        </Form.Group>
        <Button type="submit" className="m-2">
          Login
        </Button>
        <Button onClick={createNewId} variant="secondary">Create a new Id</Button>
      </Form>
    </Container>
  );
}

export default Login;
