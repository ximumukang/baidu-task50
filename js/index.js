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
            $("<td><button class='edit-saved' savedIndex='"+a+"'>编辑问卷</button>" +
                "<button savedIndex='"+a+"' class='delete-saved'>删除问卷</button></td>").appendTo($tr);
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
                $("<td><button class='add-btn'>" +
                    "<a href='fillQuestionnaire.html' submitIndex='"+thisIndex+"' class='finish-questionnaire'>填写问卷</a>" +
                    "</button><button ><a submitIndex='"+thisIndex+"' class='view-data' href='viewData.html'>查看数据</a>" +
                    "</button></td>").appendTo($tr);
                $(document).on("click",".finish-questionnaire",function () {
                    localStorage.submitIndex=$(this).attr("submitIndex");
                });
                $(document).on("click",".view-data",function () {
                    localStorage.submitIndex=$(this).attr("submitIndex");
                });
            }else {
                $("<td class='been'></td>").text("已结束").appendTo($tr);
                $("<td><button class='delete-submit' submitIndex='"+thisIndex+"'>删除问卷</button>" +
                    "<button><a submitIndex='"+thisIndex+"' class='view-data' href='viewData.html'>查看数据</a></button></td>").appendTo($tr);
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


    //点击保存的问卷上的删除按钮；
    $(document).on("click",".delete-saved",function () {
        new Modal({
            title:"提示",
            body:"确认删除此问卷？",
            noCancel:false,
            confirmAim:"confirm-delete-saved"
        });
        localStorage.savedIndex=$(this).attr("savedIndex");
    });

    //点击发布了的问卷上的删除按钮；
    $(document).on("click",".delete-submit",function () {
        new Modal({
            title:"提示",
            body:"确认删除此问卷？",
            noCancel:false,
            confirmAim:"confirm-delete-submit"
        });
        localStorage.submitIndex=$(this).attr("submitIndex");
    });

    function hideTable() {
        if(!savedQuestionnaire.length && !submitQues.length){
            $("table").hide();
            $("#build").show();
        }
    }

    $(document).on("click","#confirm-delete-saved",function () {
       var savedIndex = localStorage.savedIndex;
        $("[savedIndex="+savedIndex+"]").parents(".tr").remove();
        savedQuestionnaire.splice(savedIndex,1);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        hideTable();
    });

    $(document).on("click",".confirm-delete-submit",function () {
        var submitIndex=localStorage.submitIndex;
        $("[submitIndex="+submitIndex+"]").parents(".tr").remove();
        submitQues.splice(submitIndex,1);
        localStorage.submitQues=JSON.stringify(submitQues);
        hideTable();
    });

})