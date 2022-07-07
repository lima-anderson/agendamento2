import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import Login from './views/login';
import CadastroUsuario from './views/usuarios/cadastroUsuario';
import Home from './views/home';
import consultaTarefas from './views/tarefas/consultaTarefas';
import cadastroTarefas from './views/tarefas/cadastroTarefas';
import consultaUsuario from './views/usuarios/consultaUsuario';

export default function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/home' component={Home}/>
                <Route path='/cadastro-usuarios' component={CadastroUsuario} />
                <Route path='/consulta-usuarios' component={consultaUsuario} />
                <Route path='/cadastro-tarefas/:id' component={cadastroTarefas} />
                <Route path='/consulta-tarefas' component={consultaTarefas} />
            </Switch>
        </HashRouter>
    )
}