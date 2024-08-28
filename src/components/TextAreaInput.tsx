
interface TextAreaProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string | number;
  min?: number
  required?: boolean
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

function TextAreaInput({ label, name, id, value, required, onChange }: TextAreaProps) {

  return (
    <>
      <label htmlFor={id || name} className="label">
        {label}
      </label>
      <textarea
        className="textarea textarea-bordered h-36 w-full"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}

export default TextAreaInput;
