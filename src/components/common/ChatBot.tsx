import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm VedBot, your AI IT Support Assistant. How can I help you today? You can ask about our services, AMC plans, or how to raise a ticket.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested Actions
  const suggestions = [
    "Our Services",
    "AMC Plans",
    "Raise a Ticket",
    "Contact Details"
  ];

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    document.addEventListener('open-chatbot', handleOpenChat);
    return () => document.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);


  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    handleSend(suggestion);
  };

  const handleSend = (overrideInput?: any) => {
    const textToSend = typeof overrideInput === 'string' ? overrideInput : input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const botResponse = generateResponse(textToSend);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('price') || q.includes('cost') || q.includes('amc') || q.includes('plan')) {
      return "We offer flexible AMC (Annual Maintenance Contract) plans starting from basic support for small offices to comprehensive enterprise packages. You can view all details on our 'AMC Plans' page or I can give you a quick quote if you describe your infrastructure!";
    }
    
    if (q.includes('service') || q.includes('what do you do')) {
      return "VedTech Services provides complete IT solutions: Hardware Repair (Laptops, Printers), Software Development (Web & Apps), Networking (LAN/Wi-Fi), and 24/7 IT Support. Is there a specific service you're interested in?";
    }

    if (q.includes('ticket') || q.includes('support') || q.includes('help')) {
      return "To get technical help, you can raise a support ticket on our 'Support' page. I can also help you track an existing ticket if you provide the Ticket ID! Once submitted, our engineers will contact you within 4 hours. Would you like me to guide you there?";
    }

    if (q.includes('vts-')) {
      return "I see you're providing a Ticket ID. Please use the 'Track Ticket Status' tool on our Support page for real-time updates from our system. Would you like me to take you there?";
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('call')) {
      return "You can reach us at +91 7858971869 or email vedtechservicess@gmail.com. We also offer on-site support in Bihar and surrounding regions.";
    }

    if (q.includes('about') || q.includes('who are you')) {
      return "VedTech Services is an IT firm founded by Chandan Kumar Yajee and co-founded by Arpit Singh Parihar, focused on providing 'One Call - All IT Solutions'. We are part of the VedArambh initiative.";
    }

    return "That's interesting! To provide the most accurate assistance for your IT needs, I recommend speaking with one of our human experts at +91 7858971869 or raising a ticket. Anything else I can help with?";
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-[350px] md:w-[400px] h-[500px] shadow-2xl border-2 animate-in slide-in-from-bottom-5 duration-300 flex flex-col mb-4">
          <CardHeader className="bg-primary text-white p-4 rounded-t-lg flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span>VedBot AI</span>
                <span className="text-[10px] text-blue-100 font-normal">Active Support Agent</span>
              </div>
            </CardTitle>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden bg-slate-50 flex flex-col">
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm", 
                    m.sender === 'user' ? "ml-auto bg-primary text-primary-foreground shadow-md" : "bg-white border text-slate-900 shadow-sm")}>
                    {m.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex w-max max-w-[80%] items-center gap-2 rounded-lg bg-white border px-3 py-2 text-sm text-slate-500">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    VedBot is typing...
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="p-3 bg-slate-50 border-t flex flex-wrap gap-2">
              {suggestions.map((s, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="bg-white hover:bg-primary hover:text-white cursor-pointer transition-colors px-2 py-1 text-[10px]"
                  onClick={() => handleSuggestion(s)}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="p-3 bg-white border-t">
            <div className="flex w-full gap-2">
              <Input 
                placeholder="Type your question..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      <Button 
        size="lg" 
        className={cn("h-14 w-14 rounded-full shadow-2xl transition-all duration-300", 
          isOpen ? "rotate-90 bg-slate-900" : "bg-primary hover:scale-110")}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
      </Button>
    </div>
  );
};

export default ChatBot;
