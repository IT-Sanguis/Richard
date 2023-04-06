const btnOpenFeedback = document.querySelector(".btn--order");
const btnOpenDesign = document.querySelector(".design__btn");

const modalFeedback = document.querySelector(".modal.feedback");
const modalSuccess = document.querySelector(".modal--success");
const modalFailure = document.querySelector(".modal--failure");

const btnCloseFeedback = modalFeedback.querySelector(".modal__btn-close");
const btnCloseSuccess = modalSuccess.querySelector(".modal__btn");
const btnCloseFailure = modalFailure.querySelector(".modal__btn");

const form = modalFeedback.querySelector(".form");

const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");

const FOCUSABLE_ELEMENT_SELECTORS = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), input[type="tel"]:not([disabled])';



function trapFocus(element) {
  let focusableEls = element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS);
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function(e) {
    let isTabPressed = (e.code === "Tab");

    if (!isTabPressed) {
      return;
    }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
          e.preventDefault();
        }
      }
  });
}

btnOpenFeedback.addEventListener("click", function (evt) {
  evt.preventDefault();
  lastFocus = document.activeElement;
  modalFeedback.classList.remove("modal--show");
  modalFeedback.offsetWidth = modalFeedback.offsetWidth;
  modalFeedback.classList.add("modal--show");
  trapFocus(modalFeedback);
  inputName.focus();
});

btnOpenDesign.addEventListener("click", function (evt) {
  evt.preventDefault();
  lastFocus = document.activeElement;
  modalFeedback.classList.remove("modal--show");
  modalFeedback.offsetWidth = modalFeedback.offsetWidth;
  modalFeedback.classList.add("modal--show");
  trapFocus(modalFeedback);
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
  modalFeedback.classList.remove("modal--show");
  lastFocus.focus();
});

// form.addEventListener("submit", function(evt) {
//     modalSuccess.classList.remove("modal--show");
//     modalFeedback.classList.remove("modal--show");
//     modalSuccess.offsetWidth = modalSuccess.offsetWidth;
//     modalSuccess.classList.add("modal--show");
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
      modalFeedback.classList.remove("modal--show");
      modalSuccess.classList.remove("modal--show");
      modalSuccess.offsetWidth = modalSuccess.offsetWidth;
      modalSuccess.classList.add("modal--show");
      btnCloseSuccess.focus();
    })
    .catch(error => {
      console.error(error);
      // modalFeedback.classList.remove("modal--show");
      modalFailure.classList.remove("modal--show");
      modalFailure.offsetWidth = modalFailure.offsetWidth;
      modalFailure.classList.add("modal--show");
      btnCloseFailure.focus();
    });
}

form.addEventListener('submit', submitForm);

btnCloseSuccess.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalSuccess.classList.remove("modal--show");
  lastFocus.focus();
});

btnCloseFailure.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalFailure.classList.remove("modal--show");
  lastFocus.focus();
});

window.addEventListener("keydown", function (evt) {
  if (evt.code === "Escape") {
    if (modalFeedback.classList.contains("modal--show")) {
      evt.preventDefault();
      modalFeedback.classList.remove("modal--show");
      lastFocus.focus();
    }
    if (modalSuccess.classList.contains("modal--show")) {
      evt.preventDefault();
      modalSuccess.classList.remove("modal--show");
      lastFocus.focus();
    }
    if (modalFailure.classList.contains("modal--show")) {
      evt.preventDefault();
      modalFailure.classList.remove("modal--show");
      lastFocus.focus();
    }
  }
});
