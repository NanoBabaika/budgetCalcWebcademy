const elementsDOM = {
    form: document.querySelector('#form'), 
    type: document.querySelector('#type'),
    title: document.querySelector('#title'),
    value: document.querySelector('#value'),
    incomeList: document.querySelector('#incomes-list'),
    expList: document.querySelector('#expenses-list'),
    budgetDisplay: document.querySelector('#budget'),
    incomeDisplay: document.querySelector('#total-income'),
    expanseDisplay: document.querySelector('#total-expense'),
    expansePercent: document.querySelector('#expense-percents-wrapper'),
    displayMonthHTML: document.querySelector('#month'),
    displayYearHTML: document.querySelector('#year'),
}
 
const priceFromatter = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
})


function checkEmptyFields () {
    if(elementsDOM.title.value.trim() === '') {
        elementsDOM.title.classList.add('form__input--error');
        return false;
    } else {
        elementsDOM.title.classList.remove('form__input--error');
     }


    if(elementsDOM.value.value.trim() === '' || +elementsDOM.value.value <= 0) {
        elementsDOM.value.classList.add('form__input--error');
        return false;
    } else {
        elementsDOM.value.classList.remove('form__input--error');
        return true;
    }

}

function renderRecord(record) {
        // ображаем доход на странице
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
    
          elementsDOM.incomeList.insertAdjacentHTML('afterbegin', htmlInc); 
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
    
            elementsDOM.expList.insertAdjacentHTML('afterbegin', htmlExp); 
        }
}

function renderBudget({totalBudget, totalExpense, totalIncome ,expendsPercents}) {

    elementsDOM.budgetDisplay.innerHTML = priceFromatter.format(totalBudget);

    elementsDOM.incomeDisplay.innerHTML = '+' + priceFromatter.format(totalIncome);
    elementsDOM.expanseDisplay.innerHTML = '-' + priceFromatter.format(totalExpense);
    
    
    


    if(expendsPercents) {
       const expenseHTML = `<div class="badge">${expendsPercents}%</div>`;
       elementsDOM.expansePercent.innerHTML = expenseHTML;
    } else {
        elementsDOM.expansePercent.innerHTML = '';
    }
            
    
}


function clearForm() {
    form.reset();
}
 
function renderMoth(month, year) {
    elementsDOM.displayMonthHTML.innerHTML = month;
    elementsDOM.displayYearHTML.innerHTML = year;
}


function renderTestData (randomData) {
   type.value = randomData.type;
   title.value =  randomData.title;
   value.value =  randomData.value;
}

function getFormData () {
    const recordData = {
        type:elementsDOM.type.value,
        title:elementsDOM.title.value,
        value: elementsDOM.value.value,
    };
    

    return recordData;
}


function removeRecord (event) {

    const  recordElement = event.target.closest('li.budget-list__item');
    const id =  recordElement.dataset.id; 
    recordElement.remove();
    return id;
}

export {priceFromatter, elementsDOM, checkEmptyFields, renderRecord, renderBudget, clearForm, renderMoth, renderTestData,  getFormData, removeRecord,}