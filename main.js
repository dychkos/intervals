const checkboxes = document.querySelectorAll('[type="checkbox"]');

const checks = [...checkboxes]



console.log(checks)

checks.forEach(ch =>{
    ch.onclick=() =>{
        return ch;
        
    }
    
    return ch.setAttribute('disabled','disabled');
})

