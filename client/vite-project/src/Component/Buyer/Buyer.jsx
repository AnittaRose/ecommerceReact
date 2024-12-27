import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Buyer() {
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);

    // Fetch token and user id directly from URL params
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);
    console.log("Token:", token);

    let userId = params.get('id');
    console.log("User ID:", userId);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        const response = await axios.get(' http://localhost:3000/Viewselleraddedproducts', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchUser = async () => {
      try {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        const response = await axios.get(` http://localhost:3000/singleuser/${id}`, {
          headers: {
            'Authorization': token,
          },
        });
        if (response.data && response.data.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchUser();
  }, []);

  const handleAddToCart = (productId) => {
    // Add to cart logic
    console.log(`Added product ${productId} to cart`);
  };

  const handleAddToWishlist = (productId, price, title) => {
    // Add to wishlist logic
    console.log(`Added product ${title} to wishlist`);
  };
  const Single = (id) => {
    navigate(`/Single?login=${token_key}&id=${id}`);
};
const Cart = (id) => {
    navigate(`/Cart?login=${token_key}&id=${id}&userId=${userId}`);
  };

  const Wishlist = (id) => {
    navigate(`/Wishlist?login=${token_key}&id=${id}&userId=${userId}`);
};

const Add = (id) => {
    navigate(`/Add?login=${token_key}&id=${id}&userId=${userId}`);
};

const Myaccount = (id) =>{
    navigate(`/Myaccount?login=${token_key}&id=${id}`);
}

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-evenly navbar">
          <div className="d-flex">
            <div className="Onsko p-2">Onsko</div>
            <div className="home p-2">
              <a href="./index.html" className="login">
                Home
              </a>
            </div>
            <div className="home p-2">
              <a href="./Bestsellers.html" className="login" />
              Store
            </div>
            <div className="home p-2">
              <a href="./About.html" className="login">
                About
              </a>
            </div>
            <div className="home p-2">
              <a href="./Contact.html" className="login">
                Contact
              </a>
            </div>
          </div>
          <div className="d-flex">
            <div className="profile">
              {user ? (
                <div className="text-center dropdown">
                  <button className="dropbtn px-3" aria-haspopup="true" aria-expanded="false" role="button">
                    <span className="text-break"><strong>Hello,</strong> {user.name}</span><br />
                    <span><strong>Account & Details</strong></span>
                  </button>
                  <div className="dropdown-content pt-3" role="menu">
                    <div className=""><button onClick={()=>Add(userId)} className="bttn">Add product</button></div>
                    <div className="dropdown-item pt-3" tabIndex="0"><button onClick={() => Myaccount(userId)} className="bttn">My Account</button></div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="p-2 home">
              <a href="./login.html" className="login">
                Login
              </a>
            </div>
            <div className="p-2 home">
              <a href="./signup.html" className="login">
                Signup
              </a>
            </div>
            <div className="p-2 home">
              <a href="./Add-to-cart.html">
                <img
                  src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000"
                  alt="cart"
                  className="cart"
                />
              </a>
            </div>
            <div className="p-2 home">
              <img
                src="https://img.icons8.com/?size=100&id=87&format=png&color=000000"
                alt="wishlist"
                className="whishlist"
              />
            </div>
            <div className="p-2 home">
              <img
                src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
                alt="search"
                className="search"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="products-container">
        {products.map((item) => (
          <div className="product" key={item._id}>
            <div className="img-box" onClick={() => console.log('Single View:', item._id)}>
            <img src={`http://localhost:3000/${item.Images[0]}`} alt="" className="imgs"  onClick={()=>Single(item._id)} />
            </div>
            <h3>{item.Title}</h3>
            <div className="des">{item.Description.slice(0, 40)}</div>
            <div className="d-flex orangebox pt-3">
              <div className="rating">
                {item.Rating}
                <img src="https://img.icons8.com/?size=100&id=tf9WJOzzs4Wo&format=png&color=FFFFFF" className="star" />
              </div>
            </div>
            <div className="price pt-2">Rs.{item.Price}</div>
            <div className="d-flex justify-content-center pt-3">
              <div className="pt-2 p-2">
                <button onClick={() => handleAddToCart(item._id)} className="addbttn px-3">
                  <img
                    src="https://img.icons8.com/?size=100&id=2qhaGYWA3JF4&format=png&color=000000"
                    className="carticon"
                  />
                  <span className="" onClick={()=>Cart(item._id)}>Add To Cart</span>
                </button>
              </div>
            </div>
            <div>
              <div className="pt-2 p-2">
                <button
                  onClick={() => handleAddToWishlist(item._id, item.Price, item.Title)}
                  className="addbttn"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=85339&format=png&color=FA5252"
                    className="heart"
                    alt="wishlist"
                  />
                  <span className="" onClick={()=>Wishlist(item._id)}>Add To Wishlist</span>
                </button>
                <div className=''>
                  <div className=''><img src="https://img.icons8.com/?size=100&id=85387&format=png&color=000000" className='trash' alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Buyer;
