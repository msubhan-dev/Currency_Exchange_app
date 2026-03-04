//const baase_url="https://latest.currency-api.pages.dev/v1/currencies";
const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");  // ✅ ADDED THIS

for(let select of dropdowns) {
    for(let currCode in countryList) {
       // console.log(currCode,countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="PKR"){
         newOption.selected="selected";
        } else if(select.name==="to" && currCode==="USD") { 
         newOption.selected="selected";
        }       
        select.append(newOption);
    }       
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(element)=>{
    //console.log(element)
    let currCode=element.value;
    console.log(currCode)
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};
const updateExchangeRate=async () =>{
 let amount=document.querySelector(".amount input");//("form input")udes kar sakta hn
    let amtV=amount.value;
    if(amtV===""|| amtV<=1){
        amtV=1;
        amount.value="1";
    }
    //console.log(fromCurr.value, toCurr.value);
    const URL=`${base_url}/${fromCurr.value.toLowerCase()}.json`
let respose= await fetch(URL);
let data = await respose.json();
let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
console.log(rate);
let finalAmount=amtV*rate;
msg.innerText =`${amtV} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
};
btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
});