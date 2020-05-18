export let ToastCiYun = function(isShow) {
    //保证只有一个loading
    try {
        document.body.removeChild(document.querySelector('div.toast-loading'));
    } catch (e) {}
    //开始创造
    let toast = document.createElement('div');
    toast.classList.add('toast-loading');
    toast.style.animationDuration = 1000 + 's';
    //提升loading在对顶部
    toast.style['z-index'] = 9999999;
    document.body.appendChild(toast);
    if (isShow != "loadingOpen") {
        document.body.removeChild(toast);
    }
};