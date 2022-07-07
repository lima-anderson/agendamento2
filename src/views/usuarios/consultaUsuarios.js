import React from 'react';
import Card from '../../components/card';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


import { withRouter } from 'react-router-dom'

import UsuarioService from '../../app/service/usuarioservice';

import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import TabelaUsuario from './tabelaUsuario'
import SelectMenu from '../../components/selectMenu';
import FormGroup from '../../components/formgroup';

class ConsultaUsuario extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            curso: this.state.curso,
            diaDeCozinhar: this.state.diaDeCozinhar,
            diaDeLimpar: this.state.diaDeLimpar
        }

        this.service.salvar(usuario)
            .then(response => {
                console.log(response.data)
                mensagemSucesso('Usuário cadastrado com sucesso.')
            }).catch(error => {
                console.log(error.response)
                console.log(error.response)
                mensagemErro(error.response.data.msg)
                this.props.history.push(`/consulta-usuarios`)
            })
    }

    // editar = (id) => {
    //     this.props.history.push(`/cadastro-usuarios/${id}`)
    //     console.log('editanto usuario' + id)
        
    // }

    abrir = (id) => {
        this.props.history.push(`/users/${id}`)
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
        this.props.history.push('/consulta-usuarios')
    }

    render() {

        const diasDaSemana = this.service.buscarDiasDaSemana()

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
                                <FormGroup label='Nome: *' htmlFor='inputNome'>
                                    <input type="text"
                                        id="inputNome"
                                        name='nome'
                                        className="form-control"
                                        placeholder="Digite o Nome"
                                        onChange={e => this.setState({ name: e.target.value })}/>
                                </FormGroup>

                                 <FormGroup label='Email: *' htmlFor='inputEmail'>
                                    <input type="email"
                                        id="inputEmail"
                                        name='email'
                                        className="form-control"
                                        placeholder="Digite o E-mail"
                                        onChange={e => this.setState({ email: e.target.value })}/>
                                </FormGroup>

                                <FormGroup label='Senha: *' htmlFor='inputSenha'>
                                    <input type="password"
                                        id="inputSenha"
                                        name='senha'
                                        className="form-control"
                                        placeholder="Senha"
                                        onChange={e => this.setState({ password: e.target.value })}/>
                                </FormGroup>

                                <FormGroup label='Repita a Senha: *' htmlFor='inputRepitaSenha'>
                                    <input type="password"
                                        id="inputRepitaSenha"
                                        name='senha'
                                        className="form-control"
                                        placeholder="Senha"
                                        onChange={e => this.setState({ senhaRepeticao: e.target.value })}/>
                                </FormGroup>

                                <FormGroup label='Curso: *' htmlFor='inputCurso'>
                                    <input type="text"
                                        id="inputCurso"
                                        name='curso'
                                        className="form-control"
                                        placeholder="O que você estuda?"
                                        onChange={e => this.setState({ curso: e.target.value })}/>
                                </FormGroup>
                      
                                <FormGroup label='Dia de Cozinhar: *' htmlFor='inputCozinha'>
                                    <SelectMenu
                                        lista={diasDaSemana}
                                        className="form-control"
                                        id="inputCozinha"
                                        name='cozinha'
                                        onChange={e => this.setState({ diaDeCozinhar: e.target.value })}/>
                                </FormGroup>
    
                                <FormGroup label='Dia da Faxina: *' htmlFor='inputFaxina'>
                                    <SelectMenu lista={diasDaSemana}
                                        className="form-control"
                                        id="inputFaxina"
                                        name='faxina'
                                        onChange={e => this.setState({ diaDeLimpar: e.target.value })} />
                                </FormGroup>

                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <TabelaUsuario
                                    usuarios={this.state.usuarios}
                                    deletarAction={this.abrirConfirmacao}
                                    editarAction={this.abrir}/>
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
                {/* <button
                    onClick={this.irParaCadastro}
                    ype="button"
                    className="btn btn-success">
                    Cadastrar Usuário
                </button> */}
            </div>
        )
    }
}

export default withRouter(ConsultaUsuario)