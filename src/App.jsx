import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Contact, Footer, Header, Hero, Scroll, SideBar, Info, MovSir } from './Import'
import SearchResults from './Component/MovSir/SearchResults/SearchResults'
import { Analytics } from '@vercel/analytics/react'

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
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Analytics />
    </>
  )
}

export default App
// <GoToNextSection/>