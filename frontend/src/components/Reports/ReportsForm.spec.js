import { render, fireEvent } from "@testing-library/react";
import { ReportForm } from "./ReportForm";
import React from "react";

describe("<ReportsOverview />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("can render form component", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          id: 1,
          name: "Schleswig-Holstein",
        },
      ])
    );

    const { findByLabelText } = render(<ReportForm />);
    const fsSelect = await findByLabelText("Federal state");
    await fireEvent.click(fsSelect);
    const fsOption = await findByLabelText("Schleswig-Holstein");
    expect(fsOption).not.toBeNull();
  });
});
