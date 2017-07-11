/**
 * Created by 杭 on 2017/3/3.
 */
var submitQues=JSON.parse(localStorage.submitQues),
    aSubmitQues=submitQues[localStorage.submitIndex],
    optionLen=aSubmitQues.question.length;

//渲染出问卷内容
$("#creatTitle").text(aSubmitQues.title);
for(let i=0;i<optionLen;i++){
    var $div=$("<div class='question-option'></div>").addClass(aSubmitQues.type[i]);
    $div.append($("<h3></h3>").text(aSubmitQues.question[i]));
    if(aSubmitQues.answers[i].length==0){
        $("<textarea rows='3'></textarea>").appendTo($div);
    }
    for(let f=0,len=aSubmitQues.answers[i].length;f<len;f++){
        $("<p answer='0'></p>").text(aSubmitQues.answers[i][f]).appendTo($div);
    }
    $("#question-list").append($div);
}

//点击选项颜色变化
$(document).on("click",".audio-question p",function () {
    $(this).css("color","#ee7419").attr("answer","1")
        .siblings().css("color","black").attr("answer","0");
});
$(document).on("click",".checkbox-question p",function () {
    if($(this).attr("answer") == 1){
        $(this).css("color","black").attr("answer","0");
    }else {
        $(this).css("color","#ee7419").attr("answer","1");
    }
});
//获取当前这个人的数据
function getData(){
    var  aPeopleData=[];
    for(let i =0;i<optionLen; i++){
        var questionOption=$(".question-option")[i],
            aOption=[],
            aOptionEle=questionOption.getElementsByTagName("p");
        for(let f=0,len=aOptionEle.length;f<len;f++){
            aOption.push(Number(aOptionEle[f].getAttribute("answer")));
        }
        if(aOption.length==0){
            aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
        }
        aPeopleData.push(aOption);
    }
    return aPeopleData;
}

function isFinish(data) {
    for(let i=0,len=data.length;i<len;i++){
        if(typeof data[i][0]=="number" && eval(data[i].join("+"))==0){
            return false;
        }else if(typeof data[i][0] !=="number" && data[i][0].length==0 ){
            return false;
        }
    }
    return true;
}
//点击提交问卷
$("#submit-questionnaire").click(function () {
    var aPeopleData = getData();
    console.log(aPeopleData)
    if(isFinish(aPeopleData)){
        new Modal({
            title:"提示",
            body:"确认提交问卷？",
            noCancel:false,
            confirmAim:"confirm-fill"
        })
    }else {
        new Modal({
            title:"提示",
            body:"请完整填写问卷。",
            noCancel:true,
            confirmAim:"close-modal"
        })
    }
});

//弹出框符合要求点击确定后
$(document).on("click",".confirm-fill",function () {
    if(aSubmitQues.value.length==0){
        for(let i =0;i<optionLen; i++){
            var questionOption=$(".question-option")[i];
            var aOption=[],
                aOptionEle=questionOption.getElementsByTagName("p");
            for(let f=0,len=aOptionEle.length;f<len;f++){
                aOption.push(Number(aOptionEle[f].getAttribute("answer")));
            }
            if(aOption.length==0){
                aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
            }
            aSubmitQues.value.push(aOption);
        }
    }else{
        for(let i =0 ;i<optionLen; i++){
            var questionOption=$(".question-option")[i];
            var aOption=aSubmitQues.value[i],
                aOptionEle=questionOption.getElementsByTagName("p");
            console.log(aOptionEle.length);
            for(let f=0,len=aOptionEle.length;f<len;f++){
                aOption[f]=Number(aOption[f])+Number(aOptionEle[f].getAttribute("answer"));
            }
            if(typeof aOption[0] !=="number"){
                aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
            }
        }
    }
    localStorage.submitQues=JSON.stringify(submitQues);
    window.location.href="index.html";
});

