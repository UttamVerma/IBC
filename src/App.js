import "./App.css";
import Loader from "./components/Loader";
import PopupForm from "./components/PopupForm";
import WaitingLoader from "./components/WaitingLoader";
import AllRoutes from "./routes/AllRoutes";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("https://api.ipgeolocation.io/ipgeo?apiKey=7446859e69024286833e93c63b768294")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data){
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().split('T')[0];
        let formattedTime = currentDate.toISOString().split('T')[1].split('.')[0];
        fetch("https://ibc-cm-default-rtdb.firebaseio.com/data.json", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            zipcode: data.zipcode,
            ip: data.ip,
            organization: data.organization,
            date: formattedDate,
            time: new Date().toLocaleTimeString(),
          })
        })
        .then(response => response.json())
        .catch(error => {
          console.log("Error:", error);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
  },[]);
  return (
    <div className="App">
      <ToastContainer />
      <Loader />
      <HelmetProvider>
        <AllRoutes />
      </HelmetProvider>
      <PopupForm />
      <WaitingLoader />
    </div>
  );
}

export default App;
