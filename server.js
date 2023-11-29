
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;														 
const session = require('express-session');
const bcrypt = require('bcrypt');
// const pdfRoutes = require('./routes/pdfRoutes'); // New route for PDF processing
const multer = require('multer');
const fs = require('fs'); // file system module to read PDF files

const User = require('./models/User');
const Message = require('./models/Message');

const pdfService = require('./services/pdfService');
const openaiService = require('./services/openaiService');
const Excel = require('exceljs'); // exceljs to handle Excel operations
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
require('dotenv').config();

// Setting up multer for file uploads
const upload = multer({ dest: 'uploads/' });

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(session({ secret: 'chatbot secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);


// New route for handling PDF uploads and processing
// app.use('/pdf', pdfRoutes);													

// Route to handle PDF upload and processing
app.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
    try {
        // Read the uploaded PDF file
        const pdfBuffer = fs.readFileSync(req.file.path);
        const text = await pdfService.parsePDF(pdfBuffer);
		// Generate embeddings from the PDF content
        const embeddings = await openaiService.generateEmbeddings(pdfBuffer.toString('utf8'));
		// Write embeddings to an Excel file
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Embeddings');
        worksheet.columns = [{ header: 'Embedding', key: 'embedding', width: 30 }];
        embeddings.forEach(embedding => {
            worksheet.addRow({ embedding: embedding });
        });
        await workbook.xlsx.writeFile('embeddings.xlsx');
		
        // Logic to store embeddings in the database
        res.send({ message: 'PDF processed and embeddings stored successfully' });
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).send('Error processing PDF');
    }
});

io.on('connection', (socket) => {
    socket.on('userMessage', async (message, context) => {
        const response = await openaiService.generateResponse(message, context);
        socket.emit('aiResponse', response);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
