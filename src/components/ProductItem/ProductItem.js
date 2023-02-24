import { useEffect } from 'react';

import './ProductItem.css'

const ProductItem = (props) => {


    const deleteSomeData = async () => {
        const response = await fetch(
          `https://inforce-57194-default-rtdb.europe-west1.firebasedatabase.app/goods/${props.id}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            //   'Access-Control-Allow-Origin': '*',
            },
          }
        );
    
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        console.log(response);
        console.log(props.id);
        console.log("DELETED");
      };


    return <li className='product-item'>
    <div>
        <h3 className='product-item__name'>{props.name}</h3>
        <img className='product-item__img' src={props.image} alt="good" />
        <div className='product-item__count'>Count: {props.count}</div>
        <div className='product-item__weight'>Weight: {props.weight}g</div>
        <div className="buttons">
            <button className='edit-btn' onClick={()=>{props.openHandler()
            props.setId(props.id)
            }}>Edit</button>
            <button className='delete-btn' onClick={deleteSomeData.bind(null, props.id)}>Delete</button>
        </div>
    </div>
</li>
}

export default ProductItem;