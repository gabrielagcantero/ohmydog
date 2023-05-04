alert("toy funcionando2")

window.onload= function change(){
    localStorage.setItem('colorSetting', '#a4509b');
    document.getElementById("jorge").style="padding: 500px";
    alert("toy funcionando");
    console.log(localStorage.getItem('colorSetting'));
}
