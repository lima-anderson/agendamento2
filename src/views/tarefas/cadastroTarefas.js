import React from 'react';
import { withRouter } from 'react-router-dom'
import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import FormGroup from '../../components/formgroup'
import SelectMenu from '../../components/selectMenu'
import Card from '../../components/card';

import TarefaService from '../../app/service/tarefaservice';
import UsuarioService from '../../app/service/usuarioservice';

class CadastroTarefa extends React.Component {
    state = {
        id: '',
        tipo: '',
        status: '',
        usuarioEmail: '',
        tarefas: [],
        emailsUsuarios: [],
        // usuario: null
    }

    constructor(){
        super()
        this.service = new TarefaService()
        this.usuarioService = new UsuarioService()
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
                        tipo: response.data.tipo,
                        status: response.data.status,
                        usuarioEmail: response.data.usuario.usuarioEmail,
                    })
                })
                .catch(error => {
                    mensagemErro(error.response.data)
                })
        }
        
        this.usuarioService.buscarUsuarios()
        .then(response => {
            let listaEmails = []
            response.data.map(usuario => listaEmails.push(usuario.email))
            this.setState({ emailsUsuarios: listaEmails })
        }).catch(error => {
            console.error(error.response)
        });
    }

    cadastrar = () => {
        const tarefa = {
            tipo: this.state.tipo,
            status: true,
            usuarioEmail: this.state.usuarioEmail,
        }
        this.service.salvar(tarefa)
            .then(response => {
                mensagemSucesso("Tarefa criada com sucesso")
            }).catch(error => {
                console.log(error)
                console.log(error.response)
                mensagemErro("Não foi possível criar a tarefa")
            })
            this.props.history.push('/consulta-tarefas')
    }

    atualizar = () => {
        const tarefa = {
            id: this.state.id,
            tipo: this.state.tipo,
            status: true,
            usuarioEmail: this.state.usuarioEmail,
        }
        
        this.service.atualizar(tarefa, this.state.id)
            .then(response => {
                console.log('meu post: '+tarefa.id)
                // console.log(response)
                mensagemSucesso("Tarefa atualizada com sucesso")
            }).catch(error => {
                console.log(tarefa)
                console.log(error)
                mensagemErro("Não foi possível atualizar a tarefa")
        })
        this.props.history.push('/consulta-tarefas')
    }

    voltar = () => {
        this.props.history.push('/consulta-tarefas')
    }
    
    render() {
        const lista = this.service.buscarTiposDeTarefas()

        let listaDeEmail = [{ label: 'Selecione...', value: '' }]
        this.state.emailsUsuarios.map((valor, index) => {
            listaDeEmail.push({ label: valor, value: valor })
        })

        return (
            <div className='container'>
                <Card title='Criar Tarefa'>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="bs-component">

                                <FormGroup label='Atividade: *' htmlFor='inputTarefa'>
                                    <SelectMenu lista={lista}
                                        className="form-control"
                                        id="inputTarefa"
                                        name='tarefa'
                                        onChange={e => this.setState({ tipo: e.target.value })} />
                                </FormGroup>

                                <FormGroup label='Estudante: *' htmlFor='inputUsuario'>
                                    <SelectMenu lista={listaDeEmail}
                                        className="form-control"
                                        id="inputUsuario"
                                        name='estudante'
                                        onChange={e => this.setState({ usuarioEmail: e.target.value })} />
                                </FormGroup>

                                <button onClick={this.voltar} type="button" className="btn btn-danger">Voltar</button>
                                <button onClick={this.atualizar} type="button" className="btn btn-success">Salvar</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(CadastroTarefa)

