import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const Products = () => {
  const [product, setproduct] = useState();

  useEffect(() => {
    getProducts();
  }, [])


  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products',{
      headers: {
        authorization: JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    console.log(result);
    setproduct(result);
  }

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json()
    if (result) {
      getProducts();
    }
    alert("are you sure want to remove this product")
  }

  const searchHandle = async (event) => {

    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      })
      result = await result.json();
      if (result) {
        setproduct(result)
      }
    } else {
      getProducts();
    }
  }

  return (
    <div className="list">
      <h3>Product List</h3>
      <input type="text" style={{ width: 'max(10rem,40vw)', padding: '0.5rem', borderRadius: '15px', marginBottom: '1rem' }} className='Search-product-box' placeholder='Search Product' onChange={searchHandle} />
      <ul className="produ">
        <li>Name</li>
        <li>price</li>
        <li>category</li>
        <li>company</li>
        <li>Operations</li>
      </ul>

      {
        product?.map((prod) => (
          <ul key={prod._id} className="produ">
            <li>{prod.name}</li>
            <li>{prod.price}</li>
            <li>{prod.category}</li>
            <li>{prod.company}</li>
            <li className="uniqueLi" style={{ display: 'inline-block', width: 'max(10vw,0)' }}>
              <button onClick={() => deleteProduct(prod._id)}>Delete</button>
              <Link to={`/update/${prod._id}`}><button>Update</button></Link>
            </li>
          </ul>
        ))
        // : <h1>No PRODUCT FOUND </h1>
      }
    </div>
  )
}

export default Products
