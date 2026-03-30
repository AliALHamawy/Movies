import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Footer, Header, Hero, Scroll } from './Import'
import SideBar from './Component/SideBar/SideBar'

function App() {
  return (
    <>
      <BrowserRouter >
        <Header />
        {/* <SideBar/> */}
        <Routes>
          <Route path='/'
            element={
              <><Hero /><Scroll /></>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App