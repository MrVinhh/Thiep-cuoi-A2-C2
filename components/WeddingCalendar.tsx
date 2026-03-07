// Static March 2026 calendar — March 1 = Sunday (CN)
// Columns: T2 T3 T4 T5 T6 T7 CN  (Mon–Sun)
const DAYS_HEADER = ['T2','T3','T4','T5','T6','T7','CN'];

// March 2026: starts Sunday → offset 6 (0=Mon … 6=Sun)
const OFFSET = 6;
const TOTAL  = 31;

function buildWeeks() {
  const cells: (number | null)[] = [
    ...Array(OFFSET).fill(null),
    ...Array.from({ length: TOTAL }, (_, i) => i + 1),
  ];
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const weeks = buildWeeks();

export default function WeddingCalendar() {
  return (
    <div className="cal-wrap">
      {/* Header names */}
      <div className="cal-names">
        <span className="cal-name-script">Trinh</span>
        <span className="cal-name-and"> and </span>
        <span className="cal-name-script cal-name-serif">Thịnh</span>
      </div>

      <p className="cal-month">Tháng 03 – 2026</p>

      {/* Grid */}
      <table className="cal-table">
        <thead>
          <tr>
            {DAYS_HEADER.map(d => (
              <th key={d} className="cal-th">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => (
                <td key={di} className={`cal-td${day === 14 ? ' cal-td--highlight' : ''}`}>
                  {day ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="cal-invite">Trân Trọng Kính Mời</p>
    </div>
  );
}
