async function getVideo(){
    const resp = await fetch('http://192.168.8.101:8080/video');
    const video = await resp.json();
    console.log(video);
    showVideo(video);   
}
getVideo();

function showVideo(video){
    for(let vid of video){
        const card = document.createElement('div');
        card.classList.add('card');
        card.addEventListener('click', ()=>{showTarget(vid.id,vid.name);
        });

        const img = document.createElement('img');
        img.src=vid.preview;            
        card.appendChild(img);
        const name = document.createElement('p');
        name.innerText = vid.name
        card.appendChild(name)
        const duration = document.createElement('span');          
        duration.innerHTML =`video duration min:${Math.floor(vid.duration/60)} sec:${vid.duration%60}`;
        card.appendChild(duration);                  
        document.body.appendChild(card);
    }
}

async function showTarget(id,nameVid){
    const overLay = document.createElement('div')
    overLay.classList.add('overLay');
    document.body.appendChild(overLay);
    overLay.addEventListener('click', ()=> overLay.remove());

    const resp = await fetch(`http://192.168.8.101:8080/video/${id}`);
    const vid = await resp.json();
    console.log(vid);  

    const dialog = document.createElement('div');
    dialog.classList.add('dialog');
    dialog.addEventListener('click', (event)=> event.stopPropagation());

    const video = document.createElement("video");
    video.controls = true;
    video.autoplay = true;
    const source = document.createElement('source');
    source.src = `${vid.url}`;
    console.log(vid.url)
    video.appendChild(source);
    dialog.appendChild(video);
    const name = document.createElement('p');
    name.innerText = nameVid;
    dialog.appendChild(name);
    const wiew = document.createElement('p');
    wiew.innerText = `просмотры: ${vid.viewCount}`;
    dialog.appendChild(wiew);   

    const close = document.createElement('img');
    close.classList.add("close");
    close.src = "1.png"
    dialog.appendChild(close);
    close.addEventListener('click', ()=> overLay.remove());
    overLay.appendChild(dialog) 
    
}



