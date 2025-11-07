document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.querySelector('.login-form');
    const errorMessageDiv = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        errorMessageDiv.textContent = '';
        errorMessageDiv.style.display = 'none';

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // A rota de login é '/login' (baseado no seu authRoutes)
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), 
            });

            const result = await response.json();

            if (response.ok) {
                // Sucesso! Redireciona para o dashboard
                window.location.href = '/dashboard';
            } else {
                // Erro (401, 400)
                let errorMsg = result.message;
                if (result.errors) {
                  errorMsg = result.errors.join(', ');
                }
                exibirMensagem(errorMsg);
            }

        } catch (error) {
            console.error('Erro na requisição de login:', error);
            exibirMensagem('Não foi possível conectar ao servidor.');
        }
    });

    function exibirMensagem(mensagem) {
        errorMessageDiv.textContent = mensagem;
        errorMessageDiv.style.display = 'block';
    }
});