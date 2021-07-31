<template>
    <!-- 首页列表组件 -->
    <div class="listWrap">
        <ul class="list">
            <li class="list_item" 
            v-for="(item,i) in boll_elistData" :key="item.id" @click="toDetail(item)">
                <!-- 图片 -->
                <div class="item_img">
                    <img :src="$formatImgSrc(item.restaurant.image_path)" />
                    <!-- <span class="img_arror"></span> -->
                </div>
                <!-- 描述 -->
                <div class="item_desc">
                    <!-- 标题 -->
                    <!-- v-bind绑定class的伪类brand，数据决定它有无品牌标志 -->
                    <h3
                        class="desc_name"
                        :class="{ brand: item.restaurant.is_premium }"
                    >
                        <span class="name_main">{{
                            item.restaurant.name
                        }}</span>
                        <span class="name_support">
                            <!-- 数据recommend.is_ad决定有无广告标签 -->
                            <i
                                class="ad"
                                v-if="item.restaurant.recommend.is_ad"
                            ></i>
                            <!-- 遍历数据restaurant.supports数组  票和保分别对应数组中的id -->
                            <i
                                v-for="i in item.restaurant.supports"
                                :key="i.id"
                                :class="{
                                    invoice: i.id == '7',
                                    insurance: i.id == '4',
                                }"
                            ></i>
                        </span>
                    </h3>
                    <div class="desc_star">
                        <!-- 星级评分 -->
                        <van-rate
                            v-model="item.restaurant.rating"
                            class="van-rate1"
                            allow-half
                            readonly
                        />
                        {{ item.restaurant.rating }}
                        <div class="recent_order_num">
                            月售{{ item.restaurant.recent_order_num }}单
                        </div>
                    </div>
                    <!-- 价格 -->
                    <div class="desc_price flex">
                        <div class="price_item flex">
                            <span class="item_left"
                                >￥{{
                                    item.restaurant.piecewise_agent_fee.rules[0]
                                        .price
                                }}起送
                            </span>
                            <span>{{
                                item.restaurant.piecewise_agent_fee.description
                            }}</span>
                        </div>
                        <div class="price_item flex">
                            <span class="item_left">{{
                                distanceCalc(
                                    item.restaurant.latitude,
                                    item.restaurant.longitude
                                )
                            }}</span>
                            <span
                                >{{ item.restaurant.order_lead_time }}分钟</span
                            >
                        </div>
                    </div>
                    <!-- 标签 -->
                    <div class="desc_tags flex">
                        <i
                            class="tag"
                            v-for="tag in item.restaurant.flavors"
                            :key="tag"
                            >{{ tag.name }}</i
                        >
                    </div>
                    <!-- 活动 -->
                    <div class="desc_activity flex" :style="showActivity(i)">
                        <activityList :data="item.restaurant.activities"
                        class="grow_shrink"></activityList>
                        <div class="activity_count" @click.stop="showActivityFn(i)" >
                            {{ item.restaurant.activities.length}}个活动<i class="iconfont icon-xiala"></i>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <slot>
            <p class="loading">加载中....</p>
            <p>没有更多了~</p>
        </slot>
    </div>
</template>

<script>
import { Rate } from "vant";
import { Icon } from "vant";
import elistModel from './js/elistModel.js'
import  activityList from '../activityList/ActivityList.vue'
export default {
    components: {
        [Rate.name]: Rate,
        [Icon.name]: Icon,
        activityList,
    },
    setup(props) {
       const {boll_elistData,distanceCalc,showActivityFn,showActivity,toDetail}=elistModel()

        return {
        boll_elistData,
        distanceCalc,
        showActivityFn,
        showActivity,
        toDetail
    };
    },
};
</script>
<style lang="scss">
.list {
    .list_item {
        display: flex;
        // 20 10
        padding: 0.533333rem 0.266666rem;
        border-bottom: 1px solid #dddfdf;
        .item_img {
            // position: relative;
            img {
                z-index: 1;
                width: 2.293333rem; //86
                height: 2.293333rem;
            }
            .img_arror {
                position: absolute;
                right: -0.133333rem; //5
                top: -0.133333rem;
                background-image: linear-gradient(0deg, #fb7474, #c92020);
                color: #fff;
                font-size: 0.426666rem; //16
                padding: 0.106666rem 0.213333rem; //4 8
                border-radius: 0.8rem; //30
            }
        }
        .item_desc {
            margin-left: 0.266666rem; //10
            flex-grow: 1;
            flex-shrink: 1;
            overflow: hidden;
            .desc_name {
                line-height: 0.64rem; //24
                // 品牌商标，判断值为 item.restaurant.is_premium
                &.brand::before {
                    //这是sass的语法，代表上一级选择器，实际编译成css就是 .desc_name.brand::before
                    content: "品牌";
                    padding: 0 0.106666rem; //4
                    background-color: #f6713c;
                    color: #eeeded;
                    border-radius: 0.053333rem; //2
                }
                .name_main {
                    margin-left: 0.106666rem; //4
                    font-size: 0.426666rem; //16
                    font-weight: 700;
                }
                // 服务支持标签 判断值为 item.restaurant.supports
                .name_support {
                    float: right;
                    i {
                        margin-left: 0.053333rem; //2
                        padding: 0 0.053333rem;
                        border: 1px solid #ddd;
                        background-color: #fff;
                        font-size: 0.32rem; //12
                        color: #999;
                    }
                    .invoice::before {
                        content: "票";
                    }
                    .insurance::before {
                        content: "保";
                    }
                    .ad::before {
                        content: "广告";
                    }
                }
            }
            .desc_star {
                display: flex;
                color: #999;
                margin: 0.213333rem 0; //8
                .van-rate1{
                    z-index: -2;
                }
                .recent_order_num {
                    margin-left: 0.266666rem;
                }
            }
            .desc_price {
                justify-content: space-between;
                .price_item {
                    color: #999;
                    .item_left {
                        padding-right: 0.16rem; //6
                        margin-right: 0.16rem;
                        border-right: 1px solid #ccc;
                    }
                }
            }
            .desc_tags {
                margin: 8px 0;
                .tag {
                    padding: 0 0.08rem; //3
                    margin-right: 0.16rem; //6
                    border: 1px solid #dfdfdf;
                    color: #9a9a9a;
                }
            }
            .desc_activity {
                height: 1.226666rem; //46
                .activity_count {
                    margin-left: 0.16rem; //6
                    line-height: 0.533333rem; //20
                    .icon-jiantouarrow486 {
                        margin-left: 0.106666rem; //4
                        font-size: 0.32rem; //12
                    }
                }
            }
        }
    }
}

.loading {
    // margin-top: -2.466667rem;
    text-align: center;
    height: .746667rem;
    line-height: 0.746666rem; //28
}
.van-rate__icon--half {
    position: absolute;
}
</style>
