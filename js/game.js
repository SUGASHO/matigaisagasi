let timer = null;
const MAX = 3;
let clear = 0;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for(let i=0; i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num"+i);
    s.addEventListener('click', function(){
      if(this.textContent == q[qNum][1]){
        //alert("正解");
        correct.play();
        while(cells.firstChild){
          cells.removeChild(cells.firstChild);
        }
        clear++;
        if(clear<MAX){
          gameStart();
        }else{
          alert("終了！Timeは"+(timer-1)+"秒です。");
          clearTimeout(timer);
          let time=score.textContent;
          load(time)
        }

      }else{
        //alert("不正解");
        wrong.play();
      }
    });
    cells.appendChild(s);
    if(i % size ==  size -1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num"+p);
  ans.textContent = q[qNum][1];
}


function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}



// データの保存
function save(score){
let test = new TestClass();
let value = parseInt(score);
let key="time";
test.set(key,value);
test.save()
  .then(function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生：" + err);
  });
}
function load(score){
  TestClass
    .order("time")
    .fetchAll()
      .then(function(results){
        let min=results[0].time;
        console.log(results[0].time);
        if(min>score){
          alert("HighScore");
          save(score);
        }
      })
      .catch(function(err){
        alert("HighScore");
        save(score);
  });
}
