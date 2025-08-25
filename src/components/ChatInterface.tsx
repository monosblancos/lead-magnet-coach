import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, User, Lightbulb, Zap, Users, Target } from "lucide-react";

interface ChatInterfaceProps {
  onLeadCapture: () => void;
  onShowPricing: () => void;
  selectedTechnique: any;
}

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickSuggestions = [
  "Necesito técnicas de brainstorming",
  "¿Cómo energizar mi equipo?",
  "Técnicas para tomar decisiones",
  "Ideas para abrir una reunión"
];

export const ChatInterface = ({ onLeadCapture, onShowPricing, selectedTechnique }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: '¡Hola! Soy tu Coach de Facilitación IA. Tengo acceso a más de 150 técnicas profesionales para ayudarte a facilitar sesiones exitosas. ¿Qué tipo de facilitación necesitas hoy?',
      timestamp: new Date(),
      suggestions: quickSuggestions
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedTechnique) {
      handleSuggestionClick(`Cuéntame más sobre ${selectedTechnique.title}`);
    }
  }, [selectedTechnique]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('brainstorming') || lowerMessage.includes('ideas')) {
      return `🧠 Excelente pregunta sobre brainstorming. Te recomiendo la técnica "Tormenta de Ideas Visual" - una metodología que incrementa la creatividad hasta un 40%.\n\n✨ Esta técnica utiliza representaciones visuales para estimular nuevas perspectivas y generar ideas innovadoras.\n\n⏰ Duración: 20-30 minutos\n👥 Ideal para grupos de 3-20 personas\n⭐ Rating: 4.7/5 usado por más de 634 facilitadores\n\n¿Te gustaría conocer el manual completo con todas las instrucciones paso a paso?`;
    }
    
    if (lowerMessage.includes('energizar') || lowerMessage.includes('energía') || lowerMessage.includes('equipo')) {
      return `⚡ ¡Perfecto! Para energizar equipos recomiendo "Velocidad de la Energía" - una técnica probada que incrementa la concentración del grupo.\n\n🎯 Es un activador físico muy efectivo que funciona en 3-5 minutos.\n\n👥 Funciona para grupos de 5-100 personas\n⭐ Rating: 4.5/5 - Usada 1156 veces por facilitadores\n📊 Tags: energía, movimiento, concentración, activación\n\n¿Quieres acceso a más técnicas energizantes en el manual completo?`;
    }
    
    if (lowerMessage.includes('decisiones') || lowerMessage.includes('decidir')) {
      return `🎯 Para tomar decisiones grupales efectivas, tengo varias técnicas profesionales comprobadas.\n\n💡 Las más efectivas incluyen metodologías de consenso, matrices de decisión y técnicas de priorización.\n\n📚 En el Manual Completo encontrarás más de 20 técnicas específicas para toma de decisiones, con instrucciones detalladas y casos de uso.\n\n¿Te interesa conocer el análisis completo de competencias en toma de decisiones?`;
    }
    
    if (lowerMessage.includes('reunión') || lowerMessage.includes('abrir') || lowerMessage.includes('comenzar')) {
      return `🚀 Excelente pregunta sobre icebreakers. Tengo técnicas específicas para diferentes tipos de apertura:\n\n• Conexiones rápidas (2-5 min)\n• Energizadores grupales (5-10 min) \n• Construcción de confianza (10-15 min)\n\n🎪 Una técnica muy efectiva es el "Storytelling Colaborativo" que integra perspectivas diversas y genera visión compartida desde el inicio.\n\n⏰ 25-40 minutos | 👥 6-20 personas | ⭐ 4.6/5\n\n¿Quieres el manual con más de 30 técnicas de apertura?`;
    }

    if (selectedTechnique && lowerMessage.includes(selectedTechnique.title.toLowerCase())) {
      return `📋 Perfecto, te cuento más sobre "${selectedTechnique.title}":\n\n${selectedTechnique.description}\n\n📊 Detalles:\n⏰ Duración: ${selectedTechnique.duration}\n👥 Tamaño de grupo: ${selectedTechnique.groupSize}\n🎯 Nivel: ${selectedTechnique.level}\n⭐ Rating: ${selectedTechnique.rating}/5\n\n🏷️ Tags: ${selectedTechnique.tags.join(', ')}\n\nEsta técnica está incluida en nuestro Manual Completo con instrucciones paso a paso, variaciones y casos de uso reales. ¿Te interesa acceder al manual completo?`;
    }
    
    return `🤖 Entiendo tu consulta sobre facilitación. Tengo más de 150 técnicas profesionales organizadas por categorías:\n\n🧠 Brainstorming e Innovación\n⚡ Energizadores y Activadores\n🤝 Construcción de Equipos\n🎯 Toma de Decisiones\n📖 Storytelling y Narrativa\n\nCada técnica incluye duración, tamaño de grupo ideal, nivel de dificultad y rating de efectividad.\n\n¿Sobre qué categoría te gustaría saber más? O puedes obtener el análisis completo de competencias personalizado.`;
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const botResponse = generateBotResponse(content);
    const botMessage: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      suggestions: Math.random() > 0.5 ? [
        "Ver manual completo",
        "Análisis de competencias",
        "Más técnicas similares",
        "Compartir esta técnica"
      ] : undefined
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);

    // Trigger lead capture opportunity after certain interactions
    if (messages.length > 3 && Math.random() > 0.6) {
      setTimeout(() => {
        toast({
          title: "💡 ¿Te está siendo útil?",
          description: "Obtén acceso completo a todas las técnicas con 30% descuento",
          action: (
            <Button size="sm" onClick={onShowPricing}>
              Ver Oferta
            </Button>
          ),
          duration: 8000,
        });
      }, 3000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Ver manual completo") {
      onShowPricing();
      return;
    }
    if (suggestion === "Análisis de competencias") {
      onLeadCapture();
      return;
    }
    handleSendMessage(suggestion);
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-card border-0 shadow-soft">
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-white shadow-soft'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
                
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-soft">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-muted-foreground mb-3">Sugerencias rápidas:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t bg-white/50">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe tu situación o el tipo de técnica que necesitas..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Presiona Enter para enviar • Shift+Enter para nueva línea
          </p>
        </div>
      </CardContent>
    </Card>
  );
};