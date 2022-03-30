import logo from './logo.svg';
import './App.css';
import VoyagerContainer from './voyagerContainer/voyagerContainer';
import NavBarComponent from './navBarComponent/navBarComponent';
function App() {
  return (
    <div className="App">
      <NavBarComponent></NavBarComponent>
      <VoyagerContainer></VoyagerContainer>
    </div>
  );
}

export default App;
