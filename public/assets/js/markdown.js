window.onload = function () {
    var sync = function () {
        getcontentsinfiletext("info.json").then(function onFulfilled(value) {
            console.log(value);
            var title = getjsontotitle(value); // マークダウンに変換
            var author = getjsontoauthor(value); // マークダウンに変換
            document.getElementById("blog-title").innerHTML = title;
            document.getElementById("blog-author").innerHTML = author;

        }).catch(function onRejected(error) {
            console.error(error);
            document.getElementById("blog-title").innerHTML = "error";
            document.getElementById("blog-author").innerHTML = "error";
        });

        getcontentsinfiletext("main.md").then(function onFulfilled(value) {
            console.log(value);
            var md = gethtmltext(value); // マークダウンに変換
            document.getElementById("blog-contents").innerHTML = md;

        }).catch(function onRejected(error) {
            console.error(error);
            document.getElementById("blog-contents").innerHTML = error;
        });
    };
    // 一回やっとく
    sync();
};

//マークダウンをHTMLに変換
function gethtmltext(markdowntext) {
    var md = marked(markdowntext);
    return md;
}

function getjsontotitle(json) {
    var data = JSON.parse(json);
    return data.title;
}

function getjsontoauthor(json) {
    var data = JSON.parse(json);
    return data.author;
}


function getcontentsinfiletext(filename) {
    return new Promise((resolve, reject) => {
        var id = getParam('id');
        if (id == null) {
            id = getlastestid();
        }
        var url = "/blog/contents/" + id + "/" + filename;
        var request = createXMLHttpRequest();
        request.open("GET", url);

        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                console.log(`${event.target.status}: ${event.target.statusText}`);
            }
            resolve(event.target.responseText);
        });

        request.addEventListener("error", () => {
            reject(new Error(request.statusText));
            console.error("Network Error");
        });
        request.overrideMimeType('text/plain; charset=UTF-8');  //強制Text

        request.send();
    });
}

function createXMLHttpRequest() {
    if (window.XMLHttpRequest) { return new XMLHttpRequest() }
    if (window.ActiveXObject) {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { }
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { }
        try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { }
    }
    return false;
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

function getlastestid() {
    return "2000-01-01-12-30";
}