
const elements = {
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

function checkEmtyFields () {
        // проверка формы на заполненность заголовок
        if(elements.title.value.trim() === '') {
            elements.title.classList.add('form__input--error');
            return false;;
        } else {
            elements.title.classList.remove('form__input--error');
         }
    
        // проверка формы на заполненность значение
        if(elements.value.value.trim() === '' || +elements.value.value <= 0) {
            elements.value.classList.add('form__input--error');
            return false;
        } else {
            elements.value.classList.remove('form__input--error');
        }
            
        return true;

}
 


export { elements, priceFromatter,  checkEmtyFields,} 