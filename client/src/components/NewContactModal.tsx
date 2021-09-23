import {useRef} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useContacts} from "../contexts/ContactsProvider";
import {NewConversationModalProps} from "./NewConversationModal";

interface NewContactModalProps extends NewConversationModalProps {}

function NewContactModal({ closeModal }: NewContactModalProps) {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const { createContact } = useContacts()!;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (idRef.current == null || nameRef.current == null) return;
    createContact(idRef.current!.value, nameRef.current!.value);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id </Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewContactModal;
