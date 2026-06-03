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

function setupLandingSplash() {
  const landingBody = document.querySelector(".landing-body");
  const enterButton = document.querySelector("#enterExperience");
  const canvas = document.querySelector("#splashCanvas");

  if (!landingBody || !enterButton || !canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const dropTexture = new Image();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const splashState = {
    dpr: 1,
    dropTextureReady: false,
    height: 0,
    revealFrame: 0,
    width: 0
  };
  let revealStarted = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const easeInCubic = (value) => value * value * value;
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
  const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

  dropTexture.onload = () => {
    splashState.dropTextureReady = true;
  };
  dropTexture.src = "./assets/dew-drop-texture.png";

  function resizeCanvas() {
    splashState.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    splashState.width = window.innerWidth;
    splashState.height = window.innerHeight;
    canvas.width = Math.round(splashState.width * splashState.dpr);
    canvas.height = Math.round(splashState.height * splashState.dpr);
    canvas.style.width = `${splashState.width}px`;
    canvas.style.height = `${splashState.height}px`;
    ctx.setTransform(splashState.dpr, 0, 0, splashState.dpr, 0, 0);
  }

  function impactPoint() {
    return {
      x: splashState.width * 0.52,
      y: splashState.height * 0.54
    };
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, splashState.width, splashState.height);
  }

  function drawAmbientSurface(seconds, alpha = 1) {
    const { x, y } = impactPoint();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 4; i += 1) {
      const radius = 118 + i * 62 + Math.sin(seconds * 0.45 + i) * 8;
      const opacity = alpha * (0.018 - i * 0.0025);
      ctx.beginPath();
      ctx.ellipse(
        x,
        y + 16 + i * 3,
        radius,
        radius * 0.28,
        Math.sin(seconds * 0.14) * 0.08,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `rgba(230, 249, 255, ${opacity})`;
      ctx.lineWidth = 0.8;
      ctx.shadowColor = "rgba(200, 235, 246, 0.2)";
      ctx.shadowBlur = 14;
      ctx.stroke();
    }

    const glow = ctx.createRadialGradient(x, y, 12, x, y, Math.min(splashState.width, 900) * 0.36);
    glow.addColorStop(0, `rgba(223, 246, 255, ${0.07 * alpha})`);
    glow.addColorStop(0.36, `rgba(178, 226, 235, ${0.035 * alpha})`);
    glow.addColorStop(1, "rgba(178, 226, 235, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, splashState.width, splashState.height);
    ctx.restore();
  }

  function drawDropPath(size) {
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.32);
    ctx.bezierCurveTo(size * 0.62, -size * 0.62, size * 0.9, size * 0.18, size * 0.42, size * 0.82);
    ctx.bezierCurveTo(size * 0.2, size * 1.1, -size * 0.2, size * 1.1, -size * 0.42, size * 0.82);
    ctx.bezierCurveTo(-size * 0.9, size * 0.18, -size * 0.62, -size * 0.62, 0, -size * 1.32);
    ctx.closePath();
  }

  function drawWaterDrop(x, y, size, progress) {
    const impactEase = clamp((progress - 0.74) / 0.26, 0, 1);
    const squash = easeOutCubic(impactEase);
    const stretch = 1 + (1 - squash) * 0.34;
    const widthScale = 1 - squash * 0.34;
    const opacity = clamp((1 - impactEase * 1.3), 0, 1);
    const rotation = -0.13 + progress * 0.2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(widthScale, stretch);
    ctx.globalAlpha = opacity;

    const sizeShadow = size * (1 + progress * 0.24);
    ctx.save();
    ctx.scale(1.2, 0.22);
    const shadow = ctx.createRadialGradient(0, size * 2.2, 4, 0, size * 2.2, sizeShadow * 1.85);
    shadow.addColorStop(0, "rgba(0, 12, 18, 0.24)");
    shadow.addColorStop(1, "rgba(0, 12, 18, 0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.arc(0, size * 2.2, sizeShadow * 1.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawDropPath(size);
    const bodyGradient = ctx.createRadialGradient(-size * 0.32, -size * 0.72, size * 0.08, size * 0.14, size * 0.02, size * 1.34);
    bodyGradient.addColorStop(0, "rgba(255, 255, 255, 0.98)");
    bodyGradient.addColorStop(0.18, "rgba(221, 245, 252, 0.82)");
    bodyGradient.addColorStop(0.48, "rgba(133, 198, 217, 0.44)");
    bodyGradient.addColorStop(0.74, "rgba(35, 82, 96, 0.28)");
    bodyGradient.addColorStop(1, "rgba(14, 36, 44, 0.02)");
    ctx.fillStyle = bodyGradient;
    ctx.shadowColor = "rgba(203, 238, 248, 0.26)";
    ctx.shadowBlur = size * 0.85;
    ctx.fill();

    ctx.save();
    drawDropPath(size);
    ctx.clip();

    ctx.globalCompositeOperation = "screen";
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
    ctx.lineWidth = Math.max(1.2, size * 0.06);
    ctx.beginPath();
    ctx.moveTo(-size * 0.28, -size * 0.92);
    ctx.bezierCurveTo(-size * 0.28, -size * 0.92, -size * 0.55, -size * 0.2, -size * 0.18, size * 0.45);
    ctx.stroke();

    ctx.strokeStyle = "rgba(232, 249, 255, 0.2)";
    ctx.lineWidth = Math.max(0.6, size * 0.026);
    for (let i = 0; i < 4; i += 1) {
      const offset = -size * 0.32 + i * size * 0.16;
      ctx.beginPath();
      ctx.moveTo(offset, -size * 0.42 + i * 0.9);
      ctx.bezierCurveTo(
        offset,
        -size * 0.42 + i * 0.8,
        offset + size * (0.16 + i * 0.02),
        -size * 0.1,
        offset + size * 0.02,
        size * (0.34 + i * 0.03)
      );
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(247, 253, 255, 0.34)";
    ctx.lineWidth = Math.max(0.9, size * 0.032);
    ctx.beginPath();
    ctx.moveTo(size * 0.18, -size * 0.78);
    ctx.bezierCurveTo(size * 0.58, -size * 0.18, size * 0.5, size * 0.42, size * 0.16, size * 0.82);
    ctx.stroke();

    const highlight = ctx.createRadialGradient(-size * 0.34, -size * 0.68, 1, -size * 0.34, -size * 0.68, size * 0.34);
    highlight.addColorStop(0, "rgba(255, 255, 255, 0.92)");
    highlight.addColorStop(0.34, "rgba(255, 255, 255, 0.44)");
    highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = highlight;
    ctx.beginPath();
    ctx.ellipse(-size * 0.34, -size * 0.68, size * 0.19, size * 0.31, -0.42, 0, Math.PI * 2);
    ctx.fill();

    const lowerLens = ctx.createRadialGradient(size * 0.08, size * 0.54, size * 0.02, size * 0.08, size * 0.54, size * 0.68);
    lowerLens.addColorStop(0, "rgba(219, 248, 255, 0.22)");
    lowerLens.addColorStop(0.48, "rgba(100, 174, 196, 0.2)");
    lowerLens.addColorStop(1, "rgba(5, 30, 39, 0)");
    ctx.fillStyle = lowerLens;
    ctx.beginPath();
    ctx.ellipse(size * 0.08, size * 0.54, size * 0.62, size * 0.36, -0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "multiply";
    const lowerShade = ctx.createLinearGradient(0, -size, 0, size * 1.1);
    lowerShade.addColorStop(0, "rgba(0, 0, 0, 0)");
    lowerShade.addColorStop(0.7, "rgba(8, 38, 48, 0.12)");
    lowerShade.addColorStop(1, "rgba(7, 24, 31, 0.25)");
    ctx.fillStyle = lowerShade;
    ctx.fillRect(-size, -size * 1.4, size * 2, size * 2.6);
    ctx.restore();

    ctx.restore();
  }

  function drawTexturedWaterDrop(x, y, size, progress) {
    if (!splashState.dropTextureReady) {
      drawWaterDrop(x, y, size, progress);
      return;
    }

    const impactEase = clamp((progress - 0.75) / 0.25, 0, 1);
    const squash = easeOutCubic(impactEase);
    const stretch = 1 + (1 - squash) * 0.16;
    const widthScale = 1 - squash * 0.26;
    const opacity = clamp(1 - impactEase * 1.42, 0, 1);
    const rotation = -0.09 + progress * 0.16;
    const targetHeight = size * 3.05;
    const targetWidth = targetHeight * (dropTexture.naturalWidth / dropTexture.naturalHeight);
    const shadowRadius = size * (1.28 + progress * 0.48);

    ctx.save();
    ctx.translate(x, y);

    ctx.save();
    ctx.globalAlpha = opacity * 0.42;
    ctx.scale(1.05, 0.2);
    const shadow = ctx.createRadialGradient(0, targetHeight * 0.58, 4, 0, targetHeight * 0.58, shadowRadius * 2.15);
    shadow.addColorStop(0, "rgba(0, 13, 18, 0.34)");
    shadow.addColorStop(1, "rgba(0, 13, 18, 0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.arc(0, targetHeight * 0.58, shadowRadius * 2.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.rotate(rotation);
    ctx.scale(widthScale, stretch);
    ctx.globalAlpha = opacity;
    ctx.filter = "contrast(1.08) saturate(1.08)";
    ctx.drawImage(dropTexture, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
    ctx.filter = "none";

    ctx.restore();
  }

  function drawRippleBand(cx, cy, radius, yScale, alpha, lineWidth, phase, frequency) {
    const steps = 180;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let pass = 0; pass < 2; pass += 1) {
      ctx.beginPath();
      for (let i = 0; i <= steps; i += 1) {
        const angle = (Math.PI * 2 * i) / steps;
        const wave =
          Math.sin(angle * frequency + phase) * 0.045 +
          Math.sin(angle * (frequency * 1.8) - phase * 0.72) * 0.018 +
          Math.cos(angle * 3 - phase * 0.4) * 0.012;
        const localRadius = radius * (1 + wave);
        const x = cx + Math.cos(angle) * localRadius;
        const y = cy + Math.sin(angle) * localRadius * yScale + Math.sin(angle * 5 + phase) * 1.6;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.globalCompositeOperation = pass === 0 ? "multiply" : "screen";
      ctx.strokeStyle =
        pass === 0
          ? `rgba(2, 20, 22, ${alpha * 0.2})`
          : `rgba(231, 250, 255, ${alpha})`;
      ctx.lineWidth = pass === 0 ? lineWidth * 1.15 : lineWidth;
      ctx.shadowColor = `rgba(205, 240, 249, ${alpha * 0.45})`;
      ctx.shadowBlur = pass === 0 ? 0 : 10;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawCaustics(cx, cy, age, strength) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.lineCap = "round";

    for (let i = 0; i < 18; i += 1) {
      const seed = i * 12.989;
      const angle = seed + age * (0.9 + (i % 4) * 0.12);
      const radius = 28 + i * 12 + age * 54;
      const yScale = 0.34 + (i % 3) * 0.012;
      const startX = cx + Math.cos(angle) * radius;
      const startY = cy + Math.sin(angle) * radius * yScale;
      const bendX = cx + Math.cos(angle + 0.22) * (radius + 24);
      const bendY = cy + Math.sin(angle + 0.22) * (radius + 24) * yScale;
      const endX = cx + Math.cos(angle + 0.46) * (radius + 44);
      const endY = cy + Math.sin(angle + 0.46) * (radius + 44) * yScale;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(bendX, bendY, endX, endY);
      ctx.strokeStyle = `rgba(238, 252, 255, ${strength * (0.16 + (i % 5) * 0.018)})`;
      ctx.lineWidth = 0.8 + (i % 4) * 0.28;
      ctx.shadowColor = `rgba(207, 239, 248, ${strength * 0.35})`;
      ctx.shadowBlur = 12;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawRippleHighlights(cx, cy, radius, age, strength) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.lineCap = "round";

    for (let i = 0; i < 14; i += 1) {
      const angle = i * 1.37 + age * 0.42;
      const span = 0.18 + (i % 5) * 0.028;
      const localRadius = radius * (0.72 + (i % 4) * 0.13);
      const yScale = 0.32 + (i % 3) * 0.018;
      const startAngle = angle - span;
      const midAngle = angle;
      const endAngle = angle + span * 1.5;
      const startX = cx + Math.cos(startAngle) * localRadius;
      const startY = cy + Math.sin(startAngle) * localRadius * yScale;
      const midX = cx + Math.cos(midAngle) * (localRadius + 10 + i);
      const midY = cy + Math.sin(midAngle) * (localRadius + 10 + i) * yScale;
      const endX = cx + Math.cos(endAngle) * (localRadius + 18);
      const endY = cy + Math.sin(endAngle) * (localRadius + 18) * yScale;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(midX, midY, endX, endY);
      ctx.strokeStyle = `rgba(234, 250, 255, ${strength * (0.12 + (i % 3) * 0.035)})`;
      ctx.lineWidth = 0.65 + (i % 4) * 0.18;
      ctx.shadowColor = `rgba(211, 242, 249, ${strength * 0.22})`;
      ctx.shadowBlur = 8;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawMist(cx, cy, age, alpha) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 30; i += 1) {
      const seed = Math.sin(i * 91.7) * 43758.5453;
      const random = seed - Math.floor(seed);
      const angle = i * 2.399 + random;
      const travel = easeOutQuart(clamp(age / 1.4 - random * 0.12, 0, 1));
      const distance = 18 + travel * (36 + random * 86);
      const x = cx + Math.cos(angle) * distance;
      const y = cy + Math.sin(angle) * distance * 0.3 - travel * (10 + random * 30);
      const size = 0.7 + random * 2.4;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230, 248, 255, ${alpha * (1 - travel) * (0.38 + random * 0.34)})`;
      ctx.shadowColor = `rgba(220, 244, 255, ${alpha * 0.34})`;
      ctx.shadowBlur = 8;
      ctx.fill();
    }
    ctx.restore();
  }

  function drawImpact(cx, cy, age) {
    const normalized = clamp(age / 2.3, 0, 1);
    const fade = Math.pow(1 - normalized, 1.7);
    const radiusBase = 32 + easeOutQuart(normalized) * Math.min(410, splashState.width * 0.36);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, radiusBase * 0.72);
    bloom.addColorStop(0, `rgba(231, 249, 255, ${0.24 * fade})`);
    bloom.addColorStop(0.22, `rgba(183, 229, 240, ${0.12 * fade})`);
    bloom.addColorStop(1, "rgba(183, 229, 240, 0)");
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, splashState.width, splashState.height);
    ctx.restore();

    drawRippleBand(cx, cy, radiusBase, 0.34, 0.34 * fade, 1.45 + normalized * 0.75, age * 5.5, 7);
    drawRippleBand(cx, cy, radiusBase * 0.72, 0.32, 0.22 * fade, 0.95 + normalized * 0.65, age * 4.2 + 1.6, 10);
    drawRippleBand(cx, cy, radiusBase * 1.18, 0.36, 0.14 * fade, 0.85, age * 3.8 - 0.6, 13);
    drawRippleHighlights(cx, cy, radiusBase, age, fade);
    drawCaustics(cx, cy, age, fade);
    drawMist(cx, cy, age, fade);
  }

  function drawIdleSurface(timestamp = performance.now()) {
    clearCanvas();
    drawAmbientSurface(timestamp / 1000, 0.82);
  }

  function drawRevealFrame(startTime, timestamp) {
    const elapsed = (timestamp - startTime) / 1000;
    const { x, y } = impactPoint();
    const travel = clamp(elapsed / 1.24, 0, 1);
    const dropEase = easeInCubic(travel);
    const startY = y - Math.min(440, splashState.height * 0.58);
    const dropY = startY + (y - startY) * dropEase;
    const dropSize = Math.max(34, Math.min(50, splashState.width * 0.032));

    clearCanvas();
    drawAmbientSurface(timestamp / 1000, 1);

    if (elapsed < 1.36) {
      drawTexturedWaterDrop(x, dropY, dropSize, travel);
    }

    if (elapsed > 1.05) {
      drawImpact(x, y, elapsed - 1.05);
    }

    if (elapsed < 3.65) {
      splashState.revealFrame = window.requestAnimationFrame((next) => drawRevealFrame(startTime, next));
    } else {
      clearCanvas();
    }
  }

  resizeCanvas();
  drawIdleSurface();
  window.addEventListener("resize", () => {
    resizeCanvas();
    if (!revealStarted) {
      drawIdleSurface();
    }
  });

  const startReveal = () => {
    if (revealStarted) {
      return;
    }

    revealStarted = true;

    if (reducedMotion) {
      landingBody.classList.add("landing-reveal", "landing-complete");
      landingBody.classList.remove("landing-prelude");
      clearCanvas();
      return;
    }

    landingBody.classList.add("landing-reveal");
    splashState.revealFrame = window.requestAnimationFrame((timestamp) => drawRevealFrame(timestamp, timestamp));

    window.setTimeout(() => {
      landingBody.classList.add("landing-complete");
      landingBody.classList.remove("landing-prelude");
      window.cancelAnimationFrame(splashState.revealFrame);
      clearCanvas();
    }, 3900);
  };

  enterButton.addEventListener("click", startReveal);
}

renderCaseSelection();
renderCaseRunner();
setupRevealBlocks();
setupLandingSplash();
