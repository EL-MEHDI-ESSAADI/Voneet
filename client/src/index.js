import React from "react";
import ReactDOM from "react-dom/client";
import "GlobalCss/index.scss";
import App from "App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "reportWebVitals";
import { AppProvider } from "Components";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <AppProvider>
            <App />
         </AppProvider>
      </BrowserRouter>
   </React.StrictMode>
);

reportWebVitals();
