(function($, document, window, viewport){
  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
      });
    };
  }

  function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
  }

  $(function(){
    var quotes = [
        "그 날이 오면은.^2000<br> 삼각산이 일어나^400 더덩실^400 춤이라도 추고.^2000",
        "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ^400 - 해충^2000",
        "이것 또한 무스비.^2000",
        "군대가면 나오지 않을테야.^400 - 말리꽃^2000",
        "누누이 말했지만^400 빠른 군대가 답이다.^400 - 말리꽃^2000",
        "답은^400 군대다.^400 - 곡재^2000",
        "헥사도다들군대보내야함.^400 - 곡재^2000",
        "한충우를군대로.^400 - 곡재^2000",
        "대학원ㄴㄴ^400 군대ㅇㅋ.^400 - 곡재^2000",
        "휴^600 군대가는줄.^400 - 츤기^2000",
        "저는 진작에 접어야할듯^400 군대각^400 - 츤기^2000",
    ];
    shuffle(quotes);
    quotes.unshift("기억해요, 레드.^1000 희망은^400 좋은 거에요.^2000");
    quotes.push("기억해요, 레드.^1000 희망은^400 좋은 거에요.^2000");

    $(".typed").typed({
      strings: quotes,
      typeSpeed: 80,
      backSpeed: 20,
      showCursor: true,
    });
  });

  var app = angular.module("wegoon", ['ui.bootstrap']);

  function Slave(item) {
    this.name = item[2];
    this.startDate = moment(item[0], 'YYYY.MM.DD');
    this.endDate = this.startDate.clone().add(item[1], 'months');
  };

  app.controller('wegoonCtrl', function($scope, $timeout) {
    $scope.moment = moment;

    var data = [
      ['2015.10.22', 34, '겨태'],
      ['2017.02.22', 34, '곡재'],
      ['2017.04.03', 21, '웅자'],
      ['2018.02.22', 34, '말리꽃'],
      ['2018.02.01', 21, '조잼'],
      ['2018.01.01', 21, '도갱'],
      ['2018.01.01', 21, '유잉'],
      ['2018.01.01', 21, '환자'],
      ['2018.01.01', 21, '츤기'],
      ['2018.01.01', 21, '균'],
      ['2018.01.01', 21, '호떡'],
      ['2018.01.01', 21, '규1'],
      ['2018.01.01', 34, '오'],
      ['1992.11.08', 0, '해충'],
      ['1992.11.08', 0, '고갱'],
      ['1992.11.08', 21, '규2'],
    ];

      $scope.slaves = _.map(data, function(item) {
        return new Slave(item);
      });

      $scope.now = moment();
      function updateDurations() {
        $scope.now = moment();
        $timeout(updateDurations, 100, true);
      };
      updateDurations();  

      $scope.diff = function(src, dst) {
        var diff = moment.duration(src.diff(dst));
        if( viewport.is('xs') ) {
          var text = "{0}일 {1}분 {2}초".format(
              Math.floor(diff.asDays()), diff.minutes(), diff.seconds());
        } else {
          var text = "{0}일 {1}시간 {2}분 {3}초 {4}".format(
              Math.floor(diff.asDays()), diff.hours(), diff.minutes(), diff.seconds(), diff.milliseconds());
        }
        return text;
      }

      $scope.getFormattedDate = function(date) {
        if( viewport.is('xs') ) {
          var text = date.format('L');
        } else {
          var text = date.format('LL');
        }
        return text;
      }

      $scope.slavePercentage = function(slave) {
        var percent = ($scope.now - slave.startDate) / (slave.endDate - slave.startDate) * 100;
        var num = Math.max(Math.min(percent, 100), 0);
      
        if (num == 0 || num == 100) {
          num = Math.ceil(num);
        } else {
          num = num.toFixed(15);
        }
        return num;
      }

      $scope.hoverIn = function(){
        this.hoverShow = true && $scope.slavePercentage(this.slave) != 100;
      };

      $scope.hoverOut = function(){
        this.hoverShow = false;
      };
  });
})(jQuery, document, window, ResponsiveBootstrapToolkit);
