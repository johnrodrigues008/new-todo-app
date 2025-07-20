import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Textarea } from "./textarea"

describe("Textarea component", () => {
  it("should render the textarea element", () => {
    render(<Textarea placeholder="Type here..." />)
    const textarea = screen.getByPlaceholderText("Type here...")
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe("TEXTAREA")
  })

  it("should apply additional className prop", () => {
    render(<Textarea placeholder="Test" className="my-custom-class" />)
    const textarea = screen.getByPlaceholderText("Test")
    expect(textarea).toHaveClass("my-custom-class")
  })

  it("should forward other props like disabled", () => {
    render(<Textarea placeholder="Disabled" disabled />)
    const textarea = screen.getByPlaceholderText("Disabled")
    expect(textarea).toBeDisabled()
  })

  it("should accept and respond to user input", async () => {
    const user = userEvent.setup()
    render(<Textarea placeholder="Input test" />)
    const textarea = screen.getByPlaceholderText("Input test")
    await user.type(textarea, "Hello world")
    expect(textarea).toHaveValue("Hello world")
  })
})
