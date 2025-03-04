document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements
    const startButton = document.getElementById('startFilling');
    const pauseButton = document.getElementById('pauseFilling');
    const openSettingsButton = document.getElementById('openSettings');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const formStatus = document.getElementById('formStatus');
    const questionsList = document.getElementById('questionsList');

    let isFilling = false;
    let isPaused = false;

    // Load saved settings
    chrome.storage.sync.get(['isDisabled'], (data) => {
        if (data.isDisabled) {
            updateStatus('Extension is disabled', 'error');
            startButton.disabled = true;
        }
    });

    // Handle settings button click
    openSettingsButton.addEventListener('click', () => {
        chrome.windows.create({
            url: 'popup.html',
            type: 'popup',
            width: 400,
            height: 600
        });
    });

    // Handle start button click
    startButton.addEventListener('click', async () => {
        if (!isFilling) {
            isFilling = true;
            startButton.textContent = 'Stop';
            pauseButton.disabled = false;
            updateStatus('Filling form...', 'active');
            
            // Send message to content script to start filling
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'startFilling',
                        isPaused: isPaused
                    });
                }
            });
        } else {
            // Stop filling
            isFilling = false;
            isPaused = false;
            startButton.textContent = 'Start Filling Form';
            pauseButton.disabled = true;
            updateStatus('Stopped', 'inactive');
            
            // Reset progress
            updateProgress(0);
            
            // Send message to content script to stop
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'stopFilling'
                    });
                }
            });
        }
    });

    // Handle pause button click
    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
        updateStatus(isPaused ? 'Paused' : 'Filling form...', isPaused ? 'paused' : 'active');
        
        // Send message to content script about pause state
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'updatePauseState',
                    isPaused: isPaused
                });
            }
        });
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'progress') {
            updateProgress(message.progress);
        } else if (message.type === 'question') {
            addQuestionToList(message.question);
        } else if (message.type === 'status') {
            updateStatus(message.status, message.state);
        }
    });
});

function updateProgress(percent) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    progressBar.querySelector('.progress-fill').style.width = `${percent}%`;
    progressText.textContent = `${percent}%`;
}

function updateStatus(status, state) {
    const formStatus = document.getElementById('formStatus');
    formStatus.querySelector('span').textContent = status;
    formStatus.className = `status-box ${state}`;
}

function addQuestionToList(question) {
    const questionsList = document.getElementById('questionsList');
    const questionElement = document.createElement('div');
    questionElement.className = 'question-item';
    questionElement.innerHTML = `
        <div class="question-text">${question.text}</div>
        <div class="question-status ${question.status}">${question.status}</div>
    `;
    questionsList.appendChild(questionElement);
} 