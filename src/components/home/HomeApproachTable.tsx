import {
  Check,
  Handshake,
  ShoppingCart,
  Target,
  type LucideIcon,
} from 'lucide-react';

type ApproachItem = {
  problemTitle: string;
  problemCopy: string;
  actions: readonly string[];
  result: string;
  icon: LucideIcon;
};

const approachItems: readonly ApproachItem[] = [
  {
    problemTitle: 'Oferta jest dobra, ale trudno ją zrozumieć',
    problemCopy:
      'Użytkownik trafia na stronę, ale nie wie, czym firma się wyróżnia, gdzie znaleźć konkretną usługę ani jaki powinien wykonać kolejny krok.',
    actions: [
      'Porządkuję architekturę informacji',
      'Ustalam hierarchię komunikatów',
      'Skracam drogę do kluczowych treści',
      'Projektuję czytelne CTA i strukturę mobile',
    ],
    result: 'Strona szybciej wyjaśnia ofertę i prowadzi użytkownika do kontaktu.',
    icon: Target,
  },
  {
    problemTitle: 'Sklep generuje ruch, ale zakupy są zbyt trudne',
    problemCopy:
      'Klienci mają problem ze znalezieniem produktu, wyborem wariantu albo przejściem przez koszyk.',
    actions: [
      'Upraszczam nawigację i filtrowanie',
      'Porządkuję karty produktów',
      'Poprawiam koszyk i checkout',
      'Optymalizuję wersję mobilną',
    ],
    result: 'Proces zakupowy staje się prostszy, czytelniejszy i mniej podatny na porzucenie koszyka.',
    icon: ShoppingCart,
  },
  {
    problemTitle: 'Projekt wymaga sprawnego wdrożenia B2B',
    problemCopy:
      'Agencja ma gotowy projekt, ale potrzebuje osoby, która przejmie frontend lub WordPress i dopasuje się do istniejącego procesu.',
    actions: [
      'Pracuję na podstawie Figmy',
      'Dzielę interfejs na komponenty',
      'Dbam o zgodność z projektem',
      'Raportuję postęp i ryzyka',
    ],
    result: 'Partner otrzymuje przewidywalne wsparcie bez potrzeby budowania dodatkowego zespołu.',
    icon: Handshake,
  },
];

const mobileLabelClassName =
  'mb-[0.85rem] block text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-white/70 lg:hidden';
const cellClassName =
  'block w-full border-b border-white/25 bg-transparent p-[1.35rem] align-middle last:border-b-0 lg:table-cell lg:w-auto lg:border-b-0 lg:p-8';

export default function HomeApproachTable() {
  return (
    <div className="mt-10 overflow-visible border-0 bg-transparent shadow-none lg:overflow-hidden lg:rounded-[24px] lg:border lg:border-white/50 lg:bg-[linear-gradient(135deg,rgba(8,47,153,0.42),rgba(21,87,255,0.2))] lg:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_24px_70px_rgba(21,87,255,0.16)] lg:backdrop-blur-[10px] lg:backdrop-saturate-150">
      <table className="block w-full text-white [text-shadow:0_1px_2px_rgba(15,23,42,0.3)] lg:table lg:table-fixed lg:border-collapse">
        <colgroup className="hidden lg:table-column-group">
          <col className="w-[34%]" />
          <col className="w-[39%]" />
          <col className="w-[27%]" />
        </colgroup>
        <thead className="hidden lg:table-header-group">
          <tr className="bg-[linear-gradient(90deg,rgba(8,47,153,0.72)_0%,rgba(21,87,255,0.55)_52%,rgba(96,165,250,0.34)_100%)]">
            <th
              scope="col"
              className="border-r border-b border-white/35 bg-transparent px-6 py-[1.35rem] text-center text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-white/85"
            >
              Problem
            </th>
            <th
              scope="col"
              className="border-r border-b border-white/35 bg-transparent px-6 py-[1.35rem] text-center text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-white/85"
            >
              Co robię
            </th>
            <th
              scope="col"
              className="border-b border-white/35 bg-transparent px-6 py-[1.35rem] text-center text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-white/85"
            >
              Efekt
            </th>
          </tr>
        </thead>
        <tbody className="grid gap-4 lg:table-row-group lg:[&>tr:not(:last-child)>td]:border-b lg:[&>tr:not(:last-child)>td]:border-white/35 lg:[&>tr>td:not(:last-child)]:border-r lg:[&>tr>td:not(:last-child)]:border-white/35">
          {approachItems.map(({ problemTitle, problemCopy, actions, result, icon: Icon }) => (
            <tr
              key={problemTitle}
              className="grid overflow-hidden rounded-[20px] border border-white/50 bg-[linear-gradient(135deg,rgba(8,47,153,0.72),rgba(21,87,255,0.48))] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_18px_48px_rgba(21,87,255,0.18)] backdrop-blur-[10px] backdrop-saturate-150 lg:table-row lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none lg:backdrop-saturate-100"
            >
              <td className={cellClassName}>
                <span className={mobileLabelClassName}>Problem</span>
                <h3 className="wc-heading-sm text-white">{problemTitle}</h3>
                <p className="mt-[0.55rem] text-[0.875rem] leading-[1.65] text-white/85">
                  {problemCopy}
                </p>
              </td>
              <td className={cellClassName}>
                <span className={mobileLabelClassName}>Co robię</span>
                <ul className="grid gap-[0.55rem]">
                  {actions.map((action) => (
                    <li
                      key={action}
                      className="flex items-start gap-3 text-[0.875rem] leading-[1.65] text-white/85"
                    >
                      <span
                        className="mt-[0.15rem] inline-flex h-[1.1rem] w-[1.1rem] shrink-0 items-center justify-center rounded-full border border-blue/30 bg-white/85 text-blue shadow-[0_4px_12px_rgba(21,87,255,0.18)]"
                        aria-hidden="true"
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className={cellClassName}>
                <span className={mobileLabelClassName}>Efekt</span>
                <div className="grid grid-cols-[3rem_1fr] items-center gap-4 sm:grid-cols-[auto_1fr] sm:gap-[1.4rem]">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/80 text-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_30px_rgba(21,87,255,0.18)] backdrop-blur-sm sm:h-16 sm:w-16">
                    <Icon
                      size={52}
                      strokeWidth={1.7}
                      className="h-8 w-8 sm:h-11 sm:w-11"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="text-[0.875rem] leading-[1.65] text-white/85">{result}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
