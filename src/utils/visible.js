const visible = document.querySelector('.visible');
visible.addEventListener('click', () => {
    const password = visible.parentElement.querySelector('input');
    if(password.type === 'password') password.setAttribute('type', 'text');
    else password.setAttribute('type', 'password');
});