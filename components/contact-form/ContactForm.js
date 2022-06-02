/*==================== CONTACT FORM VALIDATION ====================*/
const form = document.querySelector(".contact__form");
const button = document.querySelector(".contact__button");
const sent = document.querySelector(".contact__sent");

const inputArr = Array.from(form);
const validInputArr = [];

inputArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validInputArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
button.addEventListener("click", buttonHandler);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);

  if (reg.test(inputValue)) {
    el.style.border = "1px solid rgb(0, 196, 0)";
    el.setAttribute("is-valid", "1");
    button.classList.remove("invalid-input");
    return;
  }

  el.style.border = "1px solid rgb(255, 0, 0)";
  el.setAttribute("is-valid", "0");
  button.classList.add("invalid-input");
}

function buttonHandler(e) {
  const isAllValid = [];
  validInputArr.forEach((el) => {
    isAllValid.push(el.getAttribute("is-valid"));
  });

  //TODO probably should be used && instead of &
  const isValid = isAllValid.reduce((acc, current) => {
    return acc & current;
  });

  if (!Boolean(Number(isValid))) {
    //block sending button
    e.preventDefault();
    button.classList.add("invalid-input");
    return;
  }
  const TOKEN = "5334344703:AAFkugs2Xrj_gFiqzsbUrKJD9Qkt28CHZA8";
  const CHAT_ID = "-1001582276476";
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  form.addEventListener("submit", function (e) {
    let message = `&#9989; <i>Заявка с сайта!</i>\n`;
    message += "<b>Отправитель: </b>" + inputArr[0].value + "\n";
    message += "<b>Почта: </b>" + inputArr[1].value + "\n";
    message += "<b>сообщение: </b>" + inputArr[2].value + "\n";

    // where it's defined?
    axios
      .post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then(() => {
        //form reset
        sent.classList.add("contact__done");
        form.reset();
        setTimeout(() => {
          sent.classList.remove("contact__done");
        }, 2000);
        const reset = inputArr.forEach((el) => {
          el.style.border = "none";
        });
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        console.log("sent");
      });
    e.preventDefault();
  });
}
