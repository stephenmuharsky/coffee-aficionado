import { createContext } from "react";
import "../styles/globals.css";

const StoreContext = createContext();

const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };

  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {children}
    </StoreContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
      {/* <footer>
        <h2>Made by Stephen</h2>
      </footer> */}
    </StoreProvider>
  );
}

export default MyApp;
