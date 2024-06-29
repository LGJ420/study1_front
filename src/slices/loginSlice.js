import { createSlice } from "@reduxjs/toolkit"

const initState = {
    email: ''
}

const loginSlice = createSlice({

    //이 이름으로 store.js에 설정해줄것이다
    name: 'LoginSlice',

    /**
     * 앞으로 스토어에서 관리할 상태값
     */
    initialState: initState,

    /**
     * 그리고 그것을 처리하는 리듀서
     * createSlice를 사용하면, 정의된 각 reducer 함수 이름에 해당하는
     * action creators가 자동으로 생성됨
     */
    reducers: {
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
        }
    }
})

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;