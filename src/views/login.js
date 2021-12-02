import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter} from "react-router-dom";
import UsuarioService from "../app/service/usuarioservice";
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro} from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component {
  state = {
    email: "",
    senha: ""
  };
  constructor() {
    super()
    this.service = new UsuarioService()
  }
  entrar = () => {
    this.service.autenticar({
        email: this.state.email,
        senha: this.state.senha,
      })
      .then((response) => {
        this.context.iniciarSessao(response.data)
        this.props.history.push("/home");
      }).catch((erro)=>{
        mensagemErro(erro.response.data)
      })
  };

  preparaCadastrar = () => {
    this.props.history.push("/cadastro-usuarios");
  };

     render() {
       return (
          <div className = "row">
<div className="col-md-6" style={{ position: "relative",left: "300px"}}>
  <div className="bs-docs-section">
    <Card title="Login">
     
          <div className="row">
            <div className="col-lg-12">

              <div className="bs-component">
                <fieldset>
                  <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                    <input type="email" 
                           value={ this.state.email } 
                           onChange={ (e)=> this.setState({email: e.target.value})}
                    className = "form-control"
                    id = "exampleInputEmail"
                    aria-describedby = "emailHelp"
                    placeholder = "Digite o email:" >
                    </input>
                    </FormGroup>
                  <FormGroup label="Senha: *" htmlFor="exampleInputPassword">
                    <input type="password" value={this.state.senha} onChange={(e)=> this.setState({senha:
                    e.target.value})}
                    className = "form-control"
                    id = "exampleInputPassword"
                    placeholder = "Password"/>
                  </FormGroup>
                   <button 
                           onClick={this.entrar}
                           className="btn btn-outline-primary">
                          <i className="pi pi-sign-in"></i> Entrar
                    </button>
                    <button
                           onClick={this.preparaCadastrar }
                           className="btn btn-outline-danger">
                          <i className="pi pi-user-plus"></i> Cadastrar 
                    </button> 
                </fieldset>
              </div>
            </div>
          </div>
    </Card>
  </div>
</div>
</div>
)
  }
}
Login.contextType = AuthContext;
export default withRouter(Login);