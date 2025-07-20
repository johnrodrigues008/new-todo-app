import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./button"

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button data-testid="button">Click me</Button>)
    const button = screen.getByTestId("button")

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("Click me")
    expect(button.tagName).toBe("BUTTON")
    expect(button.className).toMatch(/bg-primary/)
    expect(button.className).toMatch(/h-9/)
  })

  it("renders with different variants and sizes", () => {
    const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const
    const sizes = ["default", "sm", "lg", "icon"] as const

    variants.forEach(variant => {
      sizes.forEach(size => {
        render(
          <Button variant={variant} size={size} data-testid={`btn-${variant}-${size}`}>
            Btn
          </Button>
        )
        const btn = screen.getByTestId(`btn-${variant}-${size}`)
        expect(btn).toBeInTheDocument()
        if (variant === "default") {
          expect(btn.className).toMatch(/bg-primary/)
        } else {
          expect(btn.className.length).toBeGreaterThan(0)
        }
      })
    })
  })

  it("renders as child when asChild is true", () => {
    render(
      <Button asChild data-testid="slot-btn">
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByTestId("slot-btn")

    expect(link.tagName).toBe("A")
    expect(link).toHaveTextContent("Link Button")
  })

  it("supports disabled attribute", () => {
    render(
      <Button data-testid="disabled-btn" disabled>
        Disabled
      </Button>
    )
    const btn = screen.getByTestId("disabled-btn")
    expect(btn).toBeDisabled()
  })

  it("responds to click events", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(
      <Button data-testid="click-btn" onClick={handleClick}>
        Click me
      </Button>
    )
    const btn = screen.getByTestId("click-btn")

    await user.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
