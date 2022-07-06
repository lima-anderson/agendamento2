import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/formgroup';

import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioservice';

import { mensagemSucesso, mensagemErro } from '../components/toastr'
import SelectMenu from '../components/selectMenu'

import TabelaUsuario from './tabelaUsuario'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        curso: '',
        calendarioCozinha: '',
        calendarioLimpeza: '',
        emails: [],
        usuarios: []
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

    cancelar = () => {
        this.props.history.push('/login')
    }


    render() {

        const emailsEstudantes = this.service.buscarEmailsEstudantes()
        
        const diasDaSemana = this.service.buscarDiasDaSemana()

        return(
            <div className='container'>
                <Card title='Cadastro de Usuário'>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label='Nome: *' htmlFor='inputNome'>
                                    <input type="text"
                                        id="inputNome"
                                        name='nome'
                                        className="form-control"
                                        placeholder="Digite o Nome"
                                        onChange={e => this.setState({ nome: e.target.value })}/>
                                </FormGroup>

                                {/* <FormGroup label='Email: *' htmlFor='inputEmail'>
                                    <input type="email"
                                        id="inputEmail"
                                        name='email'
                                        className="form-control"
                                        placeholder="Digite o E-mail"
                                        onChange={e => this.setState({ email: e.target.value })}/>
                                </FormGroup> */}

                                <FormGroup label='Estudante: *' htmlFor='inputEstudante'>
                                    <SelectMenu lista={emailsEstudantes}
                                        className="form-control"
                                        id="inputEstudante"
                                        name='estudante'
                                        onChange={e => this.setState({ email: e.target.value })} />
                                </FormGroup>

                                <FormGroup label='Senha: *' htmlFor='inputSenha'>
                                    <input type="password"
                                        id="inputSenha"
                                        name='senha'
                                        className="form-control"
                                        placeholder="Senha"
                                        onChange={e => this.setState({ senha: e.target.value })}/>
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
                                        onChange={e => this.setState({ calendarioCozinha: e.target.value })}/>
                                </FormGroup>

                                <FormGroup label='Dia da Faxina: *' htmlFor='inputFaxina'>
                                    <SelectMenu lista={diasDaSemana}
                                        className="form-control"
                                        id="inputFaxina"
                                        name='faxina'
                                        onChange={e => this.setState({ calendarioLimpeza: e.target.value })} />
                                </FormGroup>

                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger">Voltar</button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <TabelaUsuario usuarios={ this.state.usuarios }/>
                            </div>
                        </div>
                    </div>
                </Card>
                
            </div>
        )
    }
}

export default withRouter(CadastroUsuario)