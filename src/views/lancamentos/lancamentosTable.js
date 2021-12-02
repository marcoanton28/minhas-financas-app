import React from "react";
import  currencyFormatter  from "currency-formatter";

export default (props) => {
  
    const rows = props.lancamentos.map(lancamento=>{
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{ currencyFormatter.format( lancamento.valor,{ locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" title="Efetivar"
                            className="btn btn-outline-success"
                            disabled={ lancamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}>
                            <i className = "pi pi-check-circle"> </i>
                    </button>
                    <button type="button" title="Cancelar"
                            className="btn btn-outline-warning"
                            disabled={ lancamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}>
                            <i className = "pi pi-times-circle"> </i>
                    </button>
                    <button type="button" title="Editar"
                            className="btn btn-outline-primary"
                            onClick={e => props.editAction(lancamento.id)}>
                                <i className = "pi pi-pencil"> </i>
                    </button>
                    <button type="button" title="Excluir"
                            className="btn btn-outline-danger"
                            onClick={e => props.deleteAction(lancamento)}>
                                <i className = "pi pi-trash"> </i>
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Dercrição</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Mês</th>
                    <th>Situação</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>

    )
}