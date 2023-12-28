import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import axios from 'axios';
import Rating from '../components/Rating'



const ProductScreen=() => {
    const { id: productId }=useParams();
    const [product, setProduct]=useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
            });
    },[])
  return (
      <>
          <Row>
              <Col md={5}>
                  <Image src={product.image} alt = {product.name} fluid />
              </Col>
              <Col md={4}>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                          <h3>
                              {product.name}
                          </h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                      </ListGroup.Item>
                      <ListGroup.Item>
                              <Row>
                                  <Col>
                                      Price: <strong>${product.price}</strong>
                                  </Col>
                         </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                                      Description: <p>{product.description}</p>
                      </ListGroup.Item>
                  </ListGroup>
              </Col>
              <Col md={3}>
                  <Card>
                       <ListGroup variant='flush'>
                      <ListGroup.Item>
                              <Row>
                                  <Col>
                                      Price:
                                  </Col>
                                  <strong>${product.price}</strong>
                         </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                              <Row>
                                  <Col>
                                      Status:
                                  </Col>
                                  <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                         </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Button
                                  className='btn-block'
                                  type='button'
                                  disabled={product.countInStock===0}
                              >
                                  Add to Cart
                              </Button>
                          </ListGroup.Item>
                  </ListGroup>
                  </Card>
              </Col>
          </Row>

          <Link className='btn btn-success my-3 text-white' to="/">
              Go Back
          </Link>

      </>
  )
}

export default ProductScreen
