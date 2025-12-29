'use client';

import React, { useEffect, useMemo, useState } from "react";

/**
 * Learning Kingdom LMS — App Shell (calm, no-shame)
 * Minimal UI with inline progress and XP visibility.
 * Replace mock data with Firebase once backend is ready.
 */

type Role = "student" | "parent" | "tutor" | "admin";

type UnitCode = "UM" | "UR" | "UW" | "US" | "UEF";
type LevelCode = "L1" | "L2" | "L3" | "L4" | "L5" | "L6";

type ChallengeType = "Learn" | "Practice" | "Apply" | "Roblox" | "Reflect" | "Checkpoint";

type Quest = {
  questId: string;
  programId: string;
  level: LevelCode;
  unit: UnitCode;
  title: string;
  badgeName: string;
  usesRoblox: boolean;
};

type Challenge = {
  challengeId: string;
  questId: string;
  number: number;
  title: string;
  type: ChallengeType;
  xp: number;
  isCheckpoint: boolean;
  robloxLink?: string;
  completed?: boolean;
};

type User = {
  uid: string;
  displayName: string;
  role: Role;
  xpTotal: number;
  activeLevelByUnit: Record<UnitCode, LevelCode>;
};

const COLORS = {
  bg: "#E8FBFF",
  card: "#FFFFFF",
  ink: "#0F172A",
  muted: "#475569",
  teal: "#06B6D4",
  tealDark: "#0891B2",
  reward: "#A855F7",
  reward2: "#EC4899",
  ok: "#22C55E",
  attention: "#F59E0B",
  border: "#E2E8F0",
};

const MOCK_USER: User = {
  uid: "demo",
  displayName: "Demo Student",
  role: "student",
  xpTotal: 1250,
  activeLevelByUnit: { UM: "L3", UR: "L2", UW: "L2", US: "L3", UEF: "L2" },
};

const MOCK_QUESTS: Quest[] = [
  { questId: "L3UM", programId: "core", level: "L3", unit: "UM", title: "Fraction Force", badgeName: "🟣 Fraction Master", usesRoblox: true },
  { questId: "L2UR", programId: "core", level: "L2", unit: "UR", title: "Fluency Flyers", badgeName: "📖 Fluency Flyer", usesRoblox: false },
  { questId: "L2UW", programId: "core", level: "L2", unit: "UW", title: "Paragraph Power", badgeName: "✍️ Paragraph Pro", usesRoblox: false },
  { questId: "L3US", programId: "core", level: "L3", unit: "US", title: "Engineering Explorers", badgeName: "🔬 Logic Engineer", usesRoblox: true },
  { questId: "L2UEF", programId: "core", level: "L2", unit: "UEF", title: "Focus Fighters", badgeName: "🧠 Focus Champion", usesRoblox: false },
];

function makeMockChallenges(questId: string): Challenge[] {
  const titles = [
    "Assessment: quick placement",
    "Learn: mini-lesson",
    "Practice: guided",
    "Apply: real world",
    "Roblox: game challenge",
    "Practice: independent",
    "Reflect: quick check",
    "Midpoint check-in",
    "Learn: new skill",
    "Apply: problem set",
    "Roblox: build & prove",
    "Practice: fluency",
    "Apply: project step",
    "Reflect: confidence check",
    "Mastery prep",
    "End mastery check + celebrate",
  ];

  const types: ChallengeType[] = [
    "Checkpoint",
    "Learn",
    "Practice",
    "Apply",
    "Roblox",
    "Practice",
    "Reflect",
    "Checkpoint",
    "Learn",
    "Apply",
    "Roblox",
    "Practice",
    "Apply",
    "Reflect",
    "Practice",
    "Checkpoint",
  ];

  return Array.from({ length: 16 }).map((_, i) => {
    const n = i + 1;
    const isCheckpoint = n === 1 || n === 8 || n === 16;
    const type = types[i];
    const baseXp =
      type === "Checkpoint" ? 125 :
      type === "Roblox" ? 100 :
      type === "Apply" ? 75 :
      type === "Practice" ? 50 :
      type === "Learn" ? 40 :
      25;

    return {
      challengeId: `${questId}-${String(n).padStart(2, "0")}`,
      questId,
      number: n,
      title: titles[i],
      type,
      xp: baseXp,
      isCheckpoint,
      robloxLink: type === "Roblox" ? "https://www.roblox.com/games/" : undefined,
      completed: n <= 5,
    };
  });
}

type View = "login" | "dashboard" | "quest";

export default function LmsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>("login");
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const quests = useMemo(() => MOCK_QUESTS, []);
  const activeQuest = useMemo(() => quests.find(q => q.questId === activeQuestId) || null, [quests, activeQuestId]);

  const challenges = useMemo(() => {
    if (!activeQuestId) return [];
    return makeMockChallenges(activeQuestId);
  }, [activeQuestId]);

  const questProgress = useMemo(() => {
    if (!challenges.length) return 0;
    const done = challenges.filter(c => c.completed).length;
    return Math.round((done / challenges.length) * 100);
  }, [challenges]);

  useEffect(() => {
    if (!user) return;
    setView("dashboard");
  }, [user]);

  function handleDemoLogin(role: Role) {
    setNotice(null);
    const demoUser: User = {
      ...MOCK_USER,
      role,
      displayName: role === "student" ? "Demo Student" : `Demo ${role[0].toUpperCase()}${role.slice(1)}`,
    };
    setUser(demoUser);
  }

  function openQuest(questId: string) {
    setActiveQuestId(questId);
    setView("quest");
  }

  function backToDashboard() {
    setView("dashboard");
    setActiveQuestId(null);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, #FFFFFF 100%)`,
        color: COLORS.ink,
        fontFamily: "Lexend, Nunito, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <TopBar
        user={user}
        onLogout={() => {
          setUser(null);
          setView("login");
          setActiveQuestId(null);
          setNotice(null);
        }}
      />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 14px 42px" }}>
        {notice && <Notice text={notice} />}

        {view === "login" && (
          <LoginScreen onLogin={handleDemoLogin} />
        )}

        {view === "dashboard" && user && (
          <Dashboard
            user={user}
            quests={quests}
            onOpenQuest={openQuest}
            onSetNotice={setNotice}
          />
        )}

        {view === "quest" && user && activeQuest && (
          <QuestView
            user={user}
            quest={activeQuest}
            challenges={challenges}
            progressPercent={questProgress}
            onBack={backToDashboard}
            onSetNotice={setNotice}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

function TopBar({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.reward} 100%)`,
              boxShadow: "0 8px 18px rgba(6,182,212,0.18)",
            }}
          />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Learning Kingdom LMS</div>
            <div style={{ color: COLORS.muted, fontSize: 12 }}>Calm mastery. Visible progress.</div>
          </div>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <>
              <XPChip xp={user.xpTotal} />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{user.displayName}</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>{user.role}</div>
              </div>
              <button
                onClick={onLogout}
                style={btnStyle("ghost")}
                aria-label="Log out"
              >
                Log out
              </button>
            </>
          ) : (
            <span style={{ color: COLORS.muted, fontSize: 12 }}>Not signed in</span>
          )}
        </div>
      </div>
    </header>
  );
}

function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  return (
    <section style={{ display: "grid", gap: 14 }}>
      <Card>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>
          Learning that feels safe — and still levels you up.
        </h1>
        <p style={{ margin: "8px 0 0", color: COLORS.muted, maxWidth: 720 }}>
          Demo login for now. Later this gets replaced with Firebase Auth.
        </p>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <Card>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Student</div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
            See quests, complete challenges, earn XP and badges.
          </div>
          <button onClick={() => onLogin("student")} style={btnStyle("primary")}>Enter</button>
        </Card>

        <Card>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Parent</div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
            View progress snapshots and weekly summaries.
          </div>
          <button onClick={() => onLogin("parent")} style={btnStyle("primary")}>Enter</button>
        </Card>

        <Card>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Tutor</div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
            Confirm mastery, give feedback, adjust quests.
          </div>
          <button onClick={() => onLogin("tutor")} style={btnStyle("primary")}>Enter</button>
        </Card>

        <Card>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Admin</div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
            Manage curriculum templates, cohorts, and reporting.
          </div>
          <button onClick={() => onLogin("admin")} style={btnStyle("primary")}>Enter</button>
        </Card>
      </div>
    </section>
  );
}

function Dashboard({
  user,
  quests,
  onOpenQuest,
  onSetNotice,
}: {
  user: User;
  quests: Quest[];
  onOpenQuest: (questId: string) => void;
  onSetNotice: (msg: string | null) => void;
}) {
  useEffect(() => {
    onSetNotice(null);
  }, [onSetNotice]);

  return (
    <section style={{ display: "grid", gap: 14 }}>
      <Card>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontSize: 14, color: COLORS.muted }}>What do I do next?</div>
            <div style={{ fontSize: 22, fontWeight: 900 }}>
              Pick today's quest and complete a small win.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <XPChip xp={user.xpTotal} />
            <button
              style={btnStyle("soft")}
              onClick={() => onSetNotice("Tip: checkpoints happen at challenge #1, #8, and #16.")}
            >
              Quick tip
            </button>
          </div>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {(["UM", "UR", "UW", "US", "UEF"] as UnitCode[]).map((u) => (
            <MiniPill
              key={u}
              label={unitLabel(u)}
              value={`Level ${user.activeLevelByUnit[u].replace("L", "")}`}
            />
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {quests.map((q) => (
          <Card key={q.questId}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 22 }}>{unitEmoji(q.unit)}</div>
              <div>
                <div style={{ fontWeight: 900 }}>{q.title}</div>
                <div style={{ color: COLORS.muted, fontSize: 13 }}>
                  {q.questId} • {q.badgeName}
                </div>
              </div>
              {q.usesRoblox && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 12,
                    padding: "4px 8px",
                    borderRadius: 999,
                    background: "rgba(236,72,153,0.10)",
                    color: COLORS.reward2,
                    fontWeight: 800,
                  }}
                >
                  Roblox
                </span>
              )}
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <button style={btnStyle("primary")} onClick={() => onOpenQuest(q.questId)}>
                Open
              </button>

              <button
                style={btnStyle("ghost")}
                onClick={() => onSetNotice("Nice. Completing even one challenge today counts.")}
              >
                Encourage
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function QuestView({
  user,
  quest,
  challenges,
  progressPercent,
  onBack,
  onSetNotice,
}: {
  user: User;
  quest: Quest;
  challenges: Challenge[];
  progressPercent: number;
  onBack: () => void;
  onSetNotice: (msg: string | null) => void;
}) {
  useEffect(() => {
    onSetNotice(null);
  }, [onSetNotice]);

  const completedCount = challenges.filter(c => c.completed).length;

  return (
    <section style={{ display: "grid", gap: 14 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button style={btnStyle("ghost")} onClick={onBack}>← Back</button>
          <div style={{ fontSize: 22 }}>{unitEmoji(quest.unit)}</div>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontWeight: 900, fontSize: 20 }}>{quest.title}</div>
            <div style={{ color: COLORS.muted, fontSize: 13 }}>
              {quest.questId} • {quest.badgeName} • {quest.programId.toUpperCase()}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <XPChip xp={user.xpTotal} />
            <div style={{ minWidth: 170 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.muted }}>
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div style={{ height: 10, background: "#EAF2F7", borderRadius: 999, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
                <div style={{ height: "100%", width: `${progressPercent}%`, background: COLORS.teal, borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10, color: COLORS.muted, fontSize: 13 }}>
          Complete any challenge you want — checkpoints are at #1, #8, and #16. No fail states.
        </div>
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <div style={{ fontWeight: 900 }}>Challenges (16)</div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>
            Completed: <b>{completedCount}</b> / 16
          </div>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 10 }}>
          {challenges.map((c) => (
            <div
              key={c.challengeId}
              style={{
                padding: 12,
                borderRadius: 16,
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                boxShadow: c.completed ? "0 0 0 3px rgba(34,197,94,0.12)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 14,
                    background: c.isCheckpoint ? "rgba(168,85,247,0.10)" : "rgba(6,182,212,0.10)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    color: c.isCheckpoint ? COLORS.reward : COLORS.tealDark,
                  }}
                >
                  {c.number}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span>{c.title}</span>
                    {c.isCheckpoint && (
                      <span
                        style={{
                          fontSize: 12,
                          padding: "3px 8px",
                          borderRadius: 999,
                          background: "rgba(168,85,247,0.10)",
                          color: COLORS.reward,
                          fontWeight: 800,
                        }}
                      >
                        Checkpoint
                      </span>
                    )}
                    {c.type === "Roblox" && (
                      <span
                        style={{
                          fontSize: 12,
                          padding: "3px 8px",
                          borderRadius: 999,
                          background: "rgba(236,72,153,0.10)",
                          color: COLORS.reward2,
                          fontWeight: 800,
                        }}
                      >
                        Roblox link
                      </span>
                    )}
                  </div>
                  <div style={{ color: COLORS.muted, fontSize: 12 }}>
                    Type: {c.type} • XP: <b style={{ color: COLORS.reward }}>{c.xp}</b>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  style={btnStyle("soft")}
                  onClick={() => onSetNotice("Saved. Next step: wire Firestore to log XP events.")}
                >
                  Mark complete
                </button>

                {c.type === "Roblox" && c.robloxLink && (
                  <a
                    href={c.robloxLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...btnStyle("ghost"),
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                    }}
                    onClick={() => onSetNotice("Roblox quests always include a game link.")}
                  >
                    Open Roblox
                  </a>
                )}

                <button
                  style={btnStyle("ghost")}
                  onClick={() => onSetNotice("Evidence upload will accept screenshots or short reflections.")}
                >
                  Add evidence
                </button>
              </div>

              {!c.completed && (
                <div style={{ marginTop: 10, fontSize: 12, color: COLORS.muted }}>
                  Status: <span style={{ color: COLORS.attention, fontWeight: 800 }}>needs attention</span> — you can do this anytime.
                </div>
              )}

              {c.completed && (
                <div style={{ marginTop: 10, fontSize: 12, color: COLORS.muted }}>
                  Status: <span style={{ color: COLORS.ok, fontWeight: 900 }}>completed</span> ✅
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 22,
        padding: 16,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
      }}
    >
      {children}
    </div>
  );
}

function Notice({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 16,
        background: "rgba(245,158,11,0.10)",
        border: "1px solid rgba(245,158,11,0.25)",
        color: COLORS.ink,
        fontSize: 13,
      }}
    >
      {text}
    </div>
  );
}

function XPChip({ xp }: { xp: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 10px",
        borderRadius: 999,
        background: "rgba(168,85,247,0.10)",
        border: "1px solid rgba(168,85,247,0.25)",
        color: COLORS.reward,
        fontWeight: 900,
        fontFamily: "Orbitron, Lexend, system-ui, sans-serif",
        letterSpacing: 0.3,
      }}
      aria-label="XP total"
    >
      <span style={{ fontSize: 12 }}>XP</span>
      <span style={{ fontSize: 14 }}>{xp.toLocaleString()}</span>
    </div>
  );
}

function MiniPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        background: "#F8FAFC",
      }}
    >
      <div style={{ fontSize: 12, color: COLORS.muted }}>{label}</div>
      <div style={{ fontWeight: 900 }}>{value}</div>
    </div>
  );
}

type BtnVariant = "primary" | "soft" | "ghost";
function btnStyle(variant: BtnVariant): React.CSSProperties {
  const base: React.CSSProperties = {
    borderRadius: 16,
    padding: "10px 12px",
    fontWeight: 900,
    border: `1px solid ${COLORS.border}`,
    cursor: "pointer",
    background: COLORS.card,
    color: COLORS.ink,
    boxShadow: "none",
    transition: "transform 0.05s ease, box-shadow 0.2s ease",
  };

  if (variant === "primary") {
    return {
      ...base,
      background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.tealDark} 100%)`,
      border: "1px solid rgba(8,145,178,0.35)",
      color: "white",
      boxShadow: "0 12px 24px rgba(6,182,212,0.18)",
    };
  }

  if (variant === "soft") {
    return {
      ...base,
      background: "rgba(6,182,212,0.10)",
      border: "1px solid rgba(6,182,212,0.25)",
      color: COLORS.tealDark,
    };
  }

  return {
    ...base,
    background: "transparent",
  };
}

function unitEmoji(u: UnitCode) {
  switch (u) {
    case "UM": return "🧮";
    case "UR": return "📖";
    case "UW": return "✍️";
    case "US": return "🔬";
    case "UEF": return "🧠";
    default: return "🎯";
  }
}

function unitLabel(u: UnitCode) {
  switch (u) {
    case "UM": return "Unit Math (Roblox)";
    case "UR": return "Unit Reading";
    case "UW": return "Unit Writing";
    case "US": return "Unit STEAM";
    case "UEF": return "Unit Executive Function";
    default: return "Unit";
  }
}

function Footer() {
  return (
    <footer style={{ padding: "24px 14px 34px", color: COLORS.muted, textAlign: "center", fontSize: 12 }}>
      Built calm-first • No shame • XP never decreases
    </footer>
  );
}
