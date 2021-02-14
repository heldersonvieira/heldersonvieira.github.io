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
        
        List.description.value = '';
        Listener.init();
    },

    innerHTMLList(description) {
        const html = `
            <h2>
                ${description}
                <img onclick="Utils.removeAll()" src="./assets/minus.svg" alt="Remover lista">
            </h2>
            <div class="task-description">
                <label class="sr-only" for="task-description">Descrição da tarefa</label>
                <input type="text" id="task-description" class="default-input" name="task-description" placeholder="Descrição da tarefa" autofocus>
                <span>
                    <img onclick="Tasks.add()" src="./assets/plus.svg" alt="Adicionar tarefa" class="add-task button">
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
                <tbody></tbody>
            </table>`

        return html;
    }
}

const Utils = {    
    validateFields(description) {
        let valid = description === '' ? false : true
        
        return valid;
    },

    remove(index) {
        Tasks.all.splice(index, 1);
        const table = document.querySelector('.tasks-table');
        const tbody = document.querySelector('tbody');
        tbody.addEventListener('click', function(event) {
            const firstTarget = event.target.parentNode;
            const mainTarget = firstTarget.parentNode;

            if (firstTarget.tagName === 'TD' && 
                mainTarget.tagName === 'TR') {
                mainTarget.remove(firstTarget);
            }

            if (tbody.innerHTML === '') {
                table.classList.add('invisible');
            }
        })

    },

    removeAll() {
        const section = document.querySelector('.tasks');
        section.remove(section);
    },

    clear() {
        const table = document.querySelector('.tasks-table');
        table.innerHTML = '';
    }
}

const Tasks = {
    all: [

    ],    
    
    get() {
        const description = document.querySelector('#task-description');

        return {
            description: description.value,
        };
    },

    add(description, index) {
        Tasks.all.push(Tasks.get());

        description = Tasks.get().description;
        index = Tasks.all.length - 1;

        const table = document.querySelector('.tasks-table');
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = Tasks.innerHTMLTask(description, index);
                
        table.classList.remove('invisible');
        tbody.appendChild(tr);
        document.querySelector('#task-description').value = '';
    },
    
    innerHTMLTask(description, index) {
        const html = `
        <td>${description}</td>
        <td><input type="checkbox"></td>
        <td>
            <img onclick="Utils.remove(${index})" src="./assets/minus.svg" alt="Remover tarefa">
        </td>
       `
        return html;
    }
}

const Listener = {
    init() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', function(event) {
                if (event.keyCode === 13) {
                    if (event.target.id === 'list-description') {
                        List.add();
                    }
                    
                    if (event.target.id === 'task-description') {
                        Tasks.add();
                    }
                }
            })
        })
    }
}

Listener.init()
