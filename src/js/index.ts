import axios, {
    AxiosResponse,
    AxiosError,
} from "../../node_modules/axios/index";

import { json2table100 } from "./generictable";


// https://github.com/axios/axios/blob/master/test/typescript/axios.ts
// Book object

let formSelect: number = 0;


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
        formSelect = 1;
        ApiForm();
        
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

