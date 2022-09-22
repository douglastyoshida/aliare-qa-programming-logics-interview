# 💻 Avaliação Técnica - Analista de Qualidade
#### Objetivos: 
* Avaliar o conhecimento do candidato em projetos de software;
* Avaliar o conhecimento do candidato em lógica de programação;

#### ⚠️ Observações importantes:
* A avaliação deve ser entregue via GitHub. O link deve ser enviado por e-mail com o restante da avaliação para a(o) Analista de Gente e Gestão que está conduzindo o processo seletivo;
* Entregue a avaliação, mesmo que não tenha conseguido implementar todos os métodos corretamente. 
* Os testes automatizados que já estão implementados podem te ajudar a ter certeza de que os métodos implementados estão corretos. Para mais detalhes, acesse a sesão **Projeto da Avaliação Técnica -> Como garantir que as implementações estão corretas?**

#### Pré requisitos:
* Ter instalado a última versão do Node.js disponível;
* Ter instalado a versão da sua IDE de preferência;
    * Recomendação: VSCode [Download](https://code.visualstudio.com/download)
* Clonar este repositório em sua máquina
    * Recomendação: [Como clonar um repositório do GitHub?](https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository)
* Instalar as dependências do projeto com NPM
    > npm install
        
        
## Projeto da Avaliação Técnica
#### Detalhes

O projeto Validador de Senhas tem objetivo de criar um módulo de validação de senhas via API. Este módulo possui apenas um endpoint, que é */validarSenha*. Este endpoint recebe requisições do tipo POST com apenas um parâmetro no body, conforme exemplo abaixo:
    
    Endpoint: /validarSenha
    Tipo da requisição: POST
    Body da requisição: 
        {
            "senha": "senhaDeExemplo"
        }
        
Então, a API irá validar se a senha cumpre todos os requisitos e então devolverá o retorno. Este retorno pode variar entre:

###### **Senha satisfaz todos os requisitos**

    {
	    "message": "Sua senha atende todos os critérios! Parabéns =)"
    }
    
##### **Senha não satisfaz algum dos requisitos**

    {
	    "message": "Sua senha não atende todos os critérios. Verifique!",
	    "criteriosNaoAtendidos": [
		    "CR1: A senha deve possuir pelo menos 6 caracteres.",
		    "CR3: A senha deve possuir pelo menos um ponto de exclamação.",
		    "CR4: A senha deve possuir pelo menos um arroba.",
		    "CR5: A senha deve possuir pelo menos uma letra maiúscula.",
		    "CR7: A senha deve possuir pelo menos um número.",
		    "CR8: O primeiro caractere da senha deve ser um número."
	    ]
    }

#### 🔑 Requisitos de senha

O módulo validador de senhas prevê 9 requisitos que a senha deverá cumprir, sendo eles:

    Critério 1: A senha deve possuir pelo menos 6 caracteres.
    Critério 2: A senha deve possuir menos de 12 caracteres.
    Critério 3: A senha deve possuir pelo menos um ponto de exclamação.
    Critério 4: A senha deve possuir pelo menos um arroba.
    Critério 5: A senha deve possuir pelo menos uma letra maiúscula.
    Critério 6: A senha deve possuir pelo menos uma letra minúscula.
    Critério 7: A senha deve possuir pelo menos um número.
    Critério 8: O primeiro caractere da senha deve ser um número.
    Critério 9: O último caractere da senha deve ser uma letra.
    
#### ❔ Como desenvolver?

Para desenvolver a avaliação, você deverá implementar apenas os métodos que validam os critérios expostos acima. Todas as outras estruturas já estão prontas e versionadas neste repositório. Os métodos que deverão ser implementados estão no diretório */src/validadorSenhas*, arquivo *ValidadorSenhasService.ts*, e são eles:

    hasPeloMenosSeisCaracteres(senha: string): boolean
    hasMenosDeDozeCaracteres(senha: string): boolean
    hasExclamacao(senha: string): boolean
    hasArroba(senha: string): boolean
    hasPeloMenosUmaLetraMaiuscula(senha: string): boolean
    hasPeloMenosUmaLetraMinuscula(senha: string): boolean
    hasNumero(senha: string): boolean
    isPrimeiroCaractereNumero(senha: string): boolean
    isUltimoCaractereLetra(senha: string): boolean

##### ❔ O que deve ser implementado?

Cada um dos métodos tem uma documentação que explica o que deve ser feito. Exemplo:

    public hasPeloMenosSeisCaracteres(senha: string): boolean {
        /* 
            Você deve implementar este método, conforme o detalhamento abaixo. 
            Você deve apagar a linha que lança a exceção 'Não implementado. Você deve implementar este método!'

            Objetivo: deve validar se a senha possui pelo menos seis caracteres. 
            Retorno:
                1. Se a senha tiver pelo menos seis caracteres, deve retornar true;
                2. Se a senha tiver menos de seis caracteres, retornar false
        */

        throw new Error('Não implementado. Você deve implementar este método!')
    }

##### ✔️ Como garantir que as implementações estão corretas?

Este projeto possui 146 testes automatizados prontos e implementados. Para garantir que os métodos que você implementou estão corretos, execute os testes com o comando abaixo:

> npm run test