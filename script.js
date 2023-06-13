
// ############################ FUNCIONES GENERALES ############################

function menuSelector(id){
    let menus = document.body.children;
    for (element of menus) {
        if (element.id != id && element.id != "nav" && element.id != "footer") {
            element.classList.add("hidden");
        } else {
            element.classList.remove("hidden")
        }
    }
}



function createId(list) {
    if (list.length == 0) {
        return 1
    } else {
        let len = list[list.length -1].get("idProgram");
        return len + 1;
    }
}

// ############################ FUNCIONES CLIENTES ############################

let firstClient = new Map([["idProgram", 0], ["idClient", 1092459276], ["name", "John"], ["lastName", "Doe"], ["phone", 3128547596], ["email", "johnDoe@aol.com"], ["bornDate", "2000-01-01"], ["country", "CO"]]);
let clientes = [];
clientes.push(firstClient);

function refresh() {
    let container = document.getElementById("clientesTable");
    container.innerHTML = "<tr><th>Id</th><th>Cédula</th><th>Nombres</th><th>Apellidos</th><th>Teléfono</th></tr>";

    for (let i = 0; i<clientes.length; i++) {
        let idProgram = clientes[i].get("idProgram");
        let idClient = clientes[i].get("idClient");
        let name     = clientes[i].get("name");
        let lastName = clientes[i].get("lastName");
        let phone    = clientes[i].get("phone");

        let delButton = '<i onclick="deleteParent(event)" class="bi bi-trash-fill"></i>'
        let modButton = '<i onclick="modifyParent(event)" class="bi bi-pencil-fill"></i>'
        let morButton = '<i onclick="moreInfoParent(event)" class="bi bi-plus-circle-fill"></i>'

        let box = `<tr><td>${idProgram}</td><td>${idClient}</td><td>${name}</td><td>${lastName}</td><td>${phone}</td><th>${delButton}</th><th>${modButton}</th><th>${morButton}</th></tr>`;
        container.innerHTML += box;
    }
}

function addPerson() {
    let idProgram= createId(clientes);
    let idClient = document.getElementById("idClient").value;
    let name     = document.getElementById("name").value;
    let lastName = document.getElementById("lastName").value;
    let phone    = document.getElementById("phone").value;
    let email    = document.getElementById("email").value;
    let bornDate = document.getElementById("bornDate").value;
    let country  = document.getElementById("country").value;
    if (idClient =="" || name =="" || lastName=="" || phone =="" || email =="" || bornDate =="" || country ==""){
        let alert = document.getElementById("alertDanger");
        alert.classList.remove("fade");
        setTimeout(() => {  alert.classList.add("fade"); }, 3000);
    } else {
    let person = new Map();
    person.set("idProgram", idProgram);
    person.set("idClient", idClient);
    person.set("name", name);
    person.set("lastName", lastName);
    person.set("phone", phone);
    person.set("email", email);
    person.set("bornDate", bornDate);
    person.set("country", country);
    clientes.push(person);
    refresh();
    }
}

function deletePerson(){
    let searchId = prompt("Ingrese el Id del cliente que desea eliminar:");
    let verify = false;
    for (let i=0; i<clientes.length; i++){
        let idProgram = clientes[i].get("idProgram");
        if (searchId == idProgram ) {
            verify = true;
            var idx = i;
            break;
        }
    }
    if (verify == false) {
        alert("Ese cliente no se encuentra en la base de datos");
    } else {
        delete(clientes[idx]);
        clientes = clientes.flat();
        refresh();
    }
}

function deleteParent(event) {
    let text = "¿Está seguro que desea eliminar al cliente?";
    if (confirm(text) == true) {
        let row = event.target.parentNode.parentNode;
        let id  = row.children[0].innerHTML;
        for (let i=0; i<clientes.length; i++) {
            let idProgram = clientes[i].get("idProgram");
            if (id == idProgram) {
                var idx = i;
                break;
        }
    }
    delete(clientes[idx]);
    clientes = clientes.flat();
    refresh();
    }
}

function searchPerson() {
    let searchInfo = document.getElementById("searchName").value;
    let verify = false;
    var idxList = [];
    for (let i=0; i<clientes.length; i++){
        let name = clientes[i].get("name");
        let lastName = clientes[i].get("lastName");
        let idClient = clientes[i].get("idClient");
        if (searchInfo == name || searchInfo == lastName || searchInfo == idClient) {
            verify = true;
            idxList.push(clientes[i].get("idProgram")) ;
        }
    }
    if (verify == false) {
        alert("Esa persona no se encuentra en la biblioteca");
    } else {
        let container = document.getElementById("clientesTable");
        container.innerHTML = "";
        for (let idx of idxList) {
            let idProgram = clientes[idx].get("idProgram");
            let idClient = clientes[idx].get("idClient");
            let name     = clientes[idx].get("name");
            let lastName = clientes[idx].get("lastName");
            let phone    = clientes[idx].get("phone");
            let email    = clientes[idx].get("email");
            let bornDate = clientes[idx].get("bornDate");
            let country  = clientes[idx].get("country");

            container.innerHTML += `<tr><th>IdProgram</th><td>${idProgram}</td></tr><tr><th>Cédula</th><td>${idClient}</td></tr><tr><th>Nombres</th><td>${name}</td></tr><tr><th>Apellidos</th><td>${lastName}</td></tr><tr><th>Teléfono</th><td>${phone}</td></tr><tr><th>Email</th><td>${email}</td></tr><tr><th>Fecha de nacimiento</th><td>${bornDate}</td></tr><tr><th>Nacionalidad</th><td>${country}</td></tr><tr rowspan="2">-</tr>`;
        }
        
    }
}

function moreInfoParent(event) {
    let row = event.target.parentNode.parentNode;
    let id  = row.children[0].innerHTML;
    for (let i=0; i<clientes.length; i++){
        let idProgram = clientes[i].get("idProgram");
        if (id == idProgram) {
            verify = true;
            var idx = i;
            break;
        }
    }
    let idClient = clientes[idx].get("idClient");
    let name     = clientes[idx].get("name");
    let lastName = clientes[idx].get("lastName");
    let phone    = clientes[idx].get("phone");
    let email    = clientes[idx].get("email");
    let bornDate = clientes[idx].get("bornDate");
    let country  = clientes[idx].get("country");
    
    let container = document.getElementById("clientesTable");
    container.innerHTML = `<tr><th>Cédula</th><td>${idClient}</td></tr><tr><th>Nombres</th><td>${name}</td></tr><tr><th>Apellidos</th><td>${lastName}</td></tr><tr><th>Teléfono</th><td>${phone}</td></tr><tr><th>Email</th><td>${email}</td></tr><tr><th>Fecha de nacimiento</th><td>${bornDate}</td></tr><tr><th>Nacionalidad</th><td>${country}</td></tr>`;
}

function modifyPerson(){
    let searchId = prompt("Ingrese el id del cliente que desea modificar:");
    let verify = false;
    for (let i=0; i<clientes.length; i++){
        let idProgram = clientes[i].get("idProgram");
        if (searchId == idProgram) {
            verify = true;
            var idx = i;
            break;
        }
    }
    if (verify == false) {
        alert("Ese cliente no se encuentra en la base de datos");
    } else {
        let idClient = prompt("Ingrese el número de identificación del cliente");
        let name     = prompt("Ingrese los nombres del cliente");
        let lastName = prompt("Ingrese los apellidos del cliente");
        let phone    = prompt("Ingrese el teléfono del cliente");
        let email    = prompt("Ingrese el correo del cliente");
        let bornDate = prompt("Ingrese la fecha de nacimiento del cliente (yyyy-mm-dd)");
        let country  = prompt("Ingrese la nacionalidad del cliente");

        clientes[idx].set("idClient", idClient);
        clientes[idx].set("name", name);
        clientes[idx].set("lastName", lastName);
        clientes[idx].set("phone", phone);
        clientes[idx].set("email", email);
        clientes[idx].set("bornDate", bornDate);
        clientes[idx].set("country", country);

        refresh();
    }
}


function modifyParent(event) {
    let row = event.target.parentNode.parentNode;
    let id  = row.children[0].innerHTML;
    for (let i=0; i<clientes.length; i++) {
        let idProgram = clientes[i].get("idProgram");
        if (id == idProgram) {
            var idx = i;
            break;
        }
    }
    let idClient = prompt("Ingrese la identificación del cliente");
    let name     = prompt("Ingrese el nombre del cliente");
    let lastName = prompt("Ingrese el apellido del cliente");
    let phone    = prompt("Ingrese el teléfono del cliente");
    let email    = prompt("Ingrese el correo del cliente");
    let bornDate = prompt("Ingrese la fecha de nacimiento del cliente (yyyy-mm-dd)");
    let country  = prompt("Ingrese la nacionalidad del cliente");

    clientes[idx].set("idClient", idClient);
    clientes[idx].set("name", name);
    clientes[idx].set("lastName", lastName);
    clientes[idx].set("phone", phone);
    clientes[idx].set("email", email);
    clientes[idx].set("bornDate", bornDate);
    clientes[idx].set("country", country);

    refresh();
}

// ############################ FUNCIONES VIDEOJUEGOS ############################

let firstVideo = new Map([ ["idProgram", 0], ["videoName", "Mario Bros"], ["videoTopic", "Aventura"], ["videoValue", 200000], ["fidelPoints", 10] ]);
let videoGames = [];
videoGames.push(firstVideo);

function refreshVideos() {
    let container = document.getElementById("videoTable");
    container.innerHTML = "<tr><th>Id</th><th>Nombre del videojuego</th><th>Género</th><th>Valor</th><th>Puntos por compra</th></tr>";

    for (let i = 0; i<videoGames.length; i++) {
        let idProgram      = videoGames[i].get("idProgram");
        let videoName    = videoGames[i].get("videoName");
        let videoTopic = videoGames[i].get("videoTopic");
        let videoValue    = videoGames[i].get("videoValue");
        let fidelPoints = videoGames[i].get("fidelPoints");

        let delButton = '<i onclick="deleteParentRutes(event)" class="bi bi-trash-fill"></i>'

        let box = `<tr><td>${idProgram}</td><td>${videoName}</td><td>${videoTopic}</td><td>${videoValue}</td><th>${fidelPoints}</th><th>${delButton}</th></tr>`;
        container.innerHTML += box;
    }
}

function addVideo() {
    let idProgram      = createId(videoGames);
    let videoName    = document.getElementById("videoName").value;
    let videoTopic = document.getElementById("videoTopic").value;
    let videoValue    = document.getElementById("videoValue").value;
    let fidelPoints = document.getElementById("fidelPoints").value;
    
    if (videoName =="" || videoTopic =="" || videoValue=="" || fidelPoints =="" ){
        let alert = document.getElementById("alertDangerVideos");
        alert.classList.remove("fade");
        setTimeout(() => {  alert.classList.add("fade"); }, 3000);
    } else {
    let video = new Map();
    video.set("idProgram", idProgram);
    video.set("videoName", videoName);
    video.set("videoTopic", videoTopic);
    video.set("videoValue", videoValue);
    video.set("fidelPoints", fidelPoints);
    
    videoGames.push(video);
    refreshVideos();
    }
}

function deleteParentRutes(event) {
    let text = "¿Está seguro que desea eliminar el videojuego?";
    if (confirm(text) == true) {
        let row = event.target.parentNode.parentNode;
        let id  = row.children[0].innerHTML;
        for (let i=0; i<videoGames.length; i++) {
            let idProgram = videoGames[i].get("idProgram");
            if (id == idProgram) {
                var idx = i;
                break;
        }
    }
    delete(videoGames[idx]);
    videoGames = videoGames.flat();
    refreshVideos();
    }
}

// ############################ FUNCIONES DE COMPRA ############################


function selectClient() {
    let select = document.querySelector("#selectClient");
    select.innerHTML = '<option value="none">seleccione un cliente</option>'

    for (let i=0; i<clientes.length; i++) {
        let line = `<option value="${clientes[i].get("idProgram")}">${clientes[i].get("idProgram")}: ${clientes[i].get("name")} ${clientes[i].get("lastName")}</option>`
        select.innerHTML += line;
    }
}

function selectVideo() {
    let select = document.querySelector("#selectVideo");
    select.innerHTML = '<option value="none">seleccione un videojuego</option>'

    for (let i=0; i<videoGames.length; i++) {
        let line = `<option value="${videoGames[i].get("idProgram")}">${videoGames[i].get("idProgram")}: ${videoGames[i].get("videoName")}</option>`
        select.innerHTML += line;
    }
}

function showValue() {
    let selectVideo   = document.querySelector("#selectVideo").value;
    if (selectVideo == "none") {
        let valorContainer = document.querySelector("#valor");
        valorContainer.innerHTML = "Seleccione una opcion de videojuego válida"
    } else {
        for (let i = 0; i<videoGames.length; i++) {
            let idProgram = videoGames[i].get("idProgram");
            if (selectVideo == idProgram) {
                var idx = i;
                break;
            }
        }
        let valorContainer = document.querySelector("#valor");
        let totalValue = videoGames[idx].get("videoValue")*(1 + 0.04 + 0.16);
        valorContainer.innerHTML = `El valor del videojuego es de: ${videoGames[idx].get("videoValue")}<br> + 16% de IVA + 4% de impuesto especial <br> El valor total es: ${totalValue}`;
    }
}


function buyVideo() {
    let selectClient = document.querySelector("#selectClient").value;
    let selectVideo   = document.querySelector("#selectVideo").value;

    if (selectClient == "none" || selectVideo == "none") {
        let alert = document.getElementById("alertDangerCompra");
        alert.classList.remove("fade");
        setTimeout(() => {  alert.classList.add("fade"); }, 3000);
    } else {
        for (let i=0; i<clientes.length; i++) {
            let idC = clientes[i].get("idProgram");
            if (selectClient == idC) {
                var idxC = i;
                break;
            }
        }
    
        for (let j=0; j<videoGames.length; j++) {
            let idR = videoGames[j].get("idProgram");
            if (selectVideo == idR) {
                var idxR = j;
                break;
            }
        }

        let clientName     = clientes[idxC].get("name");
        let clientLastName = clientes[idxC].get("lastName"); 

        if (clientes[idxC].has("points")) {
            let totalPoints = clientes[idxC].get("points")*1 + videoGames[idxR].get("fidelPoints")*1;
            clientes[idxC].set("points", totalPoints);
        } else {
            clientes[idxC].set("points", videoGames[idxR].get("fidelPoints"));
        }

        let videoName    = videoGames[idxR].get("videoName");
        let videoTopic   = videoGames[idxR].get("videoTopic");
        let videoValue  = videoGames[idxR].get("videoValue");
        let totalValue   = videoValue*(1 + 0.04 + 0.16);


        let container = document.querySelector("#boughtTicket");
        container.classList.remove("fade");
        container.innerHTML = `<div class="card" style="width: 18rem;">
        <i class="bi bi-check-circle-fill" style="color:green"></i>
        <div class="card-body">
        <h5 class="card-title">¡COMPRA REALIZADA!</h5>
        <p class="card-text">A continuación se mostrara información general de la compra.</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Nombre: ${clientName}</li>
        <li class="list-group-item">Apellido: ${clientLastName}</li>
        <li class="list-group-item">Videojuego: ${videoName}</li>
        <li class="list-group-item">Género: ${videoTopic}</li>
        <li class="list-group-item">Valor del videojuego: ${videoValue}</li>
        <li class="list-group-item">Valor total de la compra: ${totalValue}</li>
        </ul>
        </div>`
        setTimeout(() => {container.classList.add("fade");}, 5000);
        setTimeout(() => {container.innerHTML="";}, 6000);
    }

}
// 
// ############################ FUNCIONES FIDELIZACIÓN ############################

function fideliz() {
    let container = document.querySelector("#fidelData");
    container.innerHTML="";
    for (i=0; i<clientes.length; i++) {
        if (clientes[i].has("points")) {
            let idProgram = clientes[i].get("idProgram");
            let idClient  = clientes[i].get("idClient");
            let name      = clientes[i].get("name");
            let lastName  = clientes[i].get("lastName");
            let phone     = clientes[i].get("phone");
            let Points    = clientes[i].get("points");

            container.innerHTML += `<tr><td>${idProgram}</td><td>${idClient}</td><td>${name}</td><td>${lastName}</td><td>${phone}</td><td>${Points}</td></tr>`
        }
    }
}