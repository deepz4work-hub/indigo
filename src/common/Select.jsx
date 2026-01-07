const Select = ({ label, value, onChange, options }) => {
  return (
    <div>
      {label && (
        <label className="text-xs font-semibold text-gray-500">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-12 px-4 rounded-xl border border-gray-300
                   focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                   outline-none"
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
