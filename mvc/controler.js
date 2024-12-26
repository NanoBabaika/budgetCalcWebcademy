import * as view from './view.js'


console.log('Lets code! {^_^}');
console.log('Logs:');


const budget = [];
const form = document.querySelector('#form');
const type = document.querySelector('#type');
const title = document.querySelector('#title');
const value = document.querySelector('#value');
const incomeList = document.querySelector('#incomes-list');
const expList = document.querySelector('#expenses-list');
// Элементы на странице
const budgetDisplay = document.querySelector('#budget');
const incomeDisplay = document.querySelector('#total-income');
const expanseDisplay = document.querySelector('#total-expense');
const expansePercent = document.querySelector('#expense-percents-wrapper');

// отображение даты 
const displayMonthHTML = document.querySelector('#month');
const displayYearHTML = document.querySelector('#year');


 
function insertTestData() {
    const testData = [
        { type: 'inc', title: 'Фриланс',value:500,},
        { type: 'inc', title: 'Работа',value:1500,},
        { type: 'inc', title: 'Фриланс',value:40000,},
        { type: 'inc', title: 'Зарплата',value:25000,},
        { type: 'inc', title: 'Фриланс',value:2500,},

        { type: 'exp', title: 'Ресторан',value:3500,},
        { type: 'exp', title: 'Такси',value:700,},
        { type: 'exp', title: 'Кафе',value:2500,},
        { type: 'exp', title: 'Развлечения',value:2500,},
    ];

    function getRandomIndex(max) {
       return  Math.floor(Math.random() * max);
    }

   const randomIndexTestData = getRandomIndex(testData.length);

    const randomData = testData[randomIndexTestData];

   type.value = randomData.type;
   title.value =  randomData.title;
   value.value =  randomData.value;
}

function clearForm() {
    form.reset();
}
 
function calcBudget () {
 
    // все доходы
    const totalIncome =  budget.reduce(function (total, element) {
        if(element.type === 'inc') {
            return total + element.value;
        } else {
            return total;
        }
     }, 0);

     // все расходы
    const totalExpense =  budget.reduce(function (total, element) {
        if(element.type === 'exp') {
            return total + element.value;
        } else {
            return total;
        }
     }, 0);


     const totalBudget = totalIncome - totalExpense;

     let expendsPercents = 0;

     if(totalIncome > 0) {
         expendsPercents = Math.round((totalExpense * 100) / totalIncome);
     } 


     console.log('totalExpense', totalExpense);
     console.log('totalIncome', totalIncome);
     console.log('totalBudget', totalBudget);
     console.log('expendsPercents', expendsPercents);

        // budgetDisplay
        // incomeDisplay
        // expanseDisplay
        // expansePercent

     budgetDisplay.innerHTML = view.priceFromatter.format(totalBudget);
     incomeDisplay.innerHTML = '+' + view.priceFromatter.format(totalIncome);
     expanseDisplay.innerHTML = '-' + view.priceFromatter.format(totalExpense);
     
     
     if(expendsPercents) {
        const expenseHTML = `<div class="badge">${expendsPercents}%</div>`;
        expansePercent.innerHTML = expenseHTML;
    } else {
        expansePercent.innerHTML = '';
     }
        

}

function displayMonth() {
    const now = new Date();
    const year = now.getFullYear();

    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long'
    })
     
    const month = timeFormatter.format(now);

    displayMonthHTML.innerHTML = month;
    displayYearHTML.innerHTML = year;
    
    
}

displayMonth();
insertTestData();
calcBudget();

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if(!view.checkEmtyFields()) return;
    
    // формирование ИД
    let id = 1;

    if(budget.length > 0) {
        const lastElem = budget[budget.length - 1];
        // console.log('Последний элемент', lastElem);
        
        const lastElemId = lastElem.id;
        // console.log('di последнего элемента ', lastElemId);
 
        id = lastElemId + 1;
        // console.log('id нового элемента ', id);
        
    }

    const record = {
        id: id,
        type:type.value,
        title:title.value.trim(),
        value: +value.value,
    };
 
    view.renderRecord(record);

 


    calcBudget ();


    console.log(budget);
    clearForm();
    insertTestData();
})


// удаление записи 
document.body.addEventListener ('click', function (event) {
    if(event.target.closest('button.item__remove')) {
 
        const  recordElement = event.target.closest('li.budget-list__item');
        
        const id = +recordElement.dataset.id;

        const index = budget.findIndex(function (element) {         
            if(id === element.id) {
                return true;        
            }
        })

         // Удаление из массива
        budget.splice(index, 1);
        // Удаление со страницы
        recordElement.remove();

        calcBudget();
    }
})




// урок 5 mvc (00:00)