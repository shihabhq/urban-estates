const Input = ({ label, title, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1">
        <input
          id={label}
          name={label}
          placeholder={placeholder}
          type={type}
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-inherit text-black focus:outline-none focus:ring-btncol focus:border-btncol sm:text-sm"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
