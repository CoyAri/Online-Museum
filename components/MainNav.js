import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Container, Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap'
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { readToken, removeToken } from '@/lib/authenticate';
import { addToHistory } from '@/lib/userData';

export default function MainNav() {

  const router = useRouter();
  const [artTitle, setArtTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  let token = readToken()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false)
    let queryString = `title=true&q=${searchQuery}`;
    router.push(`/artwork?${queryString}`);
    setSearchHistory(await addToHistory(queryString));
  }

  const logout = () => {
    setIsExpanded(false)
    removeToken()
    router.push("/")
  }

  return (
    <>
      <Navbar className='fixed-top navbar-dark bg-primary' expanded={isExpanded} expand='lg'>
        <Container>
          <Navbar.Brand>Angelo Ivan Mejia</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/'} >Home</Nav.Link></Link>
              {token && <Link href="/search" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/search'} >Advance Search</Nav.Link></Link>}
            </Nav>
            {!token &&
              <Nav className='ml-auto'>
                <Link href="/register" legacyBehavior passHref><Nav.Link onClick={() => { setIsExpanded(false) }} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                <Link href="/login" legacyBehavior passHref><Nav.Link onClick={() => { setIsExpanded(false) }} active={router.pathname === "/login"}>Login</Nav.Link></Link>
              </Nav>
            }
            &nbsp;
            {token &&
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
            }
            &nbsp;
            {token &&
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior ><NavDropdown.Item active={router.pathname === '/favourites'} onClick={() => setIsExpanded(false)} >Favourites</NavDropdown.Item></Link>
                  <Link href="/history" passHref legacyBehavior ><NavDropdown.Item active={router.pathname === '/history'} onClick={() => setIsExpanded(false)} >Search History</NavDropdown.Item></Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}