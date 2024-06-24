
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderItem from './order';
import Navbar from './navbar';

export const Order = () => {

  const cartItems = useSelector((state: any) => state.cartItems);

  return (
    <div className='container'>
      <Navbar />
      <div className="col-lg-8 col-md-12">
        <div className="custom-card">
          <h4 className='flex justify-center  h-12 text-3xl font-semibold pt-2 text-gray-800 mt-2'>Order Details</h4>
          <h5 className='text-3xl text-gray-800 font-semibold pl-2 pb-2'>My Orders</h5>
          <hr className="" />
          {cartItems.length > 0 ?
            cartItems.map((cartItem: { id: React.Key | null | undefined; }) => (
              <OrderItem key={cartItem.id} cartItem={cartItem} />
            ))
            : <p className='flex justify-center text-lg font-semibold my-10'>No item to Order :)</p>}
        </div>
      </div>
      {cartItems.length > 0 ?
        <div id='amount' className="amout col-lg-4 col-md-12 mt-4 px-5 pb-5">
          <div className="custom-card" style={{ borderRadius: "10px" }}>
            <h5 className=''>The Total Amount</h5>
            <hr className="my-3" />
            <div className="d-flex justify-content-between">
              <p className="text-muted">Temporary Amount</p>
              <p className="text-muted float-end -mt-6 pr-2">${cartItems.reduce((acc: string, { price, initial_quantity }: any) => {
                let qty = parseInt(initial_quantity)
                let item = parseFloat(price).toFixed(2)
                let accumulator = parseFloat(acc).toFixed(2)
                let res = (parseFloat(item) * qty) + parseFloat(accumulator)
                return res.toFixed(2)
              }, 0)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-muted">Shipping</p>
              <p className="text-muted float-end -mt-6 pr-2">Free</p>
            </div>
            <hr className="my-2" />
            <div className="d-flex justify-content-between align-items-center mb-4">
              <strong>Total Amount Of (including GST)</strong>
              <strong className='flex float-end pr-2'>${cartItems.length > 0 ? parseFloat(cartItems.reduce((acc: string, { price, initial_quantity }: any) => {
                let qty = parseInt(initial_quantity)
                let item = parseFloat(price).toFixed(2)
                let accumulator = parseFloat(acc).toFixed(2)
                let res = parseFloat(item) * qty + parseFloat(accumulator)
                return res.toFixed(2)
              }, 0)) + 2 : 0}</strong>
            </div>
          </div>
          <div className='flex justify-center gap-8'>
            <Link className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-slate-400 mt-16 h-12" to="/placed-order">
              Place Order
              {/* <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg> */}
            </Link>
          </div>

        </div>
        : ""}
    </div>
  )
}