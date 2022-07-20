const expl_options = [
    'Sie haben die formale Subsidiarität nicht gewahrt; ihnen stünde noch ein Rechtsmittel zu.',
    'Sie haben die materielle Subsidiarität nicht gewahrt; sie hätten sich früher für Ihre Rechte einsetzen müssen.',
    'Sie haben sich nicht ausreichend mit der Rechtsprechung des BVerfG auseinandergesetzt.',
    'Sie haben nicht substantiiert vorgetragen.',
    'Die Verfassungsbeschwerde ist nicht zur Entscheidung anzunehmen, da sie unzulässig ist. Sie ist verfristet.',
    'Der Beschwerdegegenstand verletzt Sie nicht in Ihren Grundrechten.'
];

let abuse_likelyhood = 0.001;
let abuse_amount = 200;

const $ = document.querySelector.bind(document);

$('#btn').addEventListener('click', (e)=> {
    $('.loading').classList.add('now');
    $('#short-reply').innerText = '';
    $('#expl').innerText = '';
    $('#abuse').innerText = '';
    $('.reply-area').classList.remove('hidden');

    const answer_key = Math.random();

    const time_key = Math.floor(Math.random()*750);

    const is_abuse = Math.random() < abuse_likelyhood;

    window.setTimeout(() => {
        $('.loading').classList.remove('now');
        if (answer_key < 0.015) {
            $('#short-reply').innerText = "Ihre Verfassungsbeschwerde hat Aussicht auf Erfolg.";
            $('#expl').innerText = 'Die Beschwerde ist offensichtlich begründet; in Bezug auf den Beschwerdegegenstand hat d. Beschwerdegegner*in die Rechtslage komplett verkannt.';
        } else if (answer_key < 0.057) {
            $('#short-reply').innerText = "Ihre Verfassungsbeschwerde hat keine Aussicht auf Erfolg";
            $('#expl').innerText = expl_options[Math.floor(Math.random()*expl_options.length)];

            abuse_likelyhood += 0.005;

            if (is_abuse) {
                $('#abuse').innerText = 'Sie nerven das Bundesverfassungsgericht und bekommen zusätzlich eine Missbrauchsgebühr in Höhe von ' + String(abuse_amount) + ' auferlegt.';
                abuse_amount += 100;
            }
        } else {
            $('#short-reply').innerText = "Ihre Verfassungsbeschwerde hat keine Aussicht auf Erfolg";
            $('#expl').innerText = '- keine -';

            abuse_likelyhood += 0.01;

            if (is_abuse) {
                $('#abuse').innerText = 'Sie nerven das Bundesverfassungsgericht und bekommen zusätzlich eine Missbrauchsgebühr in Höhe von ' + String(abuse_amount) + ' auferlegt.';
                abuse_amount += 200;
            }
        }
    }, time_key * 2);
});
