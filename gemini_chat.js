require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const readline = require('node:readline');

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get user input as a promise
function getUserInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    try {
        // Get temperature from user (optional)
        const tempInput = await getUserInput('Enter temperature (0.0-1.0) or press Enter for default (0.3): ');
        const temperature = tempInput ? parseFloat(tempInput) : 0.3;

        // Create chat session
        const chat = ai.chats.create({
            model: "gemini-1.5-flash",
            // history: [
            //     {
            //         role: "user",
            //         parts: [{ text: "Hello" }],
            //     },
            //     {
            //         role: "model",
            //         parts: [{ text: "Great to meet you. What would you like to know?" }],
            //     }
            // ],
            config: {
                temperature: temperature,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 400,
            }
        });

        // First turn
        const firstInput = await getUserInput('What would you like to discuss? ');
        const firstResponse = await chat.sendMessage({
            message: firstInput,
        });
        console.log('\nGemini:', firstResponse.text);

        // Second turn
        const secondInput = await getUserInput('\nFollow-up question or comment: ');
        const secondResponse = await chat.sendMessage({
            message: secondInput,
        });
        console.log('\nGemini:', secondResponse.text);

        // Optional third turn
        const continueChat = await getUserInput('\nWould you like to continue the conversation? (yes/no): ');
        if (continueChat.toLowerCase() === 'yes') {
            const thirdInput = await getUserInput('\nYour next message: ');
            const thirdResponse = await chat.sendMessage({
                message: thirdInput,
            });
            console.log('\nGemini:', thirdResponse.text);
        }

        console.log('\nConversation ended. Thank you for chatting!');
    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        rl.close();
    }
}

// Start the chat
async function generateRes(){
    await main();
}
generateRes();

// main();