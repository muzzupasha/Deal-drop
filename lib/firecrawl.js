import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeProduct(url){
    try {
        const result = await firecrawl.scrape(url , {
            formats:[{ type: 'json', 
            prompt:"Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
            schema: {
            type: "object",
            properties: {
            productName: { type: "string" },
            currentPrice: { type: "number" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
          required: ["productName", "currentPrice"],
          },}],
        })

        console.log("Firecrawl result:", result); // Add this line

        // Firecrawl may return data in result.extract or result.json
        const extractedData = result.extract || result.json;

        if (
            !extractedData ||
            !extractedData.productName ||
            extractedData.productName.trim() === "" ||
            !extractedData.currentPrice ||
            extractedData.currentPrice === 0
        ) {
            console.error("Firecrawl extract missing or incomplete:", extractedData);
            throw new Error(
                "Could not extract product information from this URL. This may happen if the site blocks scraping or uses dynamic content. Try a different product page."
            );
        }

        return extractedData;
    } catch (error) {
         console.error("Firecrawl scrape error:", error);
         throw new Error(`Failed to scrape product: ${error.message}`);
    }
}
