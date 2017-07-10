/**
 * Created by 杭 on 2017/3/3.
 */
$(function () {
    var submitQues=localStorage.submitQues ? JSON.parse(localStorage.submitQues):[],
       savedQuestionnaire=localStorage.savedQuestionnaire ? JSON.parse(localStorage.savedQuestionnaire) : [],
        $table=$("table"),
        currTime;

    if(submitQues.length || savedQuestionnaire.length){
        $("#build").hide();
    }else{
        $("table").hide();
    }
    // 渲染出保存了的问卷
    function initSavedQues() {
        for(var a=0,len=savedQuestionnaire.length;a<len;a++){
            var $tr=$("<tr class='tr'></tr>");
            $("<td></td>").text(savedQuestionnaire[a].title).appendTo($tr);
            $("<td></td>").text(savedQuestionnaire[a].date).appendTo($tr);
            $("<td class='saving'></td>").text("未发布").appendTo($tr);
            $("<td><button class='edit-saved' savedIndex='"+a+"'>编辑问卷</button><button savedIndex='"+a+"' class='delete-saved'>删除问卷</button></td>").appendTo($tr);
            $tr.appendTo($table);
        }
    }
    if(savedQuestionnaire.length){
        initSavedQues();
    }
    //渲染出发布了的问卷
    function initSubmitQues() {
        for(var thisIndex in submitQues){
            var $tr=$("<tr class='tr'></tr>"),
                aSubmitQues=submitQues[thisIndex];
            $("<td></td>").text(aSubmitQues.title).appendTo($tr);
            $("<td></td>").text(aSubmitQues.date).appendTo($tr);

            currTime=new Date(aSubmitQues.date);
            if(currTime-(new Date())>0){
                $("<td class='ing'></td>").text("发布中").appendTo($tr);
                $("<td><button class='add-btn'><a href='fillQuestionnaire.html' submitIndex='"+thisIndex+"' class='finish-questionnaire'>填写问卷</a></button><button ><a submitIndex='"+thisIndex+"' class='view-data' href='viewData.html'>查看数据</a></button></td>").appendTo($tr);
                $(document).on("click",".finish-questionnaire",function () {
                    localStorage.submitIndex=$(this).attr("submitIndex");
                });
                $(document).on("click",".view-data",function () {
                    localStorage.submitIndex=$(this).attr("submitIndex");
                });
            }else {
                $("<td class='been'></td>").text("已结束").appendTo($tr);
                $("<td><button class='delete-questionnaire' submitIndex='"+thisIndex+"'>删除问卷</button><button><a submitIndex='"+thisIndex+"' class='view-data' href='viewData.html'>查看数据</a></button></td>").appendTo($tr);
            }
            $tr.appendTo($table);
        }
    }
    if(submitQues.length){
        initSubmitQues();
    }

    //点击编辑保存的问卷
    $(document).on("click",".edit-saved",function () {
        localStorage.savedIndex=$(this).attr("savedIndex");
        window.location.href="savedQuestionnaire.html";
    });

    $(document).on("click","#cancel-btn",function () {
        $(this).parents(".popup").remove();
    });

    //点击发布了的问卷上的删除按钮；
    $(document).on("click",".delete-questionnaire,",function () {
        $popupDiv=$("<div class='popup'><h1>提示<span id='close-popup'></span></h1><div><p id='popup-content'></p><div id='popup-btns'></div></div></div>");
        $popupDiv.appendTo($("body"));
        $popupDiv.find("#popup-content").text("确认删除此问卷？");
        $popupDiv.find("#popup-btns").append($("<button id='confirm-delete-ques' index='"+$(this).attr("index")+"'>确定</button> &nbsp;&nbsp;<button id='cancel-btn'>取消</button>"));
    });

    //删除未发布的问卷上的删除按钮；
    $(document).on("click",".delete-saved,",function () {
        $popupDiv=$("<div class='popup'><h1>提示<span id='close-popup'></span></h1><div><p id='popup-content'></p><div id='popup-btns'></div></div></div>");
        $popupDiv.appendTo($("body"));
        $popupDiv.find("#popup-content").text("确认删除此问卷？");
        $popupDiv.find("#popup-btns").append($("<button id='confirm-delete-saved' savedIndex='"+$(this).attr("savedIndex")+"'>确定</button> &nbsp;&nbsp;<button id='cancel-btn'>取消</button>"));
    });

    function hideTable() {
        if(!savedQuestionnaire.length && !submitQues.length){
            $("table").hide();
            $("#build").show();
        }
    }

    $(document).on("click","#confirm-delete-ques",function () {
        var deleteIndex=$(this).attr("index");
        $("[submitIndex="+deleteIndex+"]").parents(".tr").remove();
        submitQues.splice(Number($(this).attr("submitIndex")),1);
        localStorage.submitQues=JSON.stringify(submitQues);
        $(".popup").remove();
        hideTable();
    });

    $(document).on("click","#confirm-delete-saved",function () {
        var deleteIndex=$(this).attr("savedIndex");
        $("[savedIndex="+deleteIndex+"]").parents(".tr").remove();
        savedQuestionnaire.splice(Number($(this).attr("index")),1);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        $(".popup").remove();
        hideTable();
    });

})