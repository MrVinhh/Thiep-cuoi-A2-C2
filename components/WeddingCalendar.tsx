// Static April 2026 calendar — April 1 = Wednesday (T4)
// Columns: T2 T3 T4 T5 T6 T7 CN  (Mon–Sun)
const DAYS_HEADER = ['T2','T3','T4','T5','T6','T7','CN'];

// April 2026: starts Wednesday → offset 2 (0=Mon … 6=Sun)
const OFFSET = 2;
const TOTAL  = 30;

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
        <span className="cal-name-script cal-name-serif">Thịnh</span>
        <span className="cal-name-and"> and </span>
        <span className="cal-name-script">Trinh</span>
      </div>

      <p className="cal-month">Tháng 04 – 2026</p>

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
                <td key={di} className={`cal-td${day === 22 ? ' cal-td--highlight' : ''}`}>
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
