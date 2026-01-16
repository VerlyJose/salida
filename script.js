let answersLog = [];

// --- CONFIGURACIÓN DE AUDIO ---
const bgMusic = document.getElementById("bgMusic");

// --- EFECTO POLVO DE HADAS (AL CARGAR) ---
function createFairyDust() {
  const container = document.body;
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'fairy-dust';
    
    // Posición inicial aleatoria
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    // Trayectoria aleatoria
    const moveX = (Math.random() - 0.5) * 300 + "px";
    const moveY = (Math.random() - 0.5) * 300 + "px";
    
    particle.style.left = startX + "px";
    particle.style.top = startY + "px";
    particle.style.setProperty('--x', moveX);
    particle.style.setProperty('--y', moveY);
    
    container.appendChild(particle);
    
    // Limpiar elemento después de la animación
    setTimeout(() => particle.remove(), 2000);
  }
}

// Ejecutar al cargar la ventana
window.onload = createFairyDust;

const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('startBtn');
const trustBtn = document.getElementById('trustBtn');

const questionText = document.getElementById('questionText');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionAText = document.getElementById('optionAText');
const optionBText = document.getElementById('optionBText');

let currentQuestion = 0;
let totalScore = 0;
let intentScore = 0;

// 🧩 Preguntas indirectas (personalidad + vibra)
const questions = [
  {
    text: "Cuando tienes la tarde libre, ¿Como te gustaría comenzar?",
    options: {
      A: {
        text: "Un plan relajado, sin demasiados estímulos",
        score: 1,
        intent: 1,
        image: "https://plus.unsplash.com/premium_photo-1726743761659-d0e7fb4b708f?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      B: {
        text: "Algo especial que se sienta distinto",
        score: 3,
        intent: 3,
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b"
      }
    }
  },
  {
    text: "¿Qué ambiente disfrutas más al conversar?",
    options: {
      A: {
        text: "Espacios vivos, espontáneos",
        score: 2,
        intent: 2,
        image: "https://images.unsplash.com/photo-1768466587161-55db9ed1baa6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      B: {
        text: "Lugares tranquilos donde todo fluye lento",
        score: 3,
        intent: 3,
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/a6/46/1d/patio.jpg?w=1100&h=-1&s=1"
      }
    }
  },
  {
    text: "En una salida, valoras más que…",
    options: {
      A: {
        text: "Sea cómoda y sin presión",
        score: 1,
        intent: 1,
        image: "https://images.unsplash.com/photo-1759299710361-6a92c9e7696f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvenklMjBjYWZlJTJDJTIwY2FzdWFsJTIwZGF0ZSUyQyUyMHBhcmslMjB3YWxrJTJDJTIwcmVsYXhlZCUyMGF0bW9zcGhlcmUlMkMlMjBzaW1wbGljaXR5LnxlbnwwfHwwfHx8MA%3D%3D"
      },
      B: {
        text: "Tenga una atmósfera que se recuerde",
        score: 3,
        intent: 3,
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/1b/7c/7c/ramen-ya-by-kintaro.jpg?w=1400&h=-1&s=1"
      }
    }
  },
  {
    text: "Cuando cae la tarde, prefieres…",
    options: {
      A: {
        text: "Algo sencillo que se sienta cercano",
        score: 2,
        intent: 2,
        image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759"
      },
      B: {
        text: "Un lugar con detalles y cierta magia",
        score: 3,
        intent: 3,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
      }
    }
  },
  {
    text: "Si el plan se extiende, es porque…",
    options: {
      A: {
        text: "La charla se puso buena sin planearlo",
        score: 2,
        intent: 2,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
      },
      B: {
        text: "Desde el inicio se sentía especial",
        score: 3,
        intent: 3,
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
      }
    }
  }
];

// 🔄 Pantallas
function showScreen(name) {
  screens.forEach(screen => {
    screen.classList.remove('active');
    if (screen.dataset.screen === name) {
      screen.classList.add('active');
    }
  });
}

// ▶️ Inicio
startBtn.addEventListener('click', () => {
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {});
  loadQuestion();
  showScreen('question');
});

// 🧩 Cargar pregunta
function loadQuestion() {
  const q = questions[currentQuestion];

  questionText.textContent = q.text;

  optionAText.textContent = q.options.A.text;
  optionBText.textContent = q.options.B.text;

  optionA.style.backgroundImage = `url(${q.options.A.image})`;
  optionB.style.backgroundImage = `url(${q.options.B.image})`;
}

// 👉 Respuesta
optionA.addEventListener('click', () => handleAnswer('A'));
optionB.addEventListener('click', () => handleAnswer('B'));

function handleAnswer(choice) {
  const q = questions[currentQuestion];
  const selected = q.options[choice];

  answersLog.push({
    question: q.text,
    choice: choice,
    answer: selected.text,
    score: selected.score,
    intent: selected.intent
  });

  totalScore += selected.score;
  intentScore += selected.intent;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    finishTest();
  }
}


// 🔚 Resultado oculto (solo tú)
function finishTest() {
  let food;
  let intention;

  if (totalScore <= 8) {
    food = "Mexicana 🌮";
  } else if (totalScore <= 11) {
    food = "Italiana 🍝";
  } else {
    food = "Sushi 🍣";
  }

  if (intentScore <= 7) {
    intention = "Plan relajado / corto";
  } else if (intentScore <= 11) {
    intention = "Plan progresivo";
  } else {
    intention = "Plan largo / íntimo";
  }

  console.log("🔢 PUNTAJE TOTAL:", totalScore);
  console.log("🍽️ COMIDA IDEAL:", food);
  console.log("🕰️ INTENCIÓN:", intention);

  showScreen('final');

  const form = document.querySelector('form[name="ritual"]');

form.totalScore.value = totalScore;
form.intentScore.value = intentScore;
form.food.value = food;
form.intention.value = intention;
form.answers.value = JSON.stringify(answersLog);

fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(new FormData(form)).toString(),
});

}

// Final neutro
trustBtn.addEventListener('click', () => {
  showScreen('intro');
});
