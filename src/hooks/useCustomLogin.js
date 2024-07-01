import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { useRecoilState, useResetRecoilState } from "recoil";
import signinState from "../atoms/signinState";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";

const useCustomLogin = () => {

    const navigate = useNavigate();

    const [loginState, setLoginState] = useRecoilState(signinState);

    const resetState = useResetRecoilState(signinState);

    //로그인 여부
    const isLogin = loginState.email ? true : false;

    //로그인 함수
    const doLogin = async (loginParam) => {

        const result = await loginPost(loginParam);
        
        console.log(result);

        saveAsCookie(result);

        return result;
    }

    const saveAsCookie = (data) => {

        setCookie("member", JSON.stringify(data), 1); // 1일

        setLoginState(data);
    }

    //로그아웃 함수
    const doLogout = () => {

        removeCookie('member');
        resetState();
    }

    //페이지로 이동
    const moveToPath = (path) => {

        navigate({pathname: path}, {replace: true});
    }

    //로그인 페이지로 이동
    const moveToLogin = () => {

        // 뒤로가기로 로그인 화면을 볼 수 없게 설정
        navigate({pathname: '/member/login'}, {replace: true});
    }

    //로그인 페이지로 이동(컴포넌트)
    const moveToLoginReturn = () => {

        return <Navigate replace to="/member/login" />
    }

    const exceptionHandle = (ex) => {

        console.log("Exception------------------------");

        console.log(ex);

        const errorMsg = ex.response.data.error;

        const errorStr = createSearchParams({error: errorMsg}).toString();

        if(errorMsg === 'REQUIRE_LOGIN'){
            alert("로그인 해야만 합니다.");
            navigate({pathname: '/member/login', search: errorStr});

            return;
        }

        if(ex.response.data.error === 'ERROR_ACCESSDENIED'){
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
            navigate({pathname: '/member/login', search: errorStr});

            return;
        }
    }

    return {loginState, isLogin, doLogin, doLogout, saveAsCookie, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle};
}

export default useCustomLogin;