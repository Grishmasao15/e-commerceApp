import React, { Component, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import CardProduct from './CardProduct';
import { useEffect } from 'react';
import { addToCart } from './actions/actions';
import { Link } from 'react-router-dom';
import { initStateInterface } from './reducers';

export interface Product {
  category: string
  description: string
  id: number
  image_url: string
  price: number
  rating: { rate: number, count: number }
  title: string
}

interface Props {
  addToCart: void
}

export const Products = () => {

  const products = useSelector((state: any) => state.products);
  const wishlists = useSelector((state: initStateInterface) => state.wishlists);
  console.log(wishlists, "wishlist in card product");

  console.log(products, "products products");

  return (
    <div className="container mt-5">
      <p className="text-2xl text-slate-900 font-bold my-4 mx-2">All Products that available to order</p>
      <div className="flex row mt-3 flex-wrap">
        {
          products.length > 0 ? products.map((product: Product) => (
            <div className="col-md-3">

              <CardProduct key={product.id} product={product} />
            </div>
          )) : <p className="text-center mx-auto">No Product Available</p>
        }
      </div>
      <div className='flex justify-center'>
        <Link type="button" to="/cart" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400 mt-16 h-12">
          Go to Cart
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>

      </div>
    </div>
  )
}

const mapStateToProps = (state: { products: any; }) => {
  return {
    products: state.products
  };
};

function mapDispatchToProps(dispatch: (arg0: { type: string; payload: any; }) => any) {
  return ({
    addToCart: (product: any) => dispatch(addToCart(product)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)