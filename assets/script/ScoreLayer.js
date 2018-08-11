var CF = require('./config/config.js');

cc.Class({
    extends: cc.Component,

    properties: {
        score : {
            default : null,
            type : cc.Label
        },
        playAgain : {
            default : null,
            type : cc.Label
        }
    },

    onLoad () {
        this.init();
    },

    init : function(){

        //设置场景的背景颜色
        cc.director.setClearColor( cc.hexToColor('#2f69d2') );

        this.score.string = 'Score : ' + CF.SCORE;

        this.addEvent();
    },

    addEvent : function(){

        this.playAgain.node.on( cc.Node.EventType.TOUCH_START, (e)=>{

            this.back();

        });
    },

    back : function(){
        
        CF.SCORE = 0;
        CF.ISGAMEOVER = false;

        this.go();
    },

    go : function(){
        
        //场景切换
        cc.director.loadScene('GameLayer');
    }
});
