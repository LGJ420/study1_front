import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BasicMenu = () => {

    /**
     * 로그인 상황을 useSelector가 감지
     * 파라미터에는 함수를 지정, 함수를 이용해 상태를 전달
     * "loginSlice" 라고 이름지어 놨으니 그것을 사용
     */
    const loginState = useSelector(state => state.loginSlice);

    return (
        <nav id='navbar' className="flex bg-blue-300">

            <div className="w-4/5 bg-gray-500">
                <ul className="flex p-4 text-white font-bold">
                    <li className="pr-6 text-2xl">
                        <Link to={'/'}>Main</Link>
                    </li>
                    <li className="pr-6 text-2xl">
                        <Link to={'/about'}>About</Link>
                    </li>

                    {loginState.email ?
                    <>
                    <li className="pr-6 text-2xl">
                        <Link to={'/todo/'}>Todo</Link>
                    </li>
                    <li className="pr-6 text-2xl">
                        <Link to={'/products/'}>Products</Link>
                    </li>
                    </>
                    :
                    <>
                    </>
                    }
                    
                </ul>
            </div>

            <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
            {!loginState.email ?
                <div className="text-white text-sm m-1 rounded">
                    <Link to={'/member/login'}>Login</Link>
                </div>
            :
                <div className="text-white text-sm m-1 rounded">
                    <Link to={'/member/logout'}>Logout</Link>
                </div>
            }
            </div>

        </nav>
    )
}

export default BasicMenu;