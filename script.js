// Elemen-elemen DOM
const welcomeScreen = document.querySelector(".welcome-screen");
const adventureScreen = document.querySelector(".adventure-screen");
const questionScreen = document.querySelector(".question-screen");
const feedbackScreen = document.querySelector(".feedback-screen");

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const nextButton = document.getElementById("nextButton");
const infoButton = document.getElementById("infoButton");
const closeInfoModal = document.getElementById("closeInfoModal");
const infoModal = document.getElementById("infoModal");
const themeIcon = document.getElementById("themeIcon");

const scoreElements = document.querySelectorAll(
  "#score, #scoreQuestion, #scoreFeedback"
);
const progressBar = document.getElementById("progressBar");
const timerBar = document.getElementById("timerBar");
const badgesContainer = document.getElementById("badgesContainer");
const levelIndicators = document.querySelectorAll(
  "#levelIndicator, #levelIndicatorFeedback"
);
const questionNumber = document.getElementById("questionNumber");

// Audio elements
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const clickSound = document.getElementById("clickSound");
const completionSound = document.getElementById("completionSound");

// Status game
let score = 0;
let currentLevel = 0;
let currentQuestion = 0;
let timer = null;
let timeLeft = 30; // Waktu dalam detik untuk menjawab
let isDarkMode = false;

// Data lokasi petualangan
const adventureLocations = [
  {
    title: "Kaki Gunung Berapi",
    emoji: "🌋",
    description:
      "Kamu berada di kaki gunung berapi yang megah. Udara terasa hangat dan kamu dapat melihat asap tipis mengepul dari puncak gunung. Untuk melanjutkan perjalanan, kamu perlu memahami proses yang terjadi di dalam gunung berapi ini.",
    info: "Gunung berapi terbentuk ketika magma dari dalam bumi naik ke permukaan melalui rekahan atau lemah di kerak bumi. Indonesia memiliki 127 gunung berapi aktif, terbanyak di dunia karena terletak di Cincin Api Pasifik.",
    factIcon: "fas fa-mountain",
  },
  {
    title: "Tebing Batuan",
    emoji: "🪨",
    description:
      "Kamu tiba di tebing batuan yang tinggi dengan lapisan-lapisan batuan yang terlihat jelas. Setiap lapisan memiliki warna dan tekstur yang berbeda, menceritakan sejarah bumi yang panjang. Identifikasi jenis batuan di sini untuk melanjutkan perjalanan.",
    info: "Lapisan batuan yang kamu lihat adalah hasil ribuan hingga jutaan tahun pengendapan. Melalui studi stratigrafi, para ahli geologi dapat menentukan umur relatif batuan dan rekonstruksi sejarah bumi.",
    factIcon: "fas fa-layer-group",
  },
  {
    title: "Tepi Patahan Bumi",
    emoji: "↔️",
    description:
      "Kamu menemukan sebuah patahan besar di permukaan bumi. Kamu bisa melihat tanah yang terpisah dan bergeser. Patahan ini adalah bukti dari kekuatan tektonik yang luar biasa. Pahami proses tektonik lempeng untuk melanjutkan perjalanan.",
    info: "Patahan terjadi ketika batuan di kerak bumi pecah dan bergeser akibat tekanan tektonik. Patahan San Andreas di California adalah salah satu patahan paling terkenal, membentang sepanjang 1.300 km.",
    factIcon: "fas fa-expand-arrows-alt",
  },
  {
    title: "Gua Batu Kapur",
    emoji: "🕳️",
    description:
      "Kamu memasuki gua batu kapur yang indah. Di dalamnya terdapat stalaktit dan stalagmit yang terbentuk selama ribuan tahun. Air menetes dari langit-langit gua, terus membentuk struktur batu yang menakjubkan ini.",
    info: "Stalaktit dan stalagmit terbentuk dari proses pelarutan dan pengendapan kalsium karbonat yang terkandung dalam batu kapur. Proses ini sangat lambat, dengan stalaktit hanya bertumbuh sekitar 0,13 mm per tahun.",
    factIcon: "fas fa-water",
  },
  {
    title: "Lapisan Dalam Bumi",
    emoji: "🌐",
    description:
      "Dengan teknologi khusus, kamu dapat melihat visualisasi lapisan dalam bumi. Dari kerak hingga inti, setiap lapisan memiliki karakteristik tersendiri. Pelajari struktur internal bumi untuk menyelesaikan petualangan.",
    info: "Struktur bumi terdiri dari kerak (crust), mantel (mantle), inti luar (outer core), dan inti dalam (inner core). Kerak hanya 1% dari volume bumi, sementara mantel mencakup 84% volumenya.",
    factIcon: "fas fa-globe-americas",
  },
];

// Data pertanyaan
const questions = [
  {
    text: "Apa yang menyebabkan gunung berapi meletus?",
    options: [
      "Rotasi bumi yang terlalu cepat",
      "Tekanan dan suhu tinggi yang menyebabkan magma naik ke permukaan",
      "Hujan asam yang mengikis permukaan gunung",
      "Aktivitas manusia di sekitar gunung",
    ],
    correctIndex: 1,
    explanation:
      "Gunung berapi meletus karena tekanan dan suhu tinggi yang menyebabkan magma naik ke permukaan. Magma adalah batuan cair panas di dalam bumi yang ketika mencapai permukaan disebut lava.",
  },
  {
    text: "Manakah di bawah ini yang merupakan batuan beku?",
    options: ["Batu gamping", "Batu kapur", "Granit", "Batu pasir"],
    correctIndex: 2,
    explanation:
      "Granit adalah contoh batuan beku, yang terbentuk dari pendinginan dan pembekuan magma atau lava. Batuan beku lainnya termasuk basal, obsidian, dan pumice.",
  },
  {
    text: "Apa yang dimaksud dengan tektonik lempeng?",
    options: [
      "Proses pembentukan gunung berapi",
      "Teori yang menjelaskan pergerakan lapisan kerak bumi",
      "Metode penambangan mineral",
      "Sistem klasifikasi batuan",
    ],
    correctIndex: 1,
    explanation:
      "Tektonik lempeng adalah teori yang menjelaskan pergerakan lapisan kerak bumi. Menurut teori ini, kerak bumi terbagi menjadi beberapa lempeng besar yang bergerak di atas lapisan mantel bumi.",
  },
  {
    text: "Proses apa yang membentuk stalaktit dan stalagmit dalam gua?",
    options: [
      "Erosi oleh angin",
      "Sedimentasi oleh air sungai",
      "Pengendapan kembali kalsium karbonat oleh tetesan air",
      "Aktivitas mikroba dalam gua",
    ],
    correctIndex: 2,
    explanation:
      "Stalaktit dan stalagmit terbentuk melalui proses pengendapan kembali kalsium karbonat yang terkandung dalam tetesan air yang merembes melalui langit-langit gua. Air melarutkan batu kapur dan kemudian mengendapkan mineralnya secara perlahan selama ribuan tahun.",
  },
  {
    text: "Lapisan apa dari bumi yang paling tebal?",
    options: ["Kerak", "Mantel", "Inti luar", "Inti dalam"],
    correctIndex: 1,
    explanation:
      "Mantel adalah lapisan bumi yang paling tebal, dengan ketebalan sekitar 2.900 km. Mantel terdiri dari batuan silikat padat tetapi plastis yang dapat mengalir sangat lambat.",
  },
];

// Fakta geologi menarik untuk ditampilkan setelah menjawab
const geologiFacts = [
  "Gunung tertinggi di tata surya bukan di Bumi, melainkan Gunung Olympus Mons di Mars dengan ketinggian 21 km!",
  "Berlian terbentuk dari karbon murni yang terpapar tekanan dan panas ekstrem di kedalaman 150-200 km di bawah permukaan bumi.",
  "Batuan tertua yang ditemukan di Bumi berumur sekitar 4,28 miliar tahun, ditemukan di Jack Hills, Australia Barat.",
  "Kerak bumi bergerak dengan kecepatan rata-rata 2,5 cm per tahun, kira-kira secepat pertumbuhan kuku manusia.",
  "Tsunami tercepat yang pernah tercatat dapat bergerak dengan kecepatan hingga 950 km/jam, secepat pesawat jet komersial.",
  "Ada 'lonceng gua' atau litofon alami dalam beberapa gua batu kapur yang dapat menghasilkan nada musik ketika dipukul.",
  "Jika semua es di Antartika mencair, permukaan laut global akan naik sekitar 60 meter.",
  "Batu rubi dan safir sebenarnya adalah mineral yang sama (korundum) dengan pengotor berbeda yang memberi mereka warna berbeda.",
  "Gempa bumi terdahsyat yang pernah tercatat terjadi di Chili pada tahun 1960, dengan kekuatan 9,5 SR.",
];

// Inisialisasi game
function initGame() {
  score = 0;
  currentLevel = 0;
  currentQuestion = 0;

  // Generate badges
  generateBadges();

  // Update score dan level indicators
  updateScore();
  updateLevelIndicators();

  // Set dark mode berdasarkan preferensi user (jika ada)
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") {
    toggleDarkMode();
  }

  showWelcomeScreen();
}

// Generate badges untuk progress
function generateBadges() {
  badgesContainer.innerHTML = "";

  const badgeIcons = [
    "fas fa-mountain",
    "fas fa-layer-group",
    "fas fa-expand-arrows-alt",
    "fas fa-water",
    "fas fa-globe-americas",
  ];

  for (let i = 0; i < adventureLocations.length; i++) {
    const badge = document.createElement("div");
    badge.className = "badge";
    badge.id = `badge-${i}`;

    const icon = document.createElement("i");
    icon.className = badgeIcons[i];
    badge.appendChild(icon);

    badgesContainer.appendChild(badge);
  }
}

// Update score di semua elemen
function updateScore() {
  scoreElements.forEach((element) => {
    element.textContent = score;
  });

  // Update progress bar
  const progress = (currentLevel / adventureLocations.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Update level indicators
function updateLevelIndicators() {
  levelIndicators.forEach((indicator) => {
    indicator.textContent = currentLevel + 1;
  });

  // Update question number
  questionNumber.textContent = currentLevel + 1;
}

// Update earned badges
function updateBadges() {
  for (let i = 0; i <= currentLevel; i++) {
    const badge = document.getElementById(`badge-${i}`);
    if (badge && !badge.classList.contains("earned")) {
      setTimeout(() => {
        badge.classList.add("earned");
        playSound(clickSound);
      }, i * 300);
    }
  }
}

// Audio controls
function playSound(sound) {
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch((e) => console.log("Audio couldn't play: ", e));
  }
}

// Fungsi untuk menampilkan berbagai layar
function showWelcomeScreen() {
  hideAllScreens();
  welcomeScreen.classList.add("active");
}

function showAdventureScreen() {
  hideAllScreens();

  // Set konten adventure
  document.getElementById("adventureTitle").textContent =
    adventureLocations[currentLevel].title;
  document.getElementById("locationEmoji").textContent =
    adventureLocations[currentLevel].emoji;
  document.getElementById("adventureDescription").textContent =
    adventureLocations[currentLevel].description;

  // Set info tambahan
  document.getElementById("locationInfoContent").textContent =
    adventureLocations[currentLevel].info;

  updateBadges();

  adventureScreen.classList.add("active");

  // Ubah warna latar sesuai level (tapi tidak di dark mode)
  if (!isDarkMode) {
    const hue = (currentLevel * 40) % 360;
    document.body.style.backgroundColor = `hsl(${hue}, 70%, 90%)`;
  }
}

function showQuestionScreen() {
  hideAllScreens();

  // Set konten pertanyaan
  document.getElementById(
    "questionTitle"
  ).textContent = `Pertanyaan: ${adventureLocations[currentLevel].title}`;
  document.getElementById("questionText").textContent =
    questions[currentQuestion].text;

  // Generate opsi jawaban
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  questions[currentQuestion].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn slide-in";
    button.style.animationDelay = `${index * 0.1}s`;
    button.textContent = option;
    button.onclick = () => {
      clearInterval(timer);
      playSound(clickSound);
      checkAnswer(index);
    };
    optionsContainer.appendChild(button);
  });

  questionScreen.classList.add("active");

  // Start timer
  startTimer();
}

function startTimer() {
  // Reset timer
  timeLeft = 30;
  timerBar.style.width = "100%";

  timer = setInterval(() => {
    timeLeft--;
    timerBar.style.width = `${(timeLeft / 30) * 100}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer(-1); // Waktu habis, jawaban salah
    }
  }, 1000);
}

function showFeedbackScreen(isCorrect) {
  hideAllScreens();

  const feedbackContainer = document.getElementById("feedbackContainer");
  const feedbackEmoji = document.getElementById("feedbackEmoji");
  const feedbackTitle = document.getElementById("feedbackTitle");
  const feedbackText = document.getElementById("feedbackText");

  // Set random geologi fact
  const randomFact =
    geologiFacts[Math.floor(Math.random() * geologiFacts.length)];
  document.getElementById("factContent").textContent = randomFact;

  if (isCorrect) {
    feedbackContainer.className = "feedback correct";
    feedbackEmoji.textContent = "🎉";
    feedbackTitle.textContent = "Jawaban Benar!";
    feedbackText.textContent =
      "Selamat! Kamu telah menunjukkan pemahaman yang baik tentang geologi!";
    playSound(correctSound);
  } else {
    feedbackContainer.className = "feedback wrong";
    feedbackEmoji.textContent = "📚";
    feedbackTitle.textContent = "Jawaban Kurang Tepat";
    feedbackText.textContent = questions[currentQuestion].explanation;
    playSound(wrongSound);
  }

  feedbackScreen.classList.add("active");
}

function hideAllScreens() {
  welcomeScreen.classList.remove("active");
  adventureScreen.classList.remove("active");
  questionScreen.classList.remove("active");
  feedbackScreen.classList.remove("active");
}

// Fungsi untuk memeriksa jawaban
function checkAnswer(selectedIndex) {
  const currentQ = questions[currentQuestion];
  let isCorrect = false;

  if (selectedIndex === -1) {
    // Waktu habis
    isCorrect = false;
  } else {
    isCorrect = selectedIndex === currentQ.correctIndex;
  }

  if (isCorrect) {
    score += 20;
    updateScore();
  }

  showFeedbackScreen(isCorrect);
}

// Fungsi untuk melanjutkan ke level berikutnya
function nextLevel() {
  currentLevel++;

  if (currentLevel >= adventureLocations.length) {
    // Game selesai
    playSound(completionSound);
    endGame();
  } else {
    updateLevelIndicators();
    showAdventureScreen();
  }
}

// Fungsi untuk mengakhiri game
function endGame() {
  hideAllScreens();

  // Reset warna latar
  if (!isDarkMode) {
    document.body.style.backgroundColor = "var(--background-light)";
  }

  // Buat layar akhir
  const container = document.querySelector(".container");
  container.innerHTML = `
        <h1>Petualangan Selesai!</h1>
        <div class="emoji-container">
            <div class="emoji">🏆</div>
        </div>
        <p>Selamat! Kamu telah menyelesaikan Petualangan Bumi dan mendapatkan skor akhir:</p>
        <h2 style="font-size: 2.5rem; margin: 1rem 0; color: var(--accent-color);">${score}</h2>
        <p>Kamu telah belajar tentang berbagai aspek geologi, dari gunung berapi hingga struktur dalam bumi.</p>
        
        <div class="progress-container">
            <div class="badges-container" id="finalBadgesContainer">
                ${getBadgesHTML()}
            </div>
        </div>
        
        <p>Teruslah menjelajahi dan belajar tentang keajaiban planet kita!</p>
        <div class="button-container">
            <button class="btn btn-start" onclick="window.location.reload()">
                <i class="fas fa-redo"></i> Main Lagi
            </button>
            <button class="btn btn-info" onclick="showCertificate()">
                <i class="fas fa-award"></i> Lihat Sertifikat
            </button>
        </div>
    `;

  // Animate badges in final screen
  setTimeout(() => {
    const badgeElements = document.querySelectorAll(
      "#finalBadgesContainer .badge"
    );
    badgeElements.forEach((badge, index) => {
      setTimeout(() => {
        badge.classList.add("earned");
      }, index * 300);
    });
  }, 500);
}

function getBadgesHTML() {
  const badgeIcons = [
    "fas fa-mountain",
    "fas fa-layer-group",
    "fas fa-expand-arrows-alt",
    "fas fa-water",
    "fas fa-globe-americas",
  ];
  let html = "";

  for (let i = 0; i < adventureLocations.length; i++) {
    html += `<div class="badge${
      i <= currentLevel ? " earned" : ""
    }" id="final-badge-${i}"><i class="${badgeIcons[i]}"></i></div>`;
  }

  return html;
}

function showCertificate() {
  const container = document.querySelector(".container");

  const date = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  container.innerHTML = `
        <div style="border: 5px double var(--primary-color); padding: 2rem; text-align: center; background-color: var(--card-color);">
            <h2 style="color: var(--accent-color); font-size: 1.8rem; margin-bottom: 1rem;">SERTIFIKAT PENYELESAIAN</h2>
            <div style="margin: 1rem 0;">
                <i class="fas fa-award" style="font-size: 3rem; color: var(--accent-color);"></i>
            </div>
            <p>Diberikan kepada:</p>
            <h3 style="margin: 1rem 0; font-size: 1.5rem; color: var(--primary-color);">Ahli Geologi Muda</h3>
            <p>Atas keberhasilannya menyelesaikan</p>
            <h3 style="color: var(--secondary-color); margin: 0.5rem 0;">Petualangan Bumi: Jelajah Dunia Geologi</h3>
            <p>dengan skor akhir</p>
            <h2 style="color: var(--accent-color); font-size: 2rem; margin: 0.5rem 0;">${score}</h2>
            <p style="margin-top: 2rem;">Tertanda pada ${date}</p>
            <div style="display: flex; justify-content: space-around; margin: 2rem 0;">
                <div class="badge earned"><i class="fas fa-graduation-cap"></i></div>
            </div>
            <button class="btn" onclick="window.location.reload()">
                <i class="fas fa-home"></i> Kembali ke Awal
            </button>
        </div>
    `;
}

// Toggle dark mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode");

  if (isDarkMode) {
    themeIcon.className = "fas fa-sun";
    document.body.style.backgroundColor = "var(--background-light)";
  } else {
    themeIcon.className = "fas fa-moon";
    // Restore level color if in adventure screen
    if (adventureScreen.classList.contains("active")) {
      const hue = (currentLevel * 40) % 360;
      document.body.style.backgroundColor = `hsl(${hue}, 70%, 90%)`;
    } else {
      document.body.style.backgroundColor = "var(--background-light)";
    }
  }

  // Save preference
  localStorage.setItem("darkMode", isDarkMode);
}

// Show/hide modal
function toggleInfoModal() {
  infoModal.classList.toggle("active");
  if (infoModal.classList.contains("active")) {
    infoModal.querySelector(".modal-content").classList.add("fade-in");
  }
}

// Event Listeners
startButton.addEventListener("click", function () {
  playSound(clickSound);
  showAdventureScreen();
});

continueButton.addEventListener("click", function () {
  playSound(clickSound);
  // Tampilkan pertanyaan yang sesuai dengan level saat ini
  currentQuestion = currentLevel;
  showQuestionScreen();
});

nextButton.addEventListener("click", function () {
  playSound(clickSound);
  nextLevel();
});

infoButton.addEventListener("click", function () {
  playSound(clickSound);
  toggleInfoModal();
});

closeInfoModal.addEventListener("click", function () {
  toggleInfoModal();
});

themeIcon.addEventListener("click", function () {
  playSound(clickSound);
  toggleDarkMode();
});

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target === infoModal) {
    toggleInfoModal();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && infoModal.classList.contains("active")) {
    toggleInfoModal();
  }
});

// Preload sounds
function preloadSounds() {
  [correctSound, wrongSound, clickSound, completionSound].forEach((sound) => {
    if (sound) sound.load();
  });
}

// Mulai game
preloadSounds();
initGame();