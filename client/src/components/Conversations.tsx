import {ListGroup} from "react-bootstrap";
import {useConversations} from "../contexts/ConversationsProvider";

function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()!;

  console.log(conversations);
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, i) => (
        <ListGroup.Item
          key={i}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(i)}
        >
          {(conversation.recipients as { name: string }[])
            .map((r) => r.name)
            .join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversations;
