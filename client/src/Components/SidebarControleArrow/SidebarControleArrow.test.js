import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "Components";
import "jest-styled-components";

describe("sidenav toggle btn", () => {
   test("should close sidenav and open it", () => {
      render(
         <MemoryRouter>
            <AppProvider>
               <App />
            </AppProvider>
         </MemoryRouter>
      );

      const sidenavEl = screen.getByLabelText("sidenav");
      const [toggleBtn] = screen.getAllByLabelText("toggle sidenav");

      // by default window size is 1024 (less than xl that is 1200), so sidenav should initially be closed

      // assertion: sidenav is closed
      expect(sidenavEl).toHaveStyleRule("width", "var(--closed-sidenav-width)");
      userEvent.click(toggleBtn);
      // assertion: sidenav is open
      expect(sidenavEl).toHaveStyleRule("width", "var(--sidenav-width)");
      userEvent.click(toggleBtn);
      // assertion: sidenav is closed
      expect(sidenavEl).toHaveStyleRule("width", "var(--closed-sidenav-width)");
      userEvent.click(toggleBtn);
   });
});
