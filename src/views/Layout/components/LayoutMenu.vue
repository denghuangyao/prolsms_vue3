<template>
    <div class="left-menu-box">
        <el-menu class="second-menu-box" default-active="1">
            <!-- 模块二级菜单 -->
            <template v-for="(secondItem, index) in menuData" :key="secondItem.permission">
                <el-sub-menu :index="`${index + 1}`" v-if="secondItem?.children?.length">
                    <template #title>
                        <el-icon class="item-icon-left">
                            <i-ep-add-location />
                        </el-icon>
                        <el-badge is-dot class="item-text textell" :offset="[-3, 15]">
                            {{ secondItem.label }}
                        </el-badge>
                    </template>
                    <!-- 下属三级菜单 -->
                    <el-menu-item class="second-menu-item" :index="`${index + idx + 2}-${idx + 1}`"
                        v-for="(item, idx) in secondItem.children">
                        <el-badge is-dot class="item-text textell" :offset="[-3, 15]">
                            {{ item.label }}
                        </el-badge>
                        <!-- <div class="item-text textell">{{ item.label }}</div> -->
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item class="second-menu-item" :index="`${index + 1}`" v-else>
                    <i-ep-menu />
                    <el-badge class="item-text textell" :offset="[-3, 15]">
                        {{ secondItem.label }}
                    </el-badge>
                </el-menu-item>
            </template>
        </el-menu>

    </div>
</template>
<script setup lang="ts">
import type { MenuRecordRaw } from '@/types';
import { onMounted, reactive } from 'vue';
import { useAccessStore } from '@/stores';
const accessStore = useAccessStore();

onMounted(() => {

})
let menuData = reactive<MenuRecordRaw[]>(accessStore.accessMenus)
</script>
<!-- 
相应模块第二级菜单
<div class="second-menu-box" v-for="(secondItem) in menuData" :key="secondItem.key">
            <div class="second-menu-item" @click="clickSecond(secondItem)"
                :class="{ activeLeftMenu: secondIndex == secondItem.key && (!showThirdMenu(secondItem) || hiddenThird[secondItem.key]) }">
                svg、文字、箭头
                <svg-icon class="item-icon-left" :icon-class="secondItem.icon || 'nodata'" />
                <div class="item-text">
                    {{ secondItem.label }}{{ secondItem.weichuliXiaoxi ? `（${secondItem.weichuliXiaoxi}）` : '' }}
                </div>
<div @click.stop="changeShowThird(secondItem)" v-if="showThirdMenu(secondItem)" class="item-icon-right"
    :class="{ 'hiddenThird': hiddenThird[secondItem.key] }">
                    <svg-icon icon-class="jt" />
                </div>
</div>

下属三级菜单
<div class="third-menu-box" v-if="showThirdMenu(secondItem)">
                <div class="third-menu-item" v-for="(thirdItem) in secondItem.children" :key="thirdItem.key"
                    @click="clickThird(thirdItem)"
                    :class="{ 'activeLeftMenu': thirdIndex == thirdItem.key, 'showThird': !hiddenThird[secondItem.key] }">
                    小圆点、文字
                    <div class="item-dot"></div>
<div class="item-text">
                        <div class="textell">{{ thirdItem.label }}</div>
 </wl-tooltip>
新消息提示
<div v-for="item in getUnreadList(thirdItem)" :key="item.key"
    :class="{ 'yichangtxFlag': isUnread(item.unreadFlagKey) }">
                        </div>
</div>
</div>
</div>

</div>
<script>
export default {
    props: {
        activeIndex: {
            type: String,
        },
        menuIndex: {
            type: [String, Number],
            default: 0,
        },
    },
    data() {
        return {
            orgViewData: null, //组织页面数据
            secondIndex: "", //二级菜单的的高亮项
            thirdIndex: "", //三级菜单高亮项
            rightList: [],
            userInfo: {},
            // dotFlag1: wllib.global.WLXMVuex().state.shenheDot,
            // dotFlag2: wllib.global.WLXMVuex().state.xiaoxiDot,
            path: "", //根据路由变化判断是否3级菜单
            hiddenThird: {}, //收起相应的三级菜单
            timeId: null,

            unread_huojing: false,
            unread_yinliao: false,
            unread_fanghufu: false,
            unread_danao: false,
            unread_loubao: false,
            unread_chouyan: false,
            unread_shenyedurenshiyan: false,
            unread_zhongdianRenyuan: false,
            unread_moshengren: false,
            unread_feishouquanRenyuan: false,//非授权人员菜单未读标识
            unread_fangke: false,//访客菜单未读标识
            unread_turandaodi: false,//突然倒地菜单未读标识
            unread_qingxuyichang: false,//情绪异常菜单未读标识
            timeId_Unread: null,
            // 数组，包含所有需要渲染的 `菜单key1` 及 其对应的`变量名`
            unreadItems: [//modelKey 一级模块权限，在当前模块下时，才查询对应的未读消息
                /**智慧消防模块消息 */
                { type: '火焰报警记录', unreadFlagKey: 'unread_huojing', quanXian: 'zhxf:hyjcBaojingJilu', modelKey: 'zhihuiXiaofang:menu' },//火焰报警新消息
                /**行为规范模块消息 */
                { type: '饮料识别监测记录', unreadFlagKey: 'unread_yinliao', quanXian: 'xwgf:yinliaoshibie', modelKey: 'xingweiGuifan:menu' },//饮料识别新消息
                { type: '防护服监测记录', unreadFlagKey: 'unread_fanghufu', quanXian: 'xwgf:fanghufu', modelKey: 'xingweiGuifan:menu' },//防护服识别新消息
                { type: '打闹监测记录', unreadFlagKey: 'unread_danao', quanXian: 'xwgf:danao', modelKey: 'xingweiGuifan:menu' },//打闹识别新消息
                { type: '搂抱监测记录', unreadFlagKey: 'unread_loubao', quanXian: 'xwgf:loubao', modelKey: 'xingweiGuifan:menu' },//搂抱识别新消息
                { type: '抽烟监测记录', unreadFlagKey: 'unread_chouyan', quanXian: 'xwgf:chouyan', modelKey: 'xingweiGuifan:menu' },//抽烟识别新消息
                { type: '深夜实验监测记录', unreadFlagKey: 'unread_shenyedurenshiyan', quanXian: 'ryjc:shenyedurenshiyan', modelKey: 'renyuanJiance:menu' },//深夜实验识别新消息
                /**人员监测模块消息 */
                { type: '重点人员监测记录', unreadFlagKey: 'unread_zhongdianRenyuan', quanXian: 'ryjc:zdryJianceJilu', modelKey: 'renyuanJiance:menu' },//重点人员新消息
                { type: '陌生人报警记录', unreadFlagKey: 'unread_moshengren', quanXian: 'ryjc:msyBaojingJilu', modelKey: 'renyuanJiance:menu' },//陌生人新消息
                { type: '非授权人员检测记录', unreadFlagKey: 'unread_feishouquanRenyuan', quanXian: 'ryjc:feishouquanrenyuan', modelKey: 'renyuanJiance:menu' },//非授权人员检测记录
                { type: '访客检测记录', unreadFlagKey: 'unread_fangke', quanXian: 'ryjc:fangke', modelKey: 'renyuanJiance:menu' },//访客检测记录
                { type: '突然倒地', unreadFlagKey: 'unread_turandaodi', quanXian: 'ryjc:turandaodi', modelKey: 'renyuanJiance:menu' },//突然倒地
                { type: '情绪异常', unreadFlagKey: 'unread_qingxuyichang', quanXian: 'ryjc:qingxuyichang', modelKey: 'renyuanJiance:menu' },//情绪异常
            ],
            unreadTypeConf: {},//根据type做属性名的未读消息类型配置
        };
    },
    created() { },
    mounted() {
        // 刷新页面时定位菜单位置
        // this.path = this.$router.history.current.name;

        // this.setActiveMenu(this.$router.history.current.path);
        // this.$router.afterEach((to, from) => {
        //     // 根据路由同步更新菜单位置
        //     this.path = to.name;
        //     this.setActiveMenu(to.path);
        // });
        // this.getAuList();
        // this.setUnreadTypeConf(this.unreadItems);
        // wllib.global.WLRemoveEvent("LISEN_MENU_UNREAD");
        // wllib.global.WLAddEvent("LISEN_MENU_UNREAD", this.updateUnread);
    },
    beforeDestroy() {
        this.clearQueryUnread();
    },

    methods: {
        getCaidanList() {

        },
        yichangxiaoxiUpdate() {
            this.timeId = setInterval(() => {
                wllib.global.WLDispatch(WLConst.YICHANG_DOT, {});
            }, 30000)
        },
        /**点击二级菜单*/
        clickSecond(i) {
            // 若有三级菜单，点击二级菜单和向右箭头都是展开，不作跳转
            if (this.showThirdMenu(i)) {
                this.changeShowThird(i)
                return
            }
            let key = i.key;
            let flag = this.hiddenThird[key];
            this.secondIndex = key;
            this.$set(this.hiddenThird, key, false);
            let t = flag ? 300 : 0;//三级菜单原本为收起时，设置延时等待菜单展开动画完成后再跳转
            setTimeout(() => {
                this.setSectKey(i);
            }, t)
            if (key == "work:woderenwu") {
                wllib.global.WLDispatch(WLConst.SHENHE_CNT, {});
            } else if (key == "message:chaxun") {
                wllib.global.WLDispatch(WLConst.MSG_CNT, {});
            }
        },
        /**点击三级菜单*/
        clickThird(i) {
            this.thirdIndex = i.key;
            let list = [i];
            this.checkPath(list);
        },
        changeShowThird(i) {
            let key = i.key;
            let flag = this.hiddenThird[key] || false;
            this.$set(this.hiddenThird, key, !flag);
            // this.hiddenThird[key] = !flag;
        },
        /**
         * 根据系统配置过滤模块菜单
         * */
        showMenuByConf(menu) {
            let flag = true;
            if (menu.systemType) {
                flag = checkSystemType(menu.systemType);
            }
            return flag;
        },
        /**
         * 权限控制菜单过滤
         * 有权限返回false
         * */
        flitersMenuView(routerKey) {
            if (Config.bAllRight) {
                return false;
            }
            if (
                routerKey == "caidanguanli:view" ||
                routerKey == "xitongpeizhi:view"
            ) {
                return true;
            }
            if (checkSystemType(WLConst.systemType.YQYY)) {
                if (routerKey == "wxysy:yqsbchuzhijilu" || routerKey == "wxysy:yqsbcaigoujilu") {
                    return true
                }
            }
            return !this.filterButton(routerKey);
        },
        filterButton(key) {
            var flag = false;
            if (wllib.detect.wlIsNotNullArray(this.rightList)) {
                this.rightList.forEach((item) => {
                    if (item == key) {
                        flag = true;
                    }
                });
            }
            if (key == null) {
                flag = false;
            }
            // console.log(key,'this.rightList',JSON.parse(JSON.stringify(this.rightList)))
            // if (key.indexOf('caidan') > -1) flag = true
            return flag;
        },
        // 获取角色的所有权限
        getAuList() {
            this.rightList = getPermissions();
        },
        getPath(pageData) {
            console.log(pageData, 'pageData');
            let tmp = { path: pageData.key1 };
            return tmp;
        },

        // 设置高亮的菜单目录
        setActiveMenu(name) {
            if (name) {
                let routeArr = name.split("/");
                this.secondIndex = '';
                this.thirdIndex = '';
                this.getSecIndex(routeArr[routeArr.length - 1]); //新的二级开启这个
            }
        },

        getSecIndex(name) {
            this.orgViewData.forEach((itemFirst, index) => {
                itemFirst.children.forEach((itemSed) => {
                    if (itemSed.children) {
                        itemSed.children.some((item) => {
                            if (name == item.key1) {
                                this.secondIndex = itemSed.key;
                                this.thirdIndex = item.key;
                                return true
                            }
                            return false
                        });
                    } else {
                        if (name == itemSed.key1 && itemSed.key1 != "caidanchaxun") {
                            this.secondIndex = itemSed.key;
                        }
                        if (
                            itemSed.key1 == "caidanchaxun" &&
                            itemSed.meta.caidan == "caidan" + this.$route.query.caidanId
                        ) {
                            this.secondIndex = itemSed.key;
                        }
                    }
                });
            });
        },
        //选择一级模块时触发
        handleSelect(key, entryKey) {
            this.entryKey = entryKey;
            this.setFirstKey(key);
        },
        setFirstKey(key) {
            let list = [];
            this.orgViewData.forEach((itemFirst) => {
                //一级菜单 itemFirst
                if (key == itemFirst.key) {
                    itemFirst.children.forEach((itemSed) => {
                        //二级菜单 itemSed
                        if (itemSed.children) {
                            itemSed.children.forEach((item) => {
                                if (!this.flitersMenuView(item.key)) {
                                    list.push(item);
                                }
                            });
                        } else {
                            if (!this.flitersMenuView(itemSed.key)) {
                                list.push(itemSed);
                            }
                        }
                    });
                }
            });
            this.checkPath(list);
        },
        // 点击一级模块后显示默认路由
        checkPath(list) {
            let tempItem = list[0];
            if (this.entryKey) {
                list.forEach((i) => {
                    if (i.key == this.entryKey) tempItem = i;
                });
            }
            if (!tempItem) {
                this.fixWangZhanRouter();
            }
            if (tempItem && tempItem.meta && tempItem.meta.caidanId) {
                let router_path = this.getPath(tempItem);
                router_path.path += `?caidanId=${tempItem.meta.caidanId}&leixing=${tempItem.meta.leixing}`;
                this.$router.push(router_path);
                return;
            }
            this.$router.push(this.getPath(tempItem));
        },
        fixWangZhanRouter() {
            if (checkSystemType(WLConst.systemType.WZHT)) {
                let caidanList = localStorage.getItem("caidanChildren");
                try {
                    if (caidanList) {
                        addChildRouter("houtai:menu", getWZHTMenuAndIcon(JSON.parse(caidanRouter)));
                    } else {
                        getCaidanList();
                    }
                } catch (e) {
                    getCaidanList();
                }
            }
        },
        setSectKey(item) {
            let list = [];
            if (wllib.detect.wlIsNotNullArray(item.children)) {
                list = [...item.children];
            } else {
                list.push(item);
            }
            this.checkPath(list);
        },
        /**是否渲染三级菜单*/
        showThirdMenu(second) {
            return wllib.detect.wlIsNotNullArray(second.children);
        },
        ChangeMenuType() {
            this.orgViewData = getMenuTreeConfByMenuType();
        },

        // 清除相关定时器
        clearQueryUnread() {
            this.timeId_Unread && clearInterval(this.timeId_Unread);
        },
        // 定时查询相关菜单是否有新记录
        startQueryUnread(modelKey) {
            this.clearQueryUnread();
            let step = 30000;//30秒查询一次
            let list = wllib.utils.deepClone(this.unreadItems);
            list = list.filter(i => i.modelKey == modelKey && (Config.bAllRight || this.rightList.includes(i.quanXian)));//过滤出当前模块，有对应页面权限的、
            if (!list.length) return;
            this.getUnread();
            this.timeId_Unread = setInterval(() => {
                this.getUnread();
            }, step)
        },
        /**获取是否有新记录 */
        getUnread() {
            wllib.utils.getUnreadType(unreadList => {
                unreadList.forEach((type) => {
                    let conf = this.unreadTypeConf[type];
                    this[conf.unreadFlagKey] = true;
                })
            })
        },
        /**更新对应菜单的新消息状态*/
        updateUnread(param) {
            let { type } = param;
            let key = this.unreadTypeConf[type].unreadFlagKey;
            if (!key || !this[key]) return;
            //当存在未读提示时，才去更新
            wllib.utils.updateReadByType(type, res => {
                this[key] = false;
            })
        },
        /**根据传入的字符串动态返回对应的未读状态*/
        isUnread(flagKey) {
            return this[flagKey];
        },
        /**根据当前菜单 获取需要 渲染 新消息提示的数据*/
        getUnreadList(item) {
            return this.unreadItems.filter(i => i.quanXian == item.key);
        },
        /**将unreadItems未读消息配置对象数组转成以type值为属性名的配置对象 */
        setUnreadTypeConf(confList) {
            let unreadTypeConf = confList.reduce((conf, item) => {
                conf[item.type] = item;
                return conf;
            }, {});
            console.log(unreadTypeConf, 'setUnreadTypeConf');
            this.unreadTypeConf = wllib.utils.deepClone(unreadTypeConf);
        }
    },
    computed: {
        /**
         * 根据账号权限和系统配置的模块，返回相应模块下的2、3级菜单
         * */
        menuData: function () {
            if (!this.orgViewData || this.menuIndex === "") return [];
            let data = this.orgViewData[this.menuIndex].children;
            data = JSON.parse(JSON.stringify(data));
            let newData = data.filter((second) => {
                if (wllib.detect.wlIsNotNullArray(second.children)) {
                    second.children = second.children.filter((third) => {
                        // console.log(!this.flitersMenuView(third.key),'!this.flitersMenuView(third.key)',third.key)
                        return !this.flitersMenuView(third.key);
                    });
                }
                return !this.flitersMenuView(second.key) && this.showMenuByConf(second);
            });
            let onlyOneSecondMenu = newData.length === 1
            newData = newData.map((item) => {
                // console.log('后端传的侧边栏数据==map',item)
                if (item.key == "work:woderenwu") {
                    item.weichuliXiaoxi = wllib.global.WLXMVuex().state.shenheValue
                } else if (item.key == "message:chaxun") {
                    item.weichuliXiaoxi = wllib.global.WLXMVuex().state.xiaoxiValue
                }
                // 所有二级菜单默认不展开，若模块只有一个二级菜单，才展开三级菜单
                if (!onlyOneSecondMenu) {
                    this.$set(this.hiddenThird, item.key, true);
                }
                return item
            })
            // console.log(JSON.parse(JSON.stringify(newData)),'newData--menuData',JSON.parse(JSON.stringify(this.orgViewData)))
            // console.log('后端传的侧边栏数据==',newData);

            let modelKey = this.orgViewData[this.menuIndex].key;
            this.startQueryUnread(modelKey);//启动对应模块的新消息提示查询定时器

            return newData;
        },
        yichangDot() {
            return wllib.global.WLXMVuex().state.yichangDot
        }
    },
    watch: {
        userInfo: {
            handler() {
                this.getAuList();
            },
            deep: true,
        },
    },
};
</script>
-->
<style lang="scss" scoped>
@mixin menuitem {
    font-weight: 500;
    font-family: $font-family;
}

.left-menu-box {
    height: 100%;
    width: pxTovw(200);
    box-sizing: border-box;

    :deep(.el-menu-item.is-active) {
        background-color: $color-hover;
    }

    .second-menu-box {
        width: 100%;
        box-sizing: border-box;
        border-right: none;


        .item-text {
            flex: 1;

            &.textell {
                max-width: 104px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }



        :deep(.el-sub-menu__title) {
            @include menuitem;
        }

        .item-icon-left {
            width: pxTovw(17);
            height: pxTovw(17);
            margin-right: pxTovw(12);
        }

        .second-menu-item {
            @include menuitem;
        }
    }
}
</style>