'use strict';

/**
 * Seed the Learning Kingdom curriculum collections in Firestore.
 *
 * Usage (requires Firebase service account or Application Default Credentials):
 *   set FIREBASE_PROJECT_ID=mz-marianna-kingdom-learning
 *   set GOOGLE_APPLICATION_CREDENTIALS=path\to\serviceAccount.json
 *   node scripts/seed-curriculum.js
 */

const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID || 'mz-marianna-kingdom-learning',
  });
}

const db = admin.firestore();

const timestamp = Date.now();

const program = {
  name: 'Learning Kingdom Foundations 2025',
  description: 'Twelve-week blended mastery program introducing the Learning Kingdom core routines.',
  levelCodes: ['L1', 'L2', 'L3'],
  overlayCodes: ['CORE', 'PRAXIS'],
  defaultOverlay: 'CORE',
  active: true,
  createdAt: timestamp,
  updatedAt: timestamp,
};

const levels = [
  {
    levelCode: 'L1',
    title: 'Level 1 · Discover',
    summary: 'Onboarding, baseline diagnostics, and first mastery checkpoints.',
    xpRange: { min: 0, max: 1000 },
    color: '#F97316',
  },
  {
    levelCode: 'L2',
    title: 'Level 2 · Build',
    summary: 'Core literacy and numeracy stacks with collaborative practice.',
    xpRange: { min: 1000, max: 3000 },
    color: '#0EA5E9',
  },
  {
    levelCode: 'L3',
    title: 'Level 3 · Launch',
    summary: 'Learners ship portfolio-ready artifacts and lead reflections.',
    xpRange: { min: 3000, max: 6000 },
    color: '#14B8A6',
  },
  {
    levelCode: 'L4',
    title: 'Level 4 · Mentor',
    summary: 'Advanced synthesis, peer mentorship, and community impact.',
    xpRange: { min: 6000, max: 9000 },
    color: '#8B5CF6',
  },
  {
    levelCode: 'L5',
    title: 'Level 5 · Innovate',
    summary: 'Capstone research cycles with industry-aligned feedback.',
    xpRange: { min: 9000, max: 13000 },
    color: '#EC4899',
  },
  {
    levelCode: 'L6',
    title: 'Level 6 · Lead',
    summary: 'Scholars coach younger players and launch original initiatives.',
    xpRange: { min: 13000, max: 20000 },
    color: '#FACC15',
  },
];

const questTemplates = [
  {
    questId: 'L1UM-CORE',
    level: 'L1',
    unit: 'UM',
    overlay: 'CORE',
    title: 'Launch Pad: Ratios & Story Sparks',
    description: 'Learners explore ratio reasoning and craft narrative hooks while establishing daily practice routines.',
    badgeName: 'L1 Pathfinder',
    usesRoblox: false,
    requiredCheckpoints: [3, 6],
    totalChallenges: 6,
    masteryRule: {
      minCompleted: 5,
      requiresTutorConfirm: true,
      requiresAssessmentAt: [6],
    },
  },
  {
    questId: 'L2UR-CORE',
    level: 'L2',
    unit: 'UR',
    overlay: 'CORE',
    title: 'Informed Voices: Media Literacy Remix',
    description: 'Blend argumentative writing with data literacy to remix current events and craft informed perspectives.',
    badgeName: 'L2 Storyteller',
    usesRoblox: false,
    requiredCheckpoints: [4, 6],
    totalChallenges: 6,
    masteryRule: {
      minCompleted: 5,
      requiresTutorConfirm: true,
      requiresAssessmentAt: [6],
    },
  },
  {
    questId: 'L3UW-PRAXIS',
    level: 'L3',
    unit: 'UW',
    overlay: 'PRAXIS',
    title: 'Design Lab: Sustainable Cities',
    description: 'Team-based design challenge prototyping sustainable neighborhoods inside Roblox Studio.',
    badgeName: 'L3 Innovator',
    usesRoblox: true,
    requiredCheckpoints: [2, 5],
    totalChallenges: 5,
    masteryRule: {
      minCompleted: 4,
      requiresTutorConfirm: true,
      requiresAssessmentAt: [5],
    },
  },
];

const challengeTemplates = [
  // L1UM-CORE
  {
    challengeId: 'L1UM-CORE-01',
    questId: 'L1UM-CORE',
    number: 1,
    title: 'Diagnostic: Ratio Sense Check',
    type: 'ASSESSMENT',
    instructions: 'Complete the Khan Academy pre-assessment to map your current ratio skills.',
    resourceLink: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic',
    evidenceType: 'QUIZ',
    xp: { baseComplete: 120 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L1UM-CORE-02',
    questId: 'L1UM-CORE',
    number: 2,
    title: 'Story Spark Generator',
    type: 'LEARN',
    instructions: 'Watch the mentor mini-lesson and collect five hook strategies for your narrative.',
    resourceLink: 'https://www.youtube.com/watch?v=4kH9l9eZUXc',
    evidenceType: 'CHECKBOX',
    xp: { baseComplete: 90 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L1UM-CORE-03',
    questId: 'L1UM-CORE',
    number: 3,
    title: 'Checkpoint · Ratio Lab',
    type: 'CHECKPOINT',
    instructions: 'Solve five ratio puzzles and explain your strategy to your tutor.',
    resourceLink: 'https://docs.google.com/presentation/d/ratio-lab',
    evidenceType: 'UPLOAD',
    xp: { baseComplete: 150, correctnessBonus: 40 },
    isCheckpoint: true,
  },
  {
    challengeId: 'L1UM-CORE-04',
    questId: 'L1UM-CORE',
    number: 4,
    title: 'Narrative Draft Sprint',
    type: 'PRACTICE',
    instructions: 'Draft a 300-word scene applying two of your hook strategies; share with a peer for feedback.',
    resourceLink: 'https://docs.google.com/document/d/narrative-template',
    evidenceType: 'UPLOAD',
    xp: { baseComplete: 130, effortBonus: 30 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L1UM-CORE-05',
    questId: 'L1UM-CORE',
    number: 5,
    title: 'Peer Critique Circle',
    type: 'REFLECT',
    instructions: 'Provide warm/ cool feedback to two teammates using the critique protocol.',
  resourceLink: 'https://protocol.school/critique-circle',
    evidenceType: 'LINK',
    xp: { baseComplete: 80 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L1UM-CORE-06',
    questId: 'L1UM-CORE',
    number: 6,
    title: 'Showcase: Story + Ratio Pitch',
    type: 'APPLY',
    instructions: 'Record a 2-minute video presenting your story hook and explaining how ratios informed your worldbuilding.',
    resourceLink: 'https://flip.com/story-showcase',
    evidenceType: 'VIDEO',
    xp: { baseComplete: 180, effortBonus: 40 },
    isCheckpoint: true,
  },
  // L2UR-CORE
  {
    challengeId: 'L2UR-CORE-01',
    questId: 'L2UR-CORE',
    number: 1,
    title: 'Media Bias Scavenger Hunt',
    type: 'LEARN',
    instructions: 'Collect three examples of the same story told with different biases; log them in the tracker.',
    resourceLink: 'https://docs.google.com/spreadsheets/d/media-bias-tracker',
    evidenceType: 'LINK',
    xp: { baseComplete: 110 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L2UR-CORE-02',
    questId: 'L2UR-CORE',
    number: 2,
    title: 'Data Dive Warmup',
    type: 'PRACTICE',
    instructions: 'Use CODAP to visualize two datasets that support your story selection.',
    resourceLink: 'https://codap.concord.org',
    evidenceType: 'UPLOAD',
    xp: { baseComplete: 120 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L2UR-CORE-03',
    questId: 'L2UR-CORE',
    number: 3,
    title: 'Script the Remix Episode',
    type: 'PROJECT',
    instructions: 'Draft a podcast outline highlighting claim, evidence, and reasoning for your chosen topic.',
    resourceLink: 'https://docs.google.com/document/d/remix-script',
    evidenceType: 'UPLOAD',
    xp: { baseComplete: 140, effortBonus: 30 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L2UR-CORE-04',
    questId: 'L2UR-CORE',
    number: 4,
    title: 'Checkpoint · Tutor Editorial Review',
    type: 'CHECKPOINT',
    instructions: 'Meet with your tutor to revise the episode outline and align on sources.',
    evidenceType: 'NONE',
    xp: { baseComplete: 160 },
    isCheckpoint: true,
  },
  {
    challengeId: 'L2UR-CORE-05',
    questId: 'L2UR-CORE',
    number: 5,
    title: 'Record & Mix',
    type: 'APPLY',
    instructions: 'Record a 5-minute segment; include at least two cited data points and one expert interview clip.',
    resourceLink: 'https://anchor.fm',
    evidenceType: 'AUDIO',
    xp: { baseComplete: 190, effortBonus: 50 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L2UR-CORE-06',
    questId: 'L2UR-CORE',
    number: 6,
    title: 'Amplify & Reflect',
    type: 'REFLECT',
    instructions: 'Publish your episode and gather listener feedback; reflect on bias mitigation strategies.',
    resourceLink: 'https://padlet.com/reflection-wall',
    evidenceType: 'LINK',
    xp: { baseComplete: 130 },
    isCheckpoint: true,
  },
  // L3UW-PRAXIS
  {
    challengeId: 'L3UW-PRAXIS-01',
    questId: 'L3UW-PRAXIS',
    number: 1,
    title: 'Systems Thinking Sprint',
    type: 'LEARN',
    instructions: 'Map the energy flows within a model city; share three leverage points.',
    resourceLink: 'https://miro.com/templates/systems-map/',
    evidenceType: 'LINK',
    xp: { baseComplete: 140 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L3UW-PRAXIS-02',
    questId: 'L3UW-PRAXIS',
    number: 2,
    title: 'Checkpoint · Roblox Mechanics Review',
    type: 'CHECKPOINT',
    instructions: 'Demo your Roblox prototype for a mentor; confirm mechanics align with sustainability goals.',
    robloxGameLink: 'https://www.roblox.com/games/learning-kingdom-lab',
    evidenceType: 'VIDEO',
    xp: { baseComplete: 170, effortBonus: 30 },
    isCheckpoint: true,
  },
  {
    challengeId: 'L3UW-PRAXIS-03',
    questId: 'L3UW-PRAXIS',
    number: 3,
    title: 'Iterate with User Testing',
    type: 'PRACTICE',
    instructions: 'Run two playtests with middle schoolers; log observations and prioritized fixes.',
    evidenceType: 'UPLOAD',
    xp: { baseComplete: 180 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L3UW-PRAXIS-04',
    questId: 'L3UW-PRAXIS',
    number: 4,
    title: 'Impact Storyboard',
    type: 'PROJECT',
    instructions: 'Build a storyboard explaining how your city design improves community resilience.',
    resourceLink: 'https://www.canva.com/templates/storyboard/',
    evidenceType: 'UPLOAD',
    xp: { baseComplete: 160, effortBonus: 20 },
    isCheckpoint: false,
  },
  {
    challengeId: 'L3UW-PRAXIS-05',
    questId: 'L3UW-PRAXIS',
    number: 5,
    title: 'Summit Pitch & Expo',
    type: 'APPLY',
    instructions: 'Present your world in the sustainability summit; capture community feedback and next steps.',
    evidenceType: 'VIDEO',
    xp: { baseComplete: 220, effortBonus: 60 },
    isCheckpoint: true,
  },
];

const badgeTemplates = [
  {
    badgeId: 'L1-PATHFINDER',
    name: 'Level 1 Pathfinder',
    questId: 'L1UM-CORE',
    overlay: 'CORE',
    description: 'Complete the Launch Pad quest and earn tutor confirmation.',
    xpReward: 250,
    icon: 'badges/l1-pathfinder.png',
  },
  {
    badgeId: 'L2-STORYTELLER',
    name: 'Level 2 Storyteller',
    questId: 'L2UR-CORE',
    overlay: 'CORE',
    description: 'Publish an informed media remix with verified sources.',
    xpReward: 300,
    icon: 'badges/l2-storyteller.png',
  },
  {
    badgeId: 'L3-INNOVATOR',
    name: 'Level 3 Innovator',
    questId: 'L3UW-PRAXIS',
    overlay: 'PRAXIS',
    description: 'Lead a sustainability expo with a Roblox prototype.',
    xpReward: 350,
    icon: 'badges/l3-innovator.png',
  },
];

const standards = [
  {
    standardId: 'CCSS.MATH.6.RP.A.3',
    description: 'Use ratio and rate reasoning to solve real-world problems.',
    questIds: ['L1UM-CORE'],
    levelCodes: ['L1'],
  },
  {
    standardId: 'CCSS.ELA-LITERACY.WHST.6-8.1',
    description: 'Write arguments focused on discipline-specific content.',
    questIds: ['L2UR-CORE'],
    levelCodes: ['L2'],
  },
  {
    standardId: 'NGSS.MS-ESS3-3',
    description: 'Apply scientific principles to design a method for monitoring human impact on the environment.',
    questIds: ['L3UW-PRAXIS'],
    levelCodes: ['L3'],
  },
];

async function upsertDoc(collection, id, data) {
  await db.collection(collection).doc(id).set(
    {
      ...data,
      updatedAt: timestamp,
    },
    { merge: true },
  );
  console.log(`[${collection}] upserted ${id}`);
}

(async function seed() {
  try {
    console.log('Seeding curriculum program data...');
    await upsertDoc('curriculumPrograms', 'foundations-2025', program);

    console.log('Seeding curriculum levels...');
    for (const level of levels) {
      await upsertDoc('curriculumLevels', level.levelCode, level);
    }

    console.log('Seeding quest templates...');
    const questIds = new Set(questTemplates.map((quest) => quest.questId));

    console.log(`Found ${questIds.size} quest template definitions.`);
    for (const quest of questTemplates) {
      await upsertDoc('questTemplates', quest.questId, quest);
    }

    console.log('Seeding challenge templates (validating quest references)...');
    for (const challenge of challengeTemplates) {
      if (!questIds.has(challenge.questId)) {
        throw new Error(`Challenge ${challenge.challengeId} references missing quest ${challenge.questId}`);
      }
      await upsertDoc('challengeTemplates', challenge.challengeId, challenge);
    }

    console.log('Seeding badge templates...');
    for (const badge of badgeTemplates) {
      await upsertDoc('badgeTemplates', badge.badgeId, badge);
    }

    console.log('Seeding standards...');
    for (const standard of standards) {
      await upsertDoc('standards', standard.standardId, standard);
    }

    console.log('Curriculum seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Curriculum seed failed:', error);
    process.exit(1);
  }
})();
