import {of} from "rxjs";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;


of("test").subscribe(s => {
  appDiv.innerHTML = s;
})
