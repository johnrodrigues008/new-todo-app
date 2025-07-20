import { render, screen } from "@testing-library/react"
import { Alert, AlertTitle, AlertDescription } from "./alert"

describe("Alert component", () => {
  it("renders default alert", () => {
    render(<Alert data-testid="alert">Default alert</Alert>)
    const alert = screen.getByTestId("alert")

    expect(alert).toBeInTheDocument()
    expect(alert).toHaveAttribute("role", "alert")
    expect(alert).toHaveTextContent("Default alert")
    expect(alert.className).toMatch(/bg-card/)
  })

  it("renders destructive variant", () => {
    render(
      <Alert variant="destructive" data-testid="alert-destr">
        Destructive alert
      </Alert>
    )
    const alert = screen.getByTestId("alert-destr")

    expect(alert).toBeInTheDocument()
    expect(alert.className).toMatch(/text-destructive/)
  })

  it("renders AlertTitle and AlertDescription with correct slots", () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle data-testid="alert-title">Title here</AlertTitle>
        <AlertDescription data-testid="alert-description">
          Description here
        </AlertDescription>
      </Alert>
    )

    const title = screen.getByTestId("alert-title")
    const description = screen.getByTestId("alert-description")

    expect(title).toBeInTheDocument()
    expect(title).toHaveAttribute("data-slot", "alert-title")
    expect(title).toHaveTextContent("Title here")

    expect(description).toBeInTheDocument()
    expect(description).toHaveAttribute("data-slot", "alert-description")
    expect(description).toHaveTextContent("Description here")
  })

  it("forwards className and other props", () => {
    render(
      <Alert className="extra-class" data-testid="alert-class" aria-label="alert">
        Alert with class
      </Alert>
    )
    const alert = screen.getByTestId("alert-class")
    expect(alert).toHaveClass("extra-class")
    expect(alert).toHaveAttribute("aria-label", "alert")
  })
})
