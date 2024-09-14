import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import chatImage from '../../public/chat.png';
import ReactMarkdown from "react-markdown";

function Chat() {
  const [showChat, setShowChat] = useState(false);
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatEndRef = useRef(null);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    
    // Add the question to the conversation
    const newQuestionMessage = { text: question, type: 'question' };
    setConversation(conversation => [...conversation, newQuestionMessage]);

    setQuestion('');
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAJ8Tu7UJG_tjHrZ512CH-vRkrWho6xJU4`,
        { contents: [{ parts: [{ text: question }] }] }
      );

      const answerMessage = {
        text: response.data.candidates[0].content.parts[0].text,
        type: 'answer'
      };

      // Add the answer to the conversation
      setConversation(conversation => [...conversation, answerMessage]);
    } catch (error) {
      console.log(error);
      const errorMessage = { text: "Sorry - Something went wrong. Please try again!", type: 'answer' };
      setConversation(conversation => [...conversation, errorMessage]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed right-10 bottom-8 w-14 h-10 py-2 px-4 rounded-full" style={{ zIndex: "100" }}>
      <button
        onClick={toggleChat}
        className="w-14 h-10 bg-gray-400 text-white py-2 px-4 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      >
        <img className="w-8" src={chatImage} alt="Chatbot" />
      </button>

      {showChat && (
        <div className="fixed bottom-20 right-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
              <h2 className="text-xl font-bold">Chat Support</h2>
              <button
                onClick={toggleChat}
                className="text-gray-600 hover:text-gray-400"
              >
                Close
              </button>
            </div>
            <div className="h-60 overflow-y-auto px-4 py-2">
              {conversation.map((message, index) => (
                <div key={index} className={`mb-2 max-w-xs ${message.type === 'question' ? 'text-right' : 'text-left'}`}>
                  <div className={`bg-${message.type === 'question' ? 'blue-500' : 'gray-200'} text-${message.type === 'question' ? 'white' : 'gray-800'} rounded-lg p-2`}>
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                    <p className="text-xs text-gray-500 text-right mt-1">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {generatingAnswer && (
                <div className="flex items-center justify-end">
                  <div className="animate-bounce mr-2">...</div>
                  <div className="text-gray-600">Generating answer...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="px-4 py-2 border-t border-gray-200">
              <form onSubmit={generateAnswer} className="flex">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-l-full border border-gray-200 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={generatingAnswer || !question.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;