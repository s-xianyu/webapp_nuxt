export {
  HX, //筛选级联菜单menu
}
const HX = {
  menus: [
    {
      name:'地区',
      type:'city',
      data:[]
    },
    {
      name:'品牌',
      type:'brand',
      data:[]
    },
    {
      name:'价格',
      type:'price',
      data:[]
    },
    {
      name:'车龄',
      type:'year',
      data:[]
    },
    {
      name:'公里数',
      type:'mileage',
      data:[]
    },
    {
      name:'类型',
      type:'carType',
      data:[
        {'name':'不限',val:''},
        {'name':'轿车',val:'1'},
        {'name':'SUV',val:'7'},
        {'name':'跑车',val:'8'},
        {'name':'MPV',val:'371'},
        {'name':'客车',val:'2'},
        {'name':'面包车',val:'10'},
        {'name':'皮卡',val:'4'},
        {'name':'房车',val:'11'},
        {'name':'货车',val:'3'},
        {'name':'工程车',val:'6'}
      ]
    },
    {
      name:'级别',
      type:'carKinds',
      data: [
        {'name':'不限','val':'','cur':true},
        {'name':'微型','val':'365','cur':false},
        {'name':'小型','val':'366','cur':false},
        {'name':'紧凑型','val':'367','cur':false},
        {'name':'中型','val':'368','cur':false},
        {'name':'中大型','val':'369','cur':false},
        {'name':'豪华型','val':'370','cur':false}
      ],
    },
    {
      name:'结构',
      type:'bodType',
      data:[
        {'name':'不限','val':'','cur':true},
        {'name':'两厢','val':'两厢','cur':false},
        {'name':'三厢','val':'三厢','cur':false},
        {'name':'掀背','val':'掀背','cur':false},
        {'name':'旅行版','val':'旅行版','cur':false},
        {'name':'硬顶敞篷','val':'硬顶敞篷','cur':false},
        {'name':'软顶敞篷','val':'软顶敞篷','cur':false}
      ],
    },
    {
      name:'厂商',
      type:'factory',
      data:[
        {'name':'不限','val':'','cur':true},
        {'name':'自主','val':'自主','cur':false},
        {'name':'合资','val':'合资','cur':false},
        {'name':'进口','val':'进口','cur':false},
        {'name':'美规版','val':'美规版','cur':false},
        {'name':'中东版','val':'中东版','cur':false},
        {'name':'欧洲版','val':'欧洲版','cur':false}
      ],
    },
    {
      name:'排放',
      type:'standards',
      data:[
        {'name':'不限','val':'','cur':true},
        {'name':'国一','val':'1','cur':false},
        {'name':'国二','val':'2','cur':false},
        {'name':'国三','val':'3','cur':false},
        {'name':'国三ODB','val':'4','cur':false},
        {'name':'国四','val':'5','cur':false},
        {'name':'国五','val':'6','cur':false}
      ],
    },
    {
      name:'变速箱',
      type:'gears',
      data:[
        {'name':'不限','val':''},
        {'name':'手动','val':'2'},
        {'name':'自动','val':'1'},
        {'name':'手自一体','val':'3'}
      ],
    },
    {
      name:'国别',
      type:'country',
      data:[
        {'name':'不限','val':''},
        {'name':'中国','val':'348'},
        {'name':'德国','val':'349'},
        {'name':'日本','val':'350'},
        {'name':'韩国','val':'352'},
        {'name':'美国','val':'351'},
        {'name':'英国','val':'354'},
        {'name':'法国','val':'353'},
        {'name':'意大利','val':'355'},
        {'name':'瑞典','val':'357'},
        {'name':'其他','val':''}
      ],
    },
    {
      name:'颜色',
      type:'colors',
      data:[
        {'name':'不限','val':'','cur':true},
        {'name':'黑色','val':'1','cur':false},
        {'name':'白色','val':'4','cur':false},
        {'name':'银灰','val':'7','cur':false},
        {'name':'深灰','val':'8','cur':false},
        {'name':'蓝色','val':'3','cur':false},
        {'name':'绿色','val':'5','cur':false},
        {'name':'香槟','val':'11','cur':false},
        {'name':'黄色','val':'6','cur':false},
        {'name':'红色','val':'2','cur':false}
      ],
    },
    {
      name:'库存时间',
      type:'inventoryTime',
      data:{}
    },
    {
      name:'批发车源',
      type:'pf',
      data:[
        {'name':'不限','val':''},
        {'name':'批发车源','val':'1'}
        ]
    },
  ],
};
