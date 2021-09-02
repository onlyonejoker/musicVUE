"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Audio = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Audio =
/*#__PURE__*/
function () {
  function Audio(audio, canvas) {
    _classCallCheck(this, Audio);

    this.audio = audio;
    this.canvas = canvas;
  }

  _createClass(Audio, [{
    key: "openPlayer",
    value: function openPlayer() {
      var a = null;
      var AudCtx = null;
      var analyze = null;
      var AudCtxUrl = null;
      var voiceHeight = null;
      var cCtx = null;
      a = this.audio; //创建音频AUDIO

      AudCtx = new AudioContext(); //创建媒体元素

      AudCtxUrl = AudCtx.createMediaElementSource(a); //创建分析机，分析音频数据

      analyze = AudCtx.createAnalyser(); //媒体源和分析机链接

      AudCtxUrl.connect(analyze); //输出

      analyze.connect(AudCtx.destination); //实现效果

      voiceHeight = new Uint8Array(analyze.frequencyBinCount); //画布

      cCtx = this.canvas.getContext("2d"); //定义线性渐变属性

      this.canvas.width = window.innerWidth;
      this.canvas.height = 200;
      var oW = this.canvas.width;
      var oH = this.canvas.height;
      var color = cCtx.createLinearGradient(oW / 2, oH, oW / 2, oH - 50);
      color.addColorStop(0, "rgb(23, 19, 80)");
      color.addColorStop(0.5, "#069");
      color.addColorStop(1, "rgb(250, 14, 199)"); //定义音频的条数

      var cont = 80;

      function draw() {
        //将频率数据传入无符号节点中
        analyze.getByteFrequencyData(voiceHeight); //获取频步

        var step = Math.round(voiceHeight.length / cont);
        cCtx.clearRect(0, 0, oW, oH);

        for (var i = 0; i < cont; i++) {
          var audioHeight = voiceHeight[step * i];
          cCtx.fillStyle = color;
          cCtx.fillRect(oW / 2 + i * 10, oH, 7, -audioHeight);
          cCtx.fillRect(oW / 2 - i * 10, oH, 7, -audioHeight);
        }
      }

      setInterval(draw, 30);
      console.log("音频谱加载完毕");
    }
  }]);

  return Audio;
}();

exports.Audio = Audio;