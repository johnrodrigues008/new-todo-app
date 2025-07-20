import { render, screen } from "@testing-library/react"

jest.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

import { Label } from "./label"

describe("Label component", () => {
  it("should render the label element", () => {
    render(<Label data-testid="label">My Label</Label>)
    const label = screen.getByTestId("label")
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe("LABEL")
    expect(label).toHaveTextContent("My Label")
  })

  it("should apply additional className prop", () => {
    render(<Label data-testid="label" className="my-custom-class">Text</Label>)
    const label = screen.getByTestId("label")
    expect(label).toHaveClass("my-custom-class")
  })

  it("should forward htmlFor prop", () => {
    render(<Label data-testid="label" htmlFor="input-id">Label Text</Label>)
    const label = screen.getByTestId("label")
    expect(label).toHaveAttribute("for", "input-id")
  })
})
