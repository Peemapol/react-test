import * as React from "react"
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { twMerge } from "tailwind-merge"
describe("Button Component", () => {
  afterEach(cleanup)
  const defaultText = "Button"

  const renderButton = (props: Partial<ButtonProps> = {}) => {
    return render(<Button {...props}>{defaultText}</Button>)
  }

  it("renders with default variant and size", () => {
    renderButton()
    const button = screen.getByRole("button", { name: defaultText })

    expect(button).toHaveClass(
      buttonVariants({ variant: "default", size: "default" }),
    )
    expect(button).toBeInTheDocument()
  })

  it("renders with different variants", () => {
    const variants: ButtonProps["variant"][] = [
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
    ]

    variants.forEach((variant, i) => {
      renderButton({ variant })
      const button = screen.getAllByRole("button", { name: defaultText })
      expect(button[i]).toHaveClass(buttonVariants({ variant }))
    })
  })

  it("renders with different sizes", () => {
    const sizes: ButtonProps["size"][] = ["default", "sm", "lg", "icon"]

    sizes.forEach((size, i) => {
      renderButton({ size })
      const button = screen.getAllByRole("button", { name: defaultText })
      expect(button[i]).toHaveClass(twMerge(buttonVariants({ size })))
    })
  })

  it("handles click events", () => {
    const onClick = jest.fn()
    renderButton({ onClick })
    const button = screen.getByRole("button", { name: defaultText })

    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("disables the button", () => {
    renderButton({ disabled: true })
    const button = screen.getByRole("button", { name: defaultText })

    expect(button).toBeDisabled()
  })

  it("renders as a child component using `Slot`", () => {
    render(
      <Button asChild>
        <div>testnaja</div>
      </Button>,
    )
    const element = screen.getByText("testnaja")

    expect(element.tagName).toBe("DIV")
    expect(element).toHaveClass(buttonVariants({ variant: "default", size: "default" }))
  })

  it("applies custom className", () => {
    const customClass = "custom-class"
    renderButton({ className: customClass })
    const button = screen.getByRole("button", { name: defaultText })

    expect(button).toHaveClass(customClass)
  })
})
