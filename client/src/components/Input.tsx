interface props {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<props> = ({ placeholder, value, setValue }) => {
  return (
    <input
      value={value}
      type="text"
      className="p-3 my-3 rounded-md w-80"
      placeholder={placeholder}
      autoComplete="nope"
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
    />
  );
};

export default Input;
