export function QuestionsAction(questions){
    return ()=> ({"type":'questions', "questions": questions});
}

export default QuestionsAction;