function DatePicker($target){

    this.init($target);
    this.render();
    this.setDate();
    this.bind();
}
DatePicker.prototype={

    init:function ($target) {
        this.$target = $target;
        this.date = new Date();
        this.leapYearMonths =[31,29,31,30,31,30,31,31,30,31,30,31];
        this.noLeapYearMonths =[31,28,31,30,31,30,31,31,30,31,30,31];
        this.weekDay = ["日","一","二","三","四","五","六"];
        this.months =["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day= this.date.getDay();
        this.todayYear = new Date().getFullYear();
        this.todayMonth = new Date().getMonth();
        this.todayDate = new Date().getDate();
    },

    render: function () {

        let tpl= '<div class="date-picker">'
            +'<div class="date-title">'
            + '<h1 class="month"></h1>'
            +'<h2 class="year"></h2>'
            +'<a class="prev"> < </a>'
            +'<a class="next"> > </a>'
            +'</div>'
            +'<div class="date-body">'
            +'<ul><li>MON</li><li>TUE</li><li>WED</li><li>THU</li><li>FRI</li><li>SAT</li><li>SUN</li></ul>'
            +'<ul class="date-picker-date"></ul>'
            +'</div>'
            +'</div>';
        this.$datepicker = $(tpl);
        this.$datepicker.appendTo($("body")).css({
            position:"absolute",
            top : this.$target.offset().top + this.$target.outerHeight(),
            left: this.$target.offset().left
        });
        this.$datepicker.hide();
    },

    setDate:function () {
        let tpl="",
            firstDay = this.getFirstDay(this.year,this.month),
            monthDays = this.getMonthDays(this.year,this.month),
            todayYear = new Date().getFullYear(),
            todayMonth = new Date().getMonth(),
            todayDate = new Date().getDate();
        for(let i = 0; i < firstDay ; i++){
            tpl += '<li></li>';
        }
        for(let i = 1; i <= monthDays ; i++){
            if(this.month == this.todayMonth && this.year == this.todayYear && i < this.todayDate){
                tpl += '<li></li>';
            }else if(this.month == this.todayMonth && this.year == this.todayYear && i == this.todayDate){
                tpl += '<li class="active">'+i+'</li>'
            } else {
                tpl += '<li>'+i+'</li>';
            }

        }
        $(".date-picker-date").html(tpl);
        $(".date-picker .month").text(this.months[this.month]);
        $(".date-picker .year").text(this.year);
        this.liBindClick();
    },

    getFirstDay:function (year,month) {
        return new Date(year,month,1).getDay();
    },

    getMonthDays:function (year,month) {
        if ((year % 100 !== 0 && year % 4 == 0) || (year % 100 ==0 && year % 400 ==0)){
            return this.leapYearMonths[month];
        }
        return this.noLeapYearMonths[month];
    },

    bind:function () {
        let self = this;
        $(".prev").click(function () {
            if(self.year == self.todayYear && self.month == self.todayMonth){
                return ;
            }
            self.month--;
            if(self.month <0){
                self.year--;
                self.month = 11;
            }
            self.setDate();
        });
        $(".next").click(function () {
            self.month ++;
            if(self.month > 11){
                self.year++;
                self.month = 0;
            }
            self.setDate();
        });
        this.$target.click(function () {
            $(".date-picker").show();
            self.$datepicker.css({
                position:"absolute",
                top : $(this).offset().top +  $(this).outerHeight(),
                left:  $(this).offset().left
            })
        });
        //下面设置点击页面其他部分隐藏 date-picker
        $(".date-picker").click(function (e) {
            e.stopPropagation();
        });
        $(window).click(function (e) {
            if(e.target.id == self.$target.attr("id")){
                return
            }
            $(".date-picker").hide();
        })
    },

    liBindClick:function () {
        let self = this;
        $(".date-picker-date li").each(function () {
            $(this).click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                let date = self.year+"-"+(self.month+1)+"-"+$(this).text();
                self.$target.val(date);
                $(".date-picker").hide();
            })
        })
    }
};
$.fn.datePicker=function () {
    this.each(function () {
        new DatePicker($(this))
    })
};