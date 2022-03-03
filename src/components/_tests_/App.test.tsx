import { render, screen } from "@testing-library/react";
import App from "../../App";

const city = {
  name: "Ghaziabad",
  aqi: "283 PM2.5",
  cigg: "12",
};

it("renders title", () => {
  render(<App></App>);
  expect(
    screen.getByText("Delhi smog: How many cigarettes did you smoke this week?")
  ).toBeInTheDocument();
});

it("renders city selection", () => {
  render(<App></App>);
  expect(
    screen.getByText(
      "1 cigarette is equivalent to an air pollution of 22 μg/m3 (Absolute value: 21.6 μg/m3) for one day."
    )
  ).toBeInTheDocument();
});

it("renders methodology section", () => {
  render(<App></App>);
  expect(screen.getByText("Methodology for calculation:")).toBeInTheDocument();
});
