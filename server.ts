import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Shared Gemini AI Client with User-Agent telemetry
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      console.warn("GEMINI_API_KEY is not defined. Falling back to structured simulation.");
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Status endpoint to check if Gemini API key is configured
app.get("/api/status", (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  const isConfigured = !!key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "";
  res.json({ isGeminiConfigured: isConfigured });
});

// 1. ATS Candidate Evaluation Route
app.post("/api/ats/evaluate", async (req, res) => {
  const { resumeText, jobTitle } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: "Resume text is required" });
  }

  const title = jobTitle || "General Role";

  try {
    const ai = getGeminiClient();
    const prompt = `Evaluate the following candidate's resume for the position of "${title}". Extract key details, assess skill alignment, and provide a rating and customized interview questions.
Resume Text:
${resumeText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert HR recruiter and technical applicant assessor. Evaluate the provided candidate details carefully and objective. Return structured details in JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["candidateName", "extractedSkills", "experienceSummary", "education", "score", "justification", "interviewQuestions"],
          properties: {
            candidateName: { type: Type.STRING, description: "Name of the candidate" },
            extractedSkills: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Top 5-8 professional or technical skills extracted"
            },
            experienceSummary: { type: Type.STRING, description: "One-sentence summary of candidate work experience" },
            education: { type: Type.STRING, description: "Highest academic degree or education listed" },
            score: { 
              type: Type.INTEGER, 
              description: "A suitability fit score from 0 to 100 based on their resume relative to the job title"
            },
            justification: { type: Type.STRING, description: "A highly tailored paragraph justifying the score, highlighting key strengths and possible weaknesses" },
            interviewQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 custom targeted interview questions to ask this candidate based on their background"
            }
          }
        }
      }
    });

    const jsonText = response.text?.trim() || "{}";
    const result = JSON.parse(jsonText);
    return res.json({ success: true, evaluation: result });

  } catch (err: any) {
    console.error("Gemini ATS evaluation error:", err);

    // Fallback Mock System if NVK key is missing or errors occur
    if (err.message === "GEMINI_API_KEY_MISSING" || !process.env.GEMINI_API_KEY) {
      const mockResult = generateMockEvaluation(resumeText, title);
      return res.json({ 
        success: true, 
        evaluation: mockResult, 
        warning: "Operating in simulated offline mode. Set GEMINI_API_KEY in Secrets panel to connect to live NVK core engine." 
      });
    }

    return res.status(500).json({ error: "Failed to evaluate resume", details: err.message });
  }
});

// Helper for generating premium mock evaluation on fallback
function generateMockEvaluation(text: string, title: string) {
  // Try to find a name from first few words
  const cleanText = text.replace(/[\n\r\t]+/g, " ");
  const firstWords = cleanText.split(" ").slice(0, 4).join(" ");
  const mockName = firstWords.match(/[A-Z][a-z]+ [A-Z][a-z]+/g)?.[0] || "Jane Doe";

  const hasReact = /react/i.test(text);
  const hasLogistics = /logist|ship|ware/i.test(text);
  const hasManager = /manag|lead/i.test(text);

  let skills = ["Project Management", "Communication", "Problem Solving", "Strategic Planning"];
  let score = 75;
  let justification = `The candidate demonstrates strong foundations suitable for the ${title} position. Their resume showcases key administrative competence and execution experience.`;

  if (hasReact) {
    skills = ["React.js", "TypeScript", "Tailwind CSS", "REST APIs", "Modern Web Development"];
    score = 88;
    justification = `Outstanding fit for modern technology stacks. Extensive experience in building high-fidelity user interfaces, front-end optimization, and state-driven modules perfectly aligning with the ${title} role.`;
  } else if (hasLogistics) {
    skills = ["Fleet Operations", "Route Scheduling", "Inventory Optimization", "Logistics Co-ordination"];
    score = 92;
    justification = `Exceptional domain-specific expertise in warehouse and logistics networks. Proven history of reducing dispatch delay, optimizing driver turnarounds, and utilizing enterprise WMS platforms for the ${title} role.`;
  } else if (hasManager) {
    skills = ["Operational Leadership", "Team Building", "Budget Allocation", "Milestone Tracking"];
    score = 85;
    justification = `Highly robust manager profile with an established record of leading cross-functional squads, standardizing corporate workflows, and reporting key KPIs directly to corporate stakeholders.`;
  }

  return {
    candidateName: mockName,
    extractedSkills: skills,
    experienceSummary: `Demonstrates over 5 years of active professional tenure focusing on operational execution and technical alignment.`,
    education: "Bachelor of Science in Business Operations & Analytics",
    score,
    justification,
    interviewQuestions: [
      `How do you maintain accurate state synchronization across large-scale distributed schedules?`,
      `Describe a high-pressure situation where a routing discrepancy or timeline conflict occurred, and how you resolved it.`,
      `How would you drive the adoption of new modular software tools among team members accustomed to legacy paper logs?`
    ]
  };
}


// 2. Interactive Business Strategy & Plan Generator
app.post("/api/strategy/generate", async (req, res) => {
  const { industry, companySize, selectedModules, pricingTier, pricingModel, customNotes } = req.body;

  try {
    const ai = getGeminiClient();
    const modulesStr = (selectedModules || []).join(", ");
    const prompt = `Based on the following company profile and target suite setup, generate a highly comprehensive, customized Business Plan and Sales Strategy for proposing the "NVK GLOBAL Enterprise Operations Platform":
- Target Company Industry: ${industry || "General Enterprise"}
- Target Company Employee Size: ${companySize || 100} employees
- Chosen Platform Modules: ${modulesStr}
- Assigned Pricing Tier: ${pricingTier || "Professional"} ($${pricingTier === "Starter" ? "99" : pricingTier === "Professional" ? "299" : "Custom"}/mo baseline)
- Assigned Pricing Architecture: ${pricingModel || "Modular Subscription"}
- Strategic Custom Notes: ${customNotes || "None"}

Please structure the output as JSON with the specified parts to build an incredibly compelling pitch presentation and deployment schedule.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a senior Enterprise Solutions Architect and SaaS growth strategist. You specialize in demonstrating high-impact business cases and technical ROI of software migrations. Keep your tone professional, authoritative, and scannable. Output must be valid JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["executiveSummary", "valueProposition", "rolloutPhases", "growthMetrics", "objectionHandling"],
          properties: {
            executiveSummary: { type: Type.STRING, description: "A compelling executive summary pitch tailored specifically to this industry and company size" },
            valueProposition: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-4 laser-focused core value propositions proving exactly why this company needs the selected modules"
            },
            rolloutPhases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["phaseName", "timeframe", "keyMilestones"],
                properties: {
                  phaseName: { type: Type.STRING, description: "Name of the rollout phase" },
                  timeframe: { type: Type.STRING, description: "Estimated schedule (e.g. Weeks 1-4)" },
                  keyMilestones: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 key tactical milestones for this phase"
                  }
                }
              },
              description: "A 3-step timeline demonstrating frictionless onboarding"
            },
            growthMetrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["metricName", "targetKPI"],
                properties: {
                  metricName: { type: Type.STRING },
                  targetKPI: { type: Type.STRING, description: "Estimated target impact improvement (e.g., 'Reduce hiring cycle by 35%')" }
                }
              },
              description: "Top 3 operational business KPIs to track post-launch"
            },
            objectionHandling: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["objection", "rebuttal"],
                properties: {
                  objection: { type: Type.STRING, description: "A likely executive objection for this industry" },
                  rebuttal: { type: Type.STRING, description: "The strategic, data-backed counter-pitch response" }
                }
              }
            }
          }
        }
      }
    });

    const jsonText = response.text?.trim() || "{}";
    const result = JSON.parse(jsonText);
    return res.json({ success: true, strategy: result });

  } catch (err: any) {
    console.error("Gemini strategy generation error:", err);

    if (err.message === "GEMINI_API_KEY_MISSING" || !process.env.GEMINI_API_KEY) {
      const mockResult = generateMockStrategy(industry, selectedModules, pricingTier, pricingModel);
      return res.json({ 
        success: true, 
        strategy: mockResult, 
        warning: "Operating in simulated offline mode. Set GEMINI_API_KEY in Secrets panel to connect to live NVK core engine." 
      });
    }

    return res.status(500).json({ error: "Failed to generate business strategy", details: err.message });
  }
});

function generateMockStrategy(ind: string, mods: string[], tier: string, model: string) {
  const cleanInd = ind || "E-Commerce & Logistics";
  const finalMods = mods && mods.length ? mods : ["Core HR", "Recruitment & ATS"];

  return {
    executiveSummary: `NVK GLOBAL provides a single, high-efficiency, fully unified operational engine for your ${cleanInd} enterprise. By bridging the critical gap between employee oversight and physical supply chain logistics, we eliminate standard 20-30% data-sync leaks. Under the custom ${tier} model, your organization gains enterprise stability without subscription over-fatigue, accelerating cross-department synergy and driving substantial operational excellence.`,
    valueProposition: [
      `Unified single source of truth eliminates the average 15 hours wasted per employee monthly on manual spreadsheet reconciliations.`,
      `Integrated ATS and onboarding workflows automate candidate tracking, compressing total average Time-To-Hire from 38 days down to 14.`,
      `Real-time visibility metrics provide instant dashboards that eliminate inventory shrinkage and prevent driver dispatch delay.`
    ],
    rolloutPhases: [
      {
        phaseName: "Core Data & HR Baseline",
        timeframe: "Weeks 1 - 2",
        keyMilestones: [
          "Import current active employee records from legacy spreadsheets",
          "Set up custom PTO policies, calendar syncing, and self-service portals",
          "Establish admin access control levels for executive leadership"
        ]
      },
      {
        phaseName: "Process Automation & Integration",
        timeframe: "Weeks 3 - 4",
        keyMilestones: [
          "Configure live Applicant Tracking pipelines and custom job board postings",
          "Connect active carriers and setup shipping label generation rules",
          "Input existing inventory SKU layouts and bin slot designations"
        ]
      },
      {
        phaseName: "Full Dispatch Launch & Training",
        timeframe: "Weeks 5 - 6",
        keyMilestones: [
          "Conduct interactive user walkthroughs for dispatcher and warehouse staff",
          "Test live route planning optimizations and dispatch simulation",
          "Go live and begin real-time operational dashboard monitoring"
        ]
      }
    ],
    growthMetrics: [
      { metricName: "Average Time-to-Hire", targetKPI: "Reduce by 40% using automated candidate screening" },
      { metricName: "Carrier Delivery On-Time Rate", targetKPI: "Increase to 98.7% with intelligent driver route matching" },
      { metricName: "Operational Overhead Hours", targetKPI: "Cut administrative desk tasks by 25 hours per week" }
    ],
    objectionHandling: [
      {
        objection: `Our staff is comfortable with Excel; migrating our complete staff files and routing logs feels high-friction.`,
        rebuttal: `NVK GLOBAL features a fully guided drag-and-drop CSV importer and self-service onboarding. Most organizations achieve 100% platform autonomy in under 7 days with zero custom coding required.`
      },
      {
        objection: `We operate on tight margins; adding another recurring platform cost may stress our current cash flow.`,
        rebuttal: `NVK GLOBAL is proven to recoup its baseline monthly fee in under 48 hours of operation by resolving payroll sync errors, carrier rate over-charges, and inventory counting discrepancies.`
      }
    ]
  };
}


// 3. AI-Assisted TMS Route Optimization Route
app.post("/api/tms/optimize", async (req, res) => {
  const { shipments, drivers } = req.body;

  if (!shipments || !drivers) {
    return res.status(400).json({ error: "Shipments and Drivers list are required" });
  }

  try {
    const ai = getGeminiClient();
    const prompt = `We need to optimize delivery routing and load building for our transportation network.
Pending Shipments: ${JSON.stringify(shipments)}
Available Drivers & Fleets: ${JSON.stringify(drivers)}

Recommend the most efficient pairings of shipments to drivers, including optimal route sequence and leg justifications. Return the results in structured JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an AI Logistics Dispatcher and Fleet Routing Coordinator. Your goal is to maximize vehicle volume utilization, minimize empty backhaul miles, and respect driver location/limits. Keep outputs highly precise. Return valid JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["assignments", "routingEfficiencyIndex", "dispatchSummaryNotes"],
          properties: {
            assignments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["driverId", "driverName", "assignedShipments", "optimizedRouteSequence", "reasonForAssignment"],
                properties: {
                  driverId: { type: Type.STRING },
                  driverName: { type: Type.STRING },
                  assignedShipments: { type: Type.ARRAY, items: { type: Type.STRING }, description: "IDs of assigned shipments" },
                  optimizedRouteSequence: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Sequence of delivery stops (e.g. ['Warehouse', 'New York Store', 'Boston Retail'])" },
                  reasonForAssignment: { type: Type.STRING, description: "Explanation of why this driver was paired with these shipment loads (weight limit, route proximity, efficiency)" }
                }
              }
            },
            routingEfficiencyIndex: { type: Type.INTEGER, description: "A score from 0 to 100 showing how much we minimized total distance/time compared to default scheduling" },
            dispatchSummaryNotes: { type: Type.STRING, description: "Operational remarks for the yard master" }
          }
        }
      }
    });

    const jsonText = response.text?.trim() || "{}";
    const result = JSON.parse(jsonText);
    return res.json({ success: true, optimized: result });

  } catch (err: any) {
    console.error("Gemini Route optimization error:", err);

    if (err.message === "GEMINI_API_KEY_MISSING" || !process.env.GEMINI_API_KEY) {
      // Return high quality simulated optimization if NVK isn't available
      const mockResult = generateMockOptimization(shipments, drivers);
      return res.json({ 
        success: true, 
        optimized: mockResult, 
        warning: "Operating in simulated offline mode. Set GEMINI_API_KEY in Secrets panel to connect to live NVK core engine." 
      });
    }

    return res.status(500).json({ error: "Failed to optimize routes", details: err.message });
  }
});

function generateMockOptimization(shipments: any[], drivers: any[]) {
  // Simple heuristic pairing for fallback simulation
  const assignments = drivers.map((driver, index) => {
    // Pick shipments based on index modulo
    const assigned = shipments.filter((_, sIdx) => sIdx % drivers.length === index);
    const assignedIds = assigned.map(s => s.id);
    const stops = ["Warehouse Root"];
    assigned.forEach(s => {
      stops.push(s.destination);
    });
    stops.push("Fleet Terminal Hub");

    return {
      driverId: driver.id,
      driverName: driver.name,
      assignedShipments: assignedIds,
      optimizedRouteSequence: stops,
      reasonForAssignment: `Assigned based on driver availability, geographical sector familiarity, and optimal cargo volume compliance (${driver.vehicle} capability matches cargo density).`
    };
  });

  return {
    assignments,
    routingEfficiencyIndex: 89,
    dispatchSummaryNotes: "AI Route Optimizer achieved an estimated 18% savings in fuel and reduced transit turnaround by matching driver sectors with payload weights."
  };
}


// 4. AI Financial Auditor, Policy Guard & Ledger Planner Route
app.post("/api/finance/audit", async (req, res) => {
  const { expenses, payroll, apInvoices, arInvoices } = req.body;

  try {
    const ai = getGeminiClient();
    const prompt = `Perform an enterprise-level financial audit, policy check, and cash forecast based on our current operational records:
Expenses: ${JSON.stringify(expenses || [])}
Payroll: ${JSON.stringify(payroll || [])}
Accounts Payable (AP): ${JSON.stringify(apInvoices || [])}
Accounts Receivable (AR): ${JSON.stringify(arInvoices || [])}

Analyze the records to identify compliance flags (policy violations, 3-way match failures), calculate a risk score (0-100 where 0 is pristine and 100 is critical risk), estimate potential cost savings, write specific remediation action steps for each anomaly, provide tax optimization insights, and construct a 4-month dynamic cash flow projection.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an Elite Enterprise CFO, Certified Public Accountant (CPA), and Corporate Financial Auditor. You analyze out-of-pocket spending, employee compensation structures, vendor match states, and outstanding balances to optimize treasury cash and guard policy compliance. Always return a perfectly structured JSON object.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["riskScore", "potentialSavings", "anomalies", "taxOptimizationTips", "budgetForecast"],
          properties: {
            riskScore: { 
              type: Type.INTEGER, 
              description: "Overall corporate risk score from 0 (pristine) to 100 (extreme risk, high anomalies or severe aging)" 
            },
            potentialSavings: { 
              type: Type.NUMBER, 
              description: "Estimated total potential savings in USD from resolving errors, early payment discounts, or preventing compliance leaks" 
            },
            anomalies: {
              type: Type.ARRAY,
              description: "List of flagged transactions, policy violations, or aging liabilities",
              items: {
                type: Type.OBJECT,
                required: ["id", "source", "description", "severity", "remedy"],
                properties: {
                  id: { type: Type.STRING, description: "ID of the related record (e.g. EXP-703 or API-902)" },
                  source: { 
                    type: Type.STRING, 
                    enum: ["Expense", "Payroll", "Payable", "Receivable"], 
                    description: "Category of financial leak" 
                  },
                  description: { type: Type.STRING, description: "Detailed accounting issue description" },
                  severity: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  remedy: { type: Type.STRING, description: "Specific strategic action step to cure this discrepancy" }
                }
              }
            },
            taxOptimizationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly specific tax write-off, depreciation, or structural credit optimizations based on this ledger"
            },
            budgetForecast: {
              type: Type.ARRAY,
              description: "4-month rolling forecast showing inflow collections and outflow settlements starting with active ledger status",
              items: {
                type: Type.OBJECT,
                required: ["month", "projectedInflow", "projectedOutflow", "projectedBalance"],
                properties: {
                  month: { type: Type.STRING, description: "e.g., 'July 2026'" },
                  projectedInflow: { type: Type.NUMBER, description: "Estimated accounts receivable collections + seasonal adjustments" },
                  projectedOutflow: { type: Type.NUMBER, description: "Estimated accounts payable settlements + payroll + operating expense" },
                  projectedBalance: { type: Type.NUMBER, description: "Projected closing cash balance (cumulative starting from $45,000 baseline)" }
                }
              }
            }
          }
        }
      }
    });

    const jsonText = response.text?.trim() || "{}";
    const result = JSON.parse(jsonText);
    return res.json({ success: true, audit: result });

  } catch (err: any) {
    console.error("Gemini financial audit error:", err);

    if (err.message === "GEMINI_API_KEY_MISSING" || !process.env.GEMINI_API_KEY) {
      const mockResult = generateMockFinanceAudit(expenses, apInvoices, arInvoices);
      return res.json({
        success: true,
        audit: mockResult,
        warning: "Operating in simulated offline mode. Set GEMINI_API_KEY in Secrets panel to connect to live NVK core engine."
      });
    }

    return res.status(500).json({ error: "Failed to run financial audit", details: err.message });
  }
});

function generateMockFinanceAudit(expenses: any[], apInvoices: any[], arInvoices: any[]) {
  const anomalies = [];
  let potentialSavings = 0;
  let riskScore = 15;

  // Search active records for issues
  const mealViolation = (expenses || []).find(e => e.id === "EXP-703" || e.policyFlagged);
  if (mealViolation) {
    anomalies.push({
      id: mealViolation.id || "EXP-703",
      source: "Expense",
      description: `Excessive meals claim at merchant "${mealViolation.merchant || "Fleming's Steakhouse"}" for $${mealViolation.amount || 185}. Exceeds standard $75 corporate daily cap.`,
      severity: "Medium",
      remedy: "Request partial employee co-pay or auto-deduct the $110 overage from their upcoming payroll reimbursement check."
    });
    potentialSavings += 110;
    riskScore += 10;
  }

  const apMismatch = (apInvoices || []).find(a => a.id === "API-902" || a.threeWayMatch === "Mismatch");
  if (apMismatch) {
    anomalies.push({
      id: apMismatch.id || "API-902",
      source: "Payable",
      description: `Classic 3-way match mismatch for vendor "${apMismatch.vendorName || "Thermal Label Kings"}". Invoice requests $${apMismatch.amount || 980} for 1,500 rolls, but Warehouse Receiving Slip REC-1125 records only 850 rolls accepted.`,
      severity: "High",
      remedy: "Contact supplier billing department to dispute charge. Hold invoice execution until a corrected credit memo of -$424.67 is formally received."
    });
    potentialSavings += 424.67;
    riskScore += 25;
  }

  const arOverdue = (arInvoices || []).find(a => a.status === "Overdue");
  if (arOverdue) {
    anomalies.push({
      id: arOverdue.id || "ARI-102",
      source: "Receivable",
      description: `Outstanding collection leak: customer "${arOverdue.customerName || "Detroit Freight Hub"}" is overdue on invoice for $${arOverdue.amount || 18400}. Currently 3 days past due limit.`,
      severity: "High",
      remedy: "Trigger Phase-1 automated polite collections reminder system (email/SMS sequence). Block future shipping dispatches from Logistics TMS until status is resolved."
    });
    potentialSavings += 184; // assume late fee recoveries
    riskScore += 15;
  }

  if (anomalies.length === 0) {
    anomalies.push({
      id: "GL-HEALTHY",
      source: "Expense",
      description: "No immediate policy violations or transactional leaks detected. Operating at high standard compliance.",
      severity: "Low",
      remedy: "Maintain quarterly audits and reinforce corporate threshold limits."
    });
  }

  return {
    riskScore: Math.min(riskScore, 100),
    potentialSavings: Number(potentialSavings.toFixed(2)) || 150.00,
    anomalies,
    taxOptimizationTips: [
      "Accelerate Section 179 depreciation deductions on newly acquired warehouse cargo equipment (e.g., Apple hardware and logistic terminals) to write off 100% in Year 1.",
      "Leverage the early-payment 2/10 Net 30 terms offered by PackCo Logistics and Global Pallet. This creates an annualized return on cash equivalent to ~36%.",
      "Qualify for international contract payroll write-offs by filing Form 8802 to request US residency certification and avoid double-taxation on overseas logistics hires."
    ],
    budgetForecast: [
      { month: "July 2026", projectedInflow: 18700, projectedOutflow: 13200, projectedBalance: 50500 },
      { month: "August 2026", projectedInflow: 24500, projectedOutflow: 14800, projectedBalance: 60200 },
      { month: "September 2026", projectedInflow: 29000, projectedOutflow: 15500, projectedBalance: 73700 },
      { month: "October 2026", projectedInflow: 35000, projectedOutflow: 16000, projectedBalance: 92700 }
    ]
  };
}


// Serve Vite static files or development server middleware
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  // Import dynamically to avoid loading devDependencies in production build
  startDevServer();
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in production on port ${PORT}`);
  });
}

async function startDevServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in development on port ${PORT}`);
  });
}
