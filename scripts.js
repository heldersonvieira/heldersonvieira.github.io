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
        
        List.description = '';
        Listener.input();
    },

    innerHTMLList(description) {
        const html = `
        <section class="tasks">
            <h2>${description}</h2>
            <div class="task-description">
                <label class="sr-only" for="task-description">Descrição da tarefa</label>
                <input type="text" id="task-description" class="default-input" name="task-description" placeholder="Descrição da tarefa">
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
            </table> 
        <section class="tasks">`
        
        return html;
    }
}

const Utils = {    
    validateFields(description) {
        let valid = description === '' ? false : true
        
        return valid;
    },

    targets: document.querySelectorAll('tr'),

    remove(event) {
        const trs = document.querySelectorAll('tr');
        trs.forEach(tr => {
            tr.addEventListener('click', function(event) {
                const firstTarget = event.target.parentNode;
                const mainTarget = firstTarget.parentNode;
                console.log(mainTarget.tagName);
                console.log(firstTarget.tagName);
                if (
                    event.target.tagName == 'IMG' &&
                    firstTarget.tagName == 'TD' &&
                    mainTarget.tagName == 'TR'
                    ) {
                    mainTarget.parentNode.removeChild(mainTarget);
                    return;
                }
            })

        })
    }  
}

const Tasks = {
    all: [

    ],    
    
    tbody: document.querySelector('tbody'),
    description: document.getElementsByName('task-description'),

    get() {
        return {
            description: Tasks.description.value,
        };
    },
    
    add() {
        // Tasks.all.push(Tasks.get());
        // let description = Tasks.get().description;
        // let index = Tasks.all.length - 1;
        
        // const tr = document.createElement('tr');
        // tr.innerHTML = Tasks.innerHTMLTask(description, index);
        
        // Tasks.tbody.appendChild(tr);

        // console.log(Tasks.get().description, Tasks.all.length - 1);
        // console.log(Tasks.all);
        let nome = Tasks.description.entries
        console.log(nome);
    },

    innerHTMLTask(description, index) {
        const html = `
        <td>${description}</td>
        <td><input type="checkbox"></td>
        <td>
            <img onclick="Utils.remove(${index})" src="./assets/minus.svg" alt="">
        </td>
       `
        return html;
    }
}

const Listener = {
    input() {
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

                // if (event.target.id == 'list-description') {
                //     List.add();
                // }
                // if (event.target.id == 'task-description') {
                //     Tasks.add(Tasks.get().description);
                // }
            })
        })
    
    }
}

// const App = {
//     init() {
//         Tasks.all.forEach((task, index) => {
//             Tasks.add(task, index)
//         })
//     },

//     reload() {

//     }
// }

// App.init()
