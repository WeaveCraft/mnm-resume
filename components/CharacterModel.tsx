export default function CharacterModel() {
  return (
    <div className="character-portrait-container">
      {/* Portrait frame */}
      <div className="portrait-frame">
        <img
          src="/images/viktor-portrait.png"
          alt="Viktor Hurtig - Unity Programmer"
          className="portrait-image"
        />
      </div>

      {/* Character nameplate */}
      <div className="portrait-nameplate">
        <div className="nameplate-divider">━━━</div>
        <h3 className="nameplate-name">VIKTOR HURTIG</h3>
        <p className="nameplate-title">Unity Programmer</p>
        <div className="nameplate-divider">━━━</div>
      </div>
    </div>
  );
}
