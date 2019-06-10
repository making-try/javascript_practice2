document.addEventListener('DOMContentLoaded',function(){
  let todo = document.getElementById('addBtn');
  let status = document.getElementById('statusBtn');
  let deletebtn = document.getElementById('deleteBtn');
  //IDのカウンター
  let counter = 0;

  //ラジオボタンの値を取得
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
  //追加ボタン押下時のアクション
    todo.addEventListener('click',function(){
        const addTask = document.getElementById('addTask');
        const output = document.getElementById('todoTable');
        /*while (output.firstChild){
            output.removeChild(output.firstChild);
        }*/

        if (addTask.value !== ''){
            const todoText = document.createTextNode(addTask.value);
            const trAnchor = document.createElement('tr');
            const idAnchor = document.createElement('td');
            const idText = document.createTextNode(counter);
            const commentAnchor = document.createElement('td');
            const statusAnchor = document.createElement('td');

            //作業中ボタンの作成
            const statusbtnAnchor = document.createElement('input');
            statusbtnAnchor.name = 'statusBtn';
            statusbtnAnchor.type = 'button';
            statusbtnAnchor.value = '作業中';
            //削除ボタンの作成
            const deletebtnAnchor = document.createElement('input');
            deletebtnAnchor.name = 'deleteBtn';
            deletebtnAnchor.type = 'button';
            deletebtnAnchor.value = '削除';

            //tdタグを組み立てる
            idAnchor.appendChild(idText);
            counter += 1;
            commentAnchor.appendChild(todoText);
            statusAnchor.appendChild(statusbtnAnchor);
            statusAnchor.appendChild(deletebtnAnchor);
            //trタグに組み立てたtdタグを代入する
            trAnchor.appendChild(idAnchor);
            trAnchor.appendChild(commentAnchor);
            trAnchor.appendChild(statusAnchor);
            //outputタグにtrタグを代入する
            output.appendChild(trAnchor);
            }
     });
     //作業中ボタン押下時のアクション
     /*
     document.getElementById('statusBtn').addEventListener('click',function(){

     });*/
     //削除ボタン押下時のアクション
     deletebtn.addEventListener('click',function(){
       const output = document.getElementById('todoTable');
       output.removeChild(output.firstChild);
     });
})
