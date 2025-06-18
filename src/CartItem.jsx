import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping } ) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
//     Initialize a variable total to hold the cumulative sum.
// Iterate over the cart array using cart.forEach().
// For each item, extract its quantity and cost.
// Convert the cost string (e.g., "$10.00") to a number using parseFloat(item.cost.substring(1)), then multiply it by the quantity.
// Add the resulting value to total.
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1)); // Remove the dollar sign and convert to number
      total += cost * item.quantity; // Multiply by quantity and add to total
    });
    return total; // Return total formatted to 2 decimal places
 
  };
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e); // Let the parent handle the navigation logic
    }
  };
  



  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateQuantity({ name: item.name, quantity: updatedItem.quantity }));

  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateQuantity({ name: item.name, quantity: updatedItem.quantity }));
    } else {
      // If the quantity is 1, you might want to remove the item instead
      dispatch(removeItem(item.name));
    }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    setAddedToCart(prevState => {
      const newState = { ...prevState };
      delete newState[item.name]; // or set to 0 if you prefer: newState[item.name] = 0;
      return newState;
    });
  };
  

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    //convert the cost string with the dollar sign and the number string to int
    // and then multiply them to get the total cost for that item
    let cost=parseInt(item.cost.slice(1,))
    let quantity = parseInt(item.quantity);
    console.log("Calculating total cost for item:", item);
    console.log("Item cost:", item.cost.slice(1,)); // Remove the dollar sign for calculation
    console.log("Item quantity:", item.quantity);
    return (cost * quantity).toFixed(2); // Return total cost formatted to 2 decimal places
   
    
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
      <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


