export const changeExitWithEntry = () => {
    const exitLi = document.querySelector('#entry_close');
    const textItem  = exitLi.querySelector('#entry_close_text');
    const link  = exitLi.querySelector('#entry_close_link');
    link.href = '../login/login.html';
    textItem.innerHTML = 'Вход';
};