// Form.test.tsx
import * as React from "react"
import { render, screen } from "@testing-library/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import "@testing-library/jest-dom"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  testField: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
// Mock component to test Form components
const MockForm = () => {
  const methods = useForm({
    defaultValues: { testField: "" },
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...methods}>
      <FormField
        name="testField"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Test Label</FormLabel>
            <FormControl>
              <Input placeholder="firstname" {...field} />
            </FormControl>
            <FormDescription>Description text</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}

describe("Form components", () => {
  test("renders FormLabel with correct text", () => {
    render(<MockForm />)
    expect(screen.getByText("Test Label")).toBeInTheDocument()
  })

  test("FormControl has correct aria attributes without error", () => {
    render(<MockForm />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("aria-invalid", "false")
    expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("-form-item-description"),
    )
  })

  test("FormDescription renders with correct text", () => {
    render(<MockForm />)
    expect(screen.getByText("Description text")).toBeInTheDocument()
  })

  test("FormMessage does not render without error", () => {
    render(<MockForm />)
    expect(
      screen.queryByText("Username must be at least 2 characters."),
    ).not.toBeInTheDocument()
  })

  test("FormMessage renders error message when error exists", () => {
    const MockErrorForm = () => {
      const methods = useForm({
        defaultValues: { testField: "" },
      })
      const { setError } = methods
      React.useEffect(() => {
        setError("testField", { message: "This field is required" })
      }, [setError])

      return (
        <Form {...methods}>
          <FormField
            name="testField"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Label</FormLabel>
                <FormControl>
                  <Input placeholder="firstname" {...field} />
                </FormControl>
                <FormDescription>Description text</FormDescription>
                <FormMessage>Error message</FormMessage>
              </FormItem>
            )}
          />
        </Form>
      )
    }
    render(<MockErrorForm />)
    expect(screen.getByText("This field is required")).toBeInTheDocument()
  })
})

const MockFormFieldDisplay = () => {
  const { id, name, formDescriptionId, formMessageId, error } = useFormField()

  return (
    <div>
      <p data-testid="field-id">Field ID: {id}</p>
      <p data-testid="field-name">Field Name: {name}</p>
      <p data-testid="field-description-id">
        Description ID: {formDescriptionId}
      </p>
      <p data-testid="field-message-id">Message ID: {formMessageId}</p>
      {error && <p data-testid="field-error">Error: {error.message}</p>}
    </div>
  )
}

describe("useFormField hook", () => {
  const MockUseForm = ({ withError = false }) => {
    const methods = useForm({
      defaultValues: { testField: "" },
    })

    const { setError } = methods

    React.useEffect(() => {
      if (withError) {
        setError("testField", { message: "This field is required" })
      }
    }, [withError])

    return (
      <Form {...methods}>
        <FormField
          name="testField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Label</FormLabel>
              <FormControl>
                <Input placeholder="firstname" {...field} />
              </FormControl>
              <FormDescription>Description text</FormDescription>
              <FormMessage />
              <MockFormFieldDisplay />
            </FormItem>
          )}
        />
      </Form>
    )
  }

  const ComponentWithoutFormFieldContext = () => {
    const { name } = useFormField()
    return <div>{name}</div>
  }

  const ComponentWithoutFormProvider = () => {
    return (
      <div>
        <ComponentWithoutFormFieldContext />
      </div>
    )
  }

  test("useFormField provides correct context values without error", () => {
    render(<MockUseForm />)

    expect(screen.getByTestId("field-id")).toBeInTheDocument()
    expect(screen.getByTestId("field-name")).toHaveTextContent("testField")

    expect(screen.getByTestId("field-description-id").textContent).toContain(
      "form-item-description",
    )
    expect(screen.getByTestId("field-message-id").textContent).toContain(
      "form-item-message",
    )

    expect(screen.queryByTestId("field-error")).not.toBeInTheDocument()
  })

  test("useFormField provides correct error message when error exists", () => {
    render(<MockUseForm withError />)

    expect(screen.getByTestId("field-error")).toHaveTextContent(
      "This field is required",
    )
  })

  test("throws an error if used outside of FormProvider context", () => {
    expect(() => render(<ComponentWithoutFormProvider />)).toThrow(
      "useFormField must be used within a FormProvider",
    )
  })

  test("throws an error if used outside of FormField context", () => {
    const TestComponent = () => {
      const method = useForm()
      return (
        <Form {...method}>
          <ComponentWithoutFormFieldContext />
        </Form>
      )
    }

    expect(() => render(<TestComponent />)).toThrow(
      "useFormField must be used within a <FormField>",
    )
  })
})
