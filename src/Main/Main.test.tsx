import React from "react";
import { render, screen } from "@testing-library/react";
import { Main } from "./Main";

describe("<Main />", () => {
  it("should render Main component on screen", () => {
    expect.assertions(1);
    render(<Main />);
    const component = screen.getByText(/main/i);
    expect(component).toBeInTheDocument();
  });
});
