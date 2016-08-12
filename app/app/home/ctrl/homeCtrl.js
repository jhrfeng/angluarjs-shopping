angular.module('app').controller('homeCtrl', ['$rootScope', '$scope', '$http', '$location', '$interval', '$timeout', '$ocLazyLoad', '$ionicPlatform', '$ionicScrollDelegate', '$ionicModal', '$ionicPopup', '$ionicSlideBoxDelegate', '$cordovaFileTransfer', '$cordovaNetwork', '$cordovaGeolocation', 'homeHandler', function($rootScope, $scope, $http, $location, $interval, $timeout, $ocLazyLoad, $ionicPlatform, $ionicScrollDelegate, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $cordovaFileTransfer, $cordovaNetwork, $cordovaGeolocation, homeHandler) {
    (function init() {
        $scope.vo = {};
        $scope.vc = {};
        $scope.vo.menuData = ["icon_policy.png", "icon_question.png", "icon_mobile.png", "icon_financing.png", "icon_product.png", "icon_life.png", "icon_health.png", "icon_msg.png"];
        $rootScope.menu = 'home';
    })();

    $scope.vc.onHomeScroll = function(event) {
        var scrollTop = $ionicScrollDelegate.$getByHandle('homeScroll').getScrollPosition().top;
        if (scrollTop > 100) {
            $scope.showHeader = true;
        } else {
            $scope.showHeader = false;
        }
        $scope.$evalAsync();
    };

    $scope.vc.changeCity = function() {
        if ($scope.vo.cityModal) {
            $scope.vo.cityModal.show();
        } else {
            $ionicModal.fromTemplateUrl('changeCity.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.vo.cityModal = modal;
                $scope.vo.cityModal.show();
                $timeout(function() {
                    $scope.vo.aliasList = ['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ];
                    homeHandler.getCityList(function(data) {
                        $scope.vo.hotCityList = data.hot;
                        $scope.vo.cityList = data.city;
                    });
                    $scope.vo.aliasToast = false;
                    var toastTimer;
                    $scope.vc.selectAlias = function(event, index, ext) {
                        var y = event.gesture.deltaY + ext;
                        var rangeIndex = index == 0 ? 0 : parseInt(y / 13) + index;
                        if (rangeIndex < 0) {
                            rangeIndex = 0;
                        }
                        $scope.vo.alias = $scope.vo.aliasList[rangeIndex];
                        $scope.vo.aliasToast = true;
                        $location.hash($scope.vo.alias);
                        $ionicScrollDelegate.$getByHandle('city').anchorScroll();
                        $timeout.cancel(toastTimer);
                        toastTimer = $timeout(function() {
                            $scope.vo.aliasToast = false;
                        }, 2000);
                    };

                    $scope.vc.setCity = function(city) {
                        $scope.vo.city = city;
                        localStorage.setItem('city', city);
                        $ionicScrollDelegate.$getByHandle('city').scrollTop();
                    };

                    var posOptions = { timeout: 5000, enableHighAccuracy: false };
                    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
                        var positionInterval = $interval(function() {
                            var BMap = document.getElementById('baiduIframe').contentWindow.BMap;
                            if (BMap) {
                                var map = new BMap.Map("allmap");
                                var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
                                var gc = new BMap.Geocoder();
                                gc.getLocation(point, function(rs) {
                                    var addComp = rs.addressComponents;
                                    var city = addComp.city.replace('市', '');
                                    if ($scope.vo.city && $scope.vo.city != city) {
                                        var confirmPopup = $ionicPopup.confirm({
                                            title: '切换城市',
                                            template: '当前城市与定位不符，是否切换？',
                                            okText: '切换',
                                            cancelText: '取消'
                                        }).then(function(res) {
                                            if (res) {
                                                $scope.vc.setCity(city);
                                            } else {
                                                console.log('You are not sure');
                                            }
                                        });
                                    }
                                });
                                $interval.cancel(positionInterval);
                            }
                        }, 500);
                    }, function(err) {
                        console.log(err);
                    });
                }, 500);
            });
        }
    };

    $scope.vc.testLogin = function() {
        var loginParams = {
            packageList: {
                packages: {
                    header: {
                        "requestType": "LOGIN",
                        "comId": "KF20160707",
                        "from": "PAD",
                        "sendTime": "2016-02-29 09:54:26",
                        "orderSerial": "comSerial",
                        "productCode": ""
                    },
                    request: {
                        "customer": {
                            "agentCode": "1010000000072",
                            "deviceNo": "A1000038B0DFD99",
                            "fromChannel": "IOS",
                            "loginPwd": "f88cd7afc548e17b94bbdd0edc340291"
                        }
                    }
                }
            }
        };

        var jsonStr = JSON.stringify(loginParams);
        $http.post('http://192.168.1.173:8082/com.ifp.ipartner/interfaceChannel?sign=79e638fb978386ebac90f1fc24196925&com_id=KF20160707', 'data=' + jsonStr, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            console.log(data);
        });
    };

    function initSlideImg() {
        var slides = localStorage.getItem('slides');
        console.log(slides);
        if (slides) {
            slides = angular.fromJson(slides);
            $scope.vo.slides = slides;
        } else {
            slides = [];
            $scope.vo.slides = [{ lbpicNum: 1, lbpicUrl: 'img/home/slide1.png' }, { lbpicNum: 2, lbpicUrl: 'img/home/slide1.png' }, { lbpicNum: 3, lbpicUrl: 'img/home/slide1.png' }];
        }

        var menuList = localStorage.getItem('menuPic');
        if (menuList) {
            menuList = angular.fromJson(menuList);
            $scope.vo.menuList = menuList;

        } else {
            menuList = [];
            $http({
                cache: false,
                method: 'GET',
                url: 'app/home/data/mune.json',
            }).then(function(resp) {
                $scope.vo.menuList = resp.data;
                localStorage.setItem('menuPic', JSON.stringify($scope.vo.menuList));
            });
        }
        // 延迟5秒后更新轮播图
        $timeout(function() {
            if (ionic.Platform.device().platform && $cordovaNetwork.isOnline()) {
                homeHandler.getLBPicture(function(data) {
                    // sildeTake(data, slides); // 处理轮播图
                    // menuPicTake(data); // 处理菜单图标

                }, function(err) {

                });
            }
        }, 5000);
    };
    var sildeTake = function(data, slides) {
        var images = data.packageList.packages.response.lbpiclist;

        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            var imageUrl = image.lbpicUrl;
            var index = parseInt(image.lbpicNum, 10) - 1;
            var filename = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
            (function(i, index, imageUrl, filename, slides, images) {
                if (slides[index]) {
                    images[i] = slides[index];
                }
                if (!slides[index] || slides[index] && imageUrl.substr(imageUrl.lastIndexOf('/')) != slides[index].lbpicUrl.substr(slides[index].lbpicUrl.lastIndexOf('/'))) {
                    var path;
                    if (navigator.platform == 'iPhone' || navigator.platform == 'iPad') {
                        path = cordova.file.documentsDirectory;
                    } else {
                        path = cordova.file.externalDataDirectory;
                    }
                    var target = path + 'images/home/' + filename;
                    $cordovaFileTransfer.download(imageUrl, target, {}, true).then(function(result) {
                        images[i].lbpicUrl = target;
                        localStorage.setItem('slides', JSON.stringify(images));
                        $scope.vo.slides = images;
                        $ionicSlideBoxDelegate.update();
                        console.log(JSON.stringify($scope.vo.slides));
                    }, function(err) {
                        console.log(err);
                    }, function(progress) {
                        console.log('download slide image' + index);
                    });
                } else {
                    //已缓存图片无需更新图片
                    if (i == images.length - 1) {
                        console.log(JSON.stringify(images));
                        $scope.vo.slides = images;
                        $ionicSlideBoxDelegate.update();
                    }
                }
            }(i, index, imageUrl, filename, slides, images));
        }

    };
    var menuPicTake = function(data) {
        var images = data.packageList.packages.response.funMenulist;
        for (var i = 0; i < images.length; i++) {
            var menu = images[i];
            (function(menus) {
                if (menus.modular == "1") {
                    var Num = Number(menus.funMenuNum);
                    if (menus.updateTime !== $scope.vo.menuList[Num - 1].updateTime) {
                        var path;
                        if (navigator.platform == 'iPhone' || navigator.platform == 'iPad') {
                            path = cordova.file.documentsDirectory;
                        } else {
                            path = cordova.file.externalDataDirectory;
                        }
                        var imageUrl = menus.picUrl;
                        var target = path + 'images/home/menu/' + $scope.vo.menuData[Num - 1];
                        $cordovaFileTransfer.download(imageUrl, target, {}, true).then(function(result) {
                            $scope.vo.menuList[Num - 1].picUrl = target;
                            $scope.vo.menuList[Num - 1].updateTime = menus.updateTime;
                            localStorage.setItem('menuPic', JSON.stringify($scope.vo.menuList));
                        }, function(err) {
                            console.log(err);
                        }, function(progress) {
                            console.log('download pic image' + Num);
                            $scope.vo.menuList[Num - 1].picUrl = target;
                            $scope.vo, menuList[Num - 1].updateTime = menu.updateTime;

                        });
                    }
                }
            }(menu));
        }
        localStorage.setItem('menuPic', JSON.stringify($scope.vo.menuList));
    };

    function initLock() {
        if (!$rootScope.unlocked && localStorage.getItem('passwordxx')) {
            $rootScope.go('kf.login.lock');
        }
    }

    (function initProcess() {
        // initLock();
        $scope.vo.city = localStorage.getItem('city');
        initSlideImg();
        // $scope.vc.testLogin();
    })();
}]);
