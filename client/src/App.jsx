import React, { useState } from 'react'
import './App.css'

function App() {
  const [industry, setIndustry] = useState('')
  const [interests, setInterests] = useState('')
  const [skills, setSkills] = useState('')
  const [idea, setIdea] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateIdea = async () => {
    if (!industry || !interests || !skills) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    setIdea(null)

    try {
      const response = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry,
          interests,
          skills
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setIdea(data)
      } else {
        setError(data.error || 'Failed to generate idea')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🚀 AI Startup Co-Founder Agent</h1>
          <p>Generate innovative startup ideas tailored to your skills and interests</p>
        </header>

        <div className="input-section">
          <div className="form-group">
            <label htmlFor="industry">Industry *</label>
            <input
              id="industry"
              type="text"
              placeholder="e.g., Healthcare, FinTech, E-commerce"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="interests">Interests *</label>
            <input
              id="interests"
              type="text"
              placeholder="e.g., AI, sustainability, blockchain"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills *</label>
            <input
              id="skills"
              type="text"
              placeholder="e.g., Programming, Marketing, Design"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <button 
            className="generate-btn"
            onClick={generateIdea}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Startup Idea'}
          </button>

          {error && <div className="error">{error}</div>}
        </div>

        {idea && (
          <div className="idea-section">
            <h2>💡 Your Startup Idea</h2>
            <div className="idea-card">
              <h3>{idea.name}</h3>
              <p className="tagline">{idea.tagline}</p>
              
              <div className="idea-details">
                <div className="detail-section">
                  <h4>Problem</h4>
                  <p>{idea.problem}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Solution</h4>
                  <p>{idea.solution}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Target Market</h4>
                  <p>{idea.targetMarket}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Business Model</h4>
                  <p>{idea.businessModel}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Competitive Advantage</h4>
                  <p>{idea.competitiveAdvantage}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Revenue Streams</h4>
                  <ul>
                    {idea.revenueStreams.map((stream, index) => (
                      <li key={index}>{stream}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App