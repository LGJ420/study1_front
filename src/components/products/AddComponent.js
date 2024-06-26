import { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    pname: '',
    pdesc: '',
    price: 0,
    files: []
}

const AddComponent = () => {

    const [product, setProduct] = useState({...initState});
    const uploadRef = useRef();

    // fetching을 하고있으면 모달창on 안하고있으면 모달창off
    const [fetching, setFetching] = useState(false);

    // result는 결과 모달창을 위한 상태, 위에 코드는 패치모달창임
    const [result , setResult] = useState(null);

    const {moveToList} = useCustomMove();


    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({...product});
    }

    const handleClickAdd = (e) => {

        const files = uploadRef.current.files;

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("price", product.price);

        console.log(formData);

        setFetching(true);
        postAdd(formData).then(data=>{
            setFetching(false);
            setResult(data.RESULT);
        });
    }

    const closeModal = () => {

        setResult(null);

        moveToList({page: 1});
    }

    return (
        <div className="border-2 bg-sky-200 mt-10 m-2 p-4">

            {fetching ? <FetchingModal /> : <></>}

            {result ?
                <ResultModal
                    title={'Product Add Result'}
                    content={`${result}번 등록 완료`}
                    callbackFn={closeModal} />
                :
                <></>
            }

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="pdesc" rows="4" value={product.pdesc} onChange={handleChangeProduct}>{product.pdesc}</textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price" type={'number'} value={product.price} onChange={handleChangeProduct}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        ref={uploadRef} type={'file'} multiple={true}></input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" className=" rounded p-4 w-36 bg-blue-500 text-xl text-white"
                        onClick={handleClickAdd}>ADD</button>
                </div>
            </div>
        </div>
    );
}

export default AddComponent;