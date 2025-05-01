// Vocabulary data
const vocabularyData = {
    english: [
        {
            word: "Hello",
            pronunciation: "/həˈləʊ/",
            meaning: "Xin chào",
            examples: ["Hello, how are you?", "Hello, nice to meet you!"]
        },
        {
            word: "Goodbye",
            pronunciation: "/ɡʊdˈbaɪ/",
            meaning: "Tạm biệt",
            examples: ["Goodbye, see you tomorrow!", "It's time to say goodbye."]
        },
        {
            word: "Thank you",
            pronunciation: "/ˈθæŋk juː/",
            meaning: "Cảm ơn",
            examples: ["Thank you for your help.", "Thank you very much!"]
        },
        {
            word: "Please",
            pronunciation: "/pliːz/",
            meaning: "Làm ơn",
            examples: ["Please help me.", "Please come in."]
        },
        {
            word: "Yes",
            pronunciation: "/jes/",
            meaning: "Vâng, có",
            examples: ["Yes, I understand.", "Yes, that's correct."]
        }
    ],
    swedish: [
        {
            word: "Hej",
            pronunciation: "/hej/",
            meaning: "Xin chào",
            examples: ["Hej, hur mår du?", "Hej, trevligt att träffas!"]
        },
        {
            word: "Adjö",
            pronunciation: "/aˈjøː/",
            meaning: "Tạm biệt",
            examples: ["Adjö, vi ses imorgon!", "Det är dags att säga adjö."]
        },
        {
            word: "Tack",
            pronunciation: "/tak/",
            meaning: "Cảm ơn",
            examples: ["Tack för hjälpen.", "Tack så mycket!"]
        },
        {
            word: "Snälla",
            pronunciation: "/ˈsnɛla/",
            meaning: "Làm ơn",
            examples: ["Snälla, hjälp mig.", "Snälla, kom in."]
        },
        {
            word: "Ja",
            pronunciation: "/jaː/",
            meaning: "Vâng, có",
            examples: ["Ja, jag förstår.", "Ja, det stämmer."]
        }
    ]
};

// DOM Elements
const container = document.querySelector('.container');
const languageOptions = document.querySelector('.language-options');
const menuBar = document.querySelector('.menu-bar');
const menuLeft = menuBar.querySelector('.menu-left');
const backBtn = document.createElement('button');
backBtn.className = 'back-btn';
backBtn.innerHTML = `
    <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
    </svg>
    Back
`;
const refreshBtn = menuBar.querySelector('.refresh-btn');
const avatarBtn = menuBar.querySelector('.avatar-btn');

// Create flashcard container
const flashcardContainer = document.createElement('div');
flashcardContainer.className = 'flashcard-container';
container.appendChild(flashcardContainer);

// Create navigation buttons
const navButtons = document.createElement('div');
navButtons.className = 'nav-buttons';
container.appendChild(navButtons);

let currentCardIndex = 0;
let currentLanguage = '';
let isLoggedIn = false;

// Event Listeners
languageOptions.addEventListener('click', handleLanguageSelection);
backBtn.addEventListener('click', goBackToLanguageSelection);
refreshBtn.addEventListener('click', handleRefresh);
avatarBtn.addEventListener('click', handleAvatarClick);

function handleLanguageSelection(e) {
    if (e.target.classList.contains('language-btn')) {
        currentLanguage = e.target.dataset.language;
        currentCardIndex = 0;
        showFlashcards(currentLanguage);
    }
}

function showFlashcards(language) {
    // Hide language selection
    languageOptions.style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('p').style.display = 'none';

    // Show back button in menu bar
    menuLeft.appendChild(backBtn);
    backBtn.style.display = 'flex';

    // Show flashcards
    flashcardContainer.style.display = 'block';
    flashcardContainer.innerHTML = '';
    navButtons.style.display = 'flex';

    // Create navigation buttons
    navButtons.innerHTML = `
        <button class="nav-btn prev-btn" ${currentCardIndex === 0 ? 'disabled' : ''}>Previous</button>
        <span class="card-counter">${currentCardIndex + 1}/${vocabularyData[language].length}</span>
        <button class="nav-btn next-btn" ${currentCardIndex === vocabularyData[language].length - 1 ? 'disabled' : ''}>Next</button>
    `;

    // Add event listeners to navigation buttons
    const prevBtn = navButtons.querySelector('.prev-btn');
    const nextBtn = navButtons.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            showCurrentCard(language);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < vocabularyData[language].length - 1) {
            currentCardIndex++;
            showCurrentCard(language);
        }
    });

    showCurrentCard(language);
}

function showCurrentCard(language) {
    const card = vocabularyData[language][currentCardIndex];
    
    flashcardContainer.innerHTML = `
        <div class="flashcard">
            <div class="flashcard-content">
                <h2 class="word">${card.word}</h2>
                <p class="pronunciation">${card.pronunciation}</p>
                <p class="meaning">${card.meaning}</p>
                <div class="examples">
                    <p class="examples-title">Examples:</p>
                    <ul>
                        ${card.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Update navigation buttons
    const prevBtn = navButtons.querySelector('.prev-btn');
    const nextBtn = navButtons.querySelector('.next-btn');
    const counter = navButtons.querySelector('.card-counter');

    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === vocabularyData[language].length - 1;
    counter.textContent = `${currentCardIndex + 1}/${vocabularyData[language].length}`;
}

function goBackToLanguageSelection() {
    // Remove back button from menu bar
    backBtn.remove();
    
    // Show language selection
    languageOptions.style.display = 'flex';
    document.querySelector('h1').style.display = 'block';
    document.querySelector('p').style.display = 'block';

    // Hide flashcards
    flashcardContainer.style.display = 'none';
    navButtons.style.display = 'none';
}

function handleRefresh() {
    if (currentLanguage) {
        currentCardIndex = 0;
        showCurrentCard(currentLanguage);
    }
}

function handleAvatarClick() {
    isLoggedIn = !isLoggedIn;
    avatarBtn.classList.toggle('logged-in', isLoggedIn);
    // Here you would typically handle the actual login/logout logic
    console.log(isLoggedIn ? 'User logged in' : 'User logged out');
} 