var canv = document.getElementById('canv')
var ctx = canv.getContext('2d')


var section
var authors
var title
var subtitle
var edition
var year
var abbrevs
var contents

const $ = document.querySelector.bind(document);

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

let write_text = (text, x, y, font, color, align, letterSpacing) => {
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align
    ctx.letterSpacing = letterSpacing || '0px'
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
            write_text(title.value, 375, 300, '55px Arial', '#ff0000', 'center')
            write_text(edition.value, 300, 930, '45px Arial', '#ff0000', 'right')
            write_text(year.value, 375, 990, '45px Arial', '#ff0000', 'center')

            let head_parts = abbrevs.value.split("|")
            let colors = ['#a0892ccc', '#b61d2acc', '#0e1f46cc', '#fcc204cc', '#e8cea0cc', '#94c120cc', '#5b2482cc', '#f49d00cc', '#0580c6cc', '#ed6505cc', '#058a48cc', '#de0286']

            total_width = 0

            for (const part of head_parts) {
                ctx.font = '220px Arial'
                ctx.letterSpacing = '-20px'
                total_width += ctx.measureText(part).width * 0.8
            }

            
            begin = 360 - (total_width / 2)
            i = 0

            for (const part of head_parts) {
                write_text(part, begin, 200, '220px Arial', colors[i % colors.length], 'left', '-20px')
                begin += ctx.measureText(part).width * 0.8
                i += 1
            }

            let content_parts = contents.value.split("|")

            y = 380

            for (const part of content_parts) {
                write_text(part, 375, y, '40px Arial', '#000000', 'center')
                y += 55
            }
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
    },
    nomnom_rot: () => {
        load_base('/literatur/templates/nomnom_rot.png', () => {
            write_text(authors.value, 50, 430, 'bold 55px Arial', '#aaaaaa', 'left')
            write_wrapped_text(title.value, 50, 675, 450, 'bold 100px Arial', 105, '#ffffff', 'left')
            write_wrapped_text(contents.value, 50, 875, 900, 'bold 28px Arial', 40, '#ffffff', 'left')
            write_text(edition.value, 70, 1050, 'bold 40px Arial', '#ffffff', 'left')
        })
    },
    njw: () => {
        load_base('/literatur/templates/njw.png', () => {
            write_text(title.value, 80, 950, 'bold 55px Arial', '#000000', 'left')
            write_text(year.value, 1600, 950, 'bold 45px Arial', '#000000', 'right')

            author1 = section.querySelector('[data-field="author-1"]')
            title1 = section.querySelector('[data-field="title-1"]')

            author2 = section.querySelector('[data-field="author-2"]')
            title2 = section.querySelector('[data-field="title-2"]')

            author3 = section.querySelector('[data-field="author-3"]')
            title3 = section.querySelector('[data-field="title-3"]')

            author4 = section.querySelector('[data-field="author-4"]')
            title4 = section.querySelector('[data-field="title-4"]')

            write_text(author1.value, 666, 1250, 'italic 35px Times', '#000000', 'left')
            write_wrapped_text(title1.value, 666, 1290, 666, 'bold 35px Times', 38, '#000000', 'left')

            write_text(author2.value, 666, 1450, 'italic 35px Times', '#000000', 'left')
            write_wrapped_text(title2.value, 666, 1490, 666, 'bold 35px Times', 38, '#000000', 'left')

            write_text(author3.value, 666, 1650, 'italic 35px Times', '#000000', 'left')
            write_wrapped_text(title3.value, 666, 1690, 666, 'bold 35px Times', 38, '#000000', 'left')

            write_text(author4.value, 666, 1850, 'italic 35px Times', '#000000', 'left')
            write_wrapped_text(title4.value, 666, 1890, 666, 'bold 35px Times', 38, '#000000', 'left')
        })
    }
}

document.querySelectorAll('.search-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
    let template = document.querySelector('[name="template"]:checked')
    section = document.querySelector('[data-section="' + template.value + '"]')

    authors = section.querySelector('[data-field="authors"]')
    title = section.querySelector('[data-field="title"]')
    subtitle = section.querySelector('[data-field="subtitle"]')
    edition = section.querySelector('[data-field="edition"]')
    year = section.querySelector('[data-field="year"]')
    abbrevs = section.querySelector('[data-field="abbrevs"]')
    contents = section.querySelector('[data-field="contents"]')

    ctx.clearRect(0, 0, canv.width, canv.height);
    generators[template.value]()

    $('.loading').classList.add('now');
    $('.reply-area').classList.remove('hidden');

    const time_key = Math.floor(Math.random()*750);

    window.setTimeout(() => {
        $('.loading').classList.remove('now');
    }, time_key * 2);
})
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