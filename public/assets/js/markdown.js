<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>

function gethtmltext(markdowntext) {
    var md = marked(markdowntext);
    return md;
}