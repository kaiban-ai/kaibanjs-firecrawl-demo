import { Agent, Task, Team } from 'kaibanjs';
import { FirecrawlTool } from './firecrawl.tool';

// Initialize the Firecrawl tool
const firecrawlTool = new FirecrawlTool({
  apiKey: import.meta.env.VITE_FIRECRAWL_API_KEY
});

// ==============================
// Define Agents for the team
// ==============================

// JSTER Content Agent
const jsterAgent = new Agent({
  name: 'Jenny',
  role: 'Web Content Retriever and Summarizer',
  goal: 'Retrieve content from the JSTER newsletter "{jsterUrl}" and summarize the most relevant information about "{topic}". Each entry should be formatted with the article title as a linked header, a snippet if available, and the source indicated below.',
  background: 'Web Scraping and Summarization',
  tools: [firecrawlTool],
});

// JS Weekly Content Agent
const jsWeeklyAgent = new Agent({
  name: 'Sam',
  role: 'Web Content Retriever and Summarizer',
  goal: 'Retrieve content from the JavaScript Weekly newsletter "{jsWeeklyUrl}" and summarize the most relevant information about "{topic}". Each entry should be formatted with the article title as a linked header, a snippet if available, and the source indicated below.',
  background: 'Web Scraping and Summarization',
  tools: [firecrawlTool],
});

// Bytes Content Agent
const bytesAgent = new Agent({
  name: 'Brenda',
  role: 'Web Content Retriever and Summarizer',
  goal: 'Retrieve content from the Bytes newsletter "{bytesUrl}" and summarize the most relevant information about "{topic}". Each entry should be formatted with the article title as a linked header, a snippet if available, and the source indicated below.',
  background: 'Web Scraping and Summarization',
  tools: [firecrawlTool],
});

// Content Integration Agent
const integrationAgent = new Agent({
  name: 'Oliver',
  role: 'Summary Integrator',
  goal: 'Compile summaries from all newsletters into a final summary in markdown format. Begin with a header that indicates the topic, followed by each formatted entry.',
  background: 'Content Aggregation and Formatting',
  tools: [],
});

// ==============================
// Define Tasks for each agent
// ==============================

// Task for JSTER News
const jsterTask = new Task({
  title: 'JSTER Newsletter Task',
  description: 'Retrieve and summarize information about "{topic}" from the JSTER newsletter "{jsterUrl}". Each entry should include the article title as a clickable link, a description if available, and end with the source name in parentheses.',
  expectedOutput: 'Markdown-formatted entries with linked titles, descriptions, and sources.',
  agent: jsterAgent,
});

// Task for JavaScript Weekly News
const jsWeeklyTask = new Task({
  title: 'JavaScript Weekly News Task',
  description: 'Retrieve and summarize information about "{topic}" from the JavaScript Weekly newsletter "{jsWeeklyUrl}". Each entry should include the article title as a clickable link, a description if available, and end with the source name in parentheses.',
  expectedOutput: 'Markdown-formatted entries with linked titles, descriptions, and sources.',
  agent: jsWeeklyAgent,
});

// Task for Bytes News
const bytesTask = new Task({
  title: 'Bytes Newsletter Task',
  description: 'Retrieve and summarize information about "{topic}" from the Bytes newsletter "{bytesUrl}". Each entry should include the article title as a clickable link, a description if available, and end with the source name in parentheses.',
  expectedOutput: 'Markdown-formatted entries with linked titles, descriptions, and sources.',
  agent: bytesAgent,
});

// Task for Final Summarization
const integrationTask = new Task({
  title: 'Final Summarization Task',
  description: 'Combine all entries into a final summary in markdown format, with a dynamically generated header based on "{topic}" to emphasize the most recent and relevant news. Each entry is separated by a blank line for better readability.',
  expectedOutput: `# {topic}\n\n* [Article title](URL) - Description (Newsletter Name)\n\n* [Article title](URL) - Description (Newsletter Name)\n\n* [Article title](URL) - Description (Newsletter Name)`,
  agent: integrationAgent,
});

// ==============================
// Define the Team
// ==============================

const newsSummaryTeam = new Team({
  name: 'Dynamic News Summary Team',
  agents: [jsterAgent, jsWeeklyAgent, bytesAgent, integrationAgent],
  tasks: [jsterTask, jsWeeklyTask, bytesTask, integrationTask],
  inputs: {
    topic: 'Latest JavaScript Frameworks',
    jsterUrl: 'https://jster.net/blog/jster-229',
    jsWeeklyUrl: 'https://javascriptweekly.com/issues/708',
    bytesUrl: 'https://bytes.dev/archives/331',
  },
  env: {
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  },
});

export default newsSummaryTeam;
