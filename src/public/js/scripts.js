
// script active navbar
const activeMenu = () => {
    const menu = document.getElementById('navbarNav');
    if (menu) {
        const links = Array.from(menu.querySelectorAll('a'));
        links.map(link => {
            if (link.href === location.href) link.classList.add('active');
        });
    };
};
activeMenu();

// escript form submit

const saveLocalStorage = ( token ) => {
    localStorage.setItem('token', token);
};

const form = document.getElementById('formSignUp');

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    let data = new FormData(form);
    data = {
        name: data.get('name'),
        surname: data.get('surname'),
        email: data.get('email'),
        password: data.get('password'),
    };

    fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => saveLocalStorage(res.token))
        .catch(err => console.log(err));
    console.log(localStorage.getItem('token'))
});