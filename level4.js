```javascript
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
        question: "What is the most likely process impact?",
        values: {
          "TT-101 Setpoint": "200 °C",
          "TT-101 Actual": "183 °C",
          "TT-102 Actual": "150 °C",
          "PT-101": "2.1 barg",
          "PT-102": "1.8 barg",
          "FT-101": "15 mL/min",
          "FT-102": "35 mL/min"
        },
        highlight_keys: ["TT-101 Actual"],
        choices: [
          "Poor chromatographic separation",
          "Detector electrical failure",
          "Sample valve leakage",
          "Carrier gas contamination"
        ],
        correct_answer: "Poor chromatographic separation",
        explanation:
          "Low oven temperature shifts retention time and affects separation quality.",
        first_action:
          "Check oven heater output and temperature controller.",
        score_weight: 10
      },

      {
        id: "L4-002",
        tier: 1,
        severity: "critical",
        alarm_code: "FT102_LOW",
        alarm_title: "FT-102 Low Carrier Flow",
        run_mode: "sample_analysis",
        status_text: "Carrier flow below limit",
        question: "Which component should be checked first?",
        values: {
          "PT-102": "0.8 barg",
          "FT-102 Actual": "11 mL/min",
          "TT-101": "200 °C"
        },
        highlight_keys: ["PT-102", "FT-102 Actual"],
        choices: [
          "Pressure regulator",
          "Detector heater",
          "Sample selector",
          "Oven controller"
        ],
        correct_answer: "Pressure regulator",
        explanation:
          "Low pressure and low flow together indicate carrier gas supply issue.",
        first_action:
          "Check gas regulator and cylinder/header pressure.",
        score_weight: 12
      }
    ]
  };

  const state = {
    scenarioIndex: 0,
    totalScore: 0,
    streak: 0,
    bestStreak: 0,
    startTime: 0,
    locked: false
  };

  const root = document.getElementById("level4-app") || createRoot();

  injectStyles();
  renderShell();
  loadScenario(0);

  function createRoot() {
    const el = document.createElement("div");
    el.id = "level4-app";
    document.body.appendChild(el);
    return el;
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      body{
        margin:0;
        font-family:Arial,sans-serif;
        background:#eef2f7;
      }
      .container{
        max-width:1100px;
        margin:30px auto;
        padding:20px;
      }
      .card{
        background:white;
        padding:20px;
        border-radius:16px;
        box-shadow:0 8px 20px rgba(0,0,0,0.08);
      }
      .alarm{
        padding:16px;
        border-radius:12px;
        color:white;
        margin-bottom:20px;
      }
      .warning{background:#d97706;}
      .critical{background:#dc2626;}
      .values{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        margin:20px 0;
      }
      .value-box{
        padding:12px;
        border:1px solid #ddd;
        border-radius:10px;
      }
      .highlight{
        background:#fff7ed;
        border:1px solid orange;
      }
      .choices{
        display:grid;
        gap:10px;
      }
      button.choice{
        padding:12px;
        border-radius:10px;
        border:1px solid #ccc;
        cursor:pointer;
      }
      button.choice:hover{
        background:#f8fafc;
      }
      .feedback{
        margin-top:20px;
        padding:15px;
        border-radius:10px;
        background:#f8fafc;
      }
    `;
    document.head.appendChild(style);
  }

  function renderShell() {
    root.innerHTML = `
      <div class="container">
        <div class="card">
          <h1>${simulatorData.level.title}</h1>
          <div id="stage"></div>
        </div>
      </div>
    `;
  }

  function loadScenario(index) {
    const s = simulatorData.scenarios[index];
    state.startTime = performance.now();
    state.locked = false;

    const valuesHtml = Object.entries(s.values)
      .map(([k, v]) => `
        <div class="value-box ${s.highlight_keys.includes(k) ? "highlight" : ""}">
          <strong>${k}</strong><br>${v}
        </div>
      `)
      .join("");

    const choicesHtml = s.choices
      .map(choice => `
        <button class="choice" onclick="submitAnswer('${choice}')">
          ${choice}
        </button>
      `)
      .join("");

    document.getElementById("stage").innerHTML = `
      <div class="alarm ${s.severity}">
        <strong>${s.alarm_code}</strong><br>
        ${s.alarm_title}<br>
        ${s.status_text}
      </div>

      <div class="values">${valuesHtml}</div>

      <h3>${s.question}</h3>

      <div class="choices">
        ${choicesHtml}
      </div>

      <div id="feedback"></div>
    `;
  }

  window.submitAnswer = function(answer) {
    if(state.locked) return;

    state.locked = true;

    const s = simulatorData.scenarios[state.scenarioIndex];

    const correct = answer === s.correct_answer;

    let score = correct ? s.score_weight : 0;

    state.totalScore += score;

    document.getElementById("feedback").innerHTML = `
      <div class="feedback">
        <strong>${correct ? "Correct" : "Incorrect"}</strong><br><br>
        Correct Answer: ${s.correct_answer}<br><br>
        ${s.explanation}<br><br>
        First Action: ${s.first_action}<br><br>
        Score: ${state.totalScore}
        <br><br>
        <button onclick="nextScenario()">Next</button>
      </div>
    `;
  }

  window.nextScenario = function() {
    state.scenarioIndex++;

    if(state.scenarioIndex >= simulatorData.scenarios.length){
      document.getElementById("stage").innerHTML = `
        <h2>Level Complete</h2>
        <p>Final Score: ${state.totalScore}</p>
      `;
      return;
    }

    loadScenario(state.scenarioIndex);
  }

})();
```
