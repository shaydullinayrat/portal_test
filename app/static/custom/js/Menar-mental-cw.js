var image_schotchik = 0, fullpage = false;

function fullpage_on(){
	window_pusto_left.className = "hidden";
	window_zadaniye.className = "col-lg-12  col-md-12 col-sm-12 col-xs-12";
	Editbox_ekran.style.fontSize = 400;
	Editbox_ekran.style.height = "88vh";
}
function fullpage_off(){
	window_pusto_left.className = "col-lg-3  col-md-3 col-sm-2 hidden-xs";
	window_zadaniye.className = "col-lg-6  col-md-6 col-sm-8 col-xs-12";
	Editbox_ekran.style.fontSize = 200;
	Editbox_ekran.style.height = "310px";
}

function full_page(){
	if (fullpage == false){
		fullpage = true;
		fullpage_on();
	}
	else{
		fullpage = false;
		fullpage_off();
	}
}

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
	Editbox_ekran.style.fontFamily = 'Showcard Gothic';
	if (document.body.clientWidth < 600){
		Editbox_ekran.style.height = 200;
		Editbox_ekran.style.fontSize = 120; 
	}	
	else{
		Editbox_ekran.style.height = 310;
		Editbox_ekran.style.fontSize = 200; 
	}
	Editbox_ekran.value = "►";
}
window.onresize=function(){
	if (document.body.clientWidth < 600) Editbox_ekran.style.height = 200; 
	else{ 
		if (fullpage == true) fullpage_on(); else fullpage_off();
	 // Editbox_ekran.style.height = 310;
	}
}
function button_half_f(){
	if ( Button_half.classList.contains('active') ){
		Button_half.classList.remove('active');
		half = false;
	}
	else{
		Button_half.classList.add('active');
		half = true;
	}
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

function button_nastroyki_f(){
	$('#modal_settings').modal('show');
}

function Kolslog_plus(){
 	if (document.getElementById('Kolslog_tablo').innerHTML < 10) document.getElementById('navbar_Kolslog').innerHTML = '(' + ++document.getElementById('Kolslog_tablo').innerHTML +')';
}

function Kolslog_minus(){
	if (document.getElementById('Kolslog_tablo').innerHTML > 2) document.getElementById('navbar_Kolslog').innerHTML =  '(' + --document.getElementById('Kolslog_tablo').innerHTML +')';
}

function Kolslog_10(){
	var t = Math.abs(parseFloat(prompt("Введите количество чисел в интервале 2 до 60")));
	if (isNaN(t) || t < 2 || t > 60){
		document.getElementById('Kolslog_tablo').innerHTML = 10;
		document.getElementById('navbar_Kolslog').innerHTML = '('+ 10+')';
	}	
	else{
		t = parseInt(t);
		document.getElementById('Kolslog_tablo').innerHTML = t;
		document.getElementById('navbar_Kolslog').innerHTML = '('+ t+')';
	}
}

function restart(){
	prav = 0;
	vip = 0;
	show_pravilno(); 
}

function Kolcifr_1() {
	Button_Kolcifr_1.classList.add('active');
	Button_Kolcifr_2.classList.remove('active');
	Button_Kolcifr_3.classList.remove('active');
	Button_Kolcifr_4.classList.remove('active');
	Kolcifr = 1;
	document.getElementById('navbar_slojnost').innerHTML = '(1)';
}

function Kolcifr_2() {
	Button_Kolcifr_1.classList.remove('active');
	Button_Kolcifr_2.classList.add('active');
	Button_Kolcifr_3.classList.remove('active');
	Button_Kolcifr_4.classList.remove('active');
	Kolcifr = 2;
	document.getElementById('navbar_slojnost').innerHTML = '(10)';	
}

function Kolcifr_3() {
	Button_Kolcifr_1.classList.remove('active');
	Button_Kolcifr_2.classList.remove('active');
	Button_Kolcifr_3.classList.add('active');
	Button_Kolcifr_4.classList.remove('active');
	Kolcifr = 3;
	document.getElementById('navbar_slojnost').innerHTML = '(100)';
	
}

function Kolcifr_4() {
	Button_Kolcifr_1.classList.remove('active');
	Button_Kolcifr_2.classList.remove('active');
	Button_Kolcifr_3.classList.remove('active');
	Button_Kolcifr_4.classList.add('active');
	Kolcifr = 4;
	document.getElementById('navbar_slojnost').innerHTML = '(1000)';	
}



function operation_plus() {
	Button_operation_plus.classList.add('active');
	Button_operation_minus.classList.remove('active');
	Button_operation_plus_minus.classList.remove('active');
	Operation = 0;
	document.getElementById('navbar_operation').innerHTML = '(+)';
	
}

function operation_minus() {
	Button_operation_plus.classList.remove('active');
	Button_operation_minus.classList.add('active');
	Button_operation_plus_minus.classList.remove('active');
	Operation = 1;
	document.getElementById('navbar_operation').innerHTML = '(-)';
	
}

function operation_plus_minus() {
	Button_operation_plus.classList.remove('active');
	Button_operation_minus.classList.remove('active');
	Button_operation_plus_minus.classList.add('active');
	Operation = 2;
	document.getElementById('navbar_operation').innerHTML = '(+/-)';
	
}



 // Кнопка выбора всех видов слагаемых
function check_5(){
		if (button_prosto.classList.contains('active')){
			if (button_5.classList.contains('active')){
				button_5.classList.remove('active');
				button_6.classList.remove('active');
				button_7.classList.remove('active');
				button_8.classList.remove('active');
				button_9.classList.remove('active');
			}
			else{
				button_5.classList.add('active');
			}
		}
		else{
			if (button_5.classList.contains('active')){
				button_5.classList.remove('active');
			}
			else{
				button_5.classList.add('active')
			}
		}
		
	}

	function check_6(){
		if (button_prosto.classList.contains('active')){
			if (button_6.classList.contains('active')){
				button_6.classList.remove('active');
				button_7.classList.remove('active');
				button_8.classList.remove('active');
				button_9.classList.remove('active');
			}
			else{
				button_5.classList.add('active');
				button_6.classList.add('active');
			}
		}
		else{
			if (button_6.classList.contains('active')){
				button_6.classList.remove('active');
			}
			else{
				button_6.classList.add('active')
			}
		}
		
	}

	function check_7(){
		if (button_prosto.classList.contains('active')){
			if (button_7.classList.contains('active')){
				button_7.classList.remove('active');
				button_8.classList.remove('active');
				button_9.classList.remove('active');
			}
			else{
				button_5.classList.add('active');
				button_6.classList.add('active');
				button_7.classList.add('active');
			}
		}
		else{
			if (button_7.classList.contains('active')){
				button_7.classList.remove('active');
			}
			else{
				button_7.classList.add('active')
			}
		}
		
	}

	function check_8(){
		if (button_prosto.classList.contains('active')){
			if (button_8.classList.contains('active')){
				button_8.classList.remove('active');
				button_9.classList.remove('active');
			}
			else{
				button_5.classList.add('active');
				button_6.classList.add('active');
				button_7.classList.add('active');
				button_8.classList.add('active');
			}
		}
		else{
			if (button_8.classList.contains('active')){
				button_8.classList.remove('active');
			}
			else{
				button_8.classList.add('active')
			}
		}
		
	}

	function check_9(){
		if (button_prosto.classList.contains('active')){
			if (button_9.classList.contains('active')){
				button_9.classList.remove('active');
			}
			else{
				button_5.classList.add('active');
				button_6.classList.add('active');
				button_7.classList.add('active');
				button_8.classList.add('active');
				button_9.classList.add('active');
			}
		}
		else{
			if (button_9.classList.contains('active')){
				button_9.classList.remove('active');
			}
			else{
				button_9.classList.add('active')
			}
		}
	}
function check_all(){
		if (!button_check_all.classList.contains('active')){
		button_check_all.classList.add('active');
		if (!button_1.classList.contains('active')) button_1.classList.add('active');
		if (!button_2.classList.contains('active')) button_2.classList.add('active');
		if (!button_3.classList.contains('active')) button_3.classList.add('active');
		if (!button_4.classList.contains('active')) button_4.classList.add('active');
		if (!button_5.classList.contains('active')) button_5.classList.add('active');
		if (!button_6.classList.contains('active')) button_6.classList.add('active');
		if (!button_7.classList.contains('active')) button_7.classList.add('active');
		if (!button_8.classList.contains('active')) button_8.classList.add('active');
		if (!button_9.classList.contains('active')) button_9.classList.add('active');
	}
	else{
		button_check_all.classList.remove('active');
		if (button_1.classList.contains('active') && !button_1.classList.contains('disabled')) button_1.classList.remove('active');
		if (button_2.classList.contains('active') && !button_2.classList.contains('disabled')) button_2.classList.remove('active');
		if (button_3.classList.contains('active') && !button_3.classList.contains('disabled')) button_3.classList.remove('active');
		if (button_4.classList.contains('active') && !button_4.classList.contains('disabled')) button_4.classList.remove('active');
		if (button_5.classList.contains('active') && !button_5.classList.contains('disabled')) button_5.classList.remove('active');
		if (button_6.classList.contains('active') && !button_6.classList.contains('disabled')) button_6.classList.remove('active');
		if (button_7.classList.contains('active') && !button_7.classList.contains('disabled')) button_7.classList.remove('active');
		if (button_8.classList.contains('active') && !button_8.classList.contains('disabled')) button_8.classList.remove('active');
		if (button_9.classList.contains('active') && !button_9.classList.contains('disabled')) button_9.classList.remove('active');
	}
}

function button_prosto_f(){
		document.getElementById('navbar_modul').innerHTML = '(просто)'; 
		if (button_prosto.classList.contains('active')){
			check_all();
		}
		else{
			button_6.classList.remove('disabled');
			button_7.classList.remove('disabled');
			button_8.classList.remove('disabled');
			button_9.classList.remove('disabled');
			Level = 1;
			button_prosto.classList.add('active');
			button_brat.classList.remove('active');
			button_drug.classList.remove('active');
			button_combo.classList.remove('active');
			button_random.classList.remove('active');

			button_check_all.classList.add('active');
			button_1.classList.add('active', 'disabled');
			button_2.classList.add('active', 'disabled');
			button_3.classList.add('active', 'disabled');
			button_4.classList.add('active', 'disabled');
			button_5.classList.add('active');
			button_6.classList.add('active');
			button_7.classList.add('active');
			button_8.classList.add('active');
			button_9.classList.add('active');
		}
		
	}

	function button_brat_f(){
		document.getElementById('navbar_modul').innerHTML = '(брат)'; 
		if (button_brat.classList.contains('active')){
			check_all();
		}
		else{
		button_1.classList.remove('disabled');
		button_2.classList.remove('disabled');
		button_3.classList.remove('disabled');
		button_4.classList.remove('disabled');
		Level = 2;
		button_prosto.classList.remove('active');
		button_brat.classList.add('active');
		button_drug.classList.remove('active');
		button_combo.classList.remove('active');
		button_random.classList.remove('active');

		button_check_all.classList.add('active');
		button_1.classList.add('active');
		button_2.classList.add('active');
		button_3.classList.add('active');
		button_4.classList.add('active');
		button_5.classList.add('active', 'disabled');
		button_6.classList.add('active', 'disabled');
		button_7.classList.add('active', 'disabled');
		button_8.classList.add('active', 'disabled');
		button_9.classList.add('active', 'disabled');
		}
		
	}

	function button_drug_f(){
		document.getElementById('navbar_modul').innerHTML = '(друг)'; 
		if (button_drug.classList.contains('active')){
			check_all();
		}
		else{
		button_1.classList.remove('disabled');
		button_2.classList.remove('disabled');
		button_3.classList.remove('disabled');
		button_4.classList.remove('disabled');
		button_5.classList.remove('disabled');
		button_6.classList.remove('disabled');
		button_7.classList.remove('disabled');
		button_8.classList.remove('disabled');
		button_9.classList.remove('disabled');
		Level = 3;
		button_prosto.classList.remove('active');
		button_brat.classList.remove('active');
		button_drug.classList.add('active');
		button_combo.classList.remove('active');
		button_random.classList.remove('active');

		button_check_all.classList.add('active');
		button_1.classList.add('active');
		button_2.classList.add('active');
		button_3.classList.add('active');
		button_4.classList.add('active');
		button_5.classList.add('active');
		button_6.classList.add('active');
		button_7.classList.add('active');
		button_8.classList.add('active');
		button_9.classList.add('active');
	}
	
	}

	function button_combo_f(){
		document.getElementById('navbar_modul').innerHTML = '(комбо)'; 
		if (button_combo.classList.contains('active')){
			check_all();
		}
		else{
			button_6.classList.remove('disabled');
			button_7.classList.remove('disabled');
			button_8.classList.remove('disabled');
			button_9.classList.remove('disabled');
			Level = 4;
			button_prosto.classList.remove('active');
			button_brat.classList.remove('active');
			button_drug.classList.remove('active');
			button_combo.classList.add('active');
			button_random.classList.remove('active');

			button_check_all.classList.add('active');
			button_1.classList.add('active', 'disabled');
			button_2.classList.add('active', 'disabled');
			button_3.classList.add('active', 'disabled');
			button_4.classList.add('active', 'disabled');
			button_5.classList.add('active', 'disabled');
			button_6.classList.add('active');
			button_7.classList.add('active');
			button_8.classList.add('active');
			button_9.classList.add('active');
		}
		
	}

	function button_random_f(){
		document.getElementById('navbar_modul').innerHTML = '(произв)'; 
		Level = 5;
		button_prosto.classList.remove('active');
		button_brat.classList.remove('active');
		button_drug.classList.remove('active');
		button_combo.classList.remove('active');
		button_random.classList.add('active');

		button_check_all.classList.add('active');
		button_1.classList.add('active', 'disabled');
		button_2.classList.add('active', 'disabled');
		button_3.classList.add('active', 'disabled');
		button_4.classList.add('active', 'disabled');
		button_5.classList.add('active', 'disabled');
		button_6.classList.add('active', 'disabled');
		button_7.classList.add('active', 'disabled');
		button_8.classList.add('active', 'disabled');
		button_9.classList.add('active', 'disabled');		
	}

function skorost_1(){
	var t = Math.abs(parseFloat(prompt("Введите интервал времени задержки в пределах 0.1 до 10 сек")));
	if (isNaN(t) || t < 0.1 || t > 10) {
		document.getElementById('Skorost_tablo').innerHTML = 1;
		document.getElementById('navbar_interval').innerHTML = '('+ 1+ ' сек)';
	}	
	else{
		
		document.getElementById('Skorost_tablo').innerHTML = t;
		document.getElementById('navbar_interval').innerHTML = '('+ t+ ' сек)';
	}
	
}

function skorost_plus(){
	var i = document.getElementById('Skorost_tablo').innerHTML;
	i = parseInt(i*10)/10;
	if (i >= 0 && i < 1) {
		i += 0.1;
		 document.getElementById('Skorost_tablo').innerHTML = i.toFixed(1);
		 document.getElementById('navbar_interval').innerHTML = '('+ i.toFixed(1)+ ' сек)';
	}
	else if (i >= 1 && i < 2) {
		i+=0.2;
		document.getElementById('Skorost_tablo').innerHTML = i.toFixed(1);
		document.getElementById('navbar_interval').innerHTML = '('+ i.toFixed(1)+ ' сек)';
	}
	else if (i >= 2 && i < 5) {
		i+=0.5;
		document.getElementById('Skorost_tablo').innerHTML = i.toFixed(1);
		 document.getElementById('navbar_interval').innerHTML = '('+ i.toFixed(1)+ ' сек)';
	}

	else {
		i+=1;
		document.getElementById('Skorost_tablo').innerHTML  = i;
		document.getElementById('navbar_interval').innerHTML = '('+ i+ ' сек)';
	}
}
	
function skorost_minus(){
	var i = document.getElementById('Skorost_tablo').innerHTML;
	// i = Math.ceil(i*10/10);
	if (i > 0 && i <= 1) {
		i -= 0.1;
		if (i < 0.2) {document.getElementById('Skorost_tablo').innerHTML = 0.1; document.getElementById('navbar_interval').innerHTML = 0.1;}
		else{ document.getElementById('Skorost_tablo').innerHTML = i.toFixed(1);
		 document.getElementById('navbar_interval').innerHTML = '('+ i.toFixed(1)+ ' сек)';
	}	}
	else if (i > 1 && i <= 2) {
		i -= 0.2;
		document.getElementById('Skorost_tablo').innerHTML = i.toFixed(1);
		 document.getElementById('navbar_interval').innerHTML = '('+ i.toFixed(1)+ ' сек)';
	}
	else if (i > 2 && i <= 5) {
		i -= 0.5;
		document.getElementById('Skorost_tablo').innerHTML = i.toFixed(1);
		 document.getElementById('navbar_interval').innerHTML = '('+ i.toFixed(1)+ ' сек)';
	}
	
	else {
		i -= 1;
		document.getElementById('Skorost_tablo').innerHTML  = i;
		document.getElementById('navbar_interval').innerHTML = '('+ i+ ' сек)';
	}
}


document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13|| e.keyCode === 32) {
        start_2();
    }
    return false;

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
  var audio = new Audio(); 
	audio.type="audio/mp3";
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
function power10(n){
	var d = 1;
	for (var i = 1; i <= n; i++) {
		d *= 10; 
	}
	return d;
}

function duplicat(b, c) {
    for (var d = [], e = {}, f = {}, a = 0; a < b.length; a++) e[b[a]] = !0;
    for (a = 0; a < c.length; a++) f[c[a]] = !0;
    for (var g in e) f[g] && d.push(g);
    return d;
};
function include(a,arr){
	var c = false, i = 0;
	while (c == false && i<arr.length) {
		if (a == arr[i++]) c = true;	
	}
	if (c == false) arr.push(a);
	return arr;
};

function exclude(a,arr){
	var c = false, i = 0;
	while (c == false && i < arr.length) {
		if (a == arr[i++]) {
		 	c = true;
		}	
	}
	if (c == true) {
		arr.splice(i-1,1);
	}
	return arr;
}

var 
chislo = 0,
chislo_plus_all = 0,
znak = 0,
schotchik = 0,
Kolslog = 0,
Kolcifr = 1,
cifr = [],
Level_Operation = 0,
Level =1,
Operation = 2,
Skorost = 0,
possible_checked_var = [],
chislo_plus = [],
vip = 0,
prav = 0,
wb_Timer1,
half = true,
Checked_cifr = [],
prav_percent = 0,
progress_up = 0,
progress_up_key = true,
progress_down_key = true;

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

 const POSSIBLE_CONST_PROSTO = 
[[[[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,5,6,7,8],[0,1,2,5,6,7],[0,1,5,6],[0,5],[0,1,2,3,4],[0,1,2,3],[0,1,2],[0,1],[0]],
   [[],[],[],[],[],[],[],[],[],[]]],

 [[[],[],[],[],[],[],[],[],[],[]],
   [[0],[0,1],[0,1,2],[0,1,2,3],[0,1,2,3,4],[0,5],[0,1,5,6],[0,1,2,5,6,7],[0,1,2,3,5,6,7,8],[0,1,2,3,4,5,6,7,8,9]]],

 [[[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,5,6,7,8],[0,1,2,5,6,7],[0,1,5,6],[0,5],[0,1,2,3,4],[0,1,2,3],[0,1,2],[0,1],[0]],
   [[0],[0,1],[0,1,2],[0,1,2,3],[0,1,2,3,4],[0,5],[0,1,5,6],[0,1,2,5,6,7],[0,1,2,3,5,6,7,8],[0,1,2,3,4,5,6,7,8,9]]]];

const POSSIBLE_CONST_BRAT =  
[[[[1,2,3,4],[4],[3,4],[2,3,4],[1,2,3,4],[0,1,2,3,4],[0,1,2,3],[0,1,2],[0,1],[0]],
   [[0],[0,1],[0,1,2],[0,1,2,3],[0,1,2,3,4],[0,5],[5],[5,6],[5,6,7],[5,6,7,8]]],

 [[[5,6,7,8],[5,6,7,8],[5,6,7],[5,6],[0,5],[0,1,2,3],[0,1,2],[0,1],[0,1],[0]],
   [[0],[0,1],[0,1,2],[0,1,2,3],[0,1,2,3,4],[1,2,3,4],[2,3,4],[3,4],[4],[1,2,3,4]]],
   
 [[[1,2,3,4],[4],[3,4],[2,3,4],[1,2,3,4],[0,1,2,3,4],[0,1,2,3],[0,1,2],[0,1],[0]],
   [[0],[0,1],[0,1,2],[0,1,2,3],[0,1,2,3,4],[1,2,3,4],[2,3,4],[3,4],[4],[0,1,2,3,4,5,6,7,8,9]]]]; 


const POSSIBLE_CONST_DRUG =
[[[[3,4,5,6,7],[9],[8,9],[7,8,9],[6,7,8,9],[5],[4,5,9],[3,4,5,8,9],[2,3,4,5,7,8,9],[1,2,3,4,5,6,7,8,9]],
   [[],[],[],[],[],[],[],[],[],[]]],

 [[[],[],[],[],[],[],[],[],[],[]],
  [[1,2,3,4,5,6,7,8,9],[2,3,4,5,7,8,9],[3,4,5,8,9],[4,5,9],[5],[6,7,8,9],[7,8,9],[8,9],[9],[3,4,5,6,7]]],

 [[[3,4,5,6,7],[9],[8,9],[7,8,9],[6,7,8,9],[5],[4,5,9],[3,4,5,8,9],[2,3,4,5,7,8,9],[1,2,3,4,5,6,7,8,9]],
   [[1,2,3,4,5,6,7,8,9],[2,3,4,5,7,8,9],[3,4,5,8,9],[4,5,9],[5],[6,7,8,9],[7,8,9],[8,9],[9],[3,4,5,6,7]]]];
   
const POSSIBLE_CONST_COMBO = 
[[[[5,6,7,8],[5,6,7],[3,4,5,6],[2,3,4,5],[6,7,8,9],[6,7,8,9],[6,7,8],[6,7],[6,7,8],[6,7,8,9]],
   [[],[],[],[],[],[],[],[],[],[]]],

 [[[],[],[],[],[],[],[],[],[],[]],
  [[6,7,8,9],[6,7,8],[6,7,8,9],[6,7,8],[6,7,8,9],[1,2,3],[1,2,3,4],[1,2,3,4,5],[1,2,3,4,5,6],[5,6,7,8]]],

 [[[1,2,3,4,5,6,7,8],[5,6,7,9],[3,4,5,6],[2,3,4,5],[6,7,8,9],[6,7,8,9],[6,7,8],[6,7],[6,7,8],[6,7,8,9]],
   [[6,7,8,9],[6,7,8],[6,7,8,9],[6,7,8],[6,7,8,9],[1,2,3],[1,2,3,4],[1,2,3,4,5],[1,2,3,4,5,6],[1,2,3,4,5,6,7,8]]]];



function whatchecked(){
	var arr=[];
			arr.push(0);
	 		if (button_1.classList.contains('active')) arr.push(1);
	 		if (button_2.classList.contains('active')) arr.push(2);
	 		if (button_3.classList.contains('active')) arr.push(3);
	 		if (button_4.classList.contains('active')) arr.push(4);
	 		if (button_5.classList.contains('active')) arr.push(5);
	 		if (button_6.classList.contains('active')) arr.push(6);
	 		if (button_7.classList.contains('active')) arr.push(7);
	 		if (button_8.classList.contains('active')) arr.push(8);
	 		if (button_9.classList.contains('active')) arr.push(9);
	 		if (arr.length == 1) arr.push(1);
	return arr;
}

function possible_checked (n,m){
	var arrchecked = Checked_cifr.slice();
	var initial = 
	[[[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,5,6,7,8],[0,1,2,5,6,7],[0,1,5,6],[0,5],[0,1,2,3,4],[0,1,2,3],[0,1,2],[0,1],[0]],
   [[0],[0,1],[0,1,2],[0,1,2,3],[0,1,2,3,4],[0,5],[0,1,5,6],[0,1,2,5,6,7],[0,1,2,3,5,6,7,8],[0,1,2,3,4,5,6,7,8,9]]];
	var arr_possible = [[[],[],[],[],[],[],[],[],[],[]],
   								   [[],[],[],[],[],[],[],[],[],[]]];
	if (n == 2){
   		for (var j = 0; j <= 1; j++){
			for (var k = 0; k <= 9; k++){
				arr_possible[j][k] = initial[j][k].slice();
			}
		}			
   	}
	switch (parseInt(n)) {
		case 1:
			for (var j = 0; j <= 1; j++){
				for (var k = 0; k <= 9; k++){
					arr_possible[j][k] = duplicat(arrchecked, POSSIBLE_CONST_PROSTO[m][j][k]);
					if (arr_possible[j][k].length == 0){
						arr_possible[j][k] = initial[j][k].slice();
					}
				}
			}
		break;	
		case 2:
			for (var j = 0; j <= 1; j++){
				for (var k = 0; k <= 9; k++){
				 	arr_possible[j][k] = POSSIBLE_CONST_BRAT[m][j][k].slice();
					}
			}
			switch (parseInt(m)){
				case 0: 
					for (var k = 1; k <= 4; k++){
						arr_possible[0][k] = duplicat(arrchecked, POSSIBLE_CONST_BRAT[m][0][k]);
						if (arr_possible[0][k].length == 0 || arr_possible[0][k] == 0){
							arr_possible[0][k] = initial[0][k].slice();
						}
					}
				break;
				case 1: 					
					for (var k = 5; k <= 8; k++){
						arr_possible[1][k] = duplicat(arrchecked, POSSIBLE_CONST_BRAT[m][1][k]);
						if (arr_possible[1][k].length == 0 || arr_possible[1][k] == 0){
							arr_possible[1][k] = initial[1][k].slice();
						}
					}
				break; 	
			}	
		break;	
		case 3:
			var r = 1, p = 1;
			switch (parseInt(m)) {
		 		case 0: r = 0; p = 0; break;
		 		case 1: r = 1; p = 1; break;
		 		case 2: r = 0; p = 1; break;
			}
			for (var j = r; j <= p; j++){
				for (var k = 0; k <= 9; k++){
					arr_possible[j][k] = duplicat(arrchecked, POSSIBLE_CONST_DRUG[m][j][k]);
					if (arr_possible[j][k].length == 0){
						arr_possible[j][k] = initial[j][k].slice();
					}
				}
			}
		break;	
		case 4:
			// var r = 1, p = 1;
			switch (parseInt(m)) {
		 		case 0: 
					for (var k = 0; k <= 4; k++){
						arr_possible[0][k] = POSSIBLE_CONST_COMBO[0][0][k].slice();
					}
					for (var k = 5; k <= 9; k++){
						arr_possible[0][k] = duplicat(arrchecked, POSSIBLE_CONST_COMBO[0][0][k]);
						if (arr_possible[0][k].length == 0){
							arr_possible[0][k] =  duplicat([6,7,8,9], POSSIBLE_CONST_DRUG[2][0][k]); 
						}
						if (arr_possible[0][k].length == 0){
							arr_possible[0][k] =  initial[0][k].slice(); 
						}
					}
				break;
		 		case 1:
		 			for (var k = 6; k <= 9; k++){
						arr_possible[1][k] = POSSIBLE_CONST_COMBO[1][1][k].slice();
					}
					for (var k = 0; k <= 5; k++){
						arr_possible[1][k] = duplicat(arrchecked, POSSIBLE_CONST_COMBO[1][1][k]);
						if (arr_possible[1][k].length == 0 /*|| arr_possible[j][k] == 0*/){
							arr_possible[1][k] =  duplicat([6,7,8,9],POSSIBLE_CONST_DRUG[2][1][k]);
						}
						if (arr_possible[1][k].length == 0){
							arr_possible[1][k] =  initial[1][k].slice(); 
						}
					}
		 		break;
		 		case 2: 
		 			for (var k = 0; k <= 4; k++){
						arr_possible[0][k] = POSSIBLE_CONST_COMBO[0][0][k].slice();
					}
					for (var k = 5; k <= 9; k++){
						arr_possible[0][k] = duplicat(arrchecked, POSSIBLE_CONST_COMBO[0][0][k]);
						if (arr_possible[0][k].length == 0){
							arr_possible[0][k] =  duplicat([6,7,8,9], POSSIBLE_CONST_DRUG[2][0][k]); 
						}
						if (arr_possible[0][k].length == 0){
							arr_possible[0][k] =  initial[0][k].slice(); 
						}
					}
					for (var k = 6; k <= 9; k++){
						arr_possible[1][k] = POSSIBLE_CONST_COMBO[1][1][k].slice();
					}
					for (var k = 0; k <= 5; k++){
						arr_possible[1][k] = duplicat(arrchecked, POSSIBLE_CONST_COMBO[1][1][k]);
						if (arr_possible[1][k].length == 0 /*|| arr_possible[j][k] == 0*/){
							arr_possible[1][k] =  duplicat([6,7,8,9],POSSIBLE_CONST_DRUG[2][1][k]);
						}
						if (arr_possible[1][k].length == 0){
							arr_possible[1][k] =  initial[1][k].slice(); 
						}
					}


		 		break;
			}
		break;

		case 5:
			for (var i = 0; i <= 9; i++) {
				for (var j = 0; j<=1; j++){
					arr_possible[j][i] = [0,1,2,3,4,5,6,7,8,9];
				}	
			}
		break;	
	}
	return arr_possible;	
}


function TimerStop() {
	clearInterval(wb_Timer1);
}

var timer1, timer2, timer3, timer4, mus = false;
function start_2(){	
	if (mus == true){
		mus = false;
		audio.pause();
	}
	else{
		if ( document.body.clientWidth < 600) Editbox_ekran.style.fontSize = 120;
		else{
			if (fullpage == true) Editbox_ekran.style.fontSize = 400; else Editbox_ekran.style.fontSize = 210;	
		}		
		Editbox_ekran.readOnly = true;
		if (document.getElementById('button_start').innerHTML == "►"){
			document.getElementById('button_start').innerHTML = "✖";
			document.getElementById('button_calc_start').innerHTML = "■";
			soundClick(1); 
			Editbox_ekran.value = 3;
			timer1 = setTimeout("soundClick(1); Editbox_ekran.value = 2;", 500);
			timer2 = setTimeout("soundClick(1); Editbox_ekran.value = '1' ;", 1000);
			timer3 = setTimeout(function(){
					soundClick(1);  
					if (document.body.clientWidth < 600){
						Editbox_ekran.style.fontSize = 100; 
						Editbox_ekran.value = 'Start'
					} 
					else {
						if (fullpage == true) Editbox_ekran.style.fontSize = 350; else Editbox_ekran.style.fontSize = 170;	
						// Editbox_ekran.style.fontSize = 170;
						Editbox_ekran.value = 'Start'
					}	
				}, 1500);
			timer4 = setTimeout("document.getElementById('button_start').innerHTML = '►';  start();  ", 2500);
	 	}
		else if (document.getElementById('button_start').innerHTML == "✖") {
			document.getElementById('button_start').innerHTML = "►";
			document.getElementById('button_calc_start').innerHTML = "►";
			clearTimeout(timer1); 
			clearTimeout(timer2); 
			clearTimeout(timer3); 
			clearTimeout(timer4); 
			Editbox_ekran.value = "►";
		}
		else start();
	}	 	
}

function start(){
	switch (document.getElementById('button_start').innerHTML){
		case "Отправить результаты":
			document.getElementById('button_start').innerHTML = "►";
			send_answer(prav_percent,prav);
		break;
		case "►":
			window_otvet.className = "panel panel-primary"
		 	if (document.body.clientWidth < 600) Editbox_ekran.style.fontSize = 120; 
		 	else{
		 		if (fullpage == true) Editbox_ekran.style.fontSize = 400; else Editbox_ekran.style.fontSize = 210;	
		 	 // Editbox_ekran.style.fontSize = 200; 
		 	}
			Editbox_ekran.value = "";
			Skorost = parseInt(document.getElementById('Skorost_tablo').innerHTML*1000);	
			Kolslog = parseInt(document.getElementById('Kolslog_tablo').innerHTML);
			Checked_cifr = whatchecked();
			Level_Operation = Level*10 + Operation;	
			schotchik = 0;
			document.getElementById('button_start').innerHTML = "■";
			chislo = 0;
			cifr = [];
			chislo_plus = [];
			for (i = 0; i < Kolcifr ; i++) {
				var t =  possible_checked(Level,Operation);
				possible_checked_var[i] = t.slice();
			}
			switch (parseInt(Level_Operation)) {
				case 10: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(4);
						chislo += cifr[i]*power10(i);
					}
					var i = Kolcifr - 1;
					cifr[i] = 1 + randomInteger(3);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_simple_add()", Skorost);
				} 
				break;

				case 11: {
					// znak = 1;
					chislo = 0;
					var t = Checked_cifr.slice();
					exclude(0,t);
					for (var i = 0; i < Kolcifr; i++){
						cifr[i] = t[randomInteger(t.length)]
						chislo += cifr[i]*power10(i);
					}
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_simple_sub()", Skorost);
				}
				break;

				case 12: {
					chislo = 0;
					var t = Checked_cifr.slice();
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = t[randomInteger(t.length)]
						chislo += cifr[i]*power10(i);
					}
					exclude(0,t);
					i = Kolcifr - 1;
					cifr[i] = t[randomInteger(t.length)]
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_simple_add_sub()", Skorost);
				} 
				break;

				case 20: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(5);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(3);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_brother_add()", Skorost);
				} 
				break;

				case 21: {
					chislo = 0;
					for (var i = 0; i < Kolcifr; i++){
						cifr[i] = 5+randomInteger(5);
						chislo += cifr[i]*power10(i);
					}
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_brother_sub()", Skorost);
				}
				break;

				case 22: {
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_brother_add_sub()", Skorost);
				} 
				break;

				case 30: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_friend_add()", Skorost);
				} 
				break;

				case 31: {
					znak = 1;
					chislo = 0;
					for (var i = 0; i < Kolcifr; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_friend_sub()", Skorost);
				} 
				break;

				case 32: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_friend_add_sub()", Skorost);
				} 
				break;

				case 40: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_combo_add()", Skorost);
				} 
				break;

				case 41: {
					znak = 1;
					chislo = 0;
					for (var i = 0; i < Kolcifr; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_combo_sub()", Skorost);
				} 
				break;

				case 42: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_combo_add_sub()", Skorost);
				} 
				break;
				case 50: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_random_add()", Skorost);
				} 
				break;

				case 51: {
					znak = 1;
					chislo = 0;
					for (var i = 0; i < Kolcifr; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_random_sub()", Skorost);
				} 
				break;

				case 52: {
					znak = 0;
					chislo = 0;
					for (var i = 0; i < Kolcifr-1; i++){
						cifr[i] = randomInteger(10);
						chislo += cifr[i]*power10(i);
					}
					i = Kolcifr - 1;
					cifr[i] = 2 + randomInteger(8);
					chislo += cifr[i]*power10(i);
					soundClick(2);
					Editbox_ekran.value = chislo;
					wb_Timer1 = setInterval("calculate_random_add_sub()", Skorost);
				} 
				break;
			}
			soundClick(2);
					Editbox_ekran.value = chislo;
			
			chislo = parseInt(chislo);
		break;
		case "■":
			audio.pause();
			audio.currentTime = 0.0;
			Editbox_ekran.value = "►";
			document.getElementById('button_start').innerHTML = "►";
			document.getElementById('button_calc_start').innerHTML = "►";
			TimerStop();
		break;
		case "✐":
			document.getElementById('button_start').innerHTML = "►";
			document.getElementById('button_calc_start').innerHTML = "►";
					// Editbox_ekran.value = chislo;
 			vip++;
 			if (parseInt(Editbox_ekran.value) == chislo){
 				soundClick2(1,1);
 				if (document.body.clientWidth < 600) Editbox_ekran.style.fontSize = 35; 
 				else{
 					if (fullpage == true) Editbox_ekran.style.fontSize = 100; else Editbox_ekran.style.fontSize = 50;	
 				 // Editbox_ekran.style.fontSize = 50;
 				}
 				Editbox_ekran.value = "\n"+ parseInt(Editbox_ekran.value) + " = " + chislo + "\n"+ correct[randomInteger(59)];
 				progress_up++;
 				prav++;
 				if (prav % 10 == 0) {
 					soundClick2(2,1);
 					mus = true;
 				}
 				window_otvet.className = "panel panel-success";

 			}
 			else{
 				soundClick2(0,1);
 				if (document.body.clientWidth < 600) Editbox_ekran.style.fontSize = 35; 
 				else{
 					if (fullpage == true) Editbox_ekran.style.fontSize = 100; else Editbox_ekran.style.fontSize = 50;	
 				 // Editbox_ekran.style.fontSize = 50; 
 				 }				
 				Editbox_ekran.value ="\n"+ parseInt(Editbox_ekran.value) + "≠" + chislo + "\n"+  "Ошибочка";
 				window_otvet.className = "panel panel-danger";
 				progress_up--;
 			}
 			switch (progress_up){
 				case 2:
 					progress_up = 0;
 					if (progress_up_key == false) Kolslog_plus();
 					else skorost_minus();
 					progress_up_key = !progress_up_key;
 				break;
 				case -2:	
 					progress_up = 0;
 					if (progress_down_key == false) Kolslog_minus();
 					else skorost_plus();
 					progress_down_key = !progress_down_key;
 				break;	
 			}
 			show_pravilno();
 		break;
	}	
}

function yes_no(a,arr){ 
	var c = false, i = 0;
	while (c == false && i<arr.length) {
		if (a == arr[i++]) c = true;	
	}
	return c;
}
function ravno(){
	TimerStop();
	document.getElementById('button_start').innerHTML = "✐";
	document.getElementById('button_calc_start').innerHTML = "✐";
	Editbox_ekran.value = "";
	if (document.body.clientWidth > 600){
	 	Editbox_ekran.readOnly = false;
	 	document.getElementById("Editbox_ekran").focus();
	}
}
function chislo_plus_f(){
	chislo += chislo_plus_all;
	soundClick(2);
	if (Editbox_ekran.style.color == "white") Editbox_ekran.style.color = "PaleGreen";
	else Editbox_ekran.style.color = "white"; 
	Editbox_ekran.value = chislo_plus_all;
	chislo = parseInt(chislo);
	chislo_plus_all = parseInt(chislo_plus_all);
}

function chislo_minus_f(){
	chislo -= chislo_plus_all;		
	soundClick(2);
	if (Editbox_ekran.style.color == "white") Editbox_ekran.style.color = "PaleGreen";
	else Editbox_ekran.style.color = "white"; 
	Editbox_ekran.value = "-" + chislo_plus_all;
	chislo = parseInt(chislo);
	chislo_plus_all = parseInt(chislo_plus_all);
}

function calculate_simple_add() {
	var max_chislo = 0;
	if (yes_no(5,Checked_cifr)) {
		for (var i = 0; i < Kolcifr; i++){
			max_chislo += 9*power10(i); 
		}
	}	
	else{
		for (var i = 0; i < Kolcifr; i++){
			max_chislo += 4*power10(i); 
		}
	}	
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	if (chislo == max_chislo || schotchik == Kolslog) {
		ravno();
	}
	else {
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
				if (p.length == 0 || p[0] == 0) {
					possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
					p = possible_checked_var[i][znak][cifr[i]].slice();
				}
				chislo_plus[i] = p[randomInteger(p.length)];
				chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
			
		for (var i = 0; i < Kolcifr; i++) {
			cifr[i] += parseInt(chislo_plus[i]);
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
		chislo_plus_f();
	}
}


function calculate_simple_sub() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	if (chislo == 0 || schotchik == Kolslog) {
		ravno();		
	}
	else {
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr; i++) {
				var p = possible_checked_var[i][1][cifr[i]];
				if (p.length == 0 || p[0] == 0) {
					possible_checked_var[i][1][cifr[i]] = POSSIBLE_CHECKED_CONST[1][cifr[i]].slice();
					p = possible_checked_var[i][1][cifr[i]];
				}
				chislo_plus[i] = p[randomInteger(p.length)];
				chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
			
		for (var i = 0; i < Kolcifr; i++) {
			cifr[i] -= parseInt(chislo_plus[i]);
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
		chislo_minus_f();
	}
}
function calculate_simple_add_sub() {	
	chislo = parseInt(chislo);
	var max_chislo_4 = 0, l = Checked_cifr.length-1; 
	if (l == 4){
		for (var i = 0; i < Kolcifr; i++){
			max_chislo_4 += 4*power10(i); 
		}
	}
	var max_chislo = power10(Kolcifr) - 1;
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		var vspom_chislo = 0;
		for (var i = 0; i < Kolcifr; i++){
			vspom_chislo += 5*power10(i);
		}
		
		switch (chislo){
			case 0: znak = 0; break;
			case vspom_chislo: znak = 0; break;
			case max_chislo: znak = 1; break;
			case max_chislo_4: 
				if ( l == 4 ) znak = 1; else znak = randomInteger(2); break;
			default: znak = randomInteger(2); break;
		}
		var razmer = parseInt((chislo.toString()).length);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
			var uio = chislo%power10(Kolcifr-1);
			switch (chislo%power10(Kolcifr-1)){
				case 0: znak = 0; break;
				case parseInt(vspom_chislo/10): znak = 0; break;
				case parseInt(max_chislo/10): znak = 1; break;
				case parseInt(max_chislo_4/10): 
					if ( l == 4 ) znak = 1; else znak = randomInteger(2); break;
				default: znak = randomInteger(2); break;		
			}
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			
			for (var i = 0; i < Kolcifr - per; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
				if (p.length == 0 || p[0] == 0) {
					possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
					p = possible_checked_var[i][znak][cifr[i]].slice();
				}
				chislo_plus[i] = p[randomInteger(p.length)];
				chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
		for (var i = 0; i < Kolcifr-per; i++) {
			if (znak == 0) 	cifr[i] += parseInt(chislo_plus[i]);
			else cifr[i] -= parseInt(chislo_plus[i]);
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}

		if (znak == 0) {
			chislo_plus_f();
		}
		else {
			chislo_minus_f();
		}
	}
}

function calculate_brother_add() {
	var max_chislo = power10(Kolcifr)-1;
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		var vspom_chislo1 = 0, vspom_chislo2 = 0;
		for (var i = 0; i < Kolcifr; i++){
			vspom_chislo1 += 5*power10(i);
			vspom_chislo2 += 7*power10(i);
		}
		if (chislo >= vspom_chislo2) znak = 1;
		else if (chislo < vspom_chislo1) znak = 0;
		else znak = randomInteger(2);
		var razmer = parseInt((chislo.toString()).length);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
			switch (chislo%power10(Kolcifr-1)){
				case 0: znak = 0; break;
				case parseInt(max_chislo/10): znak = 1; break;
				default: znak = randomInteger(2); break;		
			}
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr-per; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
				if (p.length == 0 || p[0] == 0) {
					possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
					p = possible_checked_var[i][znak][cifr[i]].slice();
				}
				chislo_plus[i] = p[randomInteger(p.length)];
				chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr-per; i++) {
			if (znak == 0) 	cifr[i] += parseInt(chislo_plus[i]);
			else cifr[i] -= parseInt(chislo_plus[i]);
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}

		if (znak == 0) {
			chislo_plus_f();
		}
		else {
			chislo_minus_f();
		}
	}
}

function calculate_brother_sub() {
	var max_chislo = power10(Kolcifr)-1;
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		var vspom_chislo1 = 0;
		for (var i = 0; i < Kolcifr; i++){
			vspom_chislo1 += 5*power10(i);		
		}
		if (chislo < vspom_chislo1) znak = 0;
		else znak = 1;
		var razmer = parseInt((chislo.toString()).length);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 &&  schotchik % 2 == 1){	
			per = 1;
			switch (chislo%power10(Kolcifr-1)){
				case 0: znak = 0; break;
				case parseInt(max_chislo/10): znak = 1; break;
				default: znak = randomInteger(2); break;		
			}
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr-per; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
				if (p.length == 0 || p[0] == 0) {
					possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
					p = possible_checked_var[i][znak][cifr[i]].slice();
				}
				chislo_plus[i] = p[randomInteger(p.length)];
				chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr-per; i++) {
			if (cifr[i]>=5 && cifr[i] <= 8) {
				for (var k = 5; k <= 9; k++){
				 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
				 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
				}		
			}	
			else {
				for (var k = 0; k <= 4; k++){
				 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
				 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
				}		
			}	
			if (znak == 0) 	cifr[i] += parseInt(chislo_plus[i]);
			else cifr[i] -= parseInt(chislo_plus[i]);
		}

		if (znak == 0) chislo_plus_f();
		else chislo_minus_f();
	}
}

function calculate_brother_add_sub() {
	var max_chislo = power10(Kolcifr)-1;
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		var vspom_chislo1 = 0, vspom_chislo2 = 0;
		for (var i = 0; i < Kolcifr; i++){
			vspom_chislo1 += 5*power10(i);
			vspom_chislo2 += 7*power10(i);
		}
		if (chislo >= vspom_chislo2) znak = 1;
		else if (chislo < vspom_chislo1) znak = 0;
		else znak = randomInteger(2);
		var razmer = parseInt((chislo.toString()).length);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
			switch (chislo%power10(Kolcifr-1)){
				case 0: znak = 0; break;
				case parseInt(max_chislo/10): znak = 1; break;
				default: znak = randomInteger(2); break;		
			}
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr-per; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
					if (p.length == 0 || p[0] == 0) {
						possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
						p = possible_checked_var[i][znak][cifr[i]].slice();
					}
					chislo_plus[i] = p[randomInteger(p.length)];
					chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr-per; i++) {
			if (znak == 0) 	cifr[i] += parseInt(chislo_plus[i]);
			else cifr[i] -= parseInt(chislo_plus[i]);
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}

		if (znak == 0) chislo_plus_f();
		else chislo_minus_f();
	}	
}

function calculate_friend_add() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		var razmer = parseInt((chislo.toString()).length);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr-per; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
				if (p.length == 0 || p[0] == 0) {
					possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
					p = possible_checked_var[i][znak][cifr[i]].slice();
				}
				chislo_plus[i] = p[randomInteger(p.length)];
				chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr-per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
		chislo_plus_f();
		cifr.length = 0;
		for (var i = 0; i < Kolcifr; i++) {
 			cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 		}
			
	}
}

function calculate_friend_sub() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	var razmer = 0;
	razmer = parseInt((chislo.toString()).length);
	
	if (razmer == 1 || schotchik == Kolslog) {
		ravno();
	}
	else {
		var per = 0;
		if (half == true && razmer > 2  && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do { 
			chislo_plus_all = 0;
			chislo_plus = undefined;
			chislo_plus = [];
			for (var i = 0; i < razmer - 1 - per; i++) {
				var p = possible_checked_var[i][1][cifr[i]];
				if (p.length == 0 || p[0] == 0) {
					possible_checked_var[i][1][cifr[i]] = POSSIBLE_CHECKED_CONST[1][cifr[i]].slice();
					p = possible_checked_var[i][1][cifr[i]];
				}
				chislo_plus[i] = p[randomInteger(p.length)];
				chislo_plus_all += chislo_plus[i]*power10(i);
			}		
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < razmer - 1 - per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}

		chislo_minus_f();
		razmer = parseInt((chislo.toString()).length);
		cifr.length = 0;
		for (var i = 0; i < razmer; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
 		cifr.length = razmer - 1;		
	

	}
}

function calculate_friend_add_sub() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	var razmer = 0;
	razmer = parseInt((chislo.toString()).length);
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		if (razmer == 1) znak = 0;
		else znak =  randomInteger(2);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			if (znak == 0){
				for (var i = 0; i < Kolcifr - per; i++) {
					var p = possible_checked_var[i][znak][cifr[i]].slice();
					if (p.length == 0 || p[0] == 0) {
						possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
						p = possible_checked_var[i][znak][cifr[i]].slice();
					}
					chislo_plus[i] = p[randomInteger(p.length)];
					chislo_plus_all += chislo_plus[i]*power10(i);			
				}
			}
			else{
				if (razmer > Kolcifr){
					for (var i = 0; i < Kolcifr - per; i++) {
						var p = possible_checked_var[i][znak][cifr[i]].slice();
						if (p.length == 0 || p[0] == 0) {
							possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
							p = possible_checked_var[i][znak][cifr[i]].slice();
						}
						chislo_plus[i] = p[randomInteger(p.length)];
						chislo_plus_all += chislo_plus[i]*power10(i);			
					}
				}
				else{
					for (var i = 0; i < razmer - 1; i++) {
						var p = possible_checked_var[i][znak][cifr[i]].slice();
						if (p.length == 0 || p[0] == 0) {
							possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
							p = possible_checked_var[i][znak][cifr[i]].slice();
						}
						chislo_plus[i] = p[randomInteger(p.length)];
						chislo_plus_all += chislo_plus[i]*power10(i);			
					}
				}	
			}	
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr - per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
		if (znak == 0) {
			chislo_plus_f();
			cifr.length = 0;
			for (var i = 0; i < Kolcifr; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
		}
		else {
			chislo_minus_f();
			cifr.length = 0;
			for (var i = 0; i < Kolcifr; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
		}	
	}
}
	
function calculate_combo_add() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		var razmer = parseInt((chislo.toString()).length);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr-per; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
					if (p.length == 0 || p[0] == 0) {
						possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
						p = possible_checked_var[i][znak][cifr[i]].slice();
					}
					chislo_plus[i] = p[randomInteger(p.length)];
					chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
		for (var i = 0; i < Kolcifr-per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
			chislo_plus_f();
			cifr.length = 0;
			for (var i = 0; i < Kolcifr; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
	
	}
}

function calculate_combo_sub() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation).slice();
	
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	var razmer = 0;
	razmer = parseInt((chislo.toString()).length);
	
	if (razmer == 1 || schotchik == Kolslog) {
		ravno();
	}
	else {
		var per = 0;
		if (half == true && razmer > 2 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do { 
			chislo_plus_all = 0;
			chislo_plus = undefined;
			chislo_plus = [];
			
			
			for (var i = 0; i < razmer - 1 - per; i++) {
				var p = possible_checked_var[i][1][cifr[i]];
					if (p.length == 0 || p[0] == 0) {
						possible_checked_var[i][1][cifr[i]] = POSSIBLE_CHECKED_CONST[1][cifr[i]].slice();
						p = possible_checked_var[i][1][cifr[i]];
					}
					chislo_plus[i] = p[randomInteger(p.length)];
					chislo_plus_all += chislo_plus[i]*power10(i);
			}		
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < razmer - 1 - per; i++) {
			for (var k = 0; k <= 4; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}

		chislo_minus_f();
		razmer = parseInt((chislo.toString()).length);	
		cifr.length = 0;
		for (var i = 0; i < razmer; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
 		cifr.length = razmer - 1;		
	}
}

function calculate_combo_add_sub() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	var razmer = 0;
	razmer = parseInt((chislo.toString()).length);
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		if (razmer == 1) znak = 0;
		else znak =  randomInteger(2);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			if (znak == 0){
				for (var i = 0; i < Kolcifr - per; i++) {
					var p = possible_checked_var[i][znak][cifr[i]].slice();
						if (p.length == 0 || p[0] == 0) {
							possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
							p = possible_checked_var[i][znak][cifr[i]].slice();
						}
						chislo_plus[i] = p[randomInteger(p.length)];
						chislo_plus_all += chislo_plus[i]*power10(i);			
				}
			}
			else{
				if (razmer > Kolcifr){
					for (var i = 0; i < Kolcifr - per; i++) {
						var p = possible_checked_var[i][znak][cifr[i]].slice();
							if (p.length == 0 || p[0] == 0) {
								possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
								p = possible_checked_var[i][znak][cifr[i]].slice();
							}
							chislo_plus[i] = p[randomInteger(p.length)];
							chislo_plus_all += chislo_plus[i]*power10(i);			
					}
				}
				else{
					for (var i = 0; i < razmer - 1; i++) {
						var p = possible_checked_var[i][znak][cifr[i]].slice();
							if (p.length == 0 || p[0] == 0) {
								possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
								p = possible_checked_var[i][znak][cifr[i]].slice();
							}
							chislo_plus[i] = p[randomInteger(p.length)];
							chislo_plus_all += chislo_plus[i]*power10(i);			
					}
				}	
			}	
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr - per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
		if (znak == 0) {
			chislo_plus_f();
			cifr.length = 0;
			for (var i = 0; i < Kolcifr; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
		}
		else {
			chislo_minus_f();
			cifr.length = 0;
			for (var i = 0; i < Kolcifr; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}			
		}
	}
}

function calculate_random_add() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		var razmer = parseInt((chislo.toString()).length);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;		
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			for (var i = 0; i < Kolcifr - per; i++) {
				var p = possible_checked_var[i][znak][cifr[i]].slice();
					if (p.length == 0 || p[0] == 0) {
						possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
						p = possible_checked_var[i][znak][cifr[i]].slice();
					}
					chislo_plus[i] = p[randomInteger(p.length)];
					chislo_plus_all += chislo_plus[i]*power10(i);			
			}
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr - per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
		chislo_plus_f();
		cifr.length = 0;
		for (var i = 0; i < Kolcifr; i++) {
 			cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 		}
	}
}

function calculate_random_sub() {
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	var razmer = 0;
	razmer = parseInt((chislo.toString()).length);
	
	if (razmer == 1 || schotchik == Kolslog) {
		ravno();
	}
	else {
		var per = 0;
		if (half == true && razmer > 2 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do { 
			chislo_plus_all = 0;
			chislo_plus = undefined;
			chislo_plus = [];
			
			
			for (var i = 0; i < razmer - 1 - per; i++) {
				var p = possible_checked_var[i][1][cifr[i]];
					if (p.length == 0 || p[0] == 0) {
						possible_checked_var[i][1][cifr[i]] = POSSIBLE_CHECKED_CONST[1][cifr[i]].slice();
						p = possible_checked_var[i][1][cifr[i]];
					}
					chislo_plus[i] = p[randomInteger(p.length)];
					chislo_plus_all += chislo_plus[i]*power10(i);
			}		
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < razmer - 1 - per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}
		chislo_minus_f();
		razmer = parseInt((chislo.toString()).length);	
		cifr.length = 0;
		for (var i = 0; i < razmer; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
 		cifr.length = razmer - 1;	
	}
}

function calculate_random_add_sub() {	
	var POSSIBLE_CHECKED_CONST =  possible_checked(Level,Operation);
	chislo_plus = []; chislo_plus_all = 0;
	schotchik++;
	var razmer = 0;
	razmer = parseInt((chislo.toString()).length);
	if (schotchik == Kolslog) {
		ravno();
	}
	else {
		if (razmer == 1) znak = 0;
		else znak =  randomInteger(2);
		var per = 0;
		if (half == true && razmer > 1 && Kolcifr > 1 && schotchik % 2 == 1){	
			per = 1;
		}	
		else per = 0;
		do {
			chislo_plus_all = 0;
			chislo_plus = [];
			if (znak == 0){
				for (var i = 0; i < Kolcifr - per; i++) {
					var p = possible_checked_var[i][znak][cifr[i]].slice();
						if (p.length == 0 || p[0] == 0) {
							possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
							p = possible_checked_var[i][znak][cifr[i]].slice();
						}
						chislo_plus[i] = p[randomInteger(p.length)];
						chislo_plus_all += chislo_plus[i]*power10(i);			
				}
			}
			else{
				if (razmer > Kolcifr){
					for (var i = 0; i < Kolcifr - per; i++) {
						var p = possible_checked_var[i][znak][cifr[i]].slice();
							if (p.length == 0 || p[0] == 0) {
								possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
								p = possible_checked_var[i][znak][cifr[i]].slice();
							}
							chislo_plus[i] = p[randomInteger(p.length)];
							chislo_plus_all += chislo_plus[i]*power10(i);			
					}
				}
				else{
					for (var i = 0; i < razmer - 1; i++) {
						var p = possible_checked_var[i][znak][cifr[i]].slice();
							if (p.length == 0 || p[0] == 0) {
								possible_checked_var[i][znak][cifr[i]] = POSSIBLE_CHECKED_CONST[znak][cifr[i]].slice();
								p = possible_checked_var[i][znak][cifr[i]].slice();
							}
							chislo_plus[i] = p[randomInteger(p.length)];
							chislo_plus_all += chislo_plus[i]*power10(i);			
					}
				}	
			}	
		} while (chislo_plus_all == 0);
		
		for (var i = 0; i < Kolcifr - per; i++) {
			for (var k = 0; k <= 9; k++){
			 	exclude(chislo_plus[i],possible_checked_var[i][0][k]);
			 	exclude(chislo_plus[i],possible_checked_var[i][1][k]);
			}	
		}

		if (znak == 0) {
			chislo_plus_f();
			cifr.length = 0;
			for (var i = 0; i < Kolcifr; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
		}
		else {
			cifr.length = 0;
			for (var i = 0; i < Kolcifr; i++) {
 				cifr[i] = parseInt((chislo % power10(i + 1))/power10(i));
 			}
			chislo_minus_f();
		}
	}
}

