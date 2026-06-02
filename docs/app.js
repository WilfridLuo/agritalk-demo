const cases = [
  {
    id: "tomato-blight",
    icon: "🍅",
    title: "Tomato greenhouse alert",
    crop: "Tomato",
    condition: "Blurred close-up",
    imageQuality: "Low image confidence",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tomato%20septoria%20leaf%20spot%203027.jpg",
    imageLabel: "Tomato leaf evidence",
    preview: "Dark lesions are visible, but the image is too soft for a safe diagnosis.",
    evidenceState: "low",
    evidenceList: [
      "Leaf lesions are present but the boundaries are visually soft",
      "No strong halo confirmation appears in the initial evidence",
      "Moisture context is not explicit in the first pass"
    ],
    query:
      "My tomato leaves have dark spots and the plants are getting weak. Can you tell me what disease this is?",
    checklist: [
      "Request a sharper close-up before committing to treatment",
      "Check for yellow halos and recent wet-leaf conditions",
      "Reduce overhead moisture and isolate heavily affected leaves"
    ],
    riskLevel: "Moderate",
    outcomeLabel: "Clarification required",
    nextStep: "Collect sharper visual evidence",
    firstPass: {
      stageLabel: "Clarify",
      confidence: 42,
      summary:
        "Evidence is still too incomplete for a confident disease label, so the agent pauses and asks for one more discriminative turn.",
      missing: [
        "Clear close-up of both sides of the leaf",
        "Whether yellow halos appear around the lesions",
        "Humidity and ventilation details from the greenhouse"
      ],
      reasoning: [
        "Lesion boundaries are still ambiguous",
        "The next question targets diagnosis-changing evidence",
        "Unsafe treatment advice is blocked at this stage"
      ],
      agent:
        "I need one sharper image before diagnosing. Please upload a close-up of both sides of the affected leaf and tell me whether the spots have yellow halos."
    },
    followup: {
      user:
        "Here is a clearer close-up. The spots do have yellow halos, and the greenhouse has been very humid this week.",
      prompt:
        "Additional details are now available. Continue with the clearer leaf image and greenhouse humidity context.",
      final: {
        stageLabel: "Respond",
        confidence: 83,
        summary:
          "With halo pattern and humidity context added, the model can now respond directly with a safer diagnosis and recommendation.",
        missing: [
          "No critical signal gap remains for a first-line consultation",
          "Lab confirmation can still be suggested for treatment planning"
        ],
        reasoning: [
          "The decision upgrades from clarify to respond",
          "Evidence now matches a bacterial-spot style pattern more strongly",
          "Management advice stays conservative and actionable"
        ],
        agent:
          "This looks most consistent with bacterial spot. Remove severely affected leaves, reduce overhead moisture, improve airflow, and avoid working between wet plants to limit spread."
      },
      riskLevel: "Elevated",
      outcomeLabel: "Probable bacterial spot",
      nextStep: "Apply moisture-control management"
    }
  },
  {
    id: "rice-bacterial",
    icon: "🌾",
    title: "Rice field diagnosis",
    crop: "Rice",
    condition: "Field streak pattern",
    imageQuality: "High image confidence",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bacterial%20blight%20of%20rice.jpeg",
    imageLabel: "Rice field evidence",
    preview: "Leaf-tip drying pattern and wet field context already support direct action.",
    evidenceState: "high",
    evidenceList: [
      "Tip-to-base drying pattern is clearly visible",
      "Field moisture context is already diagnostic",
      "Visual evidence is strong enough for a first response"
    ],
    query:
      "These rice leaves are drying from the tip and spreading down. The field has had standing water after heavy rain. What should I do?",
    checklist: [
      "Improve drainage in affected field zones",
      "Avoid excess nitrogen in the next cycle",
      "Confirm management intensity with local extension guidance"
    ],
    riskLevel: "Moderate",
    outcomeLabel: "Direct response available",
    nextStep: "Start field management now",
    firstPass: {
      stageLabel: "Respond",
      confidence: 86,
      summary:
        "The symptom pattern, field conditions, and image evidence are already sufficient for a first-pass response.",
      missing: [
        "No critical signal gap detected",
        "Optional local confirmation can refine treatment intensity"
      ],
      reasoning: [
        "Evidence sufficiency is high",
        "Advice is grounded in lesion pattern and field moisture context",
        "The interaction avoids unnecessary delay"
      ],
      agent:
        "This pattern is consistent with bacterial leaf blight. Improve drainage first, avoid excessive nitrogen in the next cycle, and isolate severely affected patches while you confirm management options with local extension support."
    }
  },
  {
    id: "maize-nutrient",
    icon: "🌽",
    title: "Nutrient stress ambiguity",
    crop: "Maize",
    condition: "Mixed striping symptoms",
    imageQuality: "Medium image confidence",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Maize_of_magnesium_deficiency%2C_symptoms_on_leaves.jpg",
    imageLabel: "Maize leaf evidence",
    preview: "The image is clearer than the tomato case, but disease and deficiency still overlap.",
    evidenceState: "medium",
    evidenceList: [
      "Striping is visible but not yet fully disambiguated",
      "The image suggests overlap between disease and nutrient stress",
      "Fertilizer history is still missing from the initial evidence"
    ],
    query:
      "Corn leaves are yellowing and striping, but only in some rows. We changed fertilizer last month. Is this a disease or nutrient problem?",
    checklist: [
      "Ask whether lower leaves were affected first",
      "Review the changed fertilizer composition",
      "Recommend a soil or tissue test before aggressive intervention"
    ],
    riskLevel: "Medium uncertainty",
    outcomeLabel: "Clarification required",
    nextStep: "Verify nutrient progression pattern",
    firstPass: {
      stageLabel: "Clarify",
      confidence: 57,
      summary:
        "The agent detects overlap between biotic and abiotic causes, so it requests more discriminative evidence first.",
      missing: [
        "Whether older lower leaves were affected first",
        "If yellowing follows veins or appears between them",
        "The exact fertilizer formulation that was changed"
      ],
      reasoning: [
        "Symptom space is still ambiguous",
        "Clarification targets discriminative evidence",
        "Confidence stays moderate instead of falsely certain"
      ],
      agent:
        "I need two more details before diagnosing: were the lower older leaves affected first, and does the striping follow the veins or sit between them? The new fertilizer formula would also help."
    },
    followup: {
      user:
        "The lower older leaves were affected first, and the striping is mostly between the veins. We switched to a lower-magnesium fertilizer mix.",
      prompt:
        "New progression and fertilizer information are available. Continue with a second-pass diagnosis.",
      final: {
        stageLabel: "Respond",
        confidence: 79,
        summary:
          "The new evidence shifts the consultation toward nutrient deficiency rather than infection, enabling a more targeted response.",
        missing: [
          "A soil test would strengthen the recommendation",
          "No urgent disease-specific signal is dominant now"
        ],
        reasoning: [
          "The decision upgrades from clarify to respond",
          "Lower-leaf-first progression supports a nutrient issue",
          "Interveinal striping plus fertilizer history point toward magnesium stress"
        ],
        agent:
          "This is more consistent with nutrient stress, especially magnesium deficiency, than with a leaf disease. Review the new fertilizer balance, consider a magnesium-supportive correction, and verify with a soil or tissue test if possible."
      },
      riskLevel: "Manageable",
      outcomeLabel: "Likely magnesium deficiency",
      nextStep: "Adjust fertilizer and confirm with testing"
    }
  }
];

const workflowLabels = [
  ["Step 1", "Read case"],
  ["Step 2", "Inspect evidence"],
  ["Step 3", "Decide path"],
  ["Step 4", "Reply"]
];

function getCaseById(id) {
  return cases.find((item) => item.id === id) || cases[0];
}

function renderCaseSelection() {
  const cloud = document.querySelector("#caseCloud");
  if (!cloud) {
    return;
  }

  cloud.innerHTML = cases
    .map(
      (item) => `
        <a class="case-select-card" href="./case.html?case=${item.id}">
          <div class="case-select-icon">${item.icon}</div>
          <strong>${item.title}</strong>
          <p>${item.preview}</p>
          <small>${item.condition}</small>
        </a>
      `
    )
    .join("");
}

function renderCaseRunner() {
  const titleNode = document.querySelector("#caseTitle");
  if (!titleNode) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const activeCase = getCaseById(params.get("case"));

  const cropTag = document.querySelector("#cropTag");
  const conditionTag = document.querySelector("#conditionTag");
  const imageQualityTag = document.querySelector("#imageQualityTag");
  const cropImage = document.querySelector("#cropImage");
  const imageBadge = document.querySelector("#imageBadge");
  const cropPreview = document.querySelector(".crop-preview");
  const queryInput = document.querySelector("#queryInput");
  const decisionPill = document.querySelector("#decisionPill");
  const confidenceValue = document.querySelector("#confidenceValue");
  const confidenceFill = document.querySelector("#confidenceFill");
  const workflowSteps = document.querySelector("#workflowSteps");
  const chatThread = document.querySelector("#chatThread");
  const summaryText = document.querySelector("#summaryText");
  const confidenceSignal = document.querySelector("#confidenceSignal");
  const riskSignal = document.querySelector("#riskSignal");
  const outcomeSignal = document.querySelector("#outcomeSignal");
  const nextStepSignal = document.querySelector("#nextStepSignal");
  const evidenceList = document.querySelector("#evidenceList");
  const missingList = document.querySelector("#missingList");
  const diagnosisList = document.querySelector("#diagnosisList");
  const checklist = document.querySelector("#checklist");
  const signalTray = document.querySelector("#signalTray");
  const followupBox = document.querySelector("#followupBox");
  const followupPrompt = document.querySelector("#followupPrompt");
  const followupButton = document.querySelector("#followupButton");
  const runDemoButton = document.querySelector("#runDemoButton");
  const resetButton = document.querySelector("#resetButton");
  const layoutButtons = document.querySelectorAll(".layout-button");
  const runnerBody = document.body;

  let demoState = "idle";

  function collectSignals(text) {
    const source = text.toLowerCase();
    const matched = [];
    const signalMap = [
      ["clear", "Clear photo"],
      ["close-up", "Close-up"],
      ["close up", "Close-up"],
      ["yellow halo", "Yellow halo"],
      ["yellow halos", "Yellow halo"],
      ["humid", "Humidity"],
      ["humidity", "Humidity"],
      ["standing water", "Standing water"],
      ["tip", "Tip-to-base pattern"],
      ["lower leaves", "Lower leaves first"],
      ["older leaves", "Older leaves first"],
      ["between the veins", "Interveinal"],
      ["between veins", "Interveinal"],
      ["magnesium", "Magnesium clue"],
      ["fertilizer", "Fertilizer history"]
    ];

    signalMap.forEach(([needle, label]) => {
      if (source.includes(needle) && !matched.includes(label)) {
        matched.push(label);
      }
    });

    return matched;
  }

  function renderSignalTray(signals) {
    if (!signals.length) {
      signalTray.innerHTML = `<span class="signal-chip">No extra cues detected yet</span>`;
      return;
    }

    signalTray.innerHTML = signals.map((signal) => `<span class="signal-chip">${signal}</span>`).join("");
  }

  function setEvidenceVisual(state, scanning = false) {
    cropPreview.classList.remove("evidence-low", "evidence-medium", "evidence-high", "scanning");
    cropPreview.classList.add(`evidence-${state}`);
    if (scanning) {
      cropPreview.classList.add("scanning");
    }
  }

  function renderWorkflow(activeStep = 0, doneCount = 0) {
    workflowSteps.innerHTML = "";
    workflowLabels.forEach(([eyebrow, label], index) => {
      const step = document.createElement("div");
      const isDone = index < doneCount;
      const isActive = index === activeStep;
      step.className = `workflow-step${isDone ? " done" : ""}${isActive ? " active" : ""}`;
      step.innerHTML = `
        <span class="eyebrow">${eyebrow}</span>
        <strong>${label}</strong>
      `;
      workflowSteps.appendChild(step);
    });
  }

  function renderList(target, items) {
    target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }

  function pushMessages(messages) {
    chatThread.innerHTML = "";
    messages.forEach((message, index) => {
      const bubble = document.createElement("div");
      bubble.className = `message ${message.role}`;
      bubble.style.animationDelay = `${index * 120}ms`;
      bubble.innerHTML = `
        <span class="message-label">${message.label}</span>
        <div>${message.text}</div>
      `;
      chatThread.appendChild(bubble);
    });
  }

  function updateDecisionPill(kind, text) {
    decisionPill.textContent = text;
    decisionPill.className = `status-bubble ${kind}`;
  }

  function fillResults(block) {
    confidenceValue.textContent = `${block.confidence}%`;
    confidenceFill.style.width = `${block.confidence}%`;
    summaryText.textContent = block.summary;
    renderList(missingList, block.missing);
    renderList(diagnosisList, block.reasoning);
    confidenceSignal.textContent = `${block.confidence}%`;
    riskSignal.textContent = block.riskLevel || "Pending";
    outcomeSignal.textContent = block.outcomeLabel || "Awaiting run";
    nextStepSignal.textContent = block.nextStep || "Start consultation";
  }

  function renderCaseFrame() {
    titleNode.textContent = activeCase.title;
    cropTag.textContent = activeCase.crop;
    conditionTag.textContent = activeCase.condition;
    imageQualityTag.textContent = activeCase.imageQuality;
    cropImage.src = activeCase.imageUrl;
    cropImage.alt = `${activeCase.crop} evidence image`;
    imageBadge.textContent = activeCase.imageLabel;
    queryInput.value = activeCase.query;
    renderList(evidenceList, activeCase.evidenceList);
    renderSignalTray(collectSignals(activeCase.query));
    setEvidenceVisual(activeCase.evidenceState);
    checklist.innerHTML = activeCase.checklist
      .map(
        (item) => `
          <div class="check-item">
            <span class="check-icon">OK</span>
            <span>${item}</span>
          </div>
        `
      )
      .join("");
  }

  function resetCase() {
    demoState = "idle";
    renderCaseFrame();
    renderWorkflow(0, 0);
    updateDecisionPill("", "Idle");
    confidenceValue.textContent = "0%";
    confidenceFill.style.width = "0%";
    summaryText.textContent = "Ready.";
    confidenceSignal.textContent = "0%";
    riskSignal.textContent = activeCase.riskLevel;
    outcomeSignal.textContent = "Awaiting run";
    nextStepSignal.textContent = "Start consultation";
    renderList(missingList, activeCase.firstPass.missing);
    renderList(evidenceList, activeCase.evidenceList);
    renderList(diagnosisList, [
      "The live workflow will populate the reasoning trace here.",
      "If this case requires clarification, the demo opens a second turn automatically."
    ]);
    pushMessages([]);
    followupPrompt.textContent = "";
    followupBox.classList.add("hidden");
    renderSignalTray(collectSignals(queryInput.value));
    setEvidenceVisual(activeCase.evidenceState);
  }

  function evaluateCase(text) {
    const normalized = text.toLowerCase();
    const signals = collectSignals(text);

    if (activeCase.id === "tomato-blight") {
      const strong = ["Clear photo", "Close-up", "Yellow halo", "Humidity"].filter((item) =>
        signals.includes(item)
      ).length;

      if (strong >= 2) {
        return {
          stage: "respond",
          confidence: Math.min(90, 70 + strong * 5),
          evidenceState: "high",
          summary:
            "The new query already includes the critical missing clues, so the agent can skip clarification and move directly to a response.",
          imageQuality: "High image confidence",
          condition: "Updated close-up evidence",
          imageBadge: "Updated field evidence",
          evidence: [
            "Close-up context is now explicit in the text",
            "Yellow halo clue is present",
            "Humidity context strengthens the bacterial interpretation"
          ],
          missing: activeCase.followup.final.missing,
          reasoning: [
            "Input text now supplies the discriminative missing signals",
            "The decision gate upgrades directly to respond",
            "The consultation becomes safer without an extra forced turn"
          ],
          riskLevel: activeCase.followup.riskLevel,
          outcomeLabel: activeCase.followup.outcomeLabel,
          nextStep: activeCase.followup.nextStep,
          agent: activeCase.followup.final.agent
        };
      }
    }

    if (activeCase.id === "maize-nutrient") {
      const strong = ["Lower leaves first", "Interveinal", "Magnesium clue", "Fertilizer history"].filter(
        (item) => signals.includes(item)
      ).length;

      if (strong >= 2) {
        return {
          stage: "respond",
          confidence: Math.min(88, 68 + strong * 5),
          evidenceState: "high",
          summary:
            "The query now contains enough nutrient-pattern evidence to separate deficiency from disease.",
          imageQuality: "High image confidence",
          condition: "Updated agronomic context",
          imageBadge: "Updated field evidence",
          evidence: [
            "Lower-leaf progression is explicit",
            "Interveinal signal is now visible in the text evidence",
            "Fertilizer context points toward nutrient stress"
          ],
          missing: activeCase.followup.final.missing,
          reasoning: [
            "The new text resolves the core ambiguity",
            "The decision gate upgrades directly to respond",
            "Nutrient interpretation becomes more defensible"
          ],
          riskLevel: activeCase.followup.riskLevel,
          outcomeLabel: activeCase.followup.outcomeLabel,
          nextStep: activeCase.followup.nextStep,
          agent: activeCase.followup.final.agent
        };
      }
    }

    if (activeCase.id === "rice-bacterial") {
      const weak = normalized.includes("blurry") || normalized.includes("unclear") || normalized.includes("not sure");
      if (weak) {
        return {
          stage: "clarify",
          confidence: 49,
          evidenceState: "medium",
          summary:
            "This rice case usually supports a direct answer, but your wording now introduces uncertainty around the visible evidence.",
          imageQuality: "Medium image confidence",
          condition: "Uncertain field evidence",
          imageBadge: "Needs one more look",
          evidence: [
            "The underlying crop pattern is strong",
            "But the text introduces uncertainty about reliability",
            "The agent becomes more cautious before responding"
          ],
          missing: [
            "Confirm the tip-to-base spread pattern",
            "Confirm whether the symptom appears across multiple leaves",
            "Clarify whether the field remained waterlogged recently"
          ],
          reasoning: [
            "Input text reduces certainty despite strong baseline evidence",
            "The model shifts from fast response to clarification",
            "Safety takes priority over speed"
          ],
          riskLevel: "Cautious",
          outcomeLabel: "Clarification required",
          nextStep: "Confirm the field pattern",
          agent:
            "Before I answer confidently, can you confirm whether the drying still starts from the tip across multiple leaves and whether the field remained waterlogged after the rain?"
        };
      }
    }

    return {
      stage: activeCase.firstPass.stageLabel.toLowerCase(),
      confidence: activeCase.firstPass.confidence,
      evidenceState: activeCase.evidenceState,
      summary: activeCase.firstPass.summary,
      imageQuality: activeCase.imageQuality,
      condition: activeCase.condition,
      imageBadge: activeCase.imageLabel,
      evidence: activeCase.evidenceList,
      missing: activeCase.firstPass.missing,
      reasoning: activeCase.firstPass.reasoning,
      riskLevel: activeCase.riskLevel,
      outcomeLabel: activeCase.outcomeLabel,
      nextStep: activeCase.nextStep,
      agent: activeCase.firstPass.agent
    };
  }

  function startRun() {
    const currentText = queryInput.value.trim() || activeCase.query;
    const evaluated = evaluateCase(currentText);
    demoState = "running";
    renderWorkflow(1, 1);
    updateDecisionPill("analyzing", "Analyzing");
    pushMessages([{ role: "user", label: "Farmer input", text: currentText }]);
    renderSignalTray(collectSignals(currentText));
    setEvidenceVisual(evaluated.evidenceState, true);
    fillResults({
      confidence: 18,
      summary: "Scanning evidence and checking whether it is safe to answer now.",
      riskLevel: "Pending",
      outcomeLabel: "Evidence scan",
      nextStep: "Assess sufficiency before answering",
      missing: activeCase.firstPass.missing,
      reasoning: [
        "Multi-modal evidence is being inspected",
        "The agent is estimating information sufficiency",
        "No answer is produced before the decision gate"
      ]
    });

    window.setTimeout(() => {
      cropPreview.classList.remove("scanning");
      imageQualityTag.textContent = evaluated.imageQuality;
      conditionTag.textContent = evaluated.condition;
      imageBadge.textContent = evaluated.imageBadge;
      renderList(evidenceList, evaluated.evidence);
      setEvidenceVisual(evaluated.evidenceState);
      fillResults({
        confidence: evaluated.confidence,
        summary: evaluated.summary,
        riskLevel: evaluated.riskLevel,
        outcomeLabel: evaluated.outcomeLabel,
        nextStep: evaluated.nextStep,
        missing: evaluated.missing,
        reasoning: evaluated.reasoning
      });

      pushMessages([
        { role: "user", label: "Farmer input", text: currentText },
        { role: "agent", label: "AgriTalk-RL", text: evaluated.agent }
      ]);

      const clarifies = evaluated.stage === "clarify";
      renderWorkflow(clarifies ? 2 : 3, clarifies ? 3 : 4);
      updateDecisionPill(clarifies ? "clarify" : "respond", clarifies ? "Clarify" : "Respond");

      if (clarifies && activeCase.followup) {
        followupPrompt.textContent = activeCase.followup.prompt;
        followupBox.classList.remove("hidden");
        demoState = "awaiting-followup";
      } else {
        followupBox.classList.add("hidden");
        demoState = "complete";
      }
    }, 850);
  }

  function runFollowup() {
    if (!activeCase.followup) {
      return;
    }

    const mergedText = `${queryInput.value.trim()} ${activeCase.followup.user}`.trim();
    queryInput.value = mergedText;
    demoState = "running-followup";
    renderWorkflow(2, 3);
    updateDecisionPill("analyzing", "Re-checking");
    renderSignalTray(collectSignals(mergedText));
    setEvidenceVisual("medium", true);
    pushMessages([
      { role: "user", label: "Farmer input", text: queryInput.value.trim() || activeCase.query },
      { role: "agent", label: "AgriTalk-RL", text: evaluateCase(queryInput.value.trim() || activeCase.query).agent },
      { role: "user", label: "Extra details", text: activeCase.followup.user }
    ]);

    fillResults({
      confidence: Math.max(64, activeCase.followup.final.confidence - 10),
      summary: "The follow-up turn provides the missing signals requested by the agent.",
      riskLevel: activeCase.followup.riskLevel || "Re-evaluating",
      outcomeLabel: "Follow-up reasoning",
      nextStep: "Convert clarification into final guidance",
      missing: activeCase.followup.final.missing,
      reasoning: [
        "The clarification response is re-ingested",
        "The decision gate is evaluated again with stronger evidence",
        "A final response is prepared only after consistency improves"
      ]
    });

    window.setTimeout(() => {
      cropPreview.classList.remove("scanning");
      imageQualityTag.textContent = "High image confidence";
      conditionTag.textContent = "Updated case evidence";
      imageBadge.textContent = "Follow-up evidence";
      renderList(evidenceList, [
        "Extra case details are now attached to the consultation",
        "The model can see a stronger diagnostic pattern",
        "The evidence state upgrades after the added farmer context"
      ]);
      setEvidenceVisual("high");
      renderWorkflow(3, 4);
      updateDecisionPill("respond", activeCase.followup.final.stageLabel);
      fillResults({
        confidence: activeCase.followup.final.confidence,
        summary: activeCase.followup.final.summary,
        riskLevel: activeCase.followup.riskLevel,
        outcomeLabel: activeCase.followup.outcomeLabel,
        nextStep: activeCase.followup.nextStep,
        missing: activeCase.followup.final.missing,
        reasoning: activeCase.followup.final.reasoning
      });
      pushMessages([
        { role: "user", label: "Farmer input", text: queryInput.value.trim() || activeCase.query },
        { role: "agent", label: "AgriTalk-RL", text: activeCase.firstPass.agent },
        { role: "user", label: "Extra details", text: activeCase.followup.user },
        { role: "agent", label: "AgriTalk-RL", text: activeCase.followup.final.agent }
      ]);
      followupBox.classList.add("hidden");
      demoState = "complete";
    }, 900);
  }

  runDemoButton.addEventListener("click", () => {
    if (demoState === "running" || demoState === "running-followup") {
      return;
    }
    startRun();
  });

  followupButton.addEventListener("click", () => {
    if (demoState !== "awaiting-followup") {
      return;
    }
    runFollowup();
  });

  resetButton.addEventListener("click", () => {
    resetCase();
  });

  layoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const layout = button.dataset.layout;
      runnerBody.dataset.layout = layout;
      layoutButtons.forEach((node) => node.classList.toggle("active", node === button));
    });
  });

  queryInput.addEventListener("input", () => {
    renderSignalTray(collectSignals(queryInput.value));
  });

  resetCase();
}

document.addEventListener("mousemove", (event) => {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  document.documentElement.style.setProperty("--mouse-x", x);
  document.documentElement.style.setProperty("--mouse-y", y);
});

function setupRevealBlocks() {
  const blocks = document.querySelectorAll(".reveal-block");
  if (!blocks.length || !("IntersectionObserver" in window)) {
    blocks.forEach((block) => block.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  blocks.forEach((block) => observer.observe(block));
}

renderCaseSelection();
renderCaseRunner();
setupRevealBlocks();
