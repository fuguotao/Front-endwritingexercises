require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-1.12.4.min',
        Vue: 'vue',
        KeyBord: 'keybord',
        SkinChange: 'skin'
    }
});

require(['jquery', 'Vue', 'KeyBord', 'SkinChange'], function($, Vue, KeyBord, SkinChange) {
    Vue.config.devtools = true;
    var vm = new Vue({
        el: '#app',
        components: { KeyBord, SkinChange },
        data: {
            IsKaishi: {
                type: true,
                content: '回车键开始和暂停',
                isChongXin: false,
                ShuRuFaType: '请保持中文输入法，注意中英文标点',
            },
            YuanNeiRong: `html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, 
            strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, 
            tfoot, thead, tr, th, td ,textarea,input { margin:0; padding:0;  }
            address,cite,dfn,em,var, i {font-style:normal;}
            body {font-size: 16px; line-height: 1.5; font-family:'Microsoft Yahei','simsun','arial','tahoma';  color: #222; background: #eee; }
            table { border-collapse:collapse; border-spacing:0; }
            h1, h2, h3, h4, h5, h6, th { font-size: 100%; font-weight: normal; }
            button,input,select,textarea{font-size:100%;}
            fieldset,img{border:0;}
            a { text-decoration: none; color: #666; background: none }
            ul, ol { list-style: none; }
            :focus{ outline:none;}
            .clearfix{ clear: both; content: ""; display: block; overflow: hidden }
            .clear{clear: both;}
            .fl{ float: left; }
            .fr{float: right;}`,
            DaZiLieBiao: [],
            XieRuNeiRong: [],
            DaDuanLuoChaiFens: [],
            KaiQiShuRu: 0,
            time: {
                小时: '00',
                分钟: '00',
                秒: '00'
            },
            t: null,
            ZQL: '0.00',
            PiFu: '0'
        },
        directives: {
            focus: {
                // directive definition
                inserted: function(el, {
                    value
                }) {
                    if (el.className == 'inp' + value) {
                        el.focus()
                    }
                }
            }
        },
        computed: {
            WatchWord() {
                var aa = [];
                this.XieRuNeiRong.forEach((i, c, v) => {
                        if (i.length) {
                            aa.push(i.split(""))
                        } else {
                            aa.push(i)
                        }
                    })
                    // return this.XieRuNeiRong.split("");
                return aa;
            },
            DaDuanLuoChaiFen() {
                // for(let i=this.YuanNeiRong.length;i--){
                //
                // }
                // var cab =  this.DaZiLieBiao.concat();

            }
        },
        created() {

            this.init();
            var that = this;
            document.onkeydown = function(event) {
                var event = event || window.event;
                if (event.keyCode == 13) {
                    that.beginDaZi();
                    that.KaiQiShuRu = 0;
                }

            };

        },

        mounted() {
            this.$nextTick(() => {
                var e = window.localStorage.getItem('PiFu');
                if (window.localStorage.getItem('PiFu')) {
                    this.bgchangenex(e, 'bgBingYing');
                    this.bgchangenex(e, 'bgBingYingCf');
                }else {
                    this.bgchangenex(0, 'bgBingYing');
                    this.bgchangenex(0, 'bgBingYingCf');
                }
            })
        },
        methods: {
            bgchangenex(e, name) {
                if (name) {
                    this.$refs[name].style.background = 'url(images/bg/' + e + '.jpg)' + 'no-repeat'
                    this.$refs[name].style.backgroundSize = 'cover';
                    this.$refs[name].style.backgroundAttachment = 'fixed';
                } else {
                    setTimeout(() => {
                        this.$refs['bgBingYing'].style.background = 'url(images/bg/' + e + '.jpg)' + 'no-repeat'
                        this.$refs['bgBingYing'].style.backgroundSize = 'cover';
                        this.$refs['bgBingYing'].style.backgroundAttachment = 'fixed';
                    }, 2000)
                    this.$refs['bgBingYingCf'].style.height = '0';
                    this.$refs['bgBingYingCf'].style.background = 'url(images/bg/' + e + '.jpg)' + 'no-repeat'
                    this.$refs['bgBingYingCf'].style.backgroundSize = 'cover';
                    this.$refs['bgBingYingCf'].style.backgroundAttachment = 'fixed';
                    this.$refs['bgBingYingCf'].style.height = '100%';

                }
                this.PiFu = e;
            },
            init() {
                var that = this;

                this.DaZiLieBiao = this.YuanNeiRong.replace(/\s/ig, '').split(""); //去空格
                // console.log(this.WatchWord[5]);
                // this.DaZiLieBiao.forEach((m,i,v)=>{
                if (this.DaZiLieBiao.length > 40) {
                    var hang = this.DaZiLieBiao.length % 40 == 0 ? parseInt(this.DaZiLieBiao.length / 40) : parseInt(this.DaZiLieBiao.length / 40) + 1;
                    for (var c = 0; c < hang; c++) {
                        // var cc = v.splice(0,40)
                        this.DaDuanLuoChaiFens.push(this.DaZiLieBiao.splice(0, 40));
                        this.XieRuNeiRong.push([])
                    }
                } else {
                    this.DaDuanLuoChaiFens.push(this.DaZiLieBiao);
                    this.XieRuNeiRong.push([])
                }
            },
            stoporbegin() {

            },
            star() {
                var that = this;
                // clearTimeout(t)

                // t = setTimeout(star, 1000);

                if (!that.IsKaishi.type) {
                    that.time.秒 - 0;
                    if (that.time.秒 < 9) {
                        that.time.秒++;
                        that.time.秒 = '0' + that.time.秒;
                    } else {
                        that.time.秒++
                    }
                    if (that.time.秒 >= 61) {
                        that.time.分钟 - 0;
                        that.time.秒 = '0' + 1;
                        if (that.time.分钟 < 9) {
                            that.time.分钟++;
                            that.time.分钟 = '0' + that.time.分钟;
                        } else {
                            that.time.分钟++
                        }
                    }
                    if (that.time.分钟 >= 61) {
                        that.time.小时 - 0;
                        that.time.分钟 = '0' + 1;
                        if (that.time.小时 < 9) {
                            that.time.小时++;
                            that.time.小时 = '0' + that.time.小时;
                        } else {
                            that.time.小时++
                        }
                    }
                }
            },
            beginDaZi(cv) {
                // console.log(this.IsKaishi.type);
                this.IsKaishi.type = !this.IsKaishi.type;
                var that = this;
                if (!this.IsKaishi.type) {
                    this.t = setInterval(this.star, 1000);
                    that.$refs.input01[0].querySelector('input').focus();
                    if (this.IsKaishi.isChongXin) {
                        this.ChongXinKaiShi()
                            // })
                    }
                } else {
                    clearTimeout(this.t);
                    that.$refs.input01.forEach((element, i) => {
                        that.$refs.input01[i].querySelector('input').blur()
                    })
                }

            },
            ChongXinKaiShi() {
                var that = this;
                this.IsKaishi.isChongXin = !this.IsKaishi.isChongXin;
                this.IsKaishi.content = '回车键开始和暂停';
                that.$refs.input01[0].querySelector('input').focus();

                // this.init();
                this.time = {
                    小时: '00',
                    分钟: '00',
                    秒: '00'
                };
                // that.$refs.input01.forEach((element, i) => {
                that.XieRuNeiRong.forEach((ele, i) => {
                    that.XieRuNeiRong[i] = []
                })
                this.WatchWord.forEach((ele, i) => {
                    that.WatchWord[i] = []
                })
            }
        },
        watch: {
            WatchWord: {
                handler(newValue, oldValue) {
                    var ZhunQueLv = [];
                    newValue.forEach((i, c, v) => {
                        // console.log(c)
                        if (i instanceof Array) {
                            if (i.length >= this.DaDuanLuoChaiFens[c].length) {
                                if (this.$refs.input01.length - 1 > c) {
                                    this.$refs.input01[c + 1].querySelector('input').focus();
                                }
                                this.XieRuNeiRong[c] = this.XieRuNeiRong[c].slice(0, this.DaDuanLuoChaiFens[c].length)
                                    // for(var bbc=0;bbc<=i.length-this.DaDuanLuoChaiFens[c].length;bbc++){
                                    //     debugger
                                    //     this.XieRuNeiRong[c].slice()
                                    // }
                                    // console.log(this.WatchWord)
                            }
                            i.forEach((ip, cp, vp) => {
                                // console.log(ip)
                                if (ip != this.DaDuanLuoChaiFens[c][cp]) {
                                    ZhunQueLv.push(ip);
                                }

                                // console.log(this.XieRuNeiRong)
                            })
                        }
                    });
                    // console.log(ZhunQueLv.length);
                    // console.log()
                    //准确率计算
                    this.ZQL = (this.XieRuNeiRong.join('').length - ZhunQueLv.length) <= 0 ? '0.00' : (((this.XieRuNeiRong.join('').length - ZhunQueLv.length) * 100 / this.XieRuNeiRong.join('').length).toFixed(2)).toString();
                    // console.log(this.XieRuNeiRong.join('').length)

                    if (this.XieRuNeiRong.join('').length >= this.YuanNeiRong.replace(/\s/ig, '').split("").length) {
                        //当写入完成结束时
                        this.IsKaishi.content = `打字结束,您的打字时间为${this.time.小时}:${this.time.分钟}:${this.time.秒} 回车键重新开始`;
                        clearTimeout(this.t);
                        this.IsKaishi.type = true;
                        this.IsKaishi.isChongXin = true
                            // this.time = {
                            //     小时: '00',
                            //     分钟: '00',
                            //     秒: '00'
                            // };
                    }
                },
                deep: true
            },

        }
    })

});
