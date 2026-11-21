import React, { useState } from 'react';
import './PlantQuiz.css';
import productsData from '../Product/Productdata';

const QUIZ_QUESTIONS = [
  {
    id: 'light',
    question: 'Where will your new plant friend live?',
    subtitle: 'Lighting is the #1 secret to plant happiness.',
    options: [
      { label: 'Bright Direct Sunlight', sub: 'Sunny windowsill, patio, sunroom', value: 'bright', icon: '☀️' },
      { label: 'Medium Indirect Light', sub: 'Bright room away from direct rays', value: 'medium', icon: '🌤️' },
      { label: 'Low / Ambient Light', sub: 'North-facing window, hallway, office', value: 'low', icon: '☁️' }
    ]
  },
  {
    id: 'water',
    question: 'How is your watering schedule?',
    subtitle: 'Be honest — there is a perfect plant for every habit!',
    options: [
      { label: 'I Often Forget to Water', sub: 'Drought-tolerant survivors preferred', value: 'low', icon: '🌵' },
      { label: 'I Love a Weekly Routine', sub: 'Regular Saturday morning watering', value: 'moderate', icon: '💧' },
      { label: 'I Tend to Overwater', sub: 'Moisture-loving lush tropicals', value: 'high', icon: '💦' }
    ]
  },
  {
    id: 'pet',
    question: 'Do you have furry companions at home?',
    subtitle: 'Keep your cats and dogs safe with non-toxic choices.',
    options: [
      { label: 'Yes, Curious Pets!', sub: 'Must be 100% non-toxic & pet-safe', value: 'safe', icon: '🐾' },
      { label: 'No Pets / High Shelves', sub: 'Any plant is welcome', value: 'any', icon: '🪴' }
    ]
  },
  {
    id: 'goal',
    question: 'What is your top plant goal?',
    subtitle: 'Tell us the vibe you are looking to create.',
    options: [
      { label: 'Purify Indoor Air', sub: 'Filter toxins & boost fresh oxygen', value: 'air', icon: '🍃' },
      { label: 'Jungle Aesthetic Drama', sub: 'Showstopping giant statement leaves', value: 'drama', icon: '🌿' },
      { label: 'Zero-Fuss Greenery', sub: 'Indestructible, chill desk companion', value: 'easy', icon: '✨' }
    ]
  }
];

function PlantQuiz({ onAddToCart, onOpenProductModal }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelectOption = (questionId, value) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (finalAnswers) => {
    setIsCalculating(true);
    setTimeout(() => {
      let match = productsData[0]; // default Golden Pothos

      if (finalAnswers.pet === 'safe') {
        if (finalAnswers.water === 'low') {
          // Rosette Succulent
          match = productsData.find((p) => p.id === 5) || productsData[1];
        } else {
          // Calathea Orbifolia
          match = productsData.find((p) => p.id === 2) || productsData[1];
        }
      } else if (finalAnswers.light === 'bright' && finalAnswers.water === 'low') {
        // Aloe Vera or Succulent
        match = productsData.find((p) => p.id === 6) || productsData[4];
      } else if (finalAnswers.goal === 'drama') {
        // Monstera Deliciosa
        match = productsData.find((p) => p.id === 4) || productsData[2];
      } else if (finalAnswers.goal === 'air' || finalAnswers.light === 'low') {
        // Golden Pothos or Dracaena
        match = productsData.find((p) => p.id === 1) || productsData[6];
      } else if (finalAnswers.water === 'moderate') {
        // Begonia or Weeping fig
        match = productsData.find((p) => p.id === 8) || productsData[2];
      }

      setResult({
        plant: match,
        matchScore: 98,
        matchReason: `Based on your ${finalAnswers.light || 'ambient'} light and ${finalAnswers.water === 'low' ? 'low-maintenance' : 'routine'} watering habit, ${match.name} will flourish in your space!`
      });
      setIsCalculating(false);
    }, 700);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const q = QUIZ_QUESTIONS[currentStep];

  return (
    <section className="plant-quiz-section" id="quiz">
      <div className="container">
        <div className="quiz-header">
          <span className="section-badge">✨ Interactive Matchmaker</span>
          <h2 className="section-title">Find Your Perfect Plant Soulmate</h2>
          <p className="section-subtitle">
            Answer 4 quick questions and our botanical algorithm will match you with the plant that thrives in your lifestyle.
          </p>
        </div>

        <div className="quiz-container-box">
          {isCalculating ? (
            <div className="quiz-loading-state">
              <div className="quiz-spinner">🌱</div>
              <h3>Analyzing your living conditions...</h3>
              <p>Matching light levels, humidity, and pet-safety parameters.</p>
            </div>
          ) : result ? (
            <div className="quiz-result-view">
              <div className="result-match-badge">
                🎉 {result.matchScore}% Perfect Match Found!
              </div>

              <div className="result-card-layout">
                <div className="result-img-box">
                  <img src={result.plant.image} alt={result.plant.name} />
                </div>

                <div className="result-details-box">
                  <span className="result-category">{result.plant.category}</span>
                  <h3 className="result-plant-name">{result.plant.name}</h3>
                  <p className="result-scientific">
                    <em>{result.plant.scientificName}</em>
                  </p>
                  <p className="result-reason">{result.matchReason}</p>

                  <div className="result-specs-row">
                    <div className="spec-pill">
                      <span>☀️</span> {result.plant.care?.light}
                    </div>
                    <div className="spec-pill">
                      <span>💧</span> {result.plant.care?.water}
                    </div>
                    <div className="spec-pill">
                      <span>🐾</span> {result.plant.care?.petSafe ? 'Pet Friendly' : 'Keep Away From Pets'}
                    </div>
                  </div>

                  <div className="result-price-row">
                    <span className="result-price">${result.plant.price.toFixed(2)}</span>
                    <button
                      className="result-add-cart-btn"
                      onClick={() => onAddToCart(result.plant)}
                    >
                      Add Plant to Cart 🛒
                    </button>
                    <button
                      className="result-view-btn"
                      onClick={() => onOpenProductModal(result.plant)}
                    >
                      Quick View 👁️
                    </button>
                  </div>
                </div>
              </div>

              <div className="quiz-restart-box">
                <button className="quiz-restart-btn" onClick={resetQuiz}>
                  ↺ Retake Quiz with Different Preferences
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-step-view">
              {/* Progress bar */}
              <div className="quiz-progress-bar-wrapper">
                <div className="quiz-progress-labels">
                  <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="quiz-progress-track">
                  <div
                    className="quiz-progress-fill"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="quiz-question-header">
                <h3>{q.question}</h3>
                <p>{q.subtitle}</p>
              </div>

              <div className="quiz-options-grid">
                {q.options.map((opt) => (
                  <button
                    key={opt.value}
                    className="quiz-option-card"
                    onClick={() => handleSelectOption(q.id, opt.value)}
                  >
                    <span className="opt-icon">{opt.icon}</span>
                    <div className="opt-text">
                      <strong>{opt.label}</strong>
                      <small>{opt.sub}</small>
                    </div>
                    <span className="opt-arrow">➜</span>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <div className="quiz-nav-row">
                  <button
                    className="quiz-back-btn"
                    onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PlantQuiz;
