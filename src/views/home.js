import React from "react";
import UsuarioService from "../app/service/usuarioservice";
import { AuthContext } from '../main/provedorAutenticacao'


class Home extends React.Component {
  state = {
    saldo: 0,
  };

constructor(){
  super();
  this.usuarioService = new UsuarioService()
}

  componentDidMount() {
    const usuarioLogado = this.context.usuarioAutenticado

    console.log("usuario logado do localStorage:",usuarioLogado);

    this.usuarioService
      .obterSaldoPosUsuario(usuarioLogado.id)
      .then(response => {
        this.setState({ saldo: response.data });
      })
      .catch(error => {
        console.error(error.response);
      });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">
          Seu saldo para o mês atual é de R$ {this.state.saldo}
        </p>
        <hr className="my-4"></hr>
        <p>
          E essa é sua área administrativa, utilize um dos menus ou botões
          abaixo para navegar pelo sistema.
        </p>
        <p className="lead">
          <a
            className="btn btn-outline-primary"
            href="#/cadastro-usuarios"
            role="button"
          >
            <i className="pi pi-user-plus"></i> Cadastrar Usuário
          </a>
          <a className="btn btn-outline-success" 
             href = "#/cadastro-lancamentos/:id"
             role="button">
            <i className="pi pi-money-bill"></i> Cadastrar Lançamento
          </a>
        </p>
      </div>
    );
  }
}
Home.contextType = AuthContext;
export default Home;
