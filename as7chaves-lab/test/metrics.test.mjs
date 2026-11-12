import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { summarizeSyntheticLeads, syntheticDashboard, verifySyntheticSnapshot } from '../src/metrics.mjs';

const scenarios = JSON.parse(readFileSync(new URL('../fixtures/dashboard.json', import.meta.url), 'utf8'));
test('every fixture is explicitly synthetic and independent', () => {
  assert.equal(scenarios.length, 2);
  for (const scenario of scenarios) {
    assert.equal(scenario.synthetic, true);
    assert.match(scenario.scenario, /^synthetic-/);
    assert.equal(scenario.leads.every(lead => lead.synthetic && lead.id.startsWith('synthetic-lead-')), true);
  }
});
for (const scenario of scenarios) {
  test('counts for ' + scenario.scenario, () => {
    const computed = summarizeSyntheticLeads(scenario.leads);
    assert.deepEqual(computed, scenario.expected);
    const display = syntheticDashboard(scenario.leads);
    assert.equal(display.totals.leads, scenario.expected.leads);
    assert.deepEqual(display.temperatures, scenario.expected.temperatures);
    assert.equal(verifySyntheticSnapshot(display), true);
  });
}
test('zero measured is different from unavailable null', () => {
  const display = syntheticDashboard([]);
  assert.equal(display.totals.leads, 0);
  assert.equal(display.unavailable.revenue, null);
  assert.equal(display.unavailable.funnels, null);
});
test('refuse actual/unlabeled records and repeated identifiers', () => {
  assert.throws(() => summarizeSyntheticLeads([{id:'lead-from-app',temperature:'warm'}]), TypeError);
  assert.throws(() => summarizeSyntheticLeads([{synthetic:true,id:'synthetic-lead-a',temperature:'cold'}, {synthetic:true,id:'synthetic-lead-a',temperature:'warm'}]), RangeError);
  assert.throws(() => summarizeSyntheticLeads([{synthetic:true,id:'synthetic-lead-a',temperature:15}]), TypeError);
});
test('reject negative, fractional and inconsistent dashboard totals', () => {
  const snapshot = syntheticDashboard([{synthetic:true,id:'synthetic-lead-a',temperature:'cold'}]);
  for (const count of [-1, 0.5, 999]) {
    const changed = {...snapshot, totals:{...snapshot.totals,leads:count}};
    assert.equal(verifySyntheticSnapshot(changed), false);
  }
});
test('do not misrepresent synthetic fixtures as PostgreSQL observations', () => {
  const snapshot = syntheticDashboard([]);
  assert.equal(verifySyntheticSnapshot({...snapshot,source:'postgresql'}), false);
  assert.equal(verifySyntheticSnapshot({...snapshot,fixtureOnly:false}), false);
  assert.equal(verifySyntheticSnapshot({...snapshot,unavailable:{...snapshot.unavailable,revenue:0}}), false);
});
