import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Song, PracticeCategory, practiceCategories } from "@shared/schema";
import { Zap, Calendar, RotateCcw, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface MoveSongModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  song: Song | null;
  onMoveSong: (id: string, category: PracticeCategory) => void;
}

const categoryData: Record<PracticeCategory, { label: string; icon: any; color: string; bgColor: string; description: string }> = {
  daily: { 
    label: "Daily", 
    icon: Zap, 
    color: "text-red-600", 
    bgColor: "bg-red-50 hover:bg-red-100",
    description: "Practice every day"
  },
  weekly: { 
    label: "Weekly", 
    icon: Calendar, 
    color: "text-orange-600", 
    bgColor: "bg-orange-50 hover:bg-orange-100",
    description: "Practice weekly"
  },
  biweekly: { 
    label: "Bi-Weekly", 
    icon: RotateCcw, 
    color: "text-amber-600", 
    bgColor: "bg-amber-50 hover:bg-amber-100",
    description: "Practice every 2 weeks"
  },
  monthly: { 
    label: "Monthly", 
    icon: Clock, 
    color: "text-blue-600", 
    bgColor: "bg-blue-50 hover:bg-blue-100",
    description: "Practice monthly"
  },
  learned: { 
    label: "Learned", 
    icon: CheckCircle, 
    color: "text-emerald-600", 
    bgColor: "bg-emerald-50 hover:bg-emerald-100",
    description: "Completed songs"
  },
};

export function MoveSongModal({ open, onOpenChange, song, onMoveSong }: MoveSongModalProps) {
  const handleMove = (category: PracticeCategory) => {
    if (song) {
      onMoveSong(song.id, category);
      onOpenChange(false);
    }
  };

  if (!song) return null;

  const availableCategories = practiceCategories.filter(cat => cat !== song.category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Move "{song.title}"</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-slate-600 mb-6 text-center">
            Select a new practice category for "<span className="font-medium">{song.title}</span>":
          </p>
          
          {availableCategories.map(category => {
            const data = categoryData[category];
            const IconComponent = data.icon;
            
            return (
              <Button
                key={category}
                variant="outline"
                onClick={() => handleMove(category)}
                className={`w-full justify-start h-auto py-4 px-4 ${data.bgColor} border-2 hover:border-current transition-all duration-200`}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-10 h-10 ${data.bgColor.replace('hover:', '')} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${data.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900">{data.label}</div>
                      <div className="text-xs text-slate-500">{data.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              </Button>
            );
          })}
          
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="w-full mt-6 py-3"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
