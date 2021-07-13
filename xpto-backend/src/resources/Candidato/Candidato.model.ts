export default class Candidato {

    public nome: string
    public cpf: string
    public dataNascimento: Date

    constructor(nome: string, cpf: string, dataNascimento: string) {
        this.nome = nome
        this.cpf = cpf,
        this.dataNascimento = new Date(dataNascimento);
    }
}

//Usado para a tipagem dos dados que vem do req.body e depois usar no construtor da classe
export interface ICandidato {
    nome: string,
    cpf: string,
    dataNascimento: string;
}