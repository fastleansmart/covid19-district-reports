import { render } from "@testing-library/react";
import { ReportsOverview } from "./ReportsOverview";
import React from "react";

describe("<ReportsOverview />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("can render overview component", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          name: "Schleswig-Holstein",
          infects: 10,
          helaed: 5,
          died: 0,
        },
      ])
    );
    const { findByText } = render(<ReportsOverview />);
    expect(await findByText("Schleswig-Holstein")).not.toBeNull();
  });
});
