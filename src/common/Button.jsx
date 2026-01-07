const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" ml-auto
    h-14 px-10
    rounded-xl
    bg-blue-600
    text-white font-bold text-lg
    hover:shadow-lg hover:shadow-blue-400/40
    transition-all duration-200
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
