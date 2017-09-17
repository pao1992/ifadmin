export const products = [
  {
    "product_id": "1",
    "product_name": "个人妆",
    "product_name_en": "PERSONAL MAKEUP",
    "category_id": 11,
    'category_name':'生活妆',
    "shop_price": "288.00",
    "spec": [
      {
        "required":1,
        "tpl_type":"required_single",
        "items": [
          {
            "name":"场合",
              "options": [
                  {
                      "item_id": 12,
                      "item": "聚会",
                      'name':'场合',
                  },
                  {
                      "item_id": 13,
                      "item": "夜店",
                      'name':'场合',
                  }
              ]
          },
          {
            "name":"风格",
            "options": [
              {
                "item_id": 22,
                "item": "韩式",
                  'name':'风格',
              },
              {
                "item_id": 23,
                "item": "中式",
                  'name':'风格',
              }
            ]
          }
        ],
        "items_price":[
            {
                "key": "12_22",
                "key_name": ['聚会', '韩式'],
                "price": 100.00
            },
            {
                "key": "12_23",
                "key_name": ['聚会', '中式'],
                "price": 120.00
            },
            {
                "key": "13_22",
                "key_name": ['夜店', '韩式'],
                "price": 130.00
            },
            {
                "key": "13_23",
                "key_name": ['夜店', '中式'],
                "price": 140.00
            }
        ],
        "num_related":1

      },
      {
        "required":1,
        "tpl_type":"required_multiple",
        "items": [
          {
            "name":"造型",
            "options": [
              {
                "item_id": 12,
                "item": "基本妆面",
                "price":100
              },
              {
                "item_id": 13,
                "item": "发型",
                "price":200,
              }
            ]
          },
          {
            "name":"造型",
            "options": [
              {
                "item_id": 22,
                "item": "基本妆面",
                "default":1,
                "price":100
              },
              {
                "item_id": 23,
                "item": "发型",
                "price":200,
              }
            ]
          }
        ],
        "num_related":1
      },
      {
        "tpl_type":"unrequired_single",
        "items": [
          {

            "name":"非必选",
            "options": [
              {
                "item_id": 12,
                "item": "非必选1",
                "price":100
              },
              {
                "item_id": 13,
                "item": "非必选2",
                "price":200,
              }
            ]
          },
          {

            "name":"非必选",
            "options": [
              {
                "item_id": 42,
                "item": "非必选1",
                "price":100
              },
              {
                "item_id": 183,
                "item": "非必选2",
                "price":200,
              }
            ]
          }
        ],
        "num_related":1
      },
      {
        "tpl_type":"unrequired_multiple",
        "items": [
          {
            "name":"赠品",
            "options": [
              {
                "item_id": 12,
                "item": "照片",
                "price":0
              },
              {
                "item_id": 13,
                "item": "朋友圈",
                "price":0
              }
            ]
          },
          {
            "name":"升级",
            "options": [
              {
                "item_id": 52,
                "item": "大图",
                "price":100
              },
              {
                "item_id": 53,
                "item": "高清",
                "price":200,
              }
            ]
          }
        ],
        "num_related":0
      }
    ],
    num:[1,2,3],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493228584077&di=bd44fe3a379af8d3d92352f2cb725444&imgtype=0&src=http%3A%2F%2Ftgi12.jia.com%2F118%2F308%2F18308306.jpg",
    "desc": "\u751f\u6d3b\u5986\u3001\u665a\u5bb4\u5986\uff0c\u8f7b\u677e\u7a7f\u68ad\u5404\u79cd\u573a\u5408"
  },
  {
    "product_id": "2",
    "product_name": "闺蜜妆",
    "product_name_en": "BESITE MAKEUP",
    "category_id": 11,
    'category_name':'生活妆',
    "shop_price": "488.00",
    "spec": [
      {
        "tpl_type":"required_single",
        "items": [
          {
            "name":"场合",
            "options": [
              {
                "item_id": 12,
                "item": "聚会",
                "default":0
              },
              {
                "item_id": 13,
                "item": "夜店",
                "default":1
              }
            ]
          },
          {
            "name":"风格",
            "options": [
              {
                "item_id": 22,
                "item": "韩式"
              },
              {
                "item_id": 23,
                "item": "日式"
              }
            ]
          }
        ],
        "items_price":[
          {
            "key":"12_22",
            "price":100.00
          },
          {
            "key":"12_23",
            "price":120.00
          },
          {
            "key":"13_22",
            "price":130.00
          },
          {
            "key":"13_23",
            "price":140.00
          }
        ],
        "num_related":1

      },
      {
        "tpl_type":"unrequired_single",
        "items": [
          {

            "name":"升级体验",
            "options": [
              {
                "item_id": 12,
                "item": "闺蜜四宫格",
                "price":100
              },
              {
                "item_id": 13,
                "item": "闺蜜九宫格",
                "price":200,
              }
            ]
          }
        ],
        "num_related":1
      },
      {
        "tpl_type":"unrequired_multiple",
        "items": [
          {
            "name":"赠品",
            "options": [
              {
                "item_id": 12,
                "item": "照片",
                "price":0
              },
              {
                "item_id": 13,
                "item": "朋友圈",
                "price":0
              }
            ]
          },
          {
            "name":"升级",
            "options": [
              {
                "item_id": 52,
                "item": "大图",
                "price":100
              },
              {
                "item_id": 53,
                "item": "高清",
                "price":200,
              }
            ]
          }
        ],
        "num_related":0
      }
    ],
    num:[2,2,4],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493375289536&di=622fa983cbd50fca3502b070cbf33e91&imgtype=0&src=http%3A%2F%2Fwww.zzjsmj.com%2Fup%2Fgoodimage%2Fday_140402%2F2014040211470945577.jpg",
    "desc": "\u5404\u7c7b\u6d3b\u52a8\u5e74\u4f1a"
  },
  {
    "product_id": "3",
    "product_name": "团体妆",
    "product_name_en": "GROUP MAKEUP",
    "category_id": 11,
    "shop_price": "1588.00",
    "spec": [
      {"spec_id": 1, "spec_name": "跟妆", "shop_price": 2088.00},
      {"spec_id": 2, "spec_name": "市内", "shop_price": 1888.00}
    ],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493381553566&di=5ff85fb06d81d4a3fa408435f5b36ccc&imgtype=0&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft1741%2F357%2F154693036%2F285157%2F5f36d6c0%2F55cc3d95N7c9fec5e.jpg",
    "desc": "\u4e2d\u5f0f\u3001\u6b27\u7f8e\u5404\u7c7b\u7ecf\u5178\u9020\u578b"
  },
  {
    "product_id": "2",
    "product_name": "闺蜜妆",
    "product_name_en": "BESITE MAKEUP",
    "category_id": 22,
    "shop_price": "488.00",
    "spec": [
      {
        "spec_id": 1,
        "spec_name": "妆面",
        "item": [{"id": 1, "name": "韩式", "price": "100.00"}, {"id": 2, "name": "中式", "price": "100.00"}]
      },
      {
        "spec_id": 2,
        "spec_name": "情景",
        "item": [{"id": 1, "name": "聚会", "price": "100.00"}, {"id": 2, "name": "夜店", "price": "100.00"}]
      },
      {
        "spec_id": 3,
        "spec_name": "规格",
        "item": [{"id": 1, "name": "常规", "price": "100.00"}, {"id": 2, "name": "四宫格", "price": "400.00"}, {
          "id": 3,
          "name": "九宫格",
          "price": "900.00"
        }]
      }
    ],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493375289536&di=622fa983cbd50fca3502b070cbf33e91&imgtype=0&src=http%3A%2F%2Fwww.zzjsmj.com%2Fup%2Fgoodimage%2Fday_140402%2F2014040211470945577.jpg",
    "desc": "\u5404\u7c7b\u6d3b\u52a8\u5e74\u4f1a"
  },
  {
    "product_id": "3",
    "product_name": "团体妆",
    "product_name_en": "GROUP MAKEUP",
    "category_id": 22,
    "shop_price": "1588.00",
    "spec": [
      {"spec_id": 1, "spec_name": "跟妆", "shop_price": 2088.00},
      {"spec_id": 2, "spec_name": "市内", "shop_price": 1888.00}
    ],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493381553566&di=5ff85fb06d81d4a3fa408435f5b36ccc&imgtype=0&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft1741%2F357%2F154693036%2F285157%2F5f36d6c0%2F55cc3d95N7c9fec5e.jpg",
    "desc": "\u4e2d\u5f0f\u3001\u6b27\u7f8e\u5404\u7c7b\u7ecf\u5178\u9020\u578b"
  },
  {
    "product_id": "7",
    "product_name": "结婚妆",
    "product_name_en": "WEDDING MAKEUP",
    "category_id": 22,
    "shop_price": "288.00",
    "spec": [
      {
        "spec_id": 1,
        "spec_name": "形式",
        "item": [{"id": 1, "name": "跟妆", "price": "2000.00"}, {"id": 2, "name": "市内", "price": "1800.00"}]
      },
      {
        "spec_id": 1,
        "spec_name": "妆面类型",
        "item": [{"id": 1, "name": "韩式", "price": "100.00"}, {"id": 2, "name": "中式", "price": "100.00"}]
      },

      {"spec_id": 2, "spec_name": "相亲", "shop_price": 388.00},
      {"spec_id": 3, "spec_name": "演出", "shop_price": 488.00}
    ],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493228584077&di=bd44fe3a379af8d3d92352f2cb725444&imgtype=0&src=http%3A%2F%2Ftgi12.jia.com%2F118%2F308%2F18308306.jpg",
    "desc": "\u751f\u6d3b\u5986\u3001\u665a\u5bb4\u5986\uff0c\u8f7b\u677e\u7a7f\u68ad\u5404\u79cd\u573a\u5408"
  },
  {
    "product_id": "8",
    "product_name": "结婚摄影",
    "product_name_en": "PERSONAL MAKEUP",
    "category_id": 31,
    "shop_price": "288.00",
    "spec": [
      {
        "spec_id": 1,
        "spec_name": "妆面类型",
        "item": [{"name": "韩式", "price": "100.00"}, {"name": "中式", "price": "100.00"}]
      },
      {"spec_id": 2, "spec_name": "相亲", "shop_price": 388.00},
      {"spec_id": 3, "spec_name": "演出", "shop_price": 488.00}
    ],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493228584077&di=bd44fe3a379af8d3d92352f2cb725444&imgtype=0&src=http%3A%2F%2Ftgi12.jia.com%2F118%2F308%2F18308306.jpg",
    "desc": "\u751f\u6d3b\u5986\u3001\u665a\u5bb4\u5986\uff0c\u8f7b\u677e\u7a7f\u68ad\u5404\u79cd\u573a\u5408"
  },
  {
    "product_id": "9",
    "product_name": "闺蜜妆",
    "product_name_en": "BESITE MAKEUP",
    "category_id": 32,
    "shop_price": "488.00",
    "spec": [
      {
        "spec_id": 1,
        "spec_name": "妆面",
        "item": [{"id": 1, "name": "韩式", "price": "100.00"}, {"id": 2, "name": "中式", "price": "100.00"}]
      },
      {
        "spec_id": 2,
        "spec_name": "情景",
        "item": [{"id": 1, "name": "聚会", "price": "100.00"}, {"id": 2, "name": "夜店", "price": "100.00"}]
      },
      {
        "spec_id": 3,
        "spec_name": "规格",
        "item": [{"id": 1, "name": "常规", "price": "100.00"}, {"id": 2, "name": "四宫格", "price": "400.00"}, {
          "id": 3,
          "name": "九宫格",
          "price": "900.00"
        }]
      }
    ],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493375289536&di=622fa983cbd50fca3502b070cbf33e91&imgtype=0&src=http%3A%2F%2Fwww.zzjsmj.com%2Fup%2Fgoodimage%2Fday_140402%2F2014040211470945577.jpg",
    "desc": "\u5404\u7c7b\u6d3b\u52a8\u5e74\u4f1a"
  },
  {
    "product_id": "10",
    "product_name": "团体妆",
    "product_name_en": "GROUP MAKEUP",
    "category_id": 32,
    "shop_price": "1588.00",
    "spec": [
      {"spec_id": 1, "spec_name": "跟妆", "shop_price": 2088.00},
      {"spec_id": 2, "spec_name": "市内", "shop_price": 1888.00}
    ],
    "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493381553566&di=5ff85fb06d81d4a3fa408435f5b36ccc&imgtype=0&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft1741%2F357%2F154693036%2F285157%2F5f36d6c0%2F55cc3d95N7c9fec5e.jpg",
    "desc": "\u4e2d\u5f0f\u3001\u6b27\u7f8e\u5404\u7c7b\u7ecf\u5178\u9020\u578b"
  }
]
