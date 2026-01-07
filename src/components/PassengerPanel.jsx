/* ---------- Counter Row ---------- */
const CounterRow = ({ label, subLabel, count, onChange, min = 0, max = 9 }) => {
  return (
    <div className="flex justify-between items-center py-2 counterRow">
      <div>
        <p className="font-semibold text-sm">{label}</p>
        {subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 rounded-full border text-lg disabled:opacity-40"
          disabled={count <= min}
          onClick={() => onChange(count - 1)}
        >
          −
        </button>

        <span className="w-6 text-center font-semibold">{count}</span>

        <button
          className="w-8 h-8 rounded-full border text-lg disabled:opacity-40"
          disabled={count >= max}
          onClick={() => onChange(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

/* ---------- Passenger Panel ---------- */
const PassengerPanel = ({ passengers, setPassengers, onClose }) => {
  const updateCount = (index, value) => {
  setPassengers((prev) => {
    const currentPassenger = prev[index];
    const type = currentPassenger.type;

    const adultCount =
      prev.find((p) => p.type === "Adult")?.count || 1;

    const infantCount =
      prev.find((p) => p.type === "Infant")?.count || 0;

    const totalNonInfants = prev
      .filter((p) => p.type !== "Infant")
      .reduce((sum, p) => sum + p.count, 0);

    /* 🚫 Prevent decreasing Adult if infants would exceed adults */
    if (
      type === "Adult" &&
      value < currentPassenger.count &&
      infantCount > value
    ) {
      return prev;
    }

    /* 🚫 Prevent increasing non-infant beyond 9 */
    if (
      type !== "Infant" &&
      value > currentPassenger.count &&
      totalNonInfants >= 9
    ) {
      return prev;
    }

    /* 👶 Infants cannot exceed adults when increasing */
    if (type === "Infant" && value > adultCount) {
      return prev;
    }

    return prev.map((p, i) =>
      i === index ? { ...p, count: value } : p
    );
  });
};


  const adultCount =
    passengers.find((p) => p.type === "Adult")?.count || 1;

  return (
    <div className="p-4 w-80">
      <h4 className="font-semibold mb-3">TRAVELLERS</h4>

      {passengers.map((p, index) => (
        <CounterRow
          key={p.type}
          label={p.type}
          subLabel={p.subLabel}
          count={p.count}
          min={p.min}
          max={p.type === "Infant" ? adultCount : 9}
          onChange={(value) => updateCount(index, value)}
        />
      ))}

      <button
        onClick={onClose}
        className="mt-4 w-full h-10 bg-blue-600 text-white rounded-lg font-semibold"
      >
        Done
      </button>
    </div>
  );
};

export default PassengerPanel;
