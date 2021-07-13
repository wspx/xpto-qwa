<template>
    <div class="container-fluid">
        

       <div class="row mt-3">

           <!-- Coluna do formulario -->
            <div class="col-lg-4 my-2">
            
               <!-- Card com o formulario de cadastro -->
               <div class="card shadow-sm">
                   
                   <form v-on:submit.prevent="adicionarCandidato()">
                        <fieldset>

                            <div class="card-header">
                                <h3> <strong>Cadastrar Novo Candidato</strong> </h3>
                            </div>

                            <div class="card-body">
                                <div class="alert alert-danger" v-if="form.erros.length > 0">
                                    <ul>
                                        <li v-for="(erro, index) in form.erros" v-bind:key="index">
                                            {{erro}}
                                        </li>
                                    </ul>
                                </div>
                                
                                
                                <label class="form-label" for="nome">Nome Completo: </label>
                                <br/>
                                <!-- <input class="form-control" type="text" id="nome" v-model="form.nome" required> -->
                                <input class="form-control" type="text" id="nome" v-model="form.nome">

                                <br />
                                
                                <label for="cpf">CPF: </label>
                                <br />
                                <!-- <input class="form-control" type="text" id="cpf" pattern="[\d]{3}.[\d]{3}.[\d]{3}-[\d]{2}" placeholder="000.000.000-00" v-model="form.cpf" required> -->
                                <input class="form-control" type="text" id="cpf" placeholder="000.000.000-00" v-model="form.cpf">

                                <br />

                                <label for="dataNascimento">Data Nascimento</label>
                                <br />
                                <!-- <input class="form-control" type="date" id="dataNascimento" v-model="form.dataNascimento" required />  -->
                                <input class="form-control" type="date" id="dataNascimento" v-model="form.dataNascimento" />

                                <br />
                                <br />

                            </div>

                           <div class="card-footer text-center">
                                <!-- <button type="submit" :disabled="this.listaCandidatos.length >= this.maximoCandidatos ? true : false">Adicionar Candidato</button> -->
                                <button class="btn btn-success mx-1 my-1" type="submit">Adicionar Candidato</button>
                                <button class="btn btn-secondary mx-1 my-1" type="reset" @click="resetarFormulario()">Limpar Formulário</button>
                           </div>

                        </fieldset>
                    </form>

               </div>

            </div>



            <!-- Coluna da Tabela -->
            <div class="col-lg-8 my-2">
                

                <div class="card shadow-sm">

                    <div class="card-body">

                         <!-- Tabela de Candidatos de Candidadatos -->
                        <fieldset>

                            <h2>Lista de Candidatos</h2>

                            <hr>

                            <div v-if="listaCandidatos.length == 0">
                                <span> Ainda não há nenhum Candidato Cadastrado! </span>
                            </div>
                            <div v-else>
                                <span>Total de Candidato Cadastrados: {{listaCandidatos.length}} </span>
                            </div>           

                            <br>
                            
                            <button v-if="listaCandidatos.length > 0" class="btn btn-primary" @click="enviarListaCandidatos()" :disabled="aguardandoAPI">
                                
                                <div v-if="aguardandoAPI" class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Carregando...</span>
                                </div>

                                Enviar Lista Candidatos
                            </button>

                            <br>
                            <br>

                            <div v-if="listaCandidatos.length > 0" class="table-responsive-lg" >
                                <table class="table table-hover table-striped">
                                
                                    <thead class="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome Candidato</th>
                                            <th>CPF</th>
                                            <th>Data Nascimento</th>
                                            <th>Idade</th>
                                            <th>É maior de idade?</th>
                                            <th>Deletar da Lista?</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(candidato, index) in listaCandidatos" v-bind:key="index">
                                            <td>{{index}}</td>
                                            <td>{{candidato.nome}}</td>
                                            <td>{{candidato.cpf}}</td>
                                            <td>{{candidato.dataNascimento}}</td>
                                            <td>{{ new Date().getFullYear() - new Date(candidato.dataNascimento).getFullYear() }}</td>

                                            <td v-if="new Date().getFullYear() - new Date(candidato.dataNascimento).getFullYear() >= 18">
                                                <span class="badge bg-success">SIM</span>
                                            </td>
                                            <td v-else>
                                                <span class="badge bg-danger">NÃO</span>
                                            </td>

                                            <td> <button class="btn btn-outline-danger" v-on:click="retirarCandidato(index)">Deletar</button> </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                        </fieldset>

                    </div>

                </div>
               

            </div>


        </div>


        <br>
        <!-- DEBUG -->
        <!-- <span> {{form.nome}} | {{form.cpf}} | {{form.dataNascimento}} </span> -->
    </div>
</template>


<script>

export default {
    name: "CandidatoForm",

    data() {
        return {
            maximoCandidatos: 10,
            aguardandoAPI: false,
            form: {
                nome: "",
                cpf: "",
                dataNascimento: null,
                erros: []
            },
            //listaCandidatos: [{"nome":"Guilherme Iago Benjamin Rocha","cpf":"840.673.340-36","dataNascimento":"1974-10-13"},{"nome":"William da Silva Pereira","cpf":"063.360.801-70","dataNascimento":"1999-07-04"},{"nome":"Eloá Carolina Josefa Peixoto","cpf":"497.019.241-34","dataNascimento":"1947-10-12"},{"nome":"Lara Beatriz Laura Mendes","cpf":"905.423.660-45","dataNascimento":"1943-10-11"},{"nome":"Aline Esther Rocha","cpf":"301.871.364-83","dataNascimento":"1986-09-27"},{"nome":"Testando 123","cpf":"959.185.738-10","dataNascimento":"1976-08-03"},{"nome":"Benício Guilherme Aragão","cpf":"065.483.817-85","dataNascimento":"1964-06-11"},{"nome":"Julio Benedito Emanuel Silveira","cpf":"066.722.752-07","dataNascimento":"1948-11-17"},{"nome":"Erick André Rodrigo Rocha","cpf":"542.121.221-11","dataNascimento":"1950-03-23"},{"nome":"Kaique Gabriel Pedro Duarte","cpf":"880.110.383-20","dataNascimento":"1972-08-27"}]
            listaCandidatos: []
        }
    },

    methods: {

        adicionarCandidato(){

            let candidato = {nome: this.form.nome, cpf: this.form.cpf, dataNascimento: this.form.dataNascimento}
            
            //DEBUG
            //console.log( JSON.parse(JSON.stringify(this.form)) )
            //alert(JSON.stringify(this.form))

            if (this.listaCandidatos.length >= this.maximoCandidatos){
                this.resetarFormulario();
                return alert("O numero máximo de candidatos na lista já foi atingido!")
            }

            this.resetarErrosFormulario();
            this.validarFormulario();

            if (this.form.erros.length > 0)
                return "s";
               
            
            if ( this.existeCandidatoCpf(candidato.cpf) ) {
                alert("Já existe um candidato com este CPF na lista!");
            }
            else{
                this.listaCandidatos.push(candidato);
                alert("Candidato Adicionado na lista com Sucesso!");
                this.resetarFormulario();
            }
        },

        retirarCandidato(indice) {
            
            //Recebe um boolean do alerta
            let confimarExclusao = confirm(`Deseja deletar o Candidato ${this.listaCandidatos[indice].nome}?`);

            if(confimarExclusao) {
                if(indice >= 0){
                    this.listaCandidatos.splice(indice, 1);
                    alert("Candidato Deletado da lista com Sucesso!");
                }
                else{
                    alert("Candidato não encontrado na lista!");
                }
            }

        },

        existeCandidatoCpf(cpf) {
           
            //Caso a lista esteja vazia, ja permite a insercao direto
            if( this.listaCandidatos.length == 0) return false;

            //Busca pelo CPF na lista de Candidatos
            for(let i = 0; i < this.listaCandidatos.length; i++) {
                
                if(this.listaCandidatos[i].cpf == cpf) {
                    return true;
                }
            }
            
            //Caso nao exista nenhum cpf igual na lista de candidato
            return false;
        },

        validarFormulario(){
            
            if (this.form.nome == "")
                this.form.erros.push("O campo NOME é obrigatório.");

            if(this.form.cpf == "")
                this.form.erros.push("O campo CPF é obrigatório.");

            if(this.form.dataNascimento == null || this.form.dataNascimento == undefined)
                this.form.erros.push("O campo DATA NASCIMENTO é obrigatório.")

            if( !(/^([\d]{3}.[\d]{3}.[\d]{3}-[\d]{2})$/gm).test(this.form.cpf) )
                this.form.erros.push("O CPF informado não corresponde ao padrão valido!")

        },

        resetarFormulario(){
            this.form.nome = "";
            this.form.cpf = "";
            //this.form.dataNascimento = new Date().toISOString().split("T")[0]
            this.form.dataNascimento = null;

            this.resetarErrosFormulario();
        },

        resetarErrosFormulario(){
            this.form.erros = [];
        },

        resetarListaCandidatos(){
            this.listaCandidatos = [];
        },

        //Enviar dados para a API
        async enviarListaCandidatos(){

            if( this.listaCandidatos.length === 0){
                return alert("Não há nenhum Candidato Cadastrado!")
            }

            //DEBUG
            //console.log(JSON.stringify(this.listaCandidatos));
            //return alert(JSON.stringify(this.listaCandidatos));

            //Ativa Spinner de Carregamento no Botão de Enviar lista Candidatos
            this.aguardandoAPI = true;

            //Configurando o dados do request
            const requestConfigs = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.listaCandidatos)
            };

            try {

                let response = await fetch("http://localhost:3000/v1/candidatos/", requestConfigs);
                let content = await response.json();

                if (response.status >= 400){
                    
                    //Desativa o Spinner de Carregamento
                    this.aguardandoAPI = false;

                    return alert("API: " + content.msg);
                }

                if (response.status >= 200){
                    
                    //Desativa o Spinner de Carregamento
                    this.aguardandoAPI = false;
                    
                    this.resetarListaCandidatos();
                    return alert("API: " + content.msg);
                }

                
            } catch (error) {
                //Desativa o Spinner de Carregamento
                this.aguardandoAPI = false;

                alert("Falha ao enviar os dados para o servidor!")
            }

        }
    },
    


}
</script>