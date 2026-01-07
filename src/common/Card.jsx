const Card = ({ children }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
      {children}
    </div>
  );
};

export default Card;
