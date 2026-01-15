import React, {useEffect, useRef} from 'react';
import { use } from 'react';

function RightSideOrders({ onFormSubmit }) {
    const [formData, setFormData] = React.useState({ Quantity: 0, Rate: 0.00, Product: '', Bill: 0, Name: '', Paid: 0});
    // const rateRef = useRef();
    // const billRef = useRef();
    // const productRef = useRef();
    // const nameRef = useRef();  
    const formRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];


    // select all in the input field when focused
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        if(formData.Quantity && formData.Rate) {
            setFormData((prev) => ({
                ...prev,
                Bill: formData.Quantity * formData.Rate,
            }));
        }
    }, [formData.Quantity, formData.Rate]);

    // handle enter key press, but what after the last field?
    const handleKeyDown = (e, nextIdx) =>{
        console.log(e.key);
        
        if(e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();;
            formRefs[nextIdx]?.current?.focus();
        }
        if(e.key === "ArrowUp") {
            e.preventDefault();
            const upidx = (nextIdx - 2)%5;
            formRefs[upidx]?.current?.focus();
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formData);
        setFormData({ Quantity: '', Rate: '', Product: '', Bill: '', Name: ''});
    }


  return (
    <aside style={{borderLeft: '5px solid  rgb(147, 126, 223)'}}>
      <p>Additional Information</p>
      <div className='form'>
        <form onSubmit={handleSubmit}>
            <label>Quantity: </label>
            <input type='number' name='Quantity' value={formData.Quantity} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 1)} onFocus={(e) => {e.target.select();}}/>

            <label>Rate: </label>
            <input type='number' ref={formRefs[1]} name='Rate' value={formData.Rate} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 2)} onFocus={(e) => {e.target.select();}}/>

            <label>Product: </label>
            <input type='text' ref={formRefs[2]} name='Product' value={formData.Product} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 3)} onFocus={(e) => {e.target.select();}} />
        
            <label>Amount to be Paid: </label>
            <input type='number'  name='Bill' value={formData.Bill} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, formRefs[3])}/>

            <label>Amount paid: </label>
            <input type='number' ref={formRefs[3]} name='Paid' value={formData.Paid} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 4)} onFocus={(e) => {e.target.select();}}/>

            <label>Amount Due: </label>
            <input type='number' name='Paid' value={formData.Bill -  formData.Paid} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 4)} onFocus={(e) => {e.target.select();}}/>

            <label>Buyer's Name: </label>
            <input type='text' ref={formRefs[4]} name='Name' value={formData.Name} onChange={handleChange} onFocus={(e) => {e.target.select();}}/>
           
            <button type='submit'>Submit</button>
        </form>
       
      </div>
    </aside>
  );
}

export default RightSideOrders;
