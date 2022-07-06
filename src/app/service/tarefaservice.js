import ApiService from '../apiservice'

export default class TarefaService extends ApiService {
    constructor() {
        super()
    }

    salvar(tarefa){
        return this.post('/tarefas', tarefa)
    }

    buscarTarefas(){
        return this.get('/tarefas')
    }

    buscarTiposDeTarefas() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'FAXINA', value: 1 },
            { label: 'LIMPEZA', value: '2' }
        ]
    }
}