import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";


const ServiceCard = ({ title, subtitle, image, services, theme }) => {
  const themeClasses = {
    german: {
      gradient: "bg-gradient-german",
      glow: "shadow-german",
      badge: "bg-german/20 text-german-accent border-german",
      button: "bg-gradient-german hover:shadow-german",
      icon: "text-german-accent",
    },
    other: {
      gradient: "bg-gradient-other",
      glow: "shadow-other",
      badge: "bg-other/20 text-other-accent border-other",
      button: "bg-gradient-other hover:shadow-other",
      icon: "text-other-accent",
    },
  };

  const theme_styles = themeClasses[theme];

  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:border-opacity-60 transition-all duration-500 hover:shadow-card">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <Badge
          variant="outline"
          className={`absolute top-4 right-4 z-20 ${theme_styles.badge} backdrop-blur-sm font-semibold`}
        >
          Премиум
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-start gap-3 group/item"
            >
              <div className={`mt-1 ${theme_styles.icon}`}>
                <Check className="h-5 w-5" />
              </div>
              <span className="text-foreground/90 group-hover/item:text-foreground transition-colors">
                {service}
              </span>
            </div>
          ))}
        </div>

    
      </div>

      {/* Glow Effect */}
      <div className={`absolute inset-0 ${theme_styles.glow} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
    </Card>
  );
};

export default ServiceCard;
