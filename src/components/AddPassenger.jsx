import { useState, useRef, useEffect } from "react";
import PassengerPanel from "./PassengerPanel";

const AddPassenger = () => {
  const [open, setOpen] = useState(false);

  // Lifted passenger state
  const [passengers, setPassengers] = useState([
    { type: "Adult", subLabel: "12+ yrs", count: 1, min: 1 },
    { type: "Senior Citizen", subLabel: "60+ yrs", count: 0, min: 0 },
    { type: "Children", subLabel: "2–11 yrs", count: 0, min: 0 },
    { type: "Infant", subLabel: "Below 2 yrs", count: 0, min: 0 },
  ]);

  const ref = useRef(null);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Calculate total travellers excluding infants
  const totalTravellers = passengers
    .filter((p) => p.type !== "Infant")
    .reduce((sum, p) => sum + p.count, 0);

  // Get infant count
  const infantCount = passengers.find((p) => p.type === "Infant")?.count || 0;

  // Display string
  const summaryText = infantCount > 0
    ? `${totalTravellers} Travellers, ${infantCount} Infant${infantCount > 1 ? "s" : ""}`
    : `${totalTravellers} Traveller${totalTravellers > 1 ? "s" : ""}`;

  return (
    <div className="relative bookingslot hover:shadow-lg hover:shadow-blue-400/40" ref={ref}>
      <div
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className="text-xs text-gray-500">TRAVELLERS</p>
        <p className="font-semibold">{summaryText}</p>
      </div>

      {open && (
        <div className="absolute top-full right-0 mt-2 z-20 bg-white rounded-xl shadow-xl border">
          <PassengerPanel
            passengers={passengers}
            setPassengers={setPassengers}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AddPassenger;
