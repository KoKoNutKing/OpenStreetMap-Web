import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBar";
import MapView from "./components/Map";
import WeatherCard from "./components/WeatherCard";
import TranslateBox from "./components/TranslateBox";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { auth } from "./services/firebase";
import {type User, onAuthStateChanged, signOut } from "firebase/auth";
import {type LatLng } from "./types";
import "./App.css";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <SearchBox onSelectLocation={(loc) => setSelectedLocation(loc)} />
          <div style={{ flex: 1, position: "relative" }}>
            <MapView selectedLocation={selectedLocation} />
            {selectedLocation && (
              <WeatherCard
                lat={selectedLocation.lat}
                lon={selectedLocation.lon}
              />
            )}
          </div>

          <TranslateBox />
        </>
      ) : (
        <div>
          <Login />
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default App;
