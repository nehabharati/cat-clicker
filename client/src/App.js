import React from "react";
import "./App.css";
import CatCard from "./components/CatCard";
import CatForm from "./components/CatForm";
import CatGallery from "./components/CatGallery";
import CatList from "./components/CatList";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="App">
          <CatList />
          <CatCard />
          <CatForm />
        </div>
        <CatGallery />
      </div>
    </Provider>
  );
}

export default App;
