require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-1.12.4.min',
        Vue: 'vue',
        KeyBord: 'keybord',
        SkinChange: 'skin',
        // keybordminjquery: 'keyboard.min'
        word: 'word',
        nicescroll: './plugin/jquery.nicescroll.min'
    }
});

require(['jquery', 'Vue', 'KeyBord', 'SkinChange', 'word', 'nicescroll'], function($, Vue, KeyBord, SkinChange, word, nicescroll) {
    Vue.config.devtools = true;
    var vm = new Vue({
        el: '#app',
        components: { KeyBord, SkinChange },
        data: {
            IsKaishi: {
                type: true,
                content: 'ESC开始和暂停',
                isChongXin: false,
                ShuRuFaType: '请保持中文输入法，注意中英文标点',
            },
            YuanNeiRong: '',
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
            PiFu: 0,
            ChaiFen: 62,
            TabWordChange: [
                { name: 'HTML练习', type: 'html', class: 'e' },
                { name: 'CSS练习', type: 'css', class: 'e' },
                { name: 'JS练习', type: 'javascript', class: 'e' },
                { name: '中文', type: 'chinese', class: 'z' },
                { name: '英文', type: 'english', class: 'e' },
            ],
            TabWord_show: 0,
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
            //监听内容的变化
            WatchWord() {
                var aa = [];
                if (this.XieRuNeiRong.length > 0) {
                    this.XieRuNeiRong.forEach((i, c, v) => {
                        if (i.length) {
                            aa.push(i.split(""))
                        } else {
                            aa.push(i)
                        }
                    })
                }

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
        beforeCreate() {

        },
        created() {
            this.YuanNeiRong = word[this.TabWordChange[0].type]
            this.init();
            var that = this;
            document.onkeydown = function(event) {
                var event = event || window.event;
                if (event.keyCode == 27) {
                    that.beginDaZi();
                    that.KaiQiShuRu = 0;
                }

            };

        },

        mounted() {
            this.$nextTick(() => {
                var e = window.localStorage.getItem('PiFu') - 0;
                if (window.localStorage.getItem('PiFu')) {
                    this.bgchangenex(e, 'bgBingYing');
                    this.bgchangenex(e, 'bgBingYingCf');
                } else {
                    this.bgchangenex(0, 'bgBingYing');
                    this.bgchangenex(0, 'bgBingYingCf');
                }
                $(this.$refs.XieZiBanMain_con).niceScroll({
                    cursorwidth: "2px", // 滚动条的宽度，单位：便素
                    cursorborder: "none", // CSS方式定义滚动条边框
                    cursorborderradius: "0px", // 滚动条圆角（像素）
                    scrollspeed: 150, // 滚动速度
                    mousescrollstep: 40, // 鼠标滚轮的滚动速度 (像素)
                });


            })
        },
        methods: {
            changeWord(type, ez, i) {
                if (!this.IsKaishi.type) {
                    return;
                } else {
                    this.YuanNeiRong = word[type];
                    switch (type) {
                        case 'css':
                            this.ChaiFen = 79
                            break;
                        case 'javascript':
                            this.ChaiFen = 79
                        case 'html':
                            this.ChaiFen = 62
                            break;
                        case 'chinese':
                            this.ChaiFen = 40
                            break;
                        case 'english':
                            this.ChaiFen = 79
                    }
                }

                // ez == 'e' ? this.ChaiFen = 79 : this.ChaiFen = 40;
                // this.ChongXinKaiShi();
                this.TabWord_show = i;
                // this.beginDaZi('end')
                this.init();
            },
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
                //对打字列表进行拆分
                this.time = {
                    小时: '00',
                    分钟: '00',
                    秒: '00'
                };
                var that = this;
                this.DaDuanLuoChaiFens = [];
                this.XieRuNeiRong = [];
                // this.DaZiLieBiao = this.YuanNeiRong.replace(/\s/ig, '').split(""); //去空格
                this.DaZiLieBiao = this.YuanNeiRong.split("");; //
                // console.log(this.WatchWord[5]);
                // this.DaZiLieBiao.forEach((m,i,v)=>{
                if (this.DaZiLieBiao.length > that.ChaiFen) {
                    var hang = this.DaZiLieBiao.length % that.ChaiFen == 0 ? parseInt(this.DaZiLieBiao.length / that.ChaiFen) : parseInt(this.DaZiLieBiao.length / that.ChaiFen) + 1;
                    for (var c = 0; c < hang; c++) {
                        // var cc = v.splice(0,that.ChaiFen)
                        this.DaDuanLuoChaiFens.push(this.DaZiLieBiao.splice(0, that.ChaiFen));
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
                this.IsKaishi.isChongXin = !this.IsKaishi.isChongXin;
                this.IsKaishi.content = 'ESC开始和暂停';
                this.$refs.input01[0].querySelector('input').focus();

                // this.init();
                this.time = {
                    小时: '00',
                    分钟: '00',
                    秒: '00'
                };
                // that.$refs.input01.forEach((element, i) => {
                this.XieRuNeiRong.forEach((ele, i) => {
                    this.XieRuNeiRong[i] = []
                })
                this.WatchWord.forEach((ele, i) => {
                    this.WatchWord[i] = []
                })
            }
        },
        watch: {
            WatchWord: {
                handler(newValue, oldValue) {
                    var ZhunQueLv = [];
                    newValue.forEach((i, c, v) => {
                        // console.log(c)
                        if (i instanceof Array && i) {
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

                    // if (this.XieRuNeiRong.join('').length >= this.YuanNeiRong.replace(/\s/ig, '').split("").length) {
                    if (this.XieRuNeiRong.join('').length >= this.YuanNeiRong.split("").length) { //不去空格

                        //当写入完成结束时
                        debugger
                        this.IsKaishi.content = `打字结束,您的打字时间为${this.time.小时}:${this.time.分钟}:${this.time.秒} Esc重新开始`;
                        clearTimeout(this.t);
                        this.$refs.input01.forEach((element, i) => {
                            this.$refs.input01[i].querySelector('input').blur()
                        })
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