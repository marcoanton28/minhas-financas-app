import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom";

import UsuarioService from "../app/service/usuarioservice";
import { mensagemSucesso, mensagemErro }from '../components/toastr'

class CadastroUsuario extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  constructor(  ){
    super()
    this.service= new UsuarioService()

  }

  cadastar = () => {
   
    const { nome, email, senha, senhaRepeticao } = this.state
    const usuario = { nome, email, senha, senhaRepeticao}
    
    try{
      this.service.validar(usuario)
    }catch(erro){
      const msgs = erro.mensagens;
      msgs.forEach(msg=> mensagemErro(msg))
      return false; 
    }

    this.service.salvar(usuario)
        .then(response=>{
          mensagemSucesso('Usuário cadastrado com sucesso!! Faça o login para acessar o sistema..')
          this.props.history.push("/login");
    }).catch(error=>{
          mensagemErro(error.response.data)
    })
  };

  cancelar = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  className="form-control"
                  id="inputNome"
                  name="nome"
                  onChange={(e) => this.setState({ nome: e.target.value })}
                ></input>
              </FormGroup>

              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  className="form-control"
                  id="inputSenha"
                  name="senha"
                  onChange={(e) => this.setState({ senha: e.target.value })}
                />
              </FormGroup>
              <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                <input
                  type="password"
                  className="form-control"
                  id="inputRepitaSenha"
                  name="senha"
                  onChange={(e) =>
                    this.setState({ senhaRepeticao: e.target.value })
                  }
                />
              </FormGroup>
              <button
                onClick={this.cadastar}
                type="button"
                class="btn btn-outline-primary">
                <i className="pi pi-save"></i> Salvar
              </button>
              <button
                onClick={this.cancelar}
                type="button"
                class="btn btn-outline-danger">
                <i className="pi pi-times-circle"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
              <div className="bs-component"></div>   

          </div>
        </div>
      </Card>
    );
  }
}
export default withRouter(CadastroUsuario);
