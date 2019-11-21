$(function() {
  $(".input_sub").on("click", function(e) {
    e.preventDefault();
    let username = $(".input_txt")
      .val()
      .trim();
    let password = $(".input_pass")
      .val()
      .trim();
    if (username == "" || password == "") {
      // ​如果为空不要继续,如果不为空就继续
      //alert('账号或者密码为空,请重新输入!');
      //使用模态框
      $(".modal-body").text("账号或者密码为空,请重新输入!");
      $("#myModal").modal({
        keyboard: true //模态框显示的时候,可以按esc键隐藏模态框
      });
      return;
      // $('#myModal').modal();
    }
    $.post({
      url: BigNew.user_login,
      data: {
        username: username,
        password: password
      },
      success: function(res) {
        if (res.code == 200) {
          // 保存token
          window.localStorage.setItem("token", res.token);
          //登录成功,跳转到首页
          window.location.href = "index.html";
        } else {
          //alert('账号或者密码错误!');
          //使用模态框
          $(".modal-body").text(res.msg);
          $("#myModal").modal({
            keyboard: true //模态框显示的时候,可以按esc键隐藏模态框
          });
        }
      }
    });
  });
});
