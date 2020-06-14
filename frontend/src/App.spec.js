import { render } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("<App />", () => {
  it("can render App Component", () => {
    render(<App />);
  });

  it("renders basic structural components", async () => {
    const { container, findByTestId } = await render(<App />);
    expect(await findByTestId("#navigation")).not.toBeNull();
    expect(await findByTestId("#header")).not.toBeNull();
    expect(await findByTestId("#content")).not.toBeNull();
  });
});
