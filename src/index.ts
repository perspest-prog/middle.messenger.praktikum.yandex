import Button from "./components/button";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('body');
    
    const btn = new Button({label: "Click!"});

    console.log(btn)
    root?.append(btn.getContent()!)
})
