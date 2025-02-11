import { render, screen } from "@testing-library/react";

import Loader from "./loader";
import "@testing-library/jest-dom";

describe("Loader Component", () => {
  it("renders the loader", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("applies default size and color", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader");

    expect(loader).toHaveStyle({
      width: "50px",
      height: "50px",
      border: "5px solid #01b4e4",
      borderTop: "5px solid transparent",
    });
  });

  it("applies custom size and color", () => {
    render(<Loader size={100} color="#ff0000" />);
    const loader = screen.getByTestId("loader");

    expect(loader).toHaveStyle({
      width: "100px",
      height: "100px",
      border: "10px solid #ff0000",
      borderTop: "10px solid transparent",
    });
  });

  it("has spinning animation", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader");

    expect(loader).toHaveClass("loader");
  });
});
