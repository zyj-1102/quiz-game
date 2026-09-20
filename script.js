// 题目数据
const quizData = [
    {
        question: "JavaScript是什么类型语言？",
        options: ["编译型语言", "解释型语言", "机器语言"],
        answer: "解释型语言"
    },
    {
        question: "HTML用来做什么？",
        options: ["页面结构", "页面样式", "交互逻辑"],
        answer: "页面结构"
    },
    {
        question: "CSS用来做什么？",
        options: ["页面结构", "页面样式", "交互逻辑"],
        answer: "页面样式"
    },
    {
        question: "下面哪个不是JS数据类型？",
        options: ["String", "Number", "Page"],
        answer: "Page"
    }
];

// 获取页面元素
const questionEl = document.getElementById("question");
const optionsBox = document.getElementById("options-box");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;
let selected = false;

// 加载当前题目
function loadQuestion(){
    selected = false;
    nextBtn.disabled = true;
    const currentQuiz = quizData[currentIndex];
    questionEl.innerText = currentQuiz.question;
    optionsBox.innerHTML = "";

    // 渲染选项
    currentQuiz.options.forEach(opt=>{
        const div = document.createElement("div");
        div.classList.add("option-item");
        div.innerText = opt;
        div.onclick = ()=> selectOption(div, opt);
        optionsBox.appendChild(div);
    })
}

// 选择答案
function selectOption(div, optText){
    if(selected) return;
    selected = true;
    const answer = quizData[currentIndex].answer;
    // 判断对错
    if(optText === answer){
        div.classList.add("correct");
        score++;
        scoreEl.innerText = score;
    }else{
        div.classList.add("wrong");
        // 标出正确答案
        let allOpts = document.querySelectorAll(".option-item");
        allOpts.forEach(item=>{
            if(item.innerText === answer){
                item.classList.add("correct");
            }
        })
    }
    nextBtn.disabled = false;
}

// 下一题按钮
nextBtn.onclick = function(){
    currentIndex++;
    if(currentIndex < quizData.length){
        loadQuestion();
    }else{
        // 全部题目完成
        questionEl.innerText = `答题结束！你的得分：${score}/${quizData.length}`;
        optionsBox.innerHTML = "";
        nextBtn.innerText = "重新开始";
        nextBtn.onclick = resetGame;
    }
}

// 重置游戏
function resetGame(){
    currentIndex = 0;
    score = 0;
    scoreEl.innerText = 0;
    nextBtn.innerText = "下一题";
    nextBtn.onclick = nextBtn.onclick = function(){
        currentIndex++;
        if(currentIndex < quizData.length){
            loadQuestion();
        }else{
            questionEl.innerText = `答题结束！你的得分：${score}/${quizData.length}`;
            optionsBox.innerHTML = "";
            nextBtn.innerText = "重新开始";
            nextBtn.onclick = resetGame;
        }
    }
    loadQuestion();
}

// 初始化加载第一题
loadQuestion();