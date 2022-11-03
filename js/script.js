class User {
    constructor(name, email, tel, idade, password, language, photo) {
        this.name = name;
        this.email = email;
        this.tel = tel;
        this.idade = idade;
        this.password = password;
        this.language = language;
        this.photo = photo;
    }

    checkValues() {
        for(let i in this) {
            if(this[i] === undefined || this[i] === '' || this[i] === null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {
    constructor() {
        let idUser = localStorage.getItem('User');
        if(idUser === null) {
            localStorage.setItem('User', 0);
        }
    }

    getNextId() {
        let nextId = localStorage.getItem('User');
        return parseInt(nextId) + 1;
    }

    saveValues(u) {
        let newUser = this.getNextId();

        localStorage.setItem(newUser, JSON.stringify(u));
        localStorage.setItem('User', newUser);
    }

    getPhoto() {
        
    }

    editValues() {
        this.btnEdit = document.querySelectorAll('.btn-edit');
        let informations = JSON.parse(localStorage.getItem('User'));
        let info = JSON.parse(localStorage.getItem(informations));    

        this.btnEdit.forEach(b => {
            b.addEventListener('click', () => {
                let newValue = prompt('');
                let value = b.parentNode.querySelector('span');

                if(newValue === '' || newValue === undefined || newValue === null) {
                    return alert('Insira um valor válido');
                }
                value.firstElementChild.innerHTML = newValue;                
            });
        });
    }
}

let bd = new Bd();

function getValues() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let tel = document.getElementById('tel');
    let idade = document.getElementById('old');
    let password = document.getElementById('password');
    let language = document.getElementById('language');

    // falta resolve bug para inserir foto de perfil
    let photo = document.getElementById('photo');

    let user = new User(
        name.value,
        email.value,
        tel.value,
        idade.value,
        password.value,
        language.value,
        photo.value
    );

    if(user.checkValues()) {
        bd.saveValues(user);

        name.value = '';
        email.value = '';
        tel.value = '';
        idade.value = '';
        password.value = '';
        language.value = '';
        photo.value = '';

        alert('Cadastrado com sucesso.');

        window.location.href = 'meu_perfil.html';

    } else {
        alert('Algum campo falta ser preenchido!');
    }
}

function showMyProfile() {
    let informations = JSON.parse(localStorage.getItem('User'));
    let info = JSON.parse(localStorage.getItem(informations));

    let list = document.querySelector('#myProfile');

    switch(info.language) {
        case '1':
            info.language = 'Inglês';
            break;
        case '2':
            info.language = 'Francês';
            break;
        case '3':
            info.language = 'Japônes';
            break;
        case '4':
            info.language = 'Espanhol';
            break;
    }

    document.querySelector('.title img').src = info.photo;
    document.querySelector('#nameTitle').innerHTML = info.name;
    list.innerHTML = `
        <li class="list-group-item p-4">
            <span>Nome: <span id="1">${info.name}</span></span>
            <button class="btn btn-sm btn-warning btn-edit">Editar</button>
        </li>
        <li class="list-group-item p-4">
            <span>E-mail: <span id="2">${info.email}</span></span>
            <button class="btn btn-sm btn-warning btn-edit">Editar</button>
        </li>
        
        <li class="list-group-item p-4">
            <span>Língua: <span id="3">${info.language}</span></span>
        </li>
        <li class="list-group-item p-4">
            <span>Idade: <span id="4">${info.idade}</span></span>
            <button class="btn btn-sm btn-warning btn-edit">Editar</button>
        </li>
        <li class="list-group-item p-4">
            <span>Senha: </span><input type="password" class="form-control" style="border: none; background: white;" value="${info.password}" disabled>
            <button class="btn btn-sm btn-warning btn-edit">Editar</button>
        </li>
        <li class="list-group-item p-4">
            <span>Telefone: <span>${info.tel}</span></span>
            <button class="btn btn-sm btn-warning btn-edit">Editar</button>
        </li>
    `;

    bd.editValues();
}

function login() {
    let informations = JSON.parse(localStorage.getItem('User'));
    let info = JSON.parse(localStorage.getItem(informations));

    let email = document.querySelector('.acesso-alunos #email');
    let password = document.querySelector('.acesso-alunos #password');

    console.log('Já cadastrado(a) ' + info.email, info.password);
    console.log(email.value, password.value);

    if(info.email === email.value && info.password === password.value) {
        window.location.href = 'meu_perfil.html';
    } else {
        alert('Algo está errado! Verifique os campos e tente novamente.');
        password.value = '';
    }
}


function courses() {
    let infoCourses = [
        ['Inglês com Música', 'Prof. Cabeludo', 'R$ 350,90'],
        ['Francês para iniciantes', 'Prof. Zeloso', 'R$ 850,00'],
        ['Japônes Fluente', 'Prof. Natakata', 'R$ 1200,90'],
        ['Espanhol com Prof nativo', 'Prof. Cabroul', 'R$ 220,90'],
        ['Inglês com Música', 'Prof. Cabeludo', 'R$ 350,90'],
        ['Francês para iniciantes', 'Prof. Zeloso', 'R$ 850,00'],
        ['Japônes Fluente', 'Prof. Natakata', 'R$ 1200,90'],
        ['Espanhol com Prof nativo', 'Prof. Cabroul', 'R$ 220,90'],
        ['Inglês com Música', 'Prof. Cabeludo', 'R$ 350,90'],
        ['Francês para iniciantes', 'Prof. Zeloso', 'R$ 850,00'],
        ['Japônes Fluente', 'Prof. Natakata', 'R$ 1200,90'],
        ['Espanhol com Prof nativo', 'Prof. Cabroul', 'R$ 220,90']
    ];

    let nameCourses = document.querySelectorAll('.nameCourse');
    let teacherCourses = document.querySelectorAll('.teacherCourse');
    let priceCourses = document.querySelectorAll('.priceCourse');

    for(let i in infoCourses) {
        nameCourses[i].innerHTML = infoCourses[i][0];
        teacherCourses[i].innerHTML = infoCourses[i][1];
        priceCourses[i].innerHTML = infoCourses[i][2];
    }

}
