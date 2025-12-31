# 📁 Portfolio System Guide - Seesaw/ClassDojo Style

## Overview

The Portfolio System allows students to document their learning journey through **video recordings**, **image uploads**, and **text reflections**. Parents can view all their child's work in real-time, and tutors can review submissions and provide personalized feedback.

---

## 🎯 Features

### **For Students:**
✅ **Video Recording** - Record explanations of what they built/learned (max 2 minutes)  
✅ **Image Upload** - Upload screenshots of Roblox builds, code projects, etc.  
✅ **Text Notes** - Write reflections about their learning  
✅ **Portfolio Gallery** - View all past submissions in one place  
✅ **Tutor Feedback** - See personalized encouragement from their tutor  

### **For Parents:**
✅ **Real-time Portfolio View** - See everything their child creates  
✅ **Progress Stats** - Weekly/monthly submission counts  
✅ **Tutor Feedback Visibility** - Read tutor comments on their child's work  
✅ **Multi-format Support** - Videos, images, and notes all in one place  

### **For Tutors:**
✅ **Review Queue** - See all pending student submissions  
✅ **Easy Feedback** - Add personalized, encouraging comments  
✅ **Progress Tracking** - Monitor student engagement and effort  
✅ **Bulk Review** - Review multiple submissions efficiently  

---

## 📦 Components Created

### 1. **`/components/student/PortfolioSubmission.tsx`**
Main submission interface for students

**Features:**
- Video recording with 3-2-1 countdown (reduces anxiety)
- Live video preview
- Auto-stop at 2 minutes (neurodivergent-friendly)
- Image upload with drag-and-drop
- Text notes with character counter
- Firebase Storage upload with progress bar
- Automatic save to Firestore

**Props:**
```typescript
interface PortfolioSubmissionProps {
  studentId: string;
  studentName: string;
  challengeId?: string;        // Optional: Link to specific challenge
  challengeTitle?: string;     // Optional: Display challenge name
  questId?: string;            // Optional: Link to quest
  onComplete?: () => void;     // Optional: Callback after submission
}
```

**Usage in Student Dashboard:**
```typescript
import PortfolioSubmission from '@/components/student/PortfolioSubmission';

<PortfolioSubmission
  studentId={currentUser.uid}
  studentName={currentUser.displayName}
  challengeId={currentChallengeId}
  challengeTitle="Build a Math Calculator in Roblox"
  onComplete={() => {
    toast.success('Portfolio item saved!');
    // Refresh portfolio or navigate
  }}
/>
```

---

### 2. **`/components/student/PortfolioGallery.tsx`**
Display all portfolio items with filtering

**Features:**
- Grid view of all submissions
- Filter by type (videos, images, notes)
- Real-time updates (new submissions appear automatically)
- Click to view full details
- Tutor feedback badges
- Responsive design (mobile/tablet/desktop)

**Props:**
```typescript
interface PortfolioGalleryProps {
  studentId: string;
  isParentView?: boolean;  // Shows "NEW" badges for unviewed items
}
```

**Usage:**
```typescript
import PortfolioGallery from '@/components/student/PortfolioGallery';

// In Student Dashboard
<PortfolioGallery studentId={currentUser.uid} />

// In Parent Dashboard
<PortfolioGallery studentId={childId} isParentView={true} />
```

---

### 3. **`/components/parent/ParentPortfolioView.tsx`**
Parent-facing portfolio viewer with stats

**Features:**
- Overview stats (total items, this week, this month)
- Portfolio breakdown by type
- Auto-marks items as "viewed by parent"
- Embedded PortfolioGallery
- Educational info about portfolios

**Props:**
```typescript
interface ParentPortfolioViewProps {
  parentId: string;
  childId: string;
  childName: string;
}
```

**Usage in Parent Dashboard:**
```typescript
import ParentPortfolioView from '@/components/parent/ParentPortfolioView';

<ParentPortfolioView
  parentId={currentUser.uid}
  childId={selectedChildId}
  childName="Emma"
/>
```

---

### 4. **`/components/tutor/TutorReviewQueue.tsx`**
Tutor interface for reviewing and providing feedback

**Features:**
- Pending vs Reviewed tabs
- Video/image preview
- Easy feedback form with tips
- Submit feedback (saves to Firestore)
- Real-time queue updates

**Props:**
```typescript
interface TutorReviewQueueProps {
  tutorId: string;
}
```

**Usage in Tutor Dashboard:**
```typescript
import TutorReviewQueue from '@/components/tutor/TutorReviewQueue';

<TutorReviewQueue tutorId={currentUser.uid} />
```

---

## 🗄️ Firestore Schema

### **Collection: `portfolioItems`**

```typescript
interface PortfolioItem {
  id: string;                    // Auto-generated document ID
  studentId: string;             // Reference to users/{studentId}
  studentName: string;           // Denormalized for easy display
  type: 'video' | 'image' | 'note';
  fileUrl: string | null;        // Firebase Storage URL (null for notes)
  fileName: string | null;       // Storage path (null for notes)
  notes: string | null;          // Student's text reflection
  challengeId: string | null;    // Reference to challenge (optional)
  challengeTitle: string | null; // Denormalized challenge title
  questId: string | null;        // Reference to quest (optional)
  createdAt: Timestamp;          // When submitted
  viewedByParent: boolean;       // Has parent seen this?
  reviewedByTutor: boolean;      // Has tutor reviewed?
  tutorFeedback: string | null;  // Tutor's comments
  reviewedAt?: Timestamp;        // When tutor reviewed
  reviewedBy?: string;           // Tutor ID who reviewed
}
```

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolioItems/{itemId} {
      // Students can create and read their own items
      allow create: if request.auth != null && 
                       request.resource.data.studentId == request.auth.uid;
      
      allow read: if request.auth != null && (
        // Student can read their own
        resource.data.studentId == request.auth.uid ||
        // Parent can read their child's (would need to check parentChildren collection)
        get(/databases/$(database)/documents/parentChildren/$(request.auth.uid)).data.childIds.hasAny([resource.data.studentId]) ||
        // Tutor can read (would need to check if tutor is assigned to student)
        request.auth.token.role == 'tutor' ||
        // Admin can read all
        request.auth.token.role == 'admin'
      );
      
      // Only tutors can update (to add feedback)
      allow update: if request.auth != null && 
                       request.auth.token.role in ['tutor', 'admin'] &&
                       // Only allow updating review fields
                       request.resource.data.diff(resource.data).affectedKeys()
                         .hasOnly(['reviewedByTutor', 'tutorFeedback', 'reviewedAt', 'reviewedBy']);
    }
  }
}
```

---

## 🔥 Firebase Storage Structure

```
storage/
  videos/
    {studentId}/
      {timestamp}.webm           # Video recordings
  
  images/
    {studentId}/
      {timestamp}-{filename}     # Uploaded images
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Videos
    match /videos/{studentId}/{fileName} {
      allow write: if request.auth != null && 
                      request.auth.uid == studentId &&
                      request.resource.size < 50 * 1024 * 1024; // 50MB max
      
      allow read: if request.auth != null; // Anyone authenticated can view
    }
    
    // Images
    match /images/{studentId}/{fileName} {
      allow write: if request.auth != null && 
                      request.auth.uid == studentId &&
                      request.resource.size < 10 * 1024 * 1024; // 10MB max
      
      allow read: if request.auth != null;
    }
  }
}
```

---

## 🚀 Integration Steps

### **Step 1: Install Dependencies** (if not already installed)

```bash
npm install firebase motion/react sonner lucide-react
```

### **Step 2: Configure Firebase Storage**

Make sure Firebase Storage is enabled in your Firebase project:

1. Go to Firebase Console → Storage
2. Click "Get Started"
3. Choose "Start in test mode" (we'll add rules later)
4. Deploy the storage rules above

### **Step 3: Add to Student Dashboard**

Update `/components/student/StudentDashboard.tsx`:

```typescript
import { useState } from 'react';
import PortfolioSubmission from './PortfolioSubmission';
import PortfolioGallery from './PortfolioGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StudentDashboard({ user }: { user: any }) {
  const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* ... existing dashboard content ... */}
      
      {/* Add Portfolio Section */}
      <div className="bg-calm-surface rounded-2xl border-2 border-calm-border p-6">
        <h2 className="text-3xl mb-6">📁 Your Learning Portfolio</h2>
        
        <Tabs defaultValue="submit" className="w-full">
          <TabsList>
            <TabsTrigger value="submit">Add to Portfolio</TabsTrigger>
            <TabsTrigger value="view">View All Work</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit" className="mt-6">
            <PortfolioSubmission
              studentId={user.uid}
              studentName={user.displayName}
              challengeId={currentChallengeId}
              challengeTitle="Your Current Challenge"
              onComplete={() => {
                // Optionally switch to view tab
              }}
            />
          </TabsContent>
          
          <TabsContent value="view" className="mt-6">
            <PortfolioGallery studentId={user.uid} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

### **Step 4: Add to Parent Dashboard**

Update `/components/parent/ParentDashboard.tsx`:

```typescript
import ParentPortfolioView from './ParentPortfolioView';

export default function ParentDashboard({ user }: { user: any }) {
  const [selectedChild, setSelectedChild] = useState(null);

  return (
    <div className="space-y-8">
      {/* ... existing parent dashboard ... */}
      
      {/* Portfolio Tab/Section */}
      {selectedChild && (
        <ParentPortfolioView
          parentId={user.uid}
          childId={selectedChild.id}
          childName={selectedChild.name}
        />
      )}
    </div>
  );
}
```

### **Step 5: Add to Tutor Dashboard**

Update `/components/tutor/TutorDashboard.tsx`:

```typescript
import TutorReviewQueue from './TutorReviewQueue';

export default function TutorDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      {/* ... existing tutor dashboard ... */}
      
      {/* Portfolio Review Section */}
      <TutorReviewQueue tutorId={user.uid} />
    </div>
  );
}
```

---

## 🎨 Customization Options

### **Change Video Length Limit**

In `PortfolioSubmission.tsx`, line ~125:
```typescript
// Auto-stop at 2 minutes
if (prev >= 120) {  // Change to 180 for 3 minutes, etc.
  stopRecording();
  return 120;
}
```

### **Change File Size Limits**

In `PortfolioSubmission.tsx`:
```typescript
// Image size check (currently 10MB)
if (file.size > 10 * 1024 * 1024) {  // Change to 5 for 5MB, etc.
  toast.error('Image too large!');
  return;
}
```

### **Add Custom Submission Types**

Add new types to the schema:
```typescript
type: 'video' | 'image' | 'note' | 'audio' | 'code' | 'link';
```

Then add corresponding UI in PortfolioSubmission.tsx.

---

## 📊 Analytics & Insights

### **Track Portfolio Engagement**

Add to your analytics:

```typescript
// In PortfolioSubmission.tsx after successful upload
await addDoc(collection(db, 'analytics'), {
  event: 'portfolio_submission',
  studentId,
  type: submissionType,
  timestamp: new Date(),
  hasNotes: !!notes.trim(),
  challengeId: challengeId || null,
});
```

### **Parent Engagement Metrics**

Track when parents view portfolios:

```typescript
// In ParentPortfolioView.tsx
useEffect(() => {
  // Log parent view
  addDoc(collection(db, 'parentActivity'), {
    parentId,
    childId,
    action: 'viewed_portfolio',
    timestamp: new Date(),
  });
}, []);
```

---

## 🔔 Notifications (Future Enhancement)

### **Email Notification to Parent**

When student submits portfolio item:

```typescript
// After successful upload in PortfolioSubmission.tsx
await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    to: parentEmail,
    subject: `${studentName} added to their portfolio!`,
    html: `
      <h2>New Portfolio Item</h2>
      <p>${studentName} just uploaded a ${type} to their learning portfolio!</p>
      <a href="https://mzmariannas.academy/parent-dashboard">View Now</a>
    `,
  }),
});
```

### **Tutor Notification**

When new items need review:

```typescript
// Daily digest email to tutors
// Run via Firebase scheduled function (cron job)
export const dailyTutorDigest = functions.pubsub
  .schedule('every day 08:00')
  .onRun(async () => {
    // Get pending items for each tutor
    // Send summary email
  });
```

---

## 🧪 Testing Checklist

### **Student Submission Flow:**
- [ ] Video recording starts with countdown
- [ ] Video preview shows correctly
- [ ] Can retake video
- [ ] Upload progress shows
- [ ] Submission saves to Firestore
- [ ] File uploads to Firebase Storage
- [ ] Toast notification on success
- [ ] Portfolio gallery updates in real-time

### **Parent View:**
- [ ] Can see all child's portfolio items
- [ ] Stats display correctly
- [ ] Can view item details (video plays, image shows)
- [ ] "NEW" badge shows for unviewed items
- [ ] Marking as viewed works

### **Tutor Review:**
- [ ] Pending items show in queue
- [ ] Can add feedback
- [ ] Feedback saves correctly
- [ ] Item moves from pending to reviewed
- [ ] Student/parent can see feedback

### **Edge Cases:**
- [ ] Camera permission denied - shows helpful error
- [ ] Large file upload - shows progress correctly
- [ ] No internet - shows error, doesn't lose data
- [ ] Multiple concurrent uploads - handles correctly

---

## 🚨 Troubleshooting

### **"Camera not accessible"**
- Check browser permissions (chrome://settings/content/camera)
- Ensure HTTPS (required for camera access)
- Try different browser (Chrome/Firefox recommended)

### **"Upload failed"**
- Check Firebase Storage rules
- Verify file size within limits
- Check internet connection
- Verify Firebase Storage is enabled in project

### **"Video not playing"**
- Check browser codec support (WebM)
- Try different browser
- Verify Storage CORS settings

### **"Real-time updates not working"**
- Check Firestore rules allow read access
- Verify onSnapshot listener is set up correctly
- Check browser console for errors

---

## 💰 Cost Estimates

### **Firebase Storage**
- Free tier: 5GB storage, 1GB/day download
- After free tier: $0.026/GB/month storage, $0.12/GB download
- **Estimate:** 100 students × 10 videos × 5MB = 5GB = FREE

### **Firebase Firestore**
- Free tier: 50K reads/day, 20K writes/day
- After free tier: $0.06 per 100K reads, $0.18 per 100K writes
- **Estimate:** Even with 1000 students, should stay within free tier

### **Bandwidth**
- Vercel: 100GB/month free
- **Estimate:** 100 students × 20 portfolio views/month × 5MB = 10GB = FREE

**Total estimated cost for 100 students: $0-$5/month** ✅

---

## 🎯 Future Enhancements

1. **Audio Recordings** - Let students record voice explanations
2. **Code Snippets** - Embed code with syntax highlighting
3. **Collaborative Projects** - Multiple students on one portfolio item
4. **Peer Feedback** - Students can comment on each other's work (moderated)
5. **Portfolio Sharing** - Generate shareable links for grandparents, teachers
6. **Export Portfolio** - Download as PDF for offline viewing
7. **AI Auto-Feedback** - Wowl provides instant encouraging comments
8. **Portfolio Badges** - Earn badges for consistent submissions
9. **Showcase Mode** - Public gallery of exceptional work (with permission)
10. **Video Editing** - Trim/add text to videos before submitting

---

## ✅ Summary

**You now have:**
✅ Video recording with live preview  
✅ Image upload with drag-and-drop  
✅ Text reflections  
✅ Student portfolio gallery  
✅ Parent portfolio viewer with stats  
✅ Tutor review queue with feedback  
✅ Real-time updates  
✅ Firebase Storage integration  
✅ Neurodivergent-friendly design (countdown, time limits, encouraging language)  

**Time to build:** Already done! Just integrate into your dashboards (30-60 minutes)

**This solves:**
- Evidence submission gap (from competitive analysis)
- Parent visibility into learning
- Tutor feedback loop
- Student documentation of progress
- Play-based learning showcase (Roblox builds, coding projects)

**Next steps:**
1. Add components to dashboards (Step 3-5 above)
2. Deploy Firebase Storage rules
3. Test with beta families
4. Gather feedback and iterate

🚀 Your students can now document their learning journey just like Seesaw and ClassDojo! 💜🦉
