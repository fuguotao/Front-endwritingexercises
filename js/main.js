require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-1.12.4.min',
        Vue: 'vue',
        KeyBord: 'keybord'
    }
});

require(['jquery', 'Vue', 'KeyBord'], function($, Vue, KeyBord) {
    Vue.config.devtools = true;
    var vm = new Vue({
        el: '#app',
        components: { 'KeyBord': KeyBord },
        data: {
            IsKaishi: {
                type: true,
                content: '回车键开始和暂停',
                isChongXin: false,
                ShuRuFaType: '请保持中文输入法，注意中英文标点',
            },
            YuanNeiRong: '归去来兮，田园将芜胡不归？既自以心为形役，奚惆怅而独悲？悟已往之不谏，知来者之可追。实迷途其未远，觉今是而昨非。舟遥遥以轻飏，风飘飘而吹衣。问征夫以前路，恨晨光之熹微。\n' +
                '　　乃瞻衡宇，载欣载奔。僮仆欢迎，为以舒啸，临清流而赋诗。聊乘化以归尽，乐夫天命复奚疑！',
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
            ajax({
                type: "POST",
                url: "http://route.showapi.com/1287-1",
                dataType: "json",
                data: {
                    showapi_appid: 100, //是	易源应用id
                    showapi_sign: '6356B7D41DABBDDD2F7EC560C5786300', //是	为了验证用户身份，以及确保参数不被中间人篡改，需要传递调用者的数字签名。
                    showapi_timestamp: new Date().getTime(), //否	客户端时间。 
                    showapi_sign_method: 'md5', //否	签名生成方式，其值可选为"md5"或"hmac"。如果不传入则默认"md5"。
                    showapi_res_gzip: 1,
                },
                beforeSend: function() {
                    //some js code 
                },
                success: function(msg) {
                    console.log(msg)
                },
                error: function() {
                    console.log("error")
                }
            })
        },

        methods: {
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

function ajax() {
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function() {},
        success: arguments[0].success || function() {},
        error: arguments[0].error || function() {}
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c in data) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1)
        return convertResult;
    } else {
        return data;
    }
}