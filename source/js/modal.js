const btnOpenFeedback = document.querySelector(".btn--order");
const btnOpenDesign = document.querySelector(".design__btn");

const modalFeedback = document.querySelector(".modal__window.feedback");
const modalSuccess = document.querySelector(".modal__window--success");
const modalFailure = document.querySelector(".modal__window--failure");

const btnCloseFeedback = modalFeedback.querySelector(".modal__btn-close");
const btnCloseSuccess = modalSuccess.querySelector(".modal__btn");
const btnCloseFailure = modalFailure.querySelector(".modal__btn");

const form = modalFeedback.querySelector(".form");

const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");


btnOpenFeedback.addEventListener("click", function (evt) {
  evt.preventDefault();
  lastFocus = document.activeElement;
  modalFeedback.classList.remove("modal__window--show");
  modalFeedback.offsetWidth = modalFeedback.offsetWidth;
  modalFeedback.classList.add("modal__window--show");
  inputName.focus();
});

btnOpenDesign.addEventListener("click", function (evt) {
  evt.preventDefault();
  lastFocus = document.activeElement;
  modalFeedback.classList.remove("modal__window--show");
  modalFeedback.offsetWidth = modalFeedback.offsetWidth;
  modalFeedback.classList.add("modal__window--show");
  inputName.focus();
});

let lastFocus;


// function validateName(name) {
//   if (name.trim() === "") {
//     return false;
//   }
//   const regex = /^[a-zA-Zа-яА-ЯёЁІіЇїЄє\s-]+$/;
//   if (!regex.test(name)) {
//     return false;
//   }
//   return true;
// }

// function validateEmail(email) {
//   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

//   return (email.value.trim() === "") || regex.test(email.value.trim());
// }

// function validateText(text) {
//   const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\.,!?()-]+$/;
//   return regex.test(textarea.value);
// }


function validatePhone(phone) {
  let val = phone.target.value.replace(/\D/g, "");

  if (val) {
    if (val[0] === "7" || val[0] === "8") {
      val = val.slice(1);
    }

    val = val.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    // val = val.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
    // val = val.match(/^(8|\+7)[\- ]?(\d{3})[\- ]?(\d{3})[\- ]?(\d{2})[\- ]?(\d{2})$/);
    val =
      "+7" +
      (val[1] ? " " + val[1] : "") +
      (val[2] ? " " + val[2] : "") +
      (val[3] ? "-" + val[3] : "") +
      (val[4] ? "-" + val[4] : "");
  }

  // const phonePattern = /^(8|\+7)[\- ]?(\d{3})[\- ]?(\d{3})[\- ]?(\d{2})[\- ]?(\d{2})$/;
  //   if (!phonePattern.test(val)) {
  //   return false;
  // }

  phone.target.value = val;
}

// inputName.addEventListener("input", validateName);
inputPhone.addEventListener("input", validatePhone);
// inputEmail.addEventListener("input", validateEmail);


btnCloseFeedback.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalFeedback.classList.remove("modal__window--show");
  lastFocus.focus();
});

// form.addEventListener("submit", function(evt) {
//     modalSuccess.classList.remove("modal__window--show");
//     modalFeedback.classList.remove("modal__window--show");
//     modalSuccess.offsetWidth = modalSuccess.offsetWidth;
//     modalSuccess.classList.add("modal__window--show");
// });

function submitForm(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target); // получаем данные из формы
  fetch(evt.target.action, {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(result => {
      modalFeedback.classList.remove("modal__window--show");
      modalSuccess.classList.remove("modal__window--show");
      modalSuccess.offsetWidth = modalSuccess.offsetWidth;
      modalSuccess.classList.add("modal__window--show");
      btnCloseSuccess.focus();
    })
    .catch(error => {
      console.error(error);
      // modalFeedback.classList.remove("modal--show");
      modalFailure.classList.remove("modal__window--show");
      modalFailure.offsetWidth = modalFailure.offsetWidth;
      modalFailure.classList.add("modal__window--show");
      btnCloseFailure.focus();
    });
}

form.addEventListener('submit', submitForm);

btnCloseSuccess.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalSuccess.classList.remove("modal__window--show");
  lastFocus.focus();
});

btnCloseFailure.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalFailure.classList.remove("modal__window--show");
  lastFocus.focus();
});

window.addEventListener("keydown", function (evt) {
  if (evt.code === "Escape") {
    if (modalFeedback.classList.contains("modal__window--show")) {
      evt.preventDefault();
      modalFeedback.classList.remove("modal__window--show");
      lastFocus.focus();
    }
    if (modalSuccess.classList.contains("modal__window--show")) {
      evt.preventDefault();
      modalSuccess.classList.remove("modal__window--show");
      lastFocus.focus();
    }
    if (modalFailure.classList.contains("modal__window--show")) {
      evt.preventDefault();
      modalFailure.classList.remove("modal__window--show");
      lastFocus.focus();
    }
  }
});
