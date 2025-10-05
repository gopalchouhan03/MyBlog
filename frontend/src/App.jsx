import { useState } from 'react'
import postHook from '../hooks/post.hook'
import './App.css'
import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from "react-router-dom"

function App() {
  const [] = useState(false);
  const {
    post,
    loader,
    fetchUser
  } = postHook();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-8 mb-8">
          <Outlet context={{ post , loader , fetchUser}} />
        </main>
        <Footer />
      </div>

    </>
  )
}

export default App
