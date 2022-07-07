import ApiService from '../apiservice'


export default class UsuarioService extends ApiService {
    // constructor() {
    //     super()
    // }



    salvar(usuario){
        return this.post('/users', usuario)
    }

    buscarUsuarios(){
        return this.get('/users')
    }



    buscarDiasDaSemana() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Domingo', value: 1 },
            { label: 'Segunda-Feira', value: 2 },
            { label: 'Terça-Feira', value: 3 },
            { label: 'Quarta-Feira', value: 4 },
            { label: 'Quinta-Feira', value: 5 },
            { label: 'Sexta-Feira', value: 6 },
            { label: 'Sábado', value: 7 }
        ]
    }

    buscarEmailsEstudantes() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'msgli34@gmail.com', value: 1 },
            { label: 'anderson@gmail.com', value: 1 }
        ]
    }
    

    
}