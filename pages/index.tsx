import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import StatBar from '../components/StatBar';
import EquipmentSlot from '../components/EquipmentSlot';
import ResistanceItem from '../components/ResistanceItem';
import BuffIcon from '../components/BuffIcon';
import AbilitySlot from '../components/AbilitySlot';
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
    level: 28,
    guild: "Seeking: Monsters & Memories",
    location: "S\u00f6dermanland, Sweden",
  };

  const stats = [
    {
      label: "STRENGTH",
      value: 90,
      icon: "\u2694\ufe0f",
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
      icon: "\ud83c\udfc3",
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
      icon: "\ud83e\udde0",
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
      icon: "\ud83d\udcac",
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
      icon: "\u26a1",
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
      icon: "\ud83d\udcda",
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
      icon: "\u270b",
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

  const resistances = [
    { name: "Legacy Code", value: 50, description: "Can navigate and refactor legacy codebases" },
    { name: "Bug Fixes", value: 75, description: "Strong debugging and issue resolution skills" },
    { name: "Crunch Time", value: 60, description: "Able to maintain output under pressure" },
    { name: "Scope Creep", value: 40, description: "Manages changing requirements effectively" },
  ];

  const equipmentSlots = [
    { slot: "HEAD", name: "Git", icon: "\u26d1\ufe0f", type: "Tool" as const, description: "Version control mastery", stats: ["+50 Version Control", "+40 Branching Strategy"] },
    { slot: "NECK", name: "CI/CD", icon: "\ud83d\udd17", type: "Tool" as const, description: "Continuous integration pipeline", stats: ["+40 Automation", "+30 Deployment Speed"] },
    { slot: "EARS", name: "Agile", icon: "\ud83d\udc42", type: "Artifact" as const, description: "Sprint methodology mastery", stats: ["+35 Team Velocity", "+30 Adaptability"] },
    { slot: "CHEST", name: "C#", icon: "\ud83d\udee1\ufe0f", type: "Weapon" as const, description: "Primary programming language", stats: ["+50 Code Clarity", "+40 Type Safety", "+30 Performance"] },
    { slot: "BACK", name: "Docker", icon: "\ud83d\udce6", type: "Tool" as const, description: "Containerization specialist", stats: ["+45 Environment Consistency", "+35 Deployment"] },
    { slot: "SHOULDERS", name: "TypeScript", icon: "\ud83d\udca0", type: "Weapon" as const, description: "Typed JavaScript mastery", stats: ["+40 Type Safety", "+35 Frontend Power"] },
    { slot: "WAIST", name: ".NET", icon: "\ud83d\udd27", type: "Weapon" as const, description: "Framework expertise", stats: ["+45 Backend Power", "+35 API Design"] },
    { slot: "LEGS", name: "React", icon: "\u269b\ufe0f", type: "Tool" as const, description: "Frontend framework proficiency", stats: ["+40 UI Development", "+30 Component Design"] },
    { slot: "FEET", name: "PostgreSQL", icon: "\ud83d\udcbe", type: "Artifact" as const, description: "Relational database expertise", stats: ["+45 Query Optimization", "+35 Data Modeling"] },
    { slot: "PRIMARY", name: "Unity", icon: "\ud83c\udfae", type: "Armor" as const, description: "Game engine - currently leveling", stats: ["+35 GameObject Management", "+25 Scene Understanding"] },
    { slot: "SECONDARY", name: "VS Code", icon: "\ud83d\udcbb", type: "Tool" as const, description: "Primary development environment", stats: ["+40 Productivity", "+30 Extension Mastery"] },
  ];

  const inventoryBags = [
    { name: "Skill Bag", icon: "\ud83c\udf92", count: 15 },
    { name: "Project Bag", icon: "\ud83d\udcbc", count: 7 },
    { name: "Experience Bag", icon: "\ud83c\udf12", count: 3 },
  ];

  const currency = [
    { label: "Years Experience", value: "3" },
    { label: "Projects Completed", value: "7" },
    { label: "Technologies Mastered", value: "12+" },
  ];

  const buffs = [
    { name: "Employed", icon: "\ud83d\udcbc", effect: "+Professional Experience" },
    { name: "Learning Unity", icon: "\ud83c\udfae", effect: "+Game Dev Skills" },
    { name: "Seeking M&M", icon: "\u2b50", effect: "+Motivation +100" },
    { name: "Open Source", icon: "\ud83c\udf10", effect: "+Community Contribution" },
  ];

  const abilities = [
    { name: "Problem Solving", icon: "\ud83e\udde9", description: "Break down complex challenges" },
    { name: "Code Review", icon: "\ud83d\udd0d", description: "Evaluate and improve code quality" },
    { name: "Debugging", icon: "\ud83d\udc1b", description: "Track down and fix issues" },
    { name: "Refactoring", icon: "\u267b\ufe0f", description: "Improve code structure" },
    { name: "Documentation", icon: "\ud83d\udcdd", description: "Write clear technical docs" },
    { name: "Team Collaboration", icon: "\ud83e\udd1d", description: "Work effectively with others" },
    { name: "Git Commit", icon: "\ud83d\udcbe", description: "Version control operations" },
    { name: "API Design", icon: "\ud83d\udd0c", description: "Design RESTful interfaces" },
    { name: "Database Query", icon: "\ud83d\uddc4\ufe0f", description: "Optimize data operations" },
    { name: "Deploy", icon: "\ud83d\ude80", description: "Ship to production" },
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

  const xpCurrent = 7200;
  const xpNextLevel = 10000;
  const xpPercent = Math.round((xpCurrent / xpNextLevel) * 100);

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
            Press [Y] to view &bull; Right-click for options &bull; [ESC] to close
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
                      \ud83d\udcc2 View Quest Log (GitHub)
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Center Column - Tabbed Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                {/* Tab Navigation */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <TabButton
                    active={activeTab === 'stats'}
                    onClick={() => setActiveTab('stats')}
                  >
                    \ud83d\udcca Attributes
                  </TabButton>
                  <TabButton
                    active={activeTab === 'equipment'}
                    onClick={() => setActiveTab('equipment')}
                  >
                    \u2694\ufe0f Equipment
                  </TabButton>
                  <TabButton
                    active={activeTab === 'quests'}
                    onClick={() => setActiveTab('quests')}
                  >
                    \ud83d\udcdc Quests
                  </TabButton>
                  <TabButton
                    active={activeTab === 'unity'}
                    onClick={() => setActiveTab('unity')}
                  >
                    \ud83c\udfae Unity Demo
                  </TabButton>
                </div>

                {/* Content Area */}
                <div className="character-panel p-4 md:p-6 min-h-[600px]">

                  {/* ===== STATS TAB - Two Column M&M Layout ===== */}
                  {activeTab === 'stats' && (
                    <div className="space-y-4">
                      {/* Buffs Bar */}
                      <div className="mnm-panel p-3">
                        <div className="section-header">Active Buffs</div>
                        <div className="flex justify-center gap-3 mt-2">
                          {buffs.map((buff) => (
                            <BuffIcon key={buff.name} {...buff} />
                          ))}
                        </div>
                      </div>

                      {/* Two-Column Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* LEFT PANEL: Persona + Stats + Resistances + XP */}
                        <div className="space-y-3">
                          {/* Persona Section */}
                          <div className="mnm-panel p-3">
                            <div className="section-header">Character</div>
                            <div className="mt-2 space-y-1 text-xs font-game">
                              <div className="flex justify-between">
                                <span className="text-mnm-text-dark">Name:</span>
                                <span className="text-mnm-text-light">{characterData.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-mnm-text-dark">Race:</span>
                                <span className="text-mnm-text-light">{characterData.race}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-mnm-text-dark">Class:</span>
                                <span className="text-mnm-text-light">{characterData.class}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-mnm-text-dark">Level:</span>
                                <span className="text-mnm-gold">{characterData.level}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-mnm-text-dark">Guild:</span>
                                <span className="text-mnm-gold glow-text">{characterData.guild}</span>
                              </div>
                            </div>
                          </div>

                          {/* Statistics Section */}
                          <div className="mnm-panel p-3">
                            <div className="section-header">Statistics</div>
                            <div className="mt-2">
                              {stats.map((stat, index) => (
                                <motion.div
                                  key={stat.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.05 * index }}
                                >
                                  <StatBar {...stat} compact />
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Resistances Section */}
                          <div className="mnm-panel p-3">
                            <div className="section-header">Resistances</div>
                            <div className="mt-2">
                              {resistances.map((res) => (
                                <ResistanceItem key={res.name} {...res} />
                              ))}
                            </div>
                          </div>

                          {/* Experience Bar */}
                          <div className="mnm-panel p-3">
                            <div className="section-header">Experience</div>
                            <div className="mt-2">
                              <div className="xp-bar">
                                <motion.div
                                  className="xp-bar-fill"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${xpPercent}%` }}
                                  transition={{ duration: 2, ease: 'easeOut' }}
                                />
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-mnm-text-dark text-[10px] font-game">Level {characterData.level}</span>
                                <span className="text-mnm-gold text-[10px] font-game">{xpCurrent.toLocaleString()} / {xpNextLevel.toLocaleString()} XP</span>
                                <span className="text-mnm-text-dark text-[10px] font-game">Level {characterData.level + 1}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT PANEL: Equipment + Bags + Currency */}
                        <div className="space-y-3">
                          {/* Equipment Slots */}
                          <div className="mnm-panel p-3">
                            <div className="section-header">Equipment</div>
                            <div className="grid grid-cols-4 gap-2 mt-2 justify-items-center">
                              {equipmentSlots.map((item, index) => (
                                <motion.div
                                  key={item.slot}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.04 * index }}
                                >
                                  <EquipmentSlot {...item} />
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Inventory Bags */}
                          <div className="mnm-panel p-3">
                            <div className="section-header">Inventory Bags</div>
                            <div className="flex justify-center gap-4 mt-2">
                              {inventoryBags.map((bag) => (
                                <div key={bag.name} className="flex flex-col items-center">
                                  <div className="equipment-slot-mnm">
                                    <span className="text-2xl">{bag.icon}</span>
                                  </div>
                                  <span className="text-mnm-text-dark text-[9px] font-game mt-0.5">{bag.name}</span>
                                  <span className="text-mnm-gold text-[9px] font-game">{bag.count} items</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Currency */}
                          <div className="mnm-panel p-3">
                            <div className="section-header">Currency</div>
                            <div className="mt-2 space-y-1">
                              {currency.map((c) => (
                                <div key={c.label} className="flex justify-between items-center text-xs font-game px-2">
                                  <span className="text-mnm-text-dark">{c.label}</span>
                                  <span className="text-mnm-gold font-bold">{c.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ability Bar */}
                      <div className="mnm-panel p-3">
                        <div className="section-header">Memorized Abilities</div>
                        <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
                          {abilities.map((ability, index) => (
                            <AbilitySlot
                              key={ability.name}
                              {...ability}
                              slotNumber={index + 1}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== EQUIPMENT TAB ===== */}
                  {activeTab === 'equipment' && (
                    <div>
                      <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2">
                        Equipped Technologies
                      </h3>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {equipmentSlots.map((item, index) => (
                          <motion.div
                            key={item.slot}
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

                  {/* ===== UNITY TAB ===== */}
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

                  {/* ===== QUESTS TAB ===== */}
                  {activeTab === 'quests' && (
                    <div className="space-y-6">
                      {/* Main Quest */}
                      <div>
                        <h3 className="text-xl font-medieval text-bronze-light mb-4 border-b border-bronze-dark pb-2 flex items-center gap-2">
                          <span className="text-2xl">\u2b50</span> Main Quest
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
                                  {obj.completed ? '\u2713' : '\u25cb'}
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
                                <span className="text-green-400 mr-2">\u2713</span>
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
          <p>Created with \u2764\ufe0f and Unity dreams by Viktor Hurtig</p>
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
