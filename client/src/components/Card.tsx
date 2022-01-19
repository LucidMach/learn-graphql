interface props {
  contact: {
    __typename: string;
    avatar: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Card: React.FC<props> = ({ contact }) => {
  const { avatar, firstName, lastName, email } = contact;
  return (
    <div className="flex mx-10 w-auto shadow-md p-5 gap-10 rounded-md">
      <img className="w-16 rounded-full" src={avatar} alt="dp of the contact" />
      <div className="flex flex-col justify-center">
        <div className="flex text-slate-800 font-semibold">
          <h1>
            {firstName} {lastName}
          </h1>
        </div>
        <p className="text-slate-500">{email}</p>
      </div>
    </div>
  );
};

export default Card;
