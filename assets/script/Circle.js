var CF = require('./config/config.js');

cc.Class({
    extends: cc.Component,

    properties: {

        _up : false, //标记用户是否点击了屏幕

        score : {   //分数对象
            default : null,
            type : cc.Label
        },

        gLayer : {  //gameLayer的引用
            default: null,
            serializable: false
        },

        sound : {
             type: cc.AudioSource,
             default: null
        }
    },

    onLoad () {

       //获取这个球的刚体对象 
       this.body = this.getComponent(cc.RigidBody);

       //设置球一开始的x轴力,每个刚体的力都存放在linearVelocity对象里
       var speed = this.body.linearVelocity;
       speed.x = 1000;
       this.body.linearVelocity = speed;
      
    },

    //碰撞检测,当刚体发生碰撞的时候自动调用
    onBeginContact : function(contact,selfCollider,otherCollider){
        
        if (CF.ISGAMEOVER) {return;}

        this.playSound();

        //与wall四周的碰撞检测
        var dir = otherCollider.dir;
        if( dir ) 
        {
            var speed = this.body.linearVelocity;

            //球向左走
            if (dir == 'right') 
            {
                speed.x = -700;

                //删除右边的铅笔
                this.gLayer.removePen('right');

                this.gLayer.createNewPen('left');
            }
            //球向右走
            else if(dir ==  'left')
            {
                speed.x = 700;

                //删除左边的铅笔
                this.gLayer.removePen('left');

                this.gLayer.createNewPen('right');
            }

            this.body.linearVelocity = speed;
            
            this.addScore();
        }
        //碰到铅笔
        else
        {
            this.setColor();
        }
    },

    //用户点击了屏幕
    up : function(){
       if (CF.ISGAMEOVER) {return;}
       this._up = true;
    },

    //
    update : function(){

        var speed = this.body.linearVelocity;

        if (this._up ) 
        {
            speed.y = 1000;
            this.body.linearVelocity = speed;
        }

        this._up = false; 

        //判断小球的速度是否为0，如果为0代表小球已经是静止的，游戏结束
        if( speed.x == 0 )
        {
            this.gLayer.gameOver();
        }
    },

    //添加分数
    addScore : function()
    {
        if (CF.ISGAMEOVER) {return;}
        this.score.string = ++CF.SCORE;  
    },

    //设置球的颜色
    setColor : function(){
        CF.ISGAMEOVER = true;
        this.node.color = new cc.Color(0,255,0);
    },

    //播放音乐
    playSound : function () {
        this.sound.play();
    }
});
