import React from "react";
import { Route, Routes } from "react-router-dom";
import { Alert } from "react-bootstrap";
import {
  SharedLayout,
  LandingPage,
  AuthCallbackPage,
  WelcomeDmPage,
  SpacesSearchPage,
  BackToHomePage,
} from "Pages";
import { AppToasts } from "Components";

/*
   I tried to lazy load the pages but this decrease the performance instead of increasing it I think because
   the pages are small and the cost of waiting the initial page  to load (lazy loading) bigger than loading 
   the whole app in one file 
*/

function App() {
  return (
    <>
      <AppToasts />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/callback"
            element={<AuthCallbackPage />}
          />
          <Route
            path="/welcomeMessage"
            element={<WelcomeDmPage />}
          />
          <Route
            path="/spacesSearch"
            element={<SpacesSearchPage />}
          />
          <Route path="*" element={<BackToHomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
