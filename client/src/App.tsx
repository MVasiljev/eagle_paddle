import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRouter from "./routes/AppRouter";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <AppRouter />
      </div>
    </Provider>
  );
};

export default App;
