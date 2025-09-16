
/**
 * Représente un outil avec un nom et une fonction exécutable.
 * 
 * @class Tool
 * @param {string} name - Le nom de l'outil.
 * @param {function} func - La fonction à exécuter par l'outil. Doit accepter une entrée et retourner un résultat (peut être asynchrone).
 *
 * Cette classe permet de définir un outil avec un nom et une fonction associée,
 * et d'exécuter cette fonction de manière asynchrone via la méthode execute.
 */
class Tool {
    constructor(name, func) {
        this.name = name;
        this.func = func;
    }

    /**
     * @method execute
     * @async
     * @param {*} input - L'entrée à passer à la fonction de l'outil.
     * @returns {Promise<*>} Le résultat de l'exécution de la fonction de l'outil avec l'entrée fournie.
     */
    async execute(input) {
        return await this.func(input);
    }
}

/**
 * Agent : Entité qui utilise des outils pour exécuter des tâches.
 * Un agent possède un nom, une liste d'outils et un prompt système (optionnel).
 * Exemple : Fetcher, Analyst, Writer...
 */
class Agent {
    constructor(name, tools = [], prompt = '') {
        this.name = name;
        this.tools = tools;
        this.prompt = prompt;
    }

    /**
     * Exécute une tâche en utilisant le bon outil.
     * @param {Task} task - Tâche à exécuter (input + nom de l'outil)
     * @param {function} onProgress - Callback pour logs/progression (optionnel)
     * @returns {Promise<*>} - Résultat de la tâche
     */
    async perform(task, onProgress = null) {
        // Recherche de l'outil
        const tool = this.tools.find(t => t.name === task.toolName);

        if (!tool) {
            const error = `Tool ${task.toolName} not found for agent ${this.name}`;
            if (onProgress) {
                onProgress({
                    type: 'log',
                    level: 'error',
                    message: error
                });
            }
            throw new Error(error);
        }

        if (onProgress) {
            onProgress({
                type: 'log',
                level: 'info',
                message: `Agent ${this.name} utilise l'outil ${tool.name}`
            });
        }

        try {
            // Exécuter l'outil
            const result = await tool.execute(task.input);
            return result;
        } catch (error) {
            if (onProgress) {
                onProgress({
                    type: 'log',
                    level: 'error',
                    message: `Erreur avec l'outil ${tool.name}: ${error.message}`
                });
            }
            throw error;
        }
    }
}

/**
 * Task : Représente une tâche à exécuter par un agent.
 * Contient l'input à traiter et le nom de l'outil à utiliser.
 * Exemple : { input: 'Paris', toolName: 'weather' }
 */
class Task {
    constructor(input, toolName) {
        this.input = input;
        this.toolName = toolName;
    }
}

module.exports = { Tool, Agent, Task };