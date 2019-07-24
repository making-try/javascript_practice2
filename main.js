document.addEventListener('DOMContentLoaded',function(){
  const taskAdd = document.getElementById('addBtn');
  const radioTaskAll = document.getElementById('taskAll');
  const radioDoing = document.getElementById('taskDoing');
  const radioDone = document.getElementById('taskDone');

  //タスクを格納する配列
  let taskLists = [];

  //ToDo表を再表示する関数
  const displayTasks = function(tasks){
    const todoTable = document.getElementById('todoTable');

    while (todoTable.firstChild){
      todoTable.removeChild(todoTable.firstChild);
    };

    tasks.forEach(function(value, index, tasks){
      viewTask(value[0], value[1], value[2],index, tasks)
    });
  }

  const viewTask = function(taskId, taskValue, taskStatus, index, tasks){
    const todoText = document.createTextNode(taskValue);
    const trAnchor = document.createElement('tr');
    trAnchor.id = 'tableRow' + taskId;

    const idAnchor = document.createElement('td');
    const idText = document.createTextNode(taskId);
    const commentAnchor = document.createElement('td');
    const statusAnchor = document.createElement('td');

    //作業中ボタンの作成
    const statusBtnAnchor = document.createElement('input');
    statusBtnAnchor.id = 'statusBtn' + taskId;
    statusBtnAnchor.type = 'button';
    statusBtnAnchor.value = taskStatus;
    //削除ボタンの作成
    const deleteBtnAnchor = document.createElement('input');
    deleteBtnAnchor.id = 'deleteBtn' + taskId;
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
    const deleteBtn = document.getElementById('deleteBtn' + taskId);
    const statusBtn = document.getElementById('statusBtn' + taskId);

    deleteBtn.addEventListener('click',function(){
      //削除する行の行番号を削除ボタンのID名から取得し、配列を作り直す
      let tableRowId = deleteBtn.id.slice(9)
      tempTasks = [];
      taskLists.forEach(function(value, index, tasks){
        if (value[0] !== Number(tableRowId)){
          tempTasks.push(value);
        }
      });
      //IDを振り直す
      tempTasks.forEach(function(value, index, tasks){
        value[0] = index;
      });

      taskLists = tempTasks;
      displayTasks(taskLists);
    });

    statusBtn.addEventListener('click',function(){
      //ステータスの行番号をボタンのID名から取得し、配列を作り直す
      let tableRowId = statusBtn.id.slice(9)
      tempTasks = [];
      taskLists.forEach(function(value, index, tasks){
        if (value[0] === Number(tableRowId)){
          if (value[2] === '作業中'){
            value[2] = '完了';
          }else{
            value[2] = '作業中'
          }
        }
        tempTasks.push(value);
      });
      taskLists = tempTasks
      displayTasks(taskLists);
    });

  };

  //追加ボタン押下時のアクション
  taskAdd.addEventListener('click',function(){
    const addTask = document.getElementById('addTask');
    //タスク名とタスクの状態を格納する配列[ID, タスク名, 状態]
    let taskElements = []
    let taskLength = taskLists.length

    if (addTask.value !== ''){
      taskElements.push(taskLength);
      taskElements.push(addTask.value);
      taskElements.push('作業中');

      taskLists.push(taskElements);

      displayTasks(taskLists);

      addTask.value ='';
    }
  });

  //すべてボタン押下時のアクション
  radioTaskAll.addEventListener('click',function(){
    displayTasks(taskLists)
  });

  //作業中ボタン押下時のアクション
  radioDoing.addEventListener('click',function(){
    tempTasks = [];
    taskLists.forEach(function(value, index, tasks){
      if (value[2] === '作業中'){
        tempTasks.push(value);
      }
    });
    displayTasks(tempTasks);
  });

  //完了ボタン押下時のアクション
  radioDone.addEventListener('click',function(){
    tempTasks = [];
    taskLists.forEach(function(value, index, tasks){
      if (value[2] === '完了'){
        tempTasks.push(value);
      }
    });
    displayTasks(tempTasks);
  });

})
