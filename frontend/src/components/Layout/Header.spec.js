import { render } from "@testing-library/react";
import { Header } from "./Header";
import React from "react";

describe("<Header />", () => {
  it("shows the introductory message", () => {
    render(<Header />);
  });
});
