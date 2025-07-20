import { render, screen, fireEvent } from "@testing-library/react"
import { Checkbox } from "./checkbox"

describe("Checkbox component", () => {
  it("renders the checkbox", () => {
    render(<Checkbox data-testid="checkbox" />)
    const checkbox = screen.getByTestId("checkbox")
    expect(checkbox).toBeInTheDocument()
  })

  it("toggles checked state on click", () => {
    render(<Checkbox data-testid="checkbox" />)
    const checkbox = screen.getByTestId("checkbox")

    expect(checkbox.getAttribute("aria-checked")).toBe("false")

    fireEvent.click(checkbox)
    expect(checkbox.getAttribute("aria-checked")).toBe("true")

    fireEvent.click(checkbox)
    expect(checkbox.getAttribute("aria-checked")).toBe("false")
  })

  it("shows CheckIcon when checked", () => {
    render(<Checkbox data-testid="checkbox" defaultChecked />)
    const checkbox = screen.getByTestId("checkbox")
    const indicator = checkbox.querySelector('[data-slot="checkbox-indicator"]')
    expect(indicator).toBeInTheDocument()
  })
})
