import LocalStorage from "./localstorage";
import { User } from "../pages/MyProfile";
import { Book } from "../pages/Store";

export type SelectionOption = {
    key: string;
    value: string;
    text: string;
}
interface dropDownOptions {
    productOptions: Array<SelectionOption>;
    userOptions: Array<SelectionOption>;
}

export const logout = (): void => {
    LocalStorage.removeItem('user');
    window.location.href = '/';
};


export const downloadCSV = (csv: any, filename: string) => {
    let csvFile: Blob;
    let downloadLink: any;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

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


export const exportTableToCSV = (filename: string) => {
    const csv: Array<string> = [];
    const rows = document.querySelectorAll("table tr");

    for (let i = 0; i < rows.length; i++) {
        const row: Array<string> = [], cols: any = rows[i].querySelectorAll("td, th");

        for (let j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}


export const prepareSelectOptions = (users: Array<User>, products: Array<Book>): dropDownOptions => {
    const userOptions = users.map(user => ({
        key: user.id, value: user.fullName, text: user.fullName,
    }));
    const productOptions = products.map(product => ({
        key: product.id, value: product.name, text: product.name,
    }));
    return {
        userOptions: userOptions,
        productOptions: productOptions
    }
};

export const generateId = (): string => {
    const numbers: string = Math.random().toFixed(10);
    return `${numbers[2]}${numbers[3]}${numbers[4]}${numbers[5]}${numbers[6]}${numbers[7]}${numbers[8]}`;
}


export const defaultCover = 'https://react.semantic-ui.com/images/wireframe/square-image.png';

export const dummyArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];


export const getToday = () => {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0!

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
     return yyyy + '-' + mm + '-' + dd;
}
