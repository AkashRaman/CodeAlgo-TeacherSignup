'use strict';

const store = document.getElementById('name');

const firstNameBox = document.getElementById('firstName-box');
const lastNameBox = document.getElementById('lastName-box');
const emailBox = document.getElementById('email-box');
const staffIdBox = document.getElementById('staffId-box');
const passwordBox = document.getElementById('password-box');
const form = document.querySelector('.form');
const btnSignup = document.querySelector('#btn-signup');
const btnCWLogin = document.querySelector('#btn-cwlogin');

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
    staffId;
    password;
    type = 'teacher';
    constructor(firstName,lastName,email,staffId,password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.staffId = staffId;
      this.password = password;
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
        btnSignup.addEventListener('click', this._checkingByClicking.bind(this));
        btnCWLogin.addEventListener('click', this._locationToLogin.bind(this));
    }
    
    _locationToLogin(e){
        e.preventDefault();
        location.href = "https://akashraman.github.io/CodeAlgo-TeacherLogin/"
    }

    _getLocalStorage(){
        this.#currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
        this.#accounts = JSON.parse(localStorage.getItem('accounts'));
        if(!this.#accounts) this.#accounts = [];
        console.log(this.#accounts);
        console.log(this.#currentAccount);
    }

    _checkingByClicking(e){
        e.preventDefault();
        const firstName = firstNameBox.value;
        const lastName = lastNameBox.value;
        const email = emailBox.value;
        const staffId = staffIdBox.value;
        const password = passwordBox.value;

        if(!(firstName&&lastName&&email&&staffId&&password)){
            alert("Enter every details");
            return ;
        }

        this._setCurrentAccount(firstName,lastName,email,staffId,password);
    }

    _checkingByEntering(e){
        

        if(e.keyCode === 13){
            e.preventDefault();
            const firstName = firstNameBox.value;
            const lastName = lastNameBox.value;
            const email = emailBox.value;
            const staffId = staffIdBox.value;
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
                staffIdBox.focus(); 
                return ;
            }
            
            if (staffIdBox === document.activeElement){
                passwordBox.focus(); 
                return ;
            }
            
            this._setCurrentAccount(firstName,lastName,email,staffId,password);
        }
    }

    _setCurrentAccount(firstName,lastName,email,staffId,password){

        if (!email.includes('@')){
            alert('Invalid Email');
            return;
        }

        const foundedAccount = this.#accounts.find(
            account => (account.type == 'teacher' && (account.email === email || account.staffId === staffId))
          );

        if(foundedAccount){
            alert('There is a matching account');
            return ;
        }


        this.#currentAccount = new Teacher(firstName,lastName,email,staffId,password);
        this.#accounts.push(this.#currentAccount)
        localStorage.setItem('currentAccount',JSON.stringify(this.#currentAccount));
        localStorage.setItem('accounts',JSON.stringify(this.#accounts));
        location.href = "https://akashraman.github.io/CodeAlgo/";
    }
}

const d = new Database();
