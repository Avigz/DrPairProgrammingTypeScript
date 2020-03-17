import axios, {
    AxiosResponse,
    AxiosError,
} from "../../node_modules/axios/index";

import { json2table100 } from "./generictable";


// https://github.com/axios/axios/blob/master/test/typescript/axios.ts
// Book object

interface IBook {
    id: number;
    title: string;
    author: string;
    publisher: string;
    price: number;
}
let PostHandler: HTMLButtonElement = <HTMLButtonElement>document.getElementById("post");
PostHandler.addEventListener("click", PostPress)

function PostPress(): void{
    event.preventDefault();
    let idForm = <HTMLInputElement>document.getElementById("id"); 
    let titleForm = <HTMLInputElement>document.getElementById("Title"); 
    let authorForm = <HTMLInputElement>document.getElementById("Author"); 
    let publisherForm = <HTMLInputElement>document.getElementById("Publisher"); 
    let priceForm = <HTMLInputElement>document.getElementById("Price"); 

    let idNum: number = Number(idForm.value);
    let titleStr: string = titleForm.value;
    let authorStr: string = authorForm.value;
    let publisherStr: string = publisherForm.value;
    let priceNum: number = Number(priceForm.value);


    axios.post<IBook>("http://anbo-bookstorerest.azurewebsites.net/api/Books",{

    id: idNum, title:  titleStr, author: authorStr,
    publisher: publisherStr, price: priceNum
    })
    .then((response) => {
        console.log(response);
    })
    
    .catch((error) => {console.log(error)})
ButtonPress();

}


let ButtonHandler: HTMLButtonElement = <HTMLButtonElement>document.getElementById("B1");
ButtonHandler.addEventListener("click", ButtonPress)


function ButtonPress(): void{
axios.get<IBook[]>("http://anbo-bookstorerest.azurewebsites.net/api/books")
    .then(function (response: AxiosResponse<IBook[]>): void {
        let data: IBook[] = response.data;
        console.log(data);
        let result: string = json2table100(response.data);
        console.log(result);
        let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
        element.innerHTML = result;
    })
    
    .catch(function (error: AxiosError): void {
        console.log(JSON.stringify(error));
    });
}
