
const userRepository = require('../repositories/userRepository');


class AuthService {

    /**
     * Tenta autenticar um usuário.
     * @param {string} email - O email do usuário.
     * @param {string} senha - A senha do usuário.
     * @returns {object} - O objeto do usuário autenticado.
     * @throws {Error} - Lança um erro se a autenticação falhar.
     */
    login(email, senha) {
        console.log(`[Service] Tentativa de login para: ${email}`);
        
        const usuario = userRepository.findByEmail(email);

        if (!usuario) {
            console.log(`[Service] Falha: Usuário não encontrado.`);
            throw new Error('Autenticação falhou: Email ou senha inválidos.');
        }

        if (usuario.senha !== senha) {
            console.log(`[Service] Falha: Senha incorreta.`);
            throw new Error('Autenticação falhou: Email ou senha inválidos.');
        }

        console.log(`[Service] Sucesso: Usuário autenticado: ${usuario.nome}`);
        
        const { senha: _, ...usuarioLogado } = usuario;
        return usuarioLogado;
    }

}
module.exports = new AuthService();