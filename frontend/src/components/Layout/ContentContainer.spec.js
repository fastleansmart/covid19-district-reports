import { render } from "@testing-library/react";
import { ContentContainer } from "./ContentContainer";
import { BrowserRouter } from "react-router-dom";
import React from "react";

describe("<ContentContainer />", () => {
  it("can render content container component", () => {
    const { findByText } = render(
      <BrowserRouter>
        <ContentContainer />
      </BrowserRouter>
    );
  });
});
