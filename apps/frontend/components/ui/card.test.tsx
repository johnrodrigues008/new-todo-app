import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card"

describe("Card components", () => {
  it("renders Card with custom className and props", () => {
    render(<Card data-testid="card" className="custom-class" id="card-id" />)
    const card = screen.getByTestId("card")
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass("custom-class")
    expect(card).toHaveAttribute("id", "card-id")
    expect(card).toHaveAttribute("data-slot", "card")
  })

  it("renders CardHeader with className and props", () => {
    render(<CardHeader data-testid="header" className="header-class" />)
    const header = screen.getByTestId("header")
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass("header-class")
    expect(header).toHaveAttribute("data-slot", "card-header")
  })

  it("renders CardTitle with className and props", () => {
    render(<CardTitle data-testid="title" className="title-class" />)
    const title = screen.getByTestId("title")
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass("title-class")
    expect(title).toHaveAttribute("data-slot", "card-title")
  })

  it("renders CardDescription with className and props", () => {
    render(<CardDescription data-testid="description" className="desc-class" />)
    const description = screen.getByTestId("description")
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass("desc-class")
    expect(description).toHaveAttribute("data-slot", "card-description")
  })

  it("renders CardAction with className and props", () => {
    render(<CardAction data-testid="action" className="action-class" />)
    const action = screen.getByTestId("action")
    expect(action).toBeInTheDocument()
    expect(action).toHaveClass("action-class")
    expect(action).toHaveAttribute("data-slot", "card-action")
  })

  it("renders CardContent with className and props", () => {
    render(<CardContent data-testid="content" className="content-class" />)
    const content = screen.getByTestId("content")
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass("content-class")
    expect(content).toHaveAttribute("data-slot", "card-content")
  })

  it("renders CardFooter with className and props", () => {
    render(<CardFooter data-testid="footer" className="footer-class" />)
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass("footer-class")
    expect(footer).toHaveAttribute("data-slot", "card-footer")
  })
})
