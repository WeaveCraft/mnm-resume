interface GamePanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function GamePanel({ title, children, className = '' }: GamePanelProps) {
  return (
    <div className={`game-panel ${className}`}>
      {title && (
        <div className="panel-header">
          <h3 className="panel-title">━━━ {title.toUpperCase()} ━━━</h3>
        </div>
      )}
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
}
