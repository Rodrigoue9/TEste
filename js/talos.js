

    const DB_NAME = "TALLOS_TRACKING";
    const TABLE_NAME = "tracking"
    let db;
    // buscar valor do cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// mensagem "Olá, podemos ajudar... abaixo codigo para mudar background de texto whatsapp tallos"
const __megasac_widget_content = (
    '<div id="megasac-button" style="margin-bottom:100px" class="animated pulse" title="Tallos Chat"></div>' +
    '<div id="megasac-chat" class="animated fadeInRight"><div id="megasac-chat-close"></div><div id="chat-wrapper"></div></div>' +
    '<span id="tallos-footer" style="display: none; font-size: 10px; padding: 4px !important; position: fixed; z-index: 9999999999; bottom: 0; color: rgba(0, 0, 0, 0.5); right: 0; width: 340px; border-top: 1px solid rgba(0, 0, 0, 0.1); text-align: center;" class="animated fadeInRight"><a href="https://tallos.com.br/" target="__blank">Desenvolvido pela Tallos</a></span>' +
    '<span id="megasac-info" style="display: flex; justify-content: space-between; align-items: center; border-radius: 25px 0px 25px 25px; width: fit-content; color: #333333CC; background: #fff; text-align: right; font-size: 13px !important; font-weight: normal !important; margin: 0; padding: 5px 20px 5px 10px; position: fixed; right: 70pt; bottom: 90pt; z-index: 2147483647;" class="animated bounceIn">' +
    '<img id="favicon-footer" style="display: block; height: 30px; width: auto; float: left; margin: 5px 15px 0 0; padding: 0;" draggable="false" src="https://app.tallos.com.br/images/chat-animation.svg" alt=""/><p style="margin: 0 !important">Olá, podemos ajudar?</p></span>'
);
// Tratar responsividade do Chat.
function onResizeChat() {
    var megasacChatComponent = document.getElementById("megasac-chat");
    var megasacChatIframeComponent = document.getElementById("megasac-chat-iframe");
    var tallosFooterComponent = document.getElementById("tallos-footer")
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        megasacChatIframeComponent.style.width = '100%';
        megasacChatComponent.style.width = '100%';
        tallosFooterComponent.style.width = '100%';
    } else {
        var chatWrapperComponent = document.getElementById("chat-wrapper");
        megasacChatIframeComponent.style.width = chatWrapperComponent.innerWidth + 'px';
    }
}
// iniciar
(function() {
    // adicionar folhas de estilos
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://kong.tallos.com.br:18000/megasac-api/widget/v2/load-styles?load=1671735705484';
    link.media = 'all';
    head.appendChild(link);
    // adicionar conteúdo
    var div_content = document.createElement('div');
    div_content.innerHTML = __megasac_widget_content;
    document.body.appendChild(div_content);
    // ocultar componente de info se já existir cookie
    if (getCookie('cc-'+window.megasac_c+'-'+( window.megasac_widget ? window.megasac_widget : 'integration-1' ))) { document.getElementById("megasac-info").style.display = 'none'; }
    var __megasac_chat_active = false;
    // adicionar eventos de listener
    document.getElementById("megasac-button").addEventListener("click", function() {
        if (__megasac_chat_active) {
            __megasac_chat_active = false;
            document.getElementById("megasac-chat").style.display = 'none';
            document.getElementById("tallos-footer").style.display = 'none';
        } else {
            __megasac_chat_active = true;
            document.getElementById("megasac-chat").style.display = 'block';
            document.getElementById("tallos-footer").style.display = 'none';
            document.getElementById("megasac-info").className = 'animated bounceOut';
            if ( document.getElementById("chat-wrapper").innerHTML == '' ) {
                const openRequest = window.indexedDB.open(DB_NAME, 1);
                openRequest.onsuccess = async (event) => {
                    db = event.target.result

                    if(!db.objectStoreNames.contains(TABLE_NAME)) {
                    const objectStoreTracking = db.createObjectStore(TABLE_NAME, { autoIncrement: true })
                    }

                    const transaction = db.transaction([TABLE_NAME], "readwrite")
                    const objectStore = transaction.objectStore(TABLE_NAME)
                    let request = objectStore.getAll()
                    request.onsuccess = () => {
                        let trackings = encodeURIComponent(JSON.stringify(request.result))
                        let id_tracking = window.localStorage.getItem('ID_TRAKCING')
                        document.getElementById("chat-wrapper").innerHTML = (
                            '<iframe id="megasac-chat-iframe" style="box-shadow: 10px 0 10px -10px #000; display: block; width: 350px; height: 100%; position: absolute; right: 0;" ' +
                            'frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="' +
                            'https://kong.tallos.com.br:18000/megasac-api/widget/v1?idTracking='+id_tracking+'&tracking='+trackings+'&c='+ window.megasac_c +'&widget='+ ( window.megasac_widget ? window.megasac_widget : 'integration-1' ) +'&scale='+ ( window.innerWidth +'-'+ window.innerHeight ) +'"></iframe>'
                        );
                        // on resized
                        onResizeChat();
                        window.onresize = function(event){onResizeChat()};
                        objectStore.clear()
                    }

                }

            }
        }
    });
    document.getElementById("megasac-info").addEventListener("click", function() {
        if (__megasac_chat_active) {
            __megasac_chat_active = false;
            document.getElementById("megasac-chat").style.display = 'none';
            document.getElementById("tallos-footer").style.display = 'none';
        } else {
            __megasac_chat_active = true;
            document.getElementById("megasac-chat").style.display = 'block';
            document.getElementById("tallos-footer").style.display = 'none';
            document.getElementById("megasac-info").className = 'animated bounceOut';
            if ( document.getElementById("chat-wrapper").innerHTML == '' ) {
                const openRequest = window.indexedDB.open(DB_NAME, 1);
                openRequest.onsuccess = async (event) => {
                    db = event.target.result
                    if(!db.objectStoreNames.contains(TABLE_NAME)) {
                    const objectStoreTracking = db.createObjectStore(TABLE_NAME, { autoIncrement: true })
                    }

                    const transaction = db.transaction([TABLE_NAME], "readwrite")
                    const objectStore = transaction.objectStore(TABLE_NAME)
                    let request = objectStore.getAll()
                    request.onsuccess = () => {
                        let trackings = encodeURIComponent(JSON.stringify(request.result))
                        let id_tracking = window.localStorage.getItem('ID_TRAKCING')
                        document.getElementById("chat-wrapper").innerHTML = (
                            '<iframe id="megasac-chat-iframe" style="box-shadow: 10px 0 10px -10px #000; display: block; width: 350px; height: 100%; position: absolute; right: 0;" ' +
                            'frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="' +
                            'https://kong.tallos.com.br:18000/megasac-api/widget/v1?idTracking='+id_tracking+'&tracking='+trackings+'&c='+ window.megasac_c +'&widget='+ ( window.megasac_widget ? window.megasac_widget : 'integration-1' ) +'&scale='+ ( window.innerWidth +'-'+ window.innerHeight ) +'"></iframe>'
                        );
                        // on resized
                        onResizeChat();
                        window.onresize = function(event){onResizeChat()};
                        objectStore.clear()
                    }
                }
            }
        }
    });
    document.getElementById("megasac-chat-close").addEventListener("click", function() {
        __megasac_chat_active = false;
        document.getElementById("megasac-chat").style.display = 'none';
        document.getElementById("tallos-footer").style.display = 'none';
    });
})();
(function() {
    window.megasac_c = '6384a9da6c4358b5567a3f18';
    window.megasac_widget = 'integration-1';
    var s = document.createElement('script');
    s.setAttribute('src', 'https://kong.tallos.com.br:18000/megasac-api/widget/v2/load-scripts?load=1671734389975');
    s.onload = function()  {
        document.getElementById('megasac-button').style.background = 'url(https://d335luupugsy2.cloudfront.net/cms/files/414721/1673465547/$8a9i5joax2l), url(https://cdn.tallos.com.br/tallos-chat/public/images/logos/avatar.png?load=1671734389975) center no-repeat #000';
        document.getElementById('megasac-button').style.backgroundPosition = 'center center';
        document.getElementById('megasac-button').style.backgroundSize = '105% 105%';
    };
    document.head.appendChild(s);
    const DB_NAME = "TALLOS_TRACKING";
    const TABLE_NAME = "tracking"
    let db;
    if(!window.localStorage.getItem('ID_TRAKCING')) {
        window.localStorage.setItem('ID_TRAKCING', String(Date.now()) + '-' + String(Math.floor(Math.random() * 100000)))
    }
    const openRequest = window.indexedDB.open(DB_NAME, 1);
    openRequest.onupgradeneeded = (event) => {
        var myConnection = event.target.result;

        if(!myConnection.objectStoreNames.contains(TABLE_NAME)) {
        const objectStoreTracking = myConnection.createObjectStore(TABLE_NAME, { autoIncrement: true })
        console.log("Cria ou altera um banco já existente");
        }
    }

    openRequest.onsuccess = async (event) => {
        db = event.target.result

        if(!db.objectStoreNames.contains(TABLE_NAME)) {
            const objectStoreTracking = db.createObjectStore(TABLE_NAME, { autoIncrement: true })
            console.log("Conexão indexdedDB obtida com sucesso");
        }

        const transaction = db.transaction([TABLE_NAME], "readwrite")
        const objectStore = transaction.objectStore(TABLE_NAME)
        let request = objectStore.getAll()
        request.onsuccess = () => {
            let trackings = request.result
            if(!trackings.length || trackings[trackings.length - 1].link !== window.location.href && window.localStorage.getItem('LAST_HREF_INTERACTION') !== window.location.href) {
                const request = objectStore.add({ link: window.location.href, accessed_in: new Date() })
                transaction.onerror = event => {
                    console.error("Transaction failed", event);
                }
                transaction.oncomplete = () => {
                    window.localStorage.setItem('LAST_HREF_INTERACTION', window.location.href)
                }
            }
        }
    }
})();
