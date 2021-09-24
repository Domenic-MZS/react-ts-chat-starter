import {FormEvent, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useContacts} from "../contexts/ContactsProvider";
import {useConversations} from "../contexts/ConversationsProvider";

export interface NewConversationModalProps {
  closeModal: () => void;
}

function NewConversationModal({ closeModal }: NewConversationModalProps) {
  const [selectedContactIds, setSelectedContactsIds] = useState<Array<string>>(
    []
  );
  const { contacts } = useContacts()!;
  const { createConversation } = useConversations()!;

  function handleCheckboxChange(contactId: string): void {
    setSelectedContactsIds((prevSelectedContactsIds) => {
      if (prevSelectedContactsIds.includes(contactId)) {
        return prevSelectedContactsIds.filter((prevId) => contactId !== prevId);
      } else {
        return [...prevSelectedContactsIds, contactId];
      }
    });
  }

  function submitHandler(e: FormEvent) {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={`${selectedContactIds.includes(contact.id)}`}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit"> Chatear </Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;
