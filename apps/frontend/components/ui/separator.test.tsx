import { render, screen } from "@testing-library/react"

jest.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

import { Separator } from "./separator"

describe("Separator component", () => {
  it("should render the separator element", () => {
    render(<Separator data-testid="sep" />)
    const separator = screen.getByTestId("sep")
    expect(separator).toBeInTheDocument()
  })

  it("should have class for horizontal orientation by default", () => {
    render(<Separator data-testid="sep" />)
    const separator = screen.getByTestId("sep")
    expect(separator.className).toContain("data-[orientation=horizontal]:h-px")
    expect(separator.className).toContain("data-[orientation=horizontal]:w-full")
  })

  it("should have class for vertical orientation when set", () => {
    render(<Separator orientation="vertical" data-testid="sep" />)
    const separator = screen.getByTestId("sep")
    expect(separator.className).toContain("data-[orientation=vertical]:h-full")
    expect(separator.className).toContain("data-[orientation=vertical]:w-px")
  })

  it("should apply additional className prop", () => {
    render(<Separator className="my-custom-class" data-testid="sep" />)
    const separator = screen.getByTestId("sep")
    expect(separator).toHaveClass("my-custom-class")
  })

  it("should accept decorative prop (boolean)", () => {
    render(<Separator decorative={false} data-testid="sep" />)
    const separator = screen.getByTestId("sep")
    expect(separator).toBeInTheDocument()
  })
})
