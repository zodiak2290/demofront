window.Cliengo = {}; //all Cliengo configs, functions and params goes into this object

window.Cliengo.chatConfig = {
  "companyId" : "5d606764e4b04910ecc8138e",
  "websiteId" : "5d606765e4b04910ecc81391",
}


loadMain();

function loadMain() {
  
   const div = document.createElement('div');
   
   //div.setAttribute("id", "Div1");
   div.id = 'myChat';
   
   div.style.height="70px";
   div.style.maxHeight='70px';
   div.style.width ="70px";

   div.style.position = "fixed";
   div.style.backgroundColor = "skyblue";

   div.style.bottom  = "6px";
   
   div.style.zIndex = "99999999999999999";

   div.style.right = "8px";

   div.style.borderRadius ="84px";


   const icon = document.createElement('img');
   icon.addEventListener("click", openChat);
   icon.id = 'myIcon';
   icon.style.cursor = 'pointer';
   icon.style.margin = "20px";
   icon.style.fontSize = "25px";
   icon.className = "far fa-comments";
   icon.src = 'https://www.seekpng.com/png/full/905-9056717_png-file-svg-chat-icon-white-png.png';
   icon.style.width = '30px';
   icon.style.height = '30px';
   div.appendChild(icon);
   //div.innerHTML = '<i class="far fa-comments" aria-hidden="true" style="margin:20px; font-size=25px></i>';
   
   //document.getElementsByTagName('body').appendChild(div);

   document.body.appendChild(div);
}

function openChat() {
	const div = document.getElementById('myChat');
   
   	div.style.height="510px";
   	div.style.maxHeight='510px';
   	div.style.width ="330px";

   	div.style.borderRadius ="14px";

   	div.appendChild( addChat() );

   	//div.appendChild( addEmojis() 
   	const divtopbar = document.getElementById('topbar');
   
    divtopbar.style.backgroundColor = '#25d366';
    divtopbar.style.borderRadius = '14px 14px 0 0';
    divtopbar.style.height = '3.65rem';

    const topbarTitle = document.getElementsByClassName('topbar-title');

    topbarTitle[0].style.marginLeft = '9px';
    topbarTitle[0].style.marginTop = '1px';

    const topbarSubTitle = document.getElementsByClassName('topbar-subtitle');

    topbarSubTitle[0].style.marginLeft = '9px';

    const messageswindow = document.getElementById('messages-window');
    messageswindow.style.width = '94%';
    messageswindow.style.backgroundColor = '#f8f9fa';

    messageswindow.style.height = '370px';
    messageswindow.style.maxHeight = '370px';
    messageswindow.style.overflowy = 'auto';
    messageswindow.style.margin = '10px';
    messageswindow.style.borderRadius = '6px';
    messageswindow.style.padding = '3px';

    const converseChatInput = document.getElementsByClassName('footer converse-chat-input');
    converseChatInput[0].style.display = 'flex';
    converseChatInput[0].style.alignItems = 'center';
    converseChatInput[0].style.justifyContent = 'center';

    let myElements = document.getElementsByClassName("chatbox-message-container message-from-robot");

	for (let i = 0; i < myElements.length; i++) {
		myElements[i].style.fontSize = '12px';
		myElements[i].style.fontFamily = 'monospace';
		myElements[i].style.padding = '6px';
	}


	let myElements2 = document.getElementsByClassName("chatbox-element");
	for (let i = 0; i < myElements2.length; i++) {
		myElements2[i].style.borderRadius = '0px 10px 10px 10px';
		myElements2[i].style.padding = '9px';
	}

	let myElements3 =  document.querySelectorAll('.message-from-visitor .chatbox-element .text-message')
	for (let i = 0; i < myElements3.length; i++) {
		myElements3[i].style.textAlign = 'right';
	}


    const iconStatus = document.getElementsByClassName('icon-status online');
    iconStatus[0].style.borderRadius = '50%';
    iconStatus[0].style.display = 'inline-block';

    iconStatus[0].style.width = '8px';
    iconStatus[0].style.height = '8px';

    iconStatus[0].style.marginRight = '4px';

    iconStatus[0].style.backgroundColor = 'green';


   	const icon = document.getElementById('myIcon');

   	icon.style.float = "right";
   	icon.className = "fa fa-times";
      icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Times_symbol.svg/500px-Times_symbol.svg.png';

   	icon.removeEventListener("click", openChat);

   	icon.addEventListener("click", closeChat); 

}


function closeChat() {
	const div = document.getElementById('myChat');
   
   	div.style.height="70px";
  	div.style.maxHeight='70px';
   	div.style.width ="70px";
   	div.style.borderRadius ="84px";

	const chatContainer = document.getElementById('chat-container');
   	if( chatContainer ){
   		chatContainer.remove();
   	}

/*
   	const emojisPopup = document.getElementById('emojis-popup');
   	if( emojisPopup ){
   		emojisPopup.remove();
   	}*/

   	const icon = document.getElementById('myIcon');

   	delete icon.style.float;
   	//icon.className = "far fa-comments";
      icon.src = 'https://www.seekpng.com/png/full/905-9056717_png-file-svg-chat-icon-white-png.png';
   	icon.style.cursor = 'pointer';
   	icon.removeEventListener("click", closeChat)
   	icon.addEventListener("click", openChat);

}


function addEmojis(){

	const divIcon = document.createElement('div');
	divIcon.id = "emojis-popup";
	divIcon.className = 'chat-emojis-popup';

	divIcon.innerHTML =  '<span data-emoji="😀">😀</span> <span data-emoji="😄">😄</span> <span data-emoji="😁">😁</span> <span data-emoji="😆">😆</span> <span data-emoji="😅">😅</span> <span data-emoji="😂">😂</span> <span data-emoji="😊">😊</span> <span data-emoji="🙂">🙂</span> <span data-emoji="😉">😉</span> <span data-emoji="😍">😍</span> <span data-emoji="😘">😘</span> <span data-emoji="😋">😋</span> <span data-emoji="😜">😜</span> <span data-emoji="😝">😝</span> <span data-emoji="😛">😛</span> <span data-emoji="🤗">🤗</span> <span data-emoji="😎">😎</span> <span data-emoji="😏">😏</span> <span data-emoji="😒">😒</span> <span data-emoji="😞">😞</span> <span data-emoji="😔">😔</span> <span data-emoji="😟">😟</span> <span data-emoji="😕">😕</span> <span data-emoji="🙁">🙁</span> <span data-emoji="😫">😫</span> <span data-emoji="😩">😩</span> <span data-emoji="😤">😤</span> <span data-emoji="😠">😠</span> <span data-emoji="😡">😡</span> <span data-emoji="😶">😶</span> <span data-emoji="😐">😐</span> <span data-emoji="😑">😑</span> <span data-emoji="😯">😯</span> <span data-emoji="😦">😦</span> <span data-emoji="😧">😧</span> <span data-emoji="😮">😮</span> <span data-emoji="😳">😳</span> <span data-emoji="😱">😱</span> <span data-emoji="😢">😢</span> <span data-emoji="😥">😥</span> <span data-emoji="😭">😭</span> <span data-emoji="😴">😴</span> <span data-emoji="🙄">🙄</span> <span data-emoji="🤔">🤔</span> <span data-emoji="👐">👐</span> <span data-emoji="🙌">🙌</span> <span data-emoji="👏">👏</span> <span data-emoji="🙏">🙏</span> <span data-emoji="👍">👍</span> <span data-emoji="👎">👎</span> <span data-emoji="👊">👊</span> <span data-emoji="🤘">🤘</span> <span data-emoji="👌">👌</span> <span data-emoji="👈">👈</span> <span data-emoji="👉">👉</span> <span data-emoji="👋">👋</span> <span data-emoji="💪">💪</span> <span data-emoji="💋">💋</span> <span data-emoji="👂">👂</span> <span data-emoji="👀">👀</span> <span data-emoji="⭐">⭐</span> <span data-emoji="☀">☀</span> <span data-emoji="🌤">🌤</span> <span data-emoji="⛅">⛅</span> <span data-emoji="🌥">🌥</span> <span data-emoji="🌦">🌦</span> <span data-emoji="🌈">🌈</span> <span data-emoji="🌧">🌧</span> <span data-emoji="⛈">⛈</span> <span data-emoji="🌩">🌩</span> <span data-emoji="🌨">🌨</span> <span data-emoji="☃">☃</span> <span data-emoji="⛄">⛄</span>️ <span data-emoji="❄">❄</span> <span data-emoji="🌬">🌬</span> <span data-emoji="💨">💨</span> <span data-emoji="🍰">🍰</span> <span data-emoji="🎂">🎂</span> <span data-emoji="🚗">🚗</span> <span data-emoji="🚕">🚕</span> <span data-emoji="🚙">🚙</span> <span data-emoji="🚌">🚌</span> <span data-emoji="🚎">🚎</span> <span data-emoji="🏎">🏎</span> <span data-emoji="🚓">🚓</span> <span data-emoji="🚑">🚑</span> <span data-emoji="🚒">🚒</span> <span data-emoji="🚐">🚐</span> <span data-emoji="🚚">🚚</span> <span data-emoji="🚛">🚛</span> <span data-emoji="🛩">🛩</span> <span data-emoji="✈">✈</span> <span data-emoji="🛫">🛫</span> <span data-emoji="🛬">🛬</span> <span data-emoji="⌚">⌚</span> <span data-emoji="📱">📱</span> <span data-emoji="💻">💻</span> <span data-emoji="🖨">🖨</span> <span data-emoji="⏰">⏰</span> <span data-emoji="⏳">⏳</span> <span data-emoji="💡">💡</span> <span data-emoji="🎉">🎉</span> <span data-emoji="📌">📌</span> <span data-emoji="📍">📍</span> <span data-emoji="🔎">🔎</span> <span data-emoji="❤">❤</span> <span data-emoji="💔">💔</span> <span data-emoji="💤">💤</span> <span data-emoji="🎵">🎵</span>'
	return divIcon;
}

function addChat(){
	const div = document.createElement('div');
	div.id = "chat-container";
	div.className = "chat-container visible";
	div.innerHTML = `
   <div class="chat-window">
      <div id="topbar" class="topbar">
         <div>
            <div class="topbar-title-container">
               <!----> 
               <div class="topbar-text">
                  <div class="topbar-title">Alberto </div>
                  <div class="topbar-subtitle">
                     <div><span class="icon-status online"></span> Disponible ahora </div>
                  </div>
               </div>
            </div>
            <div class="topbar-videocall">
               <!----> <!----> <i class="icon icon-cancelar"></i>
            </div>
         </div>
         <!---->
      </div>
      <div>
         <div id="messages-window" class="messages-window" style="height: 203px; max-height: 203px; overflow-y: auto;">
            <div id="chatbox-body" class="chatbox-body">
               <div>
                  <div>
                     <div class="chatbox-message-container message-from-robot first-of-sequence">
                        <div class="msg-header">
                           <div class="name"> Alberto </div>
                        </div>
                        <div class="chatbox-element" style="background-color: rgb(91, 160, 208); border-right-color: rgb(91, 160, 208); color: rgb(255, 255, 255);">
                           <div class="text-message">
                              <p class="{ 'emoji' : isEmoji }">Hola, estoy disponible, te puedo ayudar con algo?</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div class="chatbox-message-container message-from-visitor first-of-sequence">
                        <div class="msg-header">
                           <div class="name"> Tú </div>
                        </div>
                        <div class="chatbox-element">
                           <div class="text-message">
                              <p class="{ 'emoji' : isEmoji }">het</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div class="chatbox-message-container message-from-robot first-of-sequence">
                        <div class="msg-header">
                           <div class="name"> Alberto </div>
                        </div>
                        <div class="chatbox-element" style="background-color: rgb(91, 160, 208); border-right-color: rgb(91, 160, 208); color: rgb(255, 255, 255);">
                           <!----> 
                           <div class="text-message">
                              <p class="{ 'emoji' : isEmoji }">Hola , muchas gracias por volver a contactarte!</p>
                           </div>
                        </div>
                     </div>
                     <!---->
                  </div>
                  <div>
                     <div class="chatbox-message-container message-from-robot">
                        <div class="msg-header">
                           <div class="name"> Alberto </div>
                        </div>
                        <div class="chatbox-element" style="background-color: rgb(91, 160, 208); border-right-color: rgb(91, 160, 208); color: rgb(255, 255, 255);">
                           <!----> 
                           <div class="text-message">
                              <p class="{ 'emoji' : isEmoji }">En qué te puedo ayudar?</p>
                           </div>
                        </div>
                     </div>
                     <!---->
                  </div>
                  <div>
                     <div class="chatbox-message-container message-from-robot">
                        <div class="msg-header">
                           <div class="name"> Alberto </div>
                        </div>
                        <div class="chatbox-element" style="background-color: rgb(91, 160, 208); border-right-color: rgb(91, 160, 208); color: rgb(255, 255, 255);">
                           <!----> 
                           <div class="text-message">
                              <p class="{ 'emoji' : isEmoji }">hola, estás ahí?</p>
                           </div>
                        </div>
                     </div>
                     <!---->
                  </div>
                  <!---->
               </div>
            </div>
         </div>
         <div class="footer converse-chat-input">
            <form id="userInputForm" name="userInputForm" novalidate="novalidate">
               <div class="input-container input-height"><input type="text" name="message" id="user-input" required="required" placeholder="Escribe un mensaje..." data-emoji-picker="true" autocomplete="off"> <span class="input-box"></span> <span title="Insertar Emoji" class="icon icon-emoticons emojis-button-insert"></span> <span title="Enviar" class="icon icon-paper-plane-outline send-message-button"><input type="submit" value="Enviar" id="send" ></span></div>
               <div class="powered-by-container"><a target="_blank" class="powered-by"><span> </span> </a></div>
            </form>
         </div>
      </div>
   </div>`
   return div;
}

function getDivForMessageRobot(mesage){
	return `<div>
        	<div class="chatbox-message-container message-from-robot">
            	<div class="msg-header">
               		<div class="name"> ${mesage.name} </div>
            	</div>
            	<div class="chatbox-element" style="background-color: rgb(91, 160, 208); border-right-color: rgb(91, 160, 208); color: rgb(255, 255, 255);">
               
               		<div class="text-message">
                  		<p class="{ 'emoji' : isEmoji }"> ${mesage.message} </p>
               		</div>
            	</div>
         	</div>
        
      	</div>`
}

function getDivForMessageVisitor(mesage){
	return `<div>
             <div class="chatbox-message-container message-from-visitor first-of-sequence">
                <div class="msg-header">
                   <div class="name"> ${mesage.name} </div>
                </div>
                <div class="chatbox-element">
                   <div class="text-message">
                      <p class="{ 'emoji' : isEmoji }">${mesage.message}</p>
                   </div>
                </div>
             </div>
          </div>`;
}



function getMessages(){
	let messajes = [{
		type:'robot',
		message: 'Hola, estoy disponible, te puedo ayudar con algo?',
		name:'Alberto M'
	},{
		type:'visitor',
		message:' Heolla mundo',
		name: 'Tu'
	},{
		type:'robot',
		message: 'Hola , muchas gracias por volver a contactarte!?',
		name:'Alberto M'
	},{
		type:'robot',
		message: 'En qué te puedo ayudar?',
		name:'Alberto M'
	},{
		type:'robot',
		message: 'ola, estás ahí?',
		name:'Alberto M'
	}];
	console.log(getDivForMessageRobot( messajes[0] ));
}

getMessages();