(function () {
  "use strict";

  const simulatorData = {
    level: {
      id: "level4_fault_diagnosis",
      title: "GC Analyzer Engineering Training Simulator — Level 4",
      subtitle: "Fault Diagnosis and Alarm Logic",
      pass_score: 70,
      total_scenarios: 10
    },
    scenarios: [
      {
        id: "L4-001",
        tier: 1,
        severity: "warning",
        alarm_code: "TT101_LOW",
        alarm_title: "TT-101 Low Temperature",
        run_mode: "sample_analysis",
        status_text: "Oven temperature below setpoint",
        question_type: "impact",
        question: "What is the most likely process impact?",
        values: {
          "TT-101 Setpoint": "200 °C",
          "TT-101 Actual": "183 °C",
          "TT-102 Actual": "150 °C",
          "PT-101": "2.1 barg",
          "PT-102": "1.8 barg",
          "FT-101": "15 mL/min",
          "FT-102": "35 mL/min",
          "V-201": "Closed",
          "V-202": "Closed"
        },
        highlight_keys: ["TT-101 Actual"],
        symptoms: [
          "Retention time may drift.",
          "Separation quality may degrade.",
          "Other variables appear normal."
        ],
        choices: [
          "Poor chromatographic separation",
          "Detector electrical failure",
          "Sample valve leakage",
          "Carrier gas contamination"
        ],
        correct_answer: "Poor chromatographic separation",
        explanation:
          "Low oven temperature changes the thermal environment of the separation path. This commonly causes retention time shift, broader peaks, and poorer chromatographic separation.",
        first_action:
          "Check oven heater output, temperature controller response, and thermal loop health.",
        score_weight: 10
      },
      {
        id: "L4-002",
        tier: 1,
        severity: "critical",
        alarm_code: "TT102_HIGH",
        alarm_title: "TT-102 High Temperature",
        run_mode: "sample_analysis",
        status_text: "Detector temperature above safe limit",
        question_type: "risk",
        question: "What is the immediate engineering concern?",
        values: {
          "TT-101 Actual": "200 °C",
          "TT-102 Setpoint": "150 °C",
          "TT-102 Actual": "171 °C",
          "PT-102": "1.8 barg",
          "FT-102": "35 mL/min",
          "DT-101 Status": "Unstable"
        },
        highlight_keys: ["TT-102 Actual", "DT-101 Status"],
        symptoms: [
          "Detector response is unstable.",
          "Temperature exceeds expected operating range."
        ],
        choices: [
          "Detector damage or signal instability",
          "Carrier gas loss",
          "Blocked column",
          "Pressure regulator failure"
        ],
        correct_answer: "Detector damage or signal instability",
        explanation:
          "An overheated detector can drift, behave erratically, or suffer damage. This is primarily a detector integrity and signal quality issue.",
        first_action:
          "Inspect detector heater control loop and reduce or isolate detector heating if necessary.",
        score_weight: 10
      },
      {
        id: "L4-003",
        tier: 1,
        severity: "critical",
        alarm_code: "FT102_LOW",
        alarm_title: "FT-102 Low Carrier Flow",
        run_mode: "sample_analysis",
        status_text: "Carrier flow below operating minimum",
        question_type: "first_check",
        question: "Which component should be checked first?",
        values: {
          "PT-102": "0.8 barg",
          "FT-102 Target": "35 mL/min",
          "FT-102 Actual": "11 mL/min",
          "TT-101": "200 °C",
          "TT-102": "150 °C",
          "V-201": "Closed",
          "V-202": "Closed"
        },
        highlight_keys: ["PT-102", "FT-102 Actual"],
        symptoms: [
          "Carrier pressure is also low.",
          "Thermal conditions are normal."
        ],
        choices: [
          "Pressure regulator",
          "Detector heater",
          "Sample selector",
          "Oven controller"
        ],
        correct_answer: "Pressure regulator",
        explanation:
          "Low carrier pressure together with low carrier flow strongly points to a carrier supply or regulator problem rather than a thermal or routing fault.",
        first_action:
          "Inspect gas supply pressure, regulator setpoint, and upstream isolation status.",
        score_weight: 12
      },
      {
        id: "L4-004",
        tier: 1,
        severity: "warning",
        alarm_code: "PT101_LOW",
        alarm_title: "PT-101 Low Sample Pressure",
        run_mode: "sample_analysis",
        status_text: "Sample pressure below target band",
        question_type: "impact",
        question: "What is the most likely result?",
        values: {
          "PT-101 Normal": "2.0 barg",
          "PT-101 Actual": "0.7 barg",
          "FT-101": "5 mL/min",
          "PT-102": "1.8 barg",
          "FT-102": "35 mL/min"
        },
        highlight_keys: ["PT-101 Actual", "FT-101"],
        symptoms: [
          "Sample flow is low.",
          "Carrier side remains normal."
        ],
        choices: [
          "Insufficient sample reaching analyzer",
          "Detector overheating",
          "Column overpressure",
          "False calibration sequence"
        ],
        correct_answer: "Insufficient sample reaching analyzer",
        explanation:
          "Low sample pressure reduces sample delivery and can make the analysis weak, delayed, or non-representative.",
        first_action:
          "Check upstream sample regulator, conditioning train, and sample line restrictions.",
        score_weight: 10
      },
      {
        id: "L4-005",
        tier: 2,
        severity: "critical",
        alarm_code: "PT103_DIFF_HIGH",
        alarm_title: "PT-103 High Differential Pressure",
        run_mode: "sample_analysis",
        status_text: "Column differential pressure above limit",
        question_type: "root_cause",
        question: "What is the most likely root cause?",
        values: {
          "PT-103 Inlet": "2.4 barg",
          "PT-103 Outlet": "0.5 barg",
          "FT-103": "8 mL/min",
          "TT-101": "200 °C",
          "V-201": "Closed",
          "V-202": "Closed"
        },
        highlight_keys: ["PT-103 Inlet", "PT-103 Outlet", "FT-103"],
        symptoms: [
          "Flow through the column section is low.",
          "Thermal conditions are normal."
        ],
        choices: [
          "Column blockage or restriction",
          "Detector overheating",
          "Vent valve leak",
          "Sample selector failure"
        ],
        correct_answer: "Column blockage or restriction",
        explanation:
          "High pressure drop across the column path combined with low flow is a classic sign of restriction or blockage.",
        first_action:
          "Inspect the column path, contamination risk, and routing valves associated with the separation line.",
        score_weight: 12
      },
      {
        id: "L4-006",
        tier: 2,
        severity: "critical",
        alarm_code: "V202_STUCK_OPEN",
        alarm_title: "V-202 Position Mismatch",
        run_mode: "sample_analysis",
        status_text: "Calibration gas valve open outside calibration sequence",
        question_type: "consequence",
        question: "What is the most likely consequence?",
        values: {
          "V-202 Command": "Closed",
          "V-202 Feedback": "Open",
          "FT-101": "15 mL/min",
          "Trend": "Stable but unrealistic"
        },
        highlight_keys: ["V-202 Feedback", "Trend"],
        symptoms: [
          "Analyzer is in sample analysis mode.",
          "Composition trend looks suspiciously stable."
        ],
        choices: [
          "Process sample contamination by calibration gas",
          "Low oven temperature",
          "Detector grounding fault",
          "No sample pressure alarm"
        ],
        correct_answer: "Process sample contamination by calibration gas",
        explanation:
          "If calibration gas enters during sample analysis, the reported composition no longer represents the live process.",
        first_action:
          "Isolate the calibration gas line and verify valve actuator and position feedback.",
        score_weight: 12
      },
      {
        id: "L4-007",
        tier: 2,
        severity: "warning",
        alarm_code: "V201_OPEN_DURING_RUN",
        alarm_title: "V-201 Open During Run",
        run_mode: "sample_analysis",
        status_text: "Vent valve open during sample route",
        question_type: "root_cause",
        question: "Why is the analysis failing?",
        values: {
          "V-201 Command": "Closed",
          "V-201 Feedback": "Open",
          "FT-101": "6 mL/min",
          "PT-101": "0.9 barg",
          "PT-102": "1.8 barg"
        },
        highlight_keys: ["V-201 Feedback", "FT-101", "PT-101"],
        symptoms: [
          "Sample flow is low.",
          "Sample pressure is unstable."
        ],
        choices: [
          "Gas is being lost to vent instead of routed correctly",
          "Column is too hot",
          "Detector heater is low",
          "Carrier pressure is too high"
        ],
        correct_answer: "Gas is being lost to vent instead of routed correctly",
        explanation:
          "An open vent path can bleed sample away from the analytical route and cause unstable or invalid measurement.",
        first_action:
          "Check valve actuation, command signal, and routing logic for the vent line.",
        score_weight: 12
      },
      {
        id: "L4-008",
        tier: 3,
        severity: "critical",
        alarm_code: "CARRIER_FAULT_COMBINED",
        alarm_title: "Multiple Carrier-Side Alarms",
        run_mode: "sample_analysis",
        status_text: "Carrier-side variables degraded together",
        question_type: "primary_fault",
        question: "What is the most probable primary fault?",
        values: {
          "TT-101": "200 °C",
          "TT-102": "150 °C",
          "PT-102": "0.7 barg",
          "FT-102": "10 mL/min",
          "PT-103 Differential": "0.4 bar",
          "V-201": "Closed",
          "V-202": "Closed"
        },
        highlight_keys: ["PT-102", "FT-102"],
        symptoms: [
          "Thermal variables are normal.",
          "Valve feedback is normal.",
          "Carrier pressure and flow are both low."
        ],
        choices: [
          "Carrier gas supply or regulator issue",
          "Blocked detector",
          "Oven heater failure",
          "Calibration gas contamination"
        ],
        correct_answer: "Carrier gas supply or regulator issue",
        explanation:
          "Low carrier pressure and low carrier flow together, without matching valve or temperature faults, point upstream to carrier supply or pressure regulation.",
        first_action:
          "Inspect supply cylinder or header pressure, regulator condition, and upstream isolation valves.",
        score_weight: 14
      },
      {
        id: "L4-009",
        tier: 3,
        severity: "critical",
        alarm_code: "COLUMN_FAULT_COMBINED",
        alarm_title: "Column Path Restriction Scenario",
        run_mode: "sample_analysis",
        status_text: "Column path shows abnormal resistance",
        question_type: "primary_fault",
        question: "Which explanation best matches this pattern?",
        values: {
          "TT-101": "200 °C",
          "PT-102": "1.8 barg",
          "FT-102": "35 mL/min",
          "PT-103 Inlet": "2.5 barg",
          "PT-103 Outlet": "0.4 barg",
          "FT-103": "7 mL/min"
        },
        highlight_keys: ["PT-103 Inlet", "PT-103 Outlet", "FT-103"],
        symptoms: [
          "Carrier supply looks healthy.",
          "Pressure drop across the column path is excessive.",
          "Column flow is depressed."
        ],
        choices: [
          "Restriction in the column path",
          "Detector overheating",
          "Vent valve stuck open",
          "Sample pressure too high"
        ],
        correct_answer: "Restriction in the column path",
        explanation:
          "Healthy carrier conditions combined with a large column pressure drop and low local flow indicate restriction within the column path rather than upstream supply trouble.",
        first_action:
          "Check column cleanliness, contamination, blockage, and valve routing around the column train.",
        score_weight: 14
      },
      {
        id: "L4-010",
        tier: 3,
        severity: "warning",
        alarm_code: "FINAL_ASSESSMENT_MIXED",
        alarm_title: "Final Timed Mixed Diagnosis",
        run_mode: "sample_analysis",
        status_text: "One primary fault hidden inside mixed symptoms",
        question_type: "best_diagnosis",
        question: "Which diagnosis should the engineer prioritize first?",
        values: {
          "TT-101": "199 °C",
          "TT-102": "151 °C",
          "PT-101": "0.8 barg",
          "FT-101": "4 mL/min",
          "PT-102": "1.8 barg",
          "FT-102": "35 mL/min",
          "V-201": "Closed",
          "V-202": "Closed"
        },
        highlight_keys: ["PT-101", "FT-101"],
        symptoms: [
          "Carrier side is healthy.",
          "Sample side is weak.",
          "Thermal values are near normal."
        ],
        choices: [
          "Primary sample delivery problem",
          "Detector thermal runaway",
          "Column blockage",
          "Calibration valve stuck open"
        ],
        correct_answer: "Primary sample delivery problem",
        explanation:
          "The main abnormal pattern is limited to the sample side: low PT-101 and low FT-101 with healthy carrier and normal temperatures.",
        first_action:
          "Inspect the sample line, sample regulator, conditioning section, and any upstream restriction.",
        score_weight: 16
      }
    ]
  };

  const state = {
    scenarioIndex: 0,
    totalScore: 0,
    answersCorrect: 0,
    answersWrong: 0,
    streak: 0,
    bestStreak: 0,
    scenarioStartMs: 0,
    fastestResponseMs: null,
    locked: false
  };

  function init() {
    const root = document.getElementById("level4-app");
    if (!root) return;

    injectStyles();
    renderShell(root);
    loadScenario(0);
  }

  function injectStyles() {
    if (document.getElementById("level4-styles")) return;

    const style = document.createElement("style");
    style.id = "level4-styles";
    style.textContent = `
      :root{
        --bg:#eef2f7; --panel:#0f172a; --panel2:#1e293b; --card:#ffffff;
        --line:#dbe4ef; --text:#0f172a; --muted:#64748b;
        --ok:#15803d; --warn:#d97706; --crit:#dc2626; --blue:#2563eb;
      }
      *{box-sizing:border-box}
      body{margin:0;font-family:Arial,Helvetica,sans-serif;background:var(--bg);color:var(--text)}
      .l4-wrap{display:grid;grid-template-columns:320px 1fr;min-height:100vh}
      .l4-side{background:linear-gradient(180deg,var(--panel),var(--panel2));color:#e2e8f0;padding:20px}
      .l4-side h1{margin:0 0 8px;font-size:24px;line-height:1.2}
      .l4-side p{margin:0 0 16px;color:#94a3b8;line-height:1.45}
      .l4-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}
      .l4-stat{background:rgba(255,255,255,.08);border-radius:14px;padding:12px;text-align:center}
      .l4-stat-label{display:block;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:.04em}
      .l4-stat-value{display:block;font-size:22px;font-weight:700;margin-top:4px}
      .l4-chiprow{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
      .l4-chip{padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.08);font-size:12px}
      .l4-main{padding:20px}
      .l4-card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:18px;box-shadow:0 10px 28px rgba(15,23,42,.06)}
      .l4-top{display:grid;grid-template-columns:1.1fr .9fr;gap:18px}
      .l4-banner{padding:16px;border-radius:18px;color:#fff}
      .sev-warning{background:#d97706}
      .sev-critical{background:#dc2626}
      .sev-pass{background:#2563eb}
      .l4-banner small{display:block;opacity:.9;margin-bottom:8px;text-transform:uppercase;letter-spacing:.06em}
      .l4-banner h2{margin:0 0 6px;font-size:24px}
      .l4-banner p{margin:0;line-height:1.45}
      .l4-grid-title{font-weight:700;margin:0 0 10px}
      .l4-values{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .l4-value{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:#f8fafc}
      .l4-value.highlight{border-color:#f59e0b;background:#fff7ed}
      .l4-value-key{display:block;font-size:12px;color:var(--muted);margin-bottom:4px}
      .l4-value-val{font-weight:700}
      .l4-body{display:grid;grid-template-columns:1.1fr .9fr;gap:18px;margin-top:18px}
      .l4-question h3,.l4-learn h3{margin:0 0 10px;font-size:18px}
      .l4-list{margin:0;padding-left:18px;line-height:1.55;color:#334155}
      .l4-choices{display:grid;gap:10px;margin-top:14px}
      .l4-choice{width:100%;text-align:left;border:1px solid var(--line);background:#fff;border-radius:14px;padding:12px 14px;font-size:15px;cursor:pointer}
      .l4-choice:hover{border-color:#94a3b8;background:#f8fafc}
      .l4-choice.correct{border-color:var(--ok);background:#f0fdf4}
      .l4-choice.incorrect{border-color:var(--crit);background:#fef2f2}
      .l4-choice.disabled{cursor:not-allowed;opacity:.88}
      .l4-feedback{margin-top:14px;padding:14px;border-radius:14px;border:1px solid var(--line);background:#f8fafc}
      .l4-feedback.ok{border-color:#bbf7d0;background:#f0fdf4}
      .l4-feedback.bad{border-color:#fecaca;background:#fef2f2}
      .l4-actions{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}
      .l4-btn{border:0;border-radius:12px;padding:11px 14px;font-weight:700;cursor:pointer}
      .l4-btn.primary{background:var(--blue);color:#fff}
      .l4-btn.secondary{background:#e2e8f0;color:#0f172a}
      .l4-hidden{display:none}
      .l4-footer{margin-top:18px;font-size:13px;color:var(--muted)}
      .l4-results{display:grid;gap:12px}
      .l4-result{padding:12px;border:1px solid var(--line);border-radius:14px;background:#f8fafc}
      @media (max-width: 980px){
        .l4-wrap,.l4-top,.l4-body{grid-template-columns:1fr}
      }
    `;
    document.head.appendChild(style);
  }

  function renderShell(root) {
    root.innerHTML = `
      <div class="l4-wrap">
        <aside class="l4-side">
          <h1>${escapeHtml(simulatorData.level.title)}</h1>
          <p>${escapeHtml(simulatorData.level.subtitle)}</p>

          <div class="l4-stats">
            <div class="l4-stat">
              <span class="l4-stat-label">Score</span>
              <span class="l4-stat-value" id="l4-score">0</span>
            </div>
            <div class="l4-stat">
              <span class="l4-stat-label">Progress</span>
              <span class="l4-stat-value" id="l4-progress">1 / ${simulatorData.scenarios.length}</span>
            </div>
            <div class="l4-stat">
              <span class="l4-stat-label">Streak</span>
              <span class="l4-stat-value" id="l4-streak">0</span>
            </div>
            <div class="l4-stat">
              <span class="l4-stat-label">Fastest</span>
              <span class="l4-stat-value" id="l4-fastest">--</span>
            </div>
          </div>

          <div class="l4-chiprow">
            <span class="l4-chip" id="l4-tier-chip">Tier 1</span>
            <span class="l4-chip" id="l4-mode-chip">Mode: Sample Analysis</span>
            <span class="l4-chip" id="l4-severity-chip">Severity</span>
          </div>

          <div class="l4-footer">
            Pass score target: ${simulatorData.level.pass_score}<br>
            Total scenarios: ${simulatorData.level.total_scenarios}
          </div>
        </aside>

        <main class="l4-main">
          <div class="l4-card">
            <div id="l4-stage"></div>
          </div>
        </main>
      </div>
    `;
  }

  function loadScenario(index) {
    const s = simulatorData.scenarios[index];
    state.scenarioIndex = index;
    state.locked = false;
    state.scenarioStartMs = performance.now();

    setText("l4-progress", `${index + 1} / ${simulatorData.scenarios.length}`);
    setText("l4-tier-chip", `Tier ${s.tier}`);
    setText("l4-mode-chip", `Mode: ${formatMode(s.run_mode)}`);
    setText("l4-severity-chip", `Severity: ${capitalize(s.severity)}`);

    const severityClass = s.severity === "critical" ? "sev-critical" : "sev-warning";

    const valuesHtml = Object.entries(s.values).map(([k, v]) => `
      <div class="l4-value ${s.highlight_keys.includes(k) ? "highlight" : ""}">
        <span class="l4-value-key">${escapeHtml(k)}</span>
        <span class="l4-value-val">${escapeHtml(v)}</span>
      </div>
    `).join("");

    const symptomsHtml = s.symptoms.map(item => `<li>${escapeHtml(item)}</li>`).join("");

const shuffledChoices = [...s.choices].sort(() => Math.random() - 0.5);

const choicesHtml = shuffledChoices.map((choice, i) => `
  <button class="l4-choice" data-choice="${escapeHtml(choice)}">
    ${String.fromCharCode(65 + i)}. ${escapeHtml(choice)}
  </button>
`).join("");

    const stage = document.getElementById("l4-stage");
    stage.innerHTML = `
      <div class="l4-top">
        <section>
          <div class="l4-banner ${severityClass}">
            <small>Alarm ${escapeHtml(s.alarm_code)}</small>
            <h2>${escapeHtml(s.alarm_title)}</h2>
            <p>${escapeHtml(s.status_text)}</p>
          </div>
        </section>
        <section>
          <div class="l4-grid-title">Live HMI Snapshot</div>
          <div class="l4-values">${valuesHtml}</div>
        </section>
      </div>

      <div class="l4-body">
        <section class="l4-question">
          <h3>Scenario</h3>
          <ul class="l4-list">${symptomsHtml}</ul>

          <h3 style="margin-top:16px;">Question</h3>
          <div>${escapeHtml(s.question)}</div>

          <div class="l4-choices">${choicesHtml}</div>

          <div id="l4-feedback" class="l4-feedback l4-hidden"></div>

          <div class="l4-actions">
            <button class="l4-btn primary l4-hidden" id="l4-next-btn">Next Scenario</button>
            <button class="l4-btn secondary" id="l4-restart-btn">Restart Level</button>
          </div>
        </section>

        <section class="l4-learn">
          <h3>Engineering guidance</h3>
          <div class="l4-result"><strong>Run mode:</strong> ${escapeHtml(formatMode(s.run_mode))}</div>
          <div class="l4-result"><strong>Question type:</strong> ${escapeHtml(formatQuestionType(s.question_type))}</div>
          <div class="l4-result"><strong>Focus area:</strong> ${escapeHtml(focusAreaFromCode(s.alarm_code))}</div>
          <div class="l4-result"><strong>What to do:</strong> Use the abnormal values first, then eliminate normal subsystems.</div>
        </section>
      </div>
    `;

    document.querySelectorAll(".l4-choice").forEach(btn => {
      btn.addEventListener("click", function () {
        if (state.locked) return;
        submitAnswer(this.getAttribute("data-choice"));
      });
    });

    document.getElementById("l4-restart-btn").addEventListener("click", restartLevel);
    document.getElementById("l4-next-btn").addEventListener("click", function () {
      if (state.scenarioIndex < simulatorData.scenarios.length - 1) {
        loadScenario(state.scenarioIndex + 1);
      } else {
        renderCompletion();
      }
    });

    refreshStats();
  }

  function submitAnswer(selectedText) {
    const s = simulatorData.scenarios[state.scenarioIndex];
    state.locked = true;

    const elapsedMs = Math.round(performance.now() - state.scenarioStartMs);
    if (state.fastestResponseMs === null || elapsedMs < state.fastestResponseMs) {
      state.fastestResponseMs = elapsedMs;
    }

    const correct = selectedText === s.correct_answer;
    let earned = 0;

    if (correct) {
      earned += s.score_weight;
      if (elapsedMs < 10000) earned += 5;
      else if (elapsedMs < 20000) earned += 3;
      else if (elapsedMs < 30000) earned += 1;

      state.answersCorrect += 1;
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;

      if (state.streak === 3) earned += 5;
      if (state.streak === 5) earned += 10;
    } else {
      state.answersWrong += 1;
      state.streak = 0;
    }

    state.totalScore += earned;
    markChoiceButtons(s.correct_answer, selectedText);
    showFeedback(correct, elapsedMs, earned, s.correct_answer, s.explanation, s.first_action);

    document.getElementById("l4-next-btn").classList.remove("l4-hidden");
    refreshStats();
  }

  function markChoiceButtons(correctAnswer, selected) {
    document.querySelectorAll(".l4-choice").forEach(btn => {
      btn.classList.add("disabled");
      btn.disabled = true;
      const text = btn.getAttribute("data-choice");
      if (text === correctAnswer) btn.classList.add("correct");
      if (text === selected && text !== correctAnswer) btn.classList.add("incorrect");
    });
  }

  function showFeedback(correct, elapsedMs, earned, correctAnswer, explanation, firstAction) {
    const box = document.getElementById("l4-feedback");
    box.className = `l4-feedback ${correct ? "ok" : "bad"}`;
    box.classList.remove("l4-hidden");

    box.innerHTML = `
      <div><strong>${correct ? "Correct" : "Incorrect"}</strong></div>
      <div style="margin-top:6px;"><strong>Response time:</strong> ${formatMs(elapsedMs)}</div>
      <div><strong>Points earned:</strong> ${earned}</div>
      <div style="margin-top:10px;"><strong>Correct answer:</strong> ${escapeHtml(correctAnswer)}</div>
      <div style="margin-top:8px;"><strong>Why:</strong> ${escapeHtml(explanation)}</div>
      <div style="margin-top:8px;"><strong>Recommended first action:</strong> ${escapeHtml(firstAction)}</div>
    `;
  }

  function renderCompletion() {
    const accuracy = simulatorData.scenarios.length
      ? Math.round((state.answersCorrect / simulatorData.scenarios.length) * 100)
      : 0;

    const passed = state.totalScore >= simulatorData.level.pass_score;

    document.getElementById("l4-stage").innerHTML = `
      <div class="l4-results">
        <div class="l4-banner ${passed ? "sev-pass" : "sev-warning"}">
          <small>Level Complete</small>
          <h2>${passed ? "GC Analyzer Fault Diagnosis Complete" : "Level Complete — Review Recommended"}</h2>
          <p>${passed ? "Badge earned: Analyzer Troubleshooting Specialist" : "You completed the level. Review the feedback and repeat for a stronger score."}</p>
        </div>

        <div class="l4-result"><strong>Final Score:</strong> ${state.totalScore}</div>
        <div class="l4-result"><strong>Accuracy:</strong> ${accuracy}%</div>
        <div class="l4-result"><strong>Correct Answers:</strong> ${state.answersCorrect} / ${simulatorData.scenarios.length}</div>
        <div class="l4-result"><strong>Best Streak:</strong> ${state.bestStreak}</div>
        <div class="l4-result"><strong>Fastest Response:</strong> ${state.fastestResponseMs === null ? "--" : formatMs(state.fastestResponseMs)}</div>

        <div class="l4-actions">
          <button class="l4-btn primary" id="l4-restart-final">Play Again</button>
        </div>
      </div>
    `;

    document.getElementById("l4-restart-final").addEventListener("click", restartLevel);
    refreshStats();
  }

  function restartLevel() {
    state.scenarioIndex = 0;
    state.totalScore = 0;
    state.answersCorrect = 0;
    state.answersWrong = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.fastestResponseMs = null;
    loadScenario(0);
  }

  function refreshStats() {
    setText("l4-score", String(state.totalScore));
    setText("l4-streak", String(state.streak));
    setText("l4-fastest", state.fastestResponseMs === null ? "--" : formatMs(state.fastestResponseMs));
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function formatMs(ms) {
    const seconds = Math.floor(ms / 1000);
    const remainder = Math.floor((ms % 1000) / 100);
    return `${seconds}.${remainder}s`;
  }

  function formatMode(mode) {
    return mode.replaceAll("_", " ").replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }

  function formatQuestionType(type) {
    return type.replaceAll("_", " ").replace(/\b\w/g, function (m) { return m.toUpperCase(); });
  }

  function focusAreaFromCode(code) {
    if (code.includes("TT101")) return "Oven thermal control";
    if (code.includes("TT102")) return "Detector thermal control";
    if (code.includes("FT102") || code.includes("CARRIER")) return "Carrier gas delivery";
    if (code.includes("PT101")) return "Sample delivery";
    if (code.includes("PT103") || code.includes("COLUMN")) return "Column path integrity";
    if (code.includes("V201")) return "Vent routing";
    if (code.includes("V202")) return "Calibration gas routing";
    return "General analyzer diagnostics";
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
