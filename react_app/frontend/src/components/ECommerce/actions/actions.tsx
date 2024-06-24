import { actionTypes } from '../types'

export const addToCart = (product: any) => ({
  type: actionTypes.addToCart,
  payload: product,
});

export const removeFromCart = (product: any) => ({
  type: actionTypes.removeFromCart,
  payload: product
});

export const addItemQty = (product: any) => ({
  type: actionTypes.addItemQty,
  payload: product
});

export const removeItemQty = (product: any) => ({
  type: actionTypes.removeItemQty,
  payload: product
});

export const addWishlist = (product: any) => ({
  type: actionTypes.addWishlist,
  payload: product
});

export const removeFromWishlist = (product: any) => ({
  type: actionTypes.removeFromWishlist,
  payload: product
});