import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams();

    const {moveToPath, saveAsCookie} = useCustomLogin();

    const authCode = searchParams.get("code");

    useEffect(()=>{

        getAccessToken(authCode).then(accessToken=>{
            console.log(accessToken);

            getMemberWithAccessToken(accessToken).then(memberInfo=>{

                console.log("------------------");
                console.log(memberInfo);

                saveAsCookie(memberInfo);

                //로그인 결과 소셜회원이 아니면 /경로로, 소셜회원이면 정보수정으로
                if(memberInfo && !memberInfo.social){
                    moveToPath("/");
                }
                else{
                    moveToPath("/member/modify");
                }
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