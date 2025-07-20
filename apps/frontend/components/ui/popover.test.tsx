import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./popover"

describe("Popover components", () => {
  it("should open popover and show content on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger data-testid="trigger">Open</PopoverTrigger>
        <PopoverContent data-testid="content">Hello World</PopoverContent>
      </Popover>
    )

    expect(screen.queryByTestId("content")).not.toBeInTheDocument()

    await user.click(screen.getByTestId("trigger"))

    expect(screen.getByTestId("content")).toBeInTheDocument()
    expect(screen.getByTestId("content")).toHaveTextContent("Hello World")
  })
})
