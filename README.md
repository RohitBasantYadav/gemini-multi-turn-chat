# Gemini Multi-Turn Chat

A Node.js console application that demonstrates multi-turn conversations with Google's Gemini AI model. This script allows you to have interactive conversations with the Gemini model while maintaining context across multiple turns.

## Features

- Interactive console-based chat interface
- Multi-turn conversation support with context preservation
- Configurable temperature setting for response creativity
- Optional third turn for extended conversations
- Error handling and graceful exit

## Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)
- Google Gemini API key

## Setup

1. Clone this repository or download the files
    ```bash
    git clone https://github.com/RohitBasantYadav/gemini-multi-turn-chat.git
    ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   API_KEY=your_gemini_api_key_here
   ```
   You can get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Usage

Run the script using Node.js:
```bash
node gemini_chat.js
```

The script will:
1. Prompt you to enter a temperature value (0.0-1.0) or press Enter for default (0.3)
   - Lower values (e.g., 0.3) make responses more focused and deterministic
   - Higher values (e.g., 0.7) make responses more creative and diverse
2. Ask for your first message
3. Show Gemini's response
4. Ask for a follow-up message
5. Show Gemini's response
6. Ask if you want to continue the conversation
7. If yes, allow one more turn
8. End the conversation

## Dependencies

- `@google/genai`: Google's Generative AI SDK for Node.js
- `dotenv`: Environment variable management

## Configuration

The script uses the following default settings:
- Model: gemini-1.5-flash
- Default temperature: 0.3
- topP: 0.8
- topK: 40
- maxOutputTokens: 400

You can modify these settings in the `gemini_chat.js` file.

## Error Handling

The script includes error handling for:
- API connection issues
- Invalid temperature values
- Message formatting errors
