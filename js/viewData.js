/**
 * Created by 杭 on 2017/3/3.
 */
$(function () {
    //点击返回
    $("#return-btn").click(function () {
        window.history.back();
    });

    var aSubmitQues=JSON.parse(localStorage.submitQues)[localStorage.submitIndex];
    var optionLen=aSubmitQues.question.length;
    var data=aSubmitQues.value;

    $("#creatTitle").text(aSubmitQues.title);

    if(!data.length) {
        $("#question-list").text("暂时还没有人填写问卷。。。");
    }else {
        for(var i=0;i<optionLen;i++){
            var $div=$("<div class='question-option'></div>").addClass(aSubmitQues.type[i]);
            $div.append($("<h3></h3>").text(aSubmitQues.question[i]));
            if(typeof data[i][0]=="number"){
                var $canvas=$("<canvas width='220px' height='220px' id='drawing'></canvas>"),
                    $describe=$("<div class='describe'></div>"),
                    aQuestionData=eval(data[i].join("+")),
                    drawing=$canvas[0],
                    fillColors=["blue","red","green","black","pink","orange","grey","gold","white"];
                $div.append($canvas).append($describe);

                var a=0,b=0;
                for(let f=0,len=data[i].length;f<len;f++){
                    var context=drawing.getContext("2d");
                    context.beginPath();
                    var percentage=(data[i][f]/aQuestionData),
                        scale=percentage.toFixed(2);
                    b=a+(2*Math.PI)*percentage;
                    context.arc(110,110,100,a,b,false);
                    context.lineTo(110,110);
                    a=b;
                    context.fillStyle=fillColors[f];
                    context.globalAlpha=0.35;
                    context.fill();
                    context.closePath();
                    //下方描述
                    $("<span>"+aSubmitQues.answers[i][f]+"</span><span class='"+fillColors[f]+"'></span>").appendTo($describe);
                }
            }else{
                for(let f=0,len=data[i].length;f<len;f++){
                    $("<p></p>").text(data[i][f]).appendTo($div);
                }
            }

            $("#question-list").append($div);
        }
    }
});