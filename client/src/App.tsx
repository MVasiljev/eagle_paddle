import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import AppRouter from "./routes/AppRouter";
import { Views } from "./constants/views";
import { setView } from "./redux/slices/viewSlice";

const App: React.FC = () => {
  const dispatch = useDispatch(); // Moved inside the component

  useEffect(() => {
    dispatch(setView(Views.CALENDAR)); // Dispatch on mount
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="container">
        <AppRouter />
      </div>
    </Provider>
  );
};

export default App;
