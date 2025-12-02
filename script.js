// -------------------- GLOBAL DATA ---------------------
}


if(q.type==='dd') {
box.innerHTML += `
<div class='drop' data-answer='${q.answer}' id='drop${i}'
ondrop='drop(event)' ondragover='allowDrop(event)'>Drop here</div>
<div><span draggable='true' class='draggable' id='drag${i}'
ondragstart='drag(event)'>${q.answer}</span></div>`;
}


quizDiv.appendChild(box);
});


startTimer();
}


// -------------------- DRAG & DROP ---------------------
function allowDrop(ev){ ev.preventDefault(); }
function drag(ev){ ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev){
ev.preventDefault();
const data = ev.dataTransfer.getData("text");
ev.target.textContent = document.getElementById(data).textContent;
ev.target.dataset.dropped = ev.target.textContent;
}


// -------------------- TIMER ---------------------
function startTimer(){
let time = 300;
const fill = document.getElementById('timer-fill');
const t = document.getElementById('timer');


const interval = setInterval(()=>{
time--;
t.textContent = time + 's';
fill.style.width = (time/300*100) + '%';
if(time<=0){ clearInterval(interval); finishQuiz(); }
},1000);
}


// -------------------- SCORING ---------------------
function finishQuiz(){
const scoreDiv = document.getElementById("score-page");
const quizDiv = document.getElementById("quiz-questions");


let score = 0;


// TF
if(document.querySelector("input[name='q0']:checked")?.value === 'true') score+=3;


// MC
if(document.querySelector("input[name='q1']:checked")?.value === '1') score+=3;


// DD
const dd = document.getElementById('drop2');
if(dd.dataset.dropped === 'AuthZ') score+=4;


quizDiv.classList.add('hidden');
scoreDiv.classList.remove('hidden');
scoreDiv.innerHTML = `<h2>Your Score: ${score}/10</h2>`;
}
