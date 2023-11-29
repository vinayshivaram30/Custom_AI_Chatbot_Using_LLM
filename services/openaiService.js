
const axios = require('axios');
const Embedding = require('../models/Embedding');

const openAIKey = process.env.OPENAI_API_KEY;

// Function to get response from OpenAI API using a message and context
async function getOpenAIResponse(message, context) {
    try {
        const prompt = context ? context + '\n\n' + message : message;
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${openAIKey}`
            }
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return 'I am having trouble processing that request.';
    }
}

// Function to retrieve context (embeddings) for a given message
async function getContextForMessage(message) {
    // Logic to retrieve the most relevant context (embedding) for the message
    // This would involve querying the Embedding model and finding the best match
    // ...
	try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-embedding-ada-002/embeddings', {
            input: text
        }, {
            headers: {
                'Authorization': `Bearer ${openAIKey}`
            }
        });
        return response.data.data; // Return embeddings
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return null;
    }				 
}

module.exports = { getOpenAIResponse, getContextForMessage };
