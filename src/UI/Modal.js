import {useState} from 'react';
import './Modal.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const AddItem = ({openHandler}) => {
    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    const [weight, setWeight] = useState(0);
    const [image, setImage] = useState('');

    

    


    const sendData = async () => {
        await fetch('https://inforce-57194-default-rtdb.europe-west1.firebasedatabase.app/goods.json', {
            method: 'POST',
            body: JSON.stringify({
                image,
                name,
                count,
                weight
            })
        });
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
            reader.onloadend = function () {
                setImage(reader.result);
            }

            ready.readAsDataURL(file);
        };
        reader.readAsDataURL(file);
    };


    return (
        <div className='modal-container'>
            <form action="">
                <div className="input">
                    <div className="item">
                        <label htmlFor="name">Goods name</label>
                        <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="item">
                        <label htmlFor="count">Count</label>
                        <input type="number" placeholder='Enter Count' onChange={(e) => setCount(e.target.value)}/>
                    </div>
                    <div className="item">
                        <label htmlFor="weight">Weight</label>
                        <input type="number" placeholder='Enter Weight' onChange={(e) => setWeight(e.target.value)}/>
                    </div>
                    <div className="item">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button variant="contained" component="label">
                                Upload image
                                <input hidden accept="image/*" multiple type="file" onChange={imageUploaded}/>
                            </Button>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file"/>
                            </IconButton>
                        </Stack>
                    </div>
                    <div className="buttons">
                        <button className='cancel-btn' onClick={() => openHandler()}>CANCEL</button>
                        <Button variant="contained" onClick={() => {
                            sendData()
                        }}>Add</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddItem;
