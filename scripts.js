const List = {
    container: document.querySelector('.container'),
    description: document.querySelector('input#list-description'),

    get() {
        return {
            description: List.description.value
        }
    },

    add() {
        if (List.description.value.length <= 0) {
            alert('Digite a dscrição corretamente')
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

        if (document.querySelector('#task-description').value.length <= 0) {
            alert('Digite a dscrição corretamente')
            return;
        }

        description = Tasks.get().description;
        index = Tasks.all.length - 1;

        const table = document.querySelector('.tasks-table');
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = Tasks.innerHTMLTask(description, index);
                
        table.classList.remove('invisible');
        tbody.appendChild(tr);
        document.querySelector('#task-description').value = '';
        Listener.checking();
    },
    
    innerHTMLTask(description, index) {
        const html = `
        <td>${description}</td>
        <td><input class="input-check" type="checkbox"></td>
        <td>
            <img onclick="Utils.remove(${index})" src="./assets/minus.svg" alt="Remover tarefa">
        </td>
       `
        return html;
    }
}

const Listener = {
    init() {
        // escutando inputs
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

        
    }, 

    checking() {
        // escutando checkbo
        const table = document.querySelector('table');
        table.addEventListener('click', function(event) {
            const isBoxes = event.target.classList == 'input-check';
            if (isBoxes) {
                const boxes = document.querySelectorAll('.input-check');
                boxes.forEach(box => {
                    if (box.checking) {
                        console.log('oi');
                    }
                }) 
            }
        })
    }
}

Listener.init()
