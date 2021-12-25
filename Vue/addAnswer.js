// const axios = require('axios').default

function calcul_des_points(code, reponse){
    let verseOfCode = tableau_code.find(element => element.code === code),
    point_book = verseOfCode.book === reponse.book ? 1 : 0,
    point_chapiter = (point_book !== 0) ? (verseOfCode.chapiter === parseInt(reponse.chapiter)) ? 1 : 0 : 0,
    point_verse = (point_chapiter !== 0) ? (verseOfCode.verse === parseInt(reponse.verse)) ? 1 : 0 : 0,
    point_bonus = (code.charAt(0) === 'C') ? 3 : (code.charAt(0) === 'B') ? 2 : 1,
    point_total = (point_book + point_chapiter + point_verse) * point_bonus;
    // console.log(verseOfCode, reponse);
    // console.log(point_bonus, point_book, point_chapiter, point_verse, point_total);
    return {book:point_book, chapiter: point_chapiter, verse: point_verse, bonus: point_bonus, total: point_total}
}

function addAnswer(code, user, book, chapiter, verse){
    //LODER GIF
    clearQuestion('<img src="./vendor/animate/Ellipsis.gif" height="150em"/>')
    let pts = calcul_des_points(code,{book:book, chapiter:chapiter, verse:verse});
    userPoints.pts+=pts.total;
    userPoints.code.push(code);
    document.querySelector('#pts_cumule').innerHTML = userPoints.pts + ' pts';
    // return console.log(userPoints.code, user, userPoints.pts, 'added');
    listOfUsers.filter(theUser => {
        if(theUser.name === user) {
            theUser.code = userPoints.code;
            theUser.score = userPoints.pts;
        }
    })
    
    const json = JSON.stringify(listOfUsers);
    axios.put(sheetdb_url,json,{
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
    }).then( response => {
        console.log(response.statusText);
        //SORT SCORES
        listOfUsers.sort(function (a, b) {
            return b.score - a.score;
          });

        document.querySelector('#best_score').innerHTML = `Le Meilleur score est de <b>${listOfUsers[0].score}pts</b> Il est détenue par <i>${listOfUsers[0].name}.</i>`;
        document.querySelector('#scoreList').innerHTML = template_tableScore(listOfUsers);
    });
}