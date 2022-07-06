import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import './custom.css';

import 'toastr/build/toastr.min.js'
import 'toastr/build/toastr.css'

import Rotas from './rotas';
import NavBar from './components/navbar';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


import { Button } from 'primereact/button';
 

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Button label="Click" icon="pi pi-check" />
        <NavBar />
        <Rotas/>
      </div>
    );
  }
}

export default App;