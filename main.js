document.addEventListener('DOMContentLoaded',function(){
  const taskAdd = document.getElementById('add-btn');
  const radioTaskAll = document.getElementById('task-all');
  const radioDoing = document.getElementById('task-doing');
  const radioDone = document.getElementById('task-done');

  //タスクを格納する配列
  const taskLists = [];

  //ToDo表を再表示する関数
  const displayTasks = function(taskLists){
    const todoTable = document.getElementById('todo-table');

    while (todoTable.firstChild){
      todoTable.removeChild(todoTable.firstChild);
    };

    taskLists.forEach(function(taskObj){
      viewTask(taskObj.id, taskObj.value, taskObj.status)
    });
  }

  const viewTask = function(taskId, taskValue, taskStatus){
    const todoTable = document.getElementById('todo-table');
    const todoText = document.createTextNode(taskValue);
    const trAnchor = document.createElement('tr');
    trAnchor.id = 'table-row' + taskId;

    const idAnchor = document.createElement('td');
    const idText = document.createTextNode(taskId);
    const commentAnchor = document.createElement('td');
    const statusAnchor = document.createElement('td');

    //作業中ボタンの作成
    const statusBtnAnchor = document.createElement('input');
    statusBtnAnchor.id = 'status-btn' + taskId;
    statusBtnAnchor.type = 'button';
    statusBtnAnchor.value = taskStatus;
    //削除ボタンの作成
    const deleteBtnAnchor = document.createElement('input');
    deleteBtnAnchor.id = 'delete-btn' + taskId;
    deleteBtnAnchor.type = 'button';
    deleteBtnAnchor.value = '削除';

    //tdタグを組み立てる
    idAnchor.appendChild(idText);
    commentAnchor.appendChild(todoText);
    statusAnchor.appendChild(statusBtnAnchor);
    statusAnchor.appendChild(deleteBtnAnchor);
    //trタグに組み立てたtdタグを代入する
    trAnchor.appendChild(idAnchor);
    trAnchor.appendChild(commentAnchor);
    trAnchor.appendChild(statusAnchor);
    //todoTableタグにtrタグを代入する
    todoTable.appendChild(trAnchor);

    //getElementById('deleteBtn'としないとEventListenできないが、
    //常にdeleteBtnには最後の要素が格納されている。しかし一番最初の要素の「削除ボタンも」
    //押せるのはなぜだ？？
    const deleteBtn = document.getElementById('delete-btn' + taskId);
    const statusBtn = document.getElementById('status-btn' + taskId);

    deleteBtn.addEventListener('click',function(){
      //削除する行の行番号を削除ボタンのID名から取得し、配列を作り直す
      const tableRowId = deleteBtn.id.slice(10)
      taskLists.forEach(function(taskObj){
        if (taskObj.id === Number(tableRowId)){
          taskLists.splice(taskObj.id, 1);
        }
      });
      //IDを振り直す
      taskLists.forEach(function(taskObj, index){
        taskObj.id = index;
      });

      //taskLists = tempTasks;
      displayTasks(taskLists);
    });

    statusBtn.addEventListener('click',function(){
      //ステータスの行番号をボタンのID名から取得し、配列を作り直す
      const tableRowId = statusBtn.id.slice(10)
      taskLists.forEach(function(taskObj){
        if (taskObj.id === Number(tableRowId)){
          if (taskObj.status === '作業中'){
            taskObj.status = '完了';
          }else{
            taskObj.status = '作業中'
          }
        }
      });
      displayTasks(taskLists);
    });

  };

  //追加ボタン押下時のアクション
  taskAdd.addEventListener('click',function(){
    const addTask = document.getElementById('add-task');
    //タスク名とタスクの状態を格納する配列[ID, タスク名, 状態]
    const taskElements = [];
    const taskLength = taskLists.length;
    const taskObj = {};

    if (addTask.value){
      taskObj.id = taskLength;
      taskObj.value = addTask.value;
      taskObj.status = '作業中';
      
      taskLists.push(taskObj);
      displayTasks(taskLists);

      addTask.value ='';
    }
  });

  //すべてradioボタン押下時のアクション
  radioTaskAll.addEventListener('click',function(){
    displayTasks(taskLists)
  });

  //作業中radioボタン押下時のアクション
  radioDoing.addEventListener('click',function(){
    const tempTasks = [];
    taskLists.forEach(function(taskObj){
      if (taskObj.status === '作業中'){
        tempTasks.push(taskObj);
      }
    });
    displayTasks(tempTasks);
  });

  //完了radioボタン押下時のアクション
  radioDone.addEventListener('click',function(){
    const tempTasks = [];
    taskLists.forEach(function(taskObj ){
      if (taskObj.status === '完了'){
        tempTasks.push(taskObj);
      }
    });
    displayTasks(tempTasks);
  });

})
