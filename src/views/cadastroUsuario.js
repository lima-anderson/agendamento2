import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/formgroup';

import { withRouter } from 'react-router-dom'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        curso: '',
        calendarioCozinha: '',
        calendarioLimpeza: ''
    }

    cadastrar = () => {
        console.log(this.state)
    }

    cancelar = () => {
        this.props.history.push('/login')
    }


    render(){
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
                                    <select  className="form-control" id="inputCozinha" name='cozinha' onChange={e => this.setState({ calendarioCozinha: e.target.value })}>
                                        <option value="Domingo">Domingo</option>
                                        <option value="Segunda">Segunda-Feira</option>
                                        <option value="Terca">Terça-Feira</option>
                                        <option value="Quarta">Quarta-Feira</option>
                                        <option value="Quinta">Quinta-Feira</option>
                                        <option value="Sexta">Sexta-Feira</option>
                                        <option value="Sábado">Sábado</option>
                                    </select>
                                </FormGroup>
                      
                                <FormGroup label='Dia da Faxina: *' htmlFor='inputFaxina'>
                                    <select  className="form-control" id="inputFaxina" name='faxina' onChange={e => this.setState({ calendarioLimpeza: e.target.value })}>
                                        <option value="Domingo">Domingo</option>
                                        <option value="Segunda">Segunda-Feira</option>
                                        <option value="Terca">Terça-Feira</option>
                                        <option value="Quarta">Quarta-Feira</option>
                                        <option value="Quinta">Quinta-Feira</option>
                                        <option value="Sexta">Sexta-Feira</option>
                                        <option value="Sábado">Sábado</option>
                                    </select>
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