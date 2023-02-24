import { useState } from 'react';
import  ReactDOM  from 'react-dom';
import './Modal.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const EditItem = ({openHandler,id,goods}) => {
const [currentElement, setCurentElemet]=useState(goods.find(x => x.id === id))

    const [name, setName] = useState(currentElement.name);
    const [count, setCount] = useState(currentElement.count);
    const [weight, setWeight] = useState(currentElement.weight);
    const [image, setImage] = useState('');


    const editData = async () => {

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({                
        name: name,
        count:count,
        weight:weight,
        image: image?image:currentElement.image
       })
  };
  const response = await fetch(`https://inforce-57194-default-rtdb.europe-west1.firebasedatabase.app/goods/${id}.json`, requestOptions);
  const data = await response.json();
  console.log(data)

        openHandler()
    }

    const imageUploaded = () => {
        const file = document.querySelector('input[type=file]').files[0];
    
        const reader = new FileReader();
    
        reader.onload = () => {
          if (!reader || !reader.result) return;

    
          if (file == null) {
            return;
          }
          const ready = new FileReader();
          ready.readAsDataURL(file);
          ready.onload = function () {
            const re = this.result;
            const img = new Image();
            img.src = re;
            img.onload = function () {
              const that = this;
              const w = '200';
              const h = '200';
              const quality = 0.9; 
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const anw = document.createAttribute('width');
              anw.nodeValue = w;
              const anh = document.createAttribute('height');
              anh.nodeValue = h;
              canvas.setAttributeNode(anw);
              canvas.setAttributeNode(anh);
              ctx?.drawImage(that, 0, 0, w, h);
              const base64 = canvas.toDataURL('image/webp', quality);
              setImage( base64 );
            };
          };
          console.log(file);
        };
        reader.readAsDataURL(file);
      };

console.log(currentElement)
console.log(goods)
console.log(id)


    return (
        <div className='modal-container'>
            <form action="">
                <div className="input">
                <div className="item">
                <label htmlFor="name">Goods name</label>
                <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value) } value={name} />
                </div>
                <div className="item">
                <label htmlFor="count">Count</label>
                <input type="text" placeholder='Enter Count' onChange={(e) => setCount(e.target.value)} value={count} />
                </div>
                <div className="item">
                <label htmlFor="weight">Weight</label>
                <input type="text" placeholder='Enter Weight' onChange={(e) => setWeight(e.target.value)}value={weight}  />
                </div>
                <div className="item">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" component="label">
                        Upload image
                        <input hidden accept="image/*" multiple type="file" onChange={imageUploaded} />
                    </Button>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                    </IconButton>
                </Stack>
                </div>
                <div className="buttons">
                    <button className='cancel-btn' onClick={()=>openHandler()}>CANCEL</button>
                    <Button variant="contained" onClick={()=>{editData()}} >Add</Button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default EditItem;
