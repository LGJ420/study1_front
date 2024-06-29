import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/memberApi"
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    email: ''
}

const loadMemberCookie = () => {

    const memberInfo = getCookie("member");

    //닉네임 처리
    if(memberInfo && memberInfo.nickname){
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }

    return memberInfo;
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param)=>{
    return loginPost(param);
})

const loginSlice = createSlice({

    //이 이름으로 store.js에 설정해줄것이다
    name: 'LoginSlice',

    /**
     * 앞으로 스토어에서 관리할 상태값
     * 쿠키가 있을경우 쿠키값을 사용하고 그렇지 않을때는 initState사용
     */
    initialState: loadMemberCookie() || initState,

    /**
     * 그리고 그것을 처리하는 리듀서
     * createSlice를 사용하면, 정의된 각 reducer 함수 이름에 해당하는
     * action creators가 자동으로 생성됨
     */
    reducers: {
        //동기방식의 로그인이다
        login: (state, action) => {
            console.log("login.....");

            /**
             * 두번째 파라미터 action으로 payload라는 속성을 이용해서
             * 컴포넌트가 전달하는 데이터를 확인할 수 있다
             */
            const data = action.payload;

            return {email: data.email};
        },
        logout: (state, action) => {
            console.log("logout....");

            removeCookie("member");

            return {...initState};
        }
    },
    
    //비동기 방식의 로그인을 만든다
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action)=>{
            console.log("fulfilled"); //완료
            const payload = action.payload;

            //정상적인 로그인 시에만 쿠키에 저장
            if(!payload.error){
                
                //유효기간 1일
                setCookie("member", JSON.stringify(payload), 1);
            }

            return payload;

        }).addCase(loginPostAsync.pending, (state, action)=>{
            console.log("pending"); //처리중
        }).addCase(loginPostAsync.rejected, (state, action)=>{
            console.log("rejected"); //에러
        });
    }
})

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;