/**
 * Created by 杭 on 2017/3/3.
 */

$(function () {

    //日历插件的使用；
    $('#mydatepicker').datePicker();

    //点击保存问卷
    var savedQuestionnaire = localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [] ,
        cuursavedQlen=savedQuestionnaire.length;

    $("#save-question").click(function () {
        let aSavedQuestionnaire = BtnFunction.saveQues();
        if(savedQuestionnaire.length==cuursavedQlen){
            savedQuestionnaire.push(aSavedQuestionnaire);
        }else {
            savedQuestionnaire.splice(-1,1,aSavedQuestionnaire);
        }
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
    });

    //点击发布问卷按钮弹出对话框
    $("#submit-question").click(function () {
        BtnFunction.submitQuesBtn();
    });

    //发布问卷弹出框点击确定；
    $(document).on("click",".confirm-submit-question",function () {

        BtnFunction.submitQues();
        if(savedQuestionnaire.length !== cuursavedQlen){
            savedQuestionnaire.pop();
            localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        }
        window.location.href="index.html";
    });
});

