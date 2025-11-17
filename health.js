// --- Screen and User Management ---

const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const analysisOutput = document.getElementById('analysis-output');

function loginAsGuest() {
    // In a real app, this would perform Firebase Anonymous Sign-in
    localStorage.setItem('isLoggedIn', 'true');
    appScreen.classList.remove('hidden');
    loginScreen.classList.add('hidden');
    // Using alert as a placeholder for a custom modal notification
    alert('Logged in as Guest. Your advice is AI-generated and not medical diagnosis.');
}

function logout() {
    // In a real app, this would perform Firebase Sign-out
    localStorage.removeItem('isLoggedIn');
    appScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    analysisOutput.classList.add('hidden'); // Hide results on logout
}

// Check initial login state
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        appScreen.classList.remove('hidden');
        loginScreen.classList.add('hidden');
    } else {
        loginScreen.classList.remove('hidden');
        appScreen.classList.add('hidden');
    }
};


// --- Health Analysis Simulation ---

function generateAnalysisHTML(condition, age, history) {
    // This is a static placeholder logic. 
    // In a real-world application, this would be an API call to a medical LLM.
    
    // --- Data based on common cold/flu symptoms ---
    const possibleConditions = "Common cold, flu, tension headache, or viral infection.";
    const recommendedActions = [
        "Rest and stay hydrated",
        "Monitor temperature regularly",
        "Avoid strenuous activity"
    ];
    
    const medicineSuggestions = "Paracetamol (Crocin/Dolo): 500mg every 6-8 hours (Max 4 times/day)";

    // NEW: Detailed Diet Suggestions
    const dietSuggestions = [
        "**Hydration:** Drink warm liquids like herbal tea, ginger tea, honey-lemon water, and clear broth to soothe the throat and aid congestion.",
        "**Immunity Boosters:** Consume foods rich in Vitamin C such as citrus fruits (oranges, lemons), bell peppers, spinach, and broccoli.",
        "**Easy-to-Digest:** Stick to light, non-spicy foods like rice, toast, bananas, boiled vegetables, and khichdi to avoid stressing the digestive system.",
        "**Protein:** Include light proteins like boiled eggs, dal (lentils), or chicken soup for energy and recovery.",
        "**Avoid:** Dairy products (may thicken mucus), sugary drinks, fried foods, and alcohol, as these can hinder recovery."
    ];

    // --- Build the HTML Output ---

    let html = `
        <div class="analysis-card preliminary-card">
            <div class="card-header">
                <span style="font-size: 1.3rem;">&#128269;</span> Preliminary Analysis
            </div>
            <strong>Possible Conditions:</strong> ${possibleConditions}
            <strong>Recommended Actions:</strong>
            <ul>
                ${recommendedActions.map(action => `<li>${action}</li>`).join('')}
            </ul>
        </div>

        <div class="analysis-card medicine-card">
            <div class="card-header">
                <span style="font-size: 1.3rem;">&#128138;</span> Medicine Suggestions
            </div>
            <p>${medicineSuggestions}</p>
        </div>

        <!-- NEW DIET SUGGESTIONS SECTION -->
        <div class="analysis-card diet-card">
            <div class="card-header">
                <span style="font-size: 1.3rem;">&#127858;</span> Diet Suggestions
            </div>
            <ul>
                ${dietSuggestions.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        
        <div class="disclaimer-card">
            <div class="card-header">
                <span style="font-size: 1.3rem;">&#9888;</span> <strong>Important Disclaimer</strong>
            </div>
            <p>
                This is AI-generated guidance for educational purposes only. Always consult qualified healthcare professionals for proper diagnosis and treatment. For emergency consultation, contact Dr. Nageshwar.
            </p>
        </div>
    `;

    return html;
}


function analyzeHealth() {
    const condition = document.getElementById('health-condition').value.trim();
    // const age = document.getElementById('age').value.trim(); // not strictly needed for this simulation
    // const history = document.getElementById('medical-history').value.trim(); // not strictly needed for this simulation

    if (!condition) {
        alert('Please describe your health condition before analyzing.');
        return;
    }

    // Show the output area
    analysisOutput.classList.remove('hidden');

    // Generate and inject the analysis content (uses placeholder data)
    analysisOutput.innerHTML = generateAnalysisHTML(condition, 25, "None");

    // Scroll to the results for a better UX
    analysisOutput.scrollIntoView({ behavior: 'smooth' });
}