import React from 'react';
import Card from '../../components/card';
import { withRouter } from 'react-router-dom'
import TarefaService from '../../app/service/tarefaservice';
import UsuarioService from '../../app/service/usuarioservice';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import SelectMenu from '../../components/selectMenu';
import FormGroup from '../../components/formgroup'
import moment from 'moment';
import { mensagemSucesso, mensagemErro } from '../../components/toastr'



class Usuario extends React.Component { 

    state = {
        name: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        curso: '',
        diaDeCozinhar: '',
        diaDeLimpar: '',
        emails: [],
        usuario: ''
    }

    constructor(){
        super()
        this.tarefaService = new TarefaService()
        this.service = new UsuarioService()
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.service.buscarPorId(params.id)
                .then(response => {
                    let usuario = response.data
                    let name = usuario.name
                    let email = usuario.email
                    let password = usuario.password
                    let curso = usuario.curso
                    let diaDeCozinhar = usuario.diaDeCozinhar
                    let diaDeLimpar = usuario.diaDeLimpar
                    this.setState({
                        usuario: usuario,
                        name: name,
                        email: email,
                        password: password,
                        curso: curso,
                        diaDeCozinhar: diaDeCozinhar,
                        diaDeLimpar: diaDeLimpar
                    })
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }
    }

    atualizar = () => {
        const usuario = {
            id: this.state.usuario.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            curso: this.state.curso,
            diaDeCozinhar: this.state.diaDeCozinhar,
            diaDeLimpar: this.state.diaDeLimpar
        }
        this.service.atualizar(usuario)
            .then(response => {
                console.log('meu post: '+usuario)
                console.log(response)
                mensagemSucesso("Usuario atualizado com sucesso")
            }).catch(error => {
                console.log(usuario)
                console.log(error)
                mensagemErro("Não foi possível atualizar o usuario")
        })
    }

    voltar = () => {
        // axios.post('http://localhost:8084')
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
    
        return (
            <div className='container'>
                <Card title='Usuario'>
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
                                        onChange={e => this.setState({ diaDeCozinhar: e.target.value })}/>
                                </FormGroup>
                                
                                <FormGroup label='Dia da Faxina: *' htmlFor='inputFaxina'>
                                    <SelectMenu lista={diasDaSemana}
                                        className="form-control"
                                        id="inputFaxina"
                                        name='faxina'
                                        onChange={e => this.setState({ diaDeLimpar: e.target.value })} />
                                </FormGroup>

                                <button onClick={this.voltar} type="button" className="btn btn-danger">Voltar</button>
                                <button onClick={this.atualizar} type="button" className="btn btn-success">Salvar</button>
                            </div>
                        </div>
                    </div>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Senha</th>
                                <th scope="col">Curso</th>
                                <th scope="col">Dia de Cozinhar</th>
                                <th scope="col">Dia de Limpar</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={ this.state.usuario.id }>
                                <td>{ this.state.usuario.name }</td>
                                <td>{ this.state.usuario.email }</td>
                                <td>{ this.state.usuario.password }</td>
                                <td>{ this.state.usuario.curso }</td>
                                <td>{ this.state.usuario.diaDeCozinhar }</td>
                                <td>{ this.state.usuario.diaDeLimpar }</td>
                                <td>
                                    
                                    <button type="button"
                                            className="btn btn-danger"
                                            onClick={e => this.deletarAction(this.state.usuario)}>
                                            Deletar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <div>
                        <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{ width: '50vw' }}
                            modal={true}
                            footer={confirmDialogFooter}
                            onHide={() => this.setState({showConfirmDialog: true})}>
                            <p>Deseja mesmo excluir a tarefa?</p>
                        </Dialog>
                    </div> */}
                </Card>
            </div>
            
        )
    }
}
export default withRouter(Usuario)



