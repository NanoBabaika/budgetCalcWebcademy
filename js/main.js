
console.log('Lets code! {^_^}');


const budget = [];

const form = document.querySelector('#form');

const type = document.querySelector('#type');
const title = document.querySelector('#title');
const value = document.querySelector('#value');

const incomeList = document.querySelector('#incomes-list');
const expList = document.querySelector('#expenses-list');


form.addEventListener('submit', function (event) {
    event.preventDefault();

    // проверка формы на заполненность
    if(title.value === '') {
        title.classList.add('form__input--error');
    } else {
        title.classList.remove('form__input--error');
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
        title:title.value,
        value:value.value,
    };
 
    budget.push(record);

    console.log(budget);

    // ображаем дохрд на странице
    if(record.type === 'inc') {
        const htmlInc =  `
                <li data-id ="${record.id}" class="budget-list__item item item--income">
                    <div class="item__title">${record.title}</div>
                    <div class="item__right">
                    <div class="item__amount">+ ${record.value}</div>
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
                    <div class="item__amount">- ${record.value}</div>
                    <button class="item__remove">
                        <img src="./img/circle-red.svg" alt="delete" />
                    </button>
                    </div>
                </li>`

        expList.insertAdjacentHTML('afterbegin', htmlExp); 
    }

    

})
















// урок 7й из 8ми