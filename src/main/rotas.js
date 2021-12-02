import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from '../views/home'
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { AuthConsumer }from '../main/provedorAutenticacao'

import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }){
  return(
    <Route {...props} render={(componentProps) =>{
      if (isUsuarioAutenticado) {
        return(
          <Component {...componentProps}></Component>
        )

      }else{
        return (
          <Redirect to={{ pathname: '/login', state: { from: componentProps.location} }}></Redirect>
        )
      }
      }}></Route>
  )
}

function Rotas(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
        
        <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}></RotaAutenticada>
        <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos}></RotaAutenticada>
        <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}></RotaAutenticada>
      </Switch>
    </HashRouter>
  );
}
export default ()=>(
  <AuthConsumer>
    { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>) }
  </AuthConsumer>
);
