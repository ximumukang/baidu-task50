/**
 * Created by 杭 on 2017/7/10.
 */
function Modal(obj) {
    this.init();
    this.render(obj);
    this.bind();
}

Modal.prototype={

    init:function () {

        if($(".modal").length > 0){
            return
        }

        let tpl  =  '<div class="modal">' +
                        '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header"></div>' +
                                '<div class="modal-body"></div>' +
                                '<div class="modal-footer">' +
                                    '<button class="modal-confirm close-modal">确定</button>' +
                                    '<button class="modal-cancel close-modal">取消</button>' +
                                '</div>' +
                                '</div>' +
                            '</div>' +
                        '<div class="modal-mask"></div>' +
                    '</div>';
        this.$modal = $(tpl);
        this.$modal.appendTo($("body"));
    },

    render :function (obj) {
        $(".modal-header").text(obj.title);
        $(".modal-body").text(obj.body);
        if(obj.noCancel){
            $(".modal-cancel").hide();
        }
        $(".modal-confirm").addClass(obj.confirmAim);
    },

    bind :function () {
        $(".modal-mask").click(function () {
            $(".modal").remove();
        });
        $(".close-modal").on("click",function () {
            $(".modal").remove();
        })
    }
};

