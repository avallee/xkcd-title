var comicBase = "imgs.xkcd.com/comics/";
var imageTagClass = 'xkcd-title-image-tagged';

var addTitleElementToImages = function(images)
{
    for(index = 0; index != images.length; ++index)
    {
        var image = images[index];
        if(image.src.indexOf(comicBase) != -1 &&
               !image.classList.contains(imageTagClass) )
        {
            var visible = false;
            var title = document.createElement("p");
            var comic = image;
            comic.classList.add(imageTagClass);
            var titleText = comic.title;
            title.innerText = titleText;
            title.classList.add("xkcd-title");
 
            var setVisible = function(vis){
                if(vis)
                {
                    comic.removeAttribute("title");
                    title.classList.add("xkcd-title-open");
                    title.classList.remove("xkcd-title-closed");
                }
                else
                {
                    comic.setAttribute("title", titleText);
                    title.classList.remove("xkcd-title-open");
                    title.classList.add("xkcd-title-closed");
                }
            };
            setVisible(visible);
            var parent = comic.parentNode;
            var position = comic.nextSibling;
            parent.insertBefore(title, position);
            comic.addEventListener("dblclick", function(event){
                visible = !visible;
                setVisible(visible);
            });
 
        }
    }
};

addTitleElementToImages(document.images);

var onInsert = function(event){
    addTitleElementToImages(document.images);
}
document.addEventListener("DOMNodeInserted", onInsert);
