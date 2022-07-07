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



class Tarefa extends React.Component { 

    state = {
        tipo: '',
        usuario:'',
        usuarioEmail: '',
        emailsUsuarios: [],
        tarefa: '',
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
                    let tarefa = response.data
                    let tipo =  tarefa.tipo
                    let usuario = response.data.usuario
                    this.setState({tarefa: tarefa, usuario: usuario, })
                })
                .catch(error => {
                    console.log(error.response.data)
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

    atualizar = () => {
        const tarefa = {
            id: this.state.tarefa.id,
            tipo: this.state.tipo,
            status: true,
            usuarioEmail: this.state.usuario.email,
        }
        
        this.service.atualizar(tarefa)
            .then(response => {
                console.log('meu post: '+tarefa)
                // console.log(response)
                mensagemSucesso("Tarefa atualizada com sucesso")
            }).catch(error => {
                console.log(tarefa)
                console.log(error)
                mensagemErro("Não foi possível atualizar a tarefa - tá batendo aqui?")
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
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
            </div>
        );
    
        return (
            <div className='container'>
                <Card title='Tarefa'>
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

                                <button onClick={this.atualizar} type="button" className="btn btn-success">Salvar</button>
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Data</th>
                                            <th scope="col">Usuário</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={this.state.tarefa.id}>
                                            <td>{ this.state.tarefa.tipo }</td>
                                            <td>{moment(this.state.tarefa.data).format('MM/DD/YYYY HH:mm')}</td>
                                            <td>{this.state.usuario.name}</td>
                                            <td>
                                                <button type="button"
                                                        className="btn btn-primary" 
                                                        onClick={e => this.editarAction(this.state.tarefa.id)}>
                                                        Editar
                                                </button>
                                                <button type="button"
                                                        className="btn btn-danger"
                                                        onClick={e => this.deletarAction(this.state.tarefa)}>
                                                        Deletar
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            
        )
    }
}
export default withRouter(Tarefa)