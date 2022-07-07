import ApiService from '../apiservice'

export default class TarefaService extends ApiService {
    // constructor() {
    //     super()
    // }

    salvar(tarefa){
        return this.post('tarefas', tarefa)
    }

    buscarTarefas(){
        return this.get('/tarefas')
    }

    deletar(id) {
        return this.delete(`tarefas/${id}`)
    }

    buscarTiposDeTarefas() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'FAXINA', value: 1 },
            { label: 'COMIDA', value: '2' }
        ]
    }
}