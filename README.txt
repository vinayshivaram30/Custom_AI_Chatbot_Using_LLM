Chatbot Application README

Overview:
This chatbot application uses Node.js for the backend, React for the frontend, and integrates OpenAI's GPT models for chat functionalities. It allows users to upload PDFs, converts these PDFs into embeddings using OpenAI's text-embedding-ada-002 model, and then uses text-davinci-003 model for generating chat responses based on these embeddings.

Prerequisites:

Node.js and npm installed.
An OpenAI API key.
Excel installed for handling embeddings (if not using a typical database).


Backend Setup:

Install Dependencies:

	- Navigate to the backend directory.
	- Run npm install to install all required Node.js dependencies.

Environment Variables:

	- Create a .env file in the root of your backend directory.
	- Add your OpenAI API key and MongoDB URI (if applicable):
		OPENAI_API_KEY=your_openai_api_key
		MONGO_URI=your_mongodb_uri
		
Run the Server:

	- Execute node server.js to start the backend server.

Frontend Setup:

1. Install Dependencies:

	- Navigate to the frontend (React) directory.
	- Run npm install to install the necessary React dependencies.

2. Start the React App:

	- Execute npm start to run the React application.


Using the Application:

1.	Access the Web Interface:
	- Open a web browser and navigate to http://localhost:3000.

2.	Upload a PDF:
	- Use the PDF upload feature in the chat interface to upload a PDF file.
	- The backend will process this PDF and use it as context for chat responses.

3.	Chat with the AI:
	- Enter your queries in the chat interface.
	- The AI will respond based on the context set by the uploaded PDFs.


Note:
	- Ensure that the backend and frontend are running simultaneously for the application to function correctly.
	- The application's current configuration uses Excel for storing embeddings, which is unconventional. For production use, consider integrating a proper database solution.