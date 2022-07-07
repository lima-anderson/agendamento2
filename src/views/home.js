import React from 'react'

import UsuarioService from '../app/service/usuarioservice'

import { mensagemSucesso } from '../components/toastr'

class Home extends React.Component{

    state = {
        quantidaDeEstudantes: 0
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    componentDidMount(){
        this.service.buscarUsuarios()
            .then(response => {
                this.setState({ quantidaDeEstudantes: response.data.length })
            }).catch(error => {
                console.error(error.response)
            })
    }

    render(){
        return (
            <div className='container'>
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de agendamento.</p>
                    <p className="lead">Atualmente temos {this.state.quantidaDeEstudantes} estudantes na casa.</p>
                    <hr className="my-4" />
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" 
                            href="#/cadastro-usuarios" 
                            role="button"><i className="pi pi-users"></i>  
                            Cadastrar Usuário
                        </a>
                        <a className="btn btn-danger btn-lg" 
                            href="#/cadastro-tarefas/" 
                            role="button"><i className="pi pi-money-bill"></i>  
                            Calendário de Atividades
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}


export default Home