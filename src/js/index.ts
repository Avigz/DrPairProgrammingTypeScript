import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler
} from "../../node_modules/axios";

// https://github.com/axios/axios/blob/master/test/typescript/axios.ts
// attributes from REST service http://jsonplaceholder.typicode.com/comments
// simple object
interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

// more advanced object, including nested objects (and double nested objects)
interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    company: { name: string; catchPhrase: string; bs: string };
}

interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; long: string };
}

axios.get<IUser>("http://jsonplaceholder.typicode.com/users").
    then(function (response: AxiosResponse<IUser[]>): void {
        // buildAndShowLongHtmlString(response);
        // addToDom(response);
        console.log(response.data);
        let result: string = json2table(response.data);
        console.log(result);
        let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
        element.innerHTML = result;
    })
    .catch(function (error: AxiosError): void {
        console.log(JSON.stringify(error));
    });

// adapted to TypeScript from
// https://travishorn.com/building-json2table-turn-json-into-an-html-table-a57cf642b84a
function json2table(json: any): string {
    let cols: string[] = Object.keys(json[0]);
    let headerRow: string = "";
    let bodyRows: string = "";
    cols.map(function (col: string): void {
        headerRow += "<th>" + capitalizeFirstLetter(col) + "</th>";
    });
    json.map(function (row: any): void {
        bodyRows += "<tr>";
        // loop over object properties and create cells
        cols.map(function (colName: string): void {
            bodyRows += "<td>" + (typeof row[colName] === "object" ? JSON.stringify(row[colName]) : row[colName]) + "</td>";
            // error in article slash missing (/td)
        });
        bodyRows += "</tr>";
    });
    return "<table><thead><tr>" +
        headerRow +
        "</tr></thead><tbody>" +
        bodyRows +
        "</tbody></table>";
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}