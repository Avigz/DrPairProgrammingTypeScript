import axios, {
    AxiosResponse,
    AxiosError,
} from "../../node_modules/axios/index";

import { json2table100 } from "./generictable";


// https://github.com/axios/axios/blob/master/test/typescript/axios.ts
// Book object

let formSelect: number = 0;

interface IBook2{
    IsbN13: string;
    Sidetal: Number;
    Forfatter: string;
    Titel: string;
    
   
    

}

interface IBook {
    id: number;
    title: string;
    author: string;
    publisher: string;
    price: number;
}

function PostPress(): void {
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

function PostPress2(): void{
    event.preventDefault();
    let isbn = <HTMLInputElement>document.getElementById("isbn"); 
    let titleForm = <HTMLInputElement>document.getElementById("Title"); 
    let authorForm = <HTMLInputElement>document.getElementById("Author"); 
    let SidetalForm = <HTMLInputElement>document.getElementById("Sidetal"); 

    let isbnStr: string = isbn.value;
    let titleStr: string = titleForm.value;
    let authorStr: string = authorForm.value;
 
    let SidetalNum: number = Number(SidetalForm.value);


    

    axios.post<IBook2>("https://restapibook20200313095945.azurewebsites.net/api/Book",{

    IsbN13: isbnStr, Sidetal: SidetalNum, Titel:  titleStr, Forfatter: authorStr
    })
    .then((response) => {
        console.log(response);
    })
    
    .catch((error) => {console.log(error)})
ButtonPress2();

}


let ButtonHandler: HTMLButtonElement = <HTMLButtonElement>document.getElementById("B1");
ButtonHandler.addEventListener("click", ButtonPress)

let ButtonHandler2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("B2");
ButtonHandler2.addEventListener("click", ButtonPress2)

function ButtonPress(): void{
axios.get<IBook[]>("http://anbo-bookstorerest.azurewebsites.net/api/books")
    .then(function (response: AxiosResponse<IBook[]>): void {
        let data: IBook[] = response.data;
        console.log(data);
        let result: string = json2table100(response.data);
        console.log(result);
        let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
        element.innerHTML = result;
        formSelect = 1;
        ApiForm();
        
    })
    
    .catch(function (error: AxiosError): void {
        console.log(JSON.stringify(error));
    });
}

function ButtonPress2(): void{
    axios.get<IBook2[]>("https://restapibook20200313095945.azurewebsites.net/api/Book")
        .then(function (response: AxiosResponse<IBook2[]>): void {
            let data: IBook2[] = response.data;
            console.log(data);
            let result: string = json2table100(response.data);
            console.log(result);
            let element: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
            element.innerHTML = result;
            formSelect = 2;
            ApiForm2();
        })
        
        .catch(function (error: AxiosError): void {
            console.log(JSON.stringify(error));
        });

    }

    

    function ApiForm(): void {
        let form: HTMLDivElement = <HTMLDivElement>document.getElementById("formsGui");
        let result = '<form class="form-horizontal" ><div class="form-group"><label class="col-sm-2 control-label" for="id">Book ID</label><div class="col-sm-10"><input type="Number" class="form-control" id="id" placeholder="ID"><p class="help-block">ID has to be a number</p></div></div><div class="form-group"><label class="col-sm-2 control-label" for="Title" >Book Title</label><div class="col-sm-10"><input type="Text" class="form-control" id="Title" placeholder="Title"> </div></div><div class="form-group"><label class="col-sm-2 control-label" for="Author">Book Author</label><div class="col-sm-10"><input type="text" class="form-control" id="Author" placeholder="Author"> </div></div><div class="form-group"><label class="col-sm-2 control-label" for="Publisher">Book Publisher</label><div class="col-sm-10"><input type="text" class="form-control" id="Publisher" placeholder="Publisher" > </div></div><div class="form-group"><label class="col-sm-2 control-label" for="Price">Book Price</label><div class="col-sm-10"><input type="double" class="form-control" id="Price" placeholder="Price"> </div></div><button type="post" id="post" class="btn btn-default">Post</button></form>'
        form.innerHTML = result;
        let PostHandler: HTMLButtonElement = <HTMLButtonElement>document.getElementById("post");
        PostHandler.addEventListener("click", PostPress);

    }

    function ApiForm2(): void {
        let form: HTMLDivElement = <HTMLDivElement>document.getElementById("formsGui");
        let result = '  <form class="form-horizontal" ><div class="form-group"><label class="col-sm-2 control-label" for="isbn">ISBN13</label><div class="col-sm-10"><input type="text" class="form-control" id="isbn" placeholder="ISBN13"><p class="help-block">ISBN13 has to 13 characters long, and not shorter than 4</p></div></div><div class="form-group"><label class="col-sm-2 control-label" for="Title" >Book Title</label><div class="col-sm-10"><input type="Text" class="form-control" id="Title" placeholder="Title"> </div></div><div class="form-group"><label class="col-sm-2 control-label" for="Author">Book Author</label><div class="col-sm-10"><input type="text" class="form-control" id="Author" placeholder="Author"> </div></div><div class="form-group"><label class="col-sm-2 control-label" for="Sidetal">Sidetal</label><div class="col-sm-10"><input type="number" class="form-control" id="Sidetal" placeholder="Sidetal"> </div></div></div><button type="post" id="post" class="btn btn-default">Post</button></form>';
        form.innerHTML = result;
        let PostHandler: HTMLButtonElement = <HTMLButtonElement>document.getElementById("post");
PostHandler.addEventListener("click", PostPress2);
    }

    