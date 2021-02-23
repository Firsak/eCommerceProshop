import React, {useEffect, useState} from 'react'
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {deleteProduct, listProducts} from "../actions/productActions";


function ProductListScreen (props) {
  const {location, history, match} = props

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  const productDelete = useSelector(state => state.productDelete)
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [history, dispatch, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = (product) => {
    console.log("Create")
  }

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-right">
          <Button className="btn my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='light' className='btn btn-sm'>
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>

                <Button variant='danger' className='btn btn-sm' onClick={() => deleteHandler(product._id)}>
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default ProductListScreen