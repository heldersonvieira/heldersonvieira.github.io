const List = {
    container: document.querySelector('.container'),
    description: document.querySelector('input#list-description'),

    get() {
        return {
            description: List.description.value
        }
    },

    add() {
        if (!Utils.validateFields(List.get().description)) {
            alert('Digite a descrição corretamente');
            return;
        }

        const section = document.createElement('section');
        section.classList.add('tasks');
        section.innerHTML = List.innerHTMLList(List.get().description); 

        List.container.appendChild(section);
    },

    innerHTMLList(description) {
        const html = `
        <section class="tasks">
            <h2>${description}</h2>
            <div class="task-description">
                <label class="sr-only" for="task-description">Descrição da tarefa</label>
                <input type="text" id="task-description" class="default-input" name="task-description" placeholder="Descrição da tarefa">
                <span>
                    <img onclick="Tasks.get()" src="./assets/plus.svg" alt="Adicionar tarefa" class="add-task button">
                </span>
            </div>
            <small>Digite o nome da tarefa e clique no botão ao lado ou pressione a tecla "ENTER"</small>
            <table class="tasks-table invisible">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
        <section class="tasks">`
            
        
        return html;
    }
}

const Utils = {    
    validateFields(description) {
        let valid = description === '' ? false : true
        
        return valid;
    }
    
}

const Tasks = {
    all: [
        {description: 'Mochila'},
        {description: 'Fones de ouvido'},
        {description: 'Sapato'},
        {description: 'Livros'}
    ],    
    
    get() {
        const description = document.querySelector('input#task-description');

        return Tasks.add({
            description: description.value
        })
        // return {
        //     description: description.value
        // };
    },
    
    add(task) {
        if (!Utils.validateFields(task.description)) {
           return alert('Digite a descrição corretamente');
        }

        Tasks.all.push(task)

        const table = document.querySelector('table');
        table.classList.remove('invisible');

        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = Tasks.innerHTMLTask(task.description);
        
        table.appendChild(tbody);
        tbody.appendChild(tr);

        return table;
    },

    innerHTMLTask(task) {
        const html = `
        <tr>
        <td>${task}</td>
        <td><input type="checkbox"></td>
        <td>
            <img src="./assets/minus.svg" alt="">
        </td>
        </tr>
       `
        return html;
    }
}

// const App = {
//     init() {
//         Tasks.all.forEach(task => {
//             Tasks.add(task);
//         })
//     }
// }

// App.init();