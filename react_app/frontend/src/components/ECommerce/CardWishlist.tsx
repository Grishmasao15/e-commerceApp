import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromWishlist } from './actions/actions';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export type WishlistProps = {
  wishlist: any
};

const CardWishlist: React.FC<WishlistProps> = ({ wishlist }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(wishlist, "wishhhlisttttt");

  const addToCartt = async () => {
    dispatch(addToCart(wishlist))
    await MySwal.fire({
      icon: "success",
      title: "Added to Cart",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/cart')
  }

  const removeFromWishlistt = async () => {
    dispatch(removeFromWishlist(wishlist))
    await MySwal.fire({
      icon: "success",
      title: "Removed from wishlists",
      showConfirmButton: false,
      timer: 1000
    });
  }

  return (
    <div className="custom-card card rounded-md border-2 mx-2 my-4">
      <img src={wishlist.image_url} className="card-img-top h-64 w-56 p-6" alt="..." />
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl text-slate-900 font-bold">{wishlist.title}</h5>
        <p className="card-text">{wishlist.description}</p>
        <div className='flex gap-6'>
          <p className="py-2 text-3xl font-bold text-slate-900">${wishlist.price}</p>
          <button onClick={removeFromWishlistt} className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400 h-10 my-2">REMOVE FROM WISHLIST</button>
          <button onClick={addToCartt} className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400 h-10 my-2">Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default CardWishlist;
