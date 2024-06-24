import image from "../../utils/image_processing20211230-25973-vwc0bf.gif";
import Navbar from "./navbar";

export const PlacedOrder = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="flex justify-center pt-10"><img src={image} alt="..." width="200px" height="300px" /></div>
      <h1 className="flex justify-center text-3xl font-bold font-heading pt-2">Your order has been placed</h1>
    </div>
  )
}