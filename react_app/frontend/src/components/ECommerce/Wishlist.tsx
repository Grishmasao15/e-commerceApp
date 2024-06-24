import React, { Component } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import CardWishlist from './CardWishlist';
import { addToCart } from './actions/actions';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

const Wishlist = () => {

  const dispatch = useDispatch;

  const wishlists = useSelector((state: any) => state.wishlists)

  console.log(wishlists);

  return (
    <div className="container mt-5">
      <Navbar />
      <h3 className="flex justify-center mt-2 h-12 text-3xl font-semibold pt-2 text-gray-800">My Wishlist</h3>
      <p className="text-2xl text-slate-900 font-bold my-4 mx-2">All Your Favorite Products ({wishlists.length})</p>
      <div className="row mt-3">
        {
          wishlists.length > 0 ? wishlists.map((wishlist: { id: any; }) => (
            <div className="col-md-3">
              <CardWishlist key={wishlist.id} wishlist={wishlist} />
            </div>
          )) : <p className="text-center mx-auto">Your wishlist is empty:)</p>
        }
      </div>
      {/* <div className='flex justify-center'>
        <Link className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400 mt-16 h-8 w-52" to="/">
          Go to Home
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div> */}
    </div>
  )
}

const mapStateToProps = (state: { wishlists: any; }) => {
  return {
    wishlists: state.wishlists
  };
};

function mapDispatchToProps(dispatch: (arg0: any) => any) {
  return ({
    addToCart: (product: any) => dispatch(addToCart(product)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
