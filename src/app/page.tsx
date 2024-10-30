import Counter from "@/components/ui/Counter"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <Counter initialCount={0}/>
      </div>
      <Button>test</Button>
    </>
  )
}
