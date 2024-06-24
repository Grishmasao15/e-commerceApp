import Navbar from "./navbar"
import { Products } from "./products"
import { Cart } from "./cart";
import Wishlist from "./Wishlist";

export const Homee = () => {
  return (
    <div className="container">
      <Navbar />
      <Products />
    </div>
  )
}