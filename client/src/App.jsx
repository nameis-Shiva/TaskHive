import { RouterProvider } from "react-router-dom"
import { router } from "./Router"


const App = () => {
  return (
    <div className="bg-zinc-800 w-screen h-screen flex justify-center items-center">
      <RouterProvider router={router} />
    </div>
  )
}

export default App