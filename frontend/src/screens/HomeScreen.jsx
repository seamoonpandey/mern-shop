import React, {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';

const HomeScreen=() => {
    const [products, setProducts]=useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/products`).then((response) => {
            setProducts(response.data);
        })

        
    },[])
  return (
      <>
          <h1>Latest products</h1>
          <Row>
              {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={2}>
                      <Product product={product} />
                  </Col>
              ))}
          </Row>
      </>
  )
}

export default HomeScreen
