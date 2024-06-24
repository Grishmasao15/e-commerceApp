import { Link, useNavigate } from "react-router-dom";
import { Product } from "./products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addWishlist } from "./actions/actions";
import { initStateInterface } from "./reducers";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

export type CardProps = {
  product: Product
};



const CardProduct: React.FC<CardProps> = ({ product }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartt = async () => {
    dispatch(addToCart(product))
    await MySwal.fire({
      icon: "success",
      title: "Added to Cart",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/cart')
  }

  const addToWishlistt = async () => {
    dispatch(addWishlist(product))
    await MySwal.fire({
      icon: "success",
      title: "Added to Wishlist",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/wishlist')
  }

  return (
    <div className="custom-card card relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to="#">
        <img src={product.image_url} className="" alt="..." />
        <span className="absolute top-0 right-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">40% OFF</span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl text-slate-900 font-bold">{product.title}</h5>
        {/* <p className="card-text">{product.description}</p> */}
        <p className="my-4 text-3xl font-bold text-slate-900">${product.price}</p>
        <div className="flex gap-3 my-2">
          <button onClick={addToCartt} className="flex items-center justify-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
          </button>
          <button className="flex items-center justify-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400" onClick={addToWishlistt}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Move to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct