const btnOpenFeedback = document.querySelector(".btn--order");

const modalFeedback = document.querySelector(".modal__window.feedback");
const modalSuccess = document.querySelector(".modal__window--success");
const modalFailure = document.querySelector(".modal__window--failure");

const btnCloseFeedback = modalFeedback.querySelector(".modal__btn-close");
const btnCloseSuccess = modalSuccess.querySelector(".modal__btn");
const btnCloseFailure = modalFailure.querySelector(".modal__btn");

const form = modalFeedback.querySelector(".form");

const inputName = document.getElementById("name");
const inputPhone = document.getElementById("phone");

btnOpenFeedback.addEventListener("click", function (evt) {
  evt.preventDefault();
  lastFocus = document.activeElement;
  modalFeedback.classList.remove("modal__window--show");
  modalFeedback.offsetWidth = modalFeedback.offsetWidth;
  modalFeedback.classList.add("modal__window--show");
  inputName.focus();
});

let lastFocus;

function phoneMask(evt) {
  let val = evt.target.value.replace(/\D/g, "");

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

  evt.target.value = val;
}

inputPhone.addEventListener("input", phoneMask);

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
