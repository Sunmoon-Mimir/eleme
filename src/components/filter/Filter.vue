<template>
  <div>
    <div class="filter">
      <div class="filter_nav flex">
        <div class="nav_item" v-for="(nav_items,index) in data" :key="nav_items.id">
          <span class="item_name">
              {{nav_items.name}}
            <i v-if="index===0" class="iconfont icon-xiala"></i>
            <i v-if="index===3" class="iconfont icon-shaixuan"></i>
          </span>
        </div>

      </div>
      <!-- 菜单模块 -->
      <div class="nav_submenu" style="display: block">
        <!-- 第一项的二级菜单 -->
        <div class="submenu_a" style="display:none">
          <ul>
            <li v-for="item in data[0].items" :key="item.id">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <!-- 第四项的二级菜单 -->
        <div class="submenu_d" style="display:none">
          <div class="d_main">
            <dl class="main_item clearFixed">
              <dt class="item_title"
              v-for="ditem in data[3].items" :key="ditem.id"
              >
              {{ditem.name}}
              <dd class="item_wrap flex">
                <div class="item_con"
                v-for="ite in ditem.items" :key="ite.id"
                >{{ite.name}}</div>
              </dd>
              </dt>
              
            </dl>
          </div>
          <div class="d_btnWrap flex">
            <button class="btn_clear grow_shrink">clear</button>
            <button class="btn_ok grow_shrink">ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
    props:{
        data: {
			type: Object,
			default () {
				return [
					{
						name: '综合排序',
						items: [{
								id: '0',
								name: '综合排序'
							},
							{
								id: '1',
								name: '好评优先'
							},
							{
								id: '2',
								name: '销量最高'
							},
							{
								id: '3',
								name: '起送价最低'
							},
							{
								id: '4',
								name: '配送最快'
							},
							{
								id: '5',
								name: '配送费最低'
							},
							{
								id: '6',
								name: '从低到高'
							},
							{
								id: '7',
								name: '从高到低'
							}
						]
					},
					{
						name: '距离最近',
						id: '8'
					},
					{
						name: '品质联盟',
						id: '9'
					},
					{
						name: '筛选',
						items: [{
								name: '商家服务(多选)',
								// 是否多选
								multipleChoice: true,
								items: [{
										icon: '',
										name: '海鸥专送',
										id: 'a1',
										checked: false
									},
									{
										icon: '',
										name: '海鸥专送',
										id: 'a2',
										checked: false
									},
									{
										icon: '',
										name: '海鸥专送',
										id: 'a3',
										checked: false
									}
								]
							},
							{
								name: '优惠',
								items: [{
										icon: '',
										name: '新用户优惠',
										id: 'b1',
										checked: false
									},
									{
										icon: '',
										name: '特价',
										id: 'b2',
										checked: false
									},
									{
										icon: '',
										name: '下单减少',
										id: 'b3',
										checked: false
									}
								]
							},
							{
								name: '人均消费',
								items: [{
										icon: '',
										name: '￥20以下',
										id: 'c1',
										checked: false
									},
									{
										icon: '',
										name: '￥20-￥40',
										id: 'c2',
										checked: false
									},
									{
										icon: '',
										name: '￥40-￥60',
										id: 'c3',
										checked: false
									}
								]
							}
						]
					}
				]
			}
		},
    }
}
</script>
<style lang="scss" scoped="scoped">
.filter {
  position: relative;
  z-index: 100;
  padding: 0.266666rem 0; //10
  background-color: #fff;
  .filter_nav {
    .nav_item {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0.026666rem; //1
      text-align: center;
      .item_name {
        font-size: 0.373333rem; //14
      }
      .nav_on {
        color: #f7901e;
        font-weight: 700;
      }
      .more_on {
        color: #f716a3;
        font-weight: 700;
      }
    }
  }
  .nav_submenu {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    background-color: #fff;
    // display:none;
    .submenu_a {
      padding: 0.266666rem 0; //10px
      font-size: 0.373333rem; //14
      line-height: 0.906666rem; //34
      text-indent: 0.8rem; //30
      border-top: 0.026666rem solid #ddd; //1px
      border-bottom: 0.026666rem solid #ddd;
      .submenu_on {
        color: #f36262;
      }
    }
    .submenu_d {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      .d_main {
        .main_item {
          padding: 0 0.266666rem; //10
          .item_title {
            line-height: 0.8rem; //30
          }
          .item_wrap {
            justify-content: space-between;
            .item_con {
              width: 30%;
              background-color: #efefef;
              line-height: 0.933333rem; //35
              text-align: center;
              font-size: 0.373333rem; //14
              color: #666;
              border-radius: 0.053333rem; //2
            }
            .submenu_on {
              color: #fff;
              background-color: #58bbf6;
            }
          }
        }
      }
      .d_btnWrap {
        margin-top: 20px;
        box-shadow: 0 -0.053333rem 0.053333rem #ddd; //2
        button {
          text-align: center;
          line-height: 1.066666rem; //40
          font-size: 0.533333rem; //20
        }
        .btn_clear {
          color: #ddd;
        }
        .btn_ok {
          color: #fff;
          background-color: #56dc7f;
        }
      }
    }
  }
}
</style>
