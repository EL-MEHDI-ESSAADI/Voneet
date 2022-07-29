import { render, screen } from "@testing-library/react";
import App from "App";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "Components";
import { successAuthCallbackRes, failResponse } from "__mocks__";
import axios from "axios";

// mock axios module
jest.mock("axios");

describe("AuthcallbackPage", () => {
   test("should display user and sucess message", async () => {
      // the returned promise from axios.get will resolved with authCallbackRes
      axios.get.mockResolvedValue(successAuthCallbackRes);

      render(
         <MemoryRouter initialEntries={["/callback"]}>
            <AppProvider>
               <App />
            </AppProvider>
         </MemoryRouter>
      );

      // const user = await screen.findByRole("button",{name: /EL MEHDI ESSAADI/i});
      const user = await screen.findByLabelText("user profile");
      const successMessageEl = await screen.findByText(/login successful/i);

      // assersion: success message displayed
      expect(successMessageEl).toBeInTheDocument();
      // assersion: user displayed
      expect(user).toBeInTheDocument();
      // assersion: skeleton not displayed
      expect(user).toHaveTextContent(/EL MEHDI ESSAADI/i);
   });

   test("should display fail message and login btn", async () => {
      // the returned promise from axios.get will reject
      axios.get.mockRejectedValue(failResponse);

      render(
         <MemoryRouter initialEntries={["/callback"]}>
            <AppProvider>
               <App />
            </AppProvider>
         </MemoryRouter>
      );

      const loginBtn = await screen.findByRole("button", { name: /login/i });
      const failMessage = await screen.findByText(/Something went wrong please try to login again/i);

      // assersion: fail message displayed
      expect(failMessage).toBeInTheDocument();
      // assersion: login button displayed
      expect(loginBtn).toBeInTheDocument();
   });
});
