import './App.css'
import Button from './components/Button'
import Card from './components/Card'
import Alert from './components/Alert'

function App() {
  const handleButtonClick = (variant: string) => {
    alert(`${variant} button clicked!`)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Component Showcase</h1>
        <p>A collection of reusable React components - Now with TestivAI Visual Regression Testing!</p>
        <div className="header-badge">
          <span className="badge">✨ Updated with TestivAI Witness v0.1.19</span>
        </div>
      </header>

      <main className="app-main">
        {/* Alert Components Section */}
        <section className="component-section">
          <h2>Alert Components</h2>
          <div className="alerts-container">
            <Alert status="success">
              Your changes have been saved successfully!
            </Alert>
            <Alert status="error">
              There was an error processing your request. Please try again.
            </Alert>
          </div>
        </section>

        {/* Button Components Section */}
        <section className="component-section">
          <h2>Button Components</h2>
          <div className="buttons-container">
            <Button 
              variant="primary" 
              onClick={() => handleButtonClick('Primary')}
            >
              Primary Button
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleButtonClick('Secondary')}
            >
              Secondary Button
            </Button>
            <Button 
              variant="primary" 
              disabled
            >
              Disabled Button
            </Button>
            <Button 
              variant="secondary"
              onClick={() => handleButtonClick('Secondary with long text')}
            >
              Button with Longer Text
            </Button>
          </div>
        </section>

        {/* Card Components Section */}
        <section className="component-section">
          <h2>Card Components</h2>
          <div className="cards-container">
            <Card
              title="Beautiful Landscape"
              text="Discover breathtaking views and natural wonders in this stunning landscape photography collection. Perfect for nature enthusiasts and photography lovers."
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              imageAlt="Beautiful mountain landscape with lake reflection"
            />
            <Card
              title="Modern Architecture"
              text="Explore contemporary architectural designs that blend form and function. These innovative structures represent the future of urban development."
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
              imageAlt="Modern glass building with geometric design"
            />
            <Card
              title="Technology Innovation"
              text="Stay ahead of the curve with the latest technological innovations. From AI to sustainable energy, discover what's shaping our future."
              image="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
              imageAlt="Abstract technology and innovation concept"
            />
          </div>
        </section>

        {/* TestivAI Integration Section */}
        <section className="component-section">
          <h2>🧪 TestivAI Visual Regression Testing</h2>
          <div className="testivai-info">
            <Alert status="success">
              This application now includes automated visual regression testing with TestivAI!
            </Alert>
            <div className="testivai-features">
              <h3>Features Included:</h3>
              <ul>
                <li>✅ Automated screenshot comparison</li>
                <li>✅ GitHub Actions integration</li>
                <li>✅ PR comment approvals with <code>/approve-visuals</code></li>
                <li>✅ Responsive design testing</li>
                <li>✅ Component-level visual testing</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React, TypeScript, Vite, and TestivAI Visual Regression Testing</p>
      </footer>
    </div>
  )
}

export default App
