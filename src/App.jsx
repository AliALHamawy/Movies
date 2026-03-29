import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Footer, Header, Hero, Scroll } from './Import'

function App() {
  return (
    <>
      <BrowserRouter >
        <Header />
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