import React from 'react';
import Card from '../../components/card';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


import { withRouter } from 'react-router-dom'

import UsuarioService from '../../app/service/usuarioservice';

import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import TabelaUsuario from './tabelaUsuario'

class ConsultaUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        curso: '',
        calendarioCozinha: '',
        calendarioLimpeza: '',
        emails: [],
        usuarios: [],
        showConfirmDialog: false,
        deletarUsuario: {}
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    componentDidMount(){
        this.service.buscarUsuarios()
            .then(response => {
                this.setState({ usuarios: response.data })
                console.log(response.data)
            }).catch(error => {
                console.error(error.response)
            });
    }

    cadastrar = () => {
        const usuario = {
            name: this.state.nome,
            email: this.state.email,
            password: this.state.senha
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data.msg)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-usuarios/${id}`)
        console.log('editanto usuario' + id)
        
    }

    abrirConfirmacao = (usuario) => {
        this.setState({
            showConfirmDialog: true, deletarUsuario: usuario
        })
    }

    cancelarDelecao = () => {
        this.setState({
            showConfirmDialog: false, deletarUsuario: {}
        })
    }

    deletar = () => {
        this.service
            .deletar(this.state.deletarUsuario.id)
            .then(response => {
                const usuarios = this.state.usuarios
                const index = usuarios.indexOf(this.state.deletarUsuario)
                usuarios.splice(index, 1)
                this.setState({ usuarios: usuarios, showConfirmDialog: false })
                mensagemSucesso("Tarefa excluída com sucesso")
            }).catch(error => {
                mensagemErro("Não foi possível excluir a tarefa")
        })
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    irParaCadastro = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
            </div>
        );

        return(
            <div className='container'>
                <Card title='Usuários'>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <TabelaUsuario
                                    usuarios={this.state.usuarios}
                                    deletarAction={this.abrirConfirmacao}
                                    editarAction={this.editar}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{ width: '50vw' }}
                            modal={true}
                            footer={confirmDialogFooter}
                            onHide={() => this.setState({showConfirmDialog: true})}>
                            <p>Deseja mesmo excluir este usuário?</p>
                        </Dialog>
                    </div>
                </Card>
                <button
                    onClick={this.irParaCadastro}
                    ype="button"
                    className="btn btn-success">
                    Cadastrar Usuário
                </button>
            </div>
        )
    }
}

export default withRouter(ConsultaUsuario)