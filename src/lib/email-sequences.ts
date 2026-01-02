/**
 * Email Sequence Templates for Mz. Marianna's Academy
 * 
 * These templates should be used with an email service like:
 * - SendGrid
 * - Mailchimp
 * - ConvertKit
 * - Customer.io
 * 
 * The sequences are designed to be warm, encouraging, and build trust
 * while gently guiding parents toward activation.
 */

interface QuizResults {
  childAge: string;
  learningChallenges: string[];
  motivation: string;
  struggles: string[];
  goals: string[];
  parentEmail: string;
  parentName: string;
}

/**
 * IMMEDIATE: Welcome Email (Sent immediately after quiz completion)
 */
export const getWelcomeEmail = (results: QuizResults) => {
  const firstName = results.parentName.split(' ')[0];
  
  return {
    subject: `${firstName}, your personalized plan for ${getChildName(results)} is ready! 🌟`,
    preheader: "You're not alone in this journey - we're here to help",
    body: `
Hi ${firstName},

First, let me say: **You're doing an amazing job.** I know how hard it is to watch your child struggle with learning, to see the tears, the frustration, the "I can't do this." You're here because you refuse to give up on them. That's beautiful.

Based on what you shared, here's what I recommend for ${getChildName(results)}:

## 🎯 Start Here: ${getRecommendedQuest(results)}

${getPersonalizedEncouragement(results)}

## 💜 What Makes Our Approach Different

- **XP Never Goes Down** - We celebrate every step forward, no penalties for mistakes
- **Instant Rewards** - Dopamine hits exactly when ADHD brains need them
- **No Red = No Shame** - Calm teal and purple colors, gentle feedback
- **Real Tutors** - Actual humans who care, not just algorithms

## 🚀 Your Next Steps

1. **Reply to this email** and tell me one thing that would make your child light up. I read every response.
2. **Create your free account** [Link] and explore the Quest Map together
3. **Start your first challenge** - I promise you'll see a spark in their eyes

You don't have to do this alone anymore. Our community of 100+ neurodivergent families is cheering you on.

With hope and encouragement,
Marianna 💜

P.S. - I'll check in with you in a few days. If you have questions before then, just hit reply. I'm here.

---
Mz. Marianna's Academy
Helping neurodivergent children find JOY in learning
`,
  };
};

/**
 * DAY 2: Success Story + Overcoming Doubt
 */
export const getDay2Email = (results: QuizResults) => {
  const firstName = results.parentName.split(' ')[0];
  
  return {
    subject: `${firstName}, remember when Sarah's mom felt the same way you do?`,
    preheader: "How one mom went from homework battles to 'Can I do another quest?'",
    body: `
Hi ${firstName},

I wanted to share something that might resonate with you.

Last year, Sarah's mom was exactly where you are now. Her 8-year-old with ADHD would melt down every time homework came up. The tears. The thrown pencils. The "I'm stupid" that broke her heart.

She told me: *"I just want him to feel successful at SOMETHING."*

Sound familiar?

Here's what happened when she tried Mz. Marianna's Academy:

**Day 1:** He was skeptical. But the Quest Map looked "like a game" so he tried one challenge.

**Day 3:** He earned 150 XP and unlocked his first badge. He RAN to show his mom.

**Week 2:** "Can I do my next quest before dinner?" - Words she NEVER thought she'd hear.

**Today:** They're on a 47-day learning streak. He asks to do his challenges BEFORE video games.

${getPersonalizedStory(results)}

The difference? It's not the child. It's the approach.

Traditional learning systems weren't built for brains like ${getChildName(results)}'s. Ours was.

**Ready to see that spark in your child's eyes?**
[Create Free Account]

Still not sure? Hit reply and tell me what's holding you back. I genuinely want to help.

Believing in your child,
Marianna 💜

P.S. - Sarah's mom said the best part isn't the reading improvement (though that's been huge). It's watching her son believe in himself again. That's priceless.
`,
  };
};

/**
 * DAY 5: Address Common Objections
 */
export const getDay5Email = (results: QuizResults) => {
  const firstName = results.parentName.split(' ')[0];
  
  return {
    subject: `${firstName}, "Will this actually work for MY child?"`,
    preheader: "The honest answer to the question you're probably asking",
    body: `
Hi ${firstName},

You're probably wondering: *"Okay, but will this actually work for MY child?"*

I get it. You've tried other things. Apps that promised engagement but lost their attention in a week. Tutors who didn't understand neurodivergent brains. Workbooks that ended in tears.

**Here's the honest truth:**

I can't promise your child will transform overnight. Every kid is different.

But I CAN promise:
- We understand ADHD and dyslexic brains (the system was literally built for them)
- Your child will never lose points for mistakes
- Every challenge gives instant feedback (because waiting is torture for ADHD brains)
- Real tutors review their work with encouragement, not just "wrong"

${getPersonalizedReassurance(results)}

**What other parents ask:**

*"Is it really free to try?"*
Yes. No credit card. Full access to the Quest Map and first challenges.

*"What if my child gets frustrated?"*
Our design specifically prevents this. XP never decreases. "Needs revision" is gentle amber, not harsh red. Progress is always forward.

*"Will they actually stay engaged?"*
The Quest Map works like Candy Crush - visual, rewarding, "just one more" addictive. But for learning.

*"Is this actual curriculum or just games?"*
Both! Every challenge maps to grade-level standards across Math, Reading, Writing, STEAM, and Executive Function. But it FEELS like playing.

**Try one quest with ${getChildName(results)}. That's all I ask.**

If you see that spark - that "wait, learning can be fun?" moment - you'll know.

[Start Your First Quest]

Questions? Just reply. I read every single email.

With hope,
Marianna 💜
`,
  };
};

/**
 * DAY 8: The "Haven't Started Yet" Nudge
 */
export const getDay8Email = (results: QuizResults) => {
  const firstName = results.parentName.split(' ')[0];
  
  return {
    subject: `${firstName}, I noticed you haven't started yet (and that's okay)`,
    preheader: "Sometimes the hardest part is just beginning",
    body: `
Hi ${firstName},

I noticed you haven't created your account yet.

That's completely okay. I get it.

Maybe you're:
- Overwhelmed with everything else on your plate
- Worried about getting your child's hopes up
- Not sure if this is "the right time"
- Afraid of another thing that doesn't work

**Can I be honest with you?**

There's never a "perfect time." But there IS a cost to waiting.

Every day ${getChildName(results)} struggles with traditional learning is another day their confidence takes a hit. Another day they think "I'm just not good at learning."

That breaks my heart. Because it's not true.

**They're not broken. The system is.**

And we built a new one. Specifically for brains like theirs.

${getPersonalizedUrgency(results)}

**What if you could see them:**
- Excited to learn (not dreading it)
- Proud of their progress (not ashamed)
- Asking for "just one more challenge" (instead of avoiding work)

You deserve to see that. They deserve to feel that.

**Start with just ONE challenge together.**

[Create Free Account - 2 Minutes]

That's all. One challenge. See how they respond. If it's not a fit, no harm done.

But if you see that spark... you'll know.

I'm rooting for you both,
Marianna 💜

P.S. - If something is holding you back that I haven't addressed, reply and tell me. I want to help.
`,
  };
};

/**
 * DAY 12: Final Encouragement (For those who haven't engaged)
 */
export const getDay12Email = (results: QuizResults) => {
  const firstName = results.parentName.split(' ')[0];
  
  return {
    subject: `${firstName}, one last thing before I let you go`,
    preheader: "Your child's learning journey doesn't have to be a battle",
    body: `
Hi ${firstName},

This is the last time I'll email you about getting started (unless you want to hear from me - you're always welcome to reply).

But before I go, I want you to know something:

**You're a good parent.**

The fact that you took the quiz, that you're looking for answers, that you haven't given up on finding a better way - that shows how much you love your child.

I know the journey has been hard. I know you're tired. I know it feels like nothing works.

But somewhere out there is a child who's waiting for the moment when learning finally clicks. When they realize they're not "bad at school" - the school was just bad for them.

That child is ${getChildName(results)}.

Our approach might be that moment. It might not. But what if it is?

**What if this is the thing that works?**

${getPersonalizedFarewell(results)}

You'll still get my weekly emails with encouragement and tips (unless you unsubscribe, which is totally fine). But I won't push you to start anymore.

The door is always open. Whenever you're ready, we'll be here.

With deep respect and hope,
Marianna 💜

P.S. - If you ever want to share what's REALLY going on, reply to this email. Sometimes it just helps to be heard. I'm listening.

[I'm Ready - Create Free Account]
`,
  };
};

/**
 * WEEKLY NEWSLETTER: Ongoing Encouragement & Tips
 */
export const getWeeklyNewsletter = (week: number) => {
  const newsletters = [
    {
      subject: "Week 1: The Secret to ADHD Learning Success (It's Not What You Think)",
      topic: "Why instant feedback changes everything for ADHD brains",
    },
    {
      subject: "Week 2: When Your Child Says 'I'm Stupid' (What to Say Instead)",
      topic: "Building resilience and growth mindset in neurodivergent kids",
    },
    {
      subject: "Week 3: The Power of 'XP Never Goes Down'",
      topic: "Why our no-penalty approach is scientifically backed",
    },
    {
      subject: "Week 4: Success Story - From Tears to 30-Day Streak",
      topic: "Real family transformation story",
    },
  ];
  
  return newsletters[week % newsletters.length];
};

// Helper functions for personalization

function getChildName(results: QuizResults): string {
  // In production, this would be from the actual child's name
  return 'your child';
}

function getRecommendedQuest(results: QuizResults): string {
  if (results.struggles.includes('reading')) return '📚 Reading Quest - Phonics Fun';
  if (results.struggles.includes('math')) return '🔢 Math Quest - Number Adventures';
  if (results.struggles.includes('organization')) return '🧠 Executive Function Quest';
  return '🔢 Math Quest - Our Most Popular Starting Point';
}

function getPersonalizedEncouragement(results: QuizResults): string {
  if (results.struggles.includes('confidence')) {
    return `I know watching them lose confidence has been heartbreaking. Our system is specifically designed to rebuild it—celebrating every win, no matter how small. XP never goes down. "Needs attention" replaces harsh red marks. Parents tell us they see the difference within days.`;
  }
  if (results.struggles.includes('motivation')) {
    return `The lack of motivation isn't laziness—it's that nothing has tapped into what ACTUALLY drives them yet. Our predictable weekly rhythm, instant XP rewards, and game-based challenges are designed specifically for ADHD brains. This is structure without chaos.`;
  }
  if (results.struggles.includes('emotional')) {
    return `The daily battles and emotional outbursts are exhausting, I know. Our calm mastery approach—teal backgrounds, no red, gentle feedback—is designed to regulate emotions WHILE learning happens. It's a behavioral system disguised as a learning platform.`;
  }
  return `Every child learns differently. We've designed this system to meet them exactly where they are—predictable rhythm, visible progress, and celebration of effort over perfection.`;
}

function getPersonalizedStory(results: QuizResults): string {
  if (results.learningChallenges.includes('adhd')) {
    return `Your child has ADHD too, right? The instant dopamine rewards are game-changing. Every challenge gives immediate feedback - because waiting is torture for ADHD brains.`;
  }
  if (results.learningChallenges.includes('dyslexia')) {
    return `I noticed dyslexia is part of your journey. Our visual Quest Map and multi-sensory approach were built specifically for dyslexic learners. No more walls of text.`;
  }
  return `The struggles you described - they're so common with neurodivergent kids. You're not alone in this.`;
}

function getPersonalizedReassurance(results: QuizResults): string {
  if (results.goals.includes('confidence')) {
    return `You said building confidence was a top goal. Every element of our design supports this - from XP that never decreases to gentle "needs revision" feedback instead of harsh red marks.`;
  }
  if (results.goals.includes('enjoy')) {
    return `You want them to enjoy learning again. That's what we do best - turning "I hate this" into "Can I do another quest?"`;
  }
  return `Based on your goals, this system was literally designed for kids like yours.`;
}

function getPersonalizedUrgency(results: QuizResults): string {
  const age = results.childAge;
  if (age === '5-6' || age === '7-8') {
    return `These early years are SO important for building a love of learning. Let's make sure they develop confidence, not anxiety, around education.`;
  }
  if (age === '11-12' || age === '13+') {
    return `These pre-teen/teen years can be make-or-break for self-esteem. Let's help them build confidence before middle/high school gets even harder.`;
  }
  return `Every day matters when it comes to building confidence and skills.`;
}

function getPersonalizedFarewell(results: QuizResults): string {
  if (results.struggles.includes('emotional')) {
    return `I know the emotional outbursts are exhausting. You don't have to live with daily meltdowns forever. There's a better way.`;
  }
  return `The transformation is possible. I've seen it hundreds of times. I hope you'll give it a try.`;
}

export const emailSequences = {
  welcome: getWelcomeEmail,
  day2: getDay2Email,
  day5: getDay5Email,
  day8: getDay8Email,
  day12: getDay12Email,
  weekly: getWeeklyNewsletter,
};