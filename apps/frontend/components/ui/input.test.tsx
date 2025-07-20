import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

import { Input } from "./input"

describe("Input component", () => {
  it("should render an input element with default type text", () => {
    render(<Input data-testid="input" placeholder="Enter text" />)
    const input = screen.getByTestId("input")
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe("INPUT")
    expect(input).toHaveAttribute("type", "text")
    expect(input).toHaveAttribute("placeholder", "Enter text")
  })

  it("should accept and apply the type prop", () => {
    render(<Input data-testid="input" type="email" />)
    const input = screen.getByTestId("input")
    expect(input).toHaveAttribute("type", "email")
  })

  it("should apply additional className prop", () => {
    render(<Input data-testid="input" className="my-custom-class" />)
    const input = screen.getByTestId("input")
    expect(input).toHaveClass("my-custom-class")
  })

  it("should respond to user input", async () => {
    const user = userEvent.setup()
    render(<Input data-testid="input" placeholder="Type here" />)
    const input = screen.getByPlaceholderText("Type here")
    await user.type(input, "Hello world")
    expect(input).toHaveValue("Hello world")
  })

  it("should be disabled when disabled prop is true", () => {
    render(<Input data-testid="input" disabled />)
    const input = screen.getByTestId("input")
    expect(input).toBeDisabled()
  })
})
