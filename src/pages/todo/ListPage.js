import ListComponent from "../../components/todo/ListComponent";
import useCustomMove from "../../hooks/useCustomMove";

const ListPage = () => {

    const {page, size} = useCustomMove();

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Todo List Page Component {page} --- {size}
            </div>

            <ListComponent />

        </div>
    )
}

export default ListPage;