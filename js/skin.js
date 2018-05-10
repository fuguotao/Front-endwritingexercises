define(['jquery', 'Vue'], function($, Vue) {
    return ({
        template: `
        <div>
            <div class="HuanFu">
                <div>
                    <div class="img"><img src="images/bg/1.jpg" alt=""></div>
                        <div class="h">换肤</div>
                    </div>
                    <div class="HuanFu">
                        <div class="img"><img src="images/bg/1.jpg" alt=""></div>
                        <div class="h">白天</div>
                    </div>
                    <div class="HuanFu">
                        <div class="img"><img src="images/bg/1.jpg" alt=""></div>
                        <div class="h">夜间</div>
                    </div>
                </div>
                <div id="BgListcc">
                    <ul><li v-for="(item,index) in PiFu.BgLint" :key="index" @click="ChangePiFu($event,item)">
                    <div class="Bgli_img"><img v-bind:src="'images/bg/'+item+'.jpg'"></div>
                    <div class="Bgli_tit">{{item}}</div>
                    </li></ul>
                </div>
            </div>
        </div>
        `,
        data: function() {
            return {
                PiFu: {
                    defult: true,
                    BgLint: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                }
            }
        },
        created() {},
        methods: {
            ChangePiFu(e, i) {
                this.$emit('bgchangenex', i)
                window.localStorage.setItem('PiFu', i);
            }
        }
    })
});