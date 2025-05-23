import { Toaster } from 'react-hot-toast';
import Library from './Components/Library';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <>
    {/* <BrowserRouter > */}
      <Toaster />
      <Library />
    {/* </BrowserRouter> */}
    </>
  )
}

export default App
