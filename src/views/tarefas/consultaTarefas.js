import React from 'react';

import { withRouter } from 'react-router-dom'

import Card from '../../components/card';
import TabelaTarefa from './tabelaTarefa';
import TarefaService from '../../app/service/tarefaservice';
import UsuarioService from '../../app/service/usuarioservice';

import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import SelectMenu from '../../components/selectMenu';

import FormGroup from '../../components/formgroup'





class ConsultaTarefa extends React.Component {

    state = {
        tipo: '',
        usuario:'',
        usuarioEmail: '',
        emailsUsuarios: [],
        tarefas: [],
        showConfirmDialog: false,
        deletarTarefa: {}
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

        this.service.buscarTarefas()
            .then(response => {
                this.setState({ tarefas: response.data })
            }).catch(error => {
                console.error(error.response)
            })

        console.log('params: ' + params)
        
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
            })
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
                mensagemErro("N??o foi poss??vel atualizar a tarefa - t?? batendo aqui?")
        })
        this.props.history.push('/consulta-tarefas')
    }

    abrir = (id) => {
        this.props.history.push(`/tarefas/${id}`)
        console.log('editanto tarefa' + id)
        
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
                mensagemSucesso("Tarefa exclu??da com sucesso")
            }).catch(error => {
                mensagemErro("N??o foi poss??vel excluir a tarefa")
        })
    }

    voltar = () => {
        this.props.history.push('/home')
    }

    render() {
        const lista = this.service.buscarTiposDeTarefas()

        let listaDeEmail = [{ label: 'Selecione...', value: '' }]
        this.state.emailsUsuarios.map((valor, index) => {
            listaDeEmail.push({ label: valor, value: valor })
        })

        const confirmDialogFooter = (
            <div>
                <Button label="N??o" icon="pi pi-times" onClick={this.cancelarDelecao} />
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
            </div>
        );

        return(
            <div className='container'>
                <Card title='Tarefas'>
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
                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
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
                                    editarAction={this.abrir} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog header="Confirma????o"
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