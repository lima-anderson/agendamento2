import moment from 'moment';
import React from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.tarefas.map(tarefa => {
        return (
            <tr key={tarefa.id}>
                <td>{ tarefa.tipo }</td>
                <td>{moment(tarefa.data).format('MM/DD/YYYY HH:mm')}</td>
                <td>{ tarefa.usuario.name }</td>
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
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>

    )
}