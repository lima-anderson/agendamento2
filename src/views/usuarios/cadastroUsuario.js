import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/formgroup';


import { withRouter } from 'react-router-dom'

import UsuarioService from '../../app/service/usuarioservice';

import { mensagemSucesso, mensagemErro } from '../../components/toastr'
import SelectMenu from '../../components/selectMenu'

// import TabelaUsuario from './tabelaUsuario'

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

    componentDidMount() {
        
        const params = this.props.match.params
        if (params.id) {
            this.service.buscarPorId(params.id)
                .then(response => {
                    console.log(response.data)
                    console.log(response.data.id)
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        password: response.data.password,
                        curso: response.data.curso,
                        diaDeCozinhar: response.data.diaDeCozinhar,
                        diaDeLimpar: response.data.diaDeLimpar
                    })
                })
                .catch(error => {
                    mensagemErro(error.response.data)
                })
        }


        
    }

    cadastrar = () => {
        const usuario = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.senha,
            
        }
        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data.msg)
            })
    }

    atualizar = () => {
        const usuario = {    
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            curso: this.state.curso,
            diaDeCozinhar: this.state.diaDeCozinhar,
            diaDeLimpar: this.state.diaDeLimpar
        }
        
        this.service.atualizar(usuario, this.state.id)
            .then(response => {
                console.log('meu post: '+usuario.id)
                // console.log(response)
                mensagemSucesso("Tarefa atualizada com sucesso")
            }).catch(error => {
                console.log(error)
                // mensagemErro("Não foi possível atualizar a usuario")
        })
        this.props.history.push('/consulta-usuarios')
    }

    cancelar = () => {
        this.props.history.push('/consulta-usuarios')
    }


    render() {

        // const emailsEstudantes = this.service.buscarEmailsEstudantes()
        
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
                </Card>
                
            </div>
        )
    }
}

export default withRouter(CadastroUsuario)