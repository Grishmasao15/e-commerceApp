import axios from 'axios';
import { actionTypes } from '../types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Interface } from 'readline';
import { isTemplateSpan } from 'typescript';

const MySwal = withReactContent(Swal)
// import products from '../product.json'


// const fetchData=async()=>{
//   const res = await fetch("https://fakestoreapi.com/products",{});
//   products = await res.json();
//   console.log(products);
// }

// await fetchData();

// const storeProducts=async()=>{
//   console.log(products,"productsssssssssss");
//   const res=await axios.post(`http://localhost:3030/store-products/`,{products});
//   console.log(res,"store products result");
// }

// await storeProducts();

export interface productInterface {
  createdAt: Date
  description: string
  id: number
  image_url: string
  initial_quantity: number
  price: number
  rating: number
  title: string
  total_quantity: number
  updatedAt: Date
}

export interface initStateInterface {
  products: productInterface[],
  cartItems: productInterface[],
  wishlists: productInterface[]
}

export interface actionInterface {
  type: string;
  payload: { id: number; initial_quantity: number; };
}

let products!: productInterface[];

const getProducts = async () => {
  const res = await axios.get("http://192.168.10.75:3030/get-products", { withCredentials: true });
  products = res.data.data;
}

await getProducts();

const initProducts: productInterface[] = [...products]
const initialState: initStateInterface = {
  products: initProducts,
  cartItems: [],
  wishlists: []
};


const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.addToCart:

      // let filWishlist2 = state.wishlists.filter(item => item.id !== action.payload.id);
      const cartProduct: productInterface[] = state.cartItems.filter(item => item.id === action.payload.id);
      const wishlistProduct: productInterface[] = state.wishlists.filter(item => item.id === action.payload.id);

      if (cartProduct.length > 0) {
        let addItem: productInterface[] = []
        state.cartItems.map(item => {
          if (item.id === action.payload.id) {
            item = { ...item, initial_quantity: item.initial_quantity + 1 }

          }
          return addItem.push(item)
        })

        return {
          ...state,
          cartItems: addItem,
          products: [...state.products],
          wishlists: [...state.wishlists]
        }
      }
      else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          products: [...state.products],
          wishlists: [...state.wishlists]
        };
      }


    case actionTypes.removeFromWishlist:

      const filDataa = state.wishlists.filter(item => item.id !== action.payload.id)
      action = { ...action.payload, initial_quantity: 1 }
      return {
        ...state,
        wishlists: filDataa,
      }


    case actionTypes.removeFromCart:
      const filData: productInterface[] = state.cartItems.filter(item => item.id !== action.payload.id)
      action = { ...action.payload, initial_quantity: 1 }
      return {
        ...state,
        cartItems: filData,
      }

    case actionTypes.addItemQty:
      let addItem: productInterface[] = []
      state.cartItems.map(item => {
        if (item.id === action.payload.id) {
          item = { ...item, initial_quantity: item.initial_quantity + 1 }

        }
        return addItem.push(item)
      })
      console.log(state.cartItems, "ttadfsa");
      return {
        ...state,
        cartItems: addItem,
      }


    case actionTypes.removeItemQty:
      let removeItem: productInterface[] = []
      state.cartItems.map(item => {
        if (item.id === action.payload.id) {
          item = { ...item, initial_quantity: item.initial_quantity - 1 }
        }
        return removeItem.push(item)
      })
      return {
        ...state,
        cartItems: removeItem,
      }

    case actionTypes.addWishlist:

      const filWishlist = state.cartItems.filter(item => item.id !== action.payload.id);
      const itemexist = state.wishlists.find(item => item.id === action.payload.id);

      if (itemexist) {
        return {
          ...state,
          cartItems: filWishlist,
        }
      }
      else {
        return {
          ...state,
          cartItems: filWishlist,
          wishlists: [...state.wishlists, action.payload]
        }
      }

    default:
      return state;
  }
}

export default cartReducer;