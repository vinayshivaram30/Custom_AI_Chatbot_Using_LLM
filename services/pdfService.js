
const pdfParse = require('pdf-parse');
const axios = require('axios');

// Function to parse PDF and extract text
async function parsePDF(pdfBuffer) {
    const data = await pdfParse(pdfBuffer);
    return data.text; // Return extracted text from PDF
}

// Function to generate embeddings using OpenAI API
async function generateEmbeddings(text) {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/embeddings', {
        input: text
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    });
    return response.data.data; // Return embeddings
}

module.exports = { parsePDF, generateEmbeddings };
