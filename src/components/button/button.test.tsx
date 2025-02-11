import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import Button from "./button";

describe("Button", () => {
  test("renders the button with the correct label", () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  test("applies the correct variant classes", () => {
    const { container } = render(<Button label="Primary" variant="primary" />);
    expect(container.firstChild).toHaveClass("primary");
  });

  test("applies the correct size classes", () => {
    const { container } = render(<Button label="Large" size="large" />);
    expect(container.firstChild).toHaveClass("large");
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("disables the button when disabled prop is passed", () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
