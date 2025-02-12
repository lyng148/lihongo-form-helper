document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.sync.get(['apiKey', 'isDisabled', 'selectedModel'], (data) => {
        document.getElementById('apiKey').value = data.apiKey || '';
        document.getElementById('temporaryDisable').checked = data.isDisabled || false;
        document.getElementById('modelSelect').value = data.selectedModel || 'gemini-2.0-flash'; // Default model
        updateDisabledState(data.isDisabled || false);
    });

    // Save API key
    document.getElementById('saveApiKey').addEventListener('click', () => {
        const apiKey = document.getElementById('apiKey').value;
        if (!apiKey) {
            showStatus('Please enter an API key', 'error');
            return;
        }

        chrome.storage.sync.set({ apiKey }, () => {
            if (chrome.runtime.lastError) {
                showStatus('Error saving API key: ' + chrome.runtime.lastError.message, 'error');
            } else {
                showStatus('API key saved successfully!', 'success');
            }
        });
    });

    // Handle model selection change
    document.getElementById('modelSelect').addEventListener('change', (e) => {
        const selectedModel = e.target.value;
        chrome.storage.sync.set({ selectedModel }, () => {
            showStatus('Model preference saved!', 'success');
        });
    });

    // Test API connection
    document.getElementById('testApi').addEventListener('click', async () => {
        const apiKey = document.getElementById('apiKey').value;
        if (!apiKey) {
            showStatus('Please enter an API key first', 'error');
            return;
        }

        showStatus('Testing API connection...', '');
        try {
            const response = await testGeminiAPI(apiKey);
            if (response.success) {
                showStatus('API connection successful!', 'success');
            } else {
                showStatus('API connection failed. Please check your key.', 'error');
            }
        } catch (error) {
            showStatus('Error testing API: ' + error.message, 'error');
        }
    });

    // Handle temporary disable toggle
    document.getElementById('temporaryDisable').addEventListener('change', (e) => {
        const isDisabled = e.target.checked;
        chrome.storage.sync.set({ isDisabled }, () => {
            updateDisabledState(isDisabled);
            // Send message to content script about state change
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'updateDisabledState',
                        isDisabled: isDisabled
                    });
                }
            });
        });
    });
});

function updateDisabledState(isDisabled) {
    const notice = document.getElementById('disabledNotice');
    if (isDisabled) {
        notice.classList.add('visible');
    } else {
        notice.classList.remove('visible');
    }
}

function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.display = 'block';
    status.className = 'status ' + type;

    // Hide status message after 4 seconds
    setTimeout(() => {
        status.style.display = 'none';
    }, 4000);
}

async function testGeminiAPI(apiKey) {
    try {
        const selectedModel = document.getElementById('modelSelect').value;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Hello, testing API connection"
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API test failed:', error);
        throw new Error('Failed to connect to API');
    }
}