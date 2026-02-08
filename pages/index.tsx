import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import GamePanel from '../components/GamePanel';
import TabNavigation from '../components/TabNavigation';
import StatBar from '../components/StatBar';
import EquipmentSlot from '../components/EquipmentSlot';
import ResistanceItem from '../components/ResistanceItem';
import BuffIcon from '../components/BuffIcon';
import AbilitySlot from '../components/AbilitySlot';
import IntroSplash from '../components/IntroSplash';
import DungeonScene from '@/components/DungeonScene';

const CharacterModel = dynamic(() => import('../components/CharacterModel'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <span style={{ color: '#8B7E71', fontFamily: 'Courier New, monospace', fontSize: '0.75rem' }}>
        Loading model...
      </span>
    </div>
  ),
});

const UnityPlayer = dynamic(() => import('../components/UnityPlayer'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '16rem' }}>
      <span style={{ color: '#8B7E71', fontFamily: 'Courier New, monospace', fontSize: '0.75rem' }}>
        Preparing Unity player...
      </span>
    </div>
  ),
});

const TABS = [
  { id: 'stats', label: 'Stats' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'quests', label: 'Quests' },
  { id: 'unity', label: 'Unity' },
];

export default function CharacterSheet() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  const character = {
    name: 'Viktor Hurtig',
    race: 'Full-Stack Developer',
    class: 'Unity Programmer (Aspiring)',
    level: 28,
    guild: 'Seeking: Monsters & Memories',
    location: 'S\u00f6dermanland, Sweden',
  };

  const stats = [
    { label: 'STRENGTH', value: 90, icon: '\u2694\ufe0f', description: 'C# mastery & technical prowess', details: ['2 years intensive .NET education', '6+ months professional development', 'Built complex full-stack applications', 'Deep understanding of OOP principles', 'Entity Framework & LINQ proficiency'] },
    { label: 'AGILITY', value: 95, icon: '\ud83c\udfc3', description: 'Learning speed & adaptability', details: ['Self-taught programming from scratch', 'Mastered React, Angular & TypeScript rapidly', 'Currently learning Unity in spare time', 'Quick to adopt new frameworks', 'Thrives in fast-paced environments'] },
    { label: 'INTELLIGENCE', value: 88, icon: '\ud83e\udde0', description: 'Problem-solving & system design', details: ['Architected scalable client-server systems', 'Designed RESTful APIs from scratch', 'Database optimization & query tuning', 'Debugged complex multi-layer apps', 'Strategic technical decision-making'] },
    { label: 'CHARISMA', value: 80, icon: '\ud83d\udcac', description: 'Communication & teamwork', details: ['Thrived in agile team environments', 'Clear technical communication skills', 'Participated in daily stand-ups & code reviews', 'Mentored junior developers', 'Strong stakeholder collaboration'] },
    { label: 'STAMINA', value: 92, icon: '\u26a1', description: 'Work ethic & dedication', details: ['Worked full-time while studying programming', 'Maintained side projects consistently', 'Completed 2-year intensive program', 'Dedicated significant spare time to Unity', 'Never gives up on challenging problems'] },
    { label: 'WISDOM', value: 75, icon: '\ud83d\udcda', description: 'Best practices & code quality', details: ['Professional Git workflows', 'CI/CD pipeline implementation', 'Test-driven development (xUnit)', 'Clean architecture principles', 'SOLID design patterns'] },
    { label: 'DEXTERITY', value: 85, icon: '\u270b', description: 'Versatility across tech stacks', details: ['Backend: C#, .NET, ASP.NET Core', 'Frontend: React, Angular, Blazor, TypeScript', 'Databases: SQL Server, PostgreSQL', 'Tools: Docker, Git, VS Code, Visual Studio', 'Currently: Unity, game development'] },
  ];

  const resistances = [
    { name: 'Legacy Code', value: 50, description: 'Can navigate and refactor legacy codebases' },
    { name: 'Bug Fixes', value: 75, description: 'Strong debugging and issue resolution skills' },
    { name: 'Crunch Time', value: 60, description: 'Able to maintain output under pressure' },
    { name: 'Scope Creep', value: 40, description: 'Manages changing requirements effectively' },
  ];

  const equipmentSlots = [
    { slot: 'HEAD', name: 'Git', icon: '\u26d1\ufe0f', type: 'Tool' as const, description: 'Version control mastery', stats: ['+50 Version Control', '+40 Branching Strategy'] },
    { slot: 'NECK', name: 'CI/CD', icon: '\ud83d\udd17', type: 'Tool' as const, description: 'Continuous integration pipeline', stats: ['+40 Automation', '+30 Deployment Speed'] },
    { slot: 'EARS', name: 'Agile', icon: '\ud83d\udc42', type: 'Artifact' as const, description: 'Sprint methodology mastery', stats: ['+35 Team Velocity', '+30 Adaptability'] },
    { slot: 'CHEST', name: 'C#', icon: '\ud83d\udee1\ufe0f', type: 'Weapon' as const, description: 'Primary programming language', stats: ['+50 Code Clarity', '+40 Type Safety', '+30 Performance'] },
    { slot: 'BACK', name: 'Docker', icon: '\ud83d\udce6', type: 'Tool' as const, description: 'Containerization specialist', stats: ['+45 Environment Consistency', '+35 Deployment'] },
    { slot: 'SHOULDERS', name: 'TypeScript', icon: '\ud83d\udca0', type: 'Weapon' as const, description: 'Typed JavaScript mastery', stats: ['+40 Type Safety', '+35 Frontend Power'] },
    { slot: 'WAIST', name: '.NET', icon: '\ud83d\udd27', type: 'Weapon' as const, description: 'Framework expertise', stats: ['+45 Backend Power', '+35 API Design'] },
    { slot: 'LEGS', name: 'React', icon: '\u269b\ufe0f', type: 'Tool' as const, description: 'Frontend framework proficiency', stats: ['+40 UI Development', '+30 Component Design'] },
    { slot: 'FEET', name: 'PostgreSQL', icon: '\ud83d\udcbe', type: 'Artifact' as const, description: 'Relational database expertise', stats: ['+45 Query Optimization', '+35 Data Modeling'] },
    { slot: 'PRIMARY', name: 'Unity', icon: '\ud83c\udfae', type: 'Armor' as const, description: 'Game engine - currently leveling', stats: ['+35 GameObject Management', '+25 Scene Understanding'] },
    { slot: 'SECONDARY', name: 'VS Code', icon: '\ud83d\udcbb', type: 'Tool' as const, description: 'Primary development environment', stats: ['+40 Productivity', '+30 Extension Mastery'] },
  ];

  const buffs = [
    { name: 'Employed', icon: '\ud83d\udcbc', effect: '+Professional Experience' },
    { name: 'Learning Unity', icon: '\ud83c\udfae', effect: '+Game Dev Skills' },
    { name: 'Seeking M&M', icon: '\u2b50', effect: '+Motivation +100' },
    { name: 'Open Source', icon: '\ud83c\udf10', effect: '+Community Contribution' },
  ];

  const abilities = [
    { name: 'Problem Solving', icon: '\ud83e\udde9', description: 'Break down complex challenges' },
    { name: 'Code Review', icon: '\ud83d\udd0d', description: 'Evaluate and improve code quality' },
    { name: 'Debugging', icon: '\ud83d\udc1b', description: 'Track down and fix issues' },
    { name: 'Refactoring', icon: '\u267b\ufe0f', description: 'Improve code structure' },
    { name: 'Documentation', icon: '\ud83d\udcdd', description: 'Write clear technical docs' },
    { name: 'Team Collaboration', icon: '\ud83e\udd1d', description: 'Work effectively with others' },
    { name: 'Git Commit', icon: '\ud83d\udcbe', description: 'Version control operations' },
    { name: 'API Design', icon: '\ud83d\udd0c', description: 'Design RESTful interfaces' },
    { name: 'Database Query', icon: '\ud83d\uddc4\ufe0f', description: 'Optimize data operations' },
    { name: 'Deploy', icon: '\ud83d\ude80', description: 'Ship to production' },
  ];

  const quests = {
    mainQuest: {
      title: 'Join the Monsters & Memories Guild',
      description: 'Prove your worth as a Unity Programmer and join the legendary team building a classic MMORPG',
      objectives: [
        { text: 'Master C# programming', completed: true },
        { text: 'Learn client-server architecture', completed: true },
        { text: 'Develop Unity skills', completed: false, progress: 65 },
        { text: 'Build impressive portfolio', completed: true },
        { text: 'Create unique application', completed: true },
        { text: 'Convince Shawn & Ali of your potential', completed: false },
      ],
      reward: 'Career advancement, passion project involvement, skill growth',
    },
    completedQuests: [
      { title: '.NET Software Developer Training', xp: 5000, reward: 'C# Mastery +50' },
      { title: 'Full-Stack Internship at LearningWell', xp: 3000, reward: 'Professional Experience +40' },
      { title: 'Build PetPal Application', xp: 1500, reward: 'Full-Stack Skills +30' },
      { title: 'Master Blazor Framework', xp: 1200, reward: 'UI Development +25' },
      { title: 'Docker & CI/CD Implementation', xp: 1000, reward: 'DevOps Knowledge +20' },
    ],
    sideQuests: [
      { title: 'Contribute to game dev community', progress: 30 },
      { title: 'Build Unity multiplayer prototype', progress: 45 },
      { title: 'Study classic MMORPG design', progress: 70 },
    ],
  };

  const xpCurrent = 7200;
  const xpNextLevel = 10000;
  const xpPercent = Math.round((xpCurrent / xpNextLevel) * 100);

  return (
    <>
      <Head>
        <title>Viktor Hurtig - Character Inspection</title>
        <meta name="description" content="Viktor Hurtig's interactive resume as a Monsters & Memories-style character sheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ background: '#1a1614', minHeight: '100vh', padding: '1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* HEADER BAR */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-bar"
            style={{ marginBottom: '1rem' }}
          >
            <div>
              <h1>{character.name}</h1>
              <p className="header-subtitle">
                Level {character.level} &middot; {character.class}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="header-subtitle">{character.guild}</p>
              <p className="header-subtitle">{character.location}</p>
            </div>
          </motion.div>

          {/* MAIN LAYOUT: LEFT SIDEBAR + RIGHT CONTENT */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>

            {/* LEFT SIDEBAR */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}
              className="hidden lg:flex"
            >
              {/* 3D Character Model */}
              <div className="game-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '280px' }}>
                  <CharacterModel />
                </div>
              </div>

              {/* Character Details */}
              <GamePanel title="Character">
                <div className="char-info-row">
                  <span className="char-info-label">Name:</span>
                  <span className="char-info-value">{character.name}</span>
                </div>
                <div className="char-info-row">
                  <span className="char-info-label">Race:</span>
                  <span className="char-info-value">{character.race}</span>
                </div>
                <div className="char-info-row">
                  <span className="char-info-label">Class:</span>
                  <span className="char-info-value">{character.class}</span>
                </div>
                <div className="char-info-row">
                  <span className="char-info-label">Level:</span>
                  <span className="char-info-value highlight">{character.level}</span>
                </div>
                <div className="char-info-row">
                  <span className="char-info-label">Guild:</span>
                  <span className="char-info-value highlight">{character.guild}</span>
                </div>
              </GamePanel>

              {/* Quick Stats */}
              <GamePanel title="Quick Stats">
                {stats.map((s) => (
                  <div key={s.label} className="char-info-row">
                    <span className="char-info-label">{s.label}:</span>
                    <span style={{ color: '#D4AF37', fontFamily: 'Courier New, monospace', fontSize: '0.75rem' }}>{s.value}</span>
                  </div>
                ))}
              </GamePanel>

              {/* Active Buffs */}
              <GamePanel title="Active Buffs">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {buffs.map((buff) => (
                    <BuffIcon key={buff.name} {...buff} />
                  ))}
                </div>
              </GamePanel>

              {/* Contact */}
              <GamePanel title="Contact">
                <div style={{ textAlign: 'center' }}>
                  <a
                    href="https://github.com/WeaveCraft"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      padding: '0.5rem',
                      border: '1px solid #5A4A2A',
                      color: '#C4B5A0',
                      textDecoration: 'none',
                      fontFamily: 'Courier New, monospace',
                      fontSize: '0.7rem',
                      background: 'linear-gradient(135deg, #1E1A17 0%, #151210 100%)',
                    }}
                  >
                    View Quest Log (GitHub)
                  </a>
                </div>
              </GamePanel>
            </motion.div>

            {/* RIGHT CONTENT - Tabbed Area */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ flex: 1, minWidth: 0 }}
            >
              {/* Tab Navigation */}
              <TabNavigation
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab Content */}
              <div className="game-panel" style={{ borderTop: 'none', minHeight: '600px' }}>

                {/* STATS TAB */}
                {activeTab === 'stats' && (
                  <div>
                    {/* Core Attributes */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 className="panel-title" style={{ marginBottom: '1rem' }}>
                        ━━━ CORE ATTRIBUTES ━━━
                      </h3>
                      {stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <StatBar {...stat} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Resistances */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 className="panel-title" style={{ marginBottom: '1rem' }}>
                        ━━━ RESISTANCES ━━━
                      </h3>
                      {resistances.map((res) => (
                        <ResistanceItem key={res.name} {...res} />
                      ))}
                    </div>

                    {/* Experience Bar */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 className="panel-title" style={{ marginBottom: '0.75rem' }}>
                        ━━━ EXPERIENCE ━━━
                      </h3>
                      <div className="xp-bar-track">
                        <motion.div
                          className="xp-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${xpPercent}%` }}
                          transition={{ duration: 2, ease: 'easeOut' }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                        <span style={{ color: '#8B7E71', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>
                          Level {character.level}
                        </span>
                        <span style={{ color: '#D4AF37', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>
                          {xpCurrent.toLocaleString()} / {xpNextLevel.toLocaleString()} XP
                        </span>
                        <span style={{ color: '#8B7E71', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>
                          Level {character.level + 1}
                        </span>
                      </div>
                    </div>

                    {/* Memorized Abilities */}
                    <div>
                      <h3 className="panel-title" style={{ marginBottom: '0.75rem' }}>
                        ━━━ MEMORIZED ABILITIES ━━━
                      </h3>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {abilities.map((ability, index) => (
                          <AbilitySlot key={ability.name} {...ability} slotNumber={index + 1} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* EQUIPMENT TAB */}
                {activeTab === 'equipment' && (
                  <div>
                    <h3 className="panel-title" style={{ marginBottom: '1.5rem' }}>
                      ━━━ EQUIPPED TECHNOLOGIES ━━━
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                      gap: '1rem',
                      justifyItems: 'center',
                    }}>
                      {equipmentSlots.map((item, index) => (
                        <motion.div
                          key={item.slot}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * index }}
                        >
                          <EquipmentSlot {...item} />
                        </motion.div>
                      ))}
                    </div>

                    <div style={{
                      marginTop: '2rem',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #1E1A17 0%, #151210 100%)',
                      border: '1px solid #5A4A2A',
                    }}>
                      <p style={{ color: '#8B7E71', fontSize: '0.7rem', fontFamily: 'Courier New, monospace', lineHeight: '1.6' }}>
                        Loadout optimized for full-stack development with C# and Unity focus.
                        Backend power (C#, .NET) combined with frontend versatility (React, TypeScript)
                        creates a well-rounded skillset for game development.
                        Currently grinding Unity skills to reach legendary tier.
                      </p>
                    </div>
                  </div>
                )}

                {/* QUESTS TAB */}
                {activeTab === 'quests' && (
                  <div>
                    {/* Main Quest */}
                    <h3 className="panel-title" style={{ marginBottom: '1rem' }}>
                      ━━━ MAIN QUEST ━━━
                    </h3>
                    <div className="quest-item animate-subtle-pulse" style={{ border: '2px solid #8B6914', marginBottom: '1.5rem' }}>
                      <h4 style={{ color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                        {quests.mainQuest.title}
                      </h4>
                      <p style={{ color: '#C4B5A0', fontSize: '0.7rem', fontStyle: 'italic', fontFamily: 'Courier New, monospace', marginBottom: '0.75rem' }}>
                        {quests.mainQuest.description}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {quests.mainQuest.objectives.map((obj, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <span style={{ color: obj.completed ? '#5A8A4A' : '#8B7E71', fontSize: '0.75rem', flexShrink: 0 }}>
                              {obj.completed ? '\u2713' : '\u25cb'}
                            </span>
                            <div style={{ flex: 1 }}>
                              <span style={{
                                color: obj.completed ? '#8B7E71' : '#C4B5A0',
                                fontSize: '0.7rem',
                                fontFamily: 'Courier New, monospace',
                                textDecoration: obj.completed ? 'line-through' : 'none',
                              }}>
                                {obj.text}
                              </span>
                              {obj.progress !== undefined && !obj.completed && (
                                <div className="quest-progress-track" style={{ marginTop: '0.25rem' }}>
                                  <div className="quest-progress-fill" style={{ width: `${obj.progress}%` }} />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #5A4A2A' }}>
                        <p style={{ color: '#8B7E71', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>
                          Reward: {quests.mainQuest.reward}
                        </p>
                      </div>
                    </div>

                    {/* Completed Quests */}
                    <h3 className="panel-title" style={{ marginBottom: '1rem' }}>
                      ━━━ COMPLETED QUESTS ━━━
                    </h3>
                    <div style={{ marginBottom: '1.5rem' }}>
                      {quests.completedQuests.map((quest, i) => (
                        <div key={i} className="quest-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#5A8A4A', fontSize: '0.75rem' }}>{'\u2713'}</span>
                            <span style={{ color: '#C4B5A0', fontSize: '0.7rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ color: '#D4AF37', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>+{quest.xp} XP</span>
                            <br />
                            <span style={{ color: '#8B7E71', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>{quest.reward}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Side Quests */}
                    <h3 className="panel-title" style={{ marginBottom: '1rem' }}>
                      ━━━ SIDE QUESTS ━━━
                    </h3>
                    <div>
                      {quests.sideQuests.map((quest, i) => (
                        <div key={i} className="quest-item">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ color: '#C4B5A0', fontSize: '0.7rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                            <span style={{ color: '#D4AF37', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>{quest.progress}%</span>
                          </div>
                          <div className="quest-progress-track">
                            <div className="quest-progress-fill" style={{ width: `${quest.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* UNITY TAB */}
                {activeTab === 'unity' && (
                  <div>
                    <h3 className="panel-title" style={{ marginBottom: '1rem' }}>
                      ━━━ UNITY WEBGL DEMO ━━━
                    </h3>
                    <p style={{ color: '#8B7E71', fontSize: '0.7rem', fontFamily: 'Courier New, monospace', marginBottom: '1rem', textAlign: 'center' }}>
                      Interactive Unity WebGL build running in the browser
                    </p>
                    

                    <DungeonScene />

                    <div style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #1E1A17 0%, #151210 100%)',
                      border: '1px solid #5A4A2A',
                    }}>
                      <p style={{ color: '#D4AF37', fontSize: '0.7rem', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '0.5rem' }}>
                        Controls
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                        {[
                          ['W A S D', 'Movement'],
                          ['Mouse', 'Look around'],
                          ['Space', 'Jump'],
                          ['ESC', 'Release cursor'],
                        ].map(([key, action]) => (
                          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                              padding: '0.15rem 0.4rem',
                              background: '#1a1614',
                              border: '1px solid #5A4A2A',
                              color: '#C4B5A0',
                              fontSize: '0.6rem',
                              fontFamily: 'Courier New, monospace',
                            }}>
                              {key}
                            </span>
                            <span style={{ color: '#8B7E71', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>
                              {action}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>

          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              textAlign: 'center',
              marginTop: '1rem',
              padding: '0.75rem',
              color: '#8B7E71',
              fontSize: '0.65rem',
              fontFamily: 'Courier New, monospace',
            }}
          >
            <p>Created by Viktor Hurtig</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
