import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Counter from "@/app/component/Counter"

describe("Home", () => {
  it("should renders button", () => {
    const { getByTestId } = render(<Counter />)
    const bt1 = getByTestId("button1")
    const bt2 = getByTestId("button2")
    const bt3 = getByTestId("button3")
    const bt4 = getByTestId("button4")

    expect(bt1).toBeInTheDocument()
    expect(bt2).toBeInTheDocument()
    expect(bt3).toBeInTheDocument()
    expect(bt4).toBeInTheDocument()

})})
