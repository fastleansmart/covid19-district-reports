import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./Navigation";
import React from "react";

describe("<Navigation />", () => {
  it("can render navigation component", () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  });
});
