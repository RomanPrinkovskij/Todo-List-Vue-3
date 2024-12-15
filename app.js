const { createApp } = Vue;

createApp({
    components: { VueDatePicker },
    data(){
        return{
            todos: [
                {
                  id: 1,
                  title: "Забрати дітей зі школи",
                  description: "Забрати дітей о 16: 00 зі школи та відвезти додому",
                  isCompleted: false,
                  dateEnd: "21 Sep 2024"
                },
                {
                  id: 2,
                  title: "Купити продукти",
                  description: "Скласти список і купити овочі, м’ясо та хліб",
                  isCompleted: false,
                  dateEnd: "12 Oct 2024"
                },
                {
                  id: 3,
                  title: "Заплатити за комунальні послуги",
                  description: "Оплатити рахунки за електрику та воду",
                  isCompleted: false,
                  dateEnd: "30 Jul 2024"
                },
                {
                  id: 4,
                  title: "Приготувати вечерю",
                  description: "Приготувати курячі котлети з салатом",
                  isCompleted: false,
                  dateEnd: "2 Feb 2024"
                },
                {
                  id: 5,
                  title: "Записатися до стоматолога",
                  description: "Зателефонувати і записатися на консультацію",
                  isCompleted: false,
                  dateEnd: "14 Nov 2024"
                },
                {
                  id: 6,
                  title: "Сходити в тренажерний зал",
                  description: "Тренування на ноги та кардіо",
                  isCompleted: true,
                  dateEnd: "20 Sep 2024"
                },
                {
                  id: 7,
                  title: "Прочитати 50 сторінок книги",
                  description: "Прочитати книгу 'Цифрова мінімізація' до 50 сторінки",
                  isCompleted: false,
                  dateEnd: "23 Sep 2024"
                },
                {
                  id: 8,
                  title: "Погуляти з собакою",
                  description: "Вивести собаку на прогулянку на 30 хвилин",
                  isCompleted: true,
                  dateEnd: "27 Sep 2024"
                },
                {
                  id: 9,
                  title: "Зробити презентацію для роботи",
                  description: "Підготувати презентацію для зустрічі з клієнтом",
                  isCompleted: false,
                  dateEnd: "16 Sep 2024"
                },
                {
                  id: 10,
                  title: "Завершити домашнє завдання з Vue.js",
                  description: "Допрацювати проект і надіслати код інструктору",
                  isCompleted: false,
                  dateEnd: "15 Dec 2024"
                },
              ],
              showScreen: 'start',
              selectedTab: 'all',

              newTodo:{
                id: '',
                title: "",
                description: "",
                isCompleted: false,
                dateEnd: ""
              },
              selectedTodo: null,
              showModification: false,

            
              tabs:[
                {
                    id: 'all',
                    name:'All tasks',
                    counter : 0,
                },
                {
                    id: 'closed',
                    name:'Closed',
                    counter : 0,
                },
                {
                    id: 'open',
                    name:'Open',
                    counter : 0,
                },
              ],
        };
    },
    methods:{
        aditTodo(){
            const index = this.todos.findIndex((el) => el.id === this.selectedTodo.id);
            this.todos.splice(index,1,{...this.selectedTodo});
            this.showScreen = 'todos';
        },
        deletTodo(){
            const index = this.todos.findIndex((el) => el.id === this.selectedTodo.id);
            this.todos.splice(index,1);
            this.showScreen = 'todos';
            this.showDeletModification();
        },

        showDeletModification(){
            this.showModification = true
        },
        hiddeDeletModification(){
            this.showModification = false
        },
        selectTodo(todo){
            this.showScreen = 'fixed';
            this.selectedTodo = todo;
        },
        addTodo(){
            this.todos.push(this.newTodo);
            this.showScreen = 'todos';
            this.newTodo = {
                id: '',
                title: "",
                description: "",
                isCompleted: false,
                dateEnd: ""
              };
        },

        cancelTodo(){
            this.newTodo = {
                id: '',
                title: "",
                description: "",
                isCompleted: false,
                dateEnd: ""
              };
              this.showScreen = 'todos';

        },
        selectTab(tab){
            this.selectedTab = tab.id
        },
        goToTodos(){
            this.showScreen = 'todos'
        },

        goStart(){
        this.showScreen = 'start'
        },

        goToAdd(){
            this.showScreen = 'add'
        },
        goToStart(){
            if (  this.showScreen === 'add' ||  this.showScreen === 'fixed') {
                 this.goToTodos()
            }
            else{
                 this.goStart()
            }
        },
    },

    computed:{
        screenName(){
            if (this.showScreen === 'add'){
                return 'Add Task'
            }
            if (this.showScreen === 'fixed'){
                return 'Edit Task'
            }
            if (this.showScreen === 'todos'){
                return 'Task'
            }
        },

        filteredTodos(){
            if(this.selectedTab === 'closed'){
                return this.todos.filter(todo => todo.isCompleted)
            }
            if(this.selectedTab === 'open'){
                return this.todos.filter(todo => !todo.isCompleted)
            }
            return this.todos;
        },

        computedTabs(){
            return this.tabs.map(tab =>{
                if(tab.id === 'open'){
                  tab.counter =  this.todos.filter(todo => !todo.isCompleted).length;
                } else if(tab.id === 'closed'){
                    tab.counter =  this.todos.filter(todo => todo.isCompleted).length;
                }else{
                    tab.counter = this.todos.length;
                }
                return tab;
            })
        },
    },
}).mount('#app');
