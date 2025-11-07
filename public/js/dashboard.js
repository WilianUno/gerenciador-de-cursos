document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch('/current-user'); 

        if (response.ok) {
            const result = await response.json();
            console.log('Usuário autenticado:', result.user);
            
            preencherDashboard(result.user);
            
        } else {
            console.warn('Usuário não autenticado. Redirecionando para login.');
            
            window.location.href = '/login'; 
        }

    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        window.location.href = '/login'; 
    }
    
    const logoutButton = document.getElementById('logout-button');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await fetch('/logout', { method: 'POST' }); 
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            } finally {
                window.location.href = '/login';
            }
        });
    }
});
function preencherDashboard(user) {
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Boas-vindas, ${user.nome || user.username}!`;
    }
}