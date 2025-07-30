import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';

const MockInterviewChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (interviewStarted && interviewQuestions.length > 0) {
      askNextQuestion();
    }
  }, [interviewStarted, interviewQuestions]);

  const startInterview = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/resume/career-coach/interview');
      if (response.data.success) {
        const { technicalQuestions, behavioralQuestions } = response.data.data;
        const allQuestions = [...technicalQuestions.slice(0, 3), ...behavioralQuestions.slice(0, 2)];
        setInterviewQuestions(allQuestions);
        setInterviewStarted(true);
        
        // Welcome message
        setMessages([{
          id: 1,
          text: "Welcome to your mock interview! I'll ask you 5 questions covering both technical and behavioral aspects. Take your time to answer thoughtfully. Let's begin! 🚀",
          sender: 'interviewer',
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    } catch (error) {
      console.error('Failed to start interview:', error);
    } finally {
      setLoading(false);
    }
  };

  const askNextQuestion = () => {
    if (currentQuestion < interviewQuestions.length) {
      const question = interviewQuestions[currentQuestion];
      setIsTyping(true);
      
      setTimeout(() => {
        const newMessage = {
          id: messages.length + 1,
          text: `Question ${currentQuestion + 1}: ${question.question}`,
          sender: 'interviewer',
          timestamp: new Date().toLocaleTimeString(),
          questionType: question.type || question.category,
          difficulty: question.difficulty
        };
        
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
      }, 1500);
    } else {
      // Interview completed
      setIsTyping(true);
      setTimeout(() => {
        const completionMessage = {
          id: messages.length + 1,
          text: "🎉 Congratulations! You've completed the mock interview. Great job answering all the questions! Remember to practice regularly and stay confident. Good luck with your real interviews!",
          sender: 'interviewer',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, completionMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(async () => {
      try {
        const response = await api.post('/api/resume/career-coach/mock-interview', {
          question: interviewQuestions[currentQuestion]?.question || '',
          answer: inputValue,
          questionType: interviewQuestions[currentQuestion]?.type || interviewQuestions[currentQuestion]?.category
        });

        if (response.data.success) {
          const aiResponse = {
            id: messages.length + 2,
            text: response.data.feedback,
            sender: 'interviewer',
            timestamp: new Date().toLocaleTimeString(),
            isFeedback: true
          };
          
          setMessages(prev => [...prev, aiResponse]);
          setCurrentQuestion(prev => prev + 1);
          
          // Ask next question after a delay
          setTimeout(() => {
            askNextQuestion();
          }, 2000);
        }
      } catch (error) {
        const errorResponse = {
          id: messages.length + 2,
          text: "Thank you for your answer! Let's move on to the next question.",
          sender: 'interviewer',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorResponse]);
        setCurrentQuestion(prev => prev + 1);
        
        setTimeout(() => {
          askNextQuestion();
        }, 2000);
      }
      setIsTyping(false);
    }, 2000);
  };

  const resetInterview = () => {
    setMessages([]);
    setCurrentQuestion(0);
    setInterviewStarted(false);
    setInterviewQuestions([]);
    setInputValue('');
    setIsTyping(false);
  };

  if (!interviewStarted) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-blue-900 to-black min-h-screen flex items-center justify-center px-2 sm:px-4">
        <div className="w-full max-w-2xl text-center p-4 sm:p-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-gray-700">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">🎤 Mock Interview</h1>
            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
              Practice your interview skills with AI-powered questions tailored to your profile. 
              Get real-time feedback and improve your confidence!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl mb-2">💻</div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Technical Questions</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Based on your skills</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl mb-2">🧠</div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Behavioral Questions</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Soft skills assessment</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl mb-2">📊</div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Real-time Feedback</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Instant improvement tips</p>
              </div>
            </div>
            
            <button
              onClick={startInterview}
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Starting...' : 'Start Mock Interview'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-blue-900 to-black min-h-screen">
      <div className="w-full px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Mock Interview Session</h1>
            <p className="text-gray-300 text-sm sm:text-base">Question {currentQuestion} of {interviewQuestions.length}</p>
          </div>
          <button
            onClick={resetInterview}
            className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
          >
            End Interview
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4 sm:mb-6">
          <div 
            className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / interviewQuestions.length) * 100}%` }}
          ></div>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 h-80 sm:h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-cyan-600 text-white'
                      : message.isFeedback
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.sender === 'interviewer' && !message.isFeedback && (
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                      <span className="text-cyan-400 text-xs sm:text-sm">🤖 AI Interviewer</span>
                      {message.questionType && (
                        <span className="text-xs bg-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                          {message.questionType}
                        </span>
                      )}
                      {message.difficulty && (
                        <span className="text-xs bg-orange-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                          {message.difficulty}
                        </span>
                      )}
                    </div>
                  )}
                  {message.isFeedback && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-200 text-xs sm:text-sm">💡 Feedback</span>
                    </div>
                  )}
                  <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer here..."
                className="flex-1 bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                disabled={isTyping || currentQuestion >= interviewQuestions.length}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping || currentQuestion >= interviewQuestions.length}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 sm:mt-6 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">💡 Interview Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
            <div>• Be specific with examples</div>
            <div>• Use the STAR method (Situation, Task, Action, Result)</div>
            <div>• Stay calm and take your time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewChat;
