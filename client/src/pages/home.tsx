import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Music, Plus, Calendar, Clock, RotateCcw, CheckCircle, Zap, Target, Sparkles } from "lucide-react";
import { useSongs } from "@/hooks/use-songs";
import { SongCard } from "@/components/song-card";
import { AddSongModal } from "@/components/add-song-modal";
import { MoveSongModal } from "@/components/move-song-modal";
import { EditSongModal } from "@/components/edit-song-modal";
import { Song, PracticeCategory } from "@shared/schema";
import { useIsMobile } from "@/hooks/use-mobile";

const categoryData = {
  daily: { 
    label: "Daily", 
    icon: Zap,
    color: "bg-red-500", 
    bgColor: "bg-red-50", 
    textColor: "text-red-700",
    borderColor: "border-red-200",
    description: "Practice every day"
  },
  weekly: { 
    label: "Weekly", 
    icon: Calendar,
    color: "bg-orange-500", 
    bgColor: "bg-orange-50", 
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    description: "Practice weekly"
  },
  biweekly: { 
    label: "Bi-Weekly", 
    icon: RotateCcw,
    color: "bg-amber-500", 
    bgColor: "bg-amber-50", 
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    description: "Practice every 2 weeks"
  },
  monthly: { 
    label: "Monthly", 
    icon: Clock,
    color: "bg-blue-500", 
    bgColor: "bg-blue-50", 
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    description: "Practice monthly"
  },
  learned: { 
    label: "Learned", 
    icon: CheckCircle,
    color: "bg-emerald-500", 
    bgColor: "bg-emerald-50", 
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    description: "Completed songs"
  },
};

export default function Home() {
  const { 
    addSong, 
    updateSong, 
    deleteSong, 
    moveSong, 
    getSongsByCategory, 
    getCategoryCounts 
  } = useSongs();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  
  const isMobile = useIsMobile();
  const counts = getCategoryCounts();
  const totalSongs = Object.values(counts).reduce((sum, count) => sum + count, 0);

  const handleEditSong = (song: Song) => {
    setSelectedSong(song);
    setIsEditModalOpen(true);
  };

  const handleMoveSong = (song: Song) => {
    setSelectedSong(song);
    setIsMoveModalOpen(true);
  };

  const handleDeleteSong = (id: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      deleteSong(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Music className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">Practice Tracker</h1>
                <p className="text-xs text-slate-500 hidden sm:block line-clamp-1">Organize your music practice</p>
              </div>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2 min-h-[40px] sm:min-h-[44px] flex-shrink-0 ml-2"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-sm hidden sm:inline">Add Song</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Add First Song Section */}
      {totalSongs === 0 && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Start Your Musical Journey!</h2>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 max-w-md mx-auto leading-relaxed">
                Welcome to your practice tracker! Add your first song to begin organizing your practice routine.
              </p>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 mx-auto text-sm sm:text-base"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Add Your First Song</span>
              </Button>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3 text-red-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Daily Practice</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-orange-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Weekly Practice</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Learned Songs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Dashboard */}
      {totalSongs > 0 && (
        <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Practice Overview</h2>
            <p className="text-sm sm:text-base text-slate-600">Track your progress across different practice frequencies</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
            {Object.entries(categoryData).map(([key, data]) => {
              const category = key as PracticeCategory;
              const count = counts[category];
              const IconComponent = data.icon;
              
              return (
                <Card key={category} className={`bg-white shadow-sm border ${data.borderColor} hover:shadow-md transition-all duration-200 group`}>
                  <CardContent className="p-3 sm:p-4 lg:p-5">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${data.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 ${data.textColor}`} />
                      </div>
                      <div className={`text-xs px-2 py-1 ${data.bgColor} ${data.textColor} rounded-full font-medium whitespace-nowrap`}>
                        {count} songs
                      </div>
                    </div>
                    <div>
                      <p className="text-sm sm:text-lg font-bold text-slate-900 mb-1 truncate" title={data.label}>{data.label}</p>
                      <p className="text-xs text-slate-500 line-clamp-2 sm:line-clamp-none" title={data.description}>{data.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pb-6 sm:pb-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Song Categories</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Manage your songs by practice frequency • Click any song to edit or move between categories</p>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Object.entries(categoryData).map(([key, data]) => {
            const category = key as PracticeCategory;
            const songs = getSongsByCategory(category);
            const IconComponent = data.icon;
            
            return (
              <Card key={category} className={`bg-white shadow-sm border ${data.borderColor} hover:shadow-md transition-all duration-200`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 ${data.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${data.textColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-lg font-semibold text-slate-900 truncate" title={data.label}>{data.label}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1 sm:line-clamp-none" title={data.description}>{data.description}</p>
                      </div>
                    </div>
                    <div className={`${data.bgColor} ${data.textColor} text-xs font-bold px-2 sm:px-3 py-1 rounded-full min-w-[2rem] text-center flex-shrink-0 ml-2`}>
                      {songs.length}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className={`space-y-3 ${category === 'learned' ? 'max-h-96 overflow-y-auto' : ''}`}>
                    {songs.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <Target className="h-8 w-8 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">No songs yet</p>
                        <p className="text-xs">Add songs to start practicing</p>
                      </div>
                    ) : (
                      songs.map(song => (
                        <SongCard
                          key={song.id}
                          song={song}
                          onEdit={handleEditSong}
                          onDelete={handleDeleteSong}
                          onMove={handleMoveSong}
                        />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Modals */}
      <AddSongModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddSong={addSong}
      />
      
      <MoveSongModal
        open={isMoveModalOpen}
        onOpenChange={setIsMoveModalOpen}
        song={selectedSong}
        onMoveSong={moveSong}
      />
      
      <EditSongModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        song={selectedSong}
        onUpdateSong={updateSong}
      />
    </div>
  );
}
