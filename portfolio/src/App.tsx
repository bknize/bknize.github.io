import { Route, Routes } from 'react-router'
import './app.css'
import Home from './routes/home'
import CaseStudy from './routes/CaseStudy'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={ <CaseStudy />} />
      </Routes>
      </>
  )
}

export default App
