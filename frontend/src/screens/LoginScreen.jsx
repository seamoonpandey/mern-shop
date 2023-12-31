import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';

const LoginScreen=() => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const submitHandler=(e) => {
        console.log('submit')
    }

    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='passw0rd'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to='/register'>Register Now</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
