require('dotenv').config();
const fs = require('fs').promises;
const { Tool } = require('./core');
const LM_API_URL = process.env.LM_API_URL;
const LM_MODEL = process.env.LM_MODEL;
const GROQ_API_URL = process.env.GROQ_API_URL;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!LM_API_URL || !LM_MODEL) {
    throw new Error('Variables LM_API_URL et LM_MODEL requises dans .env')
}

/*if (!GROQ_API_URL || !GROQ_API_KEY || !GROQ_MODEL) {
    throw new Error('Variables GROQ_API_URL, GROQ_API_KEY et GROQ_MODEL requises dans .env')
}*/

const lmStudioTool = new Tool('lmStudio', async (input, systemPrompt = null) => {
    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: input });
    console.log(`[LM STUDIO] Prompt sent: ${input}`);
    const res = await fetch(LM_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: LM_MODEL, messages })
    });
    const data = await res.json();
    const result = data.choices?.[0].message?.content || '';
    console.log(`[LM STUDIO] Response: ${result}`);
    return result;
});

const groqTool = new Tool('groq', async (input, systemPrompt = null) => {
    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: input });
    
    console.log(`[GROQ] Prompt sent: ${input}`);
    
    const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model: GROQ_MODEL, messages })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]) {
        console.log("Réponse complète:", JSON.stringify(data, null, 2));
        throw new Error("Structure de réponse inattendue");
    }
    
    const result = data.choices[0].message.content;
    console.log(`[GROQ] Response: ${result}`);
    return result;
});

const fetchTool = new Tool('fetch', async (url) => {
    console.log(`[FETCH] Calling API: ${url}`);
    const response = await fetch(url, {
        header: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'
        }
    });
    const result = await response.text();
    console.log(`[FETCH] Response: ${result.substring(0, 200)}...`);
    return result.replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
});

const fileWriteTool = new Tool('writeFile', async ({ filename, content }) => {
    console.log(`[WRITE FILE] Writing to: ${filename}`);
    console.log(`[WRITE FILE] Content: ${content.substring(0, 100)}...`);

    await fs.writeFile(filename, content, 'utf8');
    const result = `File written: ${filename}`;
    console.log(`[WRITE FILE] Result: ${result}`);
    return result;
});

const weatherTool = new Tool('weather', async (city) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

    console.log(`[WEATHER] Calling API for city: ${city}`);
    console.log(`[WEATHER] API URL: ${url}`);

    const response = await fetch(url);
    const data = await response.json();

    console.log(`[WEATHER] API Response: ${JSON.stringify(data, null, 2)}`);

    if (data.error) {
        const errorMsg = `Weather API Error: ${data.error.message}`;
        console.log(`[WEATHER] Error: ${errorMsg}`);
        throw new Error(errorMsg);
    }

    const result = `Météo à ${data.location.name}: ${data.current.temp_c}°C, ${data.current.condition.text}. Ressenti: ${data.current.feelslike_c}°C, Humidité: ${data.current.humidity}%`;
    console.log(`[WEATHER] Formatted result: ${result}`);
    return result;
})

module.exports = { lmStudioTool, groqTool, fetchTool, fileWriteTool, weatherTool };