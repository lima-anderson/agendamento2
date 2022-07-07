import React from 'react';

import { withRouter } from 'react-router-dom'

import Card from '../../components/card';
import TabelaTarefa from './tabelaTarefa';
import TarefaService from '../../app/service/tarefaservice';

import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaTarefa extends React.Component {

    state = {
        // tipo: '',
        // usuario:'',
        // usuarioEmail: '',
        // emailsUsuarios: [],
        tarefas: [],
        showConfirmDialog: false,
        deletarTarefa: {}
    }

    constructor(){
        super()
        this.service = new TarefaService()
        // this.usuarioService = new UsuarioService()
    }

    componentDidMount(){
        this.service.buscarTarefas()
            .then(response => {
                this.setState({ tarefas: response.data })
            }).catch(error => {
                console.error(error.response)
            })

        const params = this.props.match.params
        console.log('params: ' + params)
        
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-tarefas/${id}`)
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
                mensagemSucesso("Tarefa excluída com sucesso")
            }).catch(error => {
                mensagemErro("Não foi possível excluir a tarefa")
        })
    }

    voltar = () => {
        this.props.history.push('/home')
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
                <Card title='Tarefas'>
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