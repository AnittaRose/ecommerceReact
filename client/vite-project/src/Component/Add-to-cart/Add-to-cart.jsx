



import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        // Parse query parameters
        let params = new URLSearchParams(window.location.search);
        let productId = params.get('id') || null;
        let userId = params.get('userId') || null;
        let price = parseFloat(params.get('price')) || 0;
        let quantity = parseInt(params.get('quantity'), 10) || 1;
        let title = params.get('title') || '';

        if (!productId || !userId) {
          console.error("Missing productId or userId");
          return;
        }

        let data = { productId, userId, price, quantity, title };
        const cartResponse = await axios.post('http://localhost:3000/Addtocart', data);

        if (cartResponse.status !== 200) {
          throw new Error(`Failed to add to cart: ${cartResponse.status}`);
        }

        const productResponse = await axios.get('http://localhost:3000/View');

        if (productResponse.status !== 200) {
          throw new Error(`Failed to fetch product list: ${productResponse.status}`);
        }

        const productList = productResponse.data.data || [];
        const updatedCartItems = cartResponse.data.data.addCart?.flatMap(cart => cart.items) || [];

        // Match cart items with product list
        const matchedCartItems = updatedCartItems.map(cartItem => {
          const matchingProduct = productList.find(product => product._id === cartItem.productId);
          if (matchingProduct) {
            return { ...cartItem, ...matchingProduct };
          }
          return null;
        }).filter(item => item !== null);

        console.log(matchedCartItems)


        setCartItems(matchedCartItems);

        let totalQty = 0;
        let totalCost = 0;
        matchedCartItems.forEach(item => {
          totalQty += item.quantity;
          totalCost += item.price * item.quantity;
        });

        setTotalQuantity(totalQty);
        setTotalPrice(totalCost);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const updateQuantity = async (productId, delta, price) => {
    try {
      const updatedItems = cartItems.map(item => {
        if (item.productId === productId) {
          item.quantity = Math.max(1, item.quantity + delta); // Ensure quantity doesn't go below 1
        }
        return item;
      });

      const updatedItem = updatedItems.find(item => item.productId === productId);
      const response= await axios.post('http://localhost:3000/UpdateCart', { productId, quantity: updatedItem.quantity });
      if (response.status === 200) {
        console.log('Cart updated successfully:', response.data);
      } else {
        console.error('Unexpected response:', response.status, response.data);
      }

      let totalQty = 0;
      let totalCost = 0;
      updatedItems.forEach(item => {
        totalQty += item.quantity;
        totalCost += item.price * item.quantity;
      });
      setCartItems(updatedItems);
      setTotalQuantity(totalQty);
      setTotalPrice(totalCost);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      await axios.post('/RemoveCartItem', { productId });

      let totalQty = 0;
      let totalCost = 0;
      updatedItems.forEach(item => {
        totalQty += item.quantity;
        totalCost += item.price * item.quantity;
      });
      setTotalQuantity(totalQty);
      setTotalPrice(totalCost);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      {cartItems.map((item) => {
        const product = item.product || {};
        const imageUrl = item.Images?.[0] 
        ? `http://localhost:3000/${item.Images[0]}` 
        : 'http://localhost:3000/path/to/placeholder-image.jpg'; // Fallback image
    
        return (
          <div key={item.productId} className="cart-item">
            <div className="item">
              <div className="product_image">
                <img src={imageUrl} alt={product.Title || 'Product'} className="product-img" />
              </div>
              <div className="description">
                <h1 className='text-black'>{item.Title}</h1>
                <p className='text-black'>{item.Description}</p>
                <h2>{item.price}</h2>
                <h3 className="remove" onClick={() => removeCartItem(item.productId)}>Remove</h3>
              </div>
              <div className="product_quantity">
                <div className="quantity-button">
                  <div className="quantity">{item.quantity}</div>
                  <div className="quantity-actions">
                    <button onClick={() => updateQuantity(item.productId, 1, item.price)}>+</button>
                    <button onClick={() => updateQuantity(item.productId, -1, item.price)}>-</button>
                  </div>
                </div>
              </div>
              <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        );
      })}

      <div className="subtotal">
        <h1>Subtotal</h1>
        <h2>{totalQuantity} Items</h2>
        <h3>${totalPrice.toFixed(2)}</h3>
        <h4>Shipping + Tax Included</h4>
        <button className="checkout">Purchase</button>
      </div>
    </div>
  );
}

export default Cart;




// const Checkout = (checkoutData, totalPrice) => {
//   const params = new URLSearchParams(location.search);
//   const id = params.get('userId');
//   const token_key = params.get('login');
//   const token = localStorage.getItem(token_key);

//   // Encode the data
//   const encodedCheckoutData = encodeURIComponent(JSON.stringify(checkoutData));
//   const encodedTotalPrice = encodeURIComponent(totalPrice);

//   // Proceed with navigation
//   navigate(`/CheckoutPage?id=${encodeURIComponent(id)}&checkoutData=${encodedCheckoutData}&totalPrice=${encodedTotalPrice}`);
// };



{/* <button className="btn1" onClick={() => Checkout(cartItems, (totalSubtotal * 1.05 + 5).toFixed(2))}> */}