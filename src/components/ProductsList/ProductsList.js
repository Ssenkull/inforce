import { useEffect, useState } from "react";

import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import './ProductsList.css'
import AddButton from "../AddButton/AddButton";
import Modal from '@mui/material/Modal';
import EditItem from "../../UI/ModalEdit";




const ProductsList = () => {
    const [goods, setGoods] = useState([]);

    const [update, setUpdate] = useState(false)
      
    const [isOpen, setIsOpen] = useState(false);

    const [id, setId] = useState(null)

    const openHandler = () => {
        setIsOpen(!isOpen);
        setUpdate(!update)
      }
    



    useEffect(() => {
        fetchMeals();
    }, []);
    

    useEffect(() => {
        fetchMeals();
    }, [update]);
    

    const fetchMeals = async () => {
        const response = await fetch('https://inforce-57194-default-rtdb.europe-west1.firebasedatabase.app/goods.json');
        const responseData = await response.json();

        const loadedGoods = [];

        for(const key in responseData) {
           loadedGoods.push({
               id: key,
               name: responseData[key].name,
               count: responseData[key].count,
               weight: responseData[key].weight,
               image: responseData[key].image
           });
        }

        setGoods(loadedGoods);
       };

    const pList = goods.map(product => <ProductItem 
       id={product.id}
       image={product.image}
       name={product.name}
       count={product.count}
       weight={product.weight}
       openHandler={openHandler}
       setId={setId}
    />)

    return (
        <>   
              <Modal
        open={isOpen}
        onClose={openHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <EditItem openHandler={openHandler} id={id} goods={goods}/>
            </Modal>
            <AddButton setUpdate={setUpdate} update={update} />
            <ul>{pList}</ul>
        
        </>
        
    );
}

export default ProductsList;