import React from 'react'

class Home extends React.Component{

    state = {
        estudantes: 0
    }


    render(){
        return (
            <div className='container'>
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de agendamento.</p>
                    <p className="lead">Atualmente temos {this.state.estudantes} estudantes na casa.</p>
                    <hr className="my-4" />
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" 
                            href="#/cadastro-usuarios" 
                            role="button"><i className="pi pi-users"></i>  
                            Cadastrar Usuário
                        </a>
                        <a className="btn btn-danger btn-lg" 
                            href="/cadastro-lancamentos" 
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