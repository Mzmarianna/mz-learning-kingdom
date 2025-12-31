# 📊 Data Storage & Student Management Guide

## 🗄️ Where Is All Data Stored?

**ALL student data is stored in Firebase Firestore** - a cloud NoSQL database that's part of your Firebase project.

**Firebase Console URL:**
https://console.firebase.google.com/project/mz-marianna-kingdom-learning/firestore

---

## 📁 Firestore Database Structure

Your platform uses these Firestore collections:

### **Core Collections:**

#### **1. `users/` Collection** 
**What it stores:** All user accounts (students, parents, tutors, teachers, admins, schools)

```javascript
users/{userId} {
  uid: "abc123",
  email: "student@example.com",
  displayName: "Sarah Johnson",
  role: "student",  // or "parent", "tutor", "teacher", "admin", "school"
  createdAt: Timestamp,
  lastLogin: Timestamp,
  profilePicture: "url...",
  
  // Student-specific fields
  studentProfile?: {
    avatarType: "unicorn",
    currentLevel: 1,
    totalXP: 1500,
    robuxEarned: 800,
    robuxSpent: 0
  },
  
  // Parent-specific fields
  childIds?: ["childUid1", "childUid2"],
  
  // Tutor-specific fields
  assignedStudentIds?: ["studentUid1", "studentUid2"]
}
```

**Where you see this:**
- Admin Dashboard → User Management
- Tutor Dashboard → My Students
- Parent Dashboard → My Children

---

#### **2. `students/` Collection**
**What it stores:** Detailed student profiles and progress

```javascript
students/{studentId} {
  id: "student123",
  userId: "userUid123",      // Links to users collection
  parentId: "parentUid456",  // Parent's user ID
  tutorId: "tutorUid789",    // Assigned tutor
  displayName: "Sarah",
  avatarType: "unicorn",
  currentLevel: 1,
  totalXP: 1500,
  robuxBalance: 800,
  createdAt: Timestamp,
  
  // Current learning state
  currentLessonId: "L1UM-01",
  levelsCompleted: ["L1UM"],
  
  // Detailed progress by level
  progressByLevel: {
    "L1UM": {
      completedLessons: ["L1UM-01", "L1UM-02", "L1UM-03"],
      badgesEarned: 3,
      robuxEarned: 300,
      startedAt: Timestamp,
      completedAt: Timestamp
    },
    "L2UM": {
      completedLessons: ["L2UM-01"],
      badgesEarned: 1,
      robuxEarned: 100,
      startedAt: Timestamp
    }
  }
}
```

**Where you see this:**
- Tutor Dashboard → Student Detail View
- Admin Dashboard → Student Management
- Student Dashboard → My Progress

---

#### **3. `studentProgress/` Collection**
**What it stores:** Granular lesson-by-lesson progress

```javascript
studentProgress/{progressId} {
  studentId: "student123",
  lessonId: "L1UM-01",
  status: "completed",  // "not_started", "in_progress", "completed"
  
  // Activity completion
  activitiesCompleted: [
    "L1UM-01-activity-1",
    "L1UM-01-activity-2"
  ],
  
  // Scores and performance
  quizScore: 9,
  quizTotal: 10,
  attemptsCount: 1,
  
  // XP and rewards
  xpEarned: 50,
  robuxEarned: 100,
  badgeEarned: true,
  badgeId: "counting-champion",
  
  // Timestamps
  startedAt: Timestamp,
  lastActivityAt: Timestamp,
  completedAt: Timestamp
}
```

**Where you see this:**
- Student Dashboard → Lesson Progress
- Tutor Dashboard → Student Assessment View
- Parent Dashboard → Child Progress Report

---

#### **4. `portfolioItems/` Collection**
**What it stores:** Student work submissions (videos, images, text)

```javascript
portfolioItems/{itemId} {
  id: "portfolio123",
  studentId: "student123",
  type: "video",  // or "image", "text"
  title: "My Counting Video",
  description: "I counted to 100!",
  
  // Media storage
  mediaUrl: "https://storage.googleapis.com/...",
  thumbnailUrl: "https://storage.googleapis.com/...",
  
  // Context
  lessonId: "L1UM-01",
  levelId: "L1UM",
  
  // Timestamps
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Tutor feedback
  tutorFeedback: {
    tutorId: "tutorUid789",
    message: "Great work! Love how you counted by 5s!",
    rating: 5,  // 1-5 stars
    createdAt: Timestamp
  },
  
  // Status
  reviewStatus: "reviewed"  // "pending", "reviewed"
}
```

**Where you see this:**
- Student Dashboard → My Portfolio
- Parent Dashboard → Child Portfolio
- Tutor Dashboard → Review Queue
- Tutor Dashboard → Student Portfolio

---

#### **5. `messages/` Collection**
**What it stores:** Messages between parents and tutors

```javascript
messages/{messageId} {
  id: "msg123",
  fromUserId: "parentUid456",
  toUserId: "tutorUid789",
  subject: "Question about Sarah's progress",
  body: "Hi! I noticed Sarah is doing great...",
  
  // Status
  read: false,
  archived: false,
  
  // Context
  studentId: "student123",  // Optional: if about a specific student
  
  // Timestamps
  createdAt: Timestamp,
  readAt: Timestamp | null
}
```

**Where you see this:**
- Parent Dashboard → Messages
- Tutor Dashboard → Messages
- Teacher Dashboard → Messages

---

#### **6. `lessonData/` Collection** (Future)
**What it stores:** Curriculum content (currently in code, will move here)

```javascript
lessonData/{lessonId} {
  id: "L1UM-01",
  levelId: "L1UM",
  title: "Numbers 0-10",
  description: "Learn to count from 0 to 10",
  
  // Activities
  activities: [
    {
      id: "activity-1",
      type: "video",
      title: "Counting Song",
      videoUrl: "..."
    },
    {
      id: "activity-2",
      type: "interactive",
      title: "Count the Objects",
      config: {...}
    }
  ],
  
  // Rewards
  xpReward: 50,
  robuxReward: 100,
  badgeId: "counting-master"
}
```

---

### **File Storage (Firebase Storage):**

All media files are stored in **Firebase Cloud Storage**:

**Storage Console:**
https://console.firebase.google.com/project/mz-marianna-kingdom-learning/storage

#### **Storage Structure:**
```
/profile-pictures/{userId}/
  - avatar.jpg
  - avatar_thumb.jpg

/portfolio/{studentId}/{itemId}/
  - video.mp4
  - video_thumb.jpg
  - image1.jpg
  - image2.jpg

/avatars/{userId}/
  - unicorn.glb
  - customizations.json
```

---

## 👥 Where to See & Manage Students

### **1. Firebase Console (Raw Data Access)**

**URL:** https://console.firebase.google.com/project/mz-marianna-kingdom-learning/firestore/data

**What you can do:**
- ✅ View all collections
- ✅ See raw student data
- ✅ Manually edit any field
- ✅ Delete documents
- ✅ Run queries
- ✅ Export data
- ✅ Import data

**Best for:** Technical admin, debugging, bulk operations

---

### **2. Admin Dashboard (In Your App)**

**URL:** Your app URL after logging in as Admin

**What you can do:**
- ✅ View all users
- ✅ Create/edit user accounts
- ✅ Assign students to tutors
- ✅ View system-wide analytics
- ✅ Manage curriculum
- ✅ Configure settings

**Best for:** Day-to-day management, user administration

**To access:**
1. Create an admin account (see below)
2. Log in to your app
3. You'll see the Admin Dashboard

---

### **3. Tutor Dashboard (In Your App)**

**URL:** Your app URL after logging in as Tutor

**What you can do:**
- ✅ View assigned students
- ✅ See student progress by lesson
- ✅ Review portfolio submissions
- ✅ Provide feedback on student work
- ✅ Award badges and XP
- ✅ Message parents
- ✅ Track lesson completion

**Best for:** Daily teaching activities, student monitoring

**Current Features:**
- Student list with quick stats
- Pending reviews counter
- Active quests tracker
- Message center
- Progress reports

---

### **4. Parent Dashboard (In Your App)**

**URL:** Your app URL after logging in as Parent

**What you can do:**
- ✅ View child's progress
- ✅ See completed lessons
- ✅ View portfolio items
- ✅ Track XP and Robux
- ✅ Message tutor
- ✅ Celebrate achievements

**Best for:** Parent engagement, progress monitoring

---

## 📝 How to Add Assessments & Progress

### **Method 1: Student Completes Lesson (Automatic)**

When a student completes a lesson in their dashboard:

1. **Student clicks "Start Lesson"**
   - Creates `studentProgress` document with `status: "in_progress"`

2. **Student completes activities**
   - Updates `activitiesCompleted` array
   - Tracks time spent

3. **Student completes quiz**
   - Records `quizScore` and `quizTotal`
   - Calculates performance

4. **Student clicks "Finish Lesson"**
   - Updates `status: "completed"`
   - Awards XP (e.g., 50 XP)
   - Awards Robux (e.g., 100 Robux)
   - Awards badge if earned
   - Updates student's `totalXP` and `robuxBalance`
   - Adds lesson to `completedLessons` array

**All automatic! No manual entry needed.**

---

### **Method 2: Tutor Reviews Portfolio (Manual Assessment)**

When a tutor reviews student work:

1. **Student uploads portfolio item**
   - Creates `portfolioItems` document
   - Sets `reviewStatus: "pending"`

2. **Tutor sees item in Review Queue**
   - Tutor Dashboard → Review Queue

3. **Tutor provides feedback**
   - Adds `tutorFeedback.message`
   - Adds `tutorFeedback.rating` (1-5 stars)
   - Updates `reviewStatus: "reviewed"`

4. **Optional: Award bonus XP**
   - Tutor can click "Award Bonus XP"
   - Adds XP to student's account
   - Creates `xpEvent` record

---

### **Method 3: Manual Progress Entry (Firebase Console)**

For offline work or special circumstances:

1. **Go to Firebase Console → Firestore**

2. **Navigate to `studentProgress` collection**

3. **Click "Add Document"**

4. **Fill in fields:**
```javascript
{
  studentId: "student123",
  lessonId: "L1UM-05",
  status: "completed",
  quizScore: 10,
  quizTotal: 10,
  xpEarned: 50,
  robuxEarned: 100,
  badgeEarned: true,
  badgeId: "addition-ace",
  completedAt: [Use Timestamp.now()]
}
```

5. **Update student's totals in `students` collection:**
   - Add 50 to `totalXP`
   - Add 100 to `robuxBalance`
   - Add "L1UM-05" to `progressByLevel.L1UM.completedLessons`

---

### **Method 4: Bulk Import (CSV/JSON)**

For migrating existing student data:

1. **Prepare your data in JSON format:**
```json
[
  {
    "studentId": "student123",
    "lessonId": "L1UM-01",
    "status": "completed",
    "completedAt": "2024-01-15T10:00:00Z"
  },
  {
    "studentId": "student123",
    "lessonId": "L1UM-02",
    "status": "completed",
    "completedAt": "2024-01-16T10:00:00Z"
  }
]
```

2. **Use Firebase Admin SDK or Import Tool**
   - Firebase Console → Firestore → Import/Export
   - Or use custom script (I can create this for you)

---

## 🎯 Common Tasks & Where to Do Them

### **View Individual Student Progress:**

**Option 1: Tutor Dashboard**
1. Log in as Tutor
2. Click on student in "My Students" list
3. See detailed progress breakdown by level
4. See completed lessons, earned badges, XP, Robux

**Option 2: Firebase Console**
1. Go to Firestore
2. Navigate to `students/{studentId}`
3. See all progress data
4. Navigate to `studentProgress` collection
5. Filter by `studentId` to see all lessons

**Option 3: Parent Dashboard**
1. Parent logs in
2. Selects their child
3. Sees progress dashboard
4. Views completed work in portfolio

---

### **Add/Update Student Information:**

**Option 1: Admin Dashboard** (Recommended)
1. Log in as Admin
2. Go to User Management
3. Click "Add Student" or select existing student
4. Edit profile information
5. Assign to tutor
6. Set current level

**Option 2: Firebase Console** (Manual)
1. Go to Firestore → `students` collection
2. Click document or "Add Document"
3. Edit fields directly
4. Save changes

---

### **Award Bonus XP or Robux:**

**Option 1: Tutor Dashboard** (Coming Soon)
1. Select student
2. Click "Award Bonus"
3. Enter amount and reason
4. Confirm

**Option 2: Firebase Console** (Manual)
1. Go to `students/{studentId}`
2. Update `totalXP` field (add bonus amount)
3. Update `robuxBalance` field (add bonus amount)
4. Optionally create `xpEvent` for record-keeping

---

### **View All Portfolio Submissions:**

**Tutor Dashboard:**
1. Log in as Tutor
2. Go to "Review Queue"
3. See pending submissions
4. Click item to review
5. Add feedback and rating

**Firebase Console:**
1. Go to `portfolioItems` collection
2. Filter by `reviewStatus: "pending"`
3. View all pending items

---

### **Generate Progress Reports:**

**Parent Dashboard:**
1. Parent selects child
2. Clicks "View Report"
3. Sees summary with:
   - Lessons completed this week/month
   - XP earned
   - Badges earned
   - Portfolio highlights
   - Tutor feedback

**Admin Dashboard:**
1. Select "Analytics"
2. Choose date range
3. Select students or groups
4. Generate report
5. Export as PDF

---

## 🔐 Setting Up Admin Access

### **Create First Admin Account:**

**Method 1: Firebase Console**

1. **Go to Firebase Console → Authentication**
   - https://console.firebase.google.com/project/mz-marianna-kingdom-learning/authentication/users

2. **Click "Add User"**
   - Email: `admin@mzmarianna.com`
   - Password: (choose strong password)
   - Click "Add User"

3. **Copy the User UID** (looks like: `abc123xyz456`)

4. **Go to Firestore → `users` collection**

5. **Click "Add Document"**

6. **Use the UID as Document ID**

7. **Add fields:**
```javascript
{
  uid: "abc123xyz456",  // Same as Auth UID
  email: "admin@mzmarianna.com",
  displayName: "Admin User",
  role: "admin",
  createdAt: [Timestamp.now()],
  lastLogin: [Timestamp.now()]
}
```

8. **Save**

9. **Log in to your app** with admin credentials

10. **You'll see the Admin Dashboard!**

---

### **Create Tutor Accounts:**

Same process as admin, but set `role: "tutor"` and add:

```javascript
{
  uid: "tutor123",
  email: "tutor@mzmarianna.com",
  displayName: "Jane Smith",
  role: "tutor",
  assignedStudentIds: [],  // Start empty, assign later
  createdAt: [Timestamp.now()]
}
```

---

## 📊 Data Reports You Can Generate

### **1. Student Progress Report**

**What it shows:**
- Lessons completed (count and list)
- XP earned over time
- Badges earned
- Robux balance
- Current level
- Strengths and areas for improvement

**Where to get it:**
- Parent Dashboard → "View Report"
- Tutor Dashboard → Student Detail → "Generate Report"
- Admin Dashboard → Analytics → "Student Report"

---

### **2. Tutor Activity Report**

**What it shows:**
- Students assigned
- Feedback provided (count)
- Response time (average)
- Messages sent/received
- Reviews completed

**Where to get it:**
- Admin Dashboard → Analytics → "Tutor Report"

---

### **3. Platform Analytics**

**What it shows:**
- Total students enrolled
- Active students (logged in last 7 days)
- Lessons completed (total)
- Portfolio items submitted
- Average progress by level
- Most popular lessons
- Student engagement metrics

**Where to get it:**
- Admin Dashboard → Analytics → "Platform Overview"

---

## 🔄 Data Backup & Export

### **Automatic Backups (Recommended):**

**Set up in Firebase Console:**
1. Go to Firestore → Backups
2. Enable automated daily backups
3. Choose Cloud Storage location
4. Set retention period (30 days recommended)

### **Manual Export:**

1. **Go to Firebase Console → Firestore**
2. **Click "Import/Export"**
3. **Select collections to export**
4. **Choose Cloud Storage bucket**
5. **Click "Export"**
6. **Download from Cloud Storage**

**File format:** JSON (easily readable and importable)

---

## 🛠️ Future Enhancements (Coming Soon)

### **Admin Dashboard Features:**
- [ ] User Management UI (create, edit, delete users)
- [ ] Student Assignment UI (assign students to tutors)
- [ ] Bulk progress import tool
- [ ] Advanced analytics dashboard
- [ ] Custom report builder
- [ ] Data export tools

### **Tutor Dashboard Features:**
- [ ] Student detail pages (deep dive into progress)
- [ ] Portfolio review interface (currently in queue)
- [ ] Bonus XP/Robux award button
- [ ] Custom assessments creator
- [ ] Progress notes system
- [ ] Parent communication log

### **Parent Dashboard Features:**
- [ ] Detailed progress charts
- [ ] Portfolio gallery view
- [ ] Achievement celebrations
- [ ] Weekly progress emails
- [ ] Goal setting tools

---

## 📞 Quick Reference

### **Firebase URLs:**

**Console Home:**
https://console.firebase.google.com/project/mz-marianna-kingdom-learning

**Firestore Database:**
https://console.firebase.google.com/project/mz-marianna-kingdom-learning/firestore/data

**Authentication:**
https://console.firebase.google.com/project/mz-marianna-kingdom-learning/authentication/users

**Storage:**
https://console.firebase.google.com/project/mz-marianna-kingdom-learning/storage

---

### **Key Collections:**

| Collection | Purpose |
|------------|---------|
| `users` | All user accounts (all roles) |
| `students` | Student profiles & overall progress |
| `studentProgress` | Lesson-by-lesson progress details |
| `portfolioItems` | Student work submissions |
| `messages` | Parent-tutor communications |
| `xpEvents` | XP transaction log |
| `badgesEarned` | Badge award records |

---

### **Key Fields for Progress Tracking:**

**In `students` collection:**
- `totalXP` - Total XP earned
- `robuxBalance` - Current Robux balance
- `currentLevel` - Current level (1, 2, or 3)
- `progressByLevel.{levelId}.completedLessons` - Array of completed lesson IDs

**In `studentProgress` collection:**
- `status` - "not_started", "in_progress", "completed"
- `quizScore` - Score on quiz (e.g., 9)
- `quizTotal` - Total possible (e.g., 10)
- `xpEarned` - XP awarded for this lesson
- `completedAt` - Timestamp of completion

---

## ✅ Summary

**Your data lives in:**
1. **Firebase Firestore** (database) - All structured data
2. **Firebase Storage** (files) - All media files
3. **Firebase Authentication** (users) - Login credentials

**You access it through:**
1. **Firebase Console** (direct database access)
2. **Admin Dashboard** (management interface)
3. **Tutor Dashboard** (teaching interface)
4. **Parent Dashboard** (monitoring interface)

**Progress is tracked:**
1. **Automatically** (as students complete lessons)
2. **By tutors** (reviewing portfolio items)
3. **Manually** (admin can add via Firebase Console)

**You can see student information in:**
- Firebase Console Firestore tab (raw data)
- Admin Dashboard (coming soon: full user management UI)
- Tutor Dashboard (students assigned to you)
- Parent Dashboard (parent's own children)

---

**Your platform is ready to track and manage all student progress! 🚀**

Need help setting up your first admin account or accessing the data? Let me know! 💜
