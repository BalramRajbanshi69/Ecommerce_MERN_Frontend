import React from 'react';
import MainHome from './MainHome'
import Services from './Services'
import Contact from './Contact'
import Footer from './Footer';
import AllProducts from './AllProducts';

const Home = () => {
  return (
    <div>
      <MainHome />
      <AllProducts /> 
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home;