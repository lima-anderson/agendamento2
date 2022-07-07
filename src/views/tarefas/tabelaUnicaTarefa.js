import moment from 'moment';
import React from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = {
        return (
            <tr key={prop.tarefa.id}>
                <td>{ prop.tarefa.tipo }</td>
                <td>{moment(prop.tarefa.data).format('MM/DD/YYYY HH:mm')}</td>
                <td>{prop.tarefa.usuario.name}</td>
                <td>
                    <button type="button"
                            className="btn btn-primary" 
                            onClick={e => props.editarAction(prop.tarefa.id)}>
                            Editar
                    </button>
                    <button type="button"
                            className="btn btn-danger"
                            onClick={e => props.deletarAction(prop.tarefa)}>
                            Deletar
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Data</th>
                    <th scope="col">Usuário</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>

    )
}