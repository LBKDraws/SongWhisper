import { Song, PracticeCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, ArrowRight, Calendar, StickyNote, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SongCardProps {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
  onMove: (song: Song) => void;
}

const categoryColors = {
  daily: "border-red-200 bg-red-50/50 hover:bg-red-50",
  weekly: "border-orange-200 bg-orange-50/50 hover:bg-orange-50",
  biweekly: "border-amber-200 bg-amber-50/50 hover:bg-amber-50",
  monthly: "border-blue-200 bg-blue-50/50 hover:bg-blue-50",
  learned: "border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50",
};

export function SongCard({ song, onEdit, onDelete, onMove }: SongCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-200 cursor-move touch-target border-l-4",
      categoryColors[song.category]
    )}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start space-x-2 flex-1">
            <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Music2 className="h-3.5 w-3.5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1 truncate">
                {song.title}
              </h3>
            </div>
          </div>
          <div className="flex space-x-1 ml-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(song)}
              className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
              title="Edit song details"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(song.id)}
              className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete song"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {song.notes && (
          <div className="flex items-start space-x-2 mb-3 p-2 bg-slate-50 rounded-lg">
            <StickyNote className="h-3 w-3 text-slate-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed break-words line-clamp-3" title={song.notes}>
              {song.notes}
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Calendar className="h-3 w-3" />
            <span>
              {song.category === "learned" && song.dateCompleted
                ? `Completed: ${formatDate(song.dateCompleted)}`
                : `Started: ${formatDate(song.dateStarted)}`
              }
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMove(song)}
            className="h-auto p-2 text-xs text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg flex items-center space-x-1 transition-all duration-200"
            title="Move to different category"
          >
            <span>Move</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
