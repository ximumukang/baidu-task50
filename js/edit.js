/**
 * Created by 杭 on 2017/7/10.
 */
$(function () {
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

});
var BtnFunction ={
    //点击保存问卷，弹出对话框，并保存。
      saveQues :function () {
          new Modal({
              title : "提示",
              body : "问卷已保存",
              noCancel : true ,
              confirmAim : "close-modal"
          });
          var aSavedQuestionnaire={
              title:"",
              date:"",
              html:""
          };
          aSavedQuestionnaire.title=$("#creatTitle").text();
          aSavedQuestionnaire.date=$("#mydatepicker").val();
          aSavedQuestionnaire.html=$("#question-list").html();
          return aSavedQuestionnaire;
      },

    //点击发布问卷弹出对话框
    submitQuesBtn:function () {
        let bodyContent = "",
            noCancel = false,
            confirmAim = "";
        if(!$("#mydatepicker").val()){
            bodyContent="请设置问卷截止日期。";
            noCancel = true ;
            confirmAim = "close-modal"
        }else if (!$("#question-list").children().length){
            bodyContent="请合理设置问卷内容。";
            noCancel= true;
            confirmAim = "close-modal"
        }else{
            bodyContent="是否发布问卷？";
            noCancel =false;
            confirmAim = "confirm-submit-question";
        }
        new Modal({
            title : "提示",
            body : bodyContent,
            noCancel : noCancel ,
            confirmAim : confirmAim
        });
    },

    //发布问卷前将问卷信息放入WJOption中；
    submitQues:function () {
        var WJOption={
            title:"",
            date:"",
            question:[],
            answers:[],
            type:[],
            value:[]
        };
        for(let i=0,len=$(".question-option").length;i<len;i++){
            var questionOption=$(".question-option")[i];
            WJOption.question.push(questionOption.getElementsByTagName("h3")[0].innerText);
            WJOption.type.push(questionOption.getElementsByTagName("h3")[0].className);
            var aOption=[],
                aOptionEle=questionOption.getElementsByTagName("p");
            for(let f=0,len=aOptionEle.length;f<len;f++){
                if(aOptionEle[f].className=="add-option"){continue;}
                aOption.push(aOptionEle[f].innerText);
            }
            WJOption.answers.push(aOption);
        }
        WJOption.title=$("#creatTitle").text();
        WJOption.date=$("#mydatepicker").val();
        var submitQues=localStorage.submitQues? JSON.parse(localStorage.submitQues):[];
        submitQues.push(WJOption);
        localStorage.submitQues=JSON.stringify(submitQues);
    }
};
