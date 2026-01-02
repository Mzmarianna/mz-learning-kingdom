# 🦉 WOWL AI CHAT - SETUP GUIDE

## ✅ **WHAT'S READY NOW**

Your AI chat companion **Wowl the Owl** is fully integrated and working! Students can click the floating button in the bottom right of their dashboard and start chatting immediately.

### **Current Features (Working Now):**
- ✅ Floating chat button (always visible)
- ✅ Beautiful purple/pink gradient chat window
- ✅ Smart placeholder responses (keyword-based)
- ✅ Personalized greetings
- ✅ Quick action buttons (Idea, Game, Learn, Break)
- ✅ Suggestion chips after each AI response
- ✅ Context-aware responses (knows student name, level, current quest)
- ✅ Typing indicators
- ✅ Message history
- ✅ Mobile responsive

---

## 🎯 **WHAT IT DOES**

Wowl responds intelligently to:
- **Math questions** → Suggests games, Roblox challenges, movement activities
- **Reading help** → Creative reading strategies, character voices
- **Game requests** → Building challenges, scavenger hunts, coding projects
- **Creative prompts** → Design projects, pattern builders
- **Feeling stuck** → Breaks down tasks, encouragement, growth mindset
- **Tiredness/boredom** → Brain breaks, movement, water reminders
- **Interests** → Matches lessons to student's favorite topics

### **Example Interactions:**

**Student:** "I want to play a math game"  
**Wowl:** "Since you're at Level 2, let's try a Roblox math challenge! Build a tower where each floor has 10 blocks. Count as you build! 🏗️"

**Student:** "This is hard"  
**Wowl:** "Hoot! I can tell this is tricky, but guess what? Tricky means your brain is GROWING! 🧠💪 Let's break it into tiny steps. What's the FIRST small thing you need to do?"

**Student:** "I'm tired"  
**Wowl:** "I hear you! Sometimes our brains need a wiggle break. 🌟 How about this: Do 5 silly movements, drink some water, then come back. Your brain will thank you! 💧✨"

---

## 🔧 **HOW TO ADD REAL AI (Gemini/Firebase)**

### **Option 1: Google Gemini AI (Recommended)**

#### **Step 1: Install Gemini SDK**
```bash
npm install @google/generative-ai
```

#### **Step 2: Get API Key**
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add to your `.env.local`:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

#### **Step 3: Create AI Service**
Create `/lib/ai-service.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

interface AIContext {
  studentName: string;
  currentLevel: number;
  interests: string[];
  learningStyle: string;
  recentTopics: string[];
  conversationHistory: { role: 'user' | 'assistant'; content: string }[];
}

export async function getWowlResponse(
  message: string, 
  context: AIContext
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build context-aware prompt
    const systemPrompt = `You are Wowl the Owl, a friendly AI learning companion for neurodivergent students (ADHD/dyslexia). 

Your personality:
- Warm, encouraging, playful
- Uses "Hoot!" and owl puns occasionally
- NEVER criticizes or uses negative language
- Breaks tasks into tiny steps
- Suggests movement/breaks when needed
- Makes everything a game
- Celebrates effort over perfection

Student context:
- Name: ${context.studentName}
- Level: ${context.currentLevel}
- Interests: ${context.interests.join(', ') || 'Not specified yet'}
- Learning style: ${context.learningStyle}
- Currently studying: ${context.recentTopics.join(', ') || 'Getting started'}

Guidelines:
- Keep responses SHORT (2-3 sentences max)
- Use emojis (but not excessively)
- Suggest Roblox, building, coding, movement activities
- If student seems stuck/frustrated, suggest breaks
- Make math fun with games
- Relate to their interests when possible
- End with an encouraging question or suggestion

Student message: "${message}"

Respond as Wowl:`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Gemini AI error:', error);
    // Fallback to placeholder response
    return "Hoot! I'm having trouble thinking right now. Can you try asking that again? 🦉";
  }
}
```

#### **Step 4: Update WowlAIChat Component**
In `/components/student/WowlAIChat.tsx`, replace the `generateAIResponse` function:

```typescript
import { getWowlResponse } from '../../lib/ai-service';

// Inside component...
const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await getWowlResponse(userMessage, {
      studentName,
      currentLevel,
      interests,
      learningStyle,
      recentTopics,
      conversationHistory: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    });
    return response;
  } catch (error) {
    console.error('AI error:', error);
    // Fallback to existing placeholder logic
    return "Hoot! Let me think about that... 🤔";
  }
};
```

---

### **Option 2: Firebase Vertex AI (Alternative)**

#### **Step 1: Enable Vertex AI in Firebase**
```bash
npm install firebase-admin
```

#### **Step 2: Setup in Firebase Console**
1. Go to Firebase Console → Build → Vertex AI
2. Enable Gemini API
3. Get credentials

#### **Step 3: Create Cloud Function**
Create `functions/src/ai.ts`:

```typescript
import { onCall } from 'firebase-functions/v2/https';
import { VertexAI } from '@google-cloud/vertexai';

const vertex = new VertexAI({ project: 'your-project-id', location: 'us-central1' });

export const getWowlResponse = onCall(async (request) => {
  const { message, context } = request.data;
  
  const model = vertex.preview.getGenerativeModel({
    model: 'gemini-pro',
  });

  const prompt = `You are Wowl the Owl... [same prompt as above]`;
  
  const result = await model.generateContent(prompt);
  return { response: result.response.text() };
});
```

Deploy:
```bash
firebase deploy --only functions
```

Use in frontend:
```typescript
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../lib/firebase';

const getWowlResponseFn = httpsCallable(functions, 'getWowlResponse');

const response = await getWowlResponseFn({
  message: userMessage,
  context: { studentName, currentLevel, ... }
});
```

---

## 🎨 **CUSTOMIZATION OPTIONS**

### **Adjust Wowl's Personality**
Edit the system prompt in `ai-service.ts`:

```typescript
const systemPrompt = `You are Wowl the Owl...

PERSONALITY ADJUSTMENTS:
- More playful: Add more owl puns, silly jokes
- More serious: Focus on learning strategies
- More energetic: Use more exclamation marks, caps
- More calm: Use gentler language, meditation prompts

Add to guidelines:
- Always mention Robux rewards when discussing math
- Suggest specific Roblox games by name
- Reference popular kids' shows/games
- Include parent communication tips
`;
```

### **Add Context from User Profile**
When you have user profiles with interests:

```typescript
// In StudentDashboard.tsx
<WowlAIChat
  studentName={user.displayName}
  interests={user.profile?.interests || ['Roblox', 'Minecraft', 'Pokemon']}
  learningStyle={user.profile?.learningStyle || 'visual'}
  currentLevel={xpSummary?.currentLevel || 1}
  recentTopics={[currentQuest?.templateId, ...user.recentLessons]}
/>
```

### **Add Memory/Context**
Store conversation in Firestore:

```typescript
// Save each exchange
await db.collection('ai_conversations').add({
  studentId: user.uid,
  messages: [{
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  }, {
    role: 'assistant',
    content: aiResponse,
    timestamp: new Date()
  }],
  createdAt: new Date()
});

// Load recent conversations on component mount
const recentChats = await db
  .collection('ai_conversations')
  .where('studentId', '==', user.uid)
  .orderBy('createdAt', 'desc')
  .limit(5)
  .get();
```

---

## 🚀 **ADVANCED FEATURES**

### **1. Voice Input/Output**
```typescript
// Add speech recognition
const recognition = new webkitSpeechRecognition();
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  setInputMessage(transcript);
  handleSendMessage();
};

// Add text-to-speech for responses
const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices.find(v => v.name.includes('Female')) || voices[0];
  speechSynthesis.speak(utterance);
};
```

### **2. Emotion Detection**
```typescript
// Analyze sentiment of student messages
const detectEmotion = (message: string) => {
  const frustrated = /hard|difficult|hate|can't|stuck/i.test(message);
  const excited = /love|cool|awesome|fun|yes/i.test(message);
  const tired = /tired|bored|done|want to stop/i.test(message);
  
  if (frustrated) return 'frustrated';
  if (excited) return 'excited';
  if (tired) return 'tired';
  return 'neutral';
};

// Adjust response tone based on emotion
if (emotion === 'frustrated') {
  prompt += '\nStudent seems frustrated. Offer encouragement and break task into smaller steps.';
}
```

### **3. Learning Path Recommendations**
```typescript
// Ask Wowl to suggest next lesson
const suggestNextLesson = async (currentProgress: any) => {
  const response = await getWowlResponse(
    "What should I learn next?",
    {
      ...context,
      currentProgress,
      completedLessons: ['counting-10', 'addition-basic']
    }
  );
  
  // Parse response and route to suggested quest
  return response;
};
```

### **4. Parent Updates**
```typescript
// Auto-generate parent summary
const generateParentUpdate = async (studentActivity: any) => {
  const summary = await getWowlResponse(
    "Summarize this week for parents",
    {
      ...context,
      weeklyActivity: studentActivity
    }
  );
  
  // Email to parent
  sendEmail(parent.email, 'Weekly Progress Update', summary);
};
```

---

## 📊 **ANALYTICS TO TRACK**

```typescript
// Track in Firebase Analytics
import { logEvent } from 'firebase/analytics';

// When student sends message
logEvent(analytics, 'wowl_chat_message_sent', {
  student_id: user.uid,
  message_length: message.length,
  topic: detectTopic(message),
  emotion: detectEmotion(message)
});

// When AI responds
logEvent(analytics, 'wowl_chat_response_received', {
  student_id: user.uid,
  response_time_ms: responseTime,
  suggestion_clicked: false
});

// When suggestion clicked
logEvent(analytics, 'wowl_suggestion_clicked', {
  student_id: user.uid,
  suggestion_text: suggestion
});
```

---

## 💰 **COST ESTIMATES**

### **Gemini API Pricing (as of Dec 2024):**
- **gemini-pro:** Free up to 60 requests/minute
- **Paid tier:** $0.00025 per 1K characters input, $0.0005 per 1K characters output
- **Average chat:** ~500 characters = ~$0.0004 per exchange
- **For 100 students × 10 chats/day:** ~$12/month

### **Optimization Tips:**
1. **Cache common responses** (FAQ, greetings)
2. **Limit message length** (students use short messages anyway)
3. **Batch multiple questions** when possible
4. **Use cheaper model** for simple responses
5. **Set daily limits** per student (10-20 messages)

---

## 🎯 **TESTING CHECKLIST**

Before going live:

- [ ] Test API key works
- [ ] Verify responses are appropriate
- [ ] Test with different student levels (1-3)
- [ ] Test with various interests
- [ ] Try frustrated/stuck messages
- [ ] Test suggestion clicks
- [ ] Verify mobile responsive
- [ ] Check typing indicator works
- [ ] Test message history saves
- [ ] Verify quick action buttons
- [ ] Test error handling (API down)
- [ ] Check profanity filter (if needed)
- [ ] Test max message length
- [ ] Verify rate limiting

---

## 🛡️ **SAFETY & MODERATION**

### **Content Filtering**
```typescript
const filterContent = (message: string): boolean => {
  const inappropriateWords = [...]; // Your list
  return !inappropriateWords.some(word => 
    message.toLowerCase().includes(word)
  );
};

// Before sending to AI
if (!filterContent(userMessage)) {
  return "Hoot! Let's keep our chat friendly and focused on learning! 🦉";
}
```

### **Parent Visibility**
```typescript
// Save all chats for parent review
await db.collection('chat_logs').add({
  studentId: user.uid,
  parentId: user.parentId,
  message: userMessage,
  response: aiResponse,
  timestamp: new Date(),
  flagged: false
});

// Parent dashboard: View child's AI conversations
```

---

## 🎉 **YOU'RE READY TO LAUNCH!**

### **Current State:**
✅ **Wowl is live** with smart placeholder responses  
✅ **Fully functional** chat interface  
✅ **Context-aware** responses  
✅ **Mobile responsive**  
✅ **Beautiful UI** matching your brand  

### **To Add Real AI:**
1. Get Gemini API key (5 minutes)
2. Create `ai-service.ts` (10 minutes)
3. Update `generateAIResponse` (5 minutes)
4. Test with students (30 minutes)
5. Deploy! 🚀

### **Next Steps:**
- Start with placeholder (it's surprisingly good!)
- Monitor which questions students ask most
- Add real AI when ready
- Iterate based on usage data

---

## 📞 **SUPPORT RESOURCES**

- **Gemini AI Docs:** https://ai.google.dev/docs
- **Firebase Vertex AI:** https://firebase.google.com/docs/vertex-ai
- **Example prompts:** https://ai.google.dev/examples
- **Pricing calculator:** https://ai.google.dev/pricing

---

**🦉 Wowl is ready to help your students learn, play, and grow!**

*Last updated: December 31, 2025*
