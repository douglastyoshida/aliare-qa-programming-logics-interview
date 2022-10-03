import { EValidacoesSenhas } from "./EValidacoesSenhas"

export class ValidadorSenhasService {
    public validar(senha: string) {
        const criteriosNaoAtendidos: Array<EValidacoesSenhas> = []

        if (!this.hasPeloMenosSeisCaracteres(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.SENHA_DEVE_POSSUIR_PELO_MENOS_6_CARACTERES)

        if (!this.hasMenosDeDozeCaracteres(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.SENHA_DEVE_POSSUIR_PELO_MENOS_DE_12_CARACTERES)

        if (!this.hasExclamacao(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.SENHA_DEVE_POSSUIR_PELO_MENOS_UM_PONTO_EXCLAMACAO)

        if (!this.hasArroba(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.SENHA_DEVE_POSSUIR_PELO_MENOS_UM_ARROBA)

        if (!this.hasPeloMenosUmaLetraMaiuscula(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.SENHA_DEVE_POSSUIR_PELO_MENOS_UMA_LETRA_MAIUSCULA)

        if (!this.hasPeloMenosUmaLetraMinuscula(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.SENHA_DEVE_POSSUIR_PELO_MENOS_UMA_LETRA_MINUSCULA)

        if (!this.hasNumero(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.SENHA_DEVE_POSSUIR_PELO_MENOS_UM_NUMERO)

        if (!this.isPrimeiroCaractereNumero(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.PRIMEIRO_CARACTERE_DA_SENHA_DEVE_SER_NUMERO)

        if (!this.isUltimoCaractereLetra(senha))
            criteriosNaoAtendidos.push(EValidacoesSenhas.ULTIMO_CARACTERE_DA_SENHA_DEVE_SER_LETRA)

        return criteriosNaoAtendidos
    }

    public hasPeloMenosSeisCaracteres(senha: string): boolean {
        if (senha.length >= 6) {
            return true
        } else {
            return false
        }
    }

    public hasMenosDeDozeCaracteres(senha: string): boolean {
        if (senha.length < 12) {
            return true
        } else {
            return false
        }
    }

    public hasExclamacao(senha: string): boolean {
        if (senha.includes('!')) {
            return true
        } else {
            return false
        }
    }

    public hasArroba(senha: string): boolean {
        if (senha.includes('@')) {
            return true
        } else {
            return false
        }
    }

    public hasPeloMenosUmaLetraMaiuscula(senha: string): boolean {
        const regex = new RegExp('[A-Z]');
        return regex.test(senha)
    }

    public hasPeloMenosUmaLetraMinuscula(senha: string): boolean {
        const regex = new RegExp('[a-z]');
        return regex.test(senha)
    }

    public hasNumero(senha: string): boolean {
        const regex = new RegExp('[0-9]');
        return regex.test(senha)
    }

    public isPrimeiroCaractereNumero(senha: string): boolean {
        const primeiroCaractere = senha.substring(0, 0)

        if (!isNaN(Number(primeiroCaractere))) {
            return true
        } else {
            return false
        }
    }

    public isUltimoCaractereLetra(senha: string): boolean {
        const ultimoCaractere = senha.substring(senha.length - 1)

        if (isNaN(Number(ultimoCaractere))) {
            return true
        } else {
            return false
        }

    }
}