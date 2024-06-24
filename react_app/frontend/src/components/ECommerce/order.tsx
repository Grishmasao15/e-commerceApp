import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { removeFromCart } from './actions/actions';
import { addWishlist } from './actions/actions';
import { removeItemQty } from './actions/actions';
import { addItemQty } from './actions/actions';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

export type CartItemProps = {
  cartItem: any
};

const OrderItem: React.FC<CartItemProps> = ({ cartItem }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(cartItem, "cartt itemmmmmmmm");

  const addToWishlistt = async () => {
    dispatch(addWishlist(cartItem))
    await MySwal.fire({
      icon: "success",
      title: "Added to Wishlist",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/wishlist')
  }

  return (
    <>
      <div className="row mt-3 no-gutters rounded-md border-2 mx-2 my-4">
        <div className="col-md-3 mt-4 px-5 pb-5">
          <img className="rounded" style={{ maxWidth: "100%", maxHeight: "200px" }} src={cartItem.image_url} alt="" />
        </div>
        <div className="col-md-6 mt-4 px-5 pb-5">
          <div className="mt-3">
            <h4 className="font-bold text-2xl my-1">${cartItem.price}</h4>
            <h5 className="font-bold text-lg">{cartItem.title}</h5>
            <p className="text-muted mt-n3">SIZE: M</p>
            <p className="text-muted mt-n3">Quantity: </p>

            <div className="mt-2 -ml-2">
              <Button
                variant="text"
                style={{ color: "grey" }}
                startIcon={<DeleteIcon />}
                onClick={() => dispatch(removeFromCart(cartItem))}
              >
                REMOVE ITEM
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default OrderItem