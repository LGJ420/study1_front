const rest_api_key = `4cffd7e4ef67250770d6c022eb3745e4`; // REST API 키
const redirect_uri = `http://localhost:3000/member/kakao`;
const auth_code_path = `http://kauth.kakao.com/oauth/authorize`;

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return kakaoURL;
}