

// 【1.获取数据】
var datas = jsonObj;

// 【2.获取容器】
var oNav = document.getElementsByClassName('menu')[0];
var oSlideBox = document.getElementsByClassName('slide-box')[0];


// 【3.加载元素】


// 创建ul元素
var oMenuList = document.createElement('ul');
oMenuList.className = 'menu-list';
oNav.appendChild(oMenuList);


// 遍历数据，创建/设置相应的标签元素
datas.forEach(function (data, idx) {
    {
        // 创建li、a、span元素
        var oLi   = document.createElement('li');
        var oA    = document.createElement('a');
        var oSpan = document.createElement('span');

        // 设置li的class属性
        if('subMenu' in data) {
            oLi.className = 'flag';
        }
        // 为li添加idx自定义属性
        oLi.idx = idx;
        // 设置a元素的属性
        oA.setAttribute('href', 'javascript:;');
        // 设置a元素的文本
        // oA.textContent = ...
        oA.appendChild(document.createTextNode(data.title));
        // 设置span的class
        oSpan.className = 'line';

        // 关联元素：ul > li > a + span
        oMenuList.appendChild(oLi);
        oLi.appendChild(oA);
        oLi.appendChild(oSpan);
    }

    {
        // 判断是否存在子菜单
        if('subMenu' in data) {
            var oDiv = document.createElement('div');
            oDiv.className = 'sub-item';
            oDiv.style.cssText = 'display: none;';
            oSlideBox.appendChild(oDiv);

            // 创建子菜单列表
            var oSubUl = document.createElement('ul');
            oSubUl.className = 'sub-menu-list';
            oDiv.appendChild(oSubUl);
            // 遍历子菜单中的数据项
            data.subMenu.forEach(function (subData) {
                var oSubLi   = document.createElement('li');
                var oSubA    = document.createElement('a');
                var oSubSpan = document.createElement('span');

                oSubA.setAttribute('href', 'javascript:;');
                oSubSpan.className = 'line';

                oSubA.appendChild(document.createTextNode(subData.subTitle));
                oSubLi.appendChild(oSubA);
                oSubLi.appendChild(oSubSpan);
                oSubUl.appendChild(oSubLi);
            });
        }
    }
});



// 【4.事件添加/用户交互】

// 获取主菜单所有的li
var aLi = Array.prototype.slice.call(oMenuList.children);
// 获取主菜单中存在子菜单的li
var aFlagLis = Array.prototype.slice.call(document.getElementsByClassName('flag'));
// 记录上一次显示的子菜单的下标
var lastSubMenuIdx = -1;



// 遍历主菜单li
aLi.forEach(function (oLi) {
    // onmouseenter：鼠标进入事件
   oLi.onmouseenter = function () {

       // a、设置鼠标进入时主菜单li下划线效果
       {
           for(var i = 0; i < oMenuList.children.length; i++) {
               if(oMenuList.children[i].children[1].classList.contains('active')) {
                   // 移除active
                   oMenuList.children[i].children[1].classList.remove('active');
                   break;
               }
           }
           // 为对应的li下的line添加class属性
           oMenuList.children[this.idx].children[1].classList.add('active');
       }


       // b、判断鼠标经过的li下是否存在子菜单
       {
           if(this.className == 'flag') {
               // 将slide-box显示出来
               oSlideBox.style.top = '0px';
           }else {
               // 将slide-box隐藏起来
               console.log('1');
               oSlideBox.style.top = '-600px';
           }
       }

       // c、当显示下一子菜单的时候，清除上一子菜单选择项的样式
       {
           if(lastSubMenuIdx != -1) {
               var lastMenuLis = oSlideBox.children[lastSubMenuIdx].children[0].children;
               for(i = 0; i < lastMenuLis.length; i++) {
                   lastMenuLis[i].children[1].classList.remove('active');
               }
           }

       }

       // d、显示li对应的子菜单
       {
           for(var i = 0; i < oSlideBox.children.length; i++) {
               if(oSlideBox.children[i].style.display == 'block') {
                   oSlideBox.children[i].style.display = 'none';
                   break;
               }
           }
           var flagIdx = aFlagLis.indexOf(this);
           lastSubMenuIdx = flagIdx;
           if(flagIdx != -1) {
               oSlideBox.children[flagIdx].style.display = 'block';
           }
       }
   }
});



// 获取所有的子菜单列表
var aSubUls = Array.prototype.slice.call(document.getElementsByClassName('sub-menu-list'));
// 遍历所有的子菜单列表
aSubUls.forEach(function (subMenuList) {
    var aSubLis = Array.prototype.slice.call(subMenuList.children);
    aSubLis.forEach(function (subLi) {
       subLi.onmouseenter = function (e) {
           // 异常处理
           var i;
           for(i = 0; i < aSubLis.length; i++) {
               if(aSubLis[i].children[1].classList.contains('active')) {
                   aSubLis[i].children[1].classList.remove('active');
                   break;
               }
           }
           this.children[1].classList.add('active');
       } 
    });
});


// 当鼠标移出头部的时候，隐藏下拉菜单
oSlideBox.onmouseleave = function(e) {
  if(e.clientY >= 600) {
    this.style.top = '-600px';
  }
}















































































































