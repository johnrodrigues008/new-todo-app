import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Badge } from "./badge"

describe("Badge component", () => {
  it("renders default badge", () => {
    render(<Badge data-testid="badge">Default</Badge>)
    const badge = screen.getByTestId("badge")

    expect(badge).toBeInTheDocument()
    expect(badge.tagName).toBe("SPAN")
    expect(badge).toHaveTextContent("Default")
    expect(badge.className).toMatch(/bg-primary/)
  })

  it("renders with all variants", () => {
    const variants = ["default", "secondary", "destructive", "outline"] as const

    variants.forEach((variant) => {
      render(
        <Badge variant={variant} data-testid={`badge-${variant}`}>
          {variant}
        </Badge>
      )
      const badge = screen.getByTestId(`badge-${variant}`)
      expect(badge).toBeInTheDocument()
      expect(badge.className.length).toBeGreaterThan(0)
    })
  })

  it("renders as child when asChild is true", () => {
    render(
      <Badge asChild data-testid="badge-slot">
        <a href="/test">Link Badge</a>
      </Badge>
    )
    const link = screen.getByTestId("badge-slot")
    expect(link.tagName).toBe("A")
    expect(link).toHaveTextContent("Link Badge")
  })

  it("forwards className and other props", () => {
    render(
      <Badge className="extra-class" data-testid="badge-class">
        Class Test
      </Badge>
    )
    const badge = screen.getByTestId("badge-class")
    expect(badge).toHaveClass("extra-class")
    expect(badge).toHaveTextContent("Class Test")
  })

  it("handles click events", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(
      <Badge data-testid="badge-click" onClick={handleClick} role="button" tabIndex={0}>
        Clickable
      </Badge>
    )
    const badge = screen.getByTestId("badge-click")

    await user.click(badge)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
