// content.js
console.log("Gemini AI Form Filler extension is running!");

// Check disabled state before running any functionality
async function checkIfEnabled() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('isDisabled', (data) => {
            resolve(!data.isDisabled);
        });
    });
}

// Hàm chính để tự động điền form
async function fillForm() {
    try {
        // First check if extension is enabled
        const isEnabled = await checkIfEnabled();
        if (!isEnabled) {
            console.log("Extension is temporarily disabled");
            return;
        }

        // 1. Lấy API key từ storage
        const apiKey = await getApiKey();
        if (!apiKey) {
            alert("Please enter API key in extension popup!");
            return;
        }

        // 2. Phân tích cấu trúc form
        const questions = getQuestions();
        if (questions.length === 0) {
            console.warn("No questions found in the form");
            return;
        }

        // 3. Gửi câu hỏi đến Gemini AI và nhận câu trả lời
        const answers = await getAnswersFromGemini(questions, apiKey);

        // 4. Điền câu trả lời vào form
        fillAnswers(questions, answers);
    } catch (error) {
        console.error("Error in fillForm:", error);
        alert("An error occurred while filling the form. Please check console for details.");
    }
}

// Hàm lấy API key từ storage
async function getApiKey() {
    return new Promise((resolve) => {
        chrome.storage.sync.get("apiKey", (data) => {
            resolve(data.apiKey);
        });
    });
}

// Hàm phân tích cấu trúc form để lấy danh sách câu hỏi
function getQuestions() {
    const questionElements = document.querySelectorAll(".Qr7Oae");
    const questions = [];

    questionElements.forEach((element) => {
        // Tìm tiêu đề câu hỏi
        const questionTextElement = element.querySelector(".M7eMe");
        if (!questionTextElement) return;

        const questionType = determineQuestionType(element);
        console.log("Question type:", questionType);
        console.log("Question text:", questionTextElement.textContent.trim());

        const question = {
            text: questionTextElement.textContent.trim(),
            type: questionType,
            element: element,
            options: []
        };

        // Thu thập các lựa chọn cho câu hỏi radio/checkbox
        if (questionType === "radio" || questionType === "checkbox") {
            const options = element.querySelectorAll(".docssharedWizToggleLabeledContainer");
            options.forEach(option => {
                const optionText = option.textContent.trim().replace(/\s+/g, " ");
                question.options.push(optionText);
            });
            console.log("Options:", question.options);
        }

        questions.push(question);
    });

    return questions;
}

// Hàm xác định loại câu hỏi
function determineQuestionType(questionElement) {
    // Check for text input questions
    const textInput = questionElement.querySelector('input[type="text"], .whsOnd.zHQkBf');
    if (textInput) {
        return "text";
    }

    // Check for radio button questions
    const radioInputs = questionElement.querySelectorAll('.nWQGrd input[type="radio"], .Od2TWd');
    if (radioInputs.length > 0) {
        return "radio";
    }

    // Check for checkbox questions
    const checkboxInputs = questionElement.querySelectorAll('input[type="checkbox"], .Y5sE8d');
    if (checkboxInputs.length > 0) {
        return "checkbox";
    }

    // Check for dropdown questions
    const dropdown = questionElement.querySelector('select, .MocG8c');
    if (dropdown) {
        return "dropdown";
    }

    return "unknown";
}

// Hàm gửi câu hỏi đến Gemini AI API và nhận câu trả lời
async function getAnswersFromGemini(questions, apiKey) {
    const answers = [];
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (const question of questions) {
        try {
            let prompt = "Always anwser in vietnamese.";
            if (question.type === "radio" && question.options.length > 0) {
                prompt += `Choose 1 best answer from these options: [${question.options.join("], [")}]. Question: ${question.text}. Respond with ONLY the exact text of the chosen option, no explanations.`;
            } else if (question.type === "checkbox" && question.options.length > 0) {
                prompt += `Choose appropriate answers from these options: [${question.options.join("], [")}]. Question: ${question.text}. Respond with ONLY the exact text of the chosen options, separated by commas if multiple.`;
            } else {
                prompt += `Answer briefly: ${question.text}, if question after text \"Answer briefly:\" is ask about name, answer to me only "Nguyễn Bùi Việt Linh", in the response you réponse to thís
                request, if it ask student number, say"20225733"`;
            }

            console.log("Sending prompt to Gemini:", prompt);
            const answer = await generateText(prompt, apiKey);
            answers.push(answer.trim());

            // Add a small delay between requests to avoid rate limiting
            await delay(1500);
        } catch (error) {
            console.error(`Error getting answer for: ${question.text}`, error);
            answers.push("");
        }
    }
    return answers;
}

// Hàm điền câu trả lời vào form
function fillAnswers(questions, answers) {
    for (let i = 0; i < questions.length; i++) {
        try {
            const question = questions[i];
            const answer = answers[i];

            if (!answer) {
                console.warn(`No answer provided for question: ${question.text}`);
                continue;
            }

            switch (question.type) {
                case "text":
                    fillTextInput(question.element, answer);
                    break;
                case "radio":
                    selectRadioButton(question.element, answer);
                    break;
                case "checkbox":
                    const multipleAnswers = answer.split(',').map(a => a.trim());
                    selectCheckboxes(question.element, multipleAnswers);
                    break;
                default:
                    console.warn(`Unsupported question type: ${question.type}`);
            }
        } catch (error) {
            console.error(`Error filling answer for question ${i + 1}:`, error);
        }
    }
}

// Hàm điền vào câu hỏi tự luận
function fillTextInput(questionElement, answer) {
    const inputElement = questionElement.querySelector('.whsOnd.zHQkBf');
    if (inputElement) {
        inputElement.value = answer;
        inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
        console.warn("Text input element not found");
    }
}

// Hàm chọn radio button
function selectRadioButton(questionElement, answer) {
    const labels = questionElement.querySelectorAll(".docssharedWizToggleLabeledContainer");
    let bestMatch = null;
    let highestSimilarity = 0;

    labels.forEach(label => {
        const labelText = label.textContent.trim().toLowerCase();
        const similarity = calculateSimilarity(answer.toLowerCase(), labelText);

        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestMatch = label;
        }
    });

    if (bestMatch && highestSimilarity > 0.8) {
        const radioButton = bestMatch.querySelector('input[type="radio"], .Od2TWd');
        if (radioButton) {
            radioButton.click();
        }
    } else {
        console.warn(`No matching radio button found for answer: ${answer}`);
    }
}

// Hàm chọn checkboxes
function selectCheckboxes(questionElement, answers) {
    const checkboxes = questionElement.querySelectorAll('.Y5sE8d');
    if (Array.isArray(answers)) {
        answers.forEach(answer => {
            checkboxes.forEach(checkbox => {
                const label = checkbox.closest('.docssharedWizToggleLabeledContainer');
                if (label && calculateSimilarity(label.textContent.trim().toLowerCase(), answer.toLowerCase()) > 0.8) {
                    checkbox.click();
                }
            });
        });
    }
}

// Hàm tính độ tương đồng giữa hai chuỗi
function calculateSimilarity(str1, str2) {
    str1 = str1.toLowerCase().trim();
    str2 = str2.toLowerCase().trim();

    if (str1 === str2) return 1.0;
    if (str1.includes(str2) || str2.includes(str1)) return 0.9;

    // Simple Levenshtein distance implementation
    const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            if (str1[i-1] === str2[j-1]) {
                matrix[j][i] = matrix[j-1][i-1];
            } else {
                matrix[j][i] = Math.min(
                    matrix[j-1][i-1] + 1,  // substitution
                    matrix[j][i-1] + 1,    // insertion
                    matrix[j-1][i] + 1     // deletion
                );
            }
        }
    }

    const maxLength = Math.max(str1.length, str2.length);
    return 1 - (matrix[str2.length][str1.length] / maxLength);
}

// Update the generateText function in content.js
async function generateText(prompt, apiKey) {
    // Get the selected model from storage
    const modelData = await new Promise((resolve) => {
        chrome.storage.sync.get('selectedModel', (data) => {
            resolve(data.selectedModel || 'gemini-2.0-flash'); // Default to Gemini 2.0 Flash if not set
        });
    });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelData}:generateContent?key=${apiKey}`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            if (data.candidates && data.candidates.length > 0) {
                const answer = data.candidates[0].content.parts[0].text;
                console.log("Gemini AI Answer:", answer);
                return answer;
            } else {
                console.warn("No candidates in Gemini AI response");
                return "No answer found.";
            }
        } else {
            console.error("Gemini AI API Error:", data.error || response.statusText);
            throw new Error(data.error?.message || "API Error");
        }
    } catch (error) {
        console.error("Error calling Gemini AI API:", error);
        throw error;
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.message === "fill_form") {
        const isEnabled = await checkIfEnabled();
        if (isEnabled) {
            fillForm();
        } else {
            console.log("Extension is temporarily disabled");
        }
    } else if (request.action === "updateDisabledState") {
        console.log("Disabled state updated:", request.isDisabled);
    }
});

// Auto-fill when page loads (optional)
window.addEventListener('load', async () => {
    console.log("Page loaded, checking if extension is enabled...");
    const isEnabled = await checkIfEnabled();
    if (isEnabled) {
        console.log("Extension is enabled, starting form fill...");
        fillForm();
    } else {
        console.log("Extension is temporarily disabled");
    }
});