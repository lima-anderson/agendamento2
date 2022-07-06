import moment from 'moment';
import React from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.tarefas.map(tarefa => {
        return (
            <tr key={tarefa.id}>
                <td>{ tarefa.tipo }</td>
                <td>{moment(tarefa.data).format('MM/DD/YYYY HH:mm')}</td>
                <td>{tarefa.usuario.name}</td>
                <td>
                    <button type="button"
                            className="btn btn-primary" 
                            onClick={e => props.editarAction(tarefa.id)}>
                            Editar
                    </button>
                    <button type="button"
                            className="btn btn-danger"
                            onClick={e => props.deletarAction(tarefa)}>
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