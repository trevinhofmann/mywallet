function handleIndexNewButtonClick(){
    alert('I should make a new wallet now.');
}

function handleIndexLoginButtonClick(){
    alert('I should ask how you want to log in now.');
}

$('#index-new-button').on('click', handleIndexNewButtonClick);
$('#index-login-button').on('click', handleIndexLoginButtonClick);