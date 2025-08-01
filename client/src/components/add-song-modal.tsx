import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { InsertSong, PracticeCategory, practiceCategories } from "@shared/schema";
import { Music, StickyNote, Calendar as CalendarIcon, Zap, RotateCcw, Clock, CheckCircle, Plus } from "lucide-react";

interface AddSongModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSong: (song: InsertSong) => void;
}

const categoryData: Record<PracticeCategory, { label: string; icon: any; color: string }> = {
  daily: { label: "Daily", icon: Zap, color: "text-red-600" },
  weekly: { label: "Weekly", icon: CalendarIcon, color: "text-orange-600" },
  biweekly: { label: "Bi-Weekly", icon: RotateCcw, color: "text-amber-600" },
  monthly: { label: "Monthly", icon: Clock, color: "text-blue-600" },
  learned: { label: "Learned", icon: CheckCircle, color: "text-emerald-600" },
};

export function AddSongModal({ open, onOpenChange, onAddSong }: AddSongModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    category: "" as PracticeCategory | "",
    dateStarted: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.category) {
      return;
    }

    onAddSong({
      title: formData.title.trim(),
      notes: formData.notes.trim() || undefined,
      category: formData.category,
      dateStarted: formData.dateStarted,
    });

    // Reset form
    setFormData({
      title: "",
      notes: "",
      category: "",
      dateStarted: new Date().toISOString().split('T')[0],
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      title: "",
      notes: "",
      category: "",
      dateStarted: new Date().toISOString().split('T')[0],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
              <Music className="h-4 w-4" />
              <span>Song Title</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter song title"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
              <StickyNote className="h-4 w-4" />
              <span>Notes (Optional)</span>
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Practice notes, techniques, etc."
              rows={3}
              className="mt-2 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Practice Category</span>
            </Label>
            <Select 
              value={formData.category} 
              onValueChange={(value: PracticeCategory) => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {practiceCategories.map(category => {
                  const CategoryIcon = categoryData[category].icon;
                  return (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className={`h-4 w-4 ${categoryData[category].color}`} />
                        <span>{categoryData[category].label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dateStarted" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Date Started</span>
            </Label>
            <Input
              id="dateStarted"
              type="date"
              value={formData.dateStarted}
              onChange={(e) => setFormData(prev => ({ ...prev, dateStarted: e.target.value }))}
              className="mt-2"
            />
          </div>

          <div className="flex space-x-3 pt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-11"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Song
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
