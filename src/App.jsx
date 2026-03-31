import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Contact, Footer, Header, Hero, Scroll, SideBar, GoToNextSection, MovSir } from './Import'

function App() {
  return (
    <>
      <BrowserRouter >
        <Header />

        <Routes>
          <Route path='/'
            element={
              <><Hero /><Scroll /><Contact /><SideBar /></>
            }
          />
          <Route path='/movies'
            element={
              <MovSir type="movie" />
            }
          />
          {/* Route for Series */}
          <Route path='/series'
            element={
              <MovSir type="series" />
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