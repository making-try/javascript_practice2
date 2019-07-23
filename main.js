document.addEventListener('DOMContentLoaded',function(){
  const todo = document.getElementById('addBtn');
  const radio_taskall = document.getElementById('task_all');
  const radio_doing = document.getElementById('doing');
  const radio_done = document.getElementById('done');

  //タスクを格納する配列
  let task_list = [];

  //ToDo表を再表示する関数
  let review = function(arr){
    const output = document.getElementById('todoTable');

    while (output.firstChild){
      output.removeChild(output.firstChild);
    };

    arr.forEach(function(value, index, ary){
      viewTask(value[0], value[1], value[2],index, arr)

      /*
      value.forEach(function(value2, index2, ary2){
        console.log(value2);
        setAddTask(value2[0], index);
      })*/
    });
  }

  let viewTask = function(taskId, value, status, index, ary){
    const todoText = document.createTextNode(value);
    const trAnchor = document.createElement('tr');
    trAnchor.id = 'tableRow' + taskId;

    const idAnchor = document.createElement('td');
    const idText = document.createTextNode(taskId);
    const commentAnchor = document.createElement('td');
    const statusAnchor = document.createElement('td');

    //作業中ボタンの作成
    const statusbtnAnchor = document.createElement('input');
    statusbtnAnchor.id = 'statusBtn' + taskId;
    statusbtnAnchor.type = 'button';
    statusbtnAnchor.value = status;
    //削除ボタンの作成
    const deletebtnAnchor = document.createElement('input');
    deletebtnAnchor.id = 'deleteBtn' + taskId;
    deletebtnAnchor.type = 'button';
    deletebtnAnchor.value = '削除';

    //tdタグを組み立てる
    idAnchor.appendChild(idText);
    commentAnchor.appendChild(todoText);
    statusAnchor.appendChild(statusbtnAnchor);
    statusAnchor.appendChild(deletebtnAnchor);
    //trタグに組み立てたtdタグを代入する
    trAnchor.appendChild(idAnchor);
    trAnchor.appendChild(commentAnchor);
    trAnchor.appendChild(statusAnchor);
    //outputタグにtrタグを代入する
    todoTable.appendChild(trAnchor);

    //getElementById('deleteBtn'としないとEventListenできないが、
    //常にdeletebtnには最後の要素が格納されている。しかし一番最初の要素の「削除ボタンも」
    //押せるのはなぜだ？？
    let deletebtn = document.getElementById('deleteBtn' + taskId);
    let statusbtn = document.getElementById('statusBtn' + taskId);

    deletebtn.addEventListener('click',function(){
      //削除する行の行番号を削除ボタンのID名から取得し、配列を作り直す
      let tableRow_id = deletebtn.id.slice(9)
      ary_tmp = [];
      task_list.forEach(function(value, index, ary){
        if (value[0] !== Number(tableRow_id)){
          ary_tmp.push(value);
        }
      });
      //IDを振り直す
      ary_tmp.forEach(function(value, index, ary){
        value[0] = index;
      });

      task_list = ary_tmp;
      review(task_list);
    });

    statusbtn.addEventListener('click',function(){
      //ステータスの行番号をボタンのID名から取得し、配列を作り直す
      let tableRow_id = statusbtn.id.slice(9)
      ary_tmp = [];
      task_list.forEach(function(value, index, ary){
        if (value[0] === Number(tableRow_id)){
          if (value[2] === '作業中'){
            value[2] = '完了';
          }else{
            value[2] = '作業中'
          }
        }
        ary_tmp.push(value);
      });
      task_list = ary_tmp
      review(task_list);
    });


  };

  //追加ボタン押下時のアクション
  todo.addEventListener('click',function(){
    const addTask = document.getElementById('addTask');
    //タスク名とタスクの状態を格納する配列[ID, タスク名, 状態]
    let task_elem = []
    let task_len = task_list.length

    if (addTask.value !== ''){
      task_elem.push(task_len);
      task_elem.push(addTask.value);
      task_elem.push('作業中');

      task_list.push(task_elem);

      review(task_list);

      addTask.value ='';
    }
  });

  //すべてボタン押下時のアクション
  radio_taskall.addEventListener('click',function(){
    review(task_list)
  });

  //作業中ボタン押下時のアクション
  radio_doing.addEventListener('click',function(){
    ary_tmp = [];
    task_list.forEach(function(value, index, ary){
      if (value[2] === '作業中'){
        ary_tmp.push(value);
      }
    });
    review(ary_tmp);
  });

  //完了ボタン押下時のアクション
  radio_done.addEventListener('click',function(){
    ary_tmp = [];
    task_list.forEach(function(value, index, ary){
      if (value[2] === '完了'){
        ary_tmp.push(value);
      }
    });
    review(ary_tmp);
  });

})
