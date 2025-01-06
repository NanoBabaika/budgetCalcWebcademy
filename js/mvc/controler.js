import * as view from './view.js';
import * as model from './model.js';
 
 
 
init();
 
 
 

function addEventListeners () {
    view.elementsDOM.form.addEventListener('submit', createRecordElement);

        // удаление записи 
    document.body.addEventListener ('click', function (event) {
        if(event.target.closest('button.item__remove')) {
            deleteRecordElement();
        }
    })
}

function insertTestData() {
    const randomData = model.getTestData();
    view.renderTestData(randomData);
 }
  
 
 function displayMonth() { 
     const monthYear = model.getMothYear();
     view.renderMoth(monthYear.month, monthYear.year);
       
 }
 
 function init() {
     displayMonth();
     insertTestData();
     view.renderBudget(model.calcBudget());
     addEventListeners();
}


function createRecordElement (event) {
    event.preventDefault();
  
    if(!view.checkEmptyFields()) return;

    const recordData = view.getFormData();
    const record = model.createRecord(recordData);
    view.renderRecord(record);

    view.renderBudget(model.calcBudget());
    view.clearForm();
    insertTestData();
}


function deleteRecordElement() {

    const id = view.removeRecord(event);

    model.deleteRecord(id);

    view.renderBudget(model.calcBudget());
}
