export class InnerHtml {
    public static async Import(htmlFile:string) : Promise<string> {
        
        let html:string = "";

        await fetch(htmlFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                html = data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

            return html;
        }
}