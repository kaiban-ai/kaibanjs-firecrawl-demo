# KaibanJS Firecrawl Demo

This project demonstrates the integration of KaibanJS with [Firecrawl](https://www.firecrawl.dev/) to create a multi-agent system that summarizes JavaScript news from three popular newsletters.

## Features

- Uses KaibanJS to orchestrate a team of AI agents
- Integrates Firecrawl for efficient web scraping
- Summarizes content from JSTER, JavaScript Weekly, and Bytes newsletters
- Generates a consolidated markdown report on the specified topic of interest

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- API keys for OpenAI and Firecrawl

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/kaiban-ai/kaibanjs-firecrawl-demo.git
   cd kaibanjs-firecrawl-demo
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Update the `.env` file in the root directory with your API keys:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_FIRECRAWL_API_KEY=your_firecrawl_api_key_here
   ```

## Usage

To run the project:

```
npm run kaiban
```

This command will execute the KaibanJS team, which will scrape the specified newsletters, summarize the content, and generate a final report on the latest JavaScript frameworks.

## Project Structure

- `team.kban.js`: Defines the KaibanJS team and tasks
- `firecrawl.tool.js`: Custom tool for integrating Firecrawl with KaibanJS
- `vite.config.js`: Configuration for environment variables
- `.env`: Environment variables (included in the repository, update with your own keys)

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/kaiban-ai/kaibanjs-firecrawl-demo/issues) if you want to contribute.

## License

This project is licensed under the MIT License.
