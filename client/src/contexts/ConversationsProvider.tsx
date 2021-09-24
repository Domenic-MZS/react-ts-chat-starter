import React, {FC, useContext, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {useContacts} from "./ContactsProvider";

// Interfaces and Types
interface Conversation {
  recipients: (string | { id: string; name: string })[];
  selected: boolean;
  messages: string[];
}

interface ConversationProviderValue {
  conversations: Conversation[];
  createConversation: (recipients: string[]) => void;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface ConversationContextProps {
  children: React.ReactNode;
}

// Context
export const ConversationsContext =
  React.createContext<ConversationProviderValue | null>(null);

// Hook
export function useConversations() {
  return useContext(ConversationsContext);
}

// Provider
export const ConversationsProvider: FC<ConversationContextProps> = (props) => {
  const [conversations, setConversations] = useLocalStorage({
    key: "conversations",
    initialValue: [],
  });
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts()!;

  function createConversation(recipients: string[]) {
    const formattedRecipients = _formatRecipients(recipients);

    setConversations((prevConversations: Conversation[]) => {
      return [
        ...prevConversations,
        { recipients: [...formattedRecipients], messages: [] },
      ];
    });
  }

  const _formatRecipients = (recipients: string[]) =>
    recipients.map((recipient) => {
      const contact = contacts.find((contact) => contact.id === recipient);
      const name = (contact && contact.name) || recipient;

      return { id: recipient, name };
    });

  const _conversations = (conversations as Conversation[]).map(
    (conversation, i) => {
      const selected = (i === selectedConversationIndex);
      return { ...conversation, selected };
    }
  );

  const value: ConversationProviderValue = {
    conversations: _conversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {props.children}
    </ConversationsContext.Provider>
  );
};
