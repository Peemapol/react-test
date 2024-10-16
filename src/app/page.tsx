import Counter from "./component/Counter"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Counter initialCount={0} />
    </div>
  )
}
