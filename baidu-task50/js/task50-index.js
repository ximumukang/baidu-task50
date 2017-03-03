/**
 * Created by 杭 on 2017/3/3.
 */
$(function () {
    if(localStorage.content){
        $("#build").hide();
    }
    if(!localStorage.content){
        $("table").hide();
    }

    var content1=JSON.parse(localStorage.content),
        $table=$("table"),
        currTime;
    if(localStorage.savedQuestionnaire){
        var savedQuestionnaire=JSON.parse(localStorage.savedQuestionnaire);
        // 渲染出保存了的问卷
        for(var a=0;a<savedQuestionnaire.length;a++){
            var $tr=$("<tr class='tr'></tr>");
            $("<td></td>").text(savedQuestionnaire[a].title).appendTo($tr);
            $("<td></td>").text(savedQuestionnaire[a].date).appendTo($tr);
            $("<td class='saving'></td>").text("未发布").appendTo($tr);
            $("<td><button class='edit-saved' savedIndex='"+a+"'>编辑问卷</button><button savedIndex='"+a+"' class='delete-saved'>删除问卷</button></td>").appendTo($tr);
            $tr.appendTo($table);
        }
    }


    //点击编辑问卷
    $(document).on("click",".edit-saved",function () {
        localStorage.savedIndex=$(this).attr("savedIndex");
        window.location.href="17.01.17task50-savedQuestionnaire.html";
    });

    //点击删除问卷弹出
    /*function popup() {
     $popupDiv=$("<div id='popup'><h1>提示<span id='close-popup'></span></h1><div><p id='popup-content'></p><div id='popup-btns'></div></div></div>");
     $popupDiv.appendTo($("body"));
     $popupDiv.find("#popup-content").text("确认删除此问卷？");
     $popupDiv.find("#popup-btns").append($("<button id='confirm-delete'>确定</button> &nbsp;&nbsp;<button id='cancel-btn'>取消</button>"));
     }*/
    $(document).on("click","#cancel-btn",function () {
        $(this).parents(".popup").hide();
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
//            $(document).on("click",".delete-saved,",function () {
//                popup();
//                $("#popup").
//            });
    $(document).on("click","#confirm-delete-ques",function () {
        var deleteIndex=$(this).attr("index");
        $("[index="+deleteIndex+"]").parents(".tr").remove();
        delete content1[deleteIndex];
        localStorage.content=JSON.stringify(content1);
        $(".popup").hide();
    });
    $(document).on("click","#confirm-delete-saved",function () {
        console.log(123);
        var deleteIndex=$(this).attr("savedIndex");
        $("[savedIndex="+deleteIndex+"]").parents(".tr").remove();
        savedQuestionnaire.splice(Number($(this).attr("index")),1);
        localStorage.savedQuestionnaire=JSON.stringify(savedQuestionnaire);
        console.log(456);
        $(".popup").hide();
    });
    //渲染出发布了的问卷
    for(var thisIndex in content1){
        var $tr=$("<tr class='tr'></tr>"),
            content=content1[thisIndex];
        //console.log(thisIndex);
        $("<td></td>").text(content.title).appendTo($tr);
        $("<td></td>").text(content.date).appendTo($tr);

        currTime=new Date(content.date);
        if(currTime-(new Date())>0){
            $("<td class='ing'></td>").text("发布中").appendTo($tr);
            $("<td><button class='add-btn'><a href='17.01.11task50-fillQuestionnaire.html' index='"+thisIndex+"' class='finish-questionnaire'>填写问卷</a></button><button ><a index='"+thisIndex+"' class='view-data' href='17.01,14task50-viewData.html'>查看数据</a></button></td>").appendTo($tr);
            //console.log(thisIndex);
//                    $(document).on("click",".finish-questionnaire",(function (invoked) {
//                        return function () {
//                            localStorage.thatIndex=invoked;
//                            console.log(invoked);
//                        }
//                    }(thisIndex)))

            $(document).on("click",".finish-questionnaire",function () {
                localStorage.thatIndex=$(this).attr("index");
            });
            $(document).on("click",".view-data",function () {
                localStorage.thatIndex=$(this).attr("index");
            });


        }else {
            $("<td class='been'></td>").text("已结束").appendTo($tr);
            $("<td><button class='delete-questionnaire' index='"+thisIndex+"'>删除问卷</button><button><a index='"+thisIndex+"' class='view-data' href='17.01,14'>查看数据</a></button></td>").appendTo($tr);
            //点击删除问卷
            /* $(document).on("click",".delete-questionnaire",function () {
             $(this).parents(".tr").remove();
             delete content1[$(this).attr("index")];
             localStorage.content=JSON.stringify(content1);
             })*/
        }

        $tr.appendTo($table);
    }
})