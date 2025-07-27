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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h1 className="text-4xl font-bold text-white mb-6">🎤 Mock Interview</h1>
            <p className="text-gray-300 text-lg mb-8">
              Practice your interview skills with AI-powered questions tailored to your profile. 
              Get real-time feedback and improve your confidence!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-2xl mb-2">💻</div>
                <h3 className="text-white font-semibold">Technical Questions</h3>
                <p className="text-gray-400 text-sm">Based on your skills</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-2xl mb-2">🗣️</div>
                <h3 className="text-white font-semibold">Behavioral Questions</h3>
                <p className="text-gray-400 text-sm">Soft skills assessment</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="text-white font-semibold">Real-time Feedback</h3>
                <p className="text-gray-400 text-sm">Instant improvement tips</p>
              </div>
            </div>

            <button
              onClick={startInterview}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Preparing Interview...
                </span>
              ) : (
                'Start Mock Interview'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Mock Interview Session</h1>
            <p className="text-gray-300">Question {currentQuestion} of {interviewQuestions.length}</p>
          </div>
          <button
            onClick={resetInterview}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            End Interview
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / interviewQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-cyan-600 text-white'
                      : message.isFeedback
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.sender === 'interviewer' && !message.isFeedback && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-cyan-400 text-sm">🤖 AI Interviewer</span>
                      {message.questionType && (
                        <span className="text-xs bg-gray-600 px-2 py-1 rounded">
                          {message.questionType}
                        </span>
                      )}
                      {message.difficulty && (
                        <span className="text-xs bg-orange-600 px-2 py-1 rounded">
                          {message.difficulty}
                        </span>
                      )}
                    </div>
                  )}
                  {message.isFeedback && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-200 text-sm">💡 Feedback</span>
                    </div>
                  )}
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
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
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer here..."
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isTyping || currentQuestion >= interviewQuestions.length}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping || currentQuestion >= interviewQuestions.length}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-2">💡 Interview Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
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
