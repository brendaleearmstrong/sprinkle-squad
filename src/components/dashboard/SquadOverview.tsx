import { KidCard } from "./KidCard";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { AddKidDialog } from "./AddKidDialog";
import type { Kid, Task } from "@/types";

interface SquadOverviewProps {
  kids: Kid[];
  tasks: Task[];
  onSprinkleUpdate: () => void;
}

export const SquadOverview = ({ kids, tasks, onSprinkleUpdate }: SquadOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {kids.length > 0 ? (
        kids.map((kid) => (
          <KidCard 
            key={kid.id} 
            kid={kid} 
            tasks={tasks} 
            onSprinkleUpdate={onSprinkleUpdate}
            onKidDeleted={onSprinkleUpdate}
          />
        ))
      ) : (
        <Card className="col-span-full p-8 text-center bg-gradient-to-br from-space-white/10 to-electric-purple/5 backdrop-blur-sm border-2 border-electric-purple/20">
          <Gift className="mx-auto h-12 w-12 text-electric-purple mb-4 animate-bounce" />
          <h3 className="font-display text-2xl text-electric-purple mb-2">
            Welcome to SprinkleSquad!
          </h3>
          <p className="font-body text-gray-600 mb-4">
            Start by adding your children to manage their tasks and rewards! 🌟
          </p>
          <AddKidDialog onKidAdded={onSprinkleUpdate} />
        </Card>
      )}
    </div>
  );
};