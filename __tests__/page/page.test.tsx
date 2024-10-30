import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Page from "@/app/page"

describe("Page", () => {
  it("should renders button", () => {
    const { getByTestId, getByRole } = render(<Page />)
    const counterButton = getByTestId("counterComponent")
    const testButton = getByRole("button", { name: "test" })
    expect(testButton).toBeInTheDocument()
    expect(counterButton).toBeInTheDocument()
  })
})
