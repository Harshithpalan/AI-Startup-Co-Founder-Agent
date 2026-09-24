import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// AI Service configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const AI_MODEL = process.env.AI_MODEL || 'gpt-3.5-turbo'

// Generate startup idea endpoint
app.post('/api/generate-idea', async (req, res) => {
  try {
    const { industry, interests, skills } = req.body

    if (!industry || !interests || !skills) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // If no API key is configured, return a mock response
    if (!OPENAI_API_KEY) {
      const mockIdea = generateMockIdea(industry, interests, skills)
      return res.json(mockIdea)
    }

    // Call OpenAI API for idea generation
    const prompt = `Generate a detailed startup idea based on the following:
Industry: ${industry}
Interests: ${interests}
Skills: ${skills}

Please provide a response in JSON format with the following structure:
{
  "name": "Startup name",
  "tagline": "A catchy tagline",
  "problem": "The problem this startup solves",
  "solution": "The solution offered",
  "targetMarket": "Who is the target market",
  "businessModel": "How does it make money",
  "competitiveAdvantage": "What makes it unique",
  "revenueStreams": ["List of revenue streams"]
}`

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert startup co-founder and business consultant. Generate innovative, practical startup ideas.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    )

    const ideaText = response.data.choices[0].message.content
    const idea = JSON.parse(ideaText)
    
    res.json(idea)

  } catch (error) {
    console.error('Error generating idea:', error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' })
    }
    
    // Fallback to mock idea if API fails
    const mockIdea = generateMockIdea(req.body.industry, req.body.interests, req.body.skills)
    res.json(mockIdea)
  }
})

// Mock idea generator for testing/demo without API key
function generateMockIdea(industry, interests, skills) {
  const ideas = [
    {
      name: `SkillBridge ${industry}`,
      tagline: `Connecting ${industry} professionals through ${interests}`,
      problem: `Professionals in the ${industry} sector struggle to find reliable partners and collaborators who share their interests in ${interests}.`,
      solution: `A platform that uses AI to match professionals based on their skills in ${skills} and shared interests in ${interests}.`,
      targetMarket: `Mid-to-senior level professionals in the ${industry} sector looking for collaboration opportunities.`,
      businessModel: `Freemium model with premium features for advanced matching and collaboration tools.`,
      competitiveAdvantage: `AI-powered matching algorithm specifically designed for ${industry} professionals, combined with a focus on ${interests}.`,
      revenueStreams: [
        'Premium subscription for advanced features',
        'Transaction fees on successful collaborations',
        'Enterprise solutions for companies',
        'Advertising and sponsored content'
      ]
    },
    {
      name: `${interests} Hub`,
      tagline: `The ultimate platform for ${industry} innovation`,
      problem: `The ${industry} industry lacks a centralized platform for discovering and sharing innovations related to ${interests}.`,
      solution: `A comprehensive platform that aggregates, curates, and showcases the latest ${interests} innovations in ${industry}.`,
      targetMarket: `Entrepreneurs, investors, and enthusiasts interested in ${interests} within the ${industry} sector.`,
      businessModel: `Marketplace model connecting innovators with investors and early adopters.`,
      competitiveAdvantage: `First-mover advantage in ${interests} for ${industry}, combined with a community-driven approach.`,
      revenueStreams: [
        'Listing fees for innovators',
        'Commission on successful deals',
        'Premium analytics and insights',
        'Corporate partnership programs'
      ]
    }
  ]

  return ideas[Math.floor(Math.random() * ideas.length)]
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`AI Service: ${OPENAI_API_KEY ? 'OpenAI API configured' : 'Using mock ideas (set OPENAI_API_KEY for real AI)'}`)
})