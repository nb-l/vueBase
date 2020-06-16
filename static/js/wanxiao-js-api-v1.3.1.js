/***********************************************************************
 * * 
 * V1.3.1
 * 2019-11-13 新增原生分享组件    shareComponent
 *            新增截屏（当前页面） getScreenShotPage
 * 
 * V1.3.0
 * 2019-10-11 新增系统日历提醒 setRemindCalendar
 * 
 * v1.2.9
 * 2018-11-09  新增调用中银收款、付款码在事件驱动中eventDriven
 *
 * v1.2.8
 * 2018-08-30  新增录音的方法
 * 2018-08-01  新增统一身份绑卡信息保存基于事件驱动方法的扩展，
 *             新增保存图片
 *             扩展setmeu1，样式扩展,list样式
 *             打开新的webview中隐藏导航栏方法
 *
 * v1.2.7
 * 2018-06-09 新增事件管理方法 eventDriven  支持完美校园iOS Android  4.4.5 版本
 *
 * v1.2.6
 * 2018-05-22 新增打开新webview方法 openNewWebview
 * 2018-05-09 新增分享图片shareImage,getDeviceInfo 增加返回本机ip地址
 *
 * v1.2.5
 * 2018-04-20 扩展扫一扫，适配新老版本
 *
 * v1.2.4
 * 2018-03-20 扩展扫一扫，增加手动输入入口
 *
 * v1.2.3
 * 2017-11-09 扩展获取设备信息接口
 *
 * v1.2.2
 * 2017-09-12 新增虚拟键盘 setKeyboard，仅供支付SDK使用
 *
 * v1.2.1
 * 2017-08-15 新增shareto类型，分享给好友信息
 *            新增设置navbar颜色
 *
 * v1.2.0
 * 2017-06-02 增加获取设备信息
 *
 * v1.1.9
 * 2016-09-01 增加Hiall调用播放器 NCPStartTalkFun
 * 2016-08-12 增加 setConfig  getConfig 设置配置项和获得配置项,web缓存
 * 2016-08-10 增加 setConfig,getConfig 设置配置项和增加配置项,iOS中只有iOS8以上有此功能
 * 2016-08-02 更改iOS 调用机制 url 中带有iOSOldWeb字段说明使用老的webview
 *
 *
 * v1.1.8
 * 2016-07-07 增加 显示和隐藏 menu
 * 2016-06-30 增加 setMenu1 方法
 *
 * v1.1.7
 * 2016-05-21 openCamera方法，参数增加字段 action：0（默认，弹窗选择），1直接打开系统相册，2直接打开拍照
 * 2016-05-21 增加selectImage1方法,比selectImage方法增加裁剪功能
 *
 * v1.1.6
 * 2016-04-25 增加scheme回调
 * 2016-04-28 修改shareTo方法接口，增加分享到同学圈（link card）
 *
 * v1.1.5
 * 2016-03-23 增加打开图片浏览
 * 2016-03-23 增加获取网络状态
 * 2016-03-23 增加选择图片（每次只能选择一张图片）
 * 2016-03-23 增加设置title
 *
 * v1.1.4
 * 2015-12-31 分享js增加分享标题title
 *
 * v1.1.3
 * 2015-12-11 增加setMenu方法
 * 2015-12-14 增加scanBarcode方法
 * 2015-12-29 增加shake摇一摇方法
 *
 * v1.1.2
 * 2015-11-02 分享方法增加点击跳转url参数
 *
 * v1.1.1
 * 2015-08-22 增加Wanxiao.readycallback
 *
 * v1.1
 * 2015-07-31 创建
 *
 * V1.0
 * 2015-07-22 增加获取用户头像 李润冬
 * 2015-07-29 将get_jsname，add_js_name方法，放外边
 ***********************************************************************/

function Wanxiao() {

}

/**
 * 获得用户token
 * </p>
 * 第三方调用时，通过回调方式获得结果，如下：<br>
 * var result = wanxiao.getToken(function(response){ alert("获得结果: " + response);
 * });
 */
Wanxiao.prototype.getToken = function (callback) {

    if (!isIphone()) {
        callback(window.wanxiao_authen.executeBindMethod("getToken", null));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._getTokenCallback",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._getTokenCallback = callback;
        window.webkit.messageHandlers.getToken.postMessage(postParams);
    }
};

/**
 * 获得用户信息
 */
Wanxiao.prototype.getUserJsonValue = function (callback) {
    if (!isIphone()) {
        callback(window.wanxiao_authen.executeBindMethod("getUserJsonValue",
                                                         null));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._getUserJsonValueCallback",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._getUserJsonValueCallback = callback;
        window.webkit.messageHandlers.getUserJsonValue.postMessage(postParams);
    }
};

/**
 * 发起推送 jsondata {token:用户token, flag:插件标记, sign:除sign本身的全部传入参数的签名
 * toUserId:接收人id appcode:应用编号 versionname:版本名称 versioncode:版本代码
 * param:插件参数(json格式) title:通知标题 message:通知内容} *具体可参考接口0087:插件推送通知
 */
Wanxiao.prototype.sendRemoteNotification = function (jsondata, callback) {
    if (!isIphone()) {
        callback(window.wanxiao_push.executeBindMethod(
                                                       "sendRemoteNotification", jsondata));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._sendRemoteNotificationCallback",
            "parValue":jsondata
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._sendRemoteNotificationCallback = callback;
        window.webkit.messageHandlers.sendRemoteNotification.postMessage(postParams);
    }
}

/**
 * 打开相机
 * </p>
 * isCrop 是否裁剪: 0、不剪切, 1、剪切 ratio 缩放的高宽比例值，浮点类型(仅支持小数点内2位)；如：2 = 高2，宽1
 *
 * @param jsondata =
 *            {"isCrop":"0、不剪切, 1、剪切",
 *             "ratio":"缩放的高宽比例值，浮点类型；如：2 = 高2，宽1",
 *             "action":"动作：0（默认，弹窗选择），1直接打开系统相册，2直接打开拍照" }
 */
Wanxiao.prototype.openCamera = function (jsondata) {
    if (!isIphone()) {
        window.wanxiao_camera.executeBindMethod("getCameraPhoto", jsondata);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao.cameraPhotoCallBack",
            "parValue":jsondata
        };

        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.openCamera.postMessage(postParams);
    }
};

// APP回调该方法，并传入图片字节字符串的base64编码数据
// 该方法由第三方调用者覆盖。
Wanxiao.prototype.cameraPhotoCallBack = function (photoBase64Str) {

};


/**
 * 分享到...
 *
 * @param type
 *            分享类型：0 同学圈，1 微信， 2 微信朋友圈，3新浪微博，4 QQ，5 QQ空间 ，6 分享好友的扩展内容
 * @param text
 *            分享的文本
 * @imagesJson 分享的照片URL数据，json格式，[{"url":"http://..."}, {"url":"http://..."}]
 *
 * @url 点击跳转url 包括LinkCardUrl
 * @title 分享的标题
 * @bbscontent linkCard分享默认传递帖子内容 ，【type为6时为分享好友的扩展内容】
 * @shareTo 分享范围：0:公开；-1：仅同校可见；(注意，int型)
 * @linkType 0 Http跳转 1 Schema跳转
 */
Wanxiao.prototype.shareTo = function (type, text, imagesJson, url, title, bbscontent, shareTo, linkType) {
    var JsonObject = {
        "type": type,
        "text": text,
        "images": imagesJson,
        "url": url,
        "title": title,
        "bbsContent": bbscontent,
        "linkUrl": url,
        "shareTo": shareTo,
        "linkType": linkType
    };
    var params = JSON.stringify(JsonObject);
    if (!isIphone()) {
        window.wanxiao_share.executeBindMethod("shareTo", params);
    } else {

        var postJsonObject = {
            "parCallBack":"",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.shareTo.postMessage(postParams);
    }
};

/**
 * 分享图片到...
 *
 * @param shareTo
 *             分享类型： 1 微信， 2 微信朋友圈，3新浪微博，4 QQ，5 QQ空间
 * @param image
 *             分享图片信息，以http或https开头的为图片url， 或是以base64传输，客户端做兼容
 *
 * @callback 1 成功 0 失败
 */
Wanxiao.prototype.shareImage = function (shareTo, image, callback) {
    var JsonObject = {
        "shareTo": shareTo,
        "image": image,
        "callback":"wanxiao._shareImage"
    };
    var params = JSON.stringify(JsonObject);
    if (!isIphone()) {
        Wanxiao.prototype._shareImage = callback;
        window.wanxiao_shareImage.executeBindMethod("shareImage", params);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._shareImageCallback",
            "parValue":params
        };

        Wanxiao.prototype._shareImageCallback = callback;
        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.shareImage.postMessage(postParams);
    }
};

/**
 * 返回积分信息
 *
 * @param jsondata
 *            输入参数
 * @param callback
 *            通过回调函数，获得结果，如：callback = function(data){alert(data);}
 */
Wanxiao.prototype.getCredits = function (jsondata, callback) {
    if (!isIphone()) {
        callback(window.wanxiao_credits.executeBindMethod("getCredits",
                                                          jsondata));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._getCreditsCallback",
            "parValue":jsondata
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._getCreditsCallback = callback;
        window.webkit.messageHandlers.getCredits.postMessage(postParams);

    }
};

/**
 * 添加积分
 *
 * @param jsondata
 *            输入参数 sign签名针对所有参数
 *            {"sign":"5183BC22","desc":"娱乐系统消费积分","flag":"entertainmentSys","token":"3a459a5b-3dae-40a2-a942-ab27eb7758a3","grade":"5"}
 *            desc 积分描述最多25个字
 */
Wanxiao.prototype.addCredits = function (jsondata, callback) {
    if (!isIphone()) {
        callback(window.wanxiao_credits.executeBindMethod("addCredits",
                                                          jsondata));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._addCreditsCallback",
            "parValue":jsondata
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._addCreditsCallback = callback;
        window.webkit.messageHandlers.addCredits.postMessage(postParams);

    }
};

/**
 * 扣减积分
 *
 * @param jsondata
 *            输入参数
 */
Wanxiao.prototype.reduceCredits = function (jsondata, callback) {
    if (!isIphone()) {
        callback(window.wanxiao_credits.executeBindMethod("reduceCredits",
                                                          jsondata));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._reduceCreditsCallback",
            "parValue":jsondata
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._reduceCreditsCallback = callback;
        window.webkit.messageHandlers.reduceCredits.postMessage(postParams);
    }
};

/**
 * 打开聊天
 *
 * @param 聊天好友信息
 * @param toId
 *            对方Id（StuId）
 * @param fromId
 *            登录人userId
 * @sign 迎新插件调用玩校聊天功能合法性校验 接口需要(签名只针对flag)
 * @flag 插件唯一编号，玩校中对应subApp实体SN
 */
Wanxiao.prototype.openChat = function (toId, fromId, sign, flag, callback) {
    var JsonObject = {
        "toId": toId,
        "fromId": fromId,
        "sign": sign,
        "flag": flag
    };
    var params = JSON.stringify(JsonObject);
    if (!isIphone()) {
        callback(window.wanxiao_chat.executeBindMethod("getChat", params));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._openChatCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._openChatCallback = callback
        window.webkit.messageHandlers.openChat.postMessage(postParams);
    }
};
/**
 * 打开支付收银台
 *
 * @param 订单json字符串
 *
 */
Wanxiao.prototype.openPayWay = function (order_param, callback) {

    var JsonObject = {
        "order_param": order_param
    };
    var params = JSON.stringify(JsonObject);
    if (!isIphone()) {
        callback(window.wanxiao_payway.executeBindMethod("getPayWay", params));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._openPayWayCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._openPayWayCallback = callback;
        window.webkit.messageHandlers.openPayWay.postMessage(postParams);
    }
};

/**
 * 关闭当前打开的APP网页界面
 */
Wanxiao.prototype.closeAppWeb = function () {
    if (!isIphone()) {
        window.wanxiao_default.executeBindMethod("closeActivity", null);
    } else {

        var postJsonObject = {
            "parCallBack":"",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);
        window.webkit.messageHandlers.closeAppWeb.postMessage(postParams);
    }
};

/**
 * 设置menu
 *  @param jsonStr 菜单列表json字符串
 *    例如： [{"title":"百度","icon":"http://192.168.156.90/img/face.png","url":"http://www.baidu.com"},
 *        {"title":"网易","icon":"http://192.168.156.90/img/face.png","url":"http://www.163.com"},
 *            {"title":"IT之家","icon":"http://192.168.156.90/img/face.png","url":"http://www.ithome.com"},……]
 */
Wanxiao.prototype.setMenu = function (jsonStr, callback) {
    if (!isIphone()) {
        callback(window.wanxiao_menu.executeBindMethod("setMenu", jsonStr));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._setMenuCallback",
            "parValue":jsonStr
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._setMenuCallback = callback;
        window.webkit.messageHandlers.setMenu.postMessage(postParams);
    }
};

/**
 * 扫描条码
 * @param jsonStr   {"url":"http://www.baidu.com"},如果设置
 * url参数，显示手动输入入口，获取不到不显示入口
 * @param callback 结果回调函数
 */
Wanxiao.prototype.scanBarcode = function (callback,jsonStr) {


    if (!isIphone()) {

        //以4.4.0版本为分界线，做新老版本适配
        if(Version(NCPVersion(),'4.3.9'))
        {

            var postJsonObject = {
            "parCallBack":"wanxiao._scanBarcodeCallback",
            "parValue":jsonStr
        	};

        	var postParams = JSON.stringify(postJsonObject)

        	Wanxiao.prototype._scanBarcodeCallback = callback;
        	window.wanxiao_scanBarcode.executeBindMethod("scanBarcode",
            postParams);
        }
        else
        {
        	Wanxiao.prototype._scanBarcodeCallback = callback;
        	window.wanxiao_scanBarcode.executeBindMethod("scanBarcode",
            "wanxiao._scanBarcodeCallback");
        }

    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._scanBarcodeCallback",
            "parValue":jsonStr
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._scanBarcodeCallback = callback;
        window.webkit.messageHandlers.scanBarcode.postMessage(postParams);
    }
};

/**
 * 摇一摇
 * @param callback 结果回调函数
 */
Wanxiao.prototype.shake = function (callback) {
    if (!isIphone()) {
        Wanxiao.prototype._shakeCallback = callback;
        window.wanxiao_shake.executeBindMethod("shake", "wanxiao._shakeCallback");
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._shakeCallback",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._shakeCallback = callback;
        window.webkit.messageHandlers.shake.postMessage(postParams);
    }
};

/**
 * 获得坐标数据，经纬度信息
 *
 */
Wanxiao.prototype.getLocation = function (callback) {
    if (!isIphone()) {
        console.log("-----getLocaltionPosition----");
        Wanxiao.prototype._locationCallback = callback;
        window.wanxiao_Location.executeBindMethod("getLocaltionPosition",
                                                  "wanxiao._locationCallback");
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._getLocationCallback",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._getLocationCallback = callback;
        window.webkit.messageHandlers.getLocation.postMessage(postParams);
    }
};

/**
 * 第三方插件调用Command方法
 *
 */
Wanxiao.prototype.appChannel = function (method, jsonData, callback) {
    if (!isIphone()) {
        var JsonObject = {
            "command": method,
            "data": jsonData
        };
        var params = JSON.stringify(JsonObject);
        callback(window.wanxiao_command.executeBindMethod("appchannel", params));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._appChannelCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._appChannelCallback = callback;
        window.webkit.messageHandlers.appChannel.postMessage(postParams);
    }
};

/**
 * 获取用户头像 返回值：成功返回头像url,失败返回空字符串
 */
Wanxiao.prototype.getUserGravatar = function (callback) {

    wanxiao.getUserJsonValue(function (result) {
                             if (result == null || result == undefined || result == '') {
                             callback("");
                             } else {
                             var d = eval('(' + result + ')');
                             var url = "http://server.17wanxiao.com/campus/~/userPic/" + d.id;
                             callback(url);
                             }
                             });

}

/*
 * 打开图片浏览
 * @param imageUrls 图片地址json字符串
 * @param index 默认显示的图片索引
 * @param callback 回调函数，调用成功返回空字符串，否则返回错误信息
 */
Wanxiao.prototype.openImageView = function (imageUrls, index, callback) {
    var JsonObject = {
        "urls": imageUrls,
        "index": index
    };
    var params = JSON.stringify(JsonObject);

    if (!isIphone()) {
        callback(window.wanxiao_imageView.executeBindMethod("imageView", params));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._openImageViewCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._openImageViewCallback = callback;
        window.webkit.messageHandlers.openImageView.postMessage(postParams);
    }
}

/*
 * 获取网络状态
 * @param callback 回调函数，返回网络类型（大写）,未知网络返回空字符串
 */
Wanxiao.prototype.getNetworkStatus = function (callback) {
    if (!isIphone()) {
        callback(window.wanxiao_network.executeBindMethod("getNetwrokStatus", null));
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._getNetworkStatusCallback",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._getNetworkStatusCallback = callback;
        window.webkit.messageHandlers.getNetworkStatus.postMessage(postParams);
    }
}

/*
 * 选择图片（每次只能选择一张图片）
 * @param callback 回调函数，返回选择图片的base64位编码
 *
 */
Wanxiao.prototype.selectImage = function (callback) {
    if (!isIphone()) {
        Wanxiao.prototype._selectImageCallback = callback;
        window.wanxiao_selectImage.executeBindMethod("selectImage", "wanxiao._selectImageCallback");
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._selectImageCallback",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._selectImageCallback = callback;
        window.webkit.messageHandlers.selectImage.postMessage(postParams);
    }
}

/*
 * 选择图片（每次只能选择一张图片）（是否启用裁剪）
 *
 * @param jsondata =
 *            {"isCrop":"0、不剪切, 1、剪切",
 *             "ratio":"缩放的高宽比例值，浮点类型；如：2 = 高2，宽1" }
 *
 * @param callback 回调函数，返回选择图片的base64位编码
 *
 */
Wanxiao.prototype.selectImage1 = function (jsondata, callback) {
    if (!isIphone()) {
        Wanxiao.prototype._selectImage1Callback = callback;
        window.wanxiao_selectImage1.executeBindMethod("selectImage1", jsondata);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._selectImage1Callback",
            "parValue":jsondata
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._selectImage1Callback = callback;
        window.webkit.messageHandlers.selectImage1.postMessage(postParams);
    }
}

/*
 * 设置title
 * @param title 标题
 *
 */
Wanxiao.prototype.setTitle = function (title, callback) {

    var JsonObject = {
        "title": title
    };
    var params = JSON.stringify(JsonObject);

    if (!isIphone()) {
        window.wanxiao_title.executeBindMethod("setTitle", title);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._setTitleCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._setTitleCallback = callback;
        window.webkit.messageHandlers.setTitle.postMessage(postParams);

    }
}

/*
 * scheme通用回调接口
 * @param callback 回调函数，回调函数的参数格式为json
 * 回调函数数据格式   int code ：0成功,其他失败
 * 					string type：scheme地址中page参数内容
 * 					string message：消息
 *					string data：扩展字段内容为json字符串
 *
 */
Wanxiao.prototype.commonCallback = function (callback) {
    if (!isIphone()) {
        Wanxiao.prototype._commonCallback = callback;
        window.wanxiao_callback.executeBindMethod("commonCallback", "wanxiao._commonCallback");
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._commonCallback",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._commonCallback = callback;
        window.webkit.messageHandlers.commonCallback.postMessage(postParams);

    }
}

/**
 * 设置menu
 * @param jsonData  当type 为list时，右上角是下拉列表形式
 *  例如： {"data": [{"id":"1","title":"百度","icon":"http://www.baidu.com/favicon.ico"},
 *         {"id":"2","title":"网易","icon":"http://www.163.com/favicon.ico"},
 *         {"id":"3","title":"IT之家","icon":"http://www.ithome.com/favicon.ico"},……]
           "type":"list"}

 * @param callback  回调    function(id)  //点击项的id
 */
Wanxiao.prototype.setMenu1 = function(jsonData,callback){
    var params = JSON.stringify(jsonData);
    if (!isIphone()) {
        Wanxiao.prototype._setMenu1 = callback;
        window.wanxiao_menu1.executeBindMethod("setMenu1", params);
    }else{

        var postJsonObject = {
            "parCallBack":"wanxiao._setMenu1Callback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._setMenu1Callback = callback;
        window.webkit.messageHandlers.setMenu1.postMessage(postParams);
    }
}

/**
 * 显示menu
 */
Wanxiao.prototype.showMenu = function(){
    if (!isIphone()) {
        window.wanxiao_menu.executeBindMethod("showMenu",null);
    }else{


        var postJsonObject = {
            "parCallBack":"",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.showMenu.postMessage(postParams);
    }
}

/**
 * 隐藏menu
 */
Wanxiao.prototype.hideMenu = function(){
    if (!isIphone()) {
        window.wanxiao_menu.executeBindMethod("hideMenu",null);
    }else{

        var postJsonObject = {
            "parCallBack":"",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.hideMenu.postMessage(postParams);
    }
}


/**
 * 设置配置项
 * @param key key
 * @param value value
 */
Wanxiao.prototype.setConfig = function (key, value) {
    var params_obj = {"key": key, "value": value};
    var params = JSON.stringify(params_obj);
    if (!isIphone()) {
        window.wanxiao_config.executeBindMethod("setConfig", params);
    } else {

        var postJsonObject = {
            "parCallBack":"",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.setConfig.postMessage(postParams);
    }
}

/**
 * 获取配置项
 * @param key key
 * @param callback 回调
 */
Wanxiao.prototype.getConfig = function (key, callback) {
    var params_obj = {"key": key};
    var params = JSON.stringify(params_obj);
    if (!isIphone()) {
        Wanxiao.prototype._getConfig = callback;
        window.wanxiao_config.executeBindMethod("getConfig", params);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._getConfigCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._getConfigCallback = callback;
        window.webkit.messageHandlers.getConfig.postMessage(postParams);
    }
}

/**
 * 获取配置项
 * @param type 类型 1-直播  2-点播
		  data
		  access_token 房间秘钥
		  playbackID   回放Id,仅点播模式需要
 * @param callback 回调 无
 */
Wanxiao.prototype.NCPStartTalkFun = function (type,access_token,playbackID) {

    var params_obj = {"type": type,"data":{"access_token":access_token,"playbackID":playbackID}};
    var params = JSON.stringify(params_obj);

    if (isIphone()) {

        var postJsonObject = {
            "parCallBack":"",
            "parValue":params
        };
        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.NCPStartTalkFun.postMessage(postParams);
    }
}

/*
 * 获取设备信息
 * @param callback 回调函数，回调函数的参数格式为json
 * {
 *      "dev_name":"" ,	//设备名称
 *      "dev_model":"" ,	//设备型号
 *      "inner_model":"" ,	//具体型号
 *      "sim_operator":"" ,  	//运营商
 *      "imei":"", 		//IMEI iOS为UUID
 *	"mac":"",		//mac地址仅 Android
 *	"androidId":"",		//androidId仅 Android
 *  	"idfv":"", 		//IDFV 仅iOS
 *	"idfa":"",		//IDFA 仅iOS
 *	"manufacturer":"",	//手机制造商 OPPO/vivo/meizu/Apple
 *	"resolution":"",	//分辨率
 *	"dev_type":""		//设备类型，iOS 或 Android
 * 	//"dev_ip":""		//设备本机ip
 * }
 *
 */

Wanxiao.prototype.getDeviceInfo = function (callback) {
    if (!isIphone()) {
        Wanxiao.prototype._getDeviceInfo = callback;
        window.wanxiao_getDeviceInfo.executeBindMethod("getDeviceInfo", "wanxiao._getDeviceInfo");
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._getDeviceInfo",
            "parValue":""
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._getDeviceInfo = callback;
        window.webkit.messageHandlers.getDeviceInfo.postMessage(postParams);
    }
}

/**
 * 设置navbar 颜色
 * @param color navbar 背景颜色 RGB十六进制值 如：ffb82f
 * @param navbarType  light 标题和返回都用白色，normal 标题和返回 用常规的黑色和橘黄
 * @param callback 回调
 */
Wanxiao.prototype.setNavbarColor = function (color,navbarType, callback) {
    var params_obj = {"color": color,"navbarType":navbarType};
    var params = JSON.stringify(params_obj);
    if (!isIphone()) {
        Wanxiao.prototype._setNavbarColor = callback;
        window.wanxiao_navbar.executeBindMethod("setNavbarColor", params);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._setNavbarColorCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._setNavbarColorCallback = callback;
        window.webkit.messageHandlers.setNavbarColor.postMessage(postParams);
    }
}

/**
 设置虚拟键盘
 @param operationState  show 显示，hide 隐藏,clear 清空全部
 @param maxInput  只用在show时候 添加最大输入，当输入到最大位数后自动回调加密信息,如6，8 最大输入长度
 @param callback  回调 {"code":"","message":"","data":{"ranking":"","length":"","encryptContent":""}}
                     code 0  错误异常 message 提示信息
                     code 1  length 返回当前输入的个数 如 1，3，4，ranking 回调的顺序数如0，1，2，3
                     code 2  encryptContent 加密后的字符串
		     code 3  正常的 show 显示返回
		     code 4  正常的 hide 隐藏返回
 */

Wanxiao.prototype.setKeyboard = function (operationState
                                         ,maxInput, callback) {

    var params_obj = {"operationState": operationState,"maxInput":maxInput};

    var params = JSON.stringify(params_obj);

    if (!isIphone()) {

        Wanxiao.prototype._setKeyboard = callback;

        window.wanxiao_setKeyboard.executeBindMethod("setKeyboard", params);

    } else {

        var postJsonObject = {

            "parCallBack":"wanxiao._setKeyboardCallback",

            "parValue":params

        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._setKeyboardCallback = callback;

        window.webkit.messageHandlers.setKeyboard.postMessage(postParams);

    }
}

/**
 * 打开新的webview
 * @param url  1、需要打开的url地址
 	       2、或是完美校园内部scheme地址

 * @param type  入参
    'slide'侧滑
 		'pop' 底部弹出
    '' pop是缺省状态

 * @param NCPNavBarState  入参
       'show'   显示导航栏
    	 'hide'   表示导航栏隐藏
       ''缺省是显示导航栏
 */
Wanxiao.prototype.openNewWebview = function (url,type,NCPNavBarState) {
    var params_obj = {"url": url,"type":type,"NCPNavBarState":NCPNavBarState};
    var params = JSON.stringify(params_obj);
    if (!isIphone()) {
        //Wanxiao.prototype._setNavbarColor = callback;
        window.wanxiao_openNewWebview.executeBindMethod("openNewWebview", params);
    } else {

        var postJsonObject = {
            "parCallBack":"",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        //Wanxiao.prototype._setNavbarColorCallback = callback;
        window.webkit.messageHandlers.openNewWebview.postMessage(postParams);
    }
}

/**
 * 事件管理方法
 * @param eventTag  事件标志区分
 *                  'updateEcardInfo'  更新卡信息
 *                  'updateEncryptedEcardInfo' 统一身份绑卡信息保存
 *                  'openBOCReceiptCode'打开中行收款码
 *                  'openBOCPaymentCode'打开中行付款码
 *
 * @param dataInfo  {} 预留json格式参数
                    'updateEncryptedEcardInfo' 存储卡信息相关json
                    //user是完美校园key的DES加密数据
                    {"result_":true,"message_":"成功","user":"k6AbwiJbOqH...mXW1I=","code_":0}
 *
 * @param callback  回调 成功{"code":"SUCCESS","message":""}
                            {"code":"ERROR","message":"失败原因"}
 */
Wanxiao.prototype.eventDriven = function (eventTag,dataInfo,callback) {
   var JsonObject = {
        "eventTag": eventTag,
        "dataInfo": dataInfo,
        "callback": "wanxiao._eventDriven"
    };
    var params = JSON.stringify(JsonObject);

    if (!isIphone()) {
        Wanxiao.prototype._eventDriven = callback;
        window.wanxiao_eventDriven.executeBindMethod("eventDriven", params);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._eventDrivenCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._eventDrivenCallback = callback;
        window.webkit.messageHandlers.eventDriven.postMessage(postParams);
    }
}

/**
 * 保存图片信息
 *
 * @param dataInfo  图片base64信息/图片url地址
 *
 * @param callback  回调 成功{"code":"SUCCESS","message":""}
                            {"code":"ERROR","message":"失败原因"}
 */
Wanxiao.prototype.saveImgInfo = function (dataInfo,callback) {
   var JsonObject = {
        "dataInfo": dataInfo,
        "callback": "wanxiao._saveImgInfo"
    };
    var params = JSON.stringify(JsonObject);

    Wanxiao.prototype._saveImgInfo = callback;

    if (!isIphone()) {
        window.wanxiao_saveImgInfo.executeBindMethod("saveImgInfo", params);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._saveImgInfo",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        window.webkit.messageHandlers.saveImgInfo.postMessage(postParams);
    }
}

/**
 * 录音管理方法
 * @param  recordEventTag  录音事件标志区分
 *                         'startRecording'     开始录音
 *                         'stopRecording'      停止录音
 *                         'uploadRecording'    上传录音
 *                         'playRecording'      播放录音
 *                         'stopPlayRecording'  停止播放录音
 *
 * @param dataInfo  {} 预留json格式参数，不同状态时入参不同
 *                         'startRecording'     开始录音
 *                          {"overtime":30}     overtime 超时时间，单位秒，缺省值60秒 ,最大录音时间300秒
 *
 *                         'stopRecording'      停止录音
 *                          无入参
 *
 *                         'uploadRecording'    上传录音
 *                          {"localFileID":""}     localFileID 本地录音地址
 *
 *                         'playRecording'      播放录音
 *                          {"localFileID":""}     localFileID 本地录音地址
 *
 *                         'stopPlayRecording'  停止播放录音
 *                           {"localFileID":""}     localFileID 本地录音地址
 *
 * @param callback  回调   不同事件下不同返回

 *                         'startRecording'     开始录音
 *                              成功{"recordEventTag":"startRecording","code":"SUCCESS","message":"","localFileID":""}
 *                                     code SUCCESS 正常按照入参时间返回
 *				超时{"recordEventTag":"startRecording","code":"OVERTIME","message":"","localFileID":""}
 *                                     code OVERTIME 超时返回   localFileID本地录音文件地址
 *                              失败{"recordEventTag":"startRecording","code":"ERROR","message":"失败原因"}
 *
 *                         'stopRecording'      停止录音
 *                              成功{"recordEventTag":"stopRecording","code":"SUCCESS","message":"","localFileID":""}
 *                                     code SUCCESS 正常按照入参时间返回
 *                                  localFileID本地成功录音后的录音本地id
 *                              失败{"recordEventTag":"stopRecording","code":"ERROR","message":"失败原因"}
 *
 *                         'uploadRecording'    上传录音
 *                              成功{"recordEventTag":"uploadRecording","code":"SUCCESS","message":"","serrecordingURL":""}
 *                                     code SUCCESS 正常按照入参时间返回
 *                                    serrecordingURL服务端录音url地址
 *                              失败{"recordEventTag":"uploadRecording","code":"ERROR","message":"失败原因"}
 *
 *                         'playRecording'      播放录音
 *                              成功{"recordEventTag":"playRecording","code":"SUCCESS","message":""}
 *                                     code SUCCESS 正常按照入参时间返回
 *                                     code  "PLAYSUCCESS"  本地录音播放完成，返回
 *
 *                              失败{"recordEventTag":"playRecording","code":"ERROR","message":"失败原因"}
 *
 *                         'stopPlayRecording'  停止播放录音
 *                          无返回


 */
Wanxiao.prototype.recordEventDriven = function (recordEventTag,dataInfo,callback) {
   var JsonObject = {
        "recordEventTag": recordEventTag,
        "dataInfo": dataInfo,
        "callback": "wanxiao._recordEventDriven"
    };
    var params = JSON.stringify(JsonObject);

    if (!isIphone()) {
        Wanxiao.prototype._recordEventDriven = callback;
        window.wanxiao_recordEventDriven.executeBindMethod("recordEventDriven", params);
    } else {

        var postJsonObject = {
            "parCallBack":"wanxiao._recordEventDrivenCallback",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

        Wanxiao.prototype._recordEventDrivenCallback = callback;
        window.webkit.messageHandlers.recordEventDriven.postMessage(postParams);
    }
}

var wanxiao = new Wanxiao();

/*
 * 智能机浏览器版本信息:
 *
 */
var browser = {
versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {// 移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/)
        || !!u.match(/AppleWebKit/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') == -1,
    // 是否web应该程序，没有头部与底部
    wanxiao:u.match(/Wanxiao\/([\d\.]+)/i)?u.match(/Wanxiao\/([\d\.]+)/i):'0.0.0'
    };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

function isIphone() {
    if (browser.versions.ios || browser.versions.iPhone
                       || browser.versions.iPad) {
        return true;
        } else {
        return false;
      }
}

//获取UA中完美校园版本
function NCPVersion()
{
    return browser.versions.wanxiao[1];
}

/*
 * JavaScript实现版本号比较
* 传入两个字符串，当前版本号：curV；比较版本号：reqV
* 调用方法举例：Version('5.12.3','5.12.2')，将返回true
*/

//Version('5.12.3','5.12.2')

function Version(curV,reqV){

	var arr1=curV.split('.');
    var arr2=reqV.split('.');
    //将两个版本号拆成数字
    var minL= Math.min(arr1.length,arr2.length);
    var pos=0;        //当前比较位
    var diff=0;        //当前为位比较是否相等

    //逐个比较如果当前位相等则继续比较下一位
    while(pos<minL){
       diff=parseInt(arr1[pos])-parseInt(arr2[pos]);
       if(diff!=0){
            break;
       }
            pos++;
       }

       if (diff>0) {
           //console.log('新版本')
           return true;
       }else if (diff==0) {
           // console.log('稳定版')
           return false;
       }else{
           //console.log('旧版本')
           return false;
       }
}

/** 日历方法
 * 
 * @param  remindEventIdentifier string 事件标记 当前事件唯一标记
 * 
 * @param  eventAction 操作类型（增删改）
 *                     '1'     增加，更新-修改                 
 *                     '0'     删除
 * 
 * @param  eventForward 提前多少分钟提醒 (int) 1,2,3
 *                     
 * 
 * @param  eventArray 事件集合
 *                   [] 
                    预留json格式参数
                    'title'         标题
                    'location'      位置
                    'startDateStr'  开始时间  时间戳毫秒
                    'endDateStr'    结束时间  时间戳毫秒
                    'note'          备注信息
                    注意：事件集合为空

 * 
 * @param  callback  回调 成功{"code":"SUCCESS","message":""}
                            {"code":"ERROR","message":"失败原因"}
 */
/*Wanxiao.prototype.setRemindCalendar = function(remindEventIdentifier,eventAction,eventForward,eventArray,callback){

    var JsonObject = {
        'remindEventIdentifier': remindEventIdentifier,
        'eventAction' : eventAction,
        'eventForward' : eventForward,
        'eventArray' : eventArray
    };

    var params = JSON.stringify(JsonObject);

    if (!isIphone()) {
        Wanxiao.prototype._setRemindCalendar = callback;
        window._setRemindCalendar.executeBindMethod("setRemindCalendar",params);
    }
    else{
        var postJsonObject = {
            "parCallBack":"wanxiao._setRemindCalendar",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);

    Wanxiao.prototype._setRemindCalendarCallBack = callback;
    window.webkit.messageHandlers.setRemindCalendar.postMessage(postParams);
    }
}*/


/** 日历方法
 * 
 * @param  remindEventArray 提醒事件集合
 *                          []
 * 
 *                 remindEventIdentifier string 事件标记 当前事件唯一标记
 *                 eventAction 操作类型（增删改）
 *                     '1'     增加，更新-修改                 
 *                     '0'     删除
 *                 eventForward  提前多少分钟提醒 (int) 1,2,3
 *                 eventArray 事件集合
 *                   [] 
                    预留json格式参数
                    'title'         标题
                    'location'      位置
                    'startDateStr'  开始时间  时间戳毫秒
                    'endDateStr'    结束时间  时间戳毫秒
                    'note'          备注信息
                    注意：事件集合为空         
 * 
 * @param  callback  回调 成功{"code":"SUCCESS","message":""}
                            {"code":"ERROR","message":"失败原因"}
 */
Wanxiao.prototype.setRemindCalendar = function(remindEventArray,callback){

    var paramsArray = JSON.stringify(remindEventArray);

    if (!isIphone()) {
        
        var JsonObject = {
            "dataInfo": paramsArray,
            "callback": "wanxiao._setRemindCalendar"
        };
        var params = JSON.stringify(JsonObject);

        Wanxiao.prototype._setRemindCalendar = callback;
        window._setRemindCalendar.executeBindMethod("setRemindCalendar",params);
    }
    else{
        var postJsonObject = {
            "parCallBack":"wanxiao._setRemindCalendar",
            "parValue":paramsArray
        };

        var postParams = JSON.stringify(postJsonObject);

    Wanxiao.prototype._setRemindCalendar = callback;
    window.webkit.messageHandlers.setRemindCalendar.postMessage(postParams);
    }
}

/**  分享原生组件方法
 * 
 * @param  shareComponentType string 分享组件 1-分享弹框 2-分享截屏
 * 
 * @param  shareContentType string 分享内容  2-分享链接 3-分享图片
 * 
 * @param  shareChannel    array  分享渠道  （只有分享弹框样式才有用，传空或者空数组为默认全渠道）
 *                     
 * 
 * @param  shareInfo  分享内容对象
 *                   //不同内容可能所取字段不同
             { shareTitle     :  分享title 不传有默认
               shareBody      :  分享描述
               shareWebURL    :  分享链接  不传下载页
               shareImagURL   :  分享图片的URL  不传有默认
               shareImageData :  分享图片图片数据 Base64Str
               shareQRURL     :  所生成二维码链接
              }

 * 
 * @param  callback  回调 成功{"code":"SUCCESS","message":""}
                            {"code":"ERROR","message":"失败原因"}
 */

Wanxiao.prototype.shareComponent = function(shareComponentType,shareContentType,shareChannel,shareInfo,callback){

    var JsonObject = {
        'shareComponentType': shareComponentType,
        'shareContentType' : shareContentType,
        'shareChannel' : shareChannel,
        'shareInfo' : shareInfo
    };

    var params = JSON.stringify(JsonObject);

    if(!isIphone())
    {
        var paramsObj = {
            "dataInfo": params,
            "callback": "wanxiao._getScreenShotPage",
        };

        var paramstr = JSON.stringify(paramsObj);
        Wanxiao.prototype._shareComponent = callback;
        window._shareComponent.executeBindMethod("shareComponent",paramstr);
    }
    else
    {
        var postJsonObject = {
            "parCallBack":"wanxiao._shareComponent",
            "parValue":params
        };

        var postParams = JSON.stringify(postJsonObject);
        Wanxiao.prototype._shareComponent = callback;
        window.webkit.messageHandlers.shareComponent.postMessage(postParams);
    }
}

/** 截屏方法
 *               
 * 返回 base64Str
 * 
 * @param  callback  
 */
Wanxiao.prototype.getScreenShotPage = function(callback){

    Wanxiao.prototype._getScreenShotPage = callback;

    if(!isIphone())
    {
        var JsonObject = {
            "callback": "wanxiao._getScreenShotPage"
        };
        var params = JSON.stringify(JsonObject)
        window._getScreenShotPage.executeBindMethod("getScreenShotPage",params);
    }
    else
    {
        var postJsonObject = {
            "parCallBack":"wanxiao._getScreenShotPage",
        };
        var postParams = JSON.stringify(postJsonObject);
        window.webkit.messageHandlers.getScreenShotPage.postMessage(postParams);
    }
}

