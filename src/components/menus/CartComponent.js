import { useDispatch, useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCartItemsAsync } from "../../slices/cartSlice"
import { useEffect } from "react";
import useCustomCart from "../../hooks/useCustomCart";

const CartComponent = () => {

    const {isLogin, loginState} = useCustomLogin();

    const {refreshCart, cartItems} = useCustomCart();

    useEffect(()=>{

        if(isLogin){

            refreshCart();
        }

    },[isLogin]);

    return (
        <div className="w-full">
            {isLogin ?
            <div className="flex">
                <div className="m-2 font-extrabold">
                    {loginState.nickname}'s Cart
                </div>
                <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
                    {cartItems.length}
                </div>
            </div>
            :
            <div></div>
            }
        </div>
    )
}

export default CartComponent;