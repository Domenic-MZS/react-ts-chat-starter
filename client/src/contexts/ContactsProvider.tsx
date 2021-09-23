import React, {useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface ContactsContextValue {
  contacts: { id: string; name: string }[];
  createContact: (id: string, name: string) => void;
}

interface ContactsProviderProps {
  children: React.ReactNode;
}

export const ContactsContext = React.createContext<ContactsContextValue | null>(
  null
);

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useLocalStorage({
    key: "contacts",
    initialValue: [],
  });

  function createContact(id: string, name: string) {
    setContacts((prevContacts: []) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
