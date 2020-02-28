import LocalStorage from "./localstorage";

export const logout = (): void => {
    LocalStorage.removeItem('user');
    window.location.href = '/';
};


export const downloadCSV = (csv: any, filename: string) => {
    let csvFile: Blob;
    let downloadLink: any;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}


export const exportTableToCSV = (filename:string) => {
    const csv:Array<string> = [];
    const rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        const row: Array<string> = [], cols:any = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}
