import { Star } from "lucide-react";
import { Card } from "./ui/card";


const TestimonialCard = ({ name, role, company, content, rating, avatar }) => {
  return (
    <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:glow-effect card-shadow group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{role} в {company}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating 
                  ? "fill-primary text-primary" 
                  : "fill-muted text-muted"
              } transition-colors duration-300`}
            />
          ))}
        </div>

        <p className="text-foreground/90 leading-relaxed">{content}</p>
      </div>
    </Card>
  );
};

export default TestimonialCard;