/** Código original e independente, escrito para este laboratório público.
 * NÃO foi extraído do código do As 7 Chaves privado. Não acessa rede nem banco.
 */
export const TEMPERATURES = Object.freeze(['cold','warm','hot','converted','other']);
export const UNAVAILABLE_KEYS = Object.freeze([
  'funnels','pageviews','uniqueVisitors','conversions','conversionRate',
  'revenue','averageOrderValue','activeCampaigns','pendingTasks'
]);

export function summarizeSyntheticLeads(rows) {
  if (!Array.isArray(rows)) throw new TypeError('A fixture deve ser uma lista');
  const seen = new Set();
  const temperatures = {cold:0,warm:0,hot:0,converted:0,other:0};
  for (const row of rows) {
    if (!row || row.synthetic !== true || typeof row.id !== 'string' ||
        !/^synthetic-lead-[a-z0-9-]+$/.test(row.id)) {
      throw new TypeError('Somente leads artificiais identificados podem ser testados');
    }
    if (seen.has(row.id)) throw new RangeError('ID sintético duplicado');
    seen.add(row.id);
    const temperature = row.temperature;
    if (temperature !== null && typeof temperature !== 'string') {
      throw new TypeError('Temperatura inválida');
    }
    const group = TEMPERATURES.includes(temperature) ? temperature : 'other';
    temperatures[group] += 1;
  }
  return {leads:rows.length,temperatures};
}

export function syntheticDashboard(rows) {
  const summary = summarizeSyntheticLeads(rows);
  const unavailable = Object.fromEntries(UNAVAILABLE_KEYS.map(key=>[key,null]));
  return {
    fixtureOnly:true,
    source:'synthetic-public-lab',
    totals:{leads:summary.leads,templates:0,sequences:0},
    temperatures:summary.temperatures,
    unavailable
  };
}

export function verifySyntheticSnapshot(snapshot) {
  if (!snapshot || snapshot.fixtureOnly !== true || snapshot.source !== 'synthetic-public-lab') return false;
  const validCount = value => Number.isSafeInteger(value) && value >= 0;
  if (!snapshot.totals || !['leads','templates','sequences'].every(k=>validCount(snapshot.totals[k]))) return false;
  if (!snapshot.temperatures || !TEMPERATURES.every(k=>validCount(snapshot.temperatures[k]))) return false;
  if (TEMPERATURES.reduce((n,k)=>n+snapshot.temperatures[k],0)!==snapshot.totals.leads) return false;
  if (!snapshot.unavailable || !UNAVAILABLE_KEYS.every(k=>snapshot.unavailable[k]===null)) return false;
  return true;
}
