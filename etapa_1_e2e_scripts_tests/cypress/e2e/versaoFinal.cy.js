/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------
# Elementos tela de Login #

CAMPO_EMAIL = div.card__login > form > div.input__child > input[type="email"]
CAMPO_SENHA = div.card__login > form > div.login__password > div.input__child > input[type="password"]
BOTAO_ACESSAR = div.card__login >  form > div.login__buttons > button[type="submit"]
BOTAO_REGISTRAR = '.ihdmxA
---------------------------------------------------------------------------------------------------------------------------------------------------------------
# Elementos tela de Cadastro #

CAMPO_EMAIL =  div.card_register > form > div.input_child > input[type="email"]
CAMPO_NOME = campo nome: div.card_register > form > div.input_child > input[type="name"]
CAMPO_SENHA = div.card_register > form > div.loginpassword > div.input_child > input[name="password"]
CAMPO_CONFIRMA_SENHA =  div.card_register > form > div.loginpassword > div.input_child > input[name="passwordConfirmation"]
TOGGLE_BUTTON_ADD_SALDO = div.card__register > form > div > label > label#toggleAddBalance
BOTAO_CADASTRAR = div.card__register > form > button[type="submit"]
---------------------------------------------------------------------------------------------------------------------------------------------------------------
# Elementos tela Menu Sistema #

BOTAO_TRANSFERENCIA = a#btn-TRANSFERÊNCIA
CAMPO_CONTA = form > div.account__data > div.input__child > input[type="accountNumber"]
CAMPO_DIGITO = form > div.account__data > div.input__child > input[type="digit"]
CAMPO_VALOR = form > div.input__child > input[type="transferValue"]
CAMPO_DESCRICAO = form > div.input__child > input[type="description"]
BOTAO_TRANSFERIR = form > button[type="submit"]
BOTAO_VOLTAR = a#btnBack

BOTAO_EXTRATO = a#btn-EXTRATO
LABEL_SALDO_DISPONIVEL = div > p#textBalanceAvailable
LABEL_TRANSFERENCIA_ENVIADA = p[type="withdrawal"]
*/

const acessarPaginaBugBank = (segmento) => {
    cy.visit('https://bugbank.netlify.app/')
}

const limpaCamposFormTransferencia = () => {
    cy.get('form > div.account__data > div.input__child > input[type="accountNumber"]').clear()
    cy.get('form > div.account__data > div.input__child > input[type="digit"]').clear()
    cy.get('form > div.input__child > input[type="transferValue"]').clear()
    cy.get('form > div.input__child > input[type="description"]').clear()
}

const cadastrarUsuario = (email, nome, senha, add_saldo) => {
    cy.get('.ihdmxA').click({ force: true });
    cy.get('div.card__register > form > div.input__child > input[type="email"]').click({ force: true }).type(email)
    cy.get('div.card__register > form > div.input__child > input[type="name"]').click({ force: true }).type(nome)
    cy.get('div.card__register > form > div.login__password > div.input__child > input[name="password"]').click({ force: true }).type(senha)
    cy.get('div.card__register > form > div.login__password > div.input__child > input[name="passwordConfirmation"]').click({ force: true }).type(senha)

    if (add_saldo == true) {
        cy.get('div.card__register > form > div > label >  label#toggleAddBalance').click({ force: true })
    }

    cy.get('div.card__register > form > button[type="submit"]').click({ force: true })

}

const fazerLogin = (email, senha) => {
    cy.get('div.card__login > form > div.input__child > input[type="email"]').click({ force: true }).type(email)
    cy.get('div.card__login > form > div.login__password > div.input__child > input[type="password"]').click().type(senha)
    cy.get('div.card__login >  form > div.login__buttons > button[type="submit"]').click({ force: true }) // BOTAO ACESSAR
}

const realizarTransferencia = (numeroConta, digito, valor, descricao) => {
    cy.get('form > div.account__data > div.input__child > input[type="accountNumber"]').type(numeroConta)
    cy.get('form > div.account__data > div.input__child > input[type="digit"]').type(digito)
    cy.get('form > div.input__child > input[type="transferValue"]').type(valor)
    cy.get('form > div.input__child > input[type="description"]').type(descricao)
    cy.get('form > button[type="submit"]').click()
}

describe('Etapa 1: Avaliação Técnica - Scripts de Testes E2E', () => {

    it('CD.1: Cadastro com e-mail inválido', () => {
        acessarPaginaBugBank()
        cy.get('.ihdmxA').click();
        cy.get('div.card__register > form > div.input__child > input[type="email"]').click({ force: true }).type('email_errado.com')
        cy.get('.kOeYBn > .input__warging').contains('Formato inválido');
    })

    it('CD.2: Cadastro com e-mail válido', () => {
        acessarPaginaBugBank()
        cadastrarUsuario('test@test.com', 'Fulano', '123', true)
    })

    it('LG.1: Login com e-mail inválido', () => {
        acessarPaginaBugBank()
        cy.get('div.card__login > form > div.input__child > input[type="email"]').click({ force: true }).type('email_errado.com')
        cy.get('.kOeYBn > .input__warging').should('be.visible').contains('Formato inválido')
    })

    it('LG.2: Login com e-mail inválido/senha não cadastrados', () => {
        acessarPaginaBugBank()
        cy.get('div.card__login > form > div.input__child > input[type="email"]').click({ force: true }).type('email@errado.com')
        cy.get('div.card__login > form > div.login__password > div.input__child > input[type="password"]').type('123456')
        cy.get('.otUnI').click()
        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible').contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
    })

    it('LG.3: Login com usuário/senha válidos', () => {
        const usuario = {
            email: 'teste@teste.com',
            nome: 'Fulano',
            senha: '123',
            add_saldo: true
        }

        acessarPaginaBugBank()
        cadastrarUsuario(usuario.email, usuario.nome, usuario.senha, usuario.add_saldo)

        cy.get('div > p#modalText').then($text => {

            const conta = $text.text().split(' ')[2]

            cy.get('#btnCloseModal').click({ force: true }) // Fecha modal

            fazerLogin(usuario.email, usuario.senha)

            cy.get('#textName').contains(usuario.nome)

            cy.get('#textAccountNumber > span').then((texto) => {
                const numeroDaConta1 = texto.text()
                expect(numeroDaConta1).to.eq(conta)
            })

        })
    })

    it('(EX) - Extrato', () => {
        const usuario = {
            email: 'teste@teste.com',
            nome: 'Fulano',
            senha: '123',
            add_saldo: true
        }

        acessarPaginaBugBank()
        cadastrarUsuario(usuario.email, usuario.nome, usuario.senha, usuario.add_saldo)
        cy.get('#btnCloseModal').click({ force: true }) // Fecha modal
        fazerLogin(usuario.email, usuario.senha)

        cy.get('a#btn-TRANSFERÊNCIA').click()

        realizarTransferencia('999', '9', '100', 'descricao conta invalida ou inexistente')
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Conta inválida ou inexistente')
        })
        cy.get('#btnCloseModal').click()
        limpaCamposFormTransferencia()

        realizarTransferencia('999', '9', '0', 'descricao valor 0')
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Valor da transferência não pode ser 0 ou negativo')
        })
        cy.get('#btnCloseModal').click()
        limpaCamposFormTransferencia()

        cy.get('form > div.input__child > input[type="transferValue"]').type('10')
        cy.get('form > button[type="submit"]').click()
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Transferencia realizada com sucesso')
        })
        cy.get('#btnCloseModal').click()
        limpaCamposFormTransferencia()

        cy.get('form > div.input__child > input[type="transferValue"]').type('10000')
        cy.get('form > button[type="submit"]').click()
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Você não tem saldo suficiente para essa transação')
        })
        cy.get('#btnCloseModal').click()
        cy.get('a#btnBack').click()
    })

    it('(TR) Transferências', () => {
        const usuario = {
            email: 'teste@teste.com',
            nome: 'Fulano',
            senha: '123',
            add_saldo: true
        }

        acessarPaginaBugBank()
        cadastrarUsuario(usuario.email, usuario.nome, usuario.senha, usuario.add_saldo)
        cy.get('#btnCloseModal').click({ force: true }) // Fecha modal
        fazerLogin(usuario.email, usuario.senha)

        cy.get('a#btn-TRANSFERÊNCIA').click()

        realizarTransferencia('999', '9', '100', 'descricao conta invalida ou inexistente')
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Conta inválida ou inexistente')
        })
        cy.get('#btnCloseModal').click()
        limpaCamposFormTransferencia()

        realizarTransferencia('999', '9', '0', 'descricao valor 0')
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Valor da transferência não pode ser 0 ou negativo')
        })
        cy.get('#btnCloseModal').click()
        limpaCamposFormTransferencia()

        cy.get('form > div.input__child > input[type="transferValue"]').type('10')
        cy.get('form > button[type="submit"]').click()
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Transferencia realizada com sucesso')
        })
        cy.get('#btnCloseModal').click()
        limpaCamposFormTransferencia()

        cy.get('form > div.input__child > input[type="transferValue"]').type('10000')
        cy.get('form > button[type="submit"]').click()
        cy.get('#modalText').then((texto) => {
            const validacaoInexistenteOuContaErrada = texto.text()
            expect(validacaoInexistenteOuContaErrada).to.eq('Você não tem saldo suficiente para essa transação')
        })
        cy.get('#btnCloseModal').click()
        cy.get('a#btnBack').click()

        cy.get('a#btn-EXTRATO').click()

        cy.get('div > p#textBalanceAvailable').contains('990,00')

        cy.get('p[type="withdrawal"]').contains('10,00')
    })

})