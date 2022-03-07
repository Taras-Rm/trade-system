import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

test("on internal render, login button should be disabeled", () => {
  render(<LoginForm />);
  expect(screen.getByRole("button", { name: /Login/i })).toBeDisabled();
});

test("if email and password is entered, login button becomes enabled", async () => {
  render(<LoginForm />);
  expect(screen.getByRole("button", { name: /Login/i })).toBeDisabled();

  userEvent.type(screen.getByLabelText(/email/i), "ticitac@gmail.com");
  userEvent.type(screen.getByLabelText(/password/i), "1234569");

  expect(await screen.findByRole("button", { name: /Login/i })).toBeEnabled();
});
