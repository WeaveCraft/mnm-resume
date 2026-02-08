import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import BuffIcon from '../components/BuffIcon';
import AbilitySlot from '../components/AbilitySlot';
import IntroSplash from '../components/IntroSplash';
import DungeonScene from '@/components/DungeonScene';

const TABS = [
  { id: 'inventory', label: 'Inventory' },
  { id: 'skills', label: 'Skills' },
  { id: 'quests', label: 'Quests' },
  { id: 'guild', label: 'Guild' },
  { id: 'social', label: 'Social' },
];

export default function CharacterSheet() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('inventory');

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  const character = {
    name: 'Viktor Hurtig',
    race: 'Full-Stack Developer',
    class: 'Unity Programmer',
    level: 32,
    alignment: 'Passionate',
  };

  // Stats as game-style numbers (like the M&M screenshot: 18-29 range)
  const stats = [
    { abbr: 'STR', value: 29, full: 'Strength', description: 'C# mastery & backend power', details: ['2 years intensive .NET education', '6+ months professional development', 'Built complex full-stack applications', 'Deep OOP & Entity Framework proficiency'] },
    { abbr: 'STA', value: 29, full: 'Stamina', description: 'Work ethic & dedication', details: ['Worked full-time while studying programming', 'Completed 2-year intensive program', 'Dedicated spare time to Unity learning', 'Never gives up on challenging problems'] },
    { abbr: 'AGI', value: 26, full: 'Agility', description: 'Learning speed & adaptability', details: ['Self-taught programming from scratch', 'Mastered React, Angular & TypeScript rapidly', 'Currently learning Unity in spare time', 'Quick to adopt new frameworks'] },
    { abbr: 'DEX', value: 29, full: 'Dexterity', description: 'Versatility across tech stacks', details: ['Backend: C#, .NET, ASP.NET Core', 'Frontend: React, Angular, Blazor, TypeScript', 'Databases: SQL Server, PostgreSQL', 'Tools: Docker, Git, VS Code'] },
    { abbr: 'INT', value: 18, full: 'Intelligence', description: 'Problem-solving & system design', details: ['Architected scalable client-server systems', 'Designed RESTful APIs from scratch', 'Database optimization & query tuning', 'Strategic technical decision-making'] },
    { abbr: 'WIS', value: 26, full: 'Wisdom', description: 'Best practices & code quality', details: ['Professional Git workflows', 'CI/CD pipeline implementation', 'Test-driven development (xUnit)', 'SOLID design patterns'] },
    { abbr: 'CHA', value: 18, full: 'Charisma', description: 'Communication & teamwork', details: ['Agile team environments', 'Clear technical communication', 'Daily stand-ups & code reviews', 'Mentored junior developers'] },
  ];

  // Resistances matching the game screenshot layout
  const resistances = [
    { abbr: 'Cold', value: 100, full: 'Legacy Code Resistance' },
    { abbr: 'Corr', value: 100, full: 'Bug Fixing Resistance' },
    { abbr: 'Dis',  value: 100, full: 'Scope Creep Resistance' },
    { abbr: 'Elec', value: 100, full: 'New Tech Adoption' },
    { abbr: 'Fire', value: 100, full: 'Deadline Resistance' },
    { abbr: 'Holy', value: 0,   full: 'Management Resistance' },
    { abbr: 'Mag',  value: 100, full: 'Refactoring Resistance' },
    { abbr: 'Poi',  value: 100, full: 'Technical Debt Resistance' },
  ];

  // Equipment positioned around character (matching game slots)
  const equipment = {
    ear1:      { name: 'Agile',      icon: '\uD83D\uDC42', type: 'Artifact' as const, description: 'Sprint methodology mastery', stats: ['+35 Team Velocity', '+30 Adaptability'] },
    neck:      { name: 'CI/CD',      icon: '\uD83D\uDD17', type: 'Tool' as const, description: 'Continuous integration pipeline', stats: ['+40 Automation', '+30 Deployment'] },
    face:      { name: 'Git',        icon: '\u26D1\uFE0F', type: 'Tool' as const, description: 'Version control mastery', stats: ['+50 Version Control', '+40 Branching'] },
    ear2:      { name: 'Docker',     icon: '\uD83D\uDCE6', type: 'Tool' as const, description: 'Containerization specialist', stats: ['+45 Environment Consistency', '+35 Deployment'] },
    wrist:     { name: 'TypeScript', icon: '\uD83D\uDCA0', type: 'Weapon' as const, description: 'Typed JavaScript mastery', stats: ['+40 Type Safety', '+35 Frontend Power'] },
    finger1:   { name: 'VS Code',    icon: '\uD83D\uDCBB', type: 'Tool' as const, description: 'Primary IDE', stats: ['+40 Productivity', '+30 Extension Mastery'] },
    chest:     { name: 'C#',         icon: '\uD83D\uDEE1\uFE0F', type: 'Weapon' as const, description: 'Primary programming language', stats: ['+50 Code Clarity', '+40 Type Safety', '+30 Performance'] },
    finger2:   { name: 'React',      icon: '\u269B\uFE0F', type: 'Tool' as const, description: 'Frontend framework', stats: ['+40 UI Development', '+30 Component Design'] },
    shoulders: { name: '.NET',       icon: '\uD83D\uDD27', type: 'Weapon' as const, description: 'Framework expertise', stats: ['+45 Backend Power', '+35 API Design'] },
    primary:   { name: 'Unity',      icon: '\uD83C\uDFAE', type: 'Armor' as const, description: 'Game engine - currently leveling', stats: ['+35 Game Dev', '+25 Scene Design'] },
    secondary: { name: 'PostgreSQL', icon: '\uD83D\uDCBE', type: 'Artifact' as const, description: 'Database expertise', stats: ['+45 Query Optimization', '+35 Data Modeling'] },
    range:     { name: 'REST API',   icon: '\uD83D\uDD0C', type: 'Tool' as const, description: 'API design & implementation', stats: ['+40 Endpoint Design', '+30 Integration'] },
  };

  // Inventory items (smaller tools/skills)
  const inventoryItems = [
    { icon: '\uD83C\uDF10', name: 'HTML5', count: undefined },
    { icon: '\uD83C\uDFA8', name: 'CSS3', count: undefined },
    { icon: '\u26A1', name: 'JavaScript', count: undefined },
    { icon: '\uD83D\uDDC4\uFE0F', name: 'SQL', count: undefined },
    { icon: '\uD83D\uDCCA', name: 'Entity Framework', count: 1 },
    { icon: '\uD83D\uDD25', name: 'Blazor', count: undefined },
    { icon: '\uD83C\uDFAF', name: 'Angular', count: undefined },
    { icon: '\uD83D\uDCE6', name: 'npm', count: 12 },
    { icon: '\uD83D\uDD0D', name: 'xUnit', count: 1 },
    { icon: '\uD83D\uDCC4', name: 'JSON', count: undefined },
    { icon: '\uD83D\uDEE0\uFE0F', name: 'LINQ', count: undefined },
    { icon: '\u2699\uFE0F', name: 'ASP.NET', count: undefined },
    { icon: '\uD83D\uDDA5\uFE0F', name: 'Bash', count: undefined },
    { icon: '\uD83D\uDC27', name: 'Linux', count: undefined },
    { icon: '\uD83C\uDF1F', name: 'SOLID', count: undefined },
  ];

  // Bag categories
  const bags = [
    { icon: '\uD83C\uDF92', name: 'Backend' },
    { icon: '\uD83D\uDCBC', name: 'Frontend' },
    { icon: '\u2699\uFE0F', name: 'DevOps' },
    { icon: '\uD83C\uDFAE', name: 'GameDev' },
  ];

  const buffs = [
    { name: 'Employed', icon: '\uD83D\uDCBC', effect: '+Professional Experience' },
    { name: 'Learning Unity', icon: '\uD83C\uDFAE', effect: '+Game Dev Skills' },
    { name: 'Seeking M&M', icon: '\u2B50', effect: '+Motivation +100' },
    { name: 'Open Source', icon: '\uD83C\uDF10', effect: '+Community Contribution' },
  ];

  const abilities = [
    { name: 'Problem Solving', icon: '\uD83E\uDDE9', description: 'Break down complex challenges' },
    { name: 'Code Review', icon: '\uD83D\uDD0D', description: 'Evaluate and improve code quality' },
    { name: 'Debugging', icon: '\uD83D\uDC1B', description: 'Track down and fix issues' },
    { name: 'Refactoring', icon: '\u267B\uFE0F', description: 'Improve code structure' },
    { name: 'Documentation', icon: '\uD83D\uDCDD', description: 'Write clear technical docs' },
    { name: 'Collaboration', icon: '\uD83E\uDD1D', description: 'Work effectively with others' },
    { name: 'Git Commit', icon: '\uD83D\uDCBE', description: 'Version control operations' },
    { name: 'API Design', icon: '\uD83D\uDD0C', description: 'Design RESTful interfaces' },
    { name: 'DB Query', icon: '\uD83D\uDDC4\uFE0F', description: 'Optimize data operations' },
    { name: 'Deploy', icon: '\uD83D\uDE80', description: 'Ship to production' },
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
      reward: 'Career advancement, passion project involvement',
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

  const xpPercent = 72;

  return (
    <>
      <Head>
        <title>Viktor Hurtig - Character Inspection</title>
        <meta name="description" content="Viktor Hurtig's interactive resume styled as a Monsters and Memories character sheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ background: '#1E1E22', minHeight: '100vh', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="stone-frame"
          style={{ maxWidth: '1100px', width: '100%', padding: '0' }}
        >
          {/* TAB NAVIGATION */}
          <div className="stone-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`stone-tab ${activeTab === tab.id ? 'stone-tab-active' : 'stone-tab-inactive'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="dark-panel" style={{ margin: '0 8px 8px 8px', padding: '0.75rem' }}>

            {/* INVENTORY TAB - Character Sheet */}
            {activeTab === 'inventory' && (
              <div
                className="inventory-grid-layout"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr 200px',
                  gap: '0.75rem',
                  minHeight: '600px',
                }}
              >
                {/* LEFT COLUMN - Stats */}
                <div className="left-stats-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                  {/* PERSONA */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="section-label">Persona</div>
                    <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.85rem', color: '#D4AF37', textAlign: 'center', marginBottom: '0.2rem', textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                      {character.name}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#C4B5A0', lineHeight: '1.5' }}>
                      <div>Level {character.level}</div>
                      <div>{character.race}</div>
                      <div>{character.class}</div>
                      <div>{character.alignment}</div>
                    </div>
                  </div>

                  {/* EXPERIENCE */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="section-label">Experience</div>
                    <div className="xp-bar-track" style={{ marginBottom: '0.2rem' }}>
                      <motion.div
                        className="xp-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${xpPercent}%` }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* RESOURCE BARS */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="resource-bar">
                      <span className="resource-bar-label">Health</span>
                      <div className="resource-bar-track">
                        <motion.div className="resource-bar-fill hp" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5 }} />
                      </div>
                      <span className="resource-bar-value">1823/1823</span>
                    </div>
                    <div className="resource-bar">
                      <span className="resource-bar-label">Mana</span>
                      <div className="resource-bar-track">
                        <motion.div className="resource-bar-fill mana" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, delay: 0.2 }} />
                      </div>
                      <span className="resource-bar-value">37/37</span>
                    </div>
                    <div className="resource-bar">
                      <span className="resource-bar-label">Endurance</span>
                      <div className="resource-bar-track">
                        <motion.div className="resource-bar-fill endurance" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, delay: 0.4 }} />
                      </div>
                      <span className="resource-bar-value">100/75</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0.3rem', fontFamily: 'Courier New, monospace', fontSize: '0.65rem' }}>
                      <span style={{ color: '#C4B5A0' }}>Armor Class</span>
                      <span style={{ color: '#E8D5B7' }}>69</span>
                    </div>
                  </div>

                  {/* STATISTICS */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="section-label">Statistics</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
                      {stats.map((stat) => (
                        <div key={stat.abbr} className="stat-row-compact" title={`${stat.full}: ${stat.description}`}>
                          <span className="stat-abbr">{stat.abbr}</span>
                          <span className="stat-num">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RESISTANCES */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="section-label">Resistances</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
                      {resistances.map((res) => (
                        <div key={res.abbr} className="resistance-row" title={res.full}>
                          <span className="resistance-name">{res.abbr}</span>
                          <span className="resistance-value">{res.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DEVOTION */}
                  <div className="dark-panel-shallow" style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: '#8B7E71', fontFamily: 'Courier New, monospace' }}>Devotion</div>
                    <div className="animate-glow" style={{ fontSize: '1rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>100</div>
                  </div>
                </div>

                {/* CENTER COLUMN - Character + Equipment */}
                <div className="center-character-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                  {/* Equipment around portrait */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>

                    {/* Top equipment row: Ear, Neck, Face, Ear */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'flex-end' }}>
                      <EquipSlotMini slot="Ear" {...equipment.ear1} />
                      <EquipSlotMini slot="Neck" {...equipment.neck} />
                      <EquipSlotMini slot="Face" {...equipment.face} />
                      <EquipSlotMini slot="Ear" {...equipment.ear2} />
                    </div>

                    {/* Middle row: Wrist | Portrait | Finger */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                        <EquipSlotMini slot="Wrist" {...equipment.wrist} />
                        <EquipSlotMini slot="Shoulders" {...equipment.shoulders} />
                      </div>

                      {/* PORTRAIT */}
                      <div className="portrait-archway" style={{ width: '260px', height: '320px', flexShrink: 0 }}>
                        <img
                          src="/images/viktor-portrait.png"
                          alt="Viktor Hurtig"
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                        <EquipSlotMini slot="Finger" {...equipment.finger1} />
                        <EquipSlotMini slot="Finger" {...equipment.finger2} />
                      </div>
                    </div>

                    {/* Bottom equipment row */}
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'flex-start' }}>
                      <EquipSlotMini slot="Chest" {...equipment.chest} />
                      <EquipSlotMini slot="Primary" {...equipment.primary} />
                      <EquipSlotMini slot="Secondary" {...equipment.secondary} />
                      <EquipSlotMini slot="Range" {...equipment.range} />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span className="equip-slot-label">Ammo</span>
                        <div className="equip-slot" style={{ width: '48px', height: '32px' }}>
                          <span style={{ fontSize: '0.7rem', color: '#E8D5B7', fontFamily: 'Courier New, monospace' }}>997</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Buffs */}
                  <div className="dark-panel-shallow" style={{ padding: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {buffs.map((buff) => (
                        <BuffIcon key={buff.name} {...buff} />
                      ))}
                    </div>
                  </div>

                  {/* Memorized Abilities */}
                  <div className="dark-panel-shallow" style={{ padding: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {abilities.map((ability, index) => (
                        <AbilitySlot key={ability.name} {...ability} slotNumber={index + 1} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN - Inventory */}
                <div className="right-inventory-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                  <div className="dark-panel-shallow" style={{ padding: '0.5rem', flex: 1 }}>
                    <div className="section-label">Inventory</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 36px)', gap: '2px', justifyContent: 'center' }}>
                      {inventoryItems.map((item, i) => (
                        <div key={i} className="inv-slot" title={item.name}>
                          <span>{item.icon}</span>
                          {item.count !== undefined && (
                            <span className="inv-count">{item.count}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dark-panel-shallow" style={{ padding: '0.5rem' }}>
                    <div className="section-label">Bags</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 36px)', gap: '2px', justifyContent: 'center' }}>
                      {bags.map((bag, i) => (
                        <div key={i} className="inv-slot" title={bag.name}>
                          <span>{bag.icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <a
                      href="https://github.com/WeaveCraft"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stone-button stone-button-primary"
                    >
                      View GitHub
                    </a>
                    <button
                      className="stone-button stone-button-danger"
                      onClick={() => setActiveTab('social')}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SKILLS TAB - Detailed Stats */}
            {activeTab === 'skills' && (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '1rem' }}>Core Attributes</div>
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.abbr}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      marginBottom: '0.5rem',
                      background: 'linear-gradient(135deg, #1E1E22 0%, #18181C 100%)',
                      border: '1px solid #3A3A3E',
                    }}
                  >
                    <div style={{ width: '50px', textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', fontWeight: 'bold' }}>{stat.abbr}</div>
                      <div style={{ fontSize: '1.1rem', color: '#E8D5B7', fontFamily: 'Courier New, monospace', fontWeight: 'bold' }}>{stat.value}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '0.2rem' }}>{stat.full}</div>
                      <div style={{ fontSize: '0.65rem', color: '#8B7E71', fontStyle: 'italic', marginBottom: '0.3rem' }}>{stat.description}</div>
                      {stat.details.map((detail, j) => (
                        <div key={j} style={{ fontSize: '0.6rem', color: '#5A8A4A', fontFamily: 'Courier New, monospace' }}>
                          &#9656; {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <div className="section-label" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Resistances</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {resistances.map((res) => (
                    <div key={res.abbr} style={{
                      textAlign: 'center',
                      padding: '0.5rem',
                      background: 'linear-gradient(135deg, #1E1E22 0%, #18181C 100%)',
                      border: '1px solid #3A3A3E',
                    }}>
                      <div style={{ fontSize: '0.6rem', color: '#8B7E71' }}>{res.abbr}</div>
                      <div style={{ fontSize: '1rem', color: res.value > 0 ? '#E8D5B7' : '#8A4A4A', fontWeight: 'bold' }}>{res.value}</div>
                      <div style={{ fontSize: '0.5rem', color: '#8B7E71', marginTop: '0.15rem' }}>{res.full}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUESTS TAB */}
            {activeTab === 'quests' && (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Main Quest</div>
                <div className="quest-item animate-subtle-pulse" style={{ border: '2px solid #8B6914', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.85rem', margin: '0 0 0.4rem 0' }}>
                    {quests.mainQuest.title}
                  </h4>
                  <p style={{ color: '#C4B5A0', fontSize: '0.65rem', fontStyle: 'italic', fontFamily: 'Courier New, monospace', marginBottom: '0.6rem' }}>
                    {quests.mainQuest.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {quests.mainQuest.objectives.map((obj, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <span style={{ color: obj.completed ? '#5A8A4A' : '#8B7E71', fontSize: '0.7rem', flexShrink: 0 }}>
                          {obj.completed ? '\u2713' : '\u25CB'}
                        </span>
                        <div style={{ flex: 1 }}>
                          <span style={{
                            color: obj.completed ? '#8B7E71' : '#C4B5A0',
                            fontSize: '0.65rem',
                            fontFamily: 'Courier New, monospace',
                            textDecoration: obj.completed ? 'line-through' : 'none',
                          }}>
                            {obj.text}
                          </span>
                          {obj.progress !== undefined && !obj.completed && (
                            <div className="quest-progress-track" style={{ marginTop: '0.2rem' }}>
                              <div className="quest-progress-fill" style={{ width: `${obj.progress}%` }} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid #3A3A3E' }}>
                    <p style={{ color: '#8B7E71', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>
                      Reward: {quests.mainQuest.reward}
                    </p>
                  </div>
                </div>

                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Completed Quests</div>
                <div style={{ marginBottom: '1.5rem' }}>
                  {quests.completedQuests.map((quest, i) => (
                    <div key={i} className="quest-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#5A8A4A', fontSize: '0.7rem' }}>{'\u2713'}</span>
                        <span style={{ color: '#C4B5A0', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#D4AF37', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>+{quest.xp} XP</span>
                        <br />
                        <span style={{ color: '#8B7E71', fontSize: '0.55rem', fontFamily: 'Courier New, monospace' }}>{quest.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section-label" style={{ marginBottom: '0.75rem' }}>Side Quests</div>
                {quests.sideQuests.map((quest, i) => (
                  <div key={i} className="quest-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#C4B5A0', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>{quest.title}</span>
                      <span style={{ color: '#D4AF37', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>{quest.progress}%</span>
                    </div>
                    <div className="quest-progress-track">
                      <div className="quest-progress-fill" style={{ width: `${quest.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GUILD TAB - M&M Application */}
            {activeTab === 'guild' && (
              <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <div className="section-label" style={{ marginBottom: '1rem' }}>Guild Application</div>
                <div className="dark-panel-shallow" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                  <h3 className="animate-glow" style={{ fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>
                    Monsters &amp; Memories
                  </h3>
                  <p style={{ fontSize: '0.7rem', color: '#C4B5A0', lineHeight: '1.8', fontFamily: 'Courier New, monospace' }}>
                    I&apos;m a passionate gamer and developer who grew up on
                    classic MMORPGs. Building this character sheet wasn&apos;t
                    just a resume exercise &mdash; it&apos;s a love letter to the
                    genre I want to help build.
                  </p>
                  <div style={{ marginTop: '1rem', padding: '0.75rem', border: '1px solid #3A3A3E', background: 'rgba(0,0,0,0.2)' }}>
                    <p style={{ fontSize: '0.65rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '0.3rem' }}>
                      Why M&amp;M?
                    </p>
                    <p style={{ fontSize: '0.6rem', color: '#C4B5A0', lineHeight: '1.7', fontFamily: 'Courier New, monospace' }}>
                      Because the best code comes from people who
                      genuinely love what they&apos;re building. I bring
                      strong C#/.NET fundamentals, a growing Unity
                      skillset, and an unwavering passion for classic
                      MMORPG design. I want to be part of making
                      something players will remember for decades.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[
                    'C# Expert',
                    'Full-Stack Developer',
                    'Unity Learner',
                    'MMORPG Veteran',
                    'Team Player',
                    'Quick Learner',
                  ].map((tag) => (
                    <span key={tag} style={{
                      padding: '0.3rem 0.6rem',
                      border: '1px solid #3A3A3E',
                      fontSize: '0.6rem',
                      color: '#C4B5A0',
                      fontFamily: 'Courier New, monospace',
                      background: 'rgba(0,0,0,0.2)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SOCIAL TAB - Contact */}
            {activeTab === 'social' && (
              <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
                <div className="section-label" style={{ marginBottom: '1rem' }}>Contact</div>
                <div className="dark-panel-shallow" style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#8B7E71', marginBottom: '0.2rem' }}>Character</div>
                    <div style={{ fontSize: '1rem', color: '#D4AF37', fontFamily: 'Cinzel, Georgia, serif' }}>{character.name}</div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#8B7E71', marginBottom: '0.2rem' }}>Location</div>
                    <div style={{ fontSize: '0.8rem', color: '#C4B5A0' }}>S&ouml;dermanland, Sweden</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <a
                      href="https://github.com/WeaveCraft"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stone-button stone-button-primary"
                    >
                      GitHub - WeaveCraft
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER - Currency bar like the game */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.4rem 1rem',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.6rem',
            color: '#8B7E71',
            borderTop: '1px solid #3A3A3E',
          }}>
            <span>Currency</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>0</span>
              <span>19</span>
              <span>236</span>
              <span>792</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span>Weight</span>
              <span style={{ color: '#E8D5B7' }}>69 / 129</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* Inline equipment slot component with tooltip */
function EquipSlotMini({
  slot,
  name,
  icon,
  type,
  description,
  stats = [],
}: {
  slot: string;
  name: string;
  icon: string;
  type: 'Weapon' | 'Armor' | 'Tool' | 'Artifact';
  description: string;
  stats?: string[];
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="equip-slot-label">{slot}</span>
      <div className="equip-slot">
        <span className="slot-icon">{icon}</span>
      </div>
      <span className="equip-slot-name">{name}</span>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="game-tooltip left-1/2 bottom-full mb-2 w-48 z-50"
            style={{ transform: 'translateX(-50%)' }}
          >
            <h4>{icon} {name}</h4>
            <p className="tooltip-type">{type} &middot; {slot}</p>
            <p style={{ fontStyle: 'italic' }}>{description}</p>
            {stats.length > 0 && (
              <div style={{ marginTop: '0.3rem', borderTop: '1px solid #3A3A3E', paddingTop: '0.3rem' }}>
                {stats.map((stat, i) => (
                  <p key={i} className="tooltip-stat">{stat}</p>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
