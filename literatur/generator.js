var canv = document.getElementById('canv')
var ctx = canv.getContext('2d')

const $ = document.querySelector.bind(document);

var template = document.getElementById('template')
var authors = document.getElementById('authors')
var title = document.getElementById('title')
var subtitle = document.getElementById('subtitle')
var edition = document.getElementById('edition')
var year = document.getElementById('year')
var abbrevs = document.getElementById('abbrevs')
var contents = document.getElementById('contents')

var btn = document.getElementById('btn')
var copybtn = document.getElementById('copy')
var dlbtn = document.getElementById('download')

let load_base = (image_file, cb) => {
    let base_image = new Image()
    base_image.onload = () => {
        canv.height = base_image.height
        canv.width = base_image.width
        ctx.drawImage(base_image, 0, 0)
        cb()
    }
    base_image.src = image_file
}

let write_text = (text, x, y, font, color, align) => {
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align
    ctx.fillText(text, x, y)
}

let write_wrapped_text = (text, x, y, width, font, lh, color, align) => {
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align
    printAtWordWrap(ctx, text, x, y, lh, width)
}

// CC BY-SA 3.0 from Gabrielle Petrioli, https://stackoverflow.com/a/4478894/8263546
function printAtWordWrap( context , text, x, y, lineHeight, fitWidth)
{
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0)
    {
        context.fillText( text, x, y );
        return;
    }
    var words = text.split(' ');
    var currentLine = 0;
    var idx = 1;
    while (words.length > 0 && idx <= words.length)
    {
        var str = words.slice(0,idx).join(' ');
        var w = context.measureText(str).width;
        if ( w > fitWidth )
        {
            if (idx==1)
            {
                idx=2;
            }
            context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        }
        else
        {idx++;}
    }
    if  (idx > 0)
        context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
}

let generators = {
    beck_dtv: () => {
        load_base('/literatur/templates/beck_dtv.png', () => {
            write_text(authors.value, 385, 110, 'bold 40px Times', '#dddddd', 'center')
            write_wrapped_text(title.value, 385, 265, 468, 'bold 100px Times', 120, '#000000', 'center')
            write_wrapped_text(subtitle.value, 385, 525, 400, 'bold 30px Times', 30, '#ffffff', 'center')
        })
    },
    beck_rot: () => {
        load_base('/literatur/templates/beck_rot.png', () => {
            write_text(authors.value, 385, 110, 'bold 40px Times', '#dddddd', 'center')
            write_wrapped_text(title.value, 385, 250, 468, 'bold 100px Times', 90, '#000000', 'center')
            write_wrapped_text(subtitle.value, 385, 525, 400, 'bold 30px Times', 30, '#ffffff', 'center')
        })
    },
    beck_gelb: () => {
        load_base('/literatur/templates/beck_gelb.png', () => {
            write_text(authors.value, 340, 110, 'bold 55px Times', '#000000', 'center')
            write_wrapped_text(title.value, 340, 225, 468, 'bold 100px Times', 100, '#ff0000', 'center')
            write_wrapped_text(subtitle.value, 340, 500, 400, 'bold 30px Times', 30, '#ff0000', 'center')
        })
    },
    klaukurs: () => {
        load_base('/literatur/templates/klaukurs.png', () => {
            write_text(authors.value, 70, 250, '30px Arial', '#ffffff', 'left')
            write_wrapped_text(title.value, 70, 350, 500, 'bold 60px Arial', 65, '#ffffff', 'left')
            write_wrapped_text(subtitle.value, 70, 500, 500, 'bold 30px Arial', 35, '#ffffff', 'left')
            write_text(edition.value, 70, 614, 'bold 25px Arial', '#ffffff', 'left')
        })
    },
    nomnom: () => {
        load_base('/literatur/templates/nomnom.png', () => {
            write_text(authors.value, 50, 330, 'bold 45px Arial', '#aaaaaa', 'left')
            write_wrapped_text(title.value, 50, 475, 450, 'bold 70px Arial', 80, '#ffffff', 'left')
            write_text(edition.value, 70, 762, 'bold 25px Arial', '#ffffff', 'left')
        })
    }
}

btn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canv.width, canv.height);
    generators[template.value]()

    $('.loading').classList.add('now');
    $('.reply-area').classList.remove('hidden');

    const time_key = Math.floor(Math.random()*750);

    window.setTimeout(() => {
        $('.loading').classList.remove('now');
        $('#short-reply').innerText = reply_options[answer_key];
    }, time_key * 2);
})

copybtn.addEventListener('click', () => {
    canv.toBlob(function(blob) { 
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]); 
    });
})

dlbtn.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'literatur.png';
    link.href = canv.toDataURL()
    link.click();
})