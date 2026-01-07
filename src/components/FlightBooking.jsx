import { useState } from "react";
import { useNavigate } from "react-router-dom";
import airports from "../assets/airports.json";
import useDebounce from "../hooks/useDebouce";
import Card from "../common/Card";
import InputText from "../common/InputText";
import DatePicker from "../common/DatePicker";
import AddPassenger from "./AddPassenger";
import NoWorkResult_ from "postcss/lib/no-work-result";

const TRIP_TYPES = {
  ONE_WAY: "oneway",
  ROUND_TRIP: "roundtrip",
  // MULTI_CITY: "multicity",
};

const filterAirports = (query, excludeIata) => {
  if (!query) return [];
  return airports
    .filter((a) =>
      `${a.city} ${a.iata}`.toLowerCase().includes(query.toLowerCase())
    )
    .filter((a) => a.iata !== excludeIata)
    .slice(0, 6);
};

const TripTypeRadio = ({ value, checked, onChange, label }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="tripType"
      checked={checked}
      onChange={() => onChange(value)}
      className="accent-blue-600"
    />
    <span className="text-sm font-semibold text-gray-700">{label}</span>
  </label>
);

const FlightBooking = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [tripType, setTripType] = useState(TRIP_TYPES.ONE_WAY);
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);

  // passenger state should be OBJECT/ARRAY (not string)
  const [passengers, setPassengers] = useState([
    { type: "Adult", count: 1 },
    { type: "Child", count: 0 },
    { type: "Senior", count: 0 },
    { type: "Infant", count: 0 },
  ]);

  const debouncedFrom = useDebounce(fromQuery);
  const debouncedTo = useDebounce(toQuery);

  const fromResults = filterAirports(debouncedFrom, to?.iata);
  const toResults = filterAirports(debouncedTo, from?.iata);

  const routeError =
    from && to && from.iata === to.iata
      ? "Origin and destination cannot be the same"
      : "";

  const passengerCount = passengers
    .filter(p => p.type !== "Infant")
    .reduce((s, p) => s + p.count, 0);

const handleSearch = () => {
if(tripType === TRIP_TYPES.ONE_WAY){
  if(!from || !to){alert("Please fill all required fields"); return};
  navigate("/results", {
    state: {
      searchData: {
        from,
        to,
        departureDate,
        arrivalDate,
        tripType,
        passengers,
      },
    },
  });
}
else if(tripType === TRIP_TYPES.ROUND_TRIP){
  if(!from || !to || !departureDate || !arrivalDate){alert("Please fill all required fields"); return};
  navigate("/results", {
    state: {
      searchData: {
        from,
        to,
        departureDate,
        arrivalDate,
        tripType,
        passengers,
      },
    },
  });
}
}



  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Flight Booking
        </h2>

        {/* Trip Type */}
        <div className="flex gap-6 mb-5">
          {Object.values(TRIP_TYPES).map(type => (
            <TripTypeRadio
              key={type}
              value={type}
              checked={tripType === type}
              onChange={setTripType}
              label={type.replace("_", " ").toUpperCase()}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 relative">
          {/* FROM */}
          <div className="relative bookingslot hover:shadow-lg hover:shadow-blue-400/40">
            <InputText
              label="FROM"
              value={from ? `${from.city} (${from.iata})` : fromQuery}
              onChange={(val) => {
                setFrom(null);
                setFromQuery(val);
              }}
            />
            {fromResults.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-xl shadow">
                {fromResults.map((a) => (
                  <li
                    key={a.iata}
                    onClick={() => {
                      setFrom(a);
                      setFromQuery("");
                    }}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    {a.city} ({a.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TO */}
          <div className="relative bookingslot hover:shadow-lg hover:shadow-blue-400/40">
            <InputText
              label="TO"
              value={to ? `${to.city} (${to.iata})` : toQuery}
              onChange={(val) => {
                setTo(null);
                setToQuery(val);
              }}
            />
            {toResults.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-xl shadow">
                {toResults.map((a) => (
                  <li
                    key={a.iata}
                    onClick={() => {
                      setTo(a);
                      setToQuery("");
                    }}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    {a.city} ({a.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <DatePicker
            action="Departure"
            maxDate={Date()}
            value={departureDate}
            onChange={setDepartureDate}
          />
         
{tripType === TRIP_TYPES.ROUND_TRIP ? (
          <DatePicker
            action="Arrival"
            maxDate={departureDate||Date()}
            value={arrivalDate}
            onChange={setArrivalDate}
            disabled={tripType !== TRIP_TYPES.ROUND_TRIP}
          />
):(
  <div className="relative bookingslot hover:shadow-lg hover:shadow-blue-400/40">
  <label>Return</label>
  <p>Save more and enjoy up to ₹1000 off!</p></div>

)}


  <AddPassenger
    passengers={passengers}
    setPassengers={setPassengers}
    passengerCount={passengerCount}
  />
 <div className="absolute right-4 top-9 pointer-events-none">
{/* {tripType === TRIP_TYPES.MULTI_CITY && (

  
    <div className="w-4 h-4 relative">
      <span className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 -translate-x-1/2"></span>
      <span className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-400 -translate-y-1/2"></span>
    </div>
 
)} */}


</div>

        </div>

        {routeError && (
          <p className="text-red-600 mt-2">{routeError}</p>
        )}

       <button
  onClick={handleSearch}
  // disabled={!from || !to || !departureDate}
  className="
    ml-auto mt-6
    h-14 px-10 rounded-xl
    bg-blue-600 font-bold text-lg
    hover:shadow-lg hover:shadow-blue-400/40
    transition-all duration-200
    active:scale-95
    disabled:opacity-50
  "
>
  Search Flights
</button>

      </Card>
    </div>
  );
};

export default FlightBooking;
