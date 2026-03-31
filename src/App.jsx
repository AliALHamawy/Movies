import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Contact, Footer, Header, Hero, Scroll,SideBar,GoToNextSection } from './Import'

function App() {
  return (
    <>
      <BrowserRouter >
        <Header />

        <Routes>
          <Route path='/'
            element={
              <><Hero /><Scroll /><Contact/><SideBar /></>
            }
          />
        </Routes>
        <Footer />
        </BrowserRouter>
        </>
      )
    }
    
export default App
    // <GoToNextSection/>