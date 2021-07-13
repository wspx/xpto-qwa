import Candidato from "./Candidato.model";

class CandidatoRepository {

    //Lista inicial de Teste
    // private listaCandidatos: Array<Candidato> = [{
    //     nome:"Guilherme Iago Benjamin Rocha",
    //     cpf:"840.673.340-36",
    //     dataNascimento: new Date("1974-10-13")
    // }];
    

    private listaCandidatos: Array<Candidato> = [];
    
    constructor(){}


    todosCandidatos(): Candidato[] {
        return this.listaCandidatos;
    }

    adicionarNovoCandidato(candidato: Candidato): void {
        this.listaCandidatos.push(candidato);
    }

    quantidadeCandidatos(): number {
        return this.listaCandidatos.length;
    }

    buscarCandidatoPorCPF(cpf: string): Candidato | null{

        //Se a lista estiver vazia, já retorna null
        if (this.listaCandidatos.length <= 0) {
            return null
        }

        //Buscando um candidato pelo CPF
        for(let i = 0; i < this.listaCandidatos.length; i++){
            if (this.listaCandidatos[i].cpf == cpf){
                return this.listaCandidatos[i]
            }
        }

        //Se nao encontrar nenhuma candidato com o CPF fornecido, retorna null
        return null;
    }

    existeCPFCadastrado(cpf: string): boolean {
        
        //Se a lista estiver vazia, já retorna null
        if (this.listaCandidatos.length <= 0) {
            return false
        }

        //Buscando se existe um candidato pelo CPF
        for(let i = 0; i < this.listaCandidatos.length; i++){
            if (this.listaCandidatos[i].cpf == cpf){
                return true;
            }
        }

        //Se nao encontrar nenhuma candidato com o CPF fornecido, retorna false
        return false;
    }

}

export default new CandidatoRepository();