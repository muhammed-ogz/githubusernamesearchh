// Elementleri seçme   

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllUsers);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

// Fonksiyonlarımı yazmaya başlıyorum 
function getData(e){
    let username = nameInput.value.trim();


    if (username === ""){
        alert("Lütfen Geçerli Bir Kullanıcı Adı Girin !")
    }else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                // Hatalı Kullanıcı
                ui.showerror("Kullanıcı Bulunamadı / Lütfen geçerli bir kullanıcı adı giriniz")
            }else{
                ui.addSearchedUserToUI(username)
                Storage.addSearchedUserToStorage(username)
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                ui.showsucces("Kullanıcı Bulundu !");
            }
        })
        .catch(err => ui.showerror(err))
    }

    ui.clearInput();    // Input temizleme işlemi

    e.preventDefault();
};

function getAllSearched(){
    //Arananları Storage dan al ui' ye gönder 

    let users = Storage.getSearchedUserFromStorage();

    let result = "";
    users.forEach(user => {
         // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`
    });
    lastUsers.innerHTML = result;
    
};

function clearAllUsers(){
    // Tüm arananları temizleme 
    if (confirm("Emin Misiniz ?")){
        // Onay verilirse silme işlemi gerçekleşir 
        Storage.clearAllSearchedUsersToStorage();
        ui.clearAllSearchFromUI();
    }




};