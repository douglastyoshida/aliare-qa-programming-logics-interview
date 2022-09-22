import { app } from "./app";

const productionPort = 3000

const server = app.listen(productionPort, `O módulo Validador de Senhas está sendo executado na porta ${productionPort}`)

export { server }