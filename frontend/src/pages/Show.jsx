import { useParams } from "react-router-dom"

export default function Show() {
    const { id, type } = useParams();

    return <div>Show - {id} - {type}</div>
}