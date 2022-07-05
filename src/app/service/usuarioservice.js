import ApiService from '../apiservice'


export default class UsuarioService extends ApiService {
    constructor() {
        super()
    }

    buscarQuantidadeDeUsuarios(){
        return this.get('/users')
    }
}