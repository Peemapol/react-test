import Counter from "./component/Counter"

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-red-400">
      <Counter initialCount={0}/>
    </div>
  )
}
