//入口函数
$(function() {
  //把获取所有文章分类并渲染到页面这个代码封装成一个函数
  function getList() {
    //1.一进到页面发送ajax请求,获取所有的文章分类信息.
    $.get({
      url: BigNew.category_list,
      success: function(res) {
        //2.通过模板引擎渲染到页面上.
        let htmlStr = template("list", res);
        $("tbody").html(htmlStr);
      }
    });
  }
  getList();
  //删除功能实现
  $("tbody").on("click", ".btn-delete", function() {
    if (confirm("你真的要删除吗?")) {
      //3. 获取当前删除按钮身上存的id (data-id那个自定义属性保存的id)
      var cateId = $(this).attr("data-id");
      console.log(cateId);
      //4. 发送ajax请求,完成删除
      $.ajax({
        type: "post",
        url: BigNew.category_delete,
        data: {
          id: cateId
        },
        success: function(backData) {
          if (backData.code == 204) {
            // 重新渲染新的数据
            //getData();
            //直接删除dom树中的这一行是可以的.
            $(this)
              .parent()
              .parent()
              .remove();
            getList();
          }
        }
      });
    }
  });
  //需求: 给编辑按钮们注册点击事件.(委托注册)
  $("tbody").on("click", "a.btn-info", function() {
    //让弹出来的模态框里面的标签,显示要修改之前的内容.

    var cateId = $(this).attr("data-id"); //分类id
    var cateName = $(this)
      .parent()
      .prev()
      .prev()
      .text()
      .trim(); //分类名
    var cateSlug = $(this)
      .parent()
      .prev()
      .text()
      .trim(); //分类别名
    $("#recipient-id").val(cateId);
    $("#recipient-name").val(cateName);
    $("#message-text").val(cateSlug);
  });
  //bootstrap 的方法 判断一些你点的是哪个按钮.
  $("#exampleModal").on("show.bs.modal", function(e) {
    var button = $(e.relatedTarget);
    if (button.hasClass("btn-success")) {
      //我的代码
      $("#addArticle").text("Add");
      $(".modal-title").text("Add new");
      $("#addArticle").on("click", function() {
        $.post({
          url: BigNew.category_add,
          data: {
            name: $("#recipient-name").val(),
            slug: $("#message-text").val()
          },

          success: function(res) {
            if (res.code == 201) {
              // console.log(res);
              $("#recipient-name").val("");
              $("#message-text").val("");
              $("#exampleModal").modal("hide");
            }
          }
        });
        getList();
      });
    } else {
      $("#addArticle").text("Save");
      $(".modal-title").text("Edit");
      // $('.form-control').val()

      $("#addArticle").on("click", function() {
        // debugger;
        var id = $("#recipient-id").val();

        $.post({
          url: BigNew.category_edit,
          data: {
            id: id,
            name: $("#recipient-name").val(),
            slug: $("#message-text").val()
          },

          success: function(res) {
            // console.log(res);
            if (res.code == 200) {
              // console.log(res);
              $("#recipient-name").val("");
              $("#message-text").val("");
              $("#exampleModal").modal("hide");
              getList();
            }
          }
        });
      });
    }
  });
});
