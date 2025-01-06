
const budget = [];
   

function createRecord (recordData) {
        // формирование ИД
        let id = 1;

        if(budget.length > 0) {
            const lastElem = budget[budget.length - 1];
            // console.log('Последний элемент', lastElem);
            
            const lastElemId = lastElem.id;
            // console.log('id последнего элемента ', lastElemId);
     
            id = lastElemId + 1;
            // console.log('id нового элемента ', id);
            
        }

        // формируем запись 
        const record = {
            id: id,
            type:recordData.type,
            title:recordData.title.trim(),
            value: +recordData.value,
        };
     
     
        budget.push(record);    
        console.log(budget);

        return record;
}

function deleteRecord (id) {

    const index = budget.findIndex(function (element) {         
        if(+id === element.id) return true;
    })

     // Удаление из массива
     budget.splice(index, 1);

     console.log(budget);
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

    //  урок 5, с переменными почему то не работает(13:02)
     const budgetSummary = {
        totalBudget,
        totalExpense,
        totalIncome,
        expendsPercents,
     }

     return budgetSummary;
}

function getTestData () {
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

    return testData[randomIndexTestData];;
}


function getMothYear() {
    const now = new Date();
    const year = now.getFullYear();

    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long'
    })
     
    const month = timeFormatter.format(now);
    return {month, year};
}
  

export {createRecord, deleteRecord, calcBudget, getTestData, getMothYear}



