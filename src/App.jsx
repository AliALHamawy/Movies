import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Contact, Footer, Header, Hero, Scroll, SideBar, Info, MovSir } from './Import'

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
          <Route path='/details/:type/:id' element={<Info/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
// <GoToNextSection/>