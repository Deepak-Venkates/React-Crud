import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {


  const [item, setItem] = useState(null);
  const [prname, setPrname] = useState("");
  const [pr, setPr] = useState("");
  const [oldpr, setOldpr] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState("");
  const [desc, setDesc] = useState("");
  const [key,setKey] = useState("");
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [oldprice,setOldprice] = useState("");
  const [cat,setCat] = useState("");
  const [state,setState] = useState("");
  const [detail,setDetail] = useState("");



  const Adds = () => {
    navigate('/add');
  }


  useEffect(() => {

    fetch('http://localhost:3000/users').then((res) => {
      return res.json();
    }).then((resp) => {
      setItem(resp);
    }).catch((err) => {
      console.log(err.message);
    })

  }
  ,[])

  const DeleteItem = (item) => {

    console.log(item);
    if (window.confirm("Do you really want to delete this product")) {
      axios.delete(`http://localhost:3000/users/${item.id}`)
      alert("Successfully Deleted")
    }
  }

  const EditItem = async () => {
    let key = localStorage.getItem('id');
    await axios.put((`http://localhost:3000/users/${key}`), {
      prname,
      pr,
      oldpr,
      category,
      active,
      desc
    })
    alert("Successsfully changed");
    navigate('/');

  }

    const setdata  = (item) => {
          setKey(item.id);
          console.log(key);
          setName(item.prname);
          setPrice(item.pr);
          setOldprice(item.oldpr);
          setCat(item.category);
          setState(item.active);
          setDetail(item.desc)
    }

    const Add = async (e) => {
      e.preventDefault();
          await axios.post('http://localhost:3000/users', {
              prname,
              pr,
              oldpr,
              category,
              active,
              desc
          })
          alert("Successfully Added");
          navigate("/");
  }

  return (
    <div>
      <br /><br />
      <div id='tab'>
        <table className="table" style={{ width: "1000px" ,borderRadius:"5px" }}>
          <tbody>
            <tr>
              <th id='pn'>Product Name</th>
              <th id='p'>Price</th>
              <th id='op'>Old Price</th>
              <th id='op'>Category</th>
              <th id='op'>State</th>
              <th id='d'>Description</th>
              <th id='a'>Actions</th>

            </tr>
            {
              item && item.map(product => (

                <tr key={product.id}>
                  <td>{product.prname}</td>
                  <td>{product.pr}</td>
                  <td>{product.oldpr}</td>
                  <td>{product.category}</td>
                  <td>{product.active}</td>
                  <td>{product.desc}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => DeleteItem(product)}>Delete</button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>setdata(product)}
                      style={{marginLeft:"10px"}}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <center>  <button
                 type="button"
                 className="btn btn-primary"
                 data-bs-toggle="modal"
                 data-bs-target="#exampleModal2"
                 >
                  Add Product
                  </button></center>

            
      <div>
        <>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"

          >
            <div class="modal-dialog modal-fullscreen-xxl-down">

              <div className="modal-content">
                <div className="modal-header">


                  <div className="mb-3" style={{ display: "flex" }}>
                    <div>
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        style={{ width: "150px" }}
                        onChange={(e) => setPrname(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div>
                      <label htmlFor="exampleInputPassword1" className="form-label"
                      style={{marginLeft:"40px"}}

                      >
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        style={{ width: "150px", marginLeft: "40px" }}
                        onChange={(e) => setPr(e.target.value)}
                        value={price}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{ marginLeft: "40px" }}>
                      Old Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPassword1"
                      style={{ width: "150px",marginLeft:"40px" }}
                      onChange={(e) => setOldpr(e.target.value)}
                      value={oldprice}
                    />
                  </div>
                  <div> <label htmlFor="exampleInputPassword1" className="form-label" style={{ marginLeft: "40px" }}>
                    Category
                  </label>
                    <select class="form-select" aria-label="Default select example"
                      style={{ width: "180px", marginLeft: "40px" }}
                      onChange={(e) => setCategory(e.target.value)}
                      value={cat}
                    >
                      <option value="Fruits">Fruits & nuts</option>
                      <option value="Vegetables">Vegetable</option>
                      <option value="Dairy & Creams">Dairy & Creams</option>
                      <option value="Packages">Packages</option>
                      <option value="Foods">Foods</option>
                      <option value="Staples">Staples</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{ marginLeft: "40px" }}>
                      Is Active
                    </label>
                    <div class="form-check" style={{ marginLeft: "40px" }}>
                      <input class="form-check-input" type="checkbox" value="active" id="flexCheckDefault"
                        onChange={(e) => setActive(e.target.value)}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Yes
                      </label>
                    </div>
                    <div class="form-check" style={{ marginLeft: "40px" }}>
                      <input class="form-check-input" type="checkbox" value="Inactive" id="flexCheckChecked"
                        onChange={(e) => setActive(e.target.value)}
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        No
                      </label>
                    </div>
                  </div>
                 
                    <label style={{ marginLeft: "40px" }}>  Description</label>
                   
                    <textarea onChange={(e) => setDesc(e.target.value)}
                      style={{ width: "200px", marginLeft: "40px" }}
                      value={detail}
                    />
                 
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" 
                  
                  onClick={EditItem}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>

      <div>
        <>
          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"

          >
            <div class="modal-dialog modal-fullscreen-xxl-down">

              <div className="modal-content">
                <div className="modal-header">


                  <div className="mb-3" style={{ display: "flex" }}>
                    <div>
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        style={{ width: "150px" }}
                        onChange={(e) => setPrname(e.target.value)}
                        
                      />
                    </div>
                    <div>
                      <label htmlFor="exampleInputPassword1" className="form-label"
                      style={{marginLeft:"40px"}}

                      >
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        style={{ width: "150px", marginLeft: "40px" }}
                        onChange={(e) => setPr(e.target.value)}
                        
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{ marginLeft: "40px" }}>
                      Old Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPassword1"
                      style={{ width: "150px",marginLeft:"40px" }}
                      onChange={(e) => setOldpr(e.target.value)}
                     
                    />
                  </div>
                  <div> <label htmlFor="exampleInputPassword1" className="form-label" style={{ marginLeft: "40px" }}>
                    Category
                  </label>
                    <select class="form-select" aria-label="Default select example"
                      style={{ width: "180px", marginLeft: "40px" }}
                      onChange={(e) => setCategory(e.target.value)}
                      
                    >
                      <option value="Fruits">Fruits & nuts</option>
                      <option value="Vegetables">Vegetable</option>
                      <option value="Dairy & Creams">Dairy & Creams</option>
                      <option value="Packages">Packages</option>
                      <option value="Foods">Foods</option>
                      <option value="Staples">Staples</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{ marginLeft: "40px" }}>
                      Is Active
                    </label>
                    <div class="form-check" style={{ marginLeft: "40px" }}>
                      <input class="form-check-input" type="checkbox" value="active" id="flexCheckDefault"
                        onChange={(e) => setActive(e.target.value)}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Yes
                      </label>
                    </div>
                    <div class="form-check" style={{ marginLeft: "40px" }}>
                      <input class="form-check-input" type="checkbox" value="Inactive" id="flexCheckChecked"
                        onChange={(e) => setActive(e.target.value)}
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        No
                      </label>
                    </div>
                  </div>
                 
                    <label style={{ marginLeft: "40px" }}>  Description</label>
                   
                    <textarea onChange={(e) => setDesc(e.target.value)}
                      style={{ width: "200px", marginLeft: "40px" }}
                     
                    />
                 
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" 
                  
                  onClick={(e)=>Add(e)}>
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}


export default App;
