chrome.storage.sync.get('settings', (data) => {
    let settings = {
        furigana: true,
        coloring: true,
        dictionary: true
    };

    Object.assign(settings, data.settings);
    update_content(settings);
});

chrome.runtime.onMessage.addListener(function(request, _sender, sendResponse) {
    update_content(request);
    sendResponse("Message received: " + JSON.stringify(request));
});

function update_content(toggles) {
    console.log("Updating content", toggles);
    toggle_furigana(toggles.furigana);
    toggle_coloring(toggles.coloring);
    toggle_dictionary(toggles.dictionary);
}

function toggle_furigana(active) {
    if (active === undefined) {
        return;
    }

    const easy_wrapper = document.getElementById("easy-wrapper");

    if (easy_wrapper) {
        if (active) {
            easy_wrapper.classList.add("is-no-ruby");
        } else {
            easy_wrapper.classList.remove("is-no-ruby");
        }
    } else {
        console.log("toggle_furigana: Unable to find easy-wrapper element.");
    }
}

function toggle_coloring(active) {
    if (active === undefined) {
        return;
    }

    const js_article_body = document.getElementById("js-article-body");

    if (js_article_body) {
        if (active) {
            js_article_body.classList.add("is-no-color");
        } else {
            js_article_body.classList.remove("is-no-color");
        }
    } else {
        console.log("toggle_coloring: Unable to found js-article-body element.");
    }
}

function toggle_dictionary(active) {
    if (active === undefined) {
        return;
    }

    const popup = document.getElementById("js-dictionary-box");
    const dicWin = [...document.getElementsByClassName("dicWin")];

    if (popup && dicWin.length > 0) {
        
        if (active) {
            popup.style.visibility = "hidden";
        } else {
            popup.style.visibility = "visible";
            const sticky = document.getElementById("sticky-dictionary-box");
            if (sticky) {
                sticky.remove();
            }
        }

        popup.style.visibility = active ? "hidden" : "visible";

        dicWin.forEach(function(element) {
            if (element.tagName == 'A') {
                if (active) {
                    element.addEventListener("click", sticky_dictionary, false);
                } else {
                    element.removeEventListener("click", sticky_dictionary);
                }
            }
        });
    } else {
        console.log("toggle_dictionary: Unable to find js-dictionary-box or dicWin elements.");
    }
}

function sticky_dictionary(evt) {
    const sticky = document.getElementById("sticky-dictionary-box");

    if (sticky) {
        sticky.remove();
    }
    
    const popup = document.getElementById("js-dictionary-box");
    const clone = html_sticky_dictionary(popup);

    popup.insertAdjacentElement("afterend", clone);
}

function html_sticky_dictionary(popup) {
    const sticky = popup.cloneNode(true);
    sticky.id = 'sticky-dictionary-box';
    sticky.style.visibility = "visible";

    sticky.insertAdjacentElement("beforeend", html_close_button());

    return sticky;
}

function html_close_button() {
    const btn = document.createElement("button");
    btn.innerText = "Close";
    btn.style.position = "absolute";
    btn.style.top = "0";
    btn.style.right = "0";

    btn.onclick = function(evt) {
        evt.currentTarget.parentNode.remove();
    }

    return btn;
}