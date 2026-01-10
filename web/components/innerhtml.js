export class InnerHtml {
    static async Import(htmlFile) {
        try {
            const response = await fetch(htmlFile);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${htmlFile} (${response.status} ${response.statusText})`);
            }
            return await response.text();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Template loading failed for ${htmlFile}: ${message}`);
        }
    }
}
