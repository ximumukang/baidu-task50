/**
 * Created by 杭 on 2017/3/3.
 */
$(function () {

    //日历插件的使用；
    $('#mydatepicker').datePicker();

    //渲染出保存的问卷
    var savedQuestionnaire1=JSON.parse(localStorage.savedQuestionnaire);
    $("#question-list").html((savedQuestionnaire1[Number(localStorage.savedIndex)]).html);
    $("#mydatepicker").val((savedQuestionnaire1[Number(localStorage.savedIndex)]).date);

    //点击保存问卷
    var savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
    var cuursavedQlen=savedQuestionnaire.length;

    $("#save-question").click(function () {
        let aSavedQuestionnaire=BtnFunction.saveQues();
        savedQuestionnaire.splice(Number(localStorage.savedIndex),1,aSavedQuestionnaire);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
    });

    //点击发布问卷按钮弹出对话框
    $("#submit-question").click(function () {
        BtnFunction.submitQuesBtn();
    });

    //发布问卷弹出框点击确定；
    $(document).on("click",".confirm-submit-question",function () {
        BtnFunction.submitQues();
        var savedIndex=Number(localStorage.savedIndex),
            savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
        savedQuestionnaire.splice(savedIndex,1);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        window.location.href="index.html";
    });
});

