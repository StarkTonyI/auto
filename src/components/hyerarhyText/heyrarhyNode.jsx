import { Card } from "../ui/card";



export const HierarchyNode = ({ node, level = 0 }) => {
  const getNodeVariant = () => {
    if (level === 0) return "node-primary";
    if (level === 1) return "node-secondary";
    return "node-accent";
  };

  return (
    <Card className={`${getNodeVariant()} group`}>
      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 text-card-foreground">
          {node.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {node.description}
        </p>
      </div>
    </Card>
  );
};
