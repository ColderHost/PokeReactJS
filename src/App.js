import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"



import NavBar from './Layout/NavBar/NavBar';
import Dashboard from './Layout/main/Dashboard';

  

function App() {
  return (
    <div className="main">
      <nav className="nav">
      <NavBar />
      </nav>
    <div className='more'>
    <Dashboard/>
    </div>  
      </div>
  );
}



export default App;
