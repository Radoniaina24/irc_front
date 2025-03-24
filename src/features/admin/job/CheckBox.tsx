interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
}) => {
  return (
    <div className="flex gap-2 items-center mt-4">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="bg-gray-100 border-gray-300 h-4 rounded text-blue-600 w-4 focus:ring-blue-500"
      />
      <label htmlFor={name} className="text-gray-900 text-sm">
        {label}
      </label>
    </div>
  );
};
export default Checkbox;
