import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PortfolioGallery from '@/components/student/PortfolioGallery';
import { Calendar, TrendingUp, Award, Video, Image, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface ParentPortfolioViewProps {
  parentId: string;
  childId: string;
  childName: string;
}

interface PortfolioStats {
  totalItems: number;
  videosCount: number;
  imagesCount: number;
  notesCount: number;
  thisWeekCount: number;
  thisMonthCount: number;
  reviewedByTutorCount: number;
}

export default function ParentPortfolioView({ 
  parentId, 
  childId, 
  childName 
}: ParentPortfolioViewProps) {
  const [stats, setStats] = useState<PortfolioStats>({
    totalItems: 0,
    videosCount: 0,
    imagesCount: 0,
    notesCount: 0,
    thisWeekCount: 0,
    thisMonthCount: 0,
    reviewedByTutorCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const itemsRef = collection(db, 'portfolioItems');
        const q = query(
          itemsRef,
          where('studentId', '==', childId),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => doc.data());

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        setStats({
          totalItems: items.length,
          videosCount: items.filter(i => i.type === 'video').length,
          imagesCount: items.filter(i => i.type === 'image').length,
          notesCount: items.filter(i => i.type === 'note').length,
          thisWeekCount: items.filter(i => {
            const itemDate = i.createdAt?.toDate() || new Date(0);
            return itemDate >= oneWeekAgo;
          }).length,
          thisMonthCount: items.filter(i => {
            const itemDate = i.createdAt?.toDate() || new Date(0);
            return itemDate >= oneMonthAgo;
          }).length,
          reviewedByTutorCount: items.filter(i => i.reviewedByTutor).length,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [childId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-calm-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Loading {childName}'s portfolio...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl mb-2">{childName}'s Learning Portfolio</h1>
        <p className="text-muted-foreground text-lg">
          See everything your child has created and learned
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8" />
            <span className="text-3xl font-bold">{stats.totalItems}</span>
          </div>
          <h3 className="font-semibold text-lg">Total Portfolio Items</h3>
          <p className="text-sm opacity-90 mt-1">All time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <Calendar className="w-8 h-8" />
            <span className="text-3xl font-bold">{stats.thisWeekCount}</span>
          </div>
          <h3 className="font-semibold text-lg">This Week</h3>
          <p className="text-sm opacity-90 mt-1">Last 7 days</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8" />
            <span className="text-3xl font-bold">{stats.thisMonthCount}</span>
          </div>
          <h3 className="font-semibold text-lg">This Month</h3>
          <p className="text-sm opacity-90 mt-1">Last 30 days</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8" />
            <span className="text-3xl font-bold">{stats.reviewedByTutorCount}</span>
          </div>
          <h3 className="font-semibold text-lg">Tutor Reviewed</h3>
          <p className="text-sm opacity-90 mt-1">With feedback</p>
        </motion.div>
      </div>

      {/* Portfolio Breakdown */}
      <div className="bg-calm-surface rounded-2xl border-2 border-calm-border p-6">
        <h2 className="text-2xl mb-6">Portfolio Breakdown</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.videosCount}</p>
              <p className="text-sm text-muted-foreground">Video Explanations</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
              <Image className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.imagesCount}</p>
              <p className="text-sm text-muted-foreground">Project Screenshots</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.notesCount}</p>
              <p className="text-sm text-muted-foreground">Written Reflections</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
        <div className="flex gap-3">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="font-semibold text-lg mb-2">What is a Learning Portfolio?</h3>
            <p className="text-gray-700">
              Your child's portfolio is a collection of their learning journey. They can record videos 
              explaining what they built in Roblox, upload screenshots of their code projects, or write 
              reflections about what they learned. This helps you see their progress and gives tutors 
              insight into their understanding. Items marked "Tutor Reviewed" include personalized feedback!
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div>
        <h2 className="text-2xl mb-6">All Portfolio Items</h2>
        <PortfolioGallery studentId={childId} isParentView={true} />
      </div>
    </div>
  );
}
