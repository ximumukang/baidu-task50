/**
 * Created by 杭 on 2017/3/3.
 */
$(function () {

    //日历插件的使用；
    $('#mydatepicker').dcalendarpicker({
        format:'yyyy-mm-dd'
    });

    //渲染出保存的问卷
    var savedQuestionnaire1=JSON.parse(localStorage.savedQuestionnaire);
    $("#question-list").html((savedQuestionnaire1[Number(localStorage.savedIndex)]).html);
    $("#mydatepicker").val((savedQuestionnaire1[Number(localStorage.savedIndex)]).date);

    $("#question-type").hide();
    $("#add-question").click(function () {
        $("#question-type").slideToggle("fast");
    });
    $("#audio-type").click(function () {
        $("#question-type").hide();
        var $quesList=$("#question-list");
        var $div=$("<div class='question-option'><h3 class='audio-question'>Q<span class='index'></span> <span class='editable'> 单选题</span></h3><P class='editable'>选项1 <span class='remove-option'></span></P><p class='editable'>选项2 <span class='remove-option'></span></p><p class='editable'>选项3 <span class='remove-option'></span></p><p class='add-option'></p><ul><li><button class='delete-question'>删除</button></li><li><button class='clone-question'>复用</button></li><li><button class='go-down'>下移</button></li><li><button class='go-up'>上移</button></li></ul></div>");
        $quesList.append($div);
        var n=$div.prevAll().length;
        $div.find(".index").text(n+1);
    });
    $("#checkbox-type").click(function () {
        $("#question-type").hide();
        var $quesList=$("#question-list");
        var $div=$("<div class='question-option'><h3 class='checkbox-question'>Q<span class='index'></span> <span class='editable'> 多选题</span></h3><P class='editable'>选项1 <span class='remove-option'></span></P><p class='editable'>选项2 <span class='remove-option'></span></p><p class='editable'>选项3 <span class='remove-option'></span></p><p class='add-option'></p><ul><li><button class='delete-question'>删除</button></li><li><button class='clone-question'>复用</button></li><li><button class='go-down'>下移</button></li><li><button class='go-up'>上移</button></li></ul></div>");
        $quesList.append($div);
        var n=$div.prevAll().length;
        $div.find(".index").text(n+1);
    });
    $("#text-type").click(function () {
        $("#question-type").hide();
        var $quesList=$("#question-list");
        var $div=$("<div class='question-option'><h3 class='needWords'>Q<span class='index'></span> <span class='editable'> 文本题</span></h3><textarea name='' id='' cols='60' rows='3'></textarea><ul><li><button class='delete-question'>删除</button></li><li><button class='clone-question'>复用</button></li><li><button class='go-down'>下移</button></li><li><button class='go-up'>上移</button></li></ul></div>");
        $quesList.append($div);
        var n=$div.prevAll().length;
        $div.find(".index").text(n+1);
    });
    //点击删除,下移，上移，复用问题；
    $("#question-list").click(function (e) {
        var currEle=$(e.target).parents(".question-option"),
            targetEle=$(e.target),
            nextEle= currEle.next(),
            prevEle=currEle.prev();
        if (e.target.className=="delete-question"){
            currEle.remove();
        }else if(e.target.className=="go-down"){
            nextEle.after(currEle);
        }else if(e.target.className=="go-up"){
            prevEle.before(currEle);
        }else if(e.target.className=="clone-question"){
            currEle.after(currEle.clone());
        }else if(e.target.className=="add-option"){
            var n=targetEle.prevAll().length;
            var newOption=$("<p class='editable'>选项<span class='option-index'></span> <span class='remove-option'></span></p>");
            targetEle.before(newOption);
            targetEle.prev().find(".option-index").text(n);
            return;
        }else if(e.target.className=="editable"){
            var thisEle=$(e.target),
                oldText=thisEle.text(),
                input=$("<input type='text' class='input-edit' value='"+oldText+"'/>");

            thisEle.html(input);
            input.trigger("focus");
            input.blur(function () {
                if(newText != oldText){
                    var newText=input.val();
                    oldText=newText;
                }
                thisEle.text(oldText).append("<span class='remove-option'></span>");
            });
            return;
        } else if(e.target.className=="remove-option"){
            $(e.target).parents("p").remove();
            return;
        }

        for(var i=0;i<$(".question-option").length;i++){
            var n=$(".question-option").eq(i).prevAll().length;
            $(".question-option").eq(i).find(".index").text(n+1);
        }

    });

    $("#container").click(function (e) {
        if(e.target.className=="creatTitle"){
            var thisEle=$(e.target),
                oldText=thisEle.text(),
                input=$("<input type='text' class='input-edit' value='"+oldText+"'/>");

            thisEle.html(input);
            input.trigger("focus");
            input.blur(function () {
                if(newText != oldText){
                    var newText=input.val();
                    oldText=newText;
                }
                thisEle.text(oldText);
                if(thisEle.text()==""){
                    thisEle.text("这里是标题");
                }
            })
        }
    });

    var WJLength,
        WJOption={
            index:0,
            title:"",
            date:"",
            question:[],
            answers:[],
            type:[],
            value:[]
        };

    //保存问卷弹出层
    function popupSave() {
        $popupDiv = $("<div class='popup'><h1>提示<span id='close-popup'></span></h1><div><p id='popup-content'></p><div id='popup-btns'></div></div></div>");
        $popupDiv.appendTo($("body"));
        $popupDiv.find("#popup-content").text("问卷已保存。");
        $popupDiv.find("#popup-btns").append($("<button id='confirm-btn1'>确定</button>"));
    }
    //点击保存问卷
    if(!localStorage.savedQuestionnaire){
        var savedQuestionnaire=[];
    }else {
        var savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
    }
    var cuursavedQlen=savedQuestionnaire.length;
    console.log(cuursavedQlen);
    $("#save-question").click(function () {
        popupSave();
        var aSavedQuestionnaire={
            title:"",
            date:"",
            html:""
        };
        aSavedQuestionnaire.title=$("#creatTitle").text();
        aSavedQuestionnaire.date=$("#mydatepicker").val();
        aSavedQuestionnaire.html=$("#question-list").html();
        savedQuestionnaire.splice(Number(localStorage.savedIndex),1,aSavedQuestionnaire);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
    });
    //发布问卷弹出层
    function popup() {
        $popupDiv=$("<div class='popup'><h1>提示<span id='close-popup'></span></h1><div><p id='popup-content'></p><div id='popup-btns'></div></div></div>");
        $popupDiv.appendTo($("body"));
        if($("#mydatepicker").val()==0){
            $popupDiv.find("#popup-content").text("请设置问卷截止日期。");
            $popupDiv.find("#popup-btns").append($("<button id='confirm-btn1'>确定</button>"));
        }else if($("#question-list").children().size()==0){
            $popupDiv.find("#popup-content").text("请合理设置问卷内容。");
            $popupDiv.find("#popup-btns").append($("<button id='confirm-btn1'>确定</button>"));
        }else {
            $popupDiv.find("#popup-content").text("是否发布问卷？");
            $popupDiv.find("#popup-btns").append($("<button id='confirm-btn'>确定</button> &nbsp;&nbsp;<button id='cancel-btn'>取消</button>"));
        }
    }
    //点击发布问卷弹出框
    $("#submit-question").click(function () {
        popup();
    });

    //弹出框点击取消、保存弹出框确定；
    $(document).on("click","#cancel-btn",function () {
        $(this).parents(".popup").hide();
    });
    $(document).on("click","#confirm-btn1",function () {
        $(this).parents(".popup").hide();
    });
    //发布问卷弹出框点击确定；
    $(document).on("click","#confirm-btn",function () {

        WJLength=$(".question-option").size();

        for(var i=0;i<WJLength;i++){
            var questionOption=$(".question-option")[i];
            WJOption.question.push(questionOption.getElementsByTagName("h3")[0].innerText);
            WJOption.type.push(questionOption.getElementsByTagName("h3")[0].className);
            var aOption=[],
                aOptionEle=questionOption.getElementsByTagName("p");
            for(var f=0;f<aOptionEle.length;f++){
                if(aOptionEle[f].className=="add-option"){continue;}
                aOption.push(aOptionEle[f].innerText);
            }
            WJOption.answers.push(aOption);
        }
        WJOption.title=$("#creatTitle").text();
        WJOption.date=$("#mydatepicker").val();

        if(localStorage.thisIndex=="undefined"){
            localStorage.thisIndex=0;
        }
        WJOption.index=localStorage.thisIndex;
        localStorage.thisIndex++;
        if(localStorage.content){
            var WJOptions=JSON.parse(localStorage.content);
        }else {
            var WJOptions={};
        }

        WJOptions[WJOption.index]=WJOption;

        localStorage.content=JSON.stringify(WJOptions);
        //$(this).unbind();
        var savedIndex=Number(localStorage.savedIndex),
            savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
        savedQuestionnaire.splice(savedIndex,1);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        window.location.href="17.01.01task50-index.html";
    });
});

