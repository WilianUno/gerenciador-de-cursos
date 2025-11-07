document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-inscricao');
    const messageContainer = document.getElementById('message-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        messageContainer.textContent = '';
        messageContainer.style.display = 'none';
        messageContainer.className = 'alert'; 

        const nome = document.getElementById('nome').value;
        const username = document.getElementById('usuario').value;
        const password = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (password !== confirmarSenha) {
            exibirMensagem('As senhas não conferem.', 'danger');
            return;
        }

        const dadosUsuario = {
            nome: nome,
            username: username,
            password: password,
            tipo: 'aluno' 
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosUsuario)
            });

            const result = await response.json();

            if (response.ok) { 
                exibirMensagem(result.message + ' Você será redirecionado para o login.', 'success');
                
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000); 

            } else { 
                exibirMensagem(result.message, 'danger');
            }

        } catch (error) {
            console.error('Erro ao registrar:', error);
            exibirMensagem('Erro de conexão. Tente novamente.', 'danger');
        }
    });

    function exibirMensagem(mensagem, tipo) { 
        messageContainer.textContent = mensagem;
        messageContainer.classList.add(`alert-${tipo}`);
        messageContainer.style.display = 'block';
    }
});