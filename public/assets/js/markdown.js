window.onload = function () {
    var sync = function () {
        var id;
        getcontentslastestPromise().then(function onFulfilled(value) {
            console.log(value);
            id = value;
            return getcontentsinfiletextPromise("info.json", id);
        }).catch(function onRejected(error) {
            console.error(error);
        })
            //get blog info
            .then(function (result1) {
                console.log(result1);
                var title = getjsontotitle(result1); // マークダウンに変換
                var author = getjsontoauthor(result1); // マークダウンに変換
                document.getElementById("blog-title").innerHTML = title;
                document.getElementById("blog-author").innerHTML = author;
                return getcontentsinfiletextPromise("main.md", id);
            })
            .catch(function onRejected(error) {
                console.error(error);
                document.getElementById("blog-title").innerHTML = "error";
                document.getElementById("blog-author").innerHTML = "error";
            })

            //get blog contents
            .then(function (result2) {
                console.log(result2);
                var md = gethtmltext(result2); // マークダウンに変換
                document.getElementById("blog-contents").innerHTML = md;
            })
            .catch(function onRejected(error) {
                console.error(error);
                document.getElementById("blog-contents").innerHTML = error;
            })
    };
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

function getMarkdownFile() {
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

//IDが指定されていなければ、最新の記事のIDを返す　指定されていればそれを返す
function getcontentslastestPromise() {
    return new Promise((resolve, reject) => {
        var id = getParam('id');
        if (id == null) {
            console.log("Get Lastest ID");
            var url = "/blog/contents/contents.json"
            var request = createXMLHttpRequest();
            request.open("GET", url);

            request.addEventListener("load", (event) => {
                if (event.target.status !== 200) {
                    console.log(`${event.target.status}: ${event.target.statusText}`);
                }
                var arr = JSON.parse(event.target.responseText);
                arr = arr.sort();
                var lastid = arr[arr.length - 1];
                resolve(lastid);
            });

            request.addEventListener("error", () => {
                reject(new Error(request.statusText));
                console.error("Network Error");
            });
            request.overrideMimeType('text/plain; charset=UTF-8');  //強制Text

            request.send();
        }
        else {
            resolve(id);
        }
    });
}

function getcontentsinfiletextPromise(filename, id) {
    return new Promise((resolve, reject) => {
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