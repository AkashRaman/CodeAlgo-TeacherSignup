'use strict';

const store = document.getElementById('name');

const firstNameBox = document.getElementById('firstName-box');
const lastNameBox = document.getElementById('lastName-box');
const emailBox = document.getElementById('email-box');
const passwordBox = document.getElementById('password-box');
const form = document.querySelector('.form');
const btnSignin = document.querySelector('#btn-signin');

// const guest = {
//     name: 'Guest',
//     email: 'unknown',
//     password: 'unknown'
// }
// localStorage.clear()
// localStorage.setItem('accounts',JSON.stringify([{
//     type: 'student',
//     firstName: 'Akash',
//     lastName: 'Raman',
//     email: 'akashramanj.csbs2020@citchennai.net',
//     password: '083020codealgo',
//     regno: 210420244021
// },
// {
//     type: 'student',
//     firstName: 'Sai',
//     lastName: 'Subash',
//     email: 'saisubash.csbs2020@citchennai.net',
//     password: '083020codealgo',
//     regno: 210420244021
// },
// {
//     type: 'teacher',
//     firstName: 'Akshay',
//     lastName: 'Raman',
//     email: 'akshayramanj.csbs2020@citchennai.net',
//     password: '083020codealgo',
// }]))

// class Account {
//     firstName;
//     lastName;
//     email;
//     password;
//     constructor(firstName, lastName, email, password){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.password = password;
//      }
//  }
  
  class Teacher{
    firstName;
    lastName;
    email;
    password;
    type = 'teacher';
    constructor(firstName,lastName,email,password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.regno = regno;
    }
  }
  
///   class Teacher extends Account {
//     type = 'teacher';
//     constructor(firstName, lastName, email, password) {
//       super(firstName, lastName, email, password);
//     }
//   }
  

class Database {
    #accounts;
    #currentAccount;
    constructor(){
        this._getLocalStorage();
        form.addEventListener('keypress', this._checkingByEntering.bind(this));
        btnSignin.addEventListener('click', this._checkingByClicking.bind(this));
    }
    
    _getLocalStorage(){
        this.#currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        this.#accounts = JSON.parse(localStorage.getItem('accounts'));
        console.log(this.#accounts);
        console.log(this.#currentAccount);
    }

    _checkingByClicking(e){
        e.preventDefault();
        const firstName = firstNameBox.value;
        const lastName = lastNameBox.value;
        const email = emailBox.value;
        const password = passwordBox.value;

        if(!(firstName&&lastName&&email&&password)){
            alert("Enter every details");
            return ;
        }

        this._setCurrentAccount(firstName,lastName,email,password);
    }

    _checkingByEntering(e){
        

        if(e.keyCode === 13){
            e.preventDefault();
            const firstName = firstNameBox.value;
            const lastName = lastNameBox.value;
            const email = emailBox.value;
            const password = passwordBox.value;
            
            if (firstNameBox === document.activeElement){
                lastNameBox.focus();
                return ;
            }
            if (lastNameBox === document.activeElement){
                emailBox.focus();
                return ;
            }
            if (emailBox === document.activeElement){
                passwordBox.focus(); 
                return ;
            }
            
            this._setCurrentAccount(firstName,lastName,email,password);
        }
    }

    _setCurrentAccount(firstName,lastName,email,password){

        if (!email.includes('@')){
            alert('Invalid Email');
            return;
        }

        const foundedAccount = this.#accounts.find(
            account => (account.type == 'teacher' && account.email === email)
          );

        if(foundedAccount){
            alert('There is a matching account');
            return ;
        }

        this.#currentAccount = new Teacher(firstName,lastName,email,password);
        this.#accounts.push(this.#currentAccount)
        localStorage.removeItem('currentAccount')
        localStorage.removeItem('accounts')
        localStorage.setItem('currentAccount',JSON.stringify(this.#currentAccount));
        localStorage.setItem('accounts',JSON.stringify(this.#accounts));
    }
}

const d = new Database();
