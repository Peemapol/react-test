import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Counter from "@/components/ui/Counter"

describe(Counter, () => {
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
  })

  it("should displays initial count correctly", () => {
    const { getByTestId } = render(<Counter initialCount={5} />)
    const countValue = Number(getByTestId("count").textContent)
    expect(countValue).toEqual(5)
  })

  it("should increment by 1 if increment button is clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={0} />)
    const incrementBtn = getByRole("button", { name: "Increment" })
    const countValueBefore = Number(getByTestId("count").textContent)
    expect(countValueBefore).toEqual(0)
    fireEvent.click(incrementBtn)
    const countValueAfter = Number(getByTestId("count").textContent)
    expect(countValueAfter).toEqual(1)
  })

  it("should decrease by 1 if decrement button is clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={1} />)
    const decrementBtn = getByRole("button", { name: "Decrement" })
    const countValueBefore = Number(getByTestId("count").textContent)
    expect(countValueBefore).toEqual(1)
    fireEvent.click(decrementBtn)
    const countValueAfter = Number(getByTestId("count").textContent)
    expect(countValueAfter).toEqual(0)
  })

  it("should switch negative to positive", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={-1} />)
    const bt = getByTestId("button4")
    const countValueBefore = Number(getByTestId("count").textContent)
    expect(countValueBefore).toEqual(-1)
    fireEvent.click(bt)
    const countValueAfter = Number(getByTestId("count").textContent)


    expect(countValueAfter).toEqual(1)
  })

  it("should set zero", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={-1} />)
    const bt = getByTestId("button3")
    const countValueBefore = Number(getByTestId("count").textContent)
    expect(countValueBefore).toEqual(-1)
    fireEvent.click(bt)
    const countValueAfter = Number(getByTestId("count").textContent)


    expect(countValueAfter).toEqual(0)
  })
})
