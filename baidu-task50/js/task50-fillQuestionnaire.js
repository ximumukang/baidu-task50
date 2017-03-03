/**
 * Created by 杭 on 2017/3/3.
 */
var contents=JSON.parse(localStorage.content);
var content=contents[localStorage.thatIndex];
var optionLen=content.question.length;
$("#creatTitle").text(content.title);
for(var i=0;i<optionLen;i++){
    var $div=$("<div class='question-option'></div>").addClass(content.type[i]);
    $div.append($("<h3></h3>").text(content.question[i]));
    if(content.answers[i].length==0){
        $("<textarea rows='3'></textarea>").appendTo($div);
    }
    for(var f=0;f<content.answers[i].length;f++){
        $("<p answer='0'></p>").text(content.answers[i][f]).appendTo($div);
    }
    $("#question-list").append($div);
}

//点击选项颜色变化
$(document).on("click",".audio-question p",function () {
    $(this).css("color","#ee7419").attr("answer","1")
        .siblings().css("color","black").attr("answer","0");
});
$(document).on("click",".checkbox-question p",function () {
    $(this).toggle(function () {
        $(this).css("color","#ee7419").attr("answer","1");
    },function () {
        $(this).css("color","black").attr("answer","0");
    });
    $(this).trigger("click");//如何没有这行代码，第一次点击不选中；
});

//点击提交问卷
/*$("#submit-questionnaire").click(function () {
 var aPeopleData=[];
 for(var i =0;i<optionLen; i++){
 var questionOption=$(".question-option")[i];
 var aOption=[],
 aOptionEle=questionOption.getElementsByTagName("p");
 for(var f=0;f<aOptionEle.length;f++){
 aOption.push(aOptionEle[f].getAttribute("answer"));
 }
 if(aOption.length==0){
 aOption=questionOption.getElementsByTagName("textarea")[0].value;
 }
 aPeopleData.push(aOption);
 }
 content.value.push(aPeopleData);

 localStorage.content=JSON.stringify(contents);

 $("#submit-questionnaire").unbind();
 });*/

//点击提交问卷
$("#submit-questionnaire").click(function () {
    popup(getData());
    //$("#submit-questionnaire").unbind();
});
//弹出框符合要求点击确定后
$(document).on("click","#confirm-btn",function () {
    if(content.value.length==0){
        for(var i =0;i<optionLen; i++){
            var questionOption=$(".question-option")[i];
            var aOption=[],
                aOptionEle=questionOption.getElementsByTagName("p");
            for(var f=0;f<aOptionEle.length;f++){
                aOption.push(Number(aOptionEle[f].getAttribute("answer")));
            }
            if(aOption.length==0){
                aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
            }
            content.value.push(aOption);
        }
    }else{
        for(var i =0 ;i<optionLen; i++){
            var questionOption=$(".question-option")[i];
            var aOption=content.value[i],
                aOptionEle=questionOption.getElementsByTagName("p");
            console.log(aOptionEle.length);
            for(var f=0;f<aOptionEle.length;f++){
                aOption[f]=Number(aOption[f])+Number(aOptionEle[f].getAttribute("answer"));
            }
            if(typeof aOption[0] !=="number"){
                aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
            }
        }
    }

    localStorage.content=JSON.stringify(contents);

    //$(this).parents("#popup").hide();
    window.location.href="17.01.01task50-index.html";
});
//弹出框点击取消
$(document).on("click","#cancel-btn",function () {
    $(this).parents(".popup").hide();
});
$(document).on("click","#confirm-btn1",function () {
    $(this).parents(".popup").hide();
});
//获取当前这个人的数据
function getData(){
    for(var i =0;i<optionLen; i++){
        var questionOption=$(".question-option")[i];
        var aOption=[],
            aPeopleData=[],
            aOptionEle=questionOption.getElementsByTagName("p");
        for(var f=0;f<aOptionEle.length;f++){
            aOption.push(Number(aOptionEle[f].getAttribute("answer")));
        }
        if(aOption.length==0){
            aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
        }
        aPeopleData.push(aOption);
    }
    return aPeopleData;
}

//弹出层
function popup(data) {
    var ifFinished=true;
    $popupDiv=$("<div class='popup'><h1> &nbsp;&nbsp;提示<span id='close-popup'></span></h1><div><p id='popup-content'></p><div id='popup-btns'></div></div></div>");
    $popupDiv.appendTo($("body"));
    for(var i=0;i<data.length;i++){
        if(typeof data[i][0]=="number" && eval(data[i].join("+"))==0){
            ifFinished=false;
        }else if(typeof data[i][0] !=="number" && data[i][0].length==0 ){
            ifFinished=false;
        }
    }
    if(ifFinished){
        $popupDiv.find("#popup-content").text("确认提交问卷？");
        $popupDiv.find("#popup-btns").append($("<button id='confirm-btn'>确定</button> &nbsp;&nbsp;<button id='cancel-btn'>取消</button>"));
    }else{
        $popupDiv.find("#popup-content").text("请完整填写问卷。");
        $popupDiv.find("#popup-btns").append($("<button id='confirm-btn1'>确定</button>"));
    }
}