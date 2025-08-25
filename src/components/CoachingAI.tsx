import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TechniqueCard } from "./TechniqueCard";
import { ChatInterface } from "./ChatInterface";
import { LeadCaptureModal } from "./LeadCaptureModal";
import { PricingModal } from "./PricingModal";
import { useToast } from "@/hooks/use-toast";
import { Brain, Sparkles, Users, Clock, Award, BookOpen } from "lucide-react";

const techniques = [
  {
    id: 1,
    title: "Velocidad de la Energía",
    category: "Energizante",
    level: "Principiante",
    duration: "3-5 min",
    groupSize: "5-100 personas",
    rating: 4.5,
    tags: ["energía", "movimiento", "concentración", "activación"],
    description: "Activador físico que incrementa energía y concentración del grupo",
    icon: "⚡",
    color: "bg-gradient-to-br from-orange-400 to-red-500"
  },
  {
    id: 2,
    title: "Storytelling Colaborativo",
    category: "Colaboración",
    level: "Intermedio",
    duration: "25-40 min",
    groupSize: "6-20 personas",
    rating: 4.6,
    tags: ["narrativa", "visión compartida", "creatividad", "integración"],
    description: "Crear narrativas grupales que integren perspectivas diversas y generen visión compartida",
    icon: "📖",
    color: "bg-gradient-to-br from-blue-400 to-purple-500"
  },
  {
    id: 3,
    title: "Tormenta de Ideas Visual",
    category: "Brainstorming",
    level: "Intermedio",
    duration: "20-30 min",
    groupSize: "3-20 personas",
    rating: 4.7,
    tags: ["creatividad", "visual", "ideas", "innovación"],
    description: "Generar ideas usando objetos y representaciones visuales para estimular creatividad",
    icon: "🎨",
    color: "bg-gradient-to-br from-pink-400 to-rose-500"
  }
];

export const CoachingAI = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<any>(null);
  const { toast } = useToast();

  const handleTechniqueSelect = (technique: any) => {
    setSelectedTechnique(technique);
  };

  const handleLeadCapture = () => {
    setShowLeadModal(true);
  };

  const handleShowPricing = () => {
    setShowPricingModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 shadow-elegant">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">Coach de Facilitación IA</h1>
          </div>
          <p className="text-primary-foreground/90">Tu asistente experto en técnicas de facilitación</p>
        </div>
      </div>

      {/* Lead Capture Banner */}
      <div className="bg-gradient-hero text-white p-4 shadow-glow">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Manual Completo de Facilitación</h3>
                    <p className="text-white/90">150+ técnicas profesionales con descuento especial</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">$47</div>
                    <div className="text-white/70 line-through">$67</div>
                    <Badge className="bg-warning text-warning-foreground">30% OFF</Badge>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 shadow-soft"
                    onClick={handleShowPricing}
                  >
                    Obtener Manual
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface 
              onLeadCapture={handleLeadCapture}
              onShowPricing={handleShowPricing}
              selectedTechnique={selectedTechnique}
            />
          </div>

          {/* Techniques Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Técnicas Destacadas</h2>
                </div>
                <div className="space-y-4">
                  {techniques.map((technique) => (
                    <TechniqueCard 
                      key={technique.id}
                      technique={technique}
                      onSelect={handleTechniqueSelect}
                      onLeadCapture={handleLeadCapture}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Tu Progreso</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Técnicas vistas
                    </span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Tiempo ahorrado
                    </span>
                    <span className="font-semibold">2h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Mensajes enviados
                    </span>
                    <span className="font-semibold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-elegant">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recomendadas para TI</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <p className="font-medium">El Momento Decisivo</p>
                      <p className="text-sm text-primary-foreground/80">Activar recursos emocionales que conecten con el timing...</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <p className="font-medium">La Conexión Inmediata</p>
                      <p className="text-sm text-primary-foreground/80">Proceso rápido para crear confianza instant...</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <p className="font-medium">Velocidad de la Energía</p>
                      <p className="text-sm text-primary-foreground/80">Activador físico que incrementa energía y concentración...</p>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-white text-primary hover:bg-white/90" 
                  onClick={handleShowPricing}
                >
                  Manual Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <LeadCaptureModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)} 
      />
      <PricingModal 
        isOpen={showPricingModal} 
        onClose={() => setShowPricingModal(false)} 
        onLeadCapture={handleLeadCapture}
      />
    </div>
  );
};