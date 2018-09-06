window.onload = function () {
    var sync = function () {
        var value = getmarkdowntext(); // テキストエリアから値を取得
        var md = gethtmltext(value); // マークダウンに変換
        document.getElementById("article").innerHTML = md;
    };
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
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var file = fs.OpenTextFile("/blog/contents/test/" + "main.md");
    text = file.ReadAll();
    return text;
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

function getMarkdownFile(id) {
    var f = new Folder(folderPath);
    f.next();

    while (!f.end) {

        if (f.filetype != "fold") {

            post("filename:" + f.filename);
            post();

        } else {

            postFile(f.filename);
        }

        f.next();
    }

    f.close();
}