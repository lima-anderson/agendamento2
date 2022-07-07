import ApiService from '../apiservice'

export default class TarefaService extends ApiService {
    // constructor() {
    //     super()
    // }

    salvar(tarefa){
        return this.post('tarefas', tarefa)
    }

    atualizar(tarefa){
        return this.put(`tarefas/${tarefa.id}`, tarefa)
    }


    buscarTarefas(){
        return this.get('/tarefas')
    }

    buscarPorId(id) {
        return this.get(`tarefas/${id}`)
    }

    deletar(id) {
        return this.delete(`tarefas/${id}`)
    }

    buscarTiposDeTarefas() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'FAXINA', value: 1 },
            { label: 'COMIDA', value: 2 }
        ]
    }
}