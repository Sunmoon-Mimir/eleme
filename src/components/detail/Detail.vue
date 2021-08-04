<template>
    <div class="detail" v-if="rst">
        <!-- 头部 -->
        <div class="detail_header" :style="{backgroundImage:`url(${$formatImgSrc(rst.shop_sign.image_hash)})`}">
                                                              <!-- ES6模板字符串 ${}-->
            <button class="header_btn" @click="toHome">&lt;</button>
            <div class="header_logo">
                <img :src="$formatImgSrc(rst.image_path)" alt="" />
            </div>
        </div>
        <!-- 描述部分 start-->
        <div class="detail_desc">
            <!-- 店铺名 -->
            <h2 class="desc_title"  @click="show.desc=true">{{rst.name}}</h2>
              <!-- 店铺详情 -->

              <!-- 通过 v-model:show 控制弹出层是否展示。 -->
                <van-popup v-model:show="show.desc" closeable
                class="title_detail"
                >
                <h2 class="desc_title">{{rst.name}}</h2>
                <div class="desc_evaluate">
                <span>评价{{rst.rating}}分</span>
                <span>月售{{rst.recent_order_num}}单</span>
                <span>配送约{{rst.order_lead_time}}分钟</span>
                <div class="desc_notice t_ellipsis">
                  <br />
                  <p>{{rst.promotion_info}}</p>
            </div>
            </div>
                </van-popup>    

            <!-- 评价、月售、配送约 -->
            <div class="desc_evaluate">
                <span>评价{{rst.rating}}分</span>
                <span>月售{{rst.recent_order_num}}单</span>
                <span>配送约{{rst.order_lead_time}}分钟</span>
            </div>
            <!-- 优惠劵 -->
            <div class="desc_coupon" v-if="redpack.length">
                <div class="coupon_main"  @click="show.coupon=true">
                    <div class="coupon_item flex type0" v-for="item in redpack" :key="item">
                        <span class="mian_value">{{item.value}}</span>
                        <span class="mian_detail">{{item.title}}</span>
                        <span class="mian_btn">领取</span>
                    </div>
                </div>

                <van-popup v-model:show="show.coupon" closeable round
                class="coupon_detail detail_slide" position="bottom"
                >
                <div class="detail_title">店铺专享红包</div>
                <div class="coupon_main" >
                    <div class="coupon_item flex type0" v-for="item in redpack" :key="item">
                        <span class="mian_value">{{item.value}}</span>
                        <span class="mian_detail">{{item.title}}</span>
                        <span class="mian_btn">领取</span>
                    </div>
                </div>
                </van-popup>  


            </div>
            <!-- 活动 -->
            <div class="desc_activity">
                <div class="activity_main flex">
                  <!-- 复用ActivityList组件 绑定并给data传值-->
                    <ActivityList :data="[rst.activities[0]]" class="grow_shrink"></ActivityList>
                    <div class="activity_more" @click="show.active=true">
                        共{{rst.activities.length}}个优惠<i class="iconfont icon-xiala"></i>
                    </div>
                </div>


                <van-popup v-model:show="show.active" closeable round
                class="coupon_detail detail_slide" position="bottom"
                >
                <div class="detail_title">所有优惠</div>
                <ActivityList :data="rst.activities" class="detail_list pad5px"></ActivityList>
                </van-popup>
            </div>
            <!-- 公告 -->
            <div class="desc_notice t_ellipsis">
              <van-notice-bar
				left-icon="volume-o" scrollable
              :text="rst.promotion_info"
            />
            </div>
        </div>
        <!-- 描述部分 end-->
        <!-- 主体内容 -->
        <div class="detail_main">
            <!-- 导航 -->
            <nav class="main_nav flex" v-fixed ref="detail_nav">
                <div class="nav_item">
					<router-link :to="paths_.menu">点餐</router-link>
				</div>
				<div class="nav_item">
					<router-link :to="paths_.evaluate">评价</router-link>
				</div>
				<div class="nav_item">
					<router-link :to="paths_.merchant">商家</router-link>
				</div>
            </nav>
			<router-view></router-view>
        </div>
		<!-- 购物车 -->
		<ShoppingCar :resID="rst.id"></ShoppingCar>
    </div>
</template>

<script>
import detailModel from "./js/detailModel";
import ActivityList from '../activityList/ActivityList.vue'
import ShoppingCar from '../shoppingcar/ShoppingCar.vue'
import { NoticeBar,Icon,Popup ,Overlay  } from 'vant';
export default {
  components:{
    ActivityList,
	ShoppingCar,
    [NoticeBar.name]:NoticeBar,
    [Icon.name]:Icon,//必须导入图标组件，否则滚动条滚动一次后图标就会消失
    [Popup.name]:Popup,//弹出层有一个遮罩功能需要遮罩层组件
    [Overlay.name]:Overlay //因此也需要引入遮罩层
  },
    setup() {
        const { rst ,redpack,show,toHome,paths_} = detailModel();

        return {
            rst,//头部数据:logo、背景图、店名、评分、月销、配送时间
            redpack,//优惠券数据
            show,
            toHome,
			paths_
        };
    },
};
</script>

<style lang="scss">
	.detail {

		/* 商家头部 */
		.detail_header {
			position: relative;
			height: 3.6rem; //135
			margin-bottom: 0.4rem; //15
			background: no-repeat center/cover;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				z-index: 5;
				width: 100%;
				height: 100%;
				background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
			}

			.header_btn {
				position: absolute;
				left: 0;
				top: 0;
				z-index: 10;
				font-size: 0.8rem; //30
				font-family: SimHei;
				width: 1.333333rem;
				height: 1.333333rem; //50
				color: #fff;
			}

			.header_logo {
				position: absolute;
				left: 0;
				right: 0;
				z-index: 10;
				bottom: -0.4rem; //15
				width: 2.4rem;
				height: 2.4rem; //90
				margin: auto;
				border: 1px solid #ddd;

				img {
					width: 100%;
					height: 100%;
				}

			}

		}

		// 商家描述
		.detail_desc {
			padding-top: 0.533333rem; //20
			.desc_title {
				font-size: 0.533333rem; //20
				font-weight: 600;
				text-align: center;

				&::after {
					content: '';
					display: inline-block;
					vertical-align: middle;
					width: 0;
					height: 0;
					margin-left: 0.16rem; //6
					border: 8px solid transparent;
					border-left-color: #000;
				}
			}

			/* 商家名称 */
			.title_detail {
				position: fixed;
				bottom: 0;
				z-index: 100;
				margin: auto;
				width: 9.6rem; //400
				height: 9.6rem; //360
				background-color: #fff;
				border-radius: 0.16rem; //6

				.desc_title {
					margin-top: 0.533333rem; //20
				}

				.btn {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0.266666rem; //10
					width: 1.066666rem; //40
					height: 1.066666rem; //40
					margin: auto;
					background-color: rgba(0, 0, 0, 0.5);
					color: #fff;
					border-radius: 50%;
					font-size: 0.8rem; //30
				}
			}

			.desc_evaluate {
				margin: 0.266666rem 0; //10
				text-align: center;

				span {
					margin: 0 0.266666rem; //10
					color: '#666';
				}
			}

			/* 优惠券 */
			.desc_coupon {
				margin: 0.266666rem; //10

				.coupon_main {
					text-align: center;

					.coupon_item {
						position: relative;
						display: inline-flex;
						width: 4.4rem; //165
						height: 0.906666rem; //34
						margin: 0 0.08rem; //3
						line-height: 0.906666rem; //34
						font-size: 0.373333rem; //14
						align-items: center;

						&::before,
						&::after {
							content: '';
							position: absolute;
							width: 0.053333rem; //2
							height: 0;
							right: 1.173333rem; //44
							border: 0.106666rem solid transparent; //4
						}

						&::before {
							top: 0;
							border-top-color: #fff;
						}

						&::after {
							bottom: 0;
							border-bottom-color: #fff;
						}

						span {
							color: #845454;
						}

						.mian_value {
							margin-left: 0.533333rem; //20
							color: #6D6C29;
							font-size: 0.373333rem; //14

							&::before {
								font-size: 0.373333rem; //14
								content: '￥';
							}
						}

						.mian_detail {
							width: 2.266666rem; //85
							overflow: hidden;
						}

						.mian_btn {
							position: absolute;
							right: 0.266666rem; //10
						}
					}

					.type0 {
						background-color: rgb(255, 244, 244);
					}
				}

				.coupon_detail {
					height: 8rem; //300
				}
			}

			/* 活动 */
			.desc_activity {
				margin-bottom: 0.266666rem; //10

				.activity_main {
					width: 6.933333rem; //260
					margin: 0 auto;

					.activity_more {
						margin-left: 0.266666rem; //10
					}
				}

				.activity_detail {
					overflow: auto;

					button {
						position: absolute;
						top: 0.4rem; //15
						right: 0.266666rem; //10
						font-size: 0.4rem; //15
					}

					.detail_list {
						padding: 0 0.266666rem; //10
						overflow: hidden;
					}
				}
			}

			.desc_notice {
				text-align: center;
				font-size: 0.426666rem; //18

				.van-icon {
					position: relative;
				}
			}
		}

		/* 优惠券 */
		.detail_slide {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			height: 10.133333rem; //380
			background-color: #fff;

			.detail_title {
				margin: 0.266666rem 0; //10
				font-size: 0.533333rem; //20
				font-weidht: 700;
				text-align: center;
			}

			.van-icon {
				position: absolute;
			}
		}
			/* 主体内容 */
		.detail_main{
		  a{
			  text-decoration: none;
		  }
		  .main_nav{
			background-color:#fff;
			border-bottom:1px solid #ddd;
			.nav_item{
			  text-align:center;
			  flex-grow:1;
			  a{
				display:inline-block;
				line-height:1.333333rem;//50
				font-size:0.426666rem;//16
				color:#777;
				border-bottom:2px solid transparent;
				&.router-link-active{
				  color:#333;
				  font-weight:700;
				  border-bottom-color:#FF6969;
				}
		      }
		    }
		  }
		}
	}
</style>

