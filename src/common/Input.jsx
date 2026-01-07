const Input = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="relative">
      {label && (
        <label className="text-xs font-semibold text-gray-500">
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full h-12 px-4 rounded-xl border border-gray-300
                   focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                   outline-none"
      />
    </div>
  );
};

export default Input;
