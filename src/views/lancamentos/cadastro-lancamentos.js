import React from 'react'
import Card from '../../components/card';
import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import * as messages from '../../components/toastr'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends React.Component {
    state ={
        id: null,
        descricao:'',
        valor: '',
        mes: '',
        ano: '',
        tipo:'',
        status:'',
        usuario: null,
        atualizando: false
        
    }
    constructor (){
        super();
        this.service = new  LancamentoService();
    }
    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response=>{
                    this.setState( {...response.data, atualizando: true} )
                }).catch(error=>{
                    messages.mensagemErro(error.response.data)
                })
        }
        
    }
    submit=()=>{    
        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado")

        const { descricao, ano, valor, tipo, mes} = this.state;
        const lancamento = {
            descricao, ano, valor, tipo, mes, usuario: usuarioLogado.id};

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg))
            return false
        }

        this.service
            .salvar(lancamento)
            .then(response =>{
                this.props.history.push("/consulta-lancamentos")
                messages.mensagemSucesso("Lançamento cadastrado com sucesso! :)")
            }).catch(error =>{
                messages.mensagemErro(error.response.data)
            })
            
    }
    atualizar =() =>{
        const { descricao, ano, valor, tipo, status, mes, id, usuario } = this.state;
        const lancamento = {
            descricao, ano, valor, tipo, status , mes, id,  usuario};

        this.service
            .atualizar(lancamento)
            .then(resposta => {
                this.props.history.push("/consulta-lancamentos")
                messages.mensagemSucesso("Lançamento atualizado com sucesso! :)")
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })

    }
    handleChange = (event)=>{
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value})
    }

    render() {
        const tipos = this.service.obterListaTipos()
        const meses = this.service.obterListaMeses()

        return(
            <Card title={this.state.atualizando ? 'Atualização de Lançamneto' : 'Cadastro de Laçamento'}> 
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" 
                                   label="Descrição:*">
                            <input id="inputDescricao" 
                                   name="descricao" 
                                   type="text"
                                   value={this.state.descricao}
                                   className="form-control"
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup
                                   id="inputAno"
                                   label="Ano: *">
                            <input id="inputAno"
                                   value={this.state.ano}
                                   onChange={this.handleChange}
                                   name="ano"
                                   type="text"
                                   className="form-control"/>
                        </FormGroup>
                    </div>
                     <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu 
                                    id="inputMes" 
                                    lista={meses}
                                    value={this.state.mes}
                                    name="mes"
                                    onChange={this.handleChange}>
                            </SelectMenu>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor"
                                   label="Valor: *">
                            <input id="inputValor"
                                   type="text"
                                   className="form-control"
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo"
                                   label="Tipo: *">
                            <SelectMenu 
                                    id="inputTipo"
                                    lista={tipos}
                                    name="tipo"
                                    value={this.state.tipo}
                                    onChange={this.handleChange}></SelectMenu>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus"
                                   label="Status:">
                            <input id="inputStatus" 
                                   type="text"
                                   name="staus"
                                   value={this.state.status}
                                   className="form-control"
                                   disabled/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ? (
                            <button onClick={this.atualizar} className="btn btn-outline-success">Atualizar</button>
                        ) : (
                            <button 
                                    onClick={this.submit}
                                    className="btn btn-outline-primary">
                                 <i className="pi pi-save"></i> Salvar
                            </button>
                        )
                        }
                        <button 
                                onClick={e=> this.props.history.push("/consulta-lancamentos")}
                                className="btn btn-outline-danger">
                             <i className="pi pi-times-circle"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>

        )
    }
}
export default withRouter(CadastroLancamentos);