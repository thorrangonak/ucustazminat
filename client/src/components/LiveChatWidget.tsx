import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  X, MessageCircle, Minimize2, Maximize2, Send, 
  Bot, User, Clock 
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: Date;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Başlangıç mesajı
      if (messages.length === 0) {
        setTimeout(() => {
          addBotMessage(
            'Merhaba! 👋 Ben UçuşTazminat asistanınız. Size nasıl yardımcı olabilirim?'
          );
        }, 500);
      }
    }
  }, [isOpen]);

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addUserMessage(userMessage);
    setIsTyping(true);

    // Simüle edilmiş bot yanıtı
    setTimeout(() => {
      const responses = [
        'Bu konuda size yardımcı olabilirim. Hangi konuda bilgi almak istersiniz?',
        'Talebiniz için tazminat hesaplaması yapabilir miyim?',
        'Biniş kartınızı taratarak otomatik bilgi alabilirsiniz. Ana sayfadaki "Biniş Kartı Tara" butonunu kullanın.',
        'Hesabınıza giriş yaptıktan sonra Dashboard bölümünden taleplerinizi takip edebilirsiniz.',
        'Komisyon oranımız %25\'dir. Başarılı olamazsak hiçbir ücret talep etmiyoruz (No Win No Fee).',
        'Daha detaylı yardımcı olmamı ister misiniz?'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addBotMessage(randomResponse);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary hover:bg-primary/90 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Live Chat"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        {messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-background rounded-lg shadow-2xl border border-border overflow-hidden transition-all ${
      isMinimized ? 'w-80' : 'w-[400px] h-[600px]'
    }`}>
      {/* Header */}
      <div className="bg-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="text-white">
            <h3 className="font-semibold">Canlı Destek</h3>
            <p className="text-xs text-white/80">Size nasıl yardımcı olabilirim?</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[440px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary' 
                      : message.type === 'bot' 
                        ? 'bg-blue-500' 
                        : 'bg-green-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : message.type === 'bot' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-lg p-3 text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-secondary'
                    }`}>
                      {message.text}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
