import { render, screen, getByTestId } from "@testing-library/react";
import BigCard from "./BigCard";

test("if title and text is entered, big card should have it", async () => {
  render(<BigCard title="My title" text="My text" />);

  expect(await screen.findByTestId("cardTitle")).toHaveTextContent("My title");

  expect(await screen.findByTestId("cardText")).toHaveTextContent("My text");
});
