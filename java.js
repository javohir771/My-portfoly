const categories={
    hayvonlar:[
      {uz:"Bori", correct:"Wolf", options:["Cow","Wolf","Chicken"], difficulty:"easy"},
      {uz:"Sigir", correct:"Cow", options:["Cow","Wolf","Chicken"], difficulty:"easy"},
      {uz:"Tovuq", correct:"Chicken", options:["Cow","Wolf","Chicken"], difficulty:"easy"},
      {uz:"It", correct:"Dog", options:["Dog","Cat","Wolf"], difficulty:"medium"},
      {uz:"Mushuk", correct:"Cat", options:["Dog","Cat","Wolf"], difficulty:"medium"},
      {uz:"Bo‘r", correct:"Wolf", options:["Cow","Wolf","Dog"], difficulty:"hard"},
      {uz:"Tulki", correct:"Fox", options:["Dog","Fox","Wolf"], difficulty:"hard"}
    ],
    sonlar:[
      {uz:"1", correct:"One", options:["One","Two","Three"], difficulty:"easy"},
      {uz:"2", correct:"Two", options:["One","Two","Three"], difficulty:"easy"},
      {uz:"3", correct:"Three", options:["One","Two","Three"], difficulty:"medium"},
      {uz:"4", correct:"Four", options:["Four","Five","Six"], difficulty:"medium"},
      {uz:"5", correct:"Five", options:["Four","Five","Six"], difficulty:"hard"},
      {uz:"6", correct:"Six", options:["Six","Seven","Eight"], difficulty:"hard"}
    ],
    kasblar:[
      {uz:"Shifokor", correct:"Doctor", options:["Doctor","Teacher","Farmer"], difficulty:"easy"},
      {uz:"O‘qituvchi", correct:"Teacher", options:["Doctor","Teacher","Farmer"], difficulty:"easy"},
      {uz:"Fermer", correct:"Farmer", options:["Doctor","Teacher","Farmer"], difficulty:"medium"},
      {uz:"Dasturchi", correct:"Programmer", options:["Programmer","Doctor","Teacher"], difficulty:"medium"},
      {uz:"Buxgalter", correct:"Accountant", options:["Accountant","Teacher","Farmer"], difficulty:"hard"},
      {uz:"Muhandis", correct:"Engineer", options:["Engineer","Doctor","Farmer"], difficulty:"hard"}
    ],
    gaplar:[
      {uz:"Mening ismim Javohir", correct:"My name is Javohir", options:["I am Javohir","My name is Javohir","I called Javohir"], difficulty:"easy"},
      {uz:"Men maktabga boraman", correct:"I go to school", options:["I go to school","I am going school","I goes school"], difficulty:"easy"},
      {uz:"Bugun havo juda sovuq", correct:"Today the weather is very cold", options:["Today weather is cold","Today the weather is very cold","Weather is cold today"], difficulty:"medium"},
      {uz:"Men ingliz tilini tez o‘rganmoqchiman", correct:"I want to learn English fast", options:["I want to learn English fast","I am learning English fast","I learn English fast"], difficulty:"medium"},
      {uz:"Agar men boy bo‘lsam, dunyoni sayohat qilaman", correct:"If I were rich, I would travel the world", options:["If I were rich, I would travel the world","If I am rich, I will travel the world","If I was rich, I will travel the world"], difficulty:"hard"},
      {uz:"Uning qilgan ishlari juda murakkab edi", correct:"His tasks were very complicated", options:["His tasks were very complicated","His work were very complicated","He tasks were complicated"], difficulty:"hard"}
    ]
  };
  
  let allQuestions=[],questions=[],currentIndex=0,score=0,done=0,wrong=0,tries=0,selectedDifficulty="";
  
  function showDifficultyOptions(){document.getElementById("difficultyOptions").classList.toggle("hidden");}
  
  // Start difficulty with automatic filter
  function startDifficulty(level){
    selectedDifficulty=level;
    document.querySelector("#tick-difficulty").classList.remove("hidden");
  
    // Aralash savollar filtrlash
    allQuestions=[...categories.hayvonlar,...categories.sonlar,...categories.kasblar,...categories.gaplar];
    questions=allQuestions.filter(q=>q.difficulty===level);
    shuffleArray(questions);
  
    currentIndex=0; // start from first
    document.getElementById("levelTitle").innerText=level.toUpperCase();
    document.getElementById("difficultyOptions").classList.add("hidden");
    startQuiz();
  }
  
  function startQuiz(){document.getElementById("quizOverlay").classList.remove("hidden");loadQuestion();}
  
  function loadQuestion(){
    if(currentIndex>=questions.length){
      alert("🎉 Savollar tugadi!");
      exitQuiz();
      openPage('home'); // avtomatik Home-ga qaytadi
      return;
    }
    const q=questions[currentIndex];
    document.getElementById("uzWord").innerText=q.uz;
    const answersDiv=document.getElementById("answers");
    answersDiv.innerHTML="";
    q.options.sort(()=>Math.random()-0.5).forEach(opt=>{
      const btn=document.createElement("button");
      btn.innerText=opt;
      btn.onclick=()=>answerSelected(btn,opt,q.correct);
      answersDiv.appendChild(btn);
    });
    updateProgress();
  }
  
  function answerSelected(btn,selected,correct){
    tries++; done++;
    const mark=document.createElement("span");
    mark.className="answerMark";
    mark.style.opacity="0";
    if(selected===correct){
      score+=2;
      mark.innerText="✔";
    }else{
      wrong++;
      mark.innerText="❌";
      document.querySelectorAll("#answers button").forEach(b=>{
        if(b.innerText===correct){
          const m=document.createElement("span"); m.className="answerMark"; m.innerText="✔"; b.appendChild(m);
        }
      });
    }
    btn.appendChild(mark);
    setTimeout(()=>{mark.style.opacity="1";},50);
  
    updateUI();
    setTimeout(()=>{currentIndex++; loadQuestion();},2000); // 2 sekunddan keyin next
  }
  
  function updateUI(){
    document.getElementById("score").innerText=score;
    document.getElementById("done").innerText=done;
    document.getElementById("wrong").innerText=wrong;
    document.getElementById("tries").innerText=tries;
  }
  
  function showOverlay(id){document.getElementById(id).classList.remove("hidden");updateUI();}
  function closeOverlay(id){document.getElementById(id).classList.add("hidden");}
  function exitQuiz(){document.getElementById("quizOverlay").classList.add("hidden");}
  function openPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));document.getElementById(id).classList.remove("hidden");}
  function shuffleArray(array){for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}}
  