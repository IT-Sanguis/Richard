const btnOpenFeedback = document.querySelector(".btn--order");
const btnOpenDesign = document.querySelector(".design__btn");

const modalFeedback = document.querySelector(".modal.feedback");
const modalSuccess = document.querySelector(".modal--success");
const modalFailure = document.querySelector(".modal--failure");

const errorMessage = modalFailure.querySelector(".modal__error");

const btnCloseFeedback = modalFeedback.querySelector(".modal__btn-close");
const btnCloseSuccess = modalSuccess.querySelector(".modal__btn");
const btnCloseFailure = modalFailure.querySelector(".modal__btn");

const form = modalFeedback.querySelector(".form");

const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");

let lastFocus;

const FOCUSABLE_ELEMENT_SELECTORS = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), input[type="tel"]:not([disabled])';



const trapFocus = (element) => {
  let focusableEls = element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS);
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener("keydown", (e) => {
    let isTabPressed = (e.code === "Tab");

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) /* shift + tab */ {
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


const listenerBtn = (element) => {
  element.addEventListener("click", (evt) => {
    evt.preventDefault();
    lastFocus = document.activeElement;
    modalFeedback.classList.remove("modal--show");
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add("modal--show");
    trapFocus(modalFeedback);
    inputName.focus();
  });
}

listenerBtn(btnOpenFeedback);
listenerBtn(btnOpenDesign);


const closeModal = (element) => {
  element.classList.remove("modal--show");
  lastFocus.focus();
}

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


const formattingPhone = (phone) => {
  let val = phone.target.value.replace(/\D/g, "");

  if (val) {
    if (val[0] === "7" || val[0] === "8") {
      val = val.slice(1);
    }

    val = val.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

    val =
      "+7" +
      (val[1] ? " " + val[1] : "") +
      (val[2] ? " " + val[2] : "") +
      (val[3] ? "-" + val[3] : "") +
      (val[4] ? "-" + val[4] : "");
  }

  phone.target.value = val;
}

inputPhone.addEventListener("input", formattingPhone);


btnCloseFeedback.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(modalFeedback);
});

const submitForm = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  fetch(evt.target.action, {
    method: "POST",
    body: formData
  })
    // .then(response => response.text())
    .then(response => {
      if (response.ok) {
        return response.json();
        // console.log(response.message);
      } else {
        throw new Error('Server Error');
      }
    })
    .then(result => {
      if (!result.error) {
        console.log(result.message);
        modalFeedback.classList.remove("modal--show");
        modalSuccess.classList.remove("modal--show");
        modalSuccess.offsetWidth = modalSuccess.offsetWidth;
        modalSuccess.classList.add("modal--show");
        btnCloseSuccess.focus();
      } else {
        console.log(result.message);
        modalFailure.classList.remove("modal--show");
        errorMessage.textContent = result.message;
        modalFailure.classList.add("modal--show");
        btnCloseFailure.focus();
      }

    })
    .catch(error => {
      console.error(error);
      modalFailure.classList.remove("modal--show");
      modalSuccess.offsetWidth = modalSuccess.offsetWidth;
      modalFailure.classList.add("modal--show");
      btnCloseFailure.focus();
    });
}

form.addEventListener("submit", submitForm);

btnCloseSuccess.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(modalSuccess);
});

btnCloseFailure.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(modalFailure);
});

window.addEventListener("keydown", (evt) => {
  if (evt.code === "Escape") {
    if (modalFeedback.classList.contains("modal--show")) {
      evt.preventDefault();
      closeModal(modalFeedback);
    }
    if (modalSuccess.classList.contains("modal--show")) {
      evt.preventDefault();
      closeModal(modalSuccess);
    }
    if (modalFailure.classList.contains("modal--show")) {
      evt.preventDefault();
      closeModal(modalFailure);
    }
  }
});
