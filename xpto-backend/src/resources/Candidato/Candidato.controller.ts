import { Request, Response } from "express";
import Candidato, { ICandidato } from "./Candidato.model";
import CandidatoRepository from "./Candidato.repository";



class CandidatoController {

    //GET v1/candidatos/
    listarCandidatos(req: Request, res: Response): Response {
        return res.send({
            totalCandidatos: CandidatoRepository.quantidadeCandidatos(), 
            candidatos: CandidatoRepository.todosCandidatos()
        } );
    }

    //GET v1/candidatos/cpf
    buscarCandidatoCPF(req: Request, res: Response): Response {

        let { cpf } = req.body;

        if(cpf == "" || cpf == undefined)
            return res.status(400).send({msg: "O campo CPF está nulo ou vazio!"});

        //Valida o formado do CPF
        if( !(/^([\d]{3}.[\d]{3}.[\d]{3}-[\d]{2})$/gm).test(cpf)) {
            return res.status(400).send({msg: "O CPF informado é inválido!"});
        }


        //Buscar candidato pelo CPF passado
        let candidato = CandidatoRepository.buscarCandidatoPorCPF(cpf);

        if(candidato == null){
            return res.status(404).send({msg: "Candidato não encontrado!"});
        }

        //Caso tenha passado em todas as validacoes
        return res.status(200).send(candidato);

    }


    //POST v1/candidatos
    //Este endpoint ira receber uma lista de candidatos do front-end e registrar no banco de dados
    receberListaCandidatos(req: Request, res: Response): Response {

        //Objeto recebido do payload
        let requestCandidato: Array<ICandidato> = req.body;



        //Verifica se o corpo do JSON eh um array
        if ( !Array.isArray(req.body) ) {
            return res.status(400).send({msg: "O formato enviado nao corresponde a uma lista"})
        }

        //Verificar se o array a maior que zero
        if (requestCandidato.length <= 0) {
            return res.status(400).send({msg: "A lista de candidatos não pode ser vazia!"});
        }

        //Verifica se ainda ha espaco para adionar novos candidatos
        if (CandidatoRepository.quantidadeCandidatos() >= 10 || requestCandidato.length + CandidatoRepository.quantidadeCandidatos() > 10) {
            return res.status(403).send({msg: "A quantidade máxima de candidatos já foi atingida!"})
        }


        //Validacao dos objetos da lista
        //Ira percorrer todos os itens da lista enviada, e verifacar se todos os objetos sao valido!
        for( let i = 0; i < requestCandidato.length; i++){

            //Verifica se tem as propriedades
            if ( !(requestCandidato[i].hasOwnProperty("nome") && requestCandidato[i].hasOwnProperty("cpf") &&  requestCandidato[i].hasOwnProperty("dataNascimento")) ){
                return res.status(400).send({msg: `O candidato ${i+1} da lista não está com a estrutura válida!`});
            }

            //Verifica se o nome nao esta nulo
            if( requestCandidato[i].nome == "" || requestCandidato[i].nome == undefined){
                return res.status(400).send({msg: `O candidato ${i+1} está com o nome vazio!`});
            }

            //Verifica se o CPF nao e nulo
            if( requestCandidato[i].cpf == "" || requestCandidato[i].cpf == undefined){
                return res.status(400).send({msg: `O candidato ${requestCandidato[i].nome} está com o CPF vazio!`});
            }

            //Verifica se o CPF esta em um formato valido 000.000.000-00
            if( !(/^([\d]{3}.[\d]{3}.[\d]{3}-[\d]{2})$/gm).test(requestCandidato[i].cpf) ){
                return res.status(400).send({msg: `O CPF do candidato ${requestCandidato[i].nome} não é válido! (${requestCandidato[i].cpf})`});
            }

            //Verifica se a DataNascimento nao e nulo
            if( requestCandidato[i].dataNascimento == "" || requestCandidato[i].cpf == undefined){
                return res.status(400).send({msg: `O candidato ${requestCandidato[i].nome} está sem Data Nascimento!`});
            }

            //Verifica se a DataNascimento esta em um formato valido 0000/00/00
            if(  !(/^[\d]{4}[-][\d]{2}[-][\d]{2}$/gm).test(requestCandidato[i].dataNascimento) ){
                return res.status(400).send({msg: `O candidato ${requestCandidato[i].nome} está com a Data de Nascimento fora do padrão!`});
            }

        }


        //Ira verificar se existe algun CPF duplicado no banco de dados
        for( let i = 0; i < requestCandidato.length; i++) {

            if(CandidatoRepository.existeCPFCadastrado( requestCandidato[i].cpf )) {
                return res.status(400).send({msg: `O CPF do candidato ${requestCandidato[i].nome} já está cadastrado no banco de dados!`});
            }
        }


        //Ira pegar todos os itens da lista e adicionar no repositorio de dados
        for( let i = 0; i < requestCandidato.length; i++){

            let novoCanditato = new Candidato(requestCandidato[i].nome, requestCandidato[i].cpf, requestCandidato[i].dataNascimento);
            CandidatoRepository.adicionarNovoCandidato(novoCanditato);

        }


        //Se chegou aqui, eh pq passou por todas as validacoes!
        return res.status(201).send({
            msg: "Candidatos cadastrados com sucesso!", 
            totalCandidatosInseridos: requestCandidato.length, 
            totalCandidatosRegistrados: CandidatoRepository.quantidadeCandidatos(),
            candidatosInseridos: requestCandidato
        });


        
    }
}

export default new CandidatoController();