import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, CheckCircle, Clock, Users, Star, Zap } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCapture: () => void;
}

export const PricingModal = ({ isOpen, onClose, onLeadCapture }: PricingModalProps) => {
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 56); // 14:56 minutes
  const { toast } = useToast();

  // Countdown timer effect would go here in real implementation
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePurchase = () => {
    toast({
      title: "Redirigiendo al pago...",
      description: "Te llevamos a la página de pago seguro",
    });
    
    // In real implementation, redirect to payment processor
    setTimeout(() => {
      onClose();
      onLeadCapture();
    }, 2000);
  };

  const features = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "150+ Técnicas Profesionales",
      description: "Acceso completo a nuestra biblioteca de técnicas probadas"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Guías Paso a Paso",
      description: "Instrucciones detalladas para cada técnica"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Casos de Estudio Reales",
      description: "Ejemplos de implementación exitosa"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Adaptaciones por Contexto",
      description: "Variantes, tamaño, grupos grandes y más"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">Manual Completo de Facilitación</DialogTitle>
          <p className="text-muted-foreground">
            150+ técnicas profesionales con descuento especial
          </p>
        </DialogHeader>

        {/* Timer */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Oferta por tiempo limitado</span>
          </div>
          <div className="text-2xl font-bold text-destructive">
            Esta oferta expira en: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-4xl font-bold text-success">$47</div>
            <div className="text-2xl text-muted-foreground line-through">$67</div>
            <Badge className="bg-warning text-warning-foreground text-lg px-3 py-1">
              30% OFF
            </Badge>
          </div>
          <p className="text-muted-foreground">Precio especial por lanzamiento</p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="font-semibold">Incluye:</h3>
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
            <span className="text-muted-foreground">- Más de 1,200 facilitadores</span>
          </div>
          <blockquote className="text-sm italic text-muted-foreground">
            "Este manual transformó completamente mi forma de facilitar. Las técnicas son 
            prácticas y efectivas."
          </blockquote>
          <cite className="text-xs text-muted-foreground">- María González, Facilitadora Senior</cite>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90 text-lg h-12"
            onClick={handlePurchase}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Obtener Manual Ahora
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              onClose();
              onLeadCapture();
            }}
          >
            Ver análisis de competencias gratuito
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            💳 Pago seguro • 📧 Entrega inmediata • 🔄 Garantía de 30 días
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};