function button_nastroyki_f(){
    $('#modal_settings').modal('show');
}

var image_schotchik = 0;
function change_background(){
    if (image_schotchik > 26) image_schotchik = 1;
    else{
        image_schotchik++;
    }   
    var image_fon = "fon_" + image_schotchik + ".jpg";
    document.body.style.backgroundImage = 'url(/static/custom/css/'+image_fon +')';
    image_schotchik = parseInt(image_schotchik);
}


window.onload=function(){
    change_background();
    // setHeiHeight();
    black_brown();
    $('#r1_brat').css( 'padding-top', '7%' );
    $('#r2_brat').css( 'padding-top', '7%' );
    $('#r3_brat').css( 'padding-top', '7%' );
    $('#r4_brat').css( 'padding-top', '7%' );
    $('#r1_brat_0').css( 'padding-top', '7%' );
    $('#r2_brat_0').css( 'padding-top', '7%' );
    $('#r3_brat_0').css( 'padding-top', '7%' );
    $('#r4_brat_0').css( 'padding-top', '7%' );
    $('#r1_drug_1').css( 'padding-top', '7%' );
    $('#r1_drug_2').css( 'padding-top', '7%' );
    $('#r1_drug_3').css( 'padding-top', '7%' );
    $('#r1_drug_4').css( 'padding-top', '7%' );
    $('#r1_drug_5').css( 'padding-top', '7%' );
    $('#r2_drug_1').css( 'padding-top', '7%' );
    $('#r2_drug_2').css( 'padding-top', '7%' );
    $('#r2_drug_3').css( 'padding-top', '7%' );
    $('#r2_drug_4').css( 'padding-top', '7%' );
    $('#r2_drug_5').css( 'padding-top', '7%' );
    $('#r3_drug_1').css( 'padding-top', '7%' );
    $('#r3_drug_2').css( 'padding-top', '7%' );
    $('#r3_drug_3').css( 'padding-top', '7%' );
    $('#r3_drug_4').css( 'padding-top', '7%' );
    $('#r3_drug_5').css( 'padding-top', '7%' );
    $('#r4_drug_1').css( 'padding-top', '7%' );
    $('#r4_drug_2').css( 'padding-top', '7%' );
    $('#r4_drug_3').css( 'padding-top', '7%' );
    $('#r4_drug_4').css( 'padding-top', '7%' );
    $('#r4_drug_5').css( 'padding-top', '7%' );
    r1_spica_0();
    r2_spica_0();
    r3_spica_0();
    r4_spica_0();
    if (document.body.clientWidth < 600){
        r0_number.style.fontSize = 45;
        r1_number.style.fontSize = 45;
        r2_number.style.fontSize = 45;
        r3_number.style.fontSize = 45;
        r4_number.style.fontSize = 45;
        Editbox_otvet.style.height = 25; 
        Editbox_otvet.style.fontSize = 20;
        Editbox_otvet.disabled = true;
        Editbox_otvet.style.backgroundColor = "#000000"
        // abakus.style = "margin-left:25px; margin-right:25px";
    }  
    else{
        r0_number.style.fontSize = 60;
        r1_number.style.fontSize = 60;
        r2_number.style.fontSize = 60;
        r3_number.style.fontSize = 60;
        r4_number.style.fontSize = 60;
        Editbox_otvet.style.height = 130;
        Editbox_otvet.style.fontSize = 130;
        Editbox_otvet.disabled = false;
    }    
}
window.onresize=function(){
    if (document.body.clientWidth < 600){
        r0_number.style.fontSize = 45;
        r1_number.style.fontSize = 45;
        r2_number.style.fontSize = 45;
        r3_number.style.fontSize = 45;
        r4_number.style.fontSize = 45;
        Editbox_otvet.style.height = 25; 
        Editbox_otvet.style.fontSize = 20;
        Editbox_otvet.disabled = true;
        Editbox_otvet.style.backgroundColor = "#000000"
    }  
    else{
        r0_number.style.fontSize = 60;
        r1_number.style.fontSize = 60;
        r2_number.style.fontSize = 60;
        r3_number.style.fontSize = 60;
        r4_number.style.fontSize = 60;
        Editbox_otvet.style.height = 130;
        Editbox_otvet.style.fontSize = 130;
        Editbox_otvet.disabled = false;
    }   
}

var prav = 0, vip = 0;

var correct = ['Молодец!','Восхитительно!','Хорошо делаешь!','Это внушительно!','Невероятно!',
'Отлично!','Превосходно!','Прекрасно!','Поразительно!','Эффектно!','Ты преуспеваешь!',
'Потрясающе!','Остроумно!','Безупречная работа!','То, что надо!','Чудесно!',
'Изумительно!','Потрудился на совесть!','Уже лучше!','Хороший ответ!',
'Ты это заслужил!','Блистательнно!','Какой ты способный!','Так держать!','Ну, это событие!',
'Ты смог!','Хорошо получается!','Сейчас лучше!','Ты справился!','Ты умеешь считать!',
'Хорошо подготовился!','Ты считаешь играя!','Ты на правильном пути!','На высшем уровне!','Здорово!',
'Какой прогресс!','Это мне нравится!','Необыкновенно!','Блестяще!','Можешь гордиться!',
'Замечательно!','Красота!','Нет слов!','Мастерски!','Ты настоящий мастер!',
'Это гениально!','Хорошо получается!','У тебя светлая голова!','Приятно смотреть!','Очаровательно!',
'Ты ссобразителен!','Разумный ответ!','Стоящая работа!','Это достойно похвалы!','Ты прав!',
'Захватывающе!','Правильный ответ!','Правильно!','Другой уровень!'];


function skorost_1(){

    var t = Math.abs(parseFloat(prompt("Введите интервал времени задержки в пределах 100 мсек до 3000 мсек")));
    if (isNaN(t) || t <= 0) document.getElementById('Skorost_tablo').innerHTML = 1000;
    else{
        document.getElementById('Skorost_tablo').innerHTML = t;
        document.getElementById('navbar_interval').innerHTML = "(" + t + ")"; 
    }
    
}

function skorost_plus(){
    var i = parseInt(document.getElementById('Skorost_tablo').innerHTML);
    i += 100;
    document.getElementById('Skorost_tablo').innerHTML = i;
    document.getElementById('navbar_interval').innerHTML = "(" + i + "мсек)"; 
}
    
function skorost_minus(){
    var i = parseInt(document.getElementById('Skorost_tablo').innerHTML);
    if (i > 5){
        i -= 100;
        if (i == 0) i = 5;
        document.getElementById('Skorost_tablo').innerHTML = i;
        document.getElementById('navbar_interval').innerHTML = "(" + i + "мсек)"; 
    }
    
}


function get_r1(n){
    r1_spica_0();

    switch (n){
        case 0:  break;
        case 1: r1_drug_2_f(); break;
        case 2: r1_drug_3_f(); break;
        case 3: r1_drug_4_f(); break;
        case 4: r1_drug_5_f(); break;
        case 5: r1_brat_0_f(); break;
        case 6: r1_brat_0_f(); r1_drug_2_f();  break;
        case 7: r1_brat_0_f(); r1_drug_3_f();  break;
        case 8: r1_brat_0_f(); r1_drug_4_f();  break;
        case 9: r1_brat_0_f(); r1_drug_5_f();  break;
    }
}

function get_r2(n){
    r2_spica_0();

    switch (n){
        case 0:  break;
        case 1: r2_drug_2_f(); break;
        case 2: r2_drug_3_f(); break;
        case 3: r2_drug_4_f(); break;
        case 4: r2_drug_5_f(); break;
        case 5: r2_brat_0_f(); break;
        case 6: r2_brat_0_f(); r2_drug_2_f();  break;
        case 7: r2_brat_0_f(); r2_drug_3_f();  break;
        case 8: r2_brat_0_f(); r2_drug_4_f();  break;
        case 9: r2_brat_0_f(); r2_drug_5_f();  break;
    }
}

function get_r3(n){
    r3_spica_0();

    switch (n){
        case 0:  break;
        case 1: r3_drug_2_f(); break;
        case 2: r3_drug_3_f(); break;
        case 3: r3_drug_4_f(); break;
        case 4: r3_drug_5_f(); break;
        case 5: r3_brat_0_f(); break;
        case 6: r3_brat_0_f(); r3_drug_2_f();  break;
        case 7: r3_brat_0_f(); r3_drug_3_f();  break;
        case 8: r3_brat_0_f(); r3_drug_4_f();  break;
        case 9: r3_brat_0_f(); r3_drug_5_f();  break;
    }
}

function get_r4(n){
    r4_spica_0();

    switch (n){
        case 0:  break;
        case 1: r4_drug_2_f(); break;
        case 2: r4_drug_3_f(); break;
        case 3: r4_drug_4_f(); break;
        case 4: r4_drug_5_f(); break;
        case 5: r4_brat_0_f(); break;
        case 6: r4_brat_0_f(); r4_drug_2_f();  break;
        case 7: r4_brat_0_f(); r4_drug_3_f();  break;
        case 8: r4_brat_0_f(); r4_drug_4_f();  break;
        case 9: r4_brat_0_f(); r4_drug_5_f();  break;
    }
}

var audio = new Audio();

function soundClick2(u,r) {
    var t = 0;
    var music = "";
    if (r == 1){
        switch (u){
            case 0: 
                t = random_between(1,48);   
                music = 'incorrect-'+ t   + '.mp3';
            break;
            case 1:
                t = random_between(1,19);   
                music = 'correct-'+ t   + '.mp3';
            break;
            case 2:
                t = random_between(1,58);   
                music = 'present-'+ t   + '.mp3';
            break;
            
        }
        audio.src = "/static/custom/audio/" + music;
        audio.autoplay = true;
    }
    else audio.autoplay = false;
}



function soundClick(n) {
  // var audio = new Audio(); 
    switch (n){
        case 1: 
            audio.src = '/static/custom/audio/snd_1.mp3'; // Указываем путь к звуку "клика"
            audio.autoplay = true;
        break;
        
        case 2: 
            audio.src = '/static/custom/audio/snd_2.mp3'; // Указываем путь к звуку "клика"
            audio.autoplay = true;
        break;

        case 3: 
            audio.src = '/static/custom/audio/snd_3.mp3'; // Указываем путь к звуку "клика"
            audio.autoplay = true;
        break;

        case 4: 
            audio.src = '/static/custom/audio/snd_4.mp3'; // Указываем путь к звуку "клика"
            audio.autoplay = true;
        break;  
    } 
}

function random_between(n,m){
    var t = n + randomInteger(m - n);
    return t;
}


function randomInteger (n) {
    var d = Math.floor(Math.random()*(n-0.0001))
    return d;
}

document.onkeyup = function (e) {
    e = e || window.event;
    if ((e.keyCode === 13 || e.keyCode === 32) && enter_available == true) {
        start_2();
    }
    return false;
}

var enter_available = true, started = false;

function generate_abakus(){
    switch(Kolcifr){
                case 1:
                    r1 = random_between(1,10);
                    get_r1(r1);
                break;
                case 2:
                    r1 = random_between(0,10);
                    get_r1(r1);
                    r2 = random_between(1,10);
                    get_r2(r2);
                break;    
                case 3:
                    r1 = random_between(0,10);
                    get_r1(r1);
                    r2 = random_between(0,10);
                    get_r2(r2);
                    r3 = random_between(1,10);
                    get_r3(r3);
                break;  
                case 4:
                    r1 = random_between(0,10);
                    get_r1(r1);
                    r2 = random_between(0,10);
                    get_r2(r2);
                    r3 = random_between(0,10);
                    get_r3(r3);
                    r4 = random_between(1,10);
                    get_r4(r4);
                break; 
            }
}

function restart(){
    prav = 0;
    vip = 0;
    show_pravilno();
}
function visibe_abakus(){
    window_otvet.classList.remove('black_style');
    window_otvet.classList.add('white_style');
    document.getElementById('abakus').style.visibility = "visible";
    switch (Kolcifr){
        case 1: 
            t = document.getElementsByClassName('razrad_1');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r1_number").style.visibility = "hidden";
        break;
        case 2:
            t = document.getElementsByClassName('razrad_1');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r1_number").style.visibility = "hidden";
            t = document.getElementsByClassName('razrad_2');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r2_number").style.visibility = "hidden";
        break;
        case 3:
            t = document.getElementsByClassName('razrad_1');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r1_number").style.visibility = "hidden";
            t = document.getElementsByClassName('razrad_2');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r2_number").style.visibility = "hidden"; 
            t = document.getElementsByClassName('razrad_3');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r3_number").style.visibility = "hidden";
        break;
        case 4: 
            t = document.getElementsByClassName('razrad_1');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r1_number").style.visibility = "hidden";
            t = document.getElementsByClassName('razrad_2');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r2_number").style.visibility = "hidden"; 
            t = document.getElementsByClassName('razrad_3');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r3_number").style.visibility = "hidden";
            t = document.getElementsByClassName('razrad_4');
            for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
            document.getElementById("r4_number").style.visibility = "hidden";
        break;

    }
}

function hide_abakus(){
    window_otvet.classList.remove('white_style');
    window_otvet.classList.add('black_style');
    document.getElementById("r1_number").style.visibility = "hidden";
    document.getElementById("r2_number").style.visibility = "hidden";
    document.getElementById("r3_number").style.visibility = "hidden";
    document.getElementById("r4_number").style.visibility = "hidden";
    t = document.getElementsByClassName('razrad_1');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";
    t = document.getElementsByClassName('razrad_2');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";
    t = document.getElementsByClassName('razrad_3');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";
    t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";    
}

function show_pravilno(){
    if (vip == 0) x = 0;
    else x = parseInt(prav/vip*100); 
    document.getElementById('pravilno_progress').style.width = x + "%";
    document.getElementById('navbar_pravilno_progress').style.width = x + "%";
    document.getElementById('navbar_pravilno_text').innerHTML = "Правильно " + prav + " из " + vip + " (" + x + "%)";
    document.getElementById('pravilno_text').innerHTML = "Правильно " + prav + " из " + vip + " (" + x + "%)";
    vip = parseInt(vip);
    prav = parseInt(prav);
}

function show_abakus(){
    r1_spica_0();
    r2_spica_0();
    r3_spica_0();
    r4_spica_0();
     var t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].classList.remove("hidden");
    var t = document.getElementsByClassName('sprava_pusto');
    for (var i = 0; i<t.length; i++) t[i].classList.add("hidden");
    var t = document.getElementsByClassName('razrad_1');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
    t = document.getElementsByClassName('razrad_2');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
    t = document.getElementsByClassName('razrad_3');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
    t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
}

function start_2(){
    var skorost = parseInt(document.getElementById('Skorost_tablo').innerHTML);
    switch(document.getElementById('button_start').innerHTML){
        case "►":
            switch (Kolcifr){
                case 1: kolcifr_1(); break;
                case 2: kolcifr_2(); break;
                case 3: kolcifr_3(); break;
                case 4: kolcifr_4(); break;
            }
            started = true;
            window_otvet.classList.remove("panel-danger", "panel-success");  
            window_otvet.classList.add("panel-primary");  
            Editbox_otvet.value = "";
            if (document.body.clientWidth > 600){
                document.getElementById("Editbox_otvet").focus();
                Editbox_otvet.style.fontSize = 120;
            }    
            document.getElementById('button_start').innerHTML = "✐";
            r1_spica_0();
            r2_spica_0();
            r3_spica_0();
            r4_spica_0();
            hide_abakus();
            enter_available = false;
            setTimeout("visibe_abakus(); soundClick(2);", 300);
            generate_abakus();
            setTimeout("hide_abakus(); enter_available = true; soundClick(2)", skorost+300);
        break;    
        case "✐":
            visibe_abakus();

            switch (Kolcifr){
                case 1: 
                    document.getElementById("r1_number").style.visibility = "visible"; 
                break;
                case 2: 
                    document.getElementById("r1_number").style.visibility = "visible";
                    document.getElementById("r2_number").style.visibility = "visible";
                break;
                case 3: 
                    document.getElementById("r1_number").style.visibility = "visible";
                    document.getElementById("r2_number").style.visibility = "visible";
                    document.getElementById("r3_number").style.visibility = "visible";
                break;
                case 4: 
                    document.getElementById("r1_number").style.visibility = "visible";
                    document.getElementById("r2_number").style.visibility = "visible";
                    document.getElementById("r3_number").style.visibility = "visible";
                    document.getElementById("r4_number").style.visibility = "visible";
                break;
            }
            document.getElementById('button_start').innerHTML = "►"; 
            vip++;
            if (Editbox_otvet.value == parseInt(schot())){
                window_otvet.classList.remove("panel-danger");  
                window_otvet.classList.add("panel-success"); 
                soundClick(3); 
                // soundClick2(1,1);
                if (document.body.clientWidth < 600) Editbox_otvet.style.fontSize = 20; else Editbox_otvet.style.fontSize = 31;   
                Editbox_otvet.value = correct[randomInteger(59)];
                prav++;

            } 
            else{
                soundClick(4); 
                // soundClick2(0,1);
                 if (document.body.clientWidth < 600) Editbox_otvet.style.fontSize = 20; else Editbox_otvet.style.fontSize = 50;                 
                Editbox_otvet.value = "Ошибочка";
                window_otvet.classList.remove("panel-success"); 
                window_otvet.classList.add("panel-danger");     
            } 
            show_pravilno();
        break;
    }     
}



function button_nastroyki_f(){
        $('#modal_settings').modal('show');
    }

function kolcifr_1() {
    r1_spica_0();
    r2_spica_0();
    r3_spica_0();
    r4_spica_0();
    var t = document.getElementsByClassName('sprava_pusto');
    for (var i = 0; i<t.length; i++){
        t[i].classList.remove("hidden");
        t[i].style.visibility = "hidden";
    }    
    t = document.getElementsByClassName('razrad_2');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";
    t = document.getElementsByClassName('razrad_3');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";
    t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].classList.add("hidden");
    if (started == false){
        t = document.getElementsByClassName('razrad_1');
        for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
    }
    Button_Kolcifr_1.classList.add("active");
    Button_Kolcifr_2.classList.remove("active");
    Button_Kolcifr_3.classList.remove("active");
    Button_Kolcifr_4.classList.remove("active");
    document.getElementById('navbar_slojnost').innerHTML = '(1)';
    Kolcifr = 1;
}

function kolcifr_2() {
    r1_spica_0();
    r2_spica_0();
    r3_spica_0();
    r4_spica_0();
    Button_Kolcifr_2.classList.add("active");
    Button_Kolcifr_1.classList.remove("active");
    Button_Kolcifr_3.classList.remove("active");
    Button_Kolcifr_4.classList.remove("active");
    document.getElementById('navbar_slojnost').innerHTML = '(10)';
    Kolcifr = 2;
    var t = document.getElementsByClassName('sprava_pusto');
    for (var i = 0; i<t.length; i++){
        t[i].classList.remove("hidden");
        t[i].style.visibility = "hidden";
    }
    if (started == false){    
        t = document.getElementsByClassName('razrad_2');
        for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
    }
    t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].classList.add("hidden");
         t = document.getElementsByClassName('razrad_3');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";

}


function kolcifr_3() {
    r1_spica_0();
    r2_spica_0();
    r3_spica_0();
    r4_spica_0();
    Button_Kolcifr_1.className = "btn btn-default ";
    Button_Kolcifr_2.className = "btn btn-default ";
    Button_Kolcifr_3.classList.add("active");
    Button_Kolcifr_4.classList.remove("active");
    document.getElementById('navbar_slojnost').innerHTML = '(100)';
    Kolcifr = 3;
    var t = document.getElementsByClassName('sprava_pusto');
    for (var i = 0; i<t.length; i++){
        t[i].classList.add("hidden");
    }    
    
    t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].style.visibility = "hidden";
    t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].classList.remove("hidden");
    if (started == false){
        t = document.getElementsByClassName('razrad_3');
        for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
        t = document.getElementsByClassName('razrad_2');
        for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
    }        
}

function kolcifr_4() {
    Button_Kolcifr_1.className = "btn btn-default";
    Button_Kolcifr_2.className = "btn btn-default";
    Button_Kolcifr_3.classList.remove("active");
    Button_Kolcifr_4.classList.add("active");
    document.getElementById('navbar_slojnost').innerHTML = '(1000)';
    Kolcifr = 4;
    var t = document.getElementsByClassName('sprava_pusto');
    for (var i = 0; i<t.length; i++){
        t[i].classList.add("hidden");
    }    
    
    t = document.getElementsByClassName('razrad_4');
    for (var i = 0; i<t.length; i++) t[i].classList.remove("hidden");
    t = document.getElementsByClassName('razrad_3');
    for (var i = 0; i<t.length; i++) t[i].classList.remove("hidden");
        
    if (started == false){
         t = document.getElementsByClassName('razrad_4');
        for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";    
        t = document.getElementsByClassName('razrad_3');
        for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
        t = document.getElementsByClassName('razrad_2');
        for (var i = 0; i<t.length; i++) t[i].style.visibility = "visible";
    }
}

var r1 = 0, r2 = 0, r3 = 0, r4 = 0, Kolcifr = 4;
function schot(){
    var summa = 0;
	r1 = 0; r2 = 0;
	r1 = parseInt(document.getElementById('r1_brat').name)*5 + parseInt(document.getElementById('r1_drug_1').name);
	if (document.getElementById('r1_drug_1').name == "1"){
		r1 += parseInt(document.getElementById('r1_drug_2').name);
		if (document.getElementById('r1_drug_2').name == "1"){
			r1 += parseInt(document.getElementById('r1_drug_3').name);
			if (document.getElementById('r1_drug_3').name == "1"){
				r1 += parseInt(document.getElementById('r1_drug_4').name);
			}
		}
	}
	
	r2 = parseInt(document.getElementById('r2_brat').name)*5 + parseInt(document.getElementById('r2_drug_1').name);
	if (document.getElementById('r2_drug_1').name == "1"){
		r2 += parseInt(document.getElementById('r2_drug_2').name);
		if (document.getElementById('r2_drug_2').name == "1"){
			r2 += parseInt(document.getElementById('r2_drug_3').name);
			if (document.getElementById('r2_drug_3').name == "1"){
				r2 += parseInt(document.getElementById('r2_drug_4').name);
			}
		}
	}
	r3 = parseInt(document.getElementById('r3_brat').name)*5 + parseInt(document.getElementById('r3_drug_1').name);
    if (document.getElementById('r3_drug_1').name == "1"){
        r3 += parseInt(document.getElementById('r3_drug_2').name);
        if (document.getElementById('r3_drug_2').name == "1"){
            r3 += parseInt(document.getElementById('r3_drug_3').name);
            if (document.getElementById('r3_drug_3').name == "1"){
                r3 += parseInt(document.getElementById('r3_drug_4').name);
            }
        }
    }
    r4 = parseInt(document.getElementById('r4_brat').name)*5 + parseInt(document.getElementById('r4_drug_1').name);
    if (document.getElementById('r4_drug_1').name == "1"){
        r4 += parseInt(document.getElementById('r4_drug_2').name);
        if (document.getElementById('r4_drug_2').name == "1"){
            r4 += parseInt(document.getElementById('r4_drug_3').name);
            if (document.getElementById('r4_drug_3').name == "1"){
                r4 += parseInt(document.getElementById('r4_drug_4').name);
            }
        }
    }
    document.getElementById('r1_number').innerHTML = r1;
    document.getElementById('r2_number').innerHTML = r2;
    document.getElementById('r3_number').innerHTML = r3;	
    document.getElementById('r4_number').innerHTML = r4;	
	summa = r1+10*r2+100*r3+1000*r4;
    return summa;

}

var buspus = '/static/custom/css/buspus.png', bus_schot_no = '/static/custom/css/bus-schot-no.png', bus = '/static/custom/css/bus.png';

function black_brown(){
if (document.getElementById('navbar_color').innerHTML == '(коричневый)'){
    document.getElementById('navbar_color').innerHTML = '(черный)';
    buspus = '/static/custom/css/buspus-black.png'; 
    bus_schot_no = '/static/custom/css/bus-schot-no-black.png'; 
    bus = '/static/custom/css/bus-black.png';
    var t = document.getElementsByClassName('btn-xs');
    
    for (var i = 0; i < t.length; i++){
        t[i].style.backgroundColor = "#000000";
        t[i].style.borderColor = "#000000";
    }
}
else{
    document.getElementById('navbar_color').innerHTML = '(коричневый)'
    buspus = '/static/custom/css/buspus.png'; 
    bus_schot_no = '/static/custom/css/bus-schot-no.png'; 
    bus = '/static/custom/css/bus.png';
    var t = document.getElementsByClassName('btn-xs');
    for (var i = 0; i < t.length; i++){
        t[i].style.backgroundColor = "SaddleBrown";
        t[i].style.borderColor = "SaddleBrown";
    }
}

    r1_brat_0_f();
    r2_brat_0_f();
    r3_brat_0_f();
    r4_brat_0_f();
    r1_drug_5_f();
    r2_drug_5_f();
    r3_drug_5_f();
    r4_drug_5_f();
    r1_spica_0();
    r2_spica_0();
    r3_spica_0();
    r4_spica_0();
}

function r1_brat_f(){
	if (document.getElementById('r1_brat').name == "1"){
		document.getElementById('r1_brat').name = "0";
		document.getElementById('r1_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r1_brat').css( 'background-size', 'contain' );
        $('#r1_brat_0').css( 'background-size', '100% 100%' ); 
		document.getElementById('r1_brat_0').name = "1";
		document.getElementById('r1_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
		schot();
	}
}
function r1_brat_0_f(){
	if (document.getElementById('r1_brat_0').name == "1"){
		document.getElementById('r1_brat_0').name = "0";
		document.getElementById('r1_brat_0').style.backgroundImage = 'url('+buspus +')';
        $('#r1_brat_0').css( 'background-size', 'contain' );
        $('#r1_brat').css( 'background-size', '100% 100%' ); 
		document.getElementById('r1_brat').name = "1";
		document.getElementById('r1_brat').style.backgroundImage = 'url('+bus +')'; 
		schot();
	}
}

function r1_spica_0(){
        document.getElementById('r1_drug_1').classList.remove('schot-yes');
        document.getElementById('r1_drug_2').classList.remove('schot-yes');
        document.getElementById('r1_drug_3').classList.remove('schot-yes');
        document.getElementById('r1_drug_4').classList.remove('schot-yes');
		document.getElementById('r1_brat').name = "0";
		document.getElementById('r1_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r1_brat').css( 'background-size', 'contain' );
        $('#r1_brat_0').css( 'background-size', '100% 100%' ); 
		document.getElementById('r1_brat_0').name = "1";
		document.getElementById('r1_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
		document.getElementById('r1_drug_1').name = "0";
		document.getElementById('r1_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r1_drug_1').css( 'background-size', 'contain' ); 
		document.getElementById('r1_drug_2').name = "1";
		document.getElementById('r1_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r1_drug_2').css( 'background-size', '100% 100%' ); 
		document.getElementById('r1_drug_3').name = "1";
		document.getElementById('r1_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r1_drug_3').css( 'background-size', '100% 100%' ); 
		document.getElementById('r1_drug_4').name = "1";
		document.getElementById('r1_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r1_drug_4').css( 'background-size', '100% 100%' ); 
		document.getElementById('r1_drug_5').name = "1";
		document.getElementById('r1_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r1_drug_5').css( 'background-size', '100% 100%' ); 	
		schot();
}



function r1_drug_1_f(){
	
    if (document.getElementById('r1_drug_1').name == "1"){
        document.getElementById('r1_drug_1').classList.remove('schot-yes');
		document.getElementById('r1_drug_1').name = "0";
		document.getElementById('r1_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r1_drug_1').css( 'background-size', 'contain' ); 
        document.getElementById('r1_drug_2').classList.remove('schot-yes');
		document.getElementById('r1_drug_2').name = "1";
		document.getElementById('r1_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r1_drug_2').css( 'background-size', '100% 100%' ); 
        document.getElementById('r1_drug_3').classList.remove('schot-yes');
		document.getElementById('r1_drug_3').name = "1";
		document.getElementById('r1_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r1_drug_3').css( 'background-size', '100% 100%' );
        document.getElementById('r1_drug_4').classList.remove('schot-yes'); 
		document.getElementById('r1_drug_4').name = "1";
		document.getElementById('r1_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r1_drug_4').css( 'background-size', '100% 100%' ); 
        document.getElementById('r1_drug_5').classList.remove('schot-yes');
		document.getElementById('r1_drug_5').name = "1";
		document.getElementById('r1_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r1_drug_5').css( 'background-size', '100% 100%' ); 	
		schot();
	}
}

function r1_drug_2_f(){
	if (document.getElementById('r1_drug_2').name == "1"){
        document.getElementById('r1_drug_2').name = "0";
        document.getElementById('r1_drug_2').style.backgroundImage = 'url('+buspus +')';
        $('#r1_drug_2').css( 'background-size', 'contain' );

        if (document.getElementById('r1_drug_2').classList.contains('schot-yes')){
            document.getElementById('r1_drug_2').classList.remove('schot-yes');
            document.getElementById('r1_drug_3').classList.remove('schot-yes'); 
    		document.getElementById('r1_drug_3').name = "1";
    		document.getElementById('r1_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r1_drug_3').css( 'background-size', '100% 100%' ); 
            document.getElementById('r1_drug_4').classList.remove('schot-yes');
    		document.getElementById('r1_drug_4').name = "1";
    		document.getElementById('r1_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r1_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r1_drug_5').classList.remove('schot-yes');
    		document.getElementById('r1_drug_5').name = "1";
    		document.getElementById('r1_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r1_drug_5').css( 'background-size', '100% 100%' ); 
        }
        else{
            document.getElementById('r1_drug_1').name = "1";
            $('#r1_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r1_drug_1').style.backgroundImage = 'url('+bus +')';
            document.getElementById('r1_drug_1').classList.add('schot-yes');
        }
		schot();
	}
}

function r1_drug_3_f(){
	if (document.getElementById('r1_drug_3').name == "1"){
		document.getElementById('r1_drug_3').name = "0";
		document.getElementById('r1_drug_3').style.backgroundImage = 'url('+buspus +')';
        $('#r1_drug_3').css( 'background-size', 'contain' );

        if (document.getElementById('r1_drug_3').classList.contains('schot-yes')){
            document.getElementById('r1_drug_3').classList.remove('schot-yes');
            document.getElementById('r1_drug_4').classList.remove('schot-yes'); 
    		document.getElementById('r1_drug_4').name = "1";
    		document.getElementById('r1_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r1_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r1_drug_5').classList.remove('schot-yes');
    		document.getElementById('r1_drug_5').name = "1";
    		document.getElementById('r1_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r1_drug_5').css( 'background-size', '100% 100%' );
        }
        else{
            document.getElementById('r1_drug_1').classList.add('schot-yes');
            document.getElementById('r1_drug_1').name = "1";
            document.getElementById('r1_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r1_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r1_drug_2').classList.add('schot-yes'); 
            document.getElementById('r1_drug_2').name = "1";
            document.getElementById('r1_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r1_drug_2').css( 'background-size', '100% 100%' );
        } 	
		schot();
	}
}

function r1_drug_4_f(){
	if (document.getElementById('r1_drug_4').name == "1"){
		document.getElementById('r1_drug_4').name = "0";
        document.getElementById('r1_drug_4').style.backgroundImage = 'url('+buspus +')'; 
        $('#r1_drug_4').css( 'background-size', 'contain' );

        if (document.getElementById('r1_drug_4').classList.contains('schot-yes')){
            document.getElementById('r1_drug_4').classList.remove('schot-yes');
    		document.getElementById('r1_drug_5').classList.remove('schot-yes');
    		document.getElementById('r1_drug_5').name = "1";
    		document.getElementById('r1_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r1_drug_5').css( 'background-size', '100% 100%' );	
		}
        else{
            document.getElementById('r1_drug_1').classList.add('schot-yes');
            document.getElementById('r1_drug_1').name = "1";
            document.getElementById('r1_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r1_drug_1').css( 'background-size', '100% 100%' ); 
            document.getElementById('r1_drug_2').classList.add('schot-yes');
            document.getElementById('r1_drug_2').name = "1";
            document.getElementById('r1_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r1_drug_2').css( 'background-size', '100% 100%' );
            document.getElementById('r1_drug_3').classList.add('schot-yes'); 
            document.getElementById('r1_drug_3').name = "1";
            document.getElementById('r1_drug_3').style.backgroundImage = 'url('+bus +')';
            $('#r1_drug_3').css( 'background-size', '100% 100%' );
        }

        schot();
	}
}

function r1_drug_5_f(){
	if (document.getElementById('r1_drug_5').name == "1"){
		document.getElementById('r1_drug_5').name = "0";
		document.getElementById('r1_drug_5').style.backgroundImage = 'url('+buspus +')';
        $('#r1_drug_5').css( 'background-size', 'contain' ); 
        document.getElementById('r1_drug_1').classList.add('schot-yes');
		document.getElementById('r1_drug_1').name = "1";
		document.getElementById('r1_drug_1').style.backgroundImage = 'url('+bus +')';
        $('#r1_drug_1').css( 'background-size', '100% 100%' ); 
        document.getElementById('r1_drug_2').classList.add('schot-yes'); 
		document.getElementById('r1_drug_2').name = "1";
		document.getElementById('r1_drug_2').style.backgroundImage = 'url('+bus +')';
        $('#r1_drug_2').css( 'background-size', '100% 100%' );
        document.getElementById('r1_drug_3').classList.add('schot-yes'); 
		document.getElementById('r1_drug_3').name = "1";
		document.getElementById('r1_drug_3').style.backgroundImage = 'url('+bus +')';
        $('#r1_drug_3').css( 'background-size', '100% 100%' ); 
        document.getElementById('r1_drug_4').classList.add('schot-yes');
		document.getElementById('r1_drug_4').name = "1";
		document.getElementById('r1_drug_4').style.backgroundImage = 'url('+bus +')';
        $('#r1_drug_4').css( 'background-size', '100% 100%' );
		schot();
	}
}

function r2_brat_f(){
    if (document.getElementById('r2_brat').name == "1"){
        document.getElementById('r2_brat').name = "0";
        document.getElementById('r2_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r2_brat').css( 'background-size', 'contain' );
        $('#r2_brat_0').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_brat_0').name = "1";
        document.getElementById('r2_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
        schot();
    }
}
function r2_brat_0_f(){
    if (document.getElementById('r2_brat_0').name == "1"){
        document.getElementById('r2_brat_0').name = "0";
        document.getElementById('r2_brat_0').style.backgroundImage = 'url('+buspus +')';
        $('#r2_brat_0').css( 'background-size', 'contain' );
        $('#r2_brat').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_brat').name = "1";
        document.getElementById('r2_brat').style.backgroundImage = 'url('+bus +')'; 
        schot();
    }
}

function r2_spica_0(){
        document.getElementById('r2_drug_1').classList.remove('schot-yes');
        document.getElementById('r2_drug_2').classList.remove('schot-yes');
        document.getElementById('r2_drug_3').classList.remove('schot-yes');
        document.getElementById('r2_drug_4').classList.remove('schot-yes');
        document.getElementById('r2_brat').name = "0";
        document.getElementById('r2_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r2_brat').css( 'background-size', 'contain' );
        $('#r2_brat_0').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_brat_0').name = "1";
        document.getElementById('r2_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
        document.getElementById('r2_drug_1').name = "0";
        document.getElementById('r2_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r2_drug_1').css( 'background-size', 'contain' ); 
        document.getElementById('r2_drug_2').name = "1";
        document.getElementById('r2_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r2_drug_2').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_drug_3').name = "1";
        document.getElementById('r2_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r2_drug_3').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_drug_4').name = "1";
        document.getElementById('r2_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r2_drug_4').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_drug_5').name = "1";
        document.getElementById('r2_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r2_drug_5').css( 'background-size', '100% 100%' );  
        schot();
}

function r2_drug_1_f(){
    
    if (document.getElementById('r2_drug_1').name == "1"){
        document.getElementById('r2_drug_1').classList.remove('schot-yes');
        document.getElementById('r2_drug_1').name = "0";
        document.getElementById('r2_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r2_drug_1').css( 'background-size', 'contain' ); 
        document.getElementById('r2_drug_2').classList.remove('schot-yes');
        document.getElementById('r2_drug_2').name = "1";
        document.getElementById('r2_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r2_drug_2').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_drug_3').classList.remove('schot-yes');
        document.getElementById('r2_drug_3').name = "1";
        document.getElementById('r2_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r2_drug_3').css( 'background-size', '100% 100%' );
        document.getElementById('r2_drug_4').classList.remove('schot-yes'); 
        document.getElementById('r2_drug_4').name = "1";
        document.getElementById('r2_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r2_drug_4').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_drug_5').classList.remove('schot-yes');
        document.getElementById('r2_drug_5').name = "1";
        document.getElementById('r2_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r2_drug_5').css( 'background-size', '100% 100%' );  
        schot();
    }
}

function r2_drug_2_f(){
    if (document.getElementById('r2_drug_2').name == "1"){
        document.getElementById('r2_drug_2').name = "0";
        document.getElementById('r2_drug_2').style.backgroundImage = 'url('+buspus +')';
        $('#r2_drug_2').css( 'background-size', 'contain' );

        if (document.getElementById('r2_drug_2').classList.contains('schot-yes')){
            document.getElementById('r2_drug_2').classList.remove('schot-yes');
            document.getElementById('r2_drug_3').classList.remove('schot-yes'); 
            document.getElementById('r2_drug_3').name = "1";
            document.getElementById('r2_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r2_drug_3').css( 'background-size', '100% 100%' ); 
            document.getElementById('r2_drug_4').classList.remove('schot-yes');
            document.getElementById('r2_drug_4').name = "1";
            document.getElementById('r2_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r2_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r2_drug_5').classList.remove('schot-yes');
            document.getElementById('r2_drug_5').name = "1";
            document.getElementById('r2_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r2_drug_5').css( 'background-size', '100% 100%' ); 
        }
        else{
            document.getElementById('r2_drug_1').name = "1";
            $('#r2_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r2_drug_1').style.backgroundImage = 'url('+bus +')';
            document.getElementById('r2_drug_1').classList.add('schot-yes');
        }
        schot();
    }
}

function r2_drug_3_f(){
    if (document.getElementById('r2_drug_3').name == "1"){
        document.getElementById('r2_drug_3').name = "0";
        document.getElementById('r2_drug_3').style.backgroundImage = 'url('+buspus +')';
        $('#r2_drug_3').css( 'background-size', 'contain' );

        if (document.getElementById('r2_drug_3').classList.contains('schot-yes')){
            document.getElementById('r2_drug_3').classList.remove('schot-yes');
            document.getElementById('r2_drug_4').classList.remove('schot-yes'); 
            document.getElementById('r2_drug_4').name = "1";
            document.getElementById('r2_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r2_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r2_drug_5').classList.remove('schot-yes');
            document.getElementById('r2_drug_5').name = "1";
            document.getElementById('r2_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r2_drug_5').css( 'background-size', '100% 100%' );
        }
        else{
            document.getElementById('r2_drug_1').classList.add('schot-yes');
            document.getElementById('r2_drug_1').name = "1";
            document.getElementById('r2_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r2_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r2_drug_2').classList.add('schot-yes'); 
            document.getElementById('r2_drug_2').name = "1";
            document.getElementById('r2_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r2_drug_2').css( 'background-size', '100% 100%' );
        }   
        schot();
    }
}

function r2_drug_4_f(){
    if (document.getElementById('r2_drug_4').name == "1"){
        document.getElementById('r2_drug_4').name = "0";
        document.getElementById('r2_drug_4').style.backgroundImage = 'url('+buspus +')'; 
        $('#r2_drug_4').css( 'background-size', 'contain' );

        if (document.getElementById('r2_drug_4').classList.contains('schot-yes')){
            document.getElementById('r2_drug_4').classList.remove('schot-yes');
            document.getElementById('r2_drug_5').classList.remove('schot-yes');
            document.getElementById('r2_drug_5').name = "1";
            document.getElementById('r2_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r2_drug_5').css( 'background-size', '100% 100%' );  
        }
        else{
            document.getElementById('r2_drug_1').classList.add('schot-yes');
            document.getElementById('r2_drug_1').name = "1";
            document.getElementById('r2_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r2_drug_1').css( 'background-size', '100% 100%' ); 
            document.getElementById('r2_drug_2').classList.add('schot-yes');
            document.getElementById('r2_drug_2').name = "1";
            document.getElementById('r2_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r2_drug_2').css( 'background-size', '100% 100%' );
            document.getElementById('r2_drug_3').classList.add('schot-yes'); 
            document.getElementById('r2_drug_3').name = "1";
            document.getElementById('r2_drug_3').style.backgroundImage = 'url('+bus +')';
            $('#r2_drug_3').css( 'background-size', '100% 100%' );
        }

        schot();
    }
}

function r2_drug_5_f(){
    if (document.getElementById('r2_drug_5').name == "1"){
        document.getElementById('r2_drug_5').name = "0";
        document.getElementById('r2_drug_5').style.backgroundImage = 'url('+buspus +')';
        $('#r2_drug_5').css( 'background-size', 'contain' ); 
        document.getElementById('r2_drug_1').classList.add('schot-yes');
        document.getElementById('r2_drug_1').name = "1";
        document.getElementById('r2_drug_1').style.backgroundImage = 'url('+bus +')';
        $('#r2_drug_1').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_drug_2').classList.add('schot-yes'); 
        document.getElementById('r2_drug_2').name = "1";
        document.getElementById('r2_drug_2').style.backgroundImage = 'url('+bus +')';
        $('#r2_drug_2').css( 'background-size', '100% 100%' );
        document.getElementById('r2_drug_3').classList.add('schot-yes'); 
        document.getElementById('r2_drug_3').name = "1";
        document.getElementById('r2_drug_3').style.backgroundImage = 'url('+bus +')';
        $('#r2_drug_3').css( 'background-size', '100% 100%' ); 
        document.getElementById('r2_drug_4').classList.add('schot-yes');
        document.getElementById('r2_drug_4').name = "1";
        document.getElementById('r2_drug_4').style.backgroundImage = 'url('+bus +')';
        $('#r2_drug_4').css( 'background-size', '100% 100%' );
        schot();
    }
}

function r3_brat_f(){
    if (document.getElementById('r3_brat').name == "1"){
        document.getElementById('r3_brat').name = "0";
        document.getElementById('r3_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r3_brat').css( 'background-size', 'contain' );
        $('#r3_brat_0').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_brat_0').name = "1";
        document.getElementById('r3_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
        schot();
    }
}
function r3_brat_0_f(){
    if (document.getElementById('r3_brat_0').name == "1"){
        document.getElementById('r3_brat_0').name = "0";
        document.getElementById('r3_brat_0').style.backgroundImage = 'url('+buspus +')';
        $('#r3_brat_0').css( 'background-size', 'contain' );
        $('#r3_brat').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_brat').name = "1";
        document.getElementById('r3_brat').style.backgroundImage = 'url('+bus +')'; 
        schot();
    }
}

function r3_spica_0(){
        document.getElementById('r3_drug_1').classList.remove('schot-yes');
        document.getElementById('r3_drug_2').classList.remove('schot-yes');
        document.getElementById('r3_drug_3').classList.remove('schot-yes');
        document.getElementById('r3_drug_4').classList.remove('schot-yes');
        document.getElementById('r3_brat').name = "0";
        document.getElementById('r3_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r3_brat').css( 'background-size', 'contain' );
        $('#r3_brat_0').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_brat_0').name = "1";
        document.getElementById('r3_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
        document.getElementById('r3_drug_1').name = "0";
        document.getElementById('r3_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r3_drug_1').css( 'background-size', 'contain' ); 
        document.getElementById('r3_drug_2').name = "1";
        document.getElementById('r3_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r3_drug_2').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_drug_3').name = "1";
        document.getElementById('r3_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r3_drug_3').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_drug_4').name = "1";
        document.getElementById('r3_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r3_drug_4').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_drug_5').name = "1";
        document.getElementById('r3_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r3_drug_5').css( 'background-size', '100% 100%' );  
        schot();
}

function r3_drug_1_f(){
    
    if (document.getElementById('r3_drug_1').name == "1"){
        document.getElementById('r3_drug_1').classList.remove('schot-yes');
        document.getElementById('r3_drug_1').name = "0";
        document.getElementById('r3_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r3_drug_1').css( 'background-size', 'contain' ); 
        document.getElementById('r3_drug_2').classList.remove('schot-yes');
        document.getElementById('r3_drug_2').name = "1";
        document.getElementById('r3_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r3_drug_2').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_drug_3').classList.remove('schot-yes');
        document.getElementById('r3_drug_3').name = "1";
        document.getElementById('r3_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r3_drug_3').css( 'background-size', '100% 100%' );
        document.getElementById('r3_drug_4').classList.remove('schot-yes'); 
        document.getElementById('r3_drug_4').name = "1";
        document.getElementById('r3_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r3_drug_4').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_drug_5').classList.remove('schot-yes');
        document.getElementById('r3_drug_5').name = "1";
        document.getElementById('r3_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r3_drug_5').css( 'background-size', '100% 100%' );  
        schot();
    }
}

function r3_drug_2_f(){
    if (document.getElementById('r3_drug_2').name == "1"){
        document.getElementById('r3_drug_2').name = "0";
        document.getElementById('r3_drug_2').style.backgroundImage = 'url('+buspus +')';
        $('#r3_drug_2').css( 'background-size', 'contain' );

        if (document.getElementById('r3_drug_2').classList.contains('schot-yes')){
            document.getElementById('r3_drug_2').classList.remove('schot-yes');
            document.getElementById('r3_drug_3').classList.remove('schot-yes'); 
            document.getElementById('r3_drug_3').name = "1";
            document.getElementById('r3_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r3_drug_3').css( 'background-size', '100% 100%' ); 
            document.getElementById('r3_drug_4').classList.remove('schot-yes');
            document.getElementById('r3_drug_4').name = "1";
            document.getElementById('r3_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r3_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r3_drug_5').classList.remove('schot-yes');
            document.getElementById('r3_drug_5').name = "1";
            document.getElementById('r3_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r3_drug_5').css( 'background-size', '100% 100%' ); 
        }
        else{
            document.getElementById('r3_drug_1').name = "1";
            $('#r3_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r3_drug_1').style.backgroundImage = 'url('+bus +')';
            document.getElementById('r3_drug_1').classList.add('schot-yes');
        }
        schot();
    }
}

function r3_drug_3_f(){
    if (document.getElementById('r3_drug_3').name == "1"){
        document.getElementById('r3_drug_3').name = "0";
        document.getElementById('r3_drug_3').style.backgroundImage = 'url('+buspus +')';
        $('#r3_drug_3').css( 'background-size', 'contain' );

        if (document.getElementById('r3_drug_3').classList.contains('schot-yes')){
            document.getElementById('r3_drug_3').classList.remove('schot-yes');
            document.getElementById('r3_drug_4').classList.remove('schot-yes'); 
            document.getElementById('r3_drug_4').name = "1";
            document.getElementById('r3_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r3_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r3_drug_5').classList.remove('schot-yes');
            document.getElementById('r3_drug_5').name = "1";
            document.getElementById('r3_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r3_drug_5').css( 'background-size', '100% 100%' );
        }
        else{
            document.getElementById('r3_drug_1').classList.add('schot-yes');
            document.getElementById('r3_drug_1').name = "1";
            document.getElementById('r3_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r3_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r3_drug_2').classList.add('schot-yes'); 
            document.getElementById('r3_drug_2').name = "1";
            document.getElementById('r3_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r3_drug_2').css( 'background-size', '100% 100%' );
        }   
        schot();
    }
}

function r3_drug_4_f(){
    if (document.getElementById('r3_drug_4').name == "1"){
        document.getElementById('r3_drug_4').name = "0";
        document.getElementById('r3_drug_4').style.backgroundImage = 'url('+buspus +')'; 
        $('#r3_drug_4').css( 'background-size', 'contain' );

        if (document.getElementById('r3_drug_4').classList.contains('schot-yes')){
            document.getElementById('r3_drug_4').classList.remove('schot-yes');
            document.getElementById('r3_drug_5').classList.remove('schot-yes');
            document.getElementById('r3_drug_5').name = "1";
            document.getElementById('r3_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r3_drug_5').css( 'background-size', '100% 100%' );  
        }
        else{
            document.getElementById('r3_drug_1').classList.add('schot-yes');
            document.getElementById('r3_drug_1').name = "1";
            document.getElementById('r3_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r3_drug_1').css( 'background-size', '100% 100%' ); 
            document.getElementById('r3_drug_2').classList.add('schot-yes');
            document.getElementById('r3_drug_2').name = "1";
            document.getElementById('r3_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r3_drug_2').css( 'background-size', '100% 100%' );
            document.getElementById('r3_drug_3').classList.add('schot-yes'); 
            document.getElementById('r3_drug_3').name = "1";
            document.getElementById('r3_drug_3').style.backgroundImage = 'url('+bus +')';
            $('#r3_drug_3').css( 'background-size', '100% 100%' );
        }

        schot();
    }
}

function r3_drug_5_f(){
    if (document.getElementById('r3_drug_5').name == "1"){
        document.getElementById('r3_drug_5').name = "0";
        document.getElementById('r3_drug_5').style.backgroundImage = 'url('+buspus +')';
        $('#r3_drug_5').css( 'background-size', 'contain' ); 
        document.getElementById('r3_drug_1').classList.add('schot-yes');
        document.getElementById('r3_drug_1').name = "1";
        document.getElementById('r3_drug_1').style.backgroundImage = 'url('+bus +')';
        $('#r3_drug_1').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_drug_2').classList.add('schot-yes'); 
        document.getElementById('r3_drug_2').name = "1";
        document.getElementById('r3_drug_2').style.backgroundImage = 'url('+bus +')';
        $('#r3_drug_2').css( 'background-size', '100% 100%' );
        document.getElementById('r3_drug_3').classList.add('schot-yes'); 
        document.getElementById('r3_drug_3').name = "1";
        document.getElementById('r3_drug_3').style.backgroundImage = 'url('+bus +')';
        $('#r3_drug_3').css( 'background-size', '100% 100%' ); 
        document.getElementById('r3_drug_4').classList.add('schot-yes');
        document.getElementById('r3_drug_4').name = "1";
        document.getElementById('r3_drug_4').style.backgroundImage = 'url('+bus +')';
        $('#r3_drug_4').css( 'background-size', '100% 100%' );
        schot();
    }
}

function r4_brat_f(){
    if (document.getElementById('r4_brat').name == "1"){
        document.getElementById('r4_brat').name = "0";
        document.getElementById('r4_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r4_brat').css( 'background-size', 'contain' );
        $('#r4_brat_0').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_brat_0').name = "1";
        document.getElementById('r4_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
        schot();
    }
}
function r4_brat_0_f(){
    if (document.getElementById('r4_brat_0').name == "1"){
        document.getElementById('r4_brat_0').name = "0";
        document.getElementById('r4_brat_0').style.backgroundImage = 'url('+buspus +')';
        $('#r4_brat_0').css( 'background-size', 'contain' );
        $('#r4_brat').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_brat').name = "1";
        document.getElementById('r4_brat').style.backgroundImage = 'url('+bus +')'; 
        schot();
    }
}

function r4_spica_0(){
        document.getElementById('r4_drug_1').classList.remove('schot-yes');
        document.getElementById('r4_drug_2').classList.remove('schot-yes');
        document.getElementById('r4_drug_3').classList.remove('schot-yes');
        document.getElementById('r4_drug_4').classList.remove('schot-yes');
        document.getElementById('r4_brat').name = "0";
        document.getElementById('r4_brat').style.backgroundImage = 'url('+buspus +')';
        $('#r4_brat').css( 'background-size', 'contain' );
        $('#r4_brat_0').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_brat_0').name = "1";
        document.getElementById('r4_brat_0').style.backgroundImage = 'url('+bus_schot_no +')'; 
        document.getElementById('r4_drug_1').name = "0";
        document.getElementById('r4_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r4_drug_1').css( 'background-size', 'contain' ); 
        document.getElementById('r4_drug_2').name = "1";
        document.getElementById('r4_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r4_drug_2').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_drug_3').name = "1";
        document.getElementById('r4_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r4_drug_3').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_drug_4').name = "1";
        document.getElementById('r4_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r4_drug_4').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_drug_5').name = "1";
        document.getElementById('r4_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r4_drug_5').css( 'background-size', '100% 100%' );  
        schot();
}

function r4_drug_1_f(){
    
    if (document.getElementById('r4_drug_1').name == "1"){
        document.getElementById('r4_drug_1').classList.remove('schot-yes');
        document.getElementById('r4_drug_1').name = "0";
        document.getElementById('r4_drug_1').style.backgroundImage = 'url('+buspus +')';
        $('#r4_drug_1').css( 'background-size', 'contain' ); 
        document.getElementById('r4_drug_2').classList.remove('schot-yes');
        document.getElementById('r4_drug_2').name = "1";
        document.getElementById('r4_drug_2').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r4_drug_2').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_drug_3').classList.remove('schot-yes');
        document.getElementById('r4_drug_3').name = "1";
        document.getElementById('r4_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r4_drug_3').css( 'background-size', '100% 100%' );
        document.getElementById('r4_drug_4').classList.remove('schot-yes'); 
        document.getElementById('r4_drug_4').name = "1";
        document.getElementById('r4_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
        $('#r4_drug_4').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_drug_5').classList.remove('schot-yes');
        document.getElementById('r4_drug_5').name = "1";
        document.getElementById('r4_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
        $('#r4_drug_5').css( 'background-size', '100% 100%' );  
        schot();
    }
}

function r4_drug_2_f(){
    if (document.getElementById('r4_drug_2').name == "1"){
        document.getElementById('r4_drug_2').name = "0";
        document.getElementById('r4_drug_2').style.backgroundImage = 'url('+buspus +')';
        $('#r4_drug_2').css( 'background-size', 'contain' );

        if (document.getElementById('r4_drug_2').classList.contains('schot-yes')){
            document.getElementById('r4_drug_2').classList.remove('schot-yes');
            document.getElementById('r4_drug_3').classList.remove('schot-yes'); 
            document.getElementById('r4_drug_3').name = "1";
            document.getElementById('r4_drug_3').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r4_drug_3').css( 'background-size', '100% 100%' ); 
            document.getElementById('r4_drug_4').classList.remove('schot-yes');
            document.getElementById('r4_drug_4').name = "1";
            document.getElementById('r4_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r4_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r4_drug_5').classList.remove('schot-yes');
            document.getElementById('r4_drug_5').name = "1";
            document.getElementById('r4_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r4_drug_5').css( 'background-size', '100% 100%' ); 
        }
        else{
            document.getElementById('r4_drug_1').name = "1";
            $('#r4_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r4_drug_1').style.backgroundImage = 'url('+bus +')';
            document.getElementById('r4_drug_1').classList.add('schot-yes');
        }
        schot();
    }
}

function r4_drug_3_f(){
    if (document.getElementById('r4_drug_3').name == "1"){
        document.getElementById('r4_drug_3').name = "0";
        document.getElementById('r4_drug_3').style.backgroundImage = 'url('+buspus +')';
        $('#r4_drug_3').css( 'background-size', 'contain' );

        if (document.getElementById('r4_drug_3').classList.contains('schot-yes')){
            document.getElementById('r4_drug_3').classList.remove('schot-yes');
            document.getElementById('r4_drug_4').classList.remove('schot-yes'); 
            document.getElementById('r4_drug_4').name = "1";
            document.getElementById('r4_drug_4').style.backgroundImage = 'url('+bus_schot_no +')';
            $('#r4_drug_4').css( 'background-size', '100% 100%' ); 
            document.getElementById('r4_drug_5').classList.remove('schot-yes');
            document.getElementById('r4_drug_5').name = "1";
            document.getElementById('r4_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r4_drug_5').css( 'background-size', '100% 100%' );
        }
        else{
            document.getElementById('r4_drug_1').classList.add('schot-yes');
            document.getElementById('r4_drug_1').name = "1";
            document.getElementById('r4_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r4_drug_1').css( 'background-size', '100% 100%' );
            document.getElementById('r4_drug_2').classList.add('schot-yes'); 
            document.getElementById('r4_drug_2').name = "1";
            document.getElementById('r4_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r4_drug_2').css( 'background-size', '100% 100%' );
        }   
        schot();
    }
}

function r4_drug_4_f(){
    if (document.getElementById('r4_drug_4').name == "1"){
        document.getElementById('r4_drug_4').name = "0";
        document.getElementById('r4_drug_4').style.backgroundImage = 'url('+buspus +')'; 
        $('#r4_drug_4').css( 'background-size', 'contain' );

        if (document.getElementById('r4_drug_4').classList.contains('schot-yes')){
            document.getElementById('r4_drug_4').classList.remove('schot-yes');
            document.getElementById('r4_drug_5').classList.remove('schot-yes');
            document.getElementById('r4_drug_5').name = "1";
            document.getElementById('r4_drug_5').style.backgroundImage = 'url('+bus_schot_no +')'; 
            $('#r4_drug_5').css( 'background-size', '100% 100%' );  
        }
        else{
            document.getElementById('r4_drug_1').classList.add('schot-yes');
            document.getElementById('r4_drug_1').name = "1";
            document.getElementById('r4_drug_1').style.backgroundImage = 'url('+bus +')';
            $('#r4_drug_1').css( 'background-size', '100% 100%' ); 
            document.getElementById('r4_drug_2').classList.add('schot-yes');
            document.getElementById('r4_drug_2').name = "1";
            document.getElementById('r4_drug_2').style.backgroundImage = 'url('+bus +')';
            $('#r4_drug_2').css( 'background-size', '100% 100%' );
            document.getElementById('r4_drug_3').classList.add('schot-yes'); 
            document.getElementById('r4_drug_3').name = "1";
            document.getElementById('r4_drug_3').style.backgroundImage = 'url('+bus +')';
            $('#r4_drug_3').css( 'background-size', '100% 100%' );
        }

        schot();
    }
}

function r4_drug_5_f(){
    if (document.getElementById('r4_drug_5').name == "1"){
        document.getElementById('r4_drug_5').name = "0";
        document.getElementById('r4_drug_5').style.backgroundImage = 'url('+buspus +')';
        $('#r4_drug_5').css( 'background-size', 'contain' ); 
        document.getElementById('r4_drug_1').classList.add('schot-yes');
        document.getElementById('r4_drug_1').name = "1";
        document.getElementById('r4_drug_1').style.backgroundImage = 'url('+bus +')';
        $('#r4_drug_1').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_drug_2').classList.add('schot-yes'); 
        document.getElementById('r4_drug_2').name = "1";
        document.getElementById('r4_drug_2').style.backgroundImage = 'url('+bus +')';
        $('#r4_drug_2').css( 'background-size', '100% 100%' );
        document.getElementById('r4_drug_3').classList.add('schot-yes'); 
        document.getElementById('r4_drug_3').name = "1";
        document.getElementById('r4_drug_3').style.backgroundImage = 'url('+bus +')';
        $('#r4_drug_3').css( 'background-size', '100% 100%' ); 
        document.getElementById('r4_drug_4').classList.add('schot-yes');
        document.getElementById('r4_drug_4').name = "1";
        document.getElementById('r4_drug_4').style.backgroundImage = 'url('+bus +')';
        $('#r4_drug_4').css( 'background-size', '100% 100%' );
        schot();
    }
}






