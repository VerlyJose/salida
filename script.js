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


startBtn.addEventListener('click', () => {
  const nameInput = document.getElementById('playerName').value;
  if (!nameInput) {
    alert("El bosque necesita un nombre para reconocerte...");
    return;
  }
  
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {});
  loadQuestion();
  showScreen('question');
});

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
        image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxmIYqiiyS4JAMK34c2vcgZbviyXvfJaq8ahZi2IPXdsRwFt9qzXy89d9ImXQTipHq0pE0M6aXkv8njoTO1TGiAugHNFj0VF2ILrwYQMYJEl3jqH7C7hP-9SxouQcVX7lNj_zhQrA=s1360-w1360-h1020-rw"
      },
      B: {
        text: "Un lugar con detalles y cierta magia",
        score: 3,
        intent: 3,
        image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwQ37KuLxs-gOEMSFmE8py0ltnv0nG2bLPQnPYRW_mmxyMUIecXiaWOwMTn-cFF_VW1f0GT7NKboS-nns1oa-8w7yFVKb778Kx8BZ3pZ_DQY-V7y1wfNVrgTdBphkPgqxBlvfc0xQ=s1360-w1360-h1020-rw"}
    }
  },
  {
    text: "Y finalmente, prefieres...",
    options: {
      A: {
        text: "Algo conocido pero diferente",
        score: 2,
        intent: 2,
        image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxZIAEQTSyKdoEKlzHbjklwpl_ZtXBIX0M30E8a0PAmNAQihZlcCtvRcEgRDl8_Z2LXPS3CsgK78kjxX63yqTfKcU_DN3F_HwUPBz8fkNxCK50kAJ-e8M-B97J2p2z9DlD29A7OhA=s1360-w1360-h1020-rw"
      },
      B: {
        text: "Algo fresco y fuera de lo común",
        score: 3,
        intent: 3,
        image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwiZkvqp7f9xYUgoJiRoCBsHwgOaBbTkGMnCuVriOq0YPqCSJNuAcjY9O8Ah4mfp4P2KYJmSk3PpVSgkfoxpkdAvxsCOQSk1757wL8haEVRGr-TK4FNDC9utUyYD0aYGAiBehIQdtbKx87f=s1360-w1360-h1020-rw"
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

function finishTest() {
  let food;
  let intention;
  let finalMessageText = "";

  // 1. Determinar comida
  const lastAnswer = answersLog[answersLog.length - 1];
  food = lastAnswer.choice === 'A' ? "Mexicana vegana 🌮🌱" : "Sushi 🍣";

  // 2. Determinar intención
  if (intentScore <= 7) {
    intention = "Plan relajado";
    finalMessageText = "Todo apunta a una tarde tranquila, sin prisas. Un plan que se siente ligero.";
  } else if (intentScore <= 11) {
    intention = "Plan progresivo";
    finalMessageText = "La vibra dice que el plan puede crecer poco a poco. Empezar simple...";
  } else {
    intention = "Plan largo";
    finalMessageText = "Esto se siente como una tarde que no tiene prisa por terminar. De esas que se alargan.";
  }

  // 3. SELECCIÓN ALEATORIA DE LA FRASE
  const frases = [
    "Arcana Lumis",
    "Aeterna Vox",
    "Ignis Verum",
    "Umbra Nox",
    "Vitae Anima"
  ];
  const fraseElegida = frases[Math.floor(Math.random() * frases.length)];

  // 4. ACTUALIZAR INTERFAZ
  const surpriseCode = document.getElementById("surpriseCode");
  if (surpriseCode) {
    surpriseCode.textContent = fraseElegida;
  }

  const finalMessage = document.getElementById("finalMessage");
  if (finalMessage) {
    finalMessage.textContent = finalMessageText;
  }

  // ✨ --- AQUÍ APLICAMOS EL EFECTO AL FINALIZAR --- ✨
  createFairyDust(); 
  // Opcional: puedes llamarlo dos veces para que haya el doble de partículas
  setTimeout(createFairyDust, 500); 

  showScreen('final');

  // 5. GUARDAR EN NETLIFY
  const form = document.querySelector('form[name="ritual"]');
  const nombreViajero = document.getElementById('playerName').value; // Capturamos el nombre

  form.nombre_viajero.value = nombreViajero; // Lo guardamos en el form
  form.totalScore.value = totalScore;
  form.intentScore.value = intentScore;
  form.food.value = food;
  form.intention.value = intention;

  form.answers_readable.value = `VIAJERO: ${nombreViajero}\n` + 
      answersLog.map((a, i) => `${i + 1}. ${a.question} → ${a.answer}`).join('\n') + 
      `\n\n✨ FRASE INVOCADA: ${fraseElegida}`;
  // Enviar el formulario
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
