

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// function View() {
//   let params = new URLSearchParams(window.location.search);
//   console.log("params", params);
//   let token_data = parsed.data;

//       let token = token_data.token;
//       console.log(token);

//       let id = token_data.id;
//       console.log(id)

//       let token_key = id;
//       console.log(token_key);
//     const [products, setProducts] = useState([]);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//       const navigate = useNavigate(); // Initialize useNavigate
    
//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 let params = new URLSearchParams(window.location.search);
//                 let token_key = params.get('login');
//                 let token = localStorage.getItem(token_key);

//                 const response = await axios.get('http://localhost:3000/View', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (response.data && response.data.data) {
//                     setProducts(response.data.data);
//                 }

//                 // Fetch user details
//                 const userId = params.get('id');
//                 const userResponse = await axios.get(`http://localhost:3000/singleuser/${userId}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 setUser(userResponse.data.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError('Failed to load products or user data');
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchProducts();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//       const asd = ()=>{
//         navigate(`/`)
//       }
//     return (
//         <>
//             <div className="p-4">
//                 <div className=" navbar">
//                     <div className="d-flex">
//                         <div className="Onsko p-2">Onsko</div>
//                         <div className="home p-2">
//                             <a href="./index.html" className="login">Home</a>
//                         </div>
//                         <div className="home p-2">
//                             <a href="./Bestsellers.html" className="login">Store</a>
//                         </div>
//                         <div className="home p-2">
//                             <a href="./About.html" className="login">About</a>
//                         </div>
//                         <div className="home p-2">
//                             <a href="./Contact.html" className="login">Contact</a>
//                         </div>
//                     </div>
//                     <div className="d-flex">
//                         <div className="profile">
//                             {user && (
//                                 <div className="text-center dropdown">
//                                     <button className="dropbtn px-3">
//                                         <strong>Hello,</strong> {user.name || 'Guest'}
//                                     </button>
//                                     <div className="dropdown-content pt-3">
//                                         <div>
//                                             <button onClick={() => alert('Add Product')} className="bttn">Add product</button>
//                                         </div>
//                                         <div>
//                                             <button onClick={() => alert('My Account')} className="bttn">My Account</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="p-2 home">
//                             <a href="./login.html" className="login">Login</a>
//                         </div>
//                         <div className="p-2 home">
//                             <a href="./signup.html" className="login">Signup</a>
//                         </div>
//                         <div className="p-2 home">
//                             <a href="./Add-to-cart.html">
//                                 <img src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000" alt="cart" className="cart" />
//                             </a>
//                         </div>
//                         <div className="p-2 home">
//                             <img src="https://img.icons8.com/?size=100&id=87&format=png&color=000000" alt="whishlist" className="whishlist" />
//                         </div>
//                         <div className="p-2 home">
//                             <img src="https://img.icons8.com/?size=100&id=132&format=png&color=000000" alt="search" className="search" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div id="datacontainer">
//                 <div className="pt-5">
//                     <div className="green">
//                         <div className="row p-5">
//                             {products.length > 0 ? (
//                                 products.map((item) => (
//                                     <div className="col-3" key={item._id}>
//                                         <div className="product" data-name="p-1">
//                                         <div className="img-box" onClick={() => alert(`View ${item.Title}`)}>
//     <img src={`http://localhost:3000/${item.Images[0]}`} alt={item.Title} className="imgs" onClick={asd} />
// </div>

//                                             <h3>{item.Title}</h3>
//                                             <div className="des">{item.Description.slice(0, 40)}</div>
//                                             <div className="d-flex orangebox pt-3">
//                                                 <div className="rating">
//                                                     {item.Rating}
//                                                     <img src="https://img.icons8.com/?size=100&id=tf9WJOzzs4Wo&format=png&color=FFFFFF" className="star" />
//                                                 </div>
//                                             </div>
//                                             <div className="price pt-2">Rs.{item.Price}</div>
//                                             <div className="d-flex justify-content-center pt-3">
//                                                 <div className="pt-2 p-2">
//                                                     <button onClick={() => alert(`Add ${item.Title} to Cart`)} className="addbttn px-3">
//                                                         <img src="https://img.icons8.com/?size=100&id=2qhaGYWA3JF4&format=png&color=000000" className="carticon" />
//                                                         <span className="px-2">Add To Cart</span>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-2 p-2">
//                                                 <button onClick={() => alert(`Add ${item.Title} to Wishlist`)} className="addbttn">
//                                                     <img src="https://img.icons8.com/?size=100&id=85339&format=png&color=FA5252" className="heart" />
//                                                     <span className="px-2">Add To Wishlist</span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No products available.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default View;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import Myaccount from '../Myaccount/Myaccount';

function View() {
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
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/View', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log("responsedatfufufyu",response.data.data)

                if (response.data && response.data.data) {
                    setProducts(response.data.data);
                }

                console.log(response.data);

                // Fetch user details
                const userResponse = await axios.get(`http://localhost:3000/singleuser/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("userResponse",userResponse)

                setUser(userResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load products or user data');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [token, userId]);

    if (loading) {
        // return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
    

    return (
        <>
        <div className='pt-4 p-3'>
            <div className='d-flex justify-content-evenly viewnavbar'>
              <div className='d-flex'>
                <div className='px-2 pt-2'><strong>Onsko</strong></div>
                <div className='px-2 pt-2'>Home</div>
                <div className='px-2 pt-2'>Store</div>
                <div className='px-2 pt-2'>About</div>
                <div className='px-2 pt-2'>Contact</div>
              </div>

              <div className='d-flex'>
                  <div className="px-2 ">
                      {user && (
                          <div className="text-center dropdown">
                              <button className="drop"><strong>Hello,</strong> {user.name || 'Guest'}</button>
                              <div className="dropdown-content pt-3">
                                  <div><button onClick={()=>Add(userId)} className="dropaddbtn">Add product</button></div>
                                  <div className='pt-3'>
                                      <button onClick={() => Myaccount(userId)} className="dropmybtn">My Account</button>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
                  <div className='px-2 pt-2'>Login</div>
                  <div className='px-2 pt-2'>Sign up</div>
                </div>
             </div>
          </div>




          {/* <div className='container'> */}
            <div id="datacontainer">
                            {products.length > 0 ? (
                                products.map((item) => (
                                    <div className="col-3" key={item._id}>
                                        <div className="product">
                                            <div className="img-box" onClick={() => alert(`View ${item.Title}`)}>
                                                <img src={`http://localhost:3000/${item.Images[0]}`} alt={item.Title} className="proimage" onClick={()=>Single(item._id)} />
                                            </div>
                                            <h3 className=''>{item.Title}</h3>
                                            <div className="">{item.Description.slice(0, 40)}</div>
                                            <div className="">Rs.{item.Price}</div>
                                            <div className="">
                                                <div className="">
                                                    <button  className="">
                                                        <span className="" onClick={()=>Cart(item._id)}>Add To Cart</span>
                                                    </button>
                                                </div>
                                              <div className="">
                                                  <button className="">
                                                      <span className="" onClick={()=>Wishlist(item._id)}>Add To Wishlist</span>
                                                  </button>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}
            </div>
        {/* </div> */}
 


  {/* <div id="datacontainer" />
  <div className="pt-5">
    <div className="green">
      <div className="row p-5">
        <div className="col-2">
          <div>
            <div className="one px-3">Shop</div>
            <ul className="pt-4">
              <li className="list">home</li>
              <li className="list">about</li>
              <li className="list">shop</li>
              <li className="list">Contact</li>
            </ul>
          </div>
        </div>
        <div className="col-2">
          <div>
            <div className="one px-3">Policy</div>
            <ul className="pt-4">
              <li className="list">terms &amp; conditions</li>
              <li className="list">privacy policy</li>
              <li className="list">refund policy</li>
              <li className="list">shipping policy</li>
              <li className="list">accessibility statement</li>
            </ul>
          </div>
        </div>
        <div className="col-2">
          <div>
            <div className="one px-3">contact</div>
            <ul className="pt-4">
              <li className="list">500 terry francine street</li>
              <li className="list">san francisco, ca 94158</li>
              <li className="list">info@mysite.com</li>
              <li className="list">123-456-7890</li>
            </ul>
          </div>
        </div>
        <div className="col-6">
          <div className="subscribe">subscribe to our newsletter</div>
          <div className="be pt-3">
            be the first to know about our hottest discounts
          </div>
          <div className="pt-3">
            <label htmlFor="pt-2" className="label">
              Email
            </label>
            <div className="pt-2">
              <div className="pt-1">
                <input type="email" className="input1234" />
              </div>
              <div className="pt-1">
                <input type="checkbox" />
                <span className="px-3 span">
                  Yes, subscribe me to your newsletter.
                </span>
              </div>
            </div>
            <div className="pt-3">
              <button className="subb">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pt-5">
        <div className="Onsko1 fw-bold">#Onsko</div>
      </div>
    </div>
  </div> */}
</>


    );
}

export default View;

