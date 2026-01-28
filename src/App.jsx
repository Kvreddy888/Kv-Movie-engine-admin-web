import './css/App.css'
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import { Routes,Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieDetailsPage from './pages/MovieDetailPage';
import { MovieProvider } from './contexts/MovieContext';
import ActorDetails from './pages/ActorDetails';
function App() {
  return (
    
      <MovieProvider>
      <NavBar/>
    <main className='main-content'>
    <Routes>
      <Route path='/'element={<Home/>}/>
      <Route path='/Favorites' element={<Favorites/>}/>
      <Route path="/movie/:id" element={<MovieDetailsPage/>} />
        <Route path='/actor/:actorid' element={<ActorDetails />} />
    </Routes>
    </main>
    </MovieProvider>
  )
}

export default App
