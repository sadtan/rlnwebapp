let imagePaths;


window.addEventListener("load", (event) => {
    imagePaths = document.querySelectorAll(".s3_img");
    createObserver();
}, false);

function createObserver() {
    let observer;

    let options = 
    {
        root: null,
        rootMargin: "200px",
    };

    observer = new IntersectionObserver(handleImgIntersect, options);

    for (img in imagePaths) {
        try {
            observer.observe(imagePaths[img]);
        } catch (error) {
        }

    }
}

async function handleImgIntersect(entries, observer) {

    entries.forEach(async (entry) => {
        if (entry.intersectionRatio > 0 && entry.target.getAttribute("src").toString().indexOf("https") < 0) {
            var tempUrl =  entry.target.getAttribute("src");
            entry.target.setAttribute("src", "https");
            var newUrl = await gets3url("/gets3presignedurl", "POST", { data: tempUrl });
            entry.target.setAttribute("src", newUrl.data);
        }
    });
}

async function gets3url(url, method, data) {
    return new Promise( async (resolve, reject) => 
    {
        try {
            var response = {};
            response = await fetch(url, {
                method,
                mode: "cors",
                //cache: 'no-cache',
                //credentials: 'omit',
                headers: {
                    "Content-Type": "application/json"
                },
                //redirect: 'follow',
                //referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });
            resolve(response.json());
        } catch (error) {
            reject(error);
        }
    });
    
}

function restart()
{
    imagePaths = document.querySelectorAll(".s3_img");
    createObserver();
}