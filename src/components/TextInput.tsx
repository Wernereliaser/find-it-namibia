interface TextInputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string | number;
  min?: number
  required?: boolean
  disabled?: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function TextInput({ label, name, id, type, value, min, required, disabled, onChange }: TextInputProps) {
  return (
    <>
      <label className="label" htmlFor={id}>{label}</label>
      <input
        className="input input-bordered w-full"
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={min}
      />
    </>
  );
}

export default TextInput;

