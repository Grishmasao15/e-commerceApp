import { useLocation } from "react-router-dom"

export const RegenerateLink = () => {
  const state = useLocation();
  console.log(state.state)
  return (
    <>
      <h1>Helloo</h1>
    </>
  )
}