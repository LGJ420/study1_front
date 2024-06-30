import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    const authCode = searchParams.get("code");

    useEffect(()=>{

        getAccessToken(authCode).then(accessToken=>{
            console.log(accessToken);

            getMemberWithAccessToken(accessToken).then(memberInfo=>{

                console.log("------------------");
                console.log(memberInfo);

                dispatch(login(memberInfo));
            });
        });
    }, [authCode]);

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage;