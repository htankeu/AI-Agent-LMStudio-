# CrewAI Builder

## Language Selection / Sprachauswahl / Sélection de la langue

- [English Documentation](#english)
- [Deutsche Dokumentation](#deutsch)
- [Documentation Française](#francais)

---

## English Documentation {#english}

CrewAI Builder is a visual interface for creating and executing AI workflows by connecting agents and tasks. Each agent can use different tools to accomplish specific tasks.

### Block Types

#### Agents (🤖)

Agents are AI entities that execute tasks using specialized tools.

**Configuration:**

- **Name**: Unique identifier for the agent
- **Tools**: Main tool that the agent can use
- **Prompt**: System instructions to guide agent behavior

#### Tasks (📋)

Tasks define the actions to be performed by agents.

**Configuration:**

- **Tool**: Specific tool to use for this task
- **Parameters**: Variables according to the selected tool

### Available Tools

#### LM Studio (🤖)

**Usage:** AI text generation

**Parameters:**

- **Prompt/Input**: Instructions or question for the AI

**Example:**

```
Analyze this financial data and give an investment recommendation
```

#### Fetch (🌐)

**Usage:** Web content retrieval

**Parameters:**

- **URL**: Web address to fetch

**Example:**

```
https://example.com/api/data
```

#### Weather (🌤️)

**Usage:** Weather data

**Parameters:**

- **City**: Name of the city

**Example:**

```
Paris
```

#### Write File (📝)

**Usage:** File writing

**Parameters:**

- **Filename**: Output file name

**Example:**

```
report.md
```

### Financial Tools

#### Company Overview (🏢)

**Usage:** General company data

**Parameters:**

- **Ticker Symbol**: Stock code (e.g.: AAPL, TSLA)

**Data retrieved:**

- General company information
- Industry sector
- Market capitalization
- Basic financial ratios

#### Income Statement (📊)

**Usage:** Income statement

**Parameters:**

- **Ticker Symbol**: Stock code

**Data retrieved:**

- Quarterly revenues (last 3 quarters)
- Net income
- Operating margins

#### Balance Sheet (⚖️)

**Usage:** Balance sheet

**Parameters:**

- **Ticker Symbol**: Stock code

**Data retrieved:**

- Assets and liabilities (last 3 quarters)
- Equity
- Long-term debt

#### Earnings (💰)

**Usage:** Financial results

**Parameters:**

- **Ticker Symbol**: Stock code

**Data retrieved:**

- Earnings per share (last 3 quarters)
- Estimates vs actual results
- Positive/negative surprises

#### Append Analysis (📄)

**Usage:** Add analysis to markdown file

**Parameters:**

- **Ticker**: Stock code
- **Analysis type**: Section name (e.g.: "Overview Analysis")
- **Content**: ⚡ *Auto-filled from previous task result*

**How it works:**

The content is automatically injected from the previous task's result (usually an LM Studio analysis).

#### Get Analysis File (📖)

**Usage:** Retrieve the complete analysis file

**Parameters:**

- **Ticker Symbol**: Stock code

**Data retrieved:**

- Full content of the file `analysis-{ticker}.md`

### Financial Analysis Workflow

**Typical example:**

1. **Company Overview** → Retrieve general data
2. **LM Studio** → Analyze and generate advice
3. **Append Analysis** → Save the analysis
4. **Income Statement** → Retrieve income statement
5. **LM Studio** → Analyze revenues
6. **Append Analysis** → Add to file
7. **Balance Sheet** → Retrieve balance sheet
8. **LM Studio** → Analyze financial situation
9. **Append Analysis** → Add to file
10. **Get Analysis File** → Retrieve all analyses
11. **LM Studio** → Final synthesis
12. **Append Analysis** → Final advice

### Block Connections

- **Output point** (right): Connect from here
- **Input point** (left): Connect to here
- Results are automatically passed between connected tasks

### Automatic Injection

#### For LM Studio:
The result of the previous task is added to the prompt:

```
Your prompt + "\n\nPrevious result: [result]"
```

#### For Append Analysis:
The "Content" field is automatically filled with the previous task's result.

#### For Write File:
The file content is replaced by the previous task's result.

### Usage Tips

#### Best Practices

- Use clear and specific prompts
- Connect tasks in a logical order
- Test with simple data first

#### To Avoid

- Prompts that are too generic
- Infinite connection cycles
- Forgetting required parameters

### Interface Actions

- **🚀 Execute**: Runs the workflow in sequence
- **🗑️ Clear**: Removes all blocks from the workspace
- **💾 Save**: Exports the workflow as a JSON file
- **📁 Load**: Imports a workflow from a JSON file
- **🖥️ Console**: Shows real-time execution logs

### Common Error Codes

- **"Ticker symbol is required"**: Missing stock code
- **"URL missing"**: URL required for Fetch
- **"City missing"**: City required for Weather
- **"Tool not found"**: Tool not available for agent

### Support

For more help, check:

1. Your block parameters
2. Connections between tasks
3. Console logs
4. Examples in the `/examples` folder

---

## Deutsche Dokumentation {#deutsch}

CrewAI Builder ist eine visuelle Schnittstelle zum Erstellen und Ausführen von KI-Workflows durch die Verbindung von Agenten und Aufgaben. Jeder Agent kann verschiedene Werkzeuge zur Erfüllung spezifischer Aufgaben nutzen.

### Block-Typen

#### Agenten (🤖)

Agenten sind KI-Einheiten, die Aufgaben mithilfe spezialisierter Werkzeuge ausführen.

**Konfiguration:**

- **Name**: Eindeutige Kennung des Agenten
- **Werkzeuge**: Hauptwerkzeug, das der Agent nutzen kann
- **Prompt**: Systemanweisungen zur Steuerung des Agentenverhaltens

#### Aufgaben (📋)

Aufgaben definieren die von den Agenten auszuführenden Aktionen.

**Konfiguration:**

- **Werkzeug**: Spezifisches Werkzeug für diese Aufgabe
- **Parameter**: Variablen je nach ausgewähltem Werkzeug

### Verfügbare Werkzeuge

#### LM Studio (🤖)

**Verwendung:** KI-Textgenerierung

**Parameter:**

- **Prompt/Input**: Anweisungen oder Frage an die KI

**Beispiel:**

```
Analysiere diese Finanzdaten und gib eine Anlageempfehlung
```

#### Fetch (🌐)

**Verwendung:** Abrufen von Webinhalten

**Parameter:**

- **URL**: Abzurufende Webadresse

**Beispiel:**

```
https://example.com/api/data
```

#### Wetter (🌤️)

**Verwendung:** Wetterdaten

**Parameter:**

- **Stadt**: Name der Stadt

**Beispiel:**

```
Paris
```

#### Datei Schreiben (📝)

**Verwendung:** Dateien schreiben

**Parameter:**

- **Dateiname**: Name der Ausgabedatei

**Beispiel:**

```
bericht.md
```

### Finanzwerkzeuge

#### Unternehmensübersicht (🏢)

**Verwendung:** Allgemeine Unternehmensdaten

**Parameter:**

- **Ticker Symbol**: Börsencode (z.B.: AAPL, TSLA)

**Abgerufene Daten:**

- Allgemeine Unternehmensinformationen
- Branchensektor
- Marktkapitalisierung
- Grundlegende Finanzkennzahlen

#### Gewinn- und Verlustrechnung (📊)

**Verwendung:** Erfolgsrechnung

**Parameter:**

- **Ticker Symbol**: Börsencode

**Abgerufene Daten:**

- Quartalsumsätze (letzte 3 Quartale)
- Nettogewinn
- Operative Margen

#### Bilanz (⚖️)

**Verwendung:** Bilanzübersicht

**Parameter:**

- **Ticker Symbol**: Börsencode

**Abgerufene Daten:**

- Aktiva und Passiva (letzte 3 Quartale)
- Eigenkapital
- Langfristige Verbindlichkeiten

#### Ertragsdaten (💰)

**Verwendung:** Finanzergebnisse

**Parameter:**

- **Ticker Symbol**: Börsencode

**Abgerufene Daten:**

- Ergebnis je Aktie (letzte 3 Quartale)
- Schätzungen vs. tatsächliche Ergebnisse
- Positive/negative Überraschungen

#### Analyse Anhängen (📄)

**Verwendung:** Analyse zu Markdown-Datei hinzufügen

**Parameter:**

- **Ticker**: Börsencode
- **Analysetyp**: Abschnittsname (z.B.: "Übersichts-Analyse")
- **Inhalt**: ⚡ *Automatisch aus vorheriger Aufgabe übernommen*

**Funktionsweise:**

Der Inhalt wird automatisch aus dem Ergebnis der vorherigen Aufgabe eingefügt (meistens eine LM Studio Analyse).

#### Analyse-Datei Abrufen (📖)

**Verwendung:** Gesamte Analysedatei abrufen

**Parameter:**

- **Ticker Symbol**: Börsencode

**Abgerufene Daten:**

- Gesamter Inhalt der Datei `analysis-{ticker}.md`

### Finanzanalyse-Workflow

**Typisches Beispiel:**

1. **Unternehmensübersicht** → Allgemeine Daten abrufen
2. **LM Studio** → Analysieren und Empfehlung generieren
3. **Analyse anhängen** → Analyse speichern
4. **Gewinn- und Verlustrechnung** → Erfolgsrechnung abrufen
5. **LM Studio** → Umsätze analysieren
6. **Analyse anhängen** → Zur Datei hinzufügen
7. **Bilanz** → Bilanz abrufen
8. **LM Studio** → Finanzlage analysieren
9. **Analyse anhängen** → Zur Datei hinzufügen
10. **Analyse-Datei abrufen** → Alle Analysen abrufen
11. **LM Studio** → Abschließende Synthese
12. **Analyse anhängen** → Abschließende Empfehlung

### Block-Verbindungen

- **Ausgangspunkt** (rechts): Von hier verbinden
- **Eingangspunkt** (links): Hierhin verbinden
- Ergebnisse werden automatisch zwischen verbundenen Aufgaben weitergegeben

### Automatische Übernahme

#### Für LM Studio:
Das Ergebnis der vorherigen Aufgabe wird dem Prompt hinzugefügt:

```
Ihr Prompt + "\n\nVorheriges Ergebnis: [Ergebnis]"
```

#### Für Analyse Anhängen:
Das Feld "Inhalt" wird automatisch mit dem Ergebnis der vorherigen Aufgabe gefüllt.

#### Für Datei Schreiben:
Der Dateiinhalte wird durch das Ergebnis der vorherigen Aufgabe ersetzt.

### Nutzungstipps

#### Best Practices

- Klare und spezifische Prompts verwenden
- Aufgaben in logischer Reihenfolge verbinden
- Zuerst mit einfachen Daten testen

#### Zu vermeiden

- Zu allgemeine Prompts
- Endlose Verbindungsschleifen
- Pflichtparameter vergessen

### Aktionen der Benutzeroberfläche

- **🚀 Ausführen**: Führt den Workflow sequenziell aus
- **🗑️ Löschen**: Entfernt alle Blöcke aus dem Workspace
- **💾 Speichern**: Exportiert den Workflow als JSON-Datei
- **📁 Laden**: Importiert einen Workflow aus einer JSON-Datei
- **🖥️ Konsole**: Zeigt Ausführungsprotokolle in Echtzeit an

### Häufige Fehlercodes

- **"Ticker symbol is required"**: Börsencode fehlt
- **"URL manquante"**: URL für Fetch erforderlich
- **"Ville manquante"**: Stadt für Weather erforderlich
- **"Tool not found"**: Werkzeug für den Agenten nicht verfügbar

### Support

Für weitere Hilfe überprüfen Sie:

1. Die Parameter Ihrer Blöcke
2. Die Verbindungen zwischen den Aufgaben
3. Die Logs in der Konsole
4. Die Beispiele im `/examples` Ordner

---

## Documentation Française {#francais}

Vue d'ensemble

CrewAI Builder est une interface visuelle permettant de créer et d'exécuter des workflows d'IA en connectant des agents et des tâches. Chaque agent peut utiliser différents outils pour accomplir des tâches spécifiques.

### Types de blocs

#### FR: Agents (🤖)

Les agents sont des entités IA qui exécutent des tâches en utilisant des outils spécialisés.

**Configuration:**

- **Nom**: Identifiant unique de l'agent
- **Outils**: Outil principal que l'agent peut utiliser
- **Prompt**: Instructions système pour guider le comportement de l'agent

#### FR: Tâches (📋)

Les tâches définissent les actions à effectuer par les agents.

**Configuration:**

- **Tool**: Outil spécifique à utiliser pour cette tâche
- **Paramètres**: Variables selon l'outil sélectionné

### Outils disponibles

#### FR: LM Studio (🤖)

**Utilisation:** Génération de texte par IA

**Paramètres:**

- **Prompt/Input**: Instructions ou question à poser à l'IA

[Voir la documentation complète en français...]
