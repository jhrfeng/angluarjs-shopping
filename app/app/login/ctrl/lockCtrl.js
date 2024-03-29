angular.module("app").controller("lockCtrl", ['$scope', '$rootScope', '$cordovaToast', function($scope, $rootScope, $cordovaToast) {

    (function() {
        $scope.vo = {
            hasHeader:false
        };
        if(!localStorage.getItem('passwordxx')){
            if($rootScope.settingLock){
                $scope.vo.hasHeader = true;
                $scope.title = "修改手势密码";
            } else {
                // $rootScope.settingLock = true;
                $rootScope.go('kf.home.index');
                return;
            }
        }


        window.H5lock = function(obj) {
            this.height = obj.height;
            this.width = obj.width;
            this.chooseType = Number(localStorage.getItem('chooseType')) || obj.chooseType;
        };

        function getDis(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        };

        H5lock.prototype.pickPoints = function(fromPt, toPt) {
            var lineLength = getDis(fromPt, toPt);
            var dir = toPt.index > fromPt.index ? 1 : -1;

            var len = this.restPoint.length;
            var i = dir === 1 ? 0 : (len - 1);
            var limit = dir === 1 ? len : -1;

            while (i !== limit) {
                var pt = this.restPoint[i];

                if (getDis(pt, fromPt) + getDis(pt, toPt) === lineLength) {
                    this.drawPoint(pt.x, pt.y);
                    this.lastPoint.push(pt);
                    this.restPoint.splice(i, 1);
                    if (limit > 0) {
                        i--;
                        limit--;
                    }
                }

                i += dir;
            }
        }

        H5lock.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
            this.ctx.strokeStyle = 'rgb(251,128,64)';//'#CFE6FF';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        H5lock.prototype.drawPoint = function() { // 初始化圆心
            for (var i = 0; i < this.lastPoint.length; i++) {
                this.ctx.fillStyle = 'rgb(251,128,64)';//'#CFE6FF';
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
        H5lock.prototype.drawStatusPoint = function(type) { // 初始化状态线条

            for (var i = 0; i < this.lastPoint.length; i++) {
                this.ctx.strokeStyle = type;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
        H5lock.prototype.drawLine = function(po, lastPoint) { // 解锁轨迹
            this.ctx.beginPath();
            this.ctx.lineWidth = 3;
            this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
            console.log(this.lastPoint.length);
            for (var i = 1; i < this.lastPoint.length; i++) {
                this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            }
            this.ctx.lineTo(po.x, po.y);
            this.ctx.stroke();
            this.ctx.closePath();

        }
        H5lock.prototype.createCircle = function() { // 创建解锁点的坐标，根据canvas的大小来平均分配半径

            var n = this.chooseType;
            var count = 0;
            this.r = this.ctx.canvas.width / (2 + 4 * n); // 公式计算
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    count++;
                    var obj = {
                        x: j * 4 * r + 3 * r,
                        y: i * 4 * r + 3 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            for (var i = 0; i < this.arr.length; i++) {
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
            //return arr;
        }
        H5lock.prototype.getPosition = function(e) { // 获取touch点相对于canvas的坐标
            var rect = e.currentTarget.getBoundingClientRect();
            var po = {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
            return po;
        }
        H5lock.prototype.update = function(po) { // 核心变换方法在touchmove时候调用
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            for (var i = 0; i < this.arr.length; i++) { // 每帧先把面板画出来
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }

            this.drawPoint(this.lastPoint); // 每帧花轨迹
            this.drawLine(po, this.lastPoint); // 每帧画圆心

            for (var i = 0; i < this.restPoint.length; i++) {
                var pt = this.restPoint[i];

                if (Math.abs(po.x - pt.x) < this.r && Math.abs(po.y - pt.y) < this.r) {
                    this.drawPoint(pt.x, pt.y);
                    this.pickPoints(this.lastPoint[this.lastPoint.length - 1], pt);
                    break;
                }
            }

        }
        H5lock.prototype.checkPass = function(psw1, psw2) { // 检测密码
            var p1 = '',
                p2 = '';
            for (var i = 0; i < psw1.length; i++) {
                p1 += psw1[i].index + psw1[i].index;
            }
            for (var i = 0; i < psw2.length; i++) {
                p2 += psw2[i].index + psw2[i].index;
            }
            return p1 === p2;
        }
        H5lock.prototype.storePass = function(psw) { // touchend结束之后对密码和状态的处理
            if (this.pswObj.step == 1) {
                if (this.checkPass(this.pswObj.fpassword, psw)) {
                    this.pswObj.step = 2;
                    this.pswObj.spassword = psw;
                    document.getElementById('title').innerHTML = '密码保存成功';
                    // $cordovaToast.showShortTop("密码保存成功");
                    this.drawStatusPoint('#2CFF26');
                    localStorage.setItem('passwordxx', JSON.stringify(this.pswObj.spassword));
                    localStorage.setItem('chooseType', this.chooseType);
                        $rootScope.settingLock = false;
                    $rootScope.go('-1');
                } else {
                    document.getElementById('title').innerHTML = '两次不一致，重新输入';
                    this.drawStatusPoint('red');
                    delete this.pswObj.step;
                }
            } else if (this.pswObj.step == 2) {
                if (this.checkPass(this.pswObj.spassword, psw)) {
                    document.getElementById('title').innerHTML = '解锁成功';
                    this.drawStatusPoint('#2CFF26');
                    if(!$rootScope.unlocked){
                        $rootScope.unlocked = true;
                        $rootScope.go('kf.home.index');
                        // $rootScope.go('kf.home.index');
                    } else if($rootScope.settingLock){
                        $scope.vo.unlocked = true;
                        this.updatePassword();
                    } else {
                        $rootScope.settingLock = false;
                        $rootScope.go('-1');
                    }
                } else {
                    this.drawStatusPoint('red');
                    document.getElementById('title').innerHTML = '解锁失败';
                }
            } else if(psw.length < 4){
                this.drawStatusPoint('red');
                $('#notice').text("手势设置至少链接四个点");
                console.log("手势设置至少链接四个点");
                return;
            } else {
                this.pswObj.step = 1;
                this.pswObj.fpassword = psw;
                document.getElementById('title').innerHTML = '再次输入';
            }

        }
        H5lock.prototype.makeState = function() {
            if (this.pswObj.step == 2) {
                document.getElementById('updatePassword').style.display = 'block';
                //document.getElementById('chooseType').style.display = 'none';
                document.getElementById('title').innerHTML = '请解锁';

                if($rootScope.settingLock){
                    $scope.vo.hasHeader = true;
                    $('#title').text("验证旧密码");
                }
            } else if (this.pswObj.step == 1) {
                //document.getElementById('chooseType').style.display = 'none';
                document.getElementById('updatePassword').style.display = 'none';
            } else {
                document.getElementById('updatePassword').style.display = 'none';
                //document.getElementById('chooseType').style.display = 'block';
            }
        }
        H5lock.prototype.setChooseType = function(type) {
            chooseType = type;
            init();
        }
        H5lock.prototype.updatePassword = function() {
            this.pswObj = {};
            document.getElementById('title').innerHTML = '绘制新解锁图案';
            this.reset();
            if(!$scope.vo.unlocked){
                localStorage.removeItem('passwordxx');
                localStorage.removeItem('chooseType');
                $rootScope.user = undefined;
                        // $rootScope.settingLock = false;
                $rootScope.go('kf.login.index');//重置手势密码需重新登录 2016-08-03
            }
        }
        //origin #305066
        H5lock.prototype.initDom = function() {
            var wrap = document.createElement('div');
            var str = '<h4 id="title" class="title">绘制解锁图案</h4>' + '<h6 id="notice" class="notice">&nbsp;</h6>' +
                '<a id="updatePassword" style="position: absolute;right: 5px;top: 5px;color:rgb(251,128,64);font-size: 10px;display:none;">重置手势</a>' +
                '<canvas id="canvas" width="300" height="300" style="background-color: rgb(244,244,244);display: inline-block;margin-top: 5px;"></canvas>';
            wrap.setAttribute('style', 'position: absolute;top:0;left:0;right:0;bottom:0;');
            wrap.innerHTML = str;
            // document.body.appendChild(wrap);
            $('#lock-content').append(wrap);
        }
        H5lock.prototype.init = function() {
            this.initDom();
            this.pswObj = localStorage.getItem('passwordxx') ? {
                step: 2,
                spassword: JSON.parse(localStorage.getItem('passwordxx'))
            } : {};
            this.lastPoint = [];
            this.makeState();
            this.touchFlag = false;
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.createCircle();
            this.bindEvent();
            $('#notice').text("  ");
        }
        H5lock.prototype.reset = function() {
            this.makeState();
            this.createCircle();
        }
        H5lock.prototype.bindEvent = function() {
            var self = this;
            this.canvas.addEventListener("touchstart", function(e) {
                e.preventDefault(); // 某些android 的 touchmove不宜触发 所以增加此行代码
                $('#notice').text("");
                var po = self.getPosition(e);
                console.log("touchstart" + po);
                for (var i = 0; i < self.arr.length; i++) {
                    if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {

                        self.touchFlag = true;
                        self.drawPoint(self.arr[i].x, self.arr[i].y);
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i, 1);
                        break;
                    }
                }
            }, false);
            this.canvas.addEventListener("touchmove", function(e) {
                console.log("touchmove" + e);
                if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
            }, false);
            this.canvas.addEventListener("touchend", function(e) {
                console.log("touchend" + e);
                if (self.touchFlag) {
                    self.touchFlag = false;
                    self.storePass(self.lastPoint);
                    setTimeout(function() {

                        self.reset();
                    }, 300);
                }


            }, false);
            // document.addEventListener('touchmove', function(e) {
            //     e.preventDefault();
            // }, false);
            document.getElementById('updatePassword').addEventListener('click', function() {
                self.updatePassword();
            });
        }
        new H5lock({
            chooseType: 3
        }).init();
    })();

}])
