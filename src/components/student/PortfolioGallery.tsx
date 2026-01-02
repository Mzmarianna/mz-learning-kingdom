import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Video, Image, FileText, Calendar, Award, MessageSquare, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface PortfolioItem {
  id: string;
  studentId: string;
  studentName: string;
  type: 'video' | 'image' | 'note';
  fileUrl: string | null;
  fileName: string | null;
  notes: string | null;
  challengeId: string | null;
  challengeTitle: string | null;
  questId: string | null;
  createdAt: any;
  viewedByParent: boolean;
  reviewedByTutor: boolean;
  tutorFeedback: string | null;
}

interface PortfolioGalleryProps {
  studentId: string;
  isParentView?: boolean;
}

export default function PortfolioGallery({ studentId, isParentView = false }: PortfolioGalleryProps) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'note'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for portfolio items
    const itemsRef = collection(db, 'portfolioItems');
    const q = query(
      itemsRef,
      where('studentId', '==', studentId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const portfolioItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PortfolioItem[];

      setItems(portfolioItems);
      setLoading(false);

      // Mark as viewed by parent
      if (isParentView) {
        snapshot.docs.forEach(async (docSnap) => {
          if (!docSnap.data().viewedByParent) {
            await updateDoc(doc(db, 'portfolioItems', docSnap.id), {
              viewedByParent: true,
            });
          }
        });
      }
    });

    return () => unsubscribe();
  }, [studentId, isParentView]);

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.type === filter);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'note': return <FileText className="w-5 h-5" />;
      default: return null;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'video': return 'from-pink-500 to-purple-600';
      case 'image': return 'from-cyan-500 to-blue-600';
      case 'note': return 'from-amber-500 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-calm-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading portfolio...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-calm-surface rounded-2xl border-2 border-calm-border">
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-xl font-semibold mb-2">Portfolio is Empty</h3>
        <p className="text-muted-foreground">
          {isParentView 
            ? "Your child hasn't added any portfolio items yet." 
            : "Start adding your work! Complete challenges to unlock portfolio submissions."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-4 rounded-xl text-center">
          <Video className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">{items.filter(i => i.type === 'video').length}</p>
          <p className="text-sm opacity-90">Videos</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-4 rounded-xl text-center">
          <Image className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">{items.filter(i => i.type === 'image').length}</p>
          <p className="text-sm opacity-90">Images</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-xl text-center">
          <FileText className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">{items.filter(i => i.type === 'note').length}</p>
          <p className="text-sm opacity-90">Notes</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-xl text-center">
          <Award className="w-8 h-8 mx-auto mb-2" />
          <p className="text-2xl font-bold">{items.length}</p>
          <p className="text-sm opacity-90">Total Items</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
          className={filter === 'all' ? 'reward-bg text-white' : ''}
        >
          All ({items.length})
        </Button>
        <Button
          onClick={() => setFilter('video')}
          variant={filter === 'video' ? 'default' : 'outline'}
          className={filter === 'video' ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}
        >
          <Video className="w-4 h-4 mr-2" />
          Videos ({items.filter(i => i.type === 'video').length})
        </Button>
        <Button
          onClick={() => setFilter('image')}
          variant={filter === 'image' ? 'default' : 'outline'}
          className={filter === 'image' ? 'bg-cyan-600 text-white hover:bg-cyan-700' : ''}
        >
          <Image className="w-4 h-4 mr-2" />
          Images ({items.filter(i => i.type === 'image').length})
        </Button>
        <Button
          onClick={() => setFilter('note')}
          variant={filter === 'note' ? 'default' : 'outline'}
          className={filter === 'note' ? 'bg-amber-600 text-white hover:bg-amber-700' : ''}
        >
          <FileText className="w-4 h-4 mr-2" />
          Notes ({items.filter(i => i.type === 'note').length})
        </Button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedItem(item)}
              className="bg-calm-surface border-2 border-calm-border rounded-xl overflow-hidden cursor-pointer hover:border-calm-primary transition-all"
            >
              {/* Thumbnail/Preview */}
              <div className={`relative h-48 bg-gradient-to-br ${getItemColor(item.type)} flex items-center justify-center`}>
                {item.type === 'video' && item.fileUrl && (
                  <video
                    src={item.fileUrl}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
                {item.type === 'image' && item.fileUrl && (
                  <img
                    src={item.fileUrl}
                    alt="Portfolio item"
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === 'note' && (
                  <FileText className="w-16 h-16 text-white" />
                )}
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                  {getItemIcon(item.type)}
                  <span className="capitalize">{item.type}</span>
                </div>

                {/* New Badge for Parent */}
                {isParentView && !item.viewedByParent && (
                  <div className="absolute top-3 right-3 bg-reward-purple text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    NEW!
                  </div>
                )}

                {/* Play Icon for Videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <Eye className="w-8 h-8 text-gray-800" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                {item.challengeTitle && (
                  <p className="text-sm font-semibold text-calm-primary">
                    {item.challengeTitle}
                  </p>
                )}
                
                {item.notes && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {item.notes}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>

                {/* Tutor Feedback Badge */}
                {item.reviewedByTutor && (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-semibold">Tutor Feedback</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getItemIcon(selectedItem.type)}
                  <span className="capitalize">{selectedItem.type}</span>
                  {selectedItem.challengeTitle && (
                    <span className="text-calm-primary">- {selectedItem.challengeTitle}</span>
                  )}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Video Player */}
                {selectedItem.type === 'video' && selectedItem.fileUrl && (
                  <video
                    src={selectedItem.fileUrl}
                    controls
                    className="w-full rounded-xl"
                  />
                )}

                {/* Image Display */}
                {selectedItem.type === 'image' && selectedItem.fileUrl && (
                  <img
                    src={selectedItem.fileUrl}
                    alt="Portfolio item"
                    className="w-full rounded-xl"
                  />
                )}

                {/* Notes */}
                {selectedItem.notes && (
                  <div className="bg-calm-bg rounded-xl p-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Student Notes
                    </h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedItem.notes}</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedItem.createdAt)}</span>
                  </div>
                  {selectedItem.reviewedByTutor && (
                    <div className="flex items-center gap-2 text-success">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reviewed by Tutor</span>
                    </div>
                  )}
                </div>

                {/* Tutor Feedback */}
                {selectedItem.tutorFeedback && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-purple-900">
                      <Award className="w-5 h-5" />
                      Tutor Feedback
                    </h3>
                    <p className="text-gray-700">{selectedItem.tutorFeedback}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
