(function () {

function dismissPopup(){
    const dialogs = document.querySelectorAll("yt-confirm-dialog-renderer");

    dialogs.forEach(dialog => {
        const confirmBtn = dialog.querySelector("#confirm-button");

        if(confirmBtn){
            confirmBtn.click();
        }
    });

    const v = document.querySelector("video");
    if(v && v.paused){
        v.play().catch(()=>{});
    }
}

function onVideoChange(){
    let tries = 0;

    const t = setInterval(()=>{
        dismissPopup();
        tries++;

        if(tries > 30) clearInterval(t);
    },100);
}

document.addEventListener("yt-navigate-start", onVideoChange);

})();


const style = document.createElement("style");
style.textContent = `
yt-confirm-dialog-renderer,
tp-yt-paper-dialog,
tp-yt-iron-overlay-backdrop {
    display: none !important;
}
`;
document.documentElement.appendChild(style);


setInterval(() => {
    document.dispatchEvent(
        new MouseEvent("mousemove", {bubbles:true})
    );
}, 240000);