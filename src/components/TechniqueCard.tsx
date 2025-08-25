import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, Star, Eye, Play, Share, Mail } from "lucide-react";

interface TechniqueCardProps {
  technique: {
    id: number;
    title: string;
    category: string;
    level: string;
    duration: string;
    groupSize: string;
    rating: number;
    tags: string[];
    description: string;
    icon: string;
    color: string;
  };
  onSelect: (technique: any) => void;
  onLeadCapture: () => void;
}

export const TechniqueCard = ({ technique, onSelect, onLeadCapture }: TechniqueCardProps) => {
  const { toast } = useToast();

  const handleShare = (platform: 'whatsapp' | 'email') => {
    const message = `🚀 Te comparto esta técnica de facilitación increíble: "${technique.title}"\n\n📋 ${technique.description}\n\n⏱️ Duración: ${technique.duration}\n👥 Grupo: ${technique.groupSize}\n⭐ Rating: ${technique.rating}/5\n\n💡 ¿Quieres acceso a más de 150 técnicas profesionales? Descubre nuestro Manual Completo de Facilitación con 30% de descuento.\n\n🎯 Obtén tu análisis de competencias personalizado: https://facilita-ai-coach.lovable.app/`;
    
    if (platform === 'whatsapp') {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Show lead capture after sharing
      setTimeout(() => {
        toast({
          title: "¡Gracias por compartir!",
          description: "¿Te gustaría recibir más técnicas como esta por correo?",
          duration: 5000,
        });
        setTimeout(() => onLeadCapture(), 2000);
      }, 1000);
    } else {
      const emailUrl = `mailto:?subject=${encodeURIComponent(`Técnica de Facilitación: ${technique.title}`)}&body=${encodeURIComponent(message)}`;
      window.open(emailUrl);
      
      setTimeout(() => onLeadCapture(), 1000);
    }
  };

  const handleViewDetails = () => {
    onSelect(technique);
    toast({
      title: "Técnica seleccionada",
      description: `Ahora puedes preguntar sobre: ${technique.title}`,
    });
  };

  const handleUseTechnique = () => {
    onSelect(technique);
    toast({
      title: "¿Listo para usar esta técnica?",
      description: "Obtén el manual completo con instrucciones paso a paso",
      action: (
        <Button size="sm" onClick={onLeadCapture}>
          Obtener Manual
        </Button>
      ),
      duration: 6000,
    });
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl ${technique.color} flex items-center justify-center text-white text-xl shadow-soft`}>
            {technique.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {technique.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {technique.level}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {technique.category}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {technique.description}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{technique.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span className="truncate">{technique.groupSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-warning text-warning" />
            <span>{technique.rating}/5</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {technique.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={handleViewDetails}
            >
              <Eye className="w-3 h-3 mr-1" />
              Ver Detalles
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-gradient-primary hover:opacity-90"
              onClick={handleUseTechnique}
            >
              <Play className="w-3 h-3 mr-1" />
              Usar Técnica
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 text-xs"
              onClick={() => handleShare('whatsapp')}
            >
              <Share className="w-3 h-3 mr-1" />
              WhatsApp
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 text-xs"
              onClick={() => handleShare('email')}
            >
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};