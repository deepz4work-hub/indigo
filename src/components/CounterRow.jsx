const CounterRow = ({ label, subLabel, count, setCount, min = 0, max = 9 }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <p className="font-semibold text-sm">{label}</p>
        {subLabel && (
          <p className="text-xs text-gray-500">{subLabel}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 rounded-full border text-lg disabled:opacity-40"
          disabled={count <= min}
          onClick={() => setCount((c) => c - 1)}
        >
          −
        </button>

        <span className="w-6 text-center font-semibold">
          {count}
        </span>

        <button
          className="w-8 h-8 rounded-full border text-lg disabled:opacity-40"
          disabled={count >= max}
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
