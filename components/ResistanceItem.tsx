interface ResistanceItemProps {
  name: string;
  value: number;
  description?: string;
}

export default function ResistanceItem({ name, value }: ResistanceItemProps) {
  return (
    <div className="resistance-row">
      <span className="resistance-name">{name}</span>
      <span className="resistance-dots" />
      <span className="resistance-value">+{value}</span>
    </div>
  );
}
