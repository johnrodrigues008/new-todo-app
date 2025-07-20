import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}))

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu"

describe("DropdownMenu components", () => {
  it("renders and opens dropdown menu with content", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent data-testid="content">
          <DropdownMenuLabel data-testid="label">Menu Label</DropdownMenuLabel>
          <DropdownMenuItem data-testid="item">Item 1</DropdownMenuItem>
          <DropdownMenuCheckboxItem data-testid="checkbox" checked>
            Checkbox Item
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator data-testid="separator" />
          <DropdownMenuShortcut data-testid="shortcut">⌘K</DropdownMenuShortcut>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.queryByTestId("content")).not.toBeInTheDocument()

    await user.click(screen.getByTestId("trigger"))

    expect(screen.getByTestId("content")).toBeInTheDocument()
    expect(screen.getByTestId("label")).toBeInTheDocument()
    expect(screen.getByTestId("item")).toBeInTheDocument()
    expect(screen.getByTestId("checkbox")).toBeInTheDocument()
    expect(screen.getByTestId("separator")).toBeInTheDocument()
    expect(screen.getByTestId("shortcut")).toBeInTheDocument()
  })

  it("renders and shows radio group items", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Radio Group</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup defaultValue="option1">
            <DropdownMenuRadioItem value="option1" data-testid="radio1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2" data-testid="radio2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText("Open Radio Group"))
    expect(screen.getByTestId("radio1")).toBeInTheDocument()
    expect(screen.getByTestId("radio2")).toBeInTheDocument()
  })

  it("renders submenu and opens submenu content", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-testid="sub-trigger">Submenu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent data-testid="sub-content">Sub Content</DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.queryByTestId("sub-trigger")).not.toBeInTheDocument()

    await user.click(screen.getByText("Open Menu"))

    expect(screen.getByTestId("sub-trigger")).toBeInTheDocument()

    await user.click(screen.getByTestId("sub-trigger"))

    expect(screen.getByTestId("sub-content")).toBeInTheDocument()
  })

  it("applies additional className to DropdownMenuItem inside Content", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem data-testid="item" className="extra-class">
            Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByText("Open Menu"))
    expect(screen.getByTestId("item")).toHaveClass("extra-class")
  })

  it("renders CheckboxItem inside Content", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem data-testid="checkbox" checked>
            Check me
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByText("Open Menu"))
    expect(screen.getByTestId("checkbox")).toBeInTheDocument()
  })
})
