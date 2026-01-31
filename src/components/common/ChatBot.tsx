import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! Welcome to VedTech Services. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    'I need IT support',
    'Request a quote',
    'Book a service',
    'Talk to expert'
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages([...messages, { type: 'user', text: inputMessage }]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = inputMessage.toLowerCase();

      if (lowerInput.includes('support') || lowerInput.includes('help')) {
        botResponse = 'I can help you with that! Please raise a ticket on our Support page or call us at +91 7370057723 for immediate assistance.';
      } else if (lowerInput.includes('quote') || lowerInput.includes('price')) {
        botResponse = 'I\'d be happy to provide a quote! Please visit our Contact page or call +91 7370057723 to discuss your requirements.';
      } else if (lowerInput.includes('service') || lowerInput.includes('book')) {
        botResponse = 'Great! You can book our services by visiting the Support page to raise a ticket, or contact us directly at +91 7370057723.';
      } else {
        botResponse = 'Thank you for your message! For immediate assistance, please call us at +91 7370057723 or email vedtechservice@gmail.com. Our team is here to help!';
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Open chat"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold">VedTech Support</div>
                <div className="text-xs text-blue-100">Online now</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 rounded-bl-none shadow-sm border'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-white border-t">
              <div className="text-xs text-slate-500 mb-2">Quick replies:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
