import "./ItemListContainer.css"
export default function ItemListContainer({greeting}) {
    return(
        <div className="ItemListContainer">
            <p className="ItemList">{greeting}</p>
        </div>
    )
}