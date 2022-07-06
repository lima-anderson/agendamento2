import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.usuarios.map(usuario => {
        return (
            <tr key={usuario.id}>
                <td>{ usuario.name }</td>
                <td>{ usuario.email }</td>
                <td>{ usuario.password }</td>
                <td>{ usuario.curso }</td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Senha</th>
                    <th scope="col">Curso</th>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>

    )
}