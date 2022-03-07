import { render, screen, getByTestId } from "@testing-library/react";
import GoodsItem from "./GoodsItem";

test("if title and text is entered, big card should have it", async () => {
  const { rerender } = render(<GoodsItem />);

  expect(await screen.findByTestId("goodName")).toBeEmptyDOMElement();
  expect(await screen.findByTestId("goodPrice")).toHaveTextContent("$");

  rerender(<GoodsItem name="Car" price={1200} />);

  expect(await screen.findByTestId("goodName")).toHaveTextContent("Car");
  expect(await screen.findByTestId("goodPrice")).toHaveTextContent("$1200");
});
