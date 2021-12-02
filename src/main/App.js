import React from "react";
import Rotas from "./rotas";
import Navbar from "../components/navbar"
import 'toastr/build/toastr.min.js'
import "bootswatch/dist/darkly/bootstrap.css";
import "../custom.css";
import 'toastr/build/toastr.css'
import ProvedorAutenticacao from "./provedorAutenticacao";

import 'primereact/resources/themes/lara-light-indigo/theme.css'  
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {
  render() {
    return (
      <ProvedorAutenticacao>
      <Navbar></Navbar>
      <div className="container">
        <Rotas></Rotas>
      </div>
      </ProvedorAutenticacao>
    );
  }
}

export default App;
