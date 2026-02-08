import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import StatBar from '../components/StatBar';
import EquipmentSlot from '../components/EquipmentSlot';
import IntroSplash from '../components/IntroSplash';
import dynamic from 'next/dynamic';

// Dynamic import for 3D model (client-side only)
const CharacterModel = dynamic(() => import('../components/CharacterModel'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-parchment-dark animate-pulse">Loading character model...</div>
    </div>
  ),
});

// Dynamic import for Unity WebGL player (client-side only)
const UnityPlayer = dynamic(() => import('../components/UnityPlayer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-parchment-dark animate-pulse font-game">Preparing Unity player...</div>
    </div>
  ),
});

export default function CharacterSheet() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'equipment' | 'quests' | 'unity'>('stats');

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  const characterData = {
    name: "Viktor Hurtig",
    race: "Full-Stack Developer",
    class: "Unity Programmer (Aspiring)",
    level: 28, // Years of age or experience level
    guild: "Seeking: Monsters & Memories",
    location: "Södermanland, Sweden",
  };

  const stats = [
    {
      label: "STRENGTH",
      value: 90,
      icon: "⚔️",
      description: "C# mastery & technical prowess",
      details: [
        "2 years intensive .NET education",
        "6+ months professional development",
        "Built complex full-stack applications",
        "Deep understanding of OOP principles",
        "Entity Framework & LINQ proficiency"
      ]
    },
    {
      label: "AGILITY",
      value: 95,
      icon: "🏃",
      description: "Learning speed & adaptability",
      details: [
        "Self-taught programming from scratch",
        "Mastered React, Angular & TypeScript rapidly",
        "Currently learning Unity in spare time",
        "Quick to adopt new frameworks",
        "Thrives in fast-paced environments"
      ]
    },
    {
      label: "INTELLIGENCE",
      value: 88,
      icon: "🧠",
      description: "Problem-solving & system design",
      details: [
        "Architected scalable client-server systems",
        "Designed RESTful APIs from scratch",
        "Database optimization & query tuning",
        "Debugged complex multi-layer apps",
        "Strategic technical decision-making"
      ]
    },
    {
      label: "CHARISMA",
      value: 80,
      icon: "💬",
      description: "Communication & teamwork",
      details: [
        "Thrived in agile team environments",
        "Clear technical communication skills",
        "Participated in daily stand-ups & code reviews",
        "Mentored junior developers",
        "Strong stakeholder collaboration"
      ]
    },
    {
      label: "STAMINA",
      value: 92,
      icon: "⚡",
      description: "Work ethic & dedication",
      details: [
        "Worked full-time while studying programming",
        "Maintained side projects consistently",
        "Completed 2-year intensive program",
        "Dedicated significant spare time to Unity",
        "Never gives up on challenging problems"
      ]
    },
    {
      label: "WISDOM",
      value: 75,
      icon: "📚",
      description: "Best practices & code quality",
      details: [
        "Professional Git workflows",
        "CI/CD pipeline implementation",
        "Test-driven development (xUnit)",
        "Clean architecture principles",
        "SOLID design patterns"
      ]
    },
    {
      label: "DEXTERITY",
      value: 85,
      icon: "✋",
      description: "Versatility across tech stacks",
      details: [
        "Backend: C#, .NET, ASP.NET Core",
        "Frontend: React, Angular, Blazor, TypeScript",
        "Databases: SQL Server, PostgreSQL",
        "Tools: Docker, Git, VS Code, Visual Studio",
        "Currently: Unity, game development"
      ]
    }
  ];

  const equipment = [
    {
      name: "C# Excalibur",
      icon: "🗡️",
      type: "Weapon" as const,
      description: "The legendary blade of Microsoft's greatest creation",
      stats: [
        "+50 Code Clarity",
        "+40 Type Safety",
        "+30 Performance",
        "Special: Async/Await mastery"
      ]
    },
    {
      name: "Unity Shield",
      icon: "🛡️",
      type: "Armor" as const,
      description: "Protection forged in the fires of game development",
      stats: [
        "+35 GameObject Management",
        "+25 Scene Understanding",
        "+20 UI System Knowledge",
        "Currently equipped: Learning mode active"
      ]
    },
    {
      name: "Git Helm of Version Control",
      icon: "⛑️",
      type: "Tool" as const,
      description: "Never lose your progress again",
      stats: [
        "+50 Version Control",
        "+40 Branching Strategy",
        "+30 Merge Conflict Resolution"
      ]
    },
    {
      name: "Docker Container of Isolation",
      icon: "📦",
      type: "Tool" as const,
      description: "Works on my machine... and yours too!",
      stats: [
        "+45 Environment Consistency",
        "+35 Deployment Speed",
        "+25 Microservices Knowledge"
      ]
    },
    {
      name: "Agile Boots of Sprint",
      icon: "👢",
      type: "Artifact" as const,
      description: "Move fast, iterate faster",
      stats: [
        "+40 Team Velocity",
        "+35 Adaptability",
        "+30 Communication"
      ]
    },
    {
      name: "PostgreSQL Grimoire",
      icon: "📖",
      type: "Artifact" as const,
      description: "Ancient tome of relational wisdom",
      stats: [
        "+45 Query Optimization",
        "+35 Data Modeling",
        "+30 Transaction Management"
      ]
    }
  ];

  const quests = {
    mainQuest: {
      title: "Join the Monsters & Memories Guild",
      description: "Prove your worth as a Unity Programmer and join the legendary team building a classic MMORPG",
      objectives: [
        { text: "Master C# programming", completed: true },
        { text: "Learn client-server architecture", completed: true },
        { text: "Develop Unity skills", completed: false, progress: 65 },
        { text: "Build impressive portfolio", completed: true },
        { text: "Create unique application", completed: true },
        { text: "Convince Shawn & Ali of your potential", completed: false }
      ],
      reward: "Career advancement, passion project involvement, skill growth"
    },
    completedQuests: [
      { title: ".NET Software Developer Training", xp: 5000, reward: "C# Mastery +50" },
      { title: "Full-Stack Internship at LearningWell", xp: 3000, reward: "Professional Experience +40" },
      { title: "Build PetPal Application", xp: 1500, reward: "Full-Stack Skills +30" },
      { title: "Master Blazor Framework", xp: 1200, reward: "UI Development +25" },
      { title: "Docker & CI/CD Implementation", xp: 1000, reward: "DevOps Knowledge +20" }
    ],
    sideQuests: [
      { title: "Contribute to game dev community", progress: 30 },
      { title: "Build Unity multiplayer prototype", progress: 45 },
      { title: "Study classic MMORPG design", progress: 70 }
    ]
  };

  return (
    <>
      <Head>
        <title>Viktor Hurtig - Unity Programmer Character Sheet</title>
        <meta name="description" content="Viktor Hurtig's interactive resume as a Monsters & Memories-style character sheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-medieval mb-2 glow-text">
            Character Inspection
          </h1>
          <p className="text-parchment-dark text-sm font-game">
            Press [Y] to view • Right-click for options • [ESC] to close
          </p>
        </motion.div>

        {/* Main character panel */}
        <div className="max-w-7xl mx-auto">
          <div className="character-panel p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Character Model & Basic Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* 3D Model */}
                <div className="character-panel h-80 relative overflow-hidden">
                  <CharacterModel />
                </div>

                {/* Character Info Card */}
                <div className="character-panel p-4 space-y-2">
                  <h2 className="text-2xl font-medieval text-bronze-light text-center mb-4">
                    {characterData.name}
                  </h2>
                  
                  <InfoRow label="Race" value={characterData.race} />
                  <InfoRow label="Class" value={characterData.class} />
                  <InfoRow label="Level" value={characterData.level.toString()} />
                  <InfoRow label="Guild" value={characterData.guild} highlight />
                  <InfoRow label="Location" value={characterData.location} />
                  
                  <div className="mt-4 pt-4 border-t border-bronze-dark">
                    <a 
                      href="https://github.com/WeaveCraft"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stone-button w-full block text-center text-sm"
                    >
                      📂 View Quest Log (GitHub)
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Center Column - Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                {/* Tab Navigation */}
                <div className="flex gap-2 mb-4">
                  <TabButton 
                    active={activeTab === 'stats'} 
                    onClick={() => setActiveTab('stats')}
                  >
                    📊 Attributes
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'equipment'} 
                    onClick={() => setActiveTab('equipment')}
                  >
                    ⚔️ Equipment
                  </TabButton>
                  <TabButton
                    active={activeTab === 'quests'}
                    onClick={() => setActiveTab('quests')}
                  >
                    📜 Quests
                  </TabButton>
                  <TabButton
                    active={activeTab === 'unity'}
                    onClick={() => setActiveTab('unity')}
                  >
                    🎮 Unity Demo
                  </TabButton>
                </div>

                {/* Content Area */}
                <div className="character-panel p-6 min-h-[600px]">
                  {activeTab === 'stats' && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2">
                        Core Attributes
                      </h3>
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <StatBar {...stat} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'equipment' && (
                    <div>
                      <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2">
                        Equipped Technologies
                      </h3>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {equipment.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <EquipmentSlot {...item} />
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-stone-dark/50 rounded border border-bronze-dark">
                        <h4 className="text-bronze text-sm font-medieval mb-2">Equipment Notes:</h4>
                        <p className="text-parchment-dark text-xs leading-relaxed">
                          This character has optimized their loadout for full-stack development with a focus on C# and Unity. 
                          The combination of backend power (C#, .NET) and frontend versatility (React, Angular) creates a well-rounded skillset perfect for game development. 
                          Currently grinding Unity skills to reach legendary tier.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'unity' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2">
                        Unity WebGL Demo
                      </h3>
                      <p className="text-parchment text-sm mb-4">
                        An interactive Unity WebGL build running directly in the browser.
                        This showcases real-time game development skills using the Unity engine.
                      </p>

                      <UnityPlayer />

                      <div className="mt-6 p-4 bg-stone-dark/50 rounded border border-bronze-dark">
                        <h4 className="text-bronze text-sm font-medieval mb-3">Controls:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs font-game">
                          <div className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-stone border border-bronze-dark rounded text-parchment">W A S D</kbd>
                            <span className="text-parchment-dark">Movement</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-stone border border-bronze-dark rounded text-parchment">Mouse</kbd>
                            <span className="text-parchment-dark">Look around</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-stone border border-bronze-dark rounded text-parchment">Space</kbd>
                            <span className="text-parchment-dark">Jump</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-stone border border-bronze-dark rounded text-parchment">ESC</kbd>
                            <span className="text-parchment-dark">Release cursor</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'quests' && (
                    <div className="space-y-6">
                      {/* Main Quest */}
                      <div>
                        <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2 flex items-center gap-2">
                          <span className="text-2xl">⭐</span> Main Quest
                        </h3>
                        <div className="bg-stone-dark/50 p-4 rounded border-2 border-bronze animate-pulse-glow">
                          <h4 className="text-bronze-light font-medieval text-lg mb-2">
                            {quests.mainQuest.title}
                          </h4>
                          <p className="text-parchment text-sm italic mb-4">
                            {quests.mainQuest.description}
                          </p>
                          <div className="space-y-2">
                            {quests.mainQuest.objectives.map((obj, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className={obj.completed ? 'text-green-400' : 'text-bronze'}>
                                  {obj.completed ? '✓' : '○'}
                                </span>
                                <div className="flex-1">
                                  <span className={`text-sm ${obj.completed ? 'text-parchment-dark line-through' : 'text-parchment'}`}>
                                    {obj.text}
                                  </span>
                                  {obj.progress !== undefined && !obj.completed && (
                                    <div className="mt-1 h-2 bg-stone-dark rounded overflow-hidden">
                                      <div 
                                        className="h-full bg-bronze transition-all duration-500"
                                        style={{ width: `${obj.progress}%` }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-bronze-dark">
                            <p className="text-bronze text-xs">
                              <span className="font-medieval">Reward:</span> {quests.mainQuest.reward}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Completed Quests */}
                      <div>
                        <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2">
                          Completed Quests
                        </h3>
                        <div className="space-y-2">
                          {quests.completedQuests.map((quest, i) => (
                            <div key={i} className="bg-stone-dark/30 p-3 rounded border border-stone-light flex justify-between items-center">
                              <div>
                                <span className="text-green-400 mr-2">✓</span>
                                <span className="text-parchment text-sm">{quest.title}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-bronze text-xs">+{quest.xp} XP</div>
                                <div className="text-parchment-dark text-xs">{quest.reward}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Side Quests */}
                      <div>
                        <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2">
                          Side Quests (In Progress)
                        </h3>
                        <div className="space-y-3">
                          {quests.sideQuests.map((quest, i) => (
                            <div key={i} className="bg-stone-dark/30 p-3 rounded border border-bronze-dark">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-parchment text-sm">{quest.title}</span>
                                <span className="text-bronze text-xs">{quest.progress}%</span>
                              </div>
                              <div className="h-2 bg-stone-dark rounded overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-bronze-dark to-bronze-light transition-all duration-500"
                                  style={{ width: `${quest.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-parchment-dark text-xs font-game"
        >
          <p>Created with ❤️ and Unity dreams by Viktor Hurtig</p>
          <p className="mt-2">
            Contact: <a href="mailto:shawn@nicheworldscult.com" className="text-bronze hover:text-bronze-light">
              Apply to M&M
            </a>
          </p>
        </motion.footer>
      </main>
    </>
  );
}

// Helper Components
function InfoRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-parchment-dark font-game">{label}:</span>
      <span className={`font-game ${highlight ? 'text-bronze-light glow-text' : 'text-parchment'}`}>
        {value}
      </span>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-game text-sm rounded-t border-2 transition-all ${
        active
          ? 'bg-stone-light border-bronze-light text-parchment border-b-transparent'
          : 'bg-stone-dark border-bronze-dark text-parchment-dark hover:border-bronze'
      }`}
    >
      {children}
    </button>
  );
}
