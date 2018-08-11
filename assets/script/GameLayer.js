var CF = require('./config/config.js');

cc.Class({
    extends: cc.Component,

    properties: {

        size: cc.size(0, 0),
        mouseJoint: true,

        circle : {
            default : null,
            type : require('Circle')
        },

        Pen : {
            default : null,
            type : cc.Prefab
        },

        tc : {
            default : null,
            type : cc.Node
        },

        penArr : new Array(),
        ISGAMEOVER : false,
        penPosY : []   
    }, 

    onLoad: function () {

        cc.director.setClearColor( cc.hexToColor('#2f69d2') );
        
        this.init();
        this.setgLayer();
        this.setZindex();

        this.penPosY = [820,753,686,619,551,484,417,353,288,222,158];
    },

    setgLayer : function(){
        this.circle.gLayer = this; 
    },

    setZindex : function(){
        this.tc.zIndex = 9999;
    },

    startGame : function(){
        this.node.removeChild(this.tc);
        this.circle.body.type = 2;
    },

    init : function(){
        this.initWorld();
        this.initPen();
        this.addEvent();
    },

    initWorld : function(){

        //开启物理引擎
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        //调试用,可以看到刚体的碰撞范围
        // physicsManager.debugDrawFlags = 
        //     // 0;
        //     // cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit; 

        let width   = this.size.width || this.node.width;
        let height  = this.size.height || this.node.height;

        let node = new cc.Node(); //创建一个node
        let body = node.addComponent(cc.RigidBody); //给这个node添加一个刚体，并赋值给body
        body.type = cc.RigidBodyType.Static; //设置刚体的属性为静态
        
        /*分别给这个node的四边添加一个物理碰撞盒*/
        this._addBound(node, 0, height/2, width, 20, 'up');
        this._addBound(node, 0, -height/2, width, 20, 'down');
        this._addBound(node, -width/2, 0, 20, height, 'left');
        this._addBound(node, width/2, 0, 20, height, 'right');

        node.parent = this.node;
    },

    _addBound : function (node, x, y, width, height, dir) {

        //物理碰撞盒
        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width; 
        collider.size.height = height;
        collider.dir = dir;
    },

    //上下的pen
    initPen : function(){

        for(var i=0; i<12; i++){
            var p = cc.instantiate(this.Pen);
            p.x = i * 61 - (CF.SW_2) + 30; 
            p.y = CF.SH_2 - p.height/2;
            this.node.addChild(p);
        }

        for(var i=0; i<12; i++){
            var p = cc.instantiate(this.Pen);
            p.x = i * 61 - (CF.SW_2) + 30; 
            p.y = -CF.SH_2 + p.height/2;
            p.rotation = 180;
            this.node.addChild(p);
        }
    },

    //左右的pen
    createNewPen : function(dir){

        for(var i=0; i<2; i++)
        {   
            var p = cc.instantiate(this.Pen);
            p.x = 0;
            p.y = 0;
            this.node.addChild(p);

            var rotation = (dir == 'left' ? -90 : 90);
            var x = (dir == 'left'? -214 : 214);

            p.x = x;
            p.y = this.penPosY[ parseInt( Math.random() * this.penPosY.length) ] - CF.SH_2; 

            p.rotation = rotation;
            p.dir = dir;

            this.penArr.push(p);
        } 
       
    },

    removePen : function(dir){
        //for(var i=0; i<this.penArr.length; i++)
        {
            var p = this.penArr[0];
            var p2 = this.penArr[1];

            // console.log(p)
            // console.log(p2)

            this.node.removeChild(p);
            this.penArr.remove(p);

             this.node.removeChild(p2);
            this.penArr.remove(p2);
        }
    },

    addEvent : function(){
        this.node.on(cc.Node.EventType.TOUCH_START, (e)=>{
            this.circle.up();
        });
    },

    gameOver : function(){
         this.circle.enabled = false;
         
         cc.director.loadScene('ScoreLayer');
    }
});
