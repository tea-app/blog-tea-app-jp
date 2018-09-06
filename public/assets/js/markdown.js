<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>


window.onload = function () {
    // 要素を取得
    var previewTA = document.querySelector('.preview .ta');

    var sync = function () {
        var value = getmarkdowntext(); // テキストエリアから値を取得
        var md = gethtmltext(value); // マークダウンに変換
        document.getElementById("article").innerHTML = md;
    };
    // ブラー時に変換する
    editorTA.onblur = sync;
    // 一回やっとく
    sync();
};

//マークダウンをHTMLに変換
function gethtmltext(markdowntext) {
    var md = marked(markdowntext);
    return md;
}

function getmarkdowntext() {
    var id = getParam('id');
    return "#Hello";
}

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


