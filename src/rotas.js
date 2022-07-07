import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import Login from './views/login';
import Home from './views/home';
import consultaTarefas from './views/tarefas/consultaTarefas';
import consultaUsuario from './views/usuarios/consultaUsuarios';
import tarefa from './views/tarefas/tarefa';
import usuario from './views/usuarios/usuario';

export default function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/home' component={Home}/>
                <Route path='/consulta-usuarios' component={consultaUsuario} />
                <Route path='/users/:id' component={usuario} />
                <Route path='/consulta-tarefas' component={consultaTarefas} />
                <Route path='/tarefas/:id' component={tarefa} />
            </Switch>
        </HashRouter>
    )
}