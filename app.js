const app = document.getElementById('app');
const input = app.querySelector('input');
const clearValue = app.querySelector('.top').querySelector('button');

clearValue.onclick = ()=>{
    input.value = '';
    app.querySelector('#p').textContent = '';
};

let test = true;
let point = true;
function add(id){
    if( id !== app.querySelector('.bottom').getElementsByTagName('button')[0] ){
        if(
            (
                (
                    input.value === '' &&
                    id.parentElement !== app.querySelector('.sing')
                ) ||
                (
                    input.value !== '' &&
                    id.parentElement === app.querySelector('.sing')
                ) 
            ) && 
            (
                id.parentElement === app.querySelector('.sing') && 
                test 
            ) || 
            id.parentElement === app.querySelector('.number') || 
            id.parentElement === app.querySelector('.bottom')

        ) input.value += id.textContent;

        if( id.parentElement === app.querySelector('.number') )
            test = true;
        else
            test = false;

        if( id.parentElement === app.querySelector('.sing') ) 
            point = true;
        
    }else if(point){
        input.value += id.textContent;
        point = false;
    }

};

let sing = app.querySelector('.sing').getElementsByTagName('button');
let sorting = [''];
let value = '';
function boolee(n){
    for(let i = 0; i < sing.length; i++){
        if( sing[i].textContent === value[n])
            return true;
    }
    return false;
};
function start(){
    if( test && input.value !== ''){
        value = input.value;
        app.querySelector('.old').textContent = value;
        A(0);
    }
};
function A(i){
    if( i < value.length ){
        if (boolee(i)){
            B(i);
        }else{
            sorting[ sorting.length - 1 ] +=  value[i];
            A(i+1);
        }
    }else{
        function test(s){
            for(let i = 0; i < 4; i++){
                if(s === sing[i].textContent){
                    return false;
                }
            }
            return true;
        };
        for(let i = 0; i < sorting.length; i++){
            if( test(sorting[i]) )
                sorting[i] = Number(sorting[i]);
        };
        end();

    }      
};
function B(i){
    sorting.push(value[i]);
    sorting.push('');
    A(i + 1);
};

let whereSing = [];
function where(sing){
    whereSing = [];
    for(let i = 0; i < sorting.length; i++){
        if( sing === sorting[i] )
            whereSing.push(i);
    }
};
function end(){
    where('*');
    let a;
    while(whereSing.length !== 0){
        a = sorting[ whereSing[0] - 1] * sorting[ whereSing[0] + 1];
        sorting.splice(whereSing[0] - 1, 3, a);
        where('*');
    }
    where('/');
    while(whereSing.length !== 0){
        a = sorting[ whereSing[0] - 1] / sorting[ whereSing[0] + 1];
        sorting.splice(whereSing[0] - 1, 3, a);
        where('/');
    }
    where('+');
    while(whereSing.length !== 0){
        a = sorting[ whereSing[0] - 1] + sorting[ whereSing[0] + 1];
        sorting.splice(whereSing[0] - 1, 3, a);
        where('+');
    }
    where('-');
    while(whereSing.length !== 0){
        a = sorting[ whereSing[0] - 1] - sorting[ whereSing[0] + 1];
        sorting.splice(whereSing[0] - 1, 3, a);
        where('-');
    }
    document.getElementById('p').textContent = sorting[0];
    app.querySelector('.old').textContent += ` = ${sorting[0]}`;
    sorting = [''];
};