
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



const priceFromatter = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
})

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

     budgetDisplay.innerHTML = priceFromatter.format(totalBudget);
     incomeDisplay.innerHTML = '+' + priceFromatter.format(totalIncome);
     expanseDisplay.innerHTML = '-' + priceFromatter.format(totalExpense);
     
     
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

    // проверка формы на заполненность заголовок
    if(title.value.trim() === '') {
        title.classList.add('form__input--error');
        return;
    } else {
        title.classList.remove('form__input--error');
    }

    // проверка формы на заполненность значение
    if(value.value.trim() === '' || +value.value <= 0) {
        value.classList.add('form__input--error');
        return;
    } else {
        value.classList.remove('form__input--error');
    }




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
 
    budget.push(record);

    console.log(budget);

    // ображаем дохрд на странице
    if(record.type === 'inc') {
        const htmlInc =  `
                <li data-id ="${record.id}" class="budget-list__item item item--income">
                    <div class="item__title">${record.title}</div>
                    <div class="item__right">
                    <div class="item__amount">+ ${priceFromatter.format(record.value)}</div>
                    <button class="item__remove">
                        <img src="./img/circle-green.svg" alt="delete" />
                    </button>
                    </div>
            </li>`

      incomeList.insertAdjacentHTML('afterbegin', htmlInc); 
    }

    if(record.type === 'exp') {
        const htmlExp =  `          
                <li data-id ="${record.id}" class="budget-list__item item item--expense">
                    <div class="item__title">${record.title}</div>
                    <div class="item__right">
                    <div class="item__amount">- ${priceFromatter.format(record.value)}</div>
                    <button class="item__remove">
                        <img src="./img/circle-red.svg" alt="delete" />
                    </button>
                    </div>
                </li>`

        expList.insertAdjacentHTML('afterbegin', htmlExp); 
    }


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










// урок 12 из 15 (1:44)