document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    document.getElementById('login-message').innerText = data.message;

    if (response.ok) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('email-container').style.display = 'block';
    }
});

document.getElementById('send-email-btn').addEventListener('click', async () => {
    const subject = document.getElementById('subject').value;
    const text = document.getElementById('text').value;

    const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, text }),
    });

    const data = await response.json();
    document.getElementById('email-message').innerText = data.message;

    if (!response.ok) {
        alert('Error: ' + data.message);
    } else {
        document.getElementById('subject').value = '';
        document.getElementById('text').value = '';
    }
});