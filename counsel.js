const reply_options = ['Ja, das geht', 'Das kommt darauf an', 'Nein, das ist leider nicht möglich.'];
const expl1_options = [
    [
        'Dies sollte nicht strafbar sein.',
        'Dies ist eigentlich immer möglich.',
        'Es gibt keinen rechtlichen Grund, wieso das nicht möglich sein sollte.',
        'Hier wäre eine Klage geboten und ziemlich sicher erfolgreich.',
        'Dazu sollten Sie berechtigt sein.',
        'Dazu sollten die anderen verpflichtet sein.',
    ],
    [
        'Ich würde das nicht machen, solange nicht klar ist, ob das nicht strafbar sein könnte.',
        'Das hängt von mehreren Faktoren ab.',
        'Sie könnten hier versuchen, zu klagen. Ob das Erfolg haben wird, können wir aber jetzt noch nicht absehen.',
        'Dazu gibt es verschiedene Rechtsauffassungen.',
        'Das könnte ein sehr schöner Präzedenzfall werden.',
        'Hier fehlt es leider an höchstrichterlicher Rechtsprechung.'
    ],
    [
        'Dies ist strafbar.',
        'Das sieht das Recht nämlich nicht vor.',
        'Es gibt keinen rechtlichen Grund, wieso das zulässig sein sollte.',
        'Hier wäre eine Klage ziemlich sicher erfolglos.',
        'Dazu gibt es leider keine Verpflichtung.',
        'Dazu sind Sie leider nicht berechtigt.'
    ]
];
const expl2_options = [
    [
        'Hier ist zum Glück das allgemeine Persönlichkeitsrecht anwendbar.',
        'Etwas anderes gilt nur, wenn Sie dies im Vertrag vereinbart haben.',
        'Das europäische Verbraucherschutzrecht eröffnet Ihnen diese Möglichkeit.',
        'Das ist wegen des Grundsatzes von Treu und Glauben möglich.',
        'Darauf haben Sie sogar ein Grundrecht.',
        'Soweit Sie das nicht machen, um anderen zu schaden, sollte da gar kein Problem bestehen.',
        'Auch Ihre Nachbarn können das zum Glück nicht verhindern.'
    ],
    [
        'Der Gesetzeswortlaut ist an der Stelle leider nicht ganz eindeutig.',
        'Es ist nicht ganz klar, ob das Gesetz überhaupt verfassungskonform ist.',
        'Hier sind ja auch Ihre Grundrechte mit denen anderer abzuwägen.',
        'Das wird vermutlich jedes Gericht anders sehen.',
        'Sinnvoll wäre vielleicht auch eine einvernehmliche Lösung, wenn Sie nicht klagen wollen.'
    ],
    [
        'Es würde nämlich gegen die Menschenwürde verstoßen.',
        'Etwas anderes gilt nur, wenn Sie dies im Vertrag vereinbart haben.',
        'Eine EU-Richtlinie von 2003 verbietet dies ausdrücklich.',
        'Das verstößt gegen Treu und Glauben.',
        'Dem steht das Grundrecht anderer entgegen.',
        'Ihre Nachbarn haben dabei leider ein Einspruchsrecht.'
    ]
];
const expl3_options = [
    [
        'Der Bundesgerichtshof hat dies erst letztes Jahr entschieden.',
        'Dazu gab es vor einigen Jahren ein Gerichtsurteil des Kammergerichts Berlin.',
        'Das ist einer der absoluten "Musterfälle" im Rechtsstudium.',
        'Bis 2002 war das verboten; dann hatte das Bundesverfassungsgericht das Gesetz aber gekippt.',
        'Der Bundestag hat das Gesetz dazu erst vor zwei Jahren verabschiedet.',
    ],
    [
        'Das Bundesverfassungsgericht wird vermutlich nächstes Jahr dazu entscheiden.',
        'Die Rechtsprechung ist da eher auf Ihrer Seite; die Literatur lehnt dies aber ab.',
        'Die Literatur ist da eher auf Ihrer Seite; die Rechtsprechung lehnt dies aber ab.',
        'Bundesverwaltungsgericht und Bundesgerichtshof streiten sich um das Thema seit einigen Jahren.',
        'Das Gesetz ist noch sehr neu, daher gibt es nur wenig Rechtsprechung dazu.',
        'Der Bundestag hatte vor drei Monaten bedauerlicherweise einen Antrag abgelehnt, der dies klarstellen würde.',
    ],
    [
        'Der Bundesgerichtshof hat dies erst letztes Jahr entschieden.',
        'Dazu gab es vor einigen Jahren ein Gerichtsurteil des Kammergerichts Berlin.',
        'Das ist einer der absoluten "Musterfälle" im Rechtsstudium.',
        'Bis 2002 war das möglich; dann hatte das Bundesverfassungsgericht das Gesetz aber gekippt.',
        'Der Bundestag hat das Gesetz dazu erst vor zwei Jahren verabschiedet.',
    ]
];

const $ = document.querySelector.bind(document);

$('#btn').addEventListener('click', (e)=> {
    $('.loading').classList.add('now');
    $('#short-reply').innerText = '';
    $('#expl1').innerText = '';
    $('#expl2').innerText = '';
    $('#expl3').innerText = '';
    $('.reply-area').classList.remove('hidden');


    const kw = $('#input').value;
    const answer_key = Math.floor(Math.random()*3);

    const time_key = Math.floor(Math.random()*750);

    window.setTimeout(() => {
        $('.loading').classList.remove('now');
        $('#short-reply').innerText = reply_options[answer_key];
    }, time_key * 2);

    window.setTimeout(() => {
        $('#expl1').innerText = expl1_options[answer_key][Math.floor(Math.random()*expl1_options[answer_key].length)];
    }, time_key * 3);

    window.setTimeout(() => {
        $('#expl2').innerText = expl2_options[answer_key][Math.floor(Math.random()*expl2_options[answer_key].length)];
    }, time_key * 4);

    window.setTimeout(() => {
        $('#expl3').innerText = expl3_options[answer_key][Math.floor(Math.random()*expl3_options[answer_key].length)];
    }, time_key * 5);
});
