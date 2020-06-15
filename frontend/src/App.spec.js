import { render } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("<App />", () => {
  it("renders basic structural components", async () => {
    const { findByText } = render(<App />);
    expect(await findByText("Covid-19 District Reports")).not.toBeNull();
    expect(await findByText("Overview")).not.toBeNull();
    expect(await findByText("Report data")).not.toBeNull();
  });
});
