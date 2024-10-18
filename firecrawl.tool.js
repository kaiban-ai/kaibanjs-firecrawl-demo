import { Tool } from '@langchain/core/tools';
import { z } from 'zod';

export class FirecrawlTool extends Tool {
    constructor(fields) {
        super(fields);
        this.apiKey = fields.apiKey;
        this.name = 'firecrawl';
        this.description =
            'Fetches web content from a specified URL using the Firecrawl API. Input should be a JSON object with a "url".';

        // Define the input schema using Zod
        this.schema = z.object({
            url: z.string().describe('The URL to scrape and retrieve content from.'),
        });
    }

    async _call(input) {
        try {
            // Fetch content from the Firecrawl API. The API requires an API key for authorization. 
            // We send a POST request with the URL to scrape and the desired output format, which is markdown in this case.
            const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    url: input.url,
                    formats: ['markdown'],
                }),
            });

            if (!response.ok) {
                throw new Error(`Error fetching data from Firecrawl: ${response.statusText}`);
            }

            // Parse the JSON response
            const jsonData = await response.json();

            // Extract the markdown content from the response
            const markdownContent = jsonData?.data?.markdown;

            // Return the markdown content directly
            return markdownContent;
        } catch (error) {
            console.error('Error running the FirecrawlTool:', error);
            throw error;
        }
    }
}
