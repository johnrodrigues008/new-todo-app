import { render, screen } from "@testing-library/react"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./command"

describe("Command components", () => {
  it("renders Command basic structure with no items (shows No results)", () => {
    render(
      <Command data-testid="command">
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
        </CommandList>
      </Command>
    )
    expect(screen.getByTestId("command")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Search commands...")).toBeInTheDocument()
    expect(screen.getByText("No results")).toBeInTheDocument()
  })

  it("renders Command with items (does NOT show No results)", () => {
    render(
      <Command data-testid="command">
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
            <CommandItem disabled>Disabled Item</CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Disabled Item")).toBeInTheDocument()
    expect(screen.queryByText("No results")).not.toBeInTheDocument()
  })
})
