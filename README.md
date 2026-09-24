# AI Startup Co-Founder Agent 🚀

An AI-powered web application that generates innovative startup ideas tailored to your skills, interests, and industry preferences.

## Features

- **Smart Idea Generation**: Enter your industry, interests, and skills to get personalized startup ideas
- **Detailed Business Plans**: Each idea includes:
  - Problem statement
  - Proposed solution
  - Target market analysis
  - Business model
  - Competitive advantage
  - Revenue streams
- **Modern UI**: Clean, responsive interface with gradient design
- **AI-Powered**: Uses OpenAI API for intelligent idea generation
- **Fallback Mode**: Works with mock ideas when API key is not configured

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **AI Integration**: OpenAI API
- **Styling**: Custom CSS with modern design

## Getting Started

### Prerequisites

- Node.js installed on your machine
- (Optional) OpenAI API key for real AI generation

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harshithpalan/AI-Startup-Co-Founder-Agent.git
cd AI-Startup-Co-Founder-Agent
```

2. Install client dependencies:
```bash
cd client
npm install
```

3. Install server dependencies:
```bash
cd ../server
npm install
```

### Configuration

1. Copy the example environment file:
```bash
cd server
cp .env.example .env
```

2. (Optional) Add your OpenAI API key to `server/.env`:
```
OPENAI_API_KEY=your_actual_api_key_here
```

Without an API key, the app will use mock ideas for demonstration.

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server (in a new terminal):
```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter your industry (e.g., Healthcare, FinTech, E-commerce)
2. Specify your interests (e.g., AI, sustainability, blockchain)
3. List your skills (e.g., Programming, Marketing, Design)
4. Click "Generate Startup Idea"
5. Review your personalized startup idea with detailed business plan

## Project Structure

```
AI-Startup-Co-Founder-Agent/
├── client/              # React frontend
│   ├── src/
│   │   ├── App.jsx      # Main application component
│   │   ├── App.css      # Application styles
│   │   ├── main.jsx     # React entry point
│   │   └── index.css    # Global styles
│   ├── index.html       # HTML template
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
├── server/              # Node.js backend
│   ├── server.js        # Express server and API endpoints
│   ├── package.json     # Backend dependencies
│   ├── .env             # Environment variables
│   └── .env.example     # Environment variables template
└── .gitignore          # Git ignore rules
```

## API Endpoints

- `POST /api/generate-idea` - Generate a startup idea based on user input
- `GET /api/health` - Health check endpoint

## Future Enhancements

- User authentication and saved ideas
- Idea rating and feedback system
- Market analysis features
- Financial projections
- Co-founder collaboration features
- Export ideas to PDF
- Idea validation and market research integration

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Generated with

Built with [Devin](https://devin.ai) - AI-powered software development assistant