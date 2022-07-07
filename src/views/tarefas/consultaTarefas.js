import React from 'react';
import FormGroup from '../../components/formgroup'

import { withRouter } from 'react-router-dom'

import SelectMenu from '../../components/selectMenu'
import Card from '../../components/card';

import TabelaTarefa from './tabelaTarefa';

import TarefaService from '../../app/service/tarefaservice';
import UsuarioService from '../../app/service/usuarioservice';

import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaTarefa extends React.Component {

    state = {
        tipo: '',
        usuario:'',
        usuarioEmail: '',
        tarefas: [],
        emailsUsuarios: [],
        showConfirmDialog: false,
        deletarTarefa: {}
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
            usuarioEmail: this.state.usuarioEmail,
        }
        console.log(tarefa)
        this.service.salvar(tarefa)
            .then(response => {
                console.log(response)
                mensagemSucesso("Tarefa criada com sucesso")
            }).catch(error => {
                console.log(tarefa)
                console.log(error)
                mensagemErro("Não foi possível excluir a tarefa")
        })
    }

    // cadastrar = () => {
    //     const tarefa = {
    //         tipo: this.state.tipo,
    //         status: true,
    //         usuario: this.state.usuario
    //     }
    //     console.log(tarefa)
    //     this.service.salvar(tarefa)
    //         .then(response => {
    //             console.log(response)
    //             mensagemSucesso("Tarefa criada com sucesso")
    //         }).catch(error => {
    //             console.log(tarefa)
    //             console.log(error)
    //             mensagemErro("Não foi possível excluir a tarefa")
    //     })
    // }

    editar = (id) => {
        console.log('editanto tarefa'+ id)
    }

    abrirConfirmacao = (tarefa) => {
        this.setState({
            showConfirmDialog: true, deletarTarefa: tarefa
        })
    }

    cancelarDelecao = () => {
        this.setState({
            showConfirmDialog: false, deletarTarefa: {}
        })
    }

    deletar = () => {
        this.service
            .deletar(this.state.deletarTarefa.id)
            .then(response => {
                const tarefas = this.state.tarefas
                const index = tarefas.indexOf(this.state.deletarTarefa)
                tarefas.splice(index, 1)
                this.setState({ tarefas: tarefas, showConfirmDialog: false })
                mensagemSucesso("Tarefa excluída com sucesso")
            }).catch(error => {
                mensagemErro("Não foi possível excluir a tarefa")
        })
    }

    render() {
        const lista = this.service.buscarTiposDeTarefas()
        let listaDeEmail = [{ label: 'Selecione...', value: '' }]
            
        this.state.emailsUsuarios.map((valor, index) => {
            listaDeEmail.push({ label: valor, value: valor })
        })

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

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

                                <FormGroup label='Estudante: *' htmlFor='inputUsuario'>
                                    <SelectMenu lista={listaDeEmail}
                                        className="form-control"
                                        id="inputUsuario"
                                        name='estudante'
                                        onChange={e => this.setState({ usuarioEmail: e.target.value })} />
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
                                    deletarAction={this.abrirConfirmacao}
                                    editarAction={this.editar} />
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
                            <p>Deseja mesmo excluir a tarefa?</p>
                        </Dialog>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(ConsultaTarefa)