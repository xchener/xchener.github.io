/**
 * Created by bjwsl-001 on 2016/11/2.
 */
/*广告图片数组*/
var imgs=[
  {"i":0,"img":"img/banner_01.jpg"},
  {"i":1,"img":"img/banner_02.jpg"},
  {"i":2,"img":"img/banner_03.jpg"},
  {"i":3,"img":"img/banner_04.jpg"},
];
var slider={
  LIWIDTH:0,//保存每个li的宽度，其实就是#slider的宽
  DURATION:1000,//动画的总时间
  WAIT:3000,//自动轮播之间的等待时间
  timer:null,
  canAuto:true,//保存是否可以自动轮播
  init:function(){
    this.LIWIDTH=parseFloat($("#slider").css("width"));
    this.updateView();
    $("#indexs").on("mouseover","li:not(.hover)",function(e){
      var $target=$(e.target);
      this.move($target.html()-$target.siblings(".hover").html());
    }.bind(this));
    $("#slider").hover(
      function(){this.canAuto=false;}.bind(this),
      function(){this.canAuto=true;}.bind(this)
    );
    this.autoMove();
  },
  autoMove:function(){//启动自动轮播
    this.timer=setTimeout(function(){
        if(this.canAuto){
          this.move(1);
        }else{
          this.autoMove();
        }
      }.bind(this)
      ,this.WAIT);
  },
  move:function(n){
    clearTimeout(this.timer);
    this.timer=null;
    $("#imgs").stop(true);//停止动画防止叠加
    var left=parseFloat($("#imgs").css("left"));
    if(n<0){
      n*=-1;
      imgs=imgs.splice(imgs.length-n,n).concat(imgs);
      this.updateView();
      $("#imgs").css("left",left-n*this.LIWIDTH);
      $("#imgs").animate({left:"0"},this.DURATION,this.autoMove.bind(this));
    }else{
      $("#imgs").animate({left:-n*this.LIWIDTH+"PX"},this.DURATION,this.endMove.bind(this,n));
    }
  },
  endMove:function(n){
    imgs=imgs.concat(imgs.splice(0,n));
    this.updateView();
    $("#imgs").css("left",0);
    this.autoMove();
  },
  updateView:function(){//将数组中的元素更新到页面
    for(var i=0,html="",idxs="";i<imgs.length;i++){
      html+="<li><img src='"+imgs[i].img+"'></li>";
      idxs+="<li>"+(i+1)+"</li>";
    }
    $("#imgs").html(html).css("width",this.LIWIDTH*imgs.length);
    $("#indexs").html(idxs);
    $("#indexs>li:eq("+imgs[0].i+")").addClass("hover")
      .siblings(".hover").removeClass("hover");
  }
};
slider.init();