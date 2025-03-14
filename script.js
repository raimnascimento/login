document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário


    document.getElementById('confirmationMessage').classList.remove('hidden');
});

