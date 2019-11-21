$(function() {
  $(".logout").on("click", function() {
    $("#myModal").modal();
    $(".cancel").on("click", function() {
      localStorage.removeItem("token");
      location.href = "./login.html";
    });
  });
  $.get({
    url: BigNew.user_info,

    success: function(res) {
      // console.log(res);

      $(".user_info>img").attr("src", res.data.userPic);
      $(".user_info>span").html("欢迎&nbsp;&nbsp" + res.data.nickname);
      $(".user_center_link>img").attr("src", res.data.userPic);
    }
  });
  $(".level01").on("click", function() {
    // document.querySelectorAll(".level01");
    $(this)
      .addClass("active")
      .siblings("div")
      .removeClass("active");
    if ($(this).index() == 1) {
      $("ul.level02").toggle();
      $("ul.level02 li:eq(0)>a")[0].click();
    }
  });
});
