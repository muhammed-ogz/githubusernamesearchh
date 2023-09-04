class Storage{
    static getSearchedUserFromStorage(){
        // tüm kullanıcıları çeker


            let users;

            if(localStorage.getItem("searched") === null){
                users = [];
            }else{
                users = JSON.parse(localStorage.getItem("searched"))
            }
            return users;

    }

    static addSearchedUserToStorage(username){
        // Kullanıcı ekler
        let users = this.getSearchedUserFromStorage();

        //IndexOf
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users))

    }

    static clearAllSearchedUsersToStorage(){
        //Tüm kullanıcıları siler
        localStorage.removeItem("searched")
    }
}