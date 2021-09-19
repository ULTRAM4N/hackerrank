const puppeteer = require("puppeteer");
const { answers } = require("./answers");
let ctab;
const openBrowser = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  slowMo: 2,
  args: ["--start-maximized"],
});
openBrowser
  .then(function (browser) {
    const pagesArrPromise = browser.pages();
    return pagesArrPromise;
  })
  .then(function (browserPages) {
    ctab = browserPages[0];
    let homPage = ctab.goto("https://www.hackerrank.com/auth/login");
    return homPage;
  })
  .then(function () {
    let emailID = waitAndType(
      "div>input[type='text']",
      "hurtaterde@yevme.com",
      ctab
    );
    return emailID;
  })
  .then(function () {
    let pswrd = waitAndType("div>input[type='password']", "Codey@123", ctab);
    return pswrd;
  })
  .then(function () {
    let clik = ctab.click(
      "button.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return clik;
  })
  .then(function () {
    let clik2 = waitAndClick("li>[data-attr1='algorithms']", ctab);
    return clik2;
  })
  .then(function () {
    let warmupClick = waitAndClick(
      "div>.filters>div input[value='warmup']",
      ctab
    );
    return warmupClick;
  })
  .then(function () {
    let waitFor3Sec = ctab.waitFor(1000);
    return waitFor3Sec;
  })
  .then(function () {
    let allquestn = ctab.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 1 }
    );
    return allquestn;
  })
  .then(function (questionArr) {
    console.log("no of question", questionArr.length);
    let qutnWillBeSolved = questionSolver(ctab, questionArr[0], answers[0]);
    return qutnWillBeSolved;
  });

// ----------------------------------------------------------------------
function waitAndClick(selector, ctab) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = ctab.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModal = ctab.click(selector, { delay: 1, visible: true });
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

//---------------------------------------------------------------
function waitAndType(selector, text, ctab) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = ctab.waitForSelector(selector, text);
    waitForModelPromise
      .then(function () {
        let typeModal = ctab.type(selector, text, { visible: true, delay: 1 });
        return typeModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

//------------------------------------------------------------
function questionSolver(ctab, question, answer) {
  return new Promise(function (resolve, reject) {
    let clickQutn = question.click();
    clickQutn
      .then(function () {
        let goToEditor = waitAndClick(".monaco-editor.no-user-select.vs", ctab);
        return goToEditor;
      })
      .then(function () {
        //custom input ke check button ko click kra h
        return waitAndClick(".checkbox-input", ctab);
      })
      .then(function () {
        // custom input editor ko open kra
        return ctab.waitForSelector("textarea.custominput", { visible: true });
      })
      .then(function () {
        // custom input m humne code type kr dia
        return ctab.type("textarea.custominput", answer, { delay: 1 });
      })
      .then(function () {
        // custom I/P se cut krke editor pr paste krna h-->ctrl+A -->ctrl+X--> ctrl+V;
        let ctrlIsPressed = ctab.keyboard.down("Control");
        return ctrlIsPressed;
      })
      .then(function () {
        let aIsPressed = ctab.keyboard.press("A");
        return aIsPressed;
      })
      .then(function () {
        let XisPressed = ctab.keyboard.press("X");
        return XisPressed;
      })
      .then(function () {
        let ctrlIsUp = ctab.keyboard.up("Control");
        return ctrlIsUp;
      })
      .then(function () {
        let goBackToEditor = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          ctab
        );
        return goBackToEditor;
      })
      .then(function () {
        // custom I/P se cut krke editor pr paste krna h-->ctrl+A -->ctrl+X--> ctrl+V;
        let ctrlIsPressed = ctab.keyboard.down("Control");
        return ctrlIsPressed;
      })
      .then(function () {
        let aIsPressed = ctab.keyboard.press("A");
        return aIsPressed;
      })
      .then(function () {
        let VisPressed = ctab.keyboard.press("V");
        return VisPressed;
      })
      .then(function () {
        let finalSubmit = waitAndClick(
          ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",
          ctab
        );
        return finalSubmit;
      });
  });
}
