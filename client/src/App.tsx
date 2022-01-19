import { useState } from "react";
import Input from "./components/Input";
import Card from "./components/Card";
import { gql, useMutation, useQuery } from "@apollo/client";

const CONTACTS = gql`
  query Query {
    contacts {
      avatar
      id
      firstName
      lastName
      email
    }
  }
`;

const CREATE_CONTACT = gql`
  mutation Mutation(
    $firstName: String
    $lastName: String
    $email: String
    $avatar: String
  ) {
    createContact(
      firstName: $firstName
      lastName: $lastName
      email: $email
      avatar: $avatar
    ) {
      id
    }
  }
`;

const App: React.FC = () => {
  const { loading, data } = useQuery(CONTACTS);

  const [fName, setfName] = useState<string>("");
  const [lName, setlName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const [createContact] = useMutation(CREATE_CONTACT, {
    variables: {
      firstName: fName,
      lastName: lName,
      email,
      avatar,
    },
  });

  interface Contact {
    __typename: string;
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
  }

  const handleClick = () => {
    console.log({ fName, lName, email, avatar });
    createContact();
    setfName("");
    setlName("");
    setEmail("");
    setAvatar("");
  };

  return (
    <div className="flex">
      <div className="flex flex-col bg-slate-800 px-8 py-12 h-screen justify-center">
        <h1 className="text-3xl text-white font-sans">Add a Contact</h1>
        <Input placeholder="First Name" setValue={setfName} value={fName} />
        <Input placeholder="Last Name" setValue={setlName} value={lName} />
        <Input placeholder="Email" setValue={setEmail} value={email} />
        <Input placeholder="Avatar" setValue={setAvatar} value={avatar} />
        <button
          className="p-3 my-3 rounded-md w-80 bg-blue-600 text-white hover:bg-blue-500"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
      <div className="flex flex-col w-[100%] my-10 gap-2">
        {loading
          ? "loading..."
          : data.contacts.map((contact: Contact) => <Card contact={contact} />)}
      </div>
    </div>
  );
};

export default App;
