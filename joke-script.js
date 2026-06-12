// ===========================
// Joke Generator Configuration
// ===========================
const API_BASE = 'https://v2.jokeapi.dev/joke';
let currentJoke = null;
let jokeHistory = [];
let stats = {
    jokesCount: 0,
    copiedCount: 0,
    sharedCount: 0
};

// ===========================
// Initialize App
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 Joke Generator Loaded');
    loadStats();
    loadHistory();
    getJoke();
});

// ===========================
// Main: Get Joke Function
// ===========================
async function getJoke() {
    const getJokeBtn = document.getElementById('getJokeBtn');
    const category = document.getElementById('jokeCategory').value;
    const typeFilter = document.getElementById('jokeTypeFilter').value;
    const safeMode = document.getElementById('safeMode').checked;

    // Disable button and show loading
    getJokeBtn.disabled = true;
    getJokeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

    try {
        // Build API URL
        let url = API_BASE;
        
        if (category && category !== 'any') {
            url += `/${category}`;
        } else {
            url += '/Any';
        }

        // Add query parameters
        const params = new URLSearchParams();
        
        if (typeFilter && typeFilter !== 'any') {
            params.append('type', typeFilter);
        }
        
        if (safeMode) {
            params.append('safe-mode');
        }

        if (params.toString()) {
            url += '?' + params.toString();
        }

        // Fetch joke from API
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error('No jokes found with current filters');
        }

        currentJoke = data;
        displayJoke(data);
        addToHistory(data);
        updateStats('jokesCount');

    } catch (error) {
        console.error('Error fetching joke:', error);
        showToast(error.message || 'Failed to fetch joke. Please try again.', 'error');
        displayErrorJoke();
    } finally {
        // Re-enable button
        getJokeBtn.disabled = false;
        getJokeBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Get New Joke';
    }
}

// ===========================
// Display Joke Function
// ===========================
function displayJoke(joke) {
    const jokeText = document.getElementById('jokeText');
    const jokePunchline = document.getElementById('jokePunchline');
    const toggleBtn = document.getElementById('togglePunchlineBtn');
    const typeElement = document.getElementById('jokeType');

    // Determine joke type
    const jokeType = joke.type === 'twopart' ? 'Two-Part' : 'Single';
    typeElement.textContent = jokeType.toUpperCase();

    if (joke.type === 'single') {
        // Single joke
        jokeText.textContent = joke.joke;
        jokePunchline.style.display = 'none';
        toggleBtn.style.display = 'none';
    } else if (joke.type === 'twopart') {
        // Two-part joke
        jokeText.textContent = joke.setup;
        jokePunchline.textContent = joke.delivery;
        jokePunchline.style.display = 'none';
        toggleBtn.style.display = 'inline-flex';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i> Show Punchline';
    }

    // Category badge
    if (joke.category) {
        const categoryBadge = document.createElement('span');
        categoryBadge.className = 'category-badge';
        categoryBadge.textContent = joke.category;
    }
}

// ===========================
// Display Error Joke
// ===========================
function displayErrorJoke() {
    const jokeText = document.getElementById('jokeText');
    const jokePunchline = document.getElementById('jokePunchline');
    const toggleBtn = document.getElementById('togglePunchlineBtn');
    const typeElement = document.getElementById('jokeType');

    typeElement.textContent = 'ERROR';
    jokeText.textContent = '😅 Oops! Something went wrong. Please try again with different filters.';
    jokePunchline.style.display = 'none';
    toggleBtn.style.display = 'none';
}

// ===========================
// Toggle Punchline Function
// ===========================
function togglePunchline() {
    const jokePunchline = document.getElementById('jokePunchline');
    const toggleBtn = document.getElementById('togglePunchlineBtn');

    if (jokePunchline.style.display === 'none') {
        jokePunchline.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Punchline';
    } else {
        jokePunchline.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i> Show Punchline';
    }
}

// ===========================
// Copy Joke Function
// ===========================
function copyJoke() {
    if (!currentJoke) {
        showToast('No joke to copy!', 'warning');
        return;
    }

    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else {
        jokeText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
    }

    navigator.clipboard.writeText(jokeText).then(() => {
        showToast('✓ Joke copied to clipboard!', 'success');
        updateStats('copiedCount');
    }).catch(err => {
        showToast('Failed to copy joke', 'error');
        console.error('Copy error:', err);
    });
}

// ===========================
// Share Joke Function
// ===========================
function shareJoke() {
    if (!currentJoke) {
        showToast('No joke to share!', 'warning');
        return;
    }

    let shareText = '';
    if (currentJoke.type === 'single') {
        shareText = currentJoke.joke;
    } else {
        shareText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
    }

    if (navigator.share) {
        navigator.share({
            title: '😂 Check out this joke!',
            text: shareText,
        }).catch(err => console.log('Share error:', err));
    } else {
        // Fallback: Copy to clipboard with message
        navigator.clipboard.writeText(shareText);
        showToast('✓ Joke copied! Share it with others', 'success');
    }

    updateStats('sharedCount');
}

// ===========================
// Update Category Filter
// ===========================
function updateCategory() {
    getJoke();
}

// ===========================
// Update Joke Type Filter
// ===========================
function updateJokeType() {
    getJoke();
}

// ===========================
// Toggle Safe Mode
// ===========================
function toggleSafeMode() {
    getJoke();
}

// ===========================
// History Management
// ===========================
function addToHistory(joke) {
    const historyItem = {
        id: Date.now(),
        joke: joke,
        timestamp: new Date().toLocaleTimeString(),
        text: joke.type === 'single' ? 
            joke.joke : 
            `${joke.setup} ${joke.delivery}`
    };

    jokeHistory.unshift(historyItem);
    
    // Keep only last 20 jokes
    if (jokeHistory.length > 20) {
        jokeHistory.pop();
    }

    saveHistory();
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    const clearBtn = document.getElementById('clearHistoryBtn');

    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No jokes yet. Generate one to get started!</p>';
        clearBtn.style.display = 'none';
        return;
    }

    clearBtn.style.display = 'block';

    historyList.innerHTML = jokeHistory.map(item => `
        <div class="history-item" onclick="selectHistoryJoke(${item.id})">
            <div class="history-item-text">${escapeHtml(item.text.substring(0, 100))}${item.text.length > 100 ? '...' : ''}</div>
            <div class="history-item-time">${item.timestamp}</div>
        </div>
    `).join('');
}

function selectHistoryJoke(id) {
    const item = jokeHistory.find(h => h.id === id);
    if (item) {
        currentJoke = item.joke;
        displayJoke(item.joke);
        showToast('✓ Joke loaded from history', 'success');
    }
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        jokeHistory = [];
        saveHistory();
        renderHistory();
        showToast('✓ History cleared', 'success');
    }
}

function saveHistory() {
    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('jokeHistory');
    if (saved) {
        jokeHistory = JSON.parse(saved);
        renderHistory();
    }
}

// ===========================
// Statistics Management
// ===========================
function updateStats(type) {
    stats[type]++;
    saveStats();
    renderStats();
}

function renderStats() {
    document.getElementById('jokeCount').textContent = stats.jokesCount;
    document.getElementById('copyCount').textContent = stats.copiedCount;
    document.getElementById('shareCount').textContent = stats.sharedCount;
}

function saveStats() {
    localStorage.setItem('jokeStats', JSON.stringify(stats));
}

function loadStats() {
    const saved = localStorage.getItem('jokeStats');
    if (saved) {
        stats = JSON.parse(saved);
        renderStats();
    }
}

// ===========================
// Toast Notification
// ===========================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===========================
// Utility Functions
// ===========================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================
// Error Handling
// ===========================
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    showToast('An unexpected error occurred', 'error');
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🎭 Joke Generator Console', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cPowered by JokeAPI', 'color: #764ba2; font-size: 12px;');
console.log('Available functions:');
console.log('- getJoke()');
console.log('- copyJoke()');
console.log('- shareJoke()');
console.log('- clearHistory()');
console.log('- togglePunchline()');
