const InputText = ({ label, value, onChange, placeholder }) => {
  return (
    <>
      {label && (
        <label className="text-xs font-semibold text-gray-500">
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-0 w-full h-12 outline-none"
      />
      {{value} && (value||"Search By Place or Airport")}
     </>
  );
 
};

export default InputText;
