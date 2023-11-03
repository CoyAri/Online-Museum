import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap'
import Link from 'next/link';

export default function MainNav() {

    const router = useRouter();
    const [artTitle, setArtTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(artTitle.trim() === '')) {
            router.push(`/artwork?title=true&q=${artTitle}`)
        }
    }

    return (
        <>
            <Navbar className='fixed-top navbar-dark bg-primary'>
                <Container>
                    <Navbar.Brand>Angelo Ivan Mejia</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
                            <Link href="/search" passHref legacyBehavior><Nav.Link>Advance Search</Nav.Link></Link>
                        </Nav>
                        <Form className='d-flex' onSubmit={handleSubmit}>
                            <Form.Control
                                type='search'
                                placeholder='Search'
                                className='me-2'
                                aria-label='Search'
                                value={artTitle}
                                onChange={(e) => { setArtTitle(e.target.value) }}
                            />
                            <Button type='submit' variant='success'>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}