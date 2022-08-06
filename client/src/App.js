import React from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout, LandingPage, AuthCallbackPage, WelcomeDmPage, SpacesSearchPage, BackToHomePage } from "Pages";
import { AppToasts } from "Components";

function App() {
   return (
      <>
         <AppToasts />
         <Routes>
            <Route path="/" element={<SharedLayout />}>
               <Route index element={<LandingPage />} />
               <Route path="/callback" element={<AuthCallbackPage />} />
               <Route path="/welcomeMessage" element={<WelcomeDmPage />} />
               <Route path="/spacesSearch" element={<SpacesSearchPage />} />
               <Route path="*" element={<BackToHomePage />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
