import React from 'react';
import FormGroup from '../../components/formgroup'

import { withRouter } from 'react-router-dom'

import SelectMenu from '../../components/selectMenu'
import Card from '../../components/card';

import TabelaTarefa from './tabelaTarefa';

import TarefaService from '../../app/service/tarefaservice';
import UsuarioService from '../../app/service/usuarioservice';

class ConsultaTarefa extends React.Component {

    state = {
        tipo: '',
        usuario: '',
        tarefas: [],
        emailsUsuarios: []
    }

    constructor(){
        super()
        this.service = new TarefaService()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount(){
        this.service.buscarTarefas()
            .then(response => {
                this.setState({ tarefas: response.data })
            }).catch(error => {
                console.error(error.response)
            })
        
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
            usuario: this.state.usuario,
        }
        console.log(this.state)
        this.service.salvar(tarefa)
    }

    editar = (id) => {
        console.log('editanto tarefa'+ id)
    }

    deletar = (id) => {
        console.log('excluindo tarefa'+ id)
    }

    render() {

        const lista = this.service.buscarTiposDeTarefas()
        // const listaEmails = this.usuarioService.buscarEmailsEstudantes()
        // console.log("emails: " + this.state.emailsUsuarios)
        
        let listaDeEmail = [{ label: 'Selecione...', value: '' }]
            
        this.state.emailsUsuarios.map((valor, index) => {
            listaDeEmail.push({ label: valor, value: index })
        })

        return(
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

                                {/* <FormGroup label='Usuário: *' htmlFor='inputUsuario'>
                                    <input type="number"
                                        id="inputUsuario"
                                        name='usuario'
                                        className="form-control"
                                        placeholder="Digite o Id do usuário"
                                        onChange={e => this.setState({ usuario: e.target.value })}/>
                                </FormGroup> */}

                                <FormGroup label='Estudante: *' htmlFor='inputUsuario'>
                                    <SelectMenu lista={listaDeEmail}
                                        className="form-control"
                                        id="inputUsuario"
                                        name='estudante'
                                        onChange={e => this.setState({ email: e.target.value })} />
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
                                <TabelaTarefa
                                    tarefas={this.state.tarefas}
                                    deletarAction={this.deletar}
                                    editarAction={this.editar} />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(ConsultaTarefa)