import { useLocation, useNavigate } from "react-router-dom";
import flightData from "../assets/data.json";

const FlightResults = () => {
  debugger
  const navigate = useNavigate();
  const { state } = useLocation();
  const searchData = state?.searchData;

  // 🚨 Direct access / refresh protection
  if (!searchData) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 font-semibold mb-4">
          Please search for flights first
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Go to Search
        </button>
      </div>
    );
  }

  const { from, to, departureDate, tripType } = searchData;

  // 🔍 Filter flights
  const results = flightData.flights.filter(
    (f) => f.from === from.iata && f.to === to.iata
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* 🔷 SEARCH SUMMARY */}
      <div className="bg-white rounded-xl p-5 shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {from.city} ({from.iata}) → {to.city} ({to.iata})
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {departureDate && departureDate.toLocaleDateString()} · {tripType.toUpperCase()}
        </p>
      </div>

      {/* 🛫 FLIGHT LIST */}
      {results.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-lg font-semibold">
            No flights available for this route
          </p>
        </div>
      ) : (
        results.map((flight, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow mb-4 hover:shadow-lg transition"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Airline */}
              <div className="col-span-3">
                <p className="font-bold text-gray-800">IndiGo</p>
                <p className="text-xs text-gray-500">
                  {flight.flightNumber}
                </p>
              </div>

              {/* Departure */}
              <div className="col-span-2 text-center">
                <p className="text-xl font-bold">
                  {flight.departureTime}
                </p>
                <p className="text-xs text-gray-500">{flight.from}</p>
              </div>

              {/* Duration */}
              <div className="col-span-2 text-center">
                <p className="font-semibold">{flight.duration}</p>
                <p className="text-xs text-gray-400">Non Stop</p>
              </div>

              {/* Arrival */}
              <div className="col-span-2 text-center">
                <p className="text-xl font-bold">
                  {flight.arrivalTime}
                </p>
                <p className="text-xs text-gray-500">{flight.to}</p>
              </div>

              {/* Price */}
              <div className="col-span-2 text-right">
                <p className="text-2xl font-bold text-blue-600">
                  ₹ {flight.price}
                </p>
              </div>

              {/* Action */}
              <div className="col-span-1 text-right">
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightResults;
