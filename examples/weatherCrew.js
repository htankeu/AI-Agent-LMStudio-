require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Tool, Agent, Task } = require('../core'); 
const { weatherTool, lmStudioTool } = require('../tools');

const CITY = 'Marseille';
const VERBOSE = true;

// Agents
const weathFetcher = new Agent('WeatherFetcher', [weatherTool]);
const weatherAnalyst = new Agent('WeatherAnalyst', [lmStudioTool], 
    "Tu es un expert météorologue. Analyse les données météo fournies et donne des conseils pratiques pour la journée (vêtements, activités, précautions)."
);

// TASKS
const tasks = [
    new Task(CITY, 'weather'), // 1. Récupérer les données météo
    new Task(
        "Analyse ces données météo et donne des conseils pratiques pour la journée : quels vêtements porter, activités recommandées ou déconseillées, précautions à prendre. Sois concis et utile.",
        'lmStudio'
    ) // 2. Analyse IA
];

// CREW
class Crew {
    constructor(agents = []) {
        this.agents = agents;
    }

    async run(tasks = []) {
        const results = [];
        let lastResult = null;

        for (let i = 0; i < tasks.length; i++) {
            const agent = this.agents[i % this.agents.length];
            const toolName = tasks[i].toolName;
            const percent = Math.round(((i + 1) / tasks.length) * 100);
            
            console.log(`🔄 Étape ${i + 1}/${tasks.length} (${percent}%) | 👤 Agent: ${agent.name} | 🛠️ Tool: ${toolName}`);

            // Injecte résultat précédent pour l'analyse IA
            if (toolName === 'lmStudio' && i > 0 && lastResult) {
                tasks[i].input = `${tasks[i].input}\n\nDonnées météo : ${lastResult}`;
            }
            
            lastResult = await agent.perform(tasks[i]);
            
            if (VERBOSE) {
                console.log(`✅ Résultat étape ${i + 1}:`, lastResult);
            }
            
            results.push(lastResult);
        }

        console.log(`🎉 Analyse météo terminée pour ${CITY} !`);
        return results;
    }
}

// Utilisation de la crew
const crew = new Crew([weathFetcher, weatherAnalyst]);
crew.run(tasks).then(console.log);