import React from 'react'

import {Footer, Header, Wim, Features, Blog  } from './containters';
import {CTA, Navbar, } from './components';

import './app.css';

const app = () => {
  return (
    <div className='App'>
      <div className='gradient_bg'>
        <Navbar/>
        <Header/>
      </div>
      <Wim/>
      <Features/>
      <CTA/>
      <Blog/>
      <Footer/>
    </div>
  )
}

export default app
