
function getZodiacSign(date) {
    let birthdate = new Date(date);
    let day = birthdate.getDate();
    let month = birthdate.getMonth() + 1;

    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
        return "Capricórnio ♑";
    } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        return "Aquário ♒";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return "Peixes ♓";
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        return "Áries ♈";
    } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        return "Touro ♉";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return "Gêmeos ♊";
    } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        return "Câncer ♋";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
        return "Leão ♌";
    } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
        return "Virgem ♍";
    } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
        return "Libra ♎";
    } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
        return "Escorpião ♏";
    } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        return "Sagitário ♐";
    }
}

class User {
    constructor(name, email, birthdate, address, phone, cpf, age, sign, possible) {
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.address = address;
        this.phone = phone;
        this.cpf = cpf;
        this.age = age;
        this.sign = sign;
        this.possible = possible;
    }
}
class ListUser {
    constructor() {
        this.users = [];
    }
    addCategory(name, email, birthdate, address, phone, cpf, age, sign, possible) {
        const user = new User(name, email, birthdate, address, phone, cpf, age, sign, possible);
        this.users.push(user);
    }
}

function cleanInputs() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cpf").value = "";
}

const userList = new ListUser()

function createUser() {
    const userName = document.getElementById("name").value;
    const userEmail = document.getElementById("email").value;
    const userBirthdate = document.getElementById("birthdate").value;
    const userAddress = document.getElementById("address").value;
    const userPhone = document.getElementById("phone").value;
    const userCpf = document.getElementById("cpf").value;

    const cpfFormatadoVariavel = formatedCPF(userCpf);

    if (userName == "" || userEmail == "" || userBirthdate == "" || userAddress == "" || userPhone == "" || userCpf == "") {
        sendErrorMsg("Todos os campos obrigatórios devem ser preenchidos.")
    } else if (valida_cpf(userCpf) == "Sim") {
        sendErrorMsg("CPF inválido.")
    } else if (cpfAlreadyUsed(cpfFormatadoVariavel,) == 1){
        sendErrorMsg("CPF já cadastrado no sistema.")
    }else{
        //console.log(result);
        userList.addCategory(userName, userEmail, dateinPTBR(userBirthdate), userAddress, formatedCellphone(userPhone), cpfFormatadoVariavel, calculateAge(userBirthdate), getZodiacSign(userBirthdate), isPossibleClient(calculateAge(userBirthdate)));
        countUsers()
        cleanInputs()
        showUserList()
        sendSuccessMsg("Welcome to the X!")
        //console.log(dateinPTBR())
    }
    
}

function countUsers() {
   let userAmount = userList.users.length ;
    document.getElementById("contador").innerHTML = userAmount;
}

function cpfAlreadyUsed(cpf){
  let cpfAlreadyUsed = false;
  ListUser.users.forEach((user) => {
    if(cpf == user.cpf){
        cpfAlreadyUsed = true;
    }
  })
     return cpfAlreadyUsed
  }
 

function showRegister() {
    document.getElementById("sub-div").classList.add("hidden");
    document.getElementById("title-page").classList.remove("hidden");
    document.getElementById("main-div").classList.remove("hidden");


}

function showUsers() {
    document.getElementById("sub-div").classList.remove("hidden");
    document.getElementById("title-page").classList.add("hidden");
    document.getElementById("main-div").classList.add("hidden");


}

function dateinPTBR(birthdate) {
    let dateArray = birthdate.split("-");
    let dateReversed = dateArray.reverse();
    let dateFormated = dateReversed.join("/");
    
    return dateFormated;
}

function isPossibleClient(age){
if(age < 18 || age > 31){
    return "Não é um posivel cliente";
}else{
    return "É um posivel cliente";
}
}

function formatedCPF(cpf) {
    let cpfArray = cpf.split("");
    let cpfFormated = cpfArray[0] + cpfArray[1] + cpfArray[2]
        + "." + cpfArray[3] + cpfArray[4] + cpfArray[5] + "."
        + cpfArray[6] + cpfArray[7] + cpfArray[8] + "-" + cpfArray[9] + cpfArray[10];
    return cpfFormated;
}

function formatedCellphone(phone) {
    let cellphoneArray = phone.split("");
    let cellphoneFormated = "(" + cellphoneArray[0] + cellphoneArray[1] + ")"
        + " " + cellphoneArray[2] + cellphoneArray[3] + cellphoneArray[4]
        + cellphoneArray[5] + cellphoneArray[6] + "-"
        + cellphoneArray[7] + cellphoneArray[8]
        + cellphoneArray[9] + cellphoneArray[10];
    return cellphoneFormated;
}

function calculateAge(age){
    let personBirthdate = age
    let date = new Date(personBirthdate);
    var monthDiff = Date.now() - date.getTime();
    var ageDiff = new Date( monthDiff);

    var year = ageDiff.getUTCFullYear();
    
    var cal = Math.abs(year - 1970);
    return cal;
}

function showUserList() {
    let showContent = "";

    userList.users.forEach((user) => {
        showContent += `
        <div class="list-eachUser">
            <p>Nome: ${user.name}</p>
            <p>Signo: ${user.sign}</p>
            <p>Idade: ${user.age}</p>
            <p>Nascimento: ${user.birthdate}</p>
            <p>CPF: ${user.cpf}</p>
            <p>Telefone: ${user.phone}</p>
            <p>${user.possible}</p>

        </div>
    </div>
            `;
    });

    document.getElementById("user-list").innerHTML = showContent;
}

function valida_cpf(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}

function sendErrorMsg(msg) {
    document.getElementById("error-msg").innerHTML = msg;
    document.getElementById("error-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("error-msg").classList.add("hidden");
    }, 4000);
}

function sendSuccessMsg(msg){
    document.getElementById("success-msg").innerHTML = msg;
    document.getElementById("success-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("success-msg").classList.add("hidden");
    }, 4000);
}

