import './ProductItem.css'

const ProductItem = (props) => {
    return <li className='product-item'>
    <div>
        <h3 className='product-item__name'>{props.name}</h3>
        <img className='product-item__img' src={props.image} alt="good" />
        <div className='product-item__count'>Count: {props.count}</div>
        <div className='product-item__weight'>Weight: {props.weight}g</div>
        <button onClick={()=>{props.openHandler()
        props.setId(props.id)
        }}>Edit</button>
        <button onClick={props.openHandler}>Delete</button>
    </div>
</li>
}

export default ProductItem;