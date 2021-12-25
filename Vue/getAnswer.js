// const axios = require('axios').default

function get_all_scores(connected_user){
    clearQuestion('<img src="./vendor/animate/Ellipsis.gif" height="150em"/>')
    axios.get(`${score_url}`)
    .then( response => {
        // console.log(response.data);
        listOfUsers = response.data;
        listOfUsers.forEach(element => {
            if(element.name === connected_user){
                userPoints.pts = parseInt(element.score);
                userPoints.code = element.code;
            }
        });

        //SORT SCORES
        listOfUsers.sort(function (a, b) {
            return b.score - a.score;
          });

        document.querySelector('#best_score').innerHTML = `Le Meilleur score est de <b>${listOfUsers[0].score}pts</b> Il est détenue par <i>${listOfUsers[0].name}.</i>`;
        document.querySelector('#scoreList').innerHTML = template_tableScore(listOfUsers);
        
        if(userPoints.pts !==0){
            // pointsCumul = userPoints.pts;
            document.querySelector('#pts_cumule').innerHTML = userPoints.pts + ' pts';
            clearQuestion(`Vous avez déjà répondu à ${userPoints.code.length} question(s).`)
            userPoints.code.forEach(element => {
                answeredCode.push(element);
                question_all_code = filterQuestion(question_all_code,answeredCode);
            });
        }else{
            clearQuestion(`BIENVENUE : ${team}`)
            answeredCode = [];
        }
        fill_select_question(question_all_code)
    });
}