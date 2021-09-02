export class Audio {
  constructor(audio, canvas) {
    this.audio = audio;
    this.canvas = canvas;
  }
  openPlayer() {
    let a = null;
    let AudCtx = null;
    let analyze = null;
    let AudCtxUrl = null;
    let voiceHeight = null;
    let cCtx = null;
    a = this.audio;
    //创建音频AUDIO
    AudCtx = new AudioContext();
    //创建媒体元素
    AudCtxUrl = AudCtx.createMediaElementSource(a);
    //创建分析机，分析音频数据
    analyze = AudCtx.createAnalyser();
    //媒体源和分析机链接
    AudCtxUrl.connect(analyze);
    //输出
    analyze.connect(AudCtx.destination);
    //实现效果
    voiceHeight = new Uint8Array(analyze.frequencyBinCount);
    //画布
    cCtx = this.canvas.getContext("2d");
    //定义线性渐变属性
    this.canvas.width = window.innerWidth;
    this.canvas.height = 200;
    let oW = this.canvas.width;
    let oH = this.canvas.height;
    let color = cCtx.createLinearGradient(oW / 2, oH, oW / 2, oH - 50);
    color.addColorStop(0, "rgb(23, 19, 80)");
    color.addColorStop(0.5, "#069");
    color.addColorStop(1, "rgb(250, 14, 199)");
    //定义音频的条数
    let cont = 80;
    function draw() {
      //将频率数据传入无符号节点中
      analyze.getByteFrequencyData(voiceHeight);
      //获取频步
      let step = Math.round(voiceHeight.length / cont);

      cCtx.clearRect(0, 0, oW, oH);
      for (let i = 0; i < cont; i++) {
        let audioHeight = voiceHeight[step * i];
        cCtx.fillStyle = color;
        cCtx.fillRect(oW / 2 + i * 10, oH, 7, -audioHeight);
        cCtx.fillRect(oW / 2 - i * 10, oH, 7, -audioHeight);
      }
    }
    setInterval(draw, 30);
    console.log("音频谱加载完毕");
  }
}
