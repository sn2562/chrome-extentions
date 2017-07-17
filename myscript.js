//htmlから実行する

var timer;//タイマーの管理
var timer_switch=true;//タイマー起動
var evt = document.createEvent("MouseEvents");//クリックイベントの発火
var boss_battle=false;
var count = 0;
var useDrag = false;

evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

$(function() {
	$('body').css('background', '#b29494');
	boss_battle = false;
	timer_switch = true;
	mainloop();
});

//$(window).load(function () {
//	console.log("実行");
//	$('body').css('background', '#b29494');
//	boss_battle = false;
//	timer_switch = true;
//
//	mainloop();
//});

var mainloop = function(){
	console.log("loop count : " +count);
	var url = window.location.href;
	console.log("url : "+ url ) ;

	if(/dice-map-select/.test(url)){//
		var num = $(".mapDetail-middle").children("p").children("span").eq(1).text().substr(1);
		num = Number(num);
		console.log("map_select : 残りマップ数 : "+ num);
		if(num>=1){//二枚以上すごろくが残っている時
			map_selection();

		}else if(num==1){
			//タイマーを止める
			timer_switch=false;
			//			alert("停止しました");
		}else{
			//リロード
			window.location.reload();//ブラウザをリフレッシュ
		}
		//		console.log($("#jsiMapList .actBtnSq.jscTouchActive.w110.fs13"));
	}else if(/dice-map-clear/.test(url)){//サイコロ結果画面
		console.log("map result");
		//actBtn jscTouchActive mb5
		var elements = document.getElementsByClassName( "actBtn jscTouchActive mb5" );
		//クリックイベントをディスパッチ起動
		elements[0].dispatchEvent( evt );

		//		window.location.reload();//ブラウザをリフレッシュ
	}else if(/dice-map/.test(url)){//マップ進行
		console.log("dice-map");
		move_map();
	}else if(/dice-battle-result/.test(url)){//戦闘結果画面 btnMainWire
		console.log("すごろくへ戻る");
		window.location.reload();//ブラウザをリフレッシュ
	}else if(/dice-battle/.test(url)){//戦闘
		console.log("dice-battle");
		//				colorPicker();
		//
		if(boss_battle){
//						dice_battle();//バトルを進行する
			dice_battle_autoCharge();//バトルを進行する
			//						dice_battle_avoid();
		}else{
//									dice_battle();
			dice_battle_autoCharge();//薬を使って進行する
// 						dice_battle_avoid();//バトルから逃げる
		}


	}else if(/dice-area/.test(url)){//commonMsg

		dice_area();
		console.log("エリア選択");

	}else if(/dice/.test(url)){//
		console.log("いざすごろくの旅へ");
		//btn-main jscTouchActive
		var elements = document.getElementsByClassName( "btn-main jscTouchActive" );
		//クリックイベントをディスパッチ起動
		elements[0].dispatchEvent( evt );
		//		window.location = "/dice/dice-map-select";
	}else{
		timer_switch=false;
	}
	//	dice-battle
	if(timer_switch){
		count++;
		timer = setTimeout (mainloop,1000);
	}else{
	}
}

var dice_area = function(){
	if(document.getElementById('commonMsg').offsetHeight){
		console.log('表示されている');
		//actBtn jscTouchActive jscConfirmBtn,3つのクラス名を持つ要素を取得
		var elements = document.getElementsByClassName( "actBtn jscTouchActive jscConfirmBtn" );
		//クリックイベントをディスパッチ起動
		elements[0].dispatchEvent( evt );
	}else{

		var elements =  document.getElementsByClassName("decoBtn jscTouchActive area-summary-btn-map jscMapBtn");
		//クリックイベントをディスパッチ起動
		elements[0].dispatchEvent( evt );
	}
}

var battle_result = function(){
	$(".actBtn").eq(0).trigger("click");
}

var map_selection = function(){
	var a = $("#jsiMapList").eq(0);//actBtnSq jscTouchActive w110 fs13
	var elements =  document.getElementsByClassName( "actBtnSq jscTouchActive w110 fs13");
	//クリックイベントをディスパッチ起動
	elements[0].dispatchEvent( evt );
}

var move_map = function(){
	//フィーバーになっていたらクリックする
	if(document.getElementById('jsiMapEffectPopup').offsetHeight){
		console.log("ホバー画面をクリック");
		window.location.reload();//ブラウザをリフレッシュ
		//		$("#jsiMapEffectCanvas").trigger("click");
	}else{

		console.log("マップを進む");
		//jsiRollDiceのクリックイベントを発火させてダイスを振る
		$("#jsiRollDice").trigger("click");
	}
	//	timer = setTimeout (move_map,1000);

}
var dice_battle_avoid = function(){

	//もし"ボスから逃げる画面"のcommonMsgが表示されていたら押す
	//
	if(document.getElementById('commonMsg').offsetHeight){
		console.log('表示されている');
		//ボス戦
		if ( $("#commonMsg p").text().match(/失敗/)) {
			boss_battle = true;//逃げられない時はボス戦なので戦う準備
		}

		//actBtn jscTouchActive jscConfirmBtn,3つのクラス名を持つ要素を取得
		var elements = document.getElementsByClassName( "actBtn jscTouchActive jscConfirmBtn" );
		//クリックイベントをディスパッチ起動
		elements[0].dispatchEvent( evt );
	}else{
		console.log("逃げたい");
		// eBoxA のクリックイベントをディスパッチ起動
		var jsiEscapeButton = document.getElementById("jsiEscape");
		jsiEscapeButton.dispatchEvent( evt );

	}
}

var dice_battle = function(){
	console.log("戦闘");
	$("#jsiDice").trigger("click");
	$(".jscCommand ").eq(1).trigger("click");
	//	timer = setTimeout (dice_battle,800);
}
var dice_battle_autoCharge = function(){
	console.log("戦闘");
	//もしも薬仕様ダイアログが表示されていたら
	//jsiDiceUseReviveItemがblockならば
	console.log(document.getElementById("jsiDiceUseReviveItem").style.display);

	if(useDrag){
		console.log("命の水をほんとにつかうよ！！");
		var elements = document.getElementsByClassName( "actBtn jscTouchActive jscConfirmBtn" );
		//クリックイベントをディスパッチ起動
		elements[0].dispatchEvent( evt );

		useDrag = false;
	}else if(document.getElementById("jsiDiceUseReviveItem").style.display == 'block'){
		console.log("命の水を使う");
		//薬使う
		var elements = document.getElementsByClassName( "actBtn jscTouchActive jscConfirmBtn btnMain" );
		//クリックイベントをディスパッチ起動
		elements[0].dispatchEvent( evt );
		console.log(elements[0]);

		useDrag = true;

		//攻撃する
		//		$("#jsiDice").trigger("click");
		//		$(".jscCommand ").eq(1).trigger("click");
	}else{
		console.log("薬つかわんで攻撃");
		$("#jsiDice").trigger("click");
		$(".jscCommand ").eq(1).trigger("click");
	}
	//薬を使用する

	//	dialogBox diceUseReviveItem
}

var commonMsgClick = function(){
	//ホバーで表示されている要素のクリック
}

//指定された画像の左上の色を見て、ボス判定を行う
var colorPicker = function(){
	var cvs = document.getElementById("jsiBossBattleCanvas");
	var ctx = cvs.getContext("2d");

	var imageData = ctx.getImageData(0, 0, 2, 2);
	console.log(imageData.width); // 出力：2
	console.log(imageData.height); // 出力：2
	console.log(imageData.data); // 出力：CanvasPixelArray

}
var createCanvasIMG = function(){

	var cvs = document.getElementById("jsiBossBattleCanvas");
	var ctx = cvs.getContext("2d");
	var png = cvs.toDataURL();

	newDiv.src = png;
}

var colorPicker2 = function(){
	// 画像
	img = $id('img');
	img.addEventListener('load', loadComplete, false);
	img.src = IMG_URL[Math.floor(Math.random () * IMG_URL.length)];

	// 色情報を取得するための canvas
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

	// カラー表示
	display = $id('display');
	inputs = {
		r: $id('r'), g: $id('g'), b: $id('b'), // RGB
		hex: $id('hex'), // HEX
		h: $id('h'), s: $id('s'), l: $id('l') // HSL
	};
	// ピッカー
	picker = $id('cursor');
}
