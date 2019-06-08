document.addEventListener('DOMContentLoaded',function(){

    let getRadioValue = function(name){
        let result = '';
        let elements = document.getElementsByName(name);
        for (let i = 0, len = elements.length; i < len; i++){
            let elem = elements.item(i);
            if (elem.checked){
                result = elem.value;
                break;
            }
        }
        return result;
    };

    document.getElementById('addBtn').addEventListener('click',function(){
        const addTask = document.getElementById('addTask');
        //const selectedAction = getRadioValue('task');
        //alert(addTask.value);

        //const output = document.getElementById('output');
        //const anchor = document.createElement('p');

        /*while (output.firstChild){
            output.removeChild(output.firstChild);
        }*/
        const output = document.getElementById('output');
        
        const tableAnchor = document.createElement('table');
        const trAnchor = document.createElement('tr');
        const thAnchor = document.createElement('th');
        const thAnchor2 = document.createElement('th');
        const thAnchor3 = document.createElement('th');
        const headerText = document.createTextNode('ID');
        const headerText2 = document.createTextNode('コメント');
        const headerText3 = document.createTextNode('状態');

        thAnchor.appendChild(headerText);
        thAnchor2.appendChild(headerText2);
        thAnchor3.appendChild(headerText3);

        trAnchor.appendChild(thAnchor);
        trAnchor.appendChild(thAnchor2);
        trAnchor.appendChild(thAnchor3);

        tableAnchor.appendChild(trAnchor);
        //tableAnchor.appendChild(trAnchor2);

        output.appendChild(tableAnchor);


        if (addTask.value !== ''){
            //const output = document.getElementById('output');
            const todoData = document.createElement('td');
            const todoText = document.createTextNode(addTask.value)
            anchor.appendChild(text);
            output.appendChild(anchor);
            result = NaN
            }
     });
})