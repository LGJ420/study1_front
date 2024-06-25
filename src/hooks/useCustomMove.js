import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {

    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
}

const useCustomMove = () => {

    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);

    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);

    const queryDefault = createSearchParams({page, size}).toString();

    // 목록화면으로 이동하는 기능
    const moveToList = (pageParam) => {

        let queryStr = "";

        if (pageParam) {
            
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);

            queryStr = createSearchParams({page: pageNum, size: sizeNum}).toString();
        }
        else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({pathname: `../list`, search: queryStr});
    }

    // 수정화면으로 이동하는 기능
    const moveToModify = (num) => {

        console.log(queryDefault);

        navigate({pathname: `../modify/${num}`, search: queryDefault});
    }

    // 글을 누르면 읽기 화면으로 이동하는 기능
    const moveToRead = (num) => {

        console.log(queryDefault);

        navigate({pathname: `../read/${num}`, search: queryDefault});
    }

    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}

export default useCustomMove;