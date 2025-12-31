import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Video, Image, FileText, Send, Check, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioItem {
  id: string;
  studentId: string;
  studentName: string;
  type: 'video' | 'image' | 'note';
  fileUrl: string | null;
  notes: string | null;
  challengeTitle: string | null;
  createdAt: any;
  reviewedByTutor: boolean;
  tutorFeedback: string | null;
}

interface TutorReviewQueueProps {
  tutorId: string;
}

export default function TutorReviewQueue({ tutorId }: TutorReviewQueueProps) {
  const [pendingItems, setPendingItems] = useState<PortfolioItem[]>([]);
  const [reviewedItems, setReviewedItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewed, setShowReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all portfolio items for this tutor's students
    // In production, you'd join with questInstances to get only this tutor's students
    const itemsRef = collection(db, 'portfolioItems');
    const q = query(
      itemsRef,
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PortfolioItem[];

      setPendingItems(items.filter(item => !item.reviewedByTutor));
      setReviewedItems(items.filter(item => item.reviewedByTutor));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tutorId]);

  const submitFeedback = async () => {
    if (!selectedItem || !feedback.trim()) {
      toast.error('Please enter feedback before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateDoc(doc(db, 'portfolioItems', selectedItem.id), {
        reviewedByTutor: true,
        tutorFeedback: feedback.trim(),
        reviewedAt: new Date(),
        reviewedBy: tutorId,
      });

      toast.success('Feedback submitted! 🎉', {
        description: `${selectedItem.studentName} will see your encouragement!`,
      });

      setSelectedItem(null);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'note': return <FileText className="w-5 h-5" />;
      default: return null;
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const displayItems = showReviewed ? reviewedItems : pendingItems;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-calm-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading review queue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">📋 Portfolio Review Queue</h2>
          <p className="text-muted-foreground">
            Review student work and provide encouraging feedback
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-amber-500 text-white px-6 py-3 rounded-xl text-center">
            <p className="text-2xl font-bold">{pendingItems.length}</p>
            <p className="text-sm">Pending</p>
          </div>
          <div className="bg-success text-white px-6 py-3 rounded-xl text-center">
            <p className="text-2xl font-bold">{reviewedItems.length}</p>
            <p className="text-sm">Reviewed</p>
          </div>
        </div>
      </div>

      {/* Toggle View */}
      <div className="flex gap-3">
        <Button
          onClick={() => setShowReviewed(false)}
          variant={!showReviewed ? 'default' : 'outline'}
          className={!showReviewed ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}
        >
          <Clock className="w-4 h-4 mr-2" />
          Pending Review ({pendingItems.length})
        </Button>
        <Button
          onClick={() => setShowReviewed(true)}
          variant={showReviewed ? 'default' : 'outline'}
          className={showReviewed ? 'bg-success hover:bg-green-600 text-white' : ''}
        >
          <Check className="w-4 h-4 mr-2" />
          Reviewed ({reviewedItems.length})
        </Button>
      </div>

      {/* Empty State */}
      {displayItems.length === 0 && (
        <div className="text-center py-12 bg-calm-surface rounded-2xl border-2 border-calm-border">
          <div className="text-6xl mb-4">
            {showReviewed ? '✅' : '🎉'}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {showReviewed ? 'No Reviewed Items Yet' : 'All Caught Up!'}
          </h3>
          <p className="text-muted-foreground">
            {showReviewed 
              ? "Start reviewing student work to see it here." 
              : "No portfolio items waiting for review. Great job!"}
          </p>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-calm-surface border-2 border-calm-border rounded-xl overflow-hidden hover:border-calm-primary transition-colors"
            >
              {/* Preview */}
              <div className="relative h-48 bg-gray-200 flex items-center justify-center">
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
                  <FileText className="w-16 h-16 text-gray-400" />
                )}

                {/* Type Badge */}
                <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                  {getItemIcon(item.type)}
                  <span className="capitalize">{item.type}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.studentName}</h3>
                  {item.challengeTitle && (
                    <p className="text-sm text-calm-primary">{item.challengeTitle}</p>
                  )}
                </div>

                {item.notes && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {item.notes}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  {formatDate(item.createdAt)}
                </p>

                {!item.reviewedByTutor ? (
                  <Button
                    onClick={() => {
                      setSelectedItem(item);
                      setFeedback('');
                    }}
                    className="w-full reward-bg text-white"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Feedback
                  </Button>
                ) : (
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-success mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Reviewed
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {item.tutorFeedback}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Feedback Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Review: {selectedItem.studentName}'s Work
                </h2>
                {selectedItem.challengeTitle && (
                  <p className="text-calm-primary">{selectedItem.challengeTitle}</p>
                )}
              </div>

              {/* Content Preview */}
              <div className="space-y-4">
                {selectedItem.type === 'video' && selectedItem.fileUrl && (
                  <video
                    src={selectedItem.fileUrl}
                    controls
                    className="w-full rounded-xl"
                  />
                )}

                {selectedItem.type === 'image' && selectedItem.fileUrl && (
                  <img
                    src={selectedItem.fileUrl}
                    alt="Student work"
                    className="w-full rounded-xl"
                  />
                )}

                {selectedItem.notes && (
                  <div className="bg-calm-bg rounded-xl p-4">
                    <h3 className="font-semibold mb-2">Student Notes:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedItem.notes}</p>
                  </div>
                )}
              </div>

              {/* Feedback Form */}
              <div className="space-y-3">
                <label className="block">
                  <span className="text-lg font-semibold mb-2 block">
                    💬 Your Feedback
                  </span>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Great job on this! I love how you... One thing to try next time is..."
                    className="min-h-[150px] bg-white border-2 border-calm-border rounded-xl p-4 resize-none"
                    maxLength={1000}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {feedback.length}/1000 characters • Be specific, encouraging, and constructive
                  </p>
                </label>

                {/* Feedback Tips */}
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 text-purple-900">💡 Feedback Tips:</h4>
                  <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
                    <li>Start with what they did well (specific praise)</li>
                    <li>Highlight their effort and problem-solving</li>
                    <li>Suggest one thing to try next time</li>
                    <li>Keep it encouraging and neurodivergent-friendly</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => setSelectedItem(null)}
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitFeedback}
                  disabled={!feedback.trim() || isSubmitting}
                  className="reward-bg text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
