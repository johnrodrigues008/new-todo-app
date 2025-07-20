import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"

describe("Dialog components", () => {
  it("renders Dialog and opens/closes properly", async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger data-testid="trigger">Open Dialog</DialogTrigger>
        <DialogContent data-testid="content" showCloseButton>
          <DialogHeader>
            <DialogTitle data-testid="title">Dialog Title</DialogTitle>
            <DialogDescription data-testid="description">
              Dialog description text.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
          <DialogClose data-testid="close-button" />
        </DialogContent>
      </Dialog>
    )

    expect(screen.queryByTestId("content")).not.toBeInTheDocument()

    await user.click(screen.getByTestId("trigger"))

    expect(screen.getByTestId("content")).toBeInTheDocument()
    expect(screen.getByTestId("title")).toHaveTextContent("Dialog Title")
    expect(screen.getByTestId("description")).toHaveTextContent("Dialog description text.")

    expect(document.querySelector('[data-slot="dialog-overlay"]')).toBeInTheDocument()

    expect(screen.getByTestId("close-button")).toBeInTheDocument()

    await user.click(screen.getByTestId("close-button"))

    expect(screen.queryByTestId("content")).not.toBeInTheDocument()
  })

  it("renders DialogContent without close button if showCloseButton=false", async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent data-testid="content" showCloseButton={false}>
          No close button here
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText("Open"))
    expect(screen.getByTestId("content")).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument()
  })
})
